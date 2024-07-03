"use client"

import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../loader";
import { TextInput } from "../ui/custom";
import { ForceLogout } from "@/lib/actions/auth.actions";
import { useNotify } from "@/hooks/useNotify";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";

/** Provides the confirmation dialog to sign out of all sessions. */
export function EndAllSessionsDialog(){
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
        const result = await ForceLogout(currentPwRef.current.value);
        if(result != null) notify(result, {level: "error"});
        setWorking(false);
    }
    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant={"destructive"} className="mr-2">Logout from all devices</Button>
        </AlertDialogTrigger>
    <AlertDialogContent className="flex flex-col gap-4 border-border p-4 max-w-[400px]">
        <h2>Sign out from all devices</h2>
        <span>Enter your current password to verify it&apos;s you.</span>
        <TextInput inputRef={currentPwRef} onChange={validate} type="password" placeholder="Enter your password"></TextInput>
        <div className="flex flex-grow justify-stretch gap-2">
           
        </div>
        <AlertDialogFooter>
            <AlertDialogCancel disabled={isWorking} className="w-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submit} className="w-full flex justify-center items-center bg-transparent border border-destructive hover:bg-destructive/90 text-foreground hover:text-destructive-foreground" disabled={isWorking || !formValid}>{isWorking ?
            <LoadingSpinner width={24} height={24}></LoadingSpinner> :
            "Sign out"}</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>
}