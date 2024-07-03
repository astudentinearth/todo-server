"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteAccountDialog } from "../../dialogs/DeleteAccountDialog";
import { ChangeUsernameDialog } from "../../dialogs/ChangeUsernameDialog";

/** Provides the frontend for account deletion and username change actions. */
export function AccountWidget(){
    return <div className="border-[1px] border-border hover:border-widget-hover transition-colors p-4 rounded-2xl">
        <h2>Account</h2>
        <div className="">
            <span className="pb-2 block select-none">You can change your username or delete your account. <strong>Account deletion is not a reversible action.</strong></span>
            <div className="flex">
                <ChangeUsernameDialog></ChangeUsernameDialog>
                <DeleteAccountDialog></DeleteAccountDialog>
            </div>
        </div>
    </div>
}