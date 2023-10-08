'use client'
import Link from "next/link"
import Image from "next/image"
import loader from "@/public/loader.svg"
import { useEffect, useRef, useState } from "react"

export default function LoginPage(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [working, setWorking] = useState(false);
    const login = ()=>{
        if(usernameRef.current==null) return;
        if(passwordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ alert("Provide an username"); setWorking(false); return}
        if(passwordRef.current.value.trim().length==0){ alert("Provide a password"); setWorking(false); return}
        setWorking(true);
        let req = new XMLHttpRequest();
        req.onreadystatechange = ()=>{
            if(req.readyState==4 && req.status==400){
               switch(req.responseText){
                    case "USER_DOESNT_EXIST": {alert("User doesn't exist."); setWorking(false); break;}
                    case "INVALID_PASSWORD": {alert("Password incorrect."); setWorking(false); break;}
               }
               return;
            }
            if(req.readyState==4 && req.status==200){
                console.log("Logged in")
                window.location.href="/";
            }
        }
        req.open("POST","/api/v1/login",true);
        req.setRequestHeader("Content-Type", "application/json")
        req.send(JSON.stringify({username: usernameRef.current.value, password: passwordRef.current.value}))
    }
    useEffect(()=>{
        let req = new XMLHttpRequest();
        req.onreadystatechange = ()=>{
            if(req.readyState==4 && req.status==200){
                window.location.href="/";
            }
        };
        req.open("GET","/api/v1/validate-session",true);
        req.send();
    },[])
    return <div className="absolute left-[50%] top-[50%] bg-black-2 translate-x-[-50%] translate-y-[-50%] text-white p-4 rounded-lg drop-shadow-xl">
        <h1 className="select-none">Sign in</h1>
        <input ref={usernameRef} className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Username"></input>
        <input ref={passwordRef} type="password" className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Password"></input>
        <button onClick={login} disabled={working} className="block mt-4 text-center w-72 text-lg p-2 bg-primary disabled:brightness-75 disabled:hover:brightness-75 disabled:active:brightness-75 rounded-md hover:brightness-125 active:brightness-110 transition-[filter]">
            {working ? <span className="text-center translate-x-[-24px]"><Image className="animate-spin inline-block" width={24} height={24} src={loader} alt="Signing in"></Image></span> : "Sign in"}
        </button>
        <span className="block text-lg mt-4">{"Don't have an account? "} <Link className="text-primary hover:underline" href={"/signup"}>Sign up</Link></span>
    </div>
}