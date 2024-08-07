"use client"

import { login } from "@/lib/actions/auth.actions";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TextInput } from "../ui/custom";
import { useNotify } from "@/hooks/useNotify";
import { Button } from "@/components/ui/button";

/** Component for sign in UI. */
export default function LoginForm(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const {notify} = useNotify();
    const [working, setWorking] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const handleClick = async ()=>{
        if(usernameRef.current==null) return;
        if(passwordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ notify("Provide an username", {level: "error"}); setWorking(false); return}
        if(passwordRef.current.value.length==0){ notify("Provide a password", {level: "error"}); setWorking(false); return}
        setWorking(true);
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const result = await login(username, password);
        if(result !== "" && result != null) notify(result, {level: "error", timeout: 5000});
        setWorking(false);
    }
    const validate = ()=>{
        if(usernameRef.current==null || passwordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ setFormValid(false); return}
        if(usernameRef.current.value.trim().length > 64) {setFormValid(false); return}
        if(!/^[a-zA-Z0-9_]+$/.test(usernameRef.current.value)) {setFormValid(false); return}
        if(passwordRef.current.value.length==0){ setFormValid(false); return}
        if(passwordRef.current.value.length<8){ setFormValid(false); return}
        if(passwordRef.current.value.length>64){ setFormValid(false); return}
        setFormValid(true);
    }
    useEffect(()=>{setFormValid(false)},[]);
    return <form>
        <TextInput onChange={validate} required inputRef={usernameRef} className="w-full mt-4 text-lg p-2 bg-view-1" placeholder="Username"></TextInput>
        <TextInput onChange={validate} required inputRef={passwordRef} type="password" className="w-full mt-4 text-lg p-2 bg-view-1" placeholder="Password"></TextInput>
        <Button onClick={handleClick} type="submit" disabled={working || !formValid} className="block mt-4 text-center w-full text-lg" size={"lg"}>
            {working ? <span className="text-center translate-x-[-24px]"><Image className="animate-spin inline-block" width={24} height={24} src="/loader.svg" alt="Signing in"></Image></span> : "Sign in"}
        </Button>
    </form>
}