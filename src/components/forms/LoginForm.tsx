"use client"

import { login } from "@/lib/actions/auth.actions";
import { useRef, useState } from "react";
import Image from "next/image";

export default function LoginForm(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [working, setWorking] = useState(false);
    const handleClick = async ()=>{
        if(usernameRef.current==null) return;
        if(passwordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ alert("Provide an username"); setWorking(false); return}
        if(passwordRef.current.value.trim().length==0){ alert("Provide a password"); setWorking(false); return}
        setWorking(true);
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const result = await login(username, password);
        if(result !== "" && result != null) alert(result);
        setWorking(false);
    }
    return <form>
        <input ref={usernameRef} className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Username"></input>
        <input ref={passwordRef} type="password" className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Password"></input>
        <button onClick={handleClick} disabled={working} className="block mt-4 text-center w-72 text-lg p-2 bg-primary disabled:brightness-75 disabled:hover:brightness-75 disabled:active:brightness-75 rounded-md hover:brightness-125 active:brightness-110 transition-[filter]">
            {working ? <span className="text-center translate-x-[-24px]"><Image className="animate-spin inline-block" width={24} height={24} src="/loader.svg" alt="Signing in"></Image></span> : "Sign in"}
        </button>
    </form>
}