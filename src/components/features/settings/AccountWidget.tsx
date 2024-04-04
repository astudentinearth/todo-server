"use client"
import { useState } from "react";
import { Button } from "../../ui/custom";
import { DeleteAccountDialog } from "../../dialogs/DeleteAccountDialog";
import { ChangeUsernameDialog } from "../../dialogs/ChangeUsernameDialog";

/** Provides the frontend for account deletion and username change actions. */
export function AccountWidget(){
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);
    const [changeUsernameVisible, setChangeUsernameVisible] = useState(false);
    return <div className="border-[1px] border-widget-normal hover:border-widget-hover transition-colors p-4 rounded-2xl">
        <DeleteAccountDialog visible={deleteAccountVisible} setVisible={setDeleteAccountVisible}></DeleteAccountDialog>
        <ChangeUsernameDialog visible={changeUsernameVisible} setVisible={setChangeUsernameVisible}></ChangeUsernameDialog>
        <h2>Account</h2>
        <div className="">
            <span className="pb-2 block select-none">You can change your username or delete your account. <strong>Account deletion is not a reversible action.</strong></span>
            <div className="flex">
                <Button colors="primary" onClick={(event)=>{
                    (event.target as HTMLElement)?.blur();
                    setChangeUsernameVisible(true);
                    }} className="mr-2">Change username</Button>
                <Button colors="danger" onClick={(event)=>{
                    (event.target as HTMLElement)?.blur();
                    setDeleteAccountVisible(true);
                    }} className="mr-2">Delete account</Button>
            </div>
        </div>
    </div>
}