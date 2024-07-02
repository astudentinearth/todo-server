"use client"

import { ReactNode, useState } from "react"
import { ToastsContext } from "./ToastContext"
import { Toast } from "@/lib/types"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/** Wrapper for context providers */
export default function Providers(props: {children: ReactNode}){
    const [notifications, setNotifications] = useState<Toast[]>([]);
    return <ToastsContext.Provider value={{notifications, setNotifications}}>
        <NextThemesProvider attribute="class" defaultTheme="dark" storageKey="theme">
            {props.children}
        </NextThemesProvider>
    </ToastsContext.Provider>
}