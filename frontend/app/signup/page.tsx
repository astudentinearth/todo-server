'use client'
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function SignupPage(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const login = ()=>{
        if(usernameRef.current==null) return;
        if(passwordRef.current==null) return;
        if(confirmPasswordRef.current==null) return;
        if(usernameRef.current.value.trim().length==0){ alert("Provide an username"); return}
        if(passwordRef.current.value.trim().length==0){ alert("Provide a password"); return}
        if(confirmPasswordRef.current.value!==passwordRef.current.value) {alert("Passwords don't match"); return}
        let req = new XMLHttpRequest();
        let loginReq = new XMLHttpRequest();
        req.onreadystatechange = ()=>{
            if(usernameRef.current==null) return;
            if(passwordRef.current==null) return;
            if(req.readyState!=4) return;
            if(req.status==400){
                alert("Couldn't sign up - invalid request.")
                return;
            }
            if(req.status==500){
                alert("Internal server error, try again later.")
            }
            if(req.status==200){
                loginReq.send(JSON.stringify({username: usernameRef.current.value, password: passwordRef.current.value}))
            }
        }
        loginReq.onreadystatechange = ()=>{
            if(req.readyState==4 && req.status==200){
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
        <h1 className="select-none">Create account</h1>
        <input ref={usernameRef} className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Username"></input>
        <input ref={passwordRef} type="password" className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Password"></input>
        <input ref={confirmPasswordRef} type="password" className="block w-72 mt-4 text-lg p-2 bg-black-3 rounded-md outline-none" placeholder="Confirm password"></input>
        <button onClick={login} className="block mt-4 w-72 text-lg p-2 bg-primary rounded-md hover:brightness-125 active:brightness-110 transition-[filter]">Sign in</button>
        <span className="block text-lg mt-4">{"Already have an account? "} <Link className="text-primary hover:underline" href={"/login"}>Sign in</Link></span>
    </div>
}