import { adapter } from "../db";
import { Lucia } from "lucia";
import { cookies } from "next/headers"
import { cache } from "react";
import type { Session, User } from "lucia";

// Set up authentication
export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            //secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes: DatabaseUserAttributes) => {
        return {
            username: attributes.username
        };
    },
    getSessionAttributes: (attributes: DatabaseSessionAttributes) => {
        return {userAgent: attributes.userAgent, creationTime: attributes.creationTime};
    }
})

declare module "lucia" {
    interface Register{
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
        DatabaseSessionAttributes: DatabaseSessionAttributes
    }
  
}

interface DatabaseUserAttributes{
    username: string
}

interface DatabaseSessionAttributes{
    userAgent: string,
    creationTime: Date
}  

/** Validates sessions and creates a session cookie if the session was created just now. */
export const validateRequest = cache(async (): Promise<{user: User, session: Session} | {user:null, session: null}> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if(!sessionId) return {user: null, session: null}
    const result = await lucia.validateSession(sessionId);
    try{
        // there is a new session
        if(result.session && result.session.fresh){
            const sessionCookie = lucia.createSessionCookie(result.session.id); // create new session cookie
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if(!result.session){ // no session
            const sessionCookie = lucia.createBlankSessionCookie(); // set empty session cookie
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    }
    catch (err){
        if(err instanceof Error) console.log(err.message);
    }
    return result;
})