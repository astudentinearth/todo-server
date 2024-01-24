"use client"
import { useEffect, useRef, useState } from "react";
import { Button, TextInput } from "../ui";
import { ModalProps, ModalBase } from "./ModalBase";
import LoadingSpinner from "../loader";
import { ChangePassword } from "@/lib/api";

export function ChangePasswordDialog(props: Omit<ModalProps, "children">){
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
    useEffect(()=>{
        setFormValid(false);
    }, [props.visible]);
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
        if(result) {
            props.setVisible(false);
            setWorking(false);
            setFormValid(false);
            window.alert("Your password has been changed.");
        }
        setWorking(false);
    }
    return <ModalBase {...props}>
        <div className="flex flex-col gap-4">
            <h2>Change password</h2>
            <TextInput inputRef={currentPwRef} onChange={validate} error={currentPwErr} type="password" placeholder="Current password"></TextInput>
            <TextInput inputRef={newPwRef} error={newPwErr} onChange={validate} type="password" placeholder="New password"></TextInput>
            <TextInput inputRef={confirmPwRef} onChange={validate} error={confirmPwErr} type="password" placeholder="Confirm new password"></TextInput>
            {errorMessage ? <span className="text-base text-red-500">{errorMessage}</span> : <span className="text-base">&nbsp;</span>}
            <div className="flex flex-grow justify-stretch gap-2">
                <Button disabled={isWorking} className="w-full" onClick={()=>{props.setVisible(false)}} colors="secondary">Cancel</Button>
                <Button onClick={submit} className="w-full flex justify-center items-center" disabled={isWorking || !formValid}>{isWorking ?
                <LoadingSpinner width={24} height={24}></LoadingSpinner> :
                "Change password"}</Button>
            </div>
        </div>
    </ModalBase>
}