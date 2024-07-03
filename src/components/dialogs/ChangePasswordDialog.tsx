"use client"
import { useEffect, useRef, useState } from "react";
import { TextInput } from "../ui/custom";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../loader";
import { ChangePassword } from "@/lib/actions/auth.actions";
import { useNotify } from "@/hooks/useNotify";
import { AlertDialog,
    AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter
 } from "@/components/ui/alert-dialog"

/** Provides the confirmation dialog for password change. */
export function ChangePasswordDialog(){
    // Error message to be shown at the bottom
    const [errorMessage, setErrorMessage] = useState("");
    // Invalid states
    const [currentPwErr, setCurrentPwErr] = useState(false);
    const [newPwErr, setNewPwErr] = useState(false);
    const [confirmPwErr, setConfirmPwErr] = useState(false);
    // State to disable the change password button until API response arrives
    const [isWorking, setWorking] = useState(false);
    const [formValid, setFormValid] = useState(false);
    // Refs to the actual inputs
    const newPwRef = useRef<HTMLInputElement>(null);
    const currentPwRef = useRef<HTMLInputElement>(null);
    const confirmPwRef = useRef<HTMLInputElement>(null);
    const {notify} = useNotify();
    useEffect(()=>{
        setFormValid(false);
    }, []);
    const validate = ()=>{
        if(currentPwRef.current==null) return;
        if(newPwRef.current==null) return;
        if(confirmPwRef.current==null) return;
        if(!currentPwRef.current.value) {
            setErrorMessage("Enter your current password first.");
            setCurrentPwErr(true)
            setNewPwErr(false);
            setConfirmPwErr(false);
            setFormValid(false);
            return;
        } else setCurrentPwErr(false)
        if(newPwRef.current.value.length < 8 && newPwRef.current.value){
            setErrorMessage("Password must be at least 8 characters long.");
            setNewPwErr(true);
            setFormValid(false);
            return;
        } else if(!newPwRef.current.value){ 
            setNewPwErr(false);
            setErrorMessage("");
            setFormValid(false);
            return;
        }
        else setNewPwErr(false);
        if(newPwRef.current.value !== confirmPwRef.current.value){
            setErrorMessage("Passwords do not match.");
            setConfirmPwErr(true);
            setFormValid(false);
            return;
        } else setConfirmPwErr(false);
        setErrorMessage("");
        setFormValid(true);
    }
    const submit = async ()=>{
        validate();
        if(!formValid) return;
        if(currentPwRef.current==null) return;
        if(newPwRef.current==null) return;
        setWorking(true);
        const result = await ChangePassword(currentPwRef.current.value, newPwRef.current.value);
        if(result===true) {
            setWorking(false);
            setFormValid(false);
            notify("Your password has been changed");
        } else notify(result ?? "Unknown error", {level: "error"});
        setWorking(false);
    }
    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant={"default"} className="mr-2">Change password</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-border p-4 max-w-[400px]">
            <AlertDialogHeader>
                <AlertDialogTitle>Change password</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="flex flex-col gap-2">
                <TextInput inputRef={currentPwRef} onChange={validate} error={currentPwErr} type="password" placeholder="Current password"></TextInput>
                <TextInput inputRef={newPwRef} error={newPwErr} onChange={validate} type="password" placeholder="New password"></TextInput>
                <TextInput inputRef={confirmPwRef} onChange={validate} error={confirmPwErr} type="password" placeholder="Confirm new password"></TextInput>
                {errorMessage ? <span className="text-base text-destructive">{errorMessage}</span> : <span className="text-base">&nbsp;</span>}
            </AlertDialogDescription>
            <AlertDialogFooter className="">
                <AlertDialogCancel disabled={isWorking} className="w-full">
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={submit} disabled={isWorking || !formValid} className="w-full">
                    {isWorking ? <LoadingSpinner width={24} height={24}></LoadingSpinner> : "Change password"}
                </AlertDialogAction>
            </AlertDialogFooter>
       </AlertDialogContent>
    </AlertDialog>
}