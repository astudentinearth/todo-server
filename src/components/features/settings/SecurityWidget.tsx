"use client"
import { useEffect, useState } from "react";
import { ChangePasswordDialog } from "../../dialogs";
import { Button } from "../../ui";
import { UserSession } from "@/lib/types";
import { GetUserSessions } from "@/lib/actions/auth.actions";
import { EndAllSessionsDialog } from "../../dialogs/EndAllSessionsDialog";

/** Provides a frontend for security actions. */
export function SecurityWidget(){
    const [changePassVisible, setChangePassVisible] = useState(false);
    const [logoutVisible, setLogoutVisible] = useState(false);
    const [sessions, setSessions] = useState([] as UserSession[]);
    useEffect(()=>{
        (async ()=>{
            const sess = await GetUserSessions();
            if(sess==null) setSessions([]);
            else setSessions(sess);
        })();
    }, []);
    return <div className="border-[1px] border-widget-normal hover:border-widget-hover transition-colors p-4 rounded-2xl">
        <ChangePasswordDialog visible={changePassVisible} setVisible={setChangePassVisible}></ChangePasswordDialog>
        <EndAllSessionsDialog visible={logoutVisible} setVisible={setLogoutVisible}></EndAllSessionsDialog>
        <h2>Security</h2>
        <div className="">
            <span className="pb-2 block select-none">You can change your password and logout from other devices.</span>
            <div className="flex">
                <Button onClick={(event)=>{
                    (event.target as HTMLElement)?.blur();
                    setChangePassVisible(true);
                    }} colors="primary" className="mr-2">Change password</Button>
                <Button colors="danger" className="mr-2" onClick={(event)=>{
                    (event.target as HTMLElement)?.blur();
                    setLogoutVisible(true);
                    }}>Logout from all devices</Button>
            </div>
        </div>
        <div className="h-4"></div>
        <h3>Active sessions</h3>
        <div className="flex flex-col w-full overflow-x-scroll">
            <table className="border-spacing-y-4 min-w-[540px] text-base divide-y-2 divide-widget-normal overflow-x-auto w-full">
                <thead className="h-12 text-left">
                    <th>Index</th>
                    <th>Platform</th>
                    <th>Browser</th>
                    <th>Expires</th>
                    <th>Valid since</th>
                </thead>
                <tbody className="divide-widget-normal divide-y-2">
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