"use client"
import { useState } from "react";
import { Button } from "../ui";
import { DeleteAccountDialog } from "../dialogs/DeleteAccountDialog";

export function AccountWidget(){
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);
    return <div className="border-[1px] border-widget-normal hover:border-widget-hover transition-colors p-4 rounded-2xl">
        <DeleteAccountDialog visible={deleteAccountVisible} setVisible={setDeleteAccountVisible}></DeleteAccountDialog>
        <h2>Account</h2>
        <div className="">
            <span className="pb-2 block select-none">You can change your username or delete your account. <strong>Account deletion is not a reversible action.</strong></span>
            <div className="flex">
                <Button colors="primary" disabled className="mr-2">Change username</Button>
                <Button colors="danger" onClick={(event)=>{
                    (event.target as HTMLElement)?.blur();
                    setDeleteAccountVisible(true);
                    }} className="mr-2">Delete account</Button>
            </div>
        </div>
    </div>
}