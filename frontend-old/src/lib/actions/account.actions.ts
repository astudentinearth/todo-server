"use server"

import { redirect } from "next/navigation";
import { lucia } from "../auth";
import { getUser } from "./auth.actions";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt"

/**
 * Deletes an account with all data associated to it - forever.
 * @param password User password to authorize destructive action
 */
export async function DeleteAccount(password: string){
    const user = await getUser();
    if(!user) return "You are not logged in.";
    console.log(`${user.username} (id: ${user.id}) is attempting account deletion.`)
    if(password.length < 8) return "Invalid password.";
    try {
        if(!prisma) return "We can't reach our database at the moment.";
        const db_user = await prisma.users.findUniqueOrThrow({where:{id: user.id}});
        if(!db_user) return "No such user. Are you a zombie?";
        const valid = await bcrypt.compare(password, db_user.hashed_password);
        if(!valid) return "Incorrect password. Your account will not be deleted."
        else{ 
            console.log(`Proceeding account deletion for ${user.username} (id: ${user.id})`)
            console.log(`Deleting todos for ${user.username} (id: ${user.id})`)
            // Delete todos
            await prisma.todos.deleteMany({where: {userID: user.id}});

            console.log(`Deleting sessions for ${user.username} (id: ${user.id})`)
            // Invalidate sessions
            try{
                await lucia.invalidateUserSessions(user.id);
            } catch { /* empty */ }

            console.log(`Deleting user ${user.username} (id: ${user.id})`)
            // Delete user entry
            await prisma.users.delete({where: {id: user.id}});
        }
    } catch (error) {
        if (error instanceof Error) console.log(error.message, error.stack);
    }
    return redirect("/signup")
}