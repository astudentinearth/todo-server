import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    colors?: "primary" | "secondary" | "danger",
    radius?: "rounded" | "rounded-sm" | "rounded-md" | "rounded-lg" | "rounded-xl" | "rounded-2xl"
}

const ButtonStyles = {
    primary: "bg-primary border-[1px] border-primary transition-[filter,background,color,border] hover:brightness-125 text-white",
    secondary: "border-[1px] border-widget-normal transition-colors hover:bg-widget-hover hover:border-widget-hover",
    danger: "border-[1px] border-red-500/50 hover:text-white hover:bg-red-500/50 hover:border-transparent transition-colors",
    disabled: "bg-gray-800 transition-[filter,background,color,border] text-gray-500 border-[1px] border-gray-800"
}

export function Button(props: ButtonProps){
    let classnames = "";
    if(props.colors != null){
       classnames = ButtonStyles[props.colors];
    } else classnames = ButtonStyles["primary"]
    if(props.disabled) classnames = ButtonStyles["disabled"]
    classnames += " " + (props.radius ?? "")
    return <button {...props} className={"p-2 text-base block select-none rounded-lg overflow-x-hidden overflow-y-hidden" + " " + (props.className ?? "") + " " + classnames}>{props.children}</button>
}