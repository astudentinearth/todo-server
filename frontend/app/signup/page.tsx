'use client'
import Link from "next/link"
import Image from "next/image"
import loader from "@/public/loader.svg"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const router = useRouter();
    const [working, setWorking] = useState(false);
    const login = ()=>{
        if(usernameRef.current==null) return;
        if(passwordRef.current==null) return;
        if(confirmPasswordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ alert("Provide an username"); setWorking(false); return}
        if(passwordRef.current.value.trim().length==0){ alert("Provide a password"); setWorking(false); return}
        if(confirmPasswordRef.current.value!==passwordRef.current.value) {alert("Passwords don't match"); setWorking(false); return}
        setWorking(true);
        const req = new XMLHttpRequest();
        const loginReq = new XMLHttpRequest();
        const username = usernameRef.current.value;
        req.onreadystatechange = ()=>{
            if(usernameRef.current==null) return;
            if(passwordRef.current==null) return;
            if(req.readyState!=4) return;
            if(req.status==400){
                alert("Couldn't sign up - invalid request.")
                setWorking(false);
                return;
            }
            if(req.status==500){
                alert("Internal server error, try again later.");
                setWorking(false);
            }
            if(req.status==200){
                loginReq.send(JSON.stringify({username: usernameRef.current.value, password: passwordRef.current.value}))
            }
        }
        loginReq.onreadystatechange = ()=>{
            if(req.readyState==4 && req.status==200){
                localStorage.setItem("username",username);
                window.location.href="/";
            }
        }
        req.open("POST","/api/v1/register",true);
        loginReq.open("POST", "/api/v1/login",true);
        req.setRequestHeader("Content-Type", "application/json");
        loginReq.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({username: usernameRef.current.value, password: passwordRef.current.value}));

    }
    useEffect(()=>{
        const req = new XMLHttpRequest();
        req.onreadystatechange = ()=>{
            if(req.readyState==4 && req.status==200){
                window.location.href="/";
            }
        };
        req.open("GET","/api/v1/validate-session",true);
        req.send();
    },[])
    useEffect(()=>{
        router.prefetch("/");
    },[router]);
    return <div className="absolute left-[50%] top-[50%] bg-black-2 translate-x-[-50%] translate-y-[-50%] text-white p-4 rounded-lg drop-shadow-xl">
        <h1 className="select-none">Create account</h1>
        <input ref={usernameRef} className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Username"></input>
        <input ref={passwordRef} type="password" className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Password"></input>
        <input ref={confirmPasswordRef} type="password" className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Confirm password"></input>
        <button onClick={login} disabled={working} className="block mt-4 text-center w-72 text-lg p-2 bg-primary disabled:brightness-75 disabled:hover:brightness-75 disabled:active:brightness-75 rounded-md hover:brightness-125 active:brightness-110 transition-[filter]">
            {working ? <span className="text-center translate-x-[-24px]"><Image className="animate-spin inline-block" width={24} height={24} src={loader} alt="Signing in"></Image></span> : "Create account"}
        </button>
        <span className="block text-lg mt-4">{"Already have an account? "} <Link className="text-primary hover:underline" href={"/login"}>Sign in</Link></span>
    </div>
}