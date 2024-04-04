"use client"

import { cn } from "@/lib/util";
import { useEffect, useState } from "react";

export default function Glow(){
    const [cl, setCl] = useState("");
    useEffect(()=>{
        // In a side effect because document goes undefined
        const darkmode = document.querySelector(":root")?.classList.contains("dark");
        const c = cn("w-[85vw] h-[720px] blur-[128px] rounded-full bg-primary/15 absolute left-[50%] translate-x-[-50%] translate-y-[-90%]", !darkmode && "hidden");
        setCl(c);
    })
    return <>
        <div className={cl}></div>
    </>
}   