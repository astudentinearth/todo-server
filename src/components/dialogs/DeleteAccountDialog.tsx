"use client"

import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../loader";
import { TextInput, Button } from "../ui";
import { ModalProps, ModalBase } from "./ModalBase";
import { DeleteAccount } from "@/lib/actions/account.actions";
import { useNotify } from "@/hooks/useNotify";

/** Provides the confirmation dialog for account deletion. */
export function DeleteAccountDialog(props: Omit<ModalProps, "children">){
    const [isWorking, setWorking] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const currentPwRef = useRef<HTMLInputElement>(null);
    const {notify} = useNotify();
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
        const result = await DeleteAccount(currentPwRef.current.value);
        if(result != null) notify(result, {level: "error"});
        setWorking(false);
    }
    return <ModalBase {...props}>
    <div className="flex flex-col gap-4 max-w-[450px]">
        <h2>Delete account</h2>
        <span className="block"><strong>Account deletion is not reversible action. Your data will be permanently deleted. Export your data before deleting your account.</strong></span>
        <span className="block">Enter your current password to verify it&apos;s you.</span>
        <TextInput inputRef={currentPwRef} onChange={validate} type="password" placeholder="Enter your password"></TextInput>
        <div className="flex flex-grow justify-stretch gap-2">
            <Button disabled={isWorking} className="w-full" onClick={()=>{props.setVisible(false)}} colors="secondary">Cancel</Button>
            <Button onClick={submit} colors="danger" className="w-full flex justify-center items-center" disabled={isWorking || !formValid}>{isWorking ?
            <LoadingSpinner width={24} height={24}></LoadingSpinner> :
            "Delete my account"}</Button>
        </div>
    </div>
</ModalBase>
}