"use client"

import { useEffect } from "react"

export default function ThemeHelper(){
    useEffect(()=>{
        // check for user preference
        if(localStorage.getItem("theme") == null){
            const dark = matchMedia('(prefers-color-scheme: dark)').matches;
            if(dark) {
                localStorage.setItem("theme", "dark");
                document.querySelector(":root")?.classList.add("dark");
            }
            else localStorage.setItem("theme", "light");
        }
        else{
            if(localStorage.getItem("theme")==="dark"){
                document.querySelector(":root")?.classList.add("dark");
            }
        }
    });
    return <></>
}