"use client"

import { ToastsContext } from "@/context/ToastContext"
import { useNotify } from "@/hooks/useNotify"
import { Toast } from "@/lib/types"
import { cn } from "@/lib/util"
import { useContext } from "react"

/**
 * Top level component to display the first 5 notifications from context
 */
export function ToastContainer(){
    const {notifications} = useContext(ToastsContext)
    return <div className="flex flex-col gap-2 text-body mb-2 z-[90] px-2 w-full sm:w-96 absolute left-[50%] translate-x-[-50%] bottom-0 bg-transparent">
        {notifications.slice(0,5).map((t, i)=><ToastComponent key={i} toast={t}></ToastComponent>)}
    </div>
}

/** An individual notification. Left clicking will dismiss the notification while right clicking will copy the message. */
function ToastComponent(props: {toast: Toast}){
    const {level = "info", content, id} = props.toast;
    const {dismiss} = useNotify();
    const icon = cn(
        level==="info" && "bi-info",
        level==="warning" && "bi-exclamation-triangle-fill text-yellow-500",
        level==="error" && "bi-x-circle-fill text-danger",
        "w-6"
    )
    const container = cn(
        "transition-[background-color,color,filter,border] select-none hover:border-widget-hover items-center border-widget-normal border-2",
        "p-2 bg-modal-3 rounded-lg  text-xl flex gap-2 drop-shadow-sm")
    return <div onClick={()=>{dismiss(id)}} onContextMenu={(e)=>{
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(content);
    }} className={container}>
        <i className={icon}></i>
        {content}
    </div>
}