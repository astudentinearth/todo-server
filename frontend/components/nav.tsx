'use client'

import { useEffect, useState } from "react";

export default function Nav(){
    const [username, setUsername] = useState("");
    const logout = async ()=>{
        const res = await fetch('/api/v1/logout');
        if(res.ok){
            window.location.href="/login"
        }
    }
    
    const fetchUsername = async ()=>{
        const res = await fetch("/api/v1/get-username");
        if(res.ok) setUsername(await res.text());
    }

    useEffect(()=>{
        fetchUsername();
    },[])
    return <div className="text-white h-12 p-2 gap-2 items-center flex flex-row">
        <div className="flex-grow"></div>
        <div className="bg-black-2 flex-shrink-0 p-2 select-none rounded-md"><i className="bi-person"></i>  {username}</div>
        <div onClick={logout} className="bg-black-2 cursor-pointer hover:bg-red-500 transition-colors flex-shrink-0 p-2 w-10 text-center rounded-md"><i className="bi-box-arrow-right"></i></div>
    </div>
}