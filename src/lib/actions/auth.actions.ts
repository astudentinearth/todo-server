"use server"

import bcrypt from "bcrypt"
import { generateId } from "lucia";
export async function signup(username: string, password: string) : Promise<string>{
    // username validation
    if(!/^[a-zA-Z0-9_]+$/.test(username)){
        return "Username contains invalid characters.";
    }
    if(username.length>32) return "Username too long. Pick one that is 32 characters at maximum.";

    // password validation
    if(password.length<8) return "Password must be at least 8 characters.";
    if(password.length>64) return "Password length should not exceed 64 characters";
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateId(15);
    
}