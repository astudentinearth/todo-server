'use client'
import { useState, useEffect } from "react";
import './accountMenu.css'
import useComponentVisible from "@/app/hooks/useComponentVisible";
import { useRouter } from "next/navigation";
import { getUser, logout } from "@/lib/actions/auth.actions";
export default function AccountMenu(){
    const [username, setUsername] = useState("");
    const router = useRouter();
    const visibility = useComponentVisible(false, "userbtn");
    const fetchUsername = async ()=>{
        const res = await getUser();
        if(!res) return;
        setUsername(res.username);
    }
    useEffect(()=>{
        (async ()=>{await fetchUsername();})();
    },[])
    return <div className="">
        <div onClick={()=>{
            visibility.setIsComponentVisible(!visibility.isComponentVisible)}
            } className="w-10 h-10 mr-2 bg-primary userbtn flex items-center justify-center rounded-full hover:brightness-110">
            <span className="text-2xl select-none userbtn">{username[0] ?? <i className="bi-person"></i>}</span>
        </div>
        <div ref={visibility.ref} style={visibility.isComponentVisible ? {opacity: 1, visibility:"visible"} : {opacity: 0, visibility:"hidden"}} className="fixed transition-[opacity,visibility] p-2 backdrop-blur-md menu rounded-2xl bg-black-3/75 w-72 right-2 top-20">
            <div className="w-14 h-14 z-10 bg-primary flex items-center justify-center rounded-full place-self-center">
                <span className="text-3xl select-none">{username[0] ?? <i className="bi-person"></i>}</span>
            </div>
            <span className="place-self-center z-10 justify-self-start text-xl p-4 select-none">{username}</span>
            <div onClick={()=>{router.push("/settings")}} className="z-10 account-menu-button rounded-lg hover:bg-white/10 active:brightness-125 transition-[filter,background]">
                <i className="bi-gear"></i>
                <span>Settings</span>
            </div>
            <div onClick={async ()=>{await logout()}} className="z-10 account-menu-button rounded-lg hover:bg-red-600/25 active:brightness-125 transition-[filter,background]">
                <i className="bi-box-arrow-right"></i>
                <span>Sign out</span>
            </div>
        </div>
        
    </div>
}