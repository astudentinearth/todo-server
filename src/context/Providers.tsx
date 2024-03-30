"use client"

import { ReactNode, useState } from "react"
import { ToastsContext } from "./ToastContext"
import { Toast } from "@/lib/types"

/** Wrapper for context providers */
export default function Providers(props: {children: ReactNode}){
    const [notifications, setNotifications] = useState<Toast[]>([]);
    return <ToastsContext.Provider value={{notifications, setNotifications}}>
        {props.children}
    </ToastsContext.Provider>
}