"use client"

import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../loader";
import { TextInput } from "../ui/custom";
import { DeleteAccount } from "@/lib/actions/account.actions";
import { useNotify } from "@/hooks/useNotify";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

/** Provides the confirmation dialog for account deletion. */
export function DeleteAccountDialog(){
    const [isWorking, setWorking] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const currentPwRef = useRef<HTMLInputElement>(null);
    const {notify} = useNotify();
    useEffect(()=>{
        setFormValid(false);
    }, []);
    const validate = ()=>{
        if(currentPwRef.current==null) {setFormValid(false); return;}
        if(currentPwRef.current.value.length < 8) {setFormValid(false); return}
        setFormValid(true);
    }
    const submit = async ()=>{
        validate();
        if(!formValid) return;
        if(currentPwRef.current==null) return;
        setWorking(true);
        const result = await DeleteAccount(currentPwRef.current.value);
        if(result != null) notify(result, {level: "error"});
        setWorking(false);
    }
    return <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button variant="destructive" className="mr-2">Delete account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col gap-4 max-w-[450px] border-border border p-4">
            <AlertDialogHeader>
                <AlertDialogTitle>Delete account</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="flex flex-col gap-2">
                <span className="block"><strong>Account deletion is not reversible action. Your data will be permanently deleted. Export your data before deleting your account.</strong></span>
                <span className="block">Enter your current password to verify it&apos;s you.</span>
                <TextInput inputRef={currentPwRef} onChange={validate} type="password" placeholder="Enter your password"></TextInput>
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel disabled={isWorking} className="w-full">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={submit} className="w-full flex justify-center items-center bg-transparent border border-destructive hover:bg-destructive/90 text-foreground hover:text-destructive-foreground"  disabled={isWorking || !formValid}>{isWorking ?
                <LoadingSpinner width={24} height={24}></LoadingSpinner> :
                "Delete my account"}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}