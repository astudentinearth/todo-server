"use client"
import { useEffect, useState } from "react";
import { ChangePasswordDialog } from "../../dialogs";
import { UserSession } from "@/lib/types";
import { GetUserSessions } from "@/lib/actions/auth.actions";
import { EndAllSessionsDialog } from "../../dialogs/EndAllSessionsDialog";

/** Provides a frontend for security actions. */
export function SecurityWidget(){
    const [sessions, setSessions] = useState([] as UserSession[]);
    useEffect(()=>{
        (async ()=>{
            const sess = await GetUserSessions();
            if(sess==null) setSessions([]);
            else setSessions(sess);
        })();
    }, []);
    return <div className="border-[1px] border-border hover:border-widget-hover transition-colors p-4 rounded-2xl">
        <h2>Security</h2>
        <div className="">
            <span className="pb-2 block select-none">You can change your password and logout from other devices.</span>
            <div className="flex">
                <ChangePasswordDialog></ChangePasswordDialog>
                <EndAllSessionsDialog></EndAllSessionsDialog>
            </div>
        </div>
        <div className="h-4"></div>
        <h3>Active sessions</h3>
        <div className="flex flex-col w-full overflow-x-scroll">
            <table className="border-spacing-y-4 min-w-[540px] text-base divide-y divide-border overflow-x-auto w-full">
                <thead className="h-12 text-left">
                    <tr>
                        <th>Index</th>
                        <th>Platform</th>
                        <th>Browser</th>
                        <th>Expires</th>
                        <th>Valid since</th>
                    </tr>
                </thead>
                <tbody className="divide-border divide-y">
                    {sessions.map((s, i)=>
                        <tr key={i} className="h-12">
                            <td>{i}</td>
                            <td>{s.os}</td>
                            <td>{s.browser}</td>
                            <td>{new Date(s.expire).toLocaleDateString()}</td>
                            <td>{new Date(s.loginTimestamp).toLocaleDateString()}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        </div>
    </div>
}