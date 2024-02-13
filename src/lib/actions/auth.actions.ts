"use server"

import bcrypt from "bcrypt"
import { generateId } from "lucia";
import { lucia, validateRequest } from "../auth/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { UserSession } from "../types";
import Bowser from "bowser";
import { prisma } from "@/lib/db";
import { loginLimiter } from "../rate-limit";

// FIXME: This action requires middleware as a measure against DDOS attacks.
// Susceptible to the creation of thousands of accounts in a matter of seconds
export async function signup(username: string, password: string) : Promise<string | never>{
    username=username.trim();
    // username validation
    if(!/^[a-zA-Z0-9_]+$/.test(username)){
        return "Username contains invalid characters.";
    }
    if(username.length>64) return "Username too long. Pick one that is 32 characters at maximum.";

    // password validation
    password = password.trim();
    if(password.length<8) return "Password must be at least 8 characters.";
    if(password.length>64) return "Password length should not exceed 64 characters";
    const hashed_password = await bcrypt.hash(password, 10);
    const userId = generateId(15);
    try{
        await prisma?.users.create({
            data: {
                id: userId,
                username, hashed_password
            }
        })
        const ua = headers().get("User-Agent");
        const session = await lucia.createSession(userId, {userAgent: (ua ?? ""), creationTime: new Date()});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    catch(err){
        if(err instanceof Error) console.log(err.message, err.stack);
        return "An error occured during user creation."
    }
    return redirect("/");
}

export async function logout(){
    const {session} = await validateRequest();
    if(!session) return "Unauthorized"
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}

export async function login(username: string, password: string): Promise<string>{
    username=username.trim();
    password = password.trim();

    /// Rate limiting logic
    const {limiterBruteForceByIP, limiterConsecutiveFailsByPair, getUsernameIPkey} = loginLimiter;
    // Production has nginx in front, which sets X-Real-IP header. Development is not proxied, so we will just read from XFF
    const ip = (process.env.NODE_ENV === "production" ? headers().get("X-Real-IP") : headers().get("X-Forwarded-For"));
    if(ip==null) return "Invalid client address.";
    const key = getUsernameIPkey(username, ip);
    const resPair = await limiterConsecutiveFailsByPair.get(key);
    const resIP = await limiterBruteForceByIP.get(ip);
    let retry = 0;

    if(resIP !== null && resIP.consumedPoints > loginLimiter.MAX_FAILURES_BY_IP){
        retry = Math.round(resIP.msBeforeNext/1000) || 1;
    } else if (resPair !== null && resPair.consumedPoints > loginLimiter.MAX_CONSECUTIVE_FAILS){
        retry = Math.round(resPair.msBeforeNext/1000) || 1;
    }

    if (retry > 0){
        return `Too many requests. Try again in ${retry} seconds.`
    }

    if(username.length > 64 || !/^[a-zA-Z0-9_]+$/.test(username)) return "Invalid username";
    const existingUser = await prisma?.users.findUnique({where: {username}});
    const limiterPromises = [limiterBruteForceByIP.consume(ip)];
    if(!existingUser || !existingUser.hashed_password){
        try{
            await Promise.all(limiterPromises);
        }
        catch (rejected){
            if(rejected instanceof Error) console.log(rejected.message);
            else{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return `Too many requests. Try again in ${(Math.round((rejected as any).msBeforeNext)/1000)}`
            }
        }
        return "Incorrect username or password"
    }
    const result = await bcrypt.compare(password, existingUser.hashed_password);
    if(!result){ 
        limiterPromises.push(limiterConsecutiveFailsByPair.consume(key));
        try{
            await Promise.all(limiterPromises);
        }
        catch (rejected){
            if(rejected instanceof Error) console.log(rejected.message);
            else{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return `Too many requests. Try again in ${(Math.round((rejected as any).msBeforeNext)/1000)}`
            }
        }
        return "Incorrect username or password";
    }
    const ua = headers().get("User-Agent");
    const session = await lucia.createSession(existingUser.id, {userAgent: (ua ?? ""), creationTime: new Date()});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    if(resPair !== null && resPair.consumedPoints > 0) await limiterConsecutiveFailsByPair.delete(key);
    return redirect("/");
}

export const getUser = cache(async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;
    const { user, session } = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
    }
    return user;
});

export async function ChangeUsername(newName: string, password: string){
    newName=newName.trim();
    password = password.trim();
    const {user} = await validateRequest();
    if(!user) return "You are not logged in.";
    if(newName.length > 64) return "Username too long.";
    try{
        if(!prisma) return "We can't reach our database at the moment.";
        const db_user = await prisma.users.findUniqueOrThrow({where:{id: user.id}});
        if(!db_user) return "No such user. Are you a zombie?";
        const valid = await bcrypt.compare(password, db_user.hashed_password);
        if(!valid) return "Incorrect password. Your username will not be changed."
        const res = await prisma.users.findUnique({where: {username: newName}});
        if(res!=null) return "Username not available.";
        await prisma.users.update({where: {id: user.id}, data: {username: newName}});
    }
    catch (error) {
        if(error instanceof Error) console.log(error.message, error.stack)
        return "An error occured. Your username has not been changed.";
    }
}

export async function ChangePassword(oldPassword: string,newPassword: string){
    oldPassword = oldPassword.trim();
    newPassword = newPassword.trim();
    const {user} = await validateRequest();
    if(!user) return "You are not logged in.";
    if(oldPassword.length < 8) return "Password too short";
    if(oldPassword.length > 64) return "Password too long. Password should not exceed 64 characters.";
    try{
        if(!prisma) return "We can't reach our database at the moment.";
        const db_user = await prisma.users.findUniqueOrThrow({where:{id: user.id}});
        if(!db_user) return "No such user. Are you a zombie?";
        const valid = await bcrypt.compare(oldPassword, db_user.hashed_password);
        if(!valid) return "We couldn't change your password.";
        const newHash = await bcrypt.hash(newPassword, 10);
        await prisma.users.update({where: {id: user.id}, data: {hashed_password: newHash}});
        return true;
    }
    catch (error) {
        if(error instanceof Error) console.log(error.message, error.stack)
        return null;
    }
}

export async function GetUserSessions(){
    const {user} = await validateRequest();
    if(!user) return [];
    const sessions = await lucia.getUserSessions(user.id);
    return sessions.map((sess)=>{
        const metadata = Bowser.getParser(sess.userAgent);
        const browser = metadata.getBrowserName();
        const os = metadata.getOSName();
        return {expire: sess.expiresAt.toISOString(), browser, os, loginTimestamp: sess.creationTime.toISOString()} as UserSession;
    })
}

export async function ForceLogout(password: string){
    const {user} = await validateRequest();
    if(!user) return [];
    password = password.trim();
    try {
        if(!prisma) return "We can't reach our database at the moment.";
        const db_user = await prisma.users.findUniqueOrThrow({where:{id: user.id}});
        if(!db_user) return "No such user. Are you a zombie?";
        const valid = await bcrypt.compare(password, db_user.hashed_password);
        if(!valid) return "Incorrect password. You will not be signed out."
        else lucia.invalidateUserSessions(user.id);
    } catch (error) {
        if (error instanceof Error) console.log(error.message, error.stack);
    }
    return redirect("/login");
}
