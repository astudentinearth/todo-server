"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image"
import { signup } from "@/lib/actions/auth.actions";
import { TextInput } from "../ui/custom";
import { useNotify } from "@/hooks/useNotify";
import { Button } from "@/components/ui/button";

/** Component for sign up UI. */
export default function SignupForm(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [working, setWorking] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {notify} = useNotify();
    const handleClick = async ()=>{
        if(usernameRef.current==null || passwordRef.current==null || confirmPasswordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ notify("Provide an username", {level: "error"}); setWorking(false); return}
        if(passwordRef.current.value.length==0){ notify("Provide a password", {level: "error"}); setWorking(false); return}
        if(confirmPasswordRef.current.value!==passwordRef.current.value) {notify("Passwords don't match", {level: "error"}); setWorking(false); return}
        setWorking(true);
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value;
        const result = await signup(username, password);
        if(result !== "" && result != null) notify(result, {level: "error"});
        setWorking(false);
    }
    const validate = ()=>{
        if(usernameRef.current==null || passwordRef.current==null || confirmPasswordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){setFormValid(false); return}
        if(usernameRef.current.value.trim().length > 64) {setErrorMessage("Usernames must not exceed 64 characters."); setFormValid(false); return}
        if(!/^[a-zA-Z0-9_]+$/.test(usernameRef.current.value)) {setErrorMessage("Only letters, numbers and underscores are allowed."); setFormValid(false); return}
        if(passwordRef.current.value.length==0){setErrorMessage(""); setFormValid(false); return}
        if(passwordRef.current.value.length<8){ setErrorMessage("Password must be at least 8 characters long."); setFormValid(false); return}
        if(passwordRef.current.value.length>64){setErrorMessage("Password must be at most 64 characters long."); setFormValid(false); return}
        if(confirmPasswordRef.current.value!==passwordRef.current.value) {setErrorMessage("Passwords don't match.");setFormValid(false); return}
        if(usernameRef.current.value === passwordRef.current.value) {setErrorMessage("Password and username can't be the same."); setFormValid(false)}
        setErrorMessage("");
        setFormValid(true);
    }
    useEffect(()=>{setFormValid(false)},[]);
    return <form>
        <TextInput onChange={validate} required inputRef={usernameRef} className="w-full mt-4 text-lg p-2 bg-view-1" placeholder="Username"></TextInput>
        <TextInput onChange={validate} required inputRef={passwordRef} type="password" className="w-full mt-4 text-lg p-2 bg-view-1" placeholder="Password"></TextInput>
        <TextInput onChange={validate} required inputRef={confirmPasswordRef} type="password" className="w-full mt-4 text-lg p-2 bg-view-1" placeholder="Confirm password"></TextInput>
        {errorMessage ? <span className=" text-[12px] text-destructive text-ellipsis">{errorMessage}</span> : <span className="text-base">&nbsp;</span>}
        <Button onClick={handleClick} type="submit" disabled={working || !formValid} className="block mt-4 text-center w-full text-lg p-2" size={"lg"}>
            {working ? <span className="text-center translate-x-[-24px]"><Image className="animate-spin inline-block" width={24} height={24} src="/loader.svg" alt="Signing in"></Image></span> : "Create account"}
        </Button>
    </form>
}