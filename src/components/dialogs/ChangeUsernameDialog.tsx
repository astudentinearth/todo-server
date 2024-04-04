"use client"
import { useEffect, useRef, useState } from "react";
import { TextInput } from "../ui/custom";
import { ModalProps, ModalBase } from "./ModalBase";
import LoadingSpinner from "../loader";
import { ChangeUsername } from "@/lib/actions/auth.actions";
import { useNotify } from "@/hooks/useNotify";
import { Button } from "@/components/ui/button";

/** Provides the confirmation dialog for username change. */
export function ChangeUsernameDialog(props: Omit<ModalProps, "children">){
    // State to disable the change username button until API response arrives
    const [isWorking, setWorking] = useState(false);
    const [formValid, setFormValid] = useState(false);
    // Refs to the actual inputs
    const newUsernameRef = useRef<HTMLInputElement>(null);
    const currentPwRef = useRef<HTMLInputElement>(null);
    const {notify} = useNotify();
    useEffect(()=>{
        setFormValid(false);
    }, [props.visible]);
    const validate = ()=>{
        if(currentPwRef.current==null) return;
        if(newUsernameRef.current==null) return;
        if(currentPwRef.current.value.length < 8) {setFormValid(false); return}
        if(newUsernameRef.current.value.trim().length === 0) {setFormValid(false); return}
        if(newUsernameRef.current.value.trim().length > 64) {setFormValid(false); return}
        setFormValid(true);
    }
    const submit = async ()=>{
        validate();
        if(!formValid) return;
        if(currentPwRef.current==null) return;
        if(newUsernameRef.current==null) return;
        setWorking(true);
        const result = await ChangeUsername(newUsernameRef.current.value, currentPwRef.current.value);
        if(result==null) {
            props.setVisible(false);
            setWorking(false);
            setFormValid(false);
            notify("Your username has been changed.");
        } else notify(result ?? "Unknown error", {level: "error"});
        setWorking(false);
    }
    return <ModalBase {...props}>
        <div className="flex flex-col gap-4">
            <h2>Change password</h2>
            <span>Enter your password to confirm it&apos;s you.</span>
            <TextInput inputRef={currentPwRef} onChange={validate} type="password" placeholder="Enter your password"></TextInput>
            <TextInput inputRef={newUsernameRef} onChange={validate} type="text" placeholder="New username"></TextInput>
            <div className="flex flex-grow justify-stretch gap-2">
                <Button disabled={isWorking} className="w-full" onClick={()=>{props.setVisible(false)}} variant="secondary">Cancel</Button>
                <Button onClick={submit} className="w-full flex justify-center items-center" disabled={isWorking || !formValid}>{isWorking ?
                <LoadingSpinner width={24} height={24}></LoadingSpinner> :
                "Change username"}</Button>
            </div>
        </div>
    </ModalBase>
}