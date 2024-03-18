"use client"

import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../loader";
import { TextInput, Button } from "../ui";
import { ModalProps, ModalBase } from "./ModalBase";
import { ForceLogout } from "@/lib/actions/auth.actions";

/** Provides the confirmation dialog to sign out of all sessions. */
export function EndAllSessionsDialog(props: Omit<ModalProps, "children">){
    const [isWorking, setWorking] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const currentPwRef = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        setFormValid(false);
    }, [props.visible]);
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
        if(result != null) alert(result);
        setWorking(false);
    }
    return <ModalBase {...props}>
    <div className="flex flex-col gap-4">
        <h2>Sign out from all devices</h2>
        <span>Enter your current password to verify it&apos;s you.</span>
        <TextInput inputRef={currentPwRef} onChange={validate} type="password" placeholder="Enter your password"></TextInput>
        <div className="flex flex-grow justify-stretch gap-2">
            <Button disabled={isWorking} className="w-full" onClick={()=>{props.setVisible(false)}} colors="secondary">Cancel</Button>
            <Button onClick={submit} colors="danger" className="w-full flex justify-center items-center" disabled={isWorking || !formValid}>{isWorking ?
            <LoadingSpinner width={24} height={24}></LoadingSpinner> :
            "Sign out"}</Button>
        </div>
    </div>
</ModalBase>
}