"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image"
import { signup } from "@/lib/actions/auth.actions";
import { Button, TextInput } from "../ui";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SignupForm(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [working, setWorking] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const handleClick = async ()=>{
        if(usernameRef.current==null || passwordRef.current==null || confirmPasswordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ alert("Provide an username"); setWorking(false); return}
        if(passwordRef.current.value.trim().length==0){ alert("Provide a password"); setWorking(false); return}
        if(confirmPasswordRef.current.value!==passwordRef.current.value) {alert("Passwords don't match"); setWorking(false); return}
        setWorking(true);
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const result = await signup(username, password);
        if(result !== "" && result != null) alert(result);
        setWorking(false);
    }
    const validate = ()=>{
        if(usernameRef.current==null || passwordRef.current==null || confirmPasswordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ setFormValid(false); return}
        if(usernameRef.current.value.trim().length > 64) {setFormValid(false); return}
        if(!/^[a-zA-Z0-9_]+$/.test(usernameRef.current.value)) {setFormValid(false); return}
        if(passwordRef.current.value.trim().length==0){ setFormValid(false); return}
        if(confirmPasswordRef.current.value!==passwordRef.current.value) {setFormValid(false); return}
        if(confirmPasswordRef.current.value!==passwordRef.current.value) {setFormValid(false); return}
        setFormValid(true);
    }
    useEffect(()=>{setFormValid(false)},[]);
    return <form>
        <TextInput onChange={validate} required inputRef={usernameRef} className="w-72 mt-4 text-lg p-2 bg-black-2" placeholder="Username"></TextInput>
        <TextInput onChange={validate} required inputRef={passwordRef} type="password" className="w-72 mt-4 text-lg p-2 bg-black-2" placeholder="Password"></TextInput>
        <TextInput onChange={validate} required inputRef={confirmPasswordRef} type="password" className="w-72 mt-4 text-lg p-2 bg-black-2" placeholder="Confirm password"></TextInput>
        <Button onClick={handleClick} type="submit" disabled={working || !formValid} className="block mt-4 text-center w-72 text-lg p-2">
            {working ? <span className="text-center translate-x-[-24px]"><Image className="animate-spin inline-block" width={24} height={24} src="/loader.svg" alt="Signing in"></Image></span> : "Create account"}
        </Button>
    </form>
}