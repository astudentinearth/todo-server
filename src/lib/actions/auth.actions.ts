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
import { loginLimiter, signupLimiter } from "../rate-limit";

/**
 * Creates a new user account or returns an error if account can't be created.
 * @param username Username for the new account
 * @param password Password for the new account
 * @returns `Promise<string>` on error, `Promise<never>` on success
 */
export async function signup(username: string, password: string) : Promise<string | never>{
    username=username.trim();
    if(username===password) return "Password can't be the same as username.";
    // Check for limits first
    const ip = (process.env.NODE_ENV === "production" ? headers().get("X-Real-IP") : headers().get("X-Forwarded-For"));
    if(ip==null) return "Invalid client address.";
    const {limitAccountByIP, limitAttemptsByIP} = signupLimiter;
    const resAttempts = await limitAttemptsByIP.get(ip);
    const accountAttempts = await limitAccountByIP.get(ip);
    if(resAttempts!==null && resAttempts.consumedPoints >= signupLimiter.MAX_ATTEMPTS_BY_IP){
        return `You attempted to create an account too many times. You must wait ${Math.ceil(resAttempts.msBeforeNext/(1000*60))} minutes before trying again.`;
    } else if(accountAttempts!=null && accountAttempts.consumedPoints >= signupLimiter.MAX_ACCOUNTS_BY_IP){
        return `You have created too many accounts today. You must wait ${Math.ceil(accountAttempts.msBeforeNext / (1000*60))} minutes before trying again.`;
    }
    try {
        limitAttemptsByIP.consume(ip);
    } catch (err) {
        if(err instanceof Error) console.log(err.message, err.stack);
            else{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return `Too many requests. Try again in ${(Math.round((err as any).msBeforeNext)/1000)}`
            }
    }
    // username validation
    if(!/^[a-zA-Z0-9_]+$/.test(username)){
        return "Username contains invalid characters.";
    }
    if(username.length>64) return "Username too long. Pick one that is 32 characters at maximum.";

    // password validation
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
        try{
            limitAccountByIP.consume(ip);
        }
        catch(err){
            if(err instanceof Error) console.log(err.message, err.stack);
            else{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return `Too many requests. Try again in ${(Math.round((err as any).msBeforeNext)/1000)}`
            }
        }
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

/**
 * Ends the current user session.
 */
export async function logout(){
    const {session} = await validateRequest();
    if(!session) return "Unauthorized"
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}

/**
 * Creates a new session for the user, or returns an error message on fail.
 * @param username 
 * @param password 
 * @returns `Promise<string>` on fail
 */
export async function login(username: string, password: string): Promise<string>{
    username=username.trim();
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

/**
 * Returns the logged in user.
 * @returns an user if logged in, `null` if logged out
 */
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

/**
 * Changes the username associated with an account
 * @param newName 
 * @param password required to authorize change of username
 */
export async function ChangeUsername(newName: string, password: string){
    newName=newName.trim();
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

/**
 * Changes the password associated with the current logged in user
 * @param oldPassword current password required to authorize change of password
 * @param newPassword  
 */
export async function ChangePassword(oldPassword: string,newPassword: string){
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

/**
 * Gets all active logins for the current user.
 * @returns `UserSession[]`
 */
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

/**
 * Invalidates all sessions of the current user on all devices 
 * @param password required to authorize security action
 */
export async function ForceLogout(password: string){
    const {user} = await validateRequest();
    if(!user) return [];
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
