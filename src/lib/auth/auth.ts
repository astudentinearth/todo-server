import { adapter } from "../db";
import { Lucia } from "lucia";
import { cookies } from "next/headers"
import { cache } from "react";
import type { Session, User } from "lucia";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes: DatabaseUserAttributes) => {
        return {
            username: attributes.username
        };
    }
})

declare module "lucia" {
    interface Register{
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes{
    username: string
}

export const validateRequest = cache(async (): Promise<{user: User, session: Session} | {user:null, session: null}> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if(!sessionId) return {user: null, session: null}
    const result = await lucia.validateSession(sessionId);
    try{
        if(result.session && result.session.fresh){
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if(!result.session){
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    }
    catch (err){
        if(err instanceof Error) console.log(err.message);
    }
    return result;
})