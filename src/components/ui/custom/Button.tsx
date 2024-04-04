import { cn } from "@/lib/util";
import { ButtonHTMLAttributes } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    colors?: "primary" | "secondary" | "danger",
    radius?: "rounded" | "rounded-sm" | "rounded-md" | "rounded-lg" | "rounded-xl" | "rounded-2xl"
}

const ButtonStyles = {
    primary: "bg-primary border-[1px] border-primary transition-[filter,background,color,border] hover:brightness-125 text-white",
    secondary: "border-[1px] border-widget-normal transition-colors hover:bg-widget-hover hover:border-widget-hover",
    danger: "border-[1px] border-danger/50 hover:text-white hover:bg-danger hover:border-transparent transition-colors",
    disabled: "bg-widget-disabled transition-[filter,background,color,border] text-gray-500 border-[1px] border-widget-disabled"
}

const BaseClassnames = "p-2 text-base block select-none rounded-lg overflow-x-hidden overflow-y-hidden";

/** Default button component. Supports 4 styles out of the box. */
export function Button(props: ButtonProps){
    const {colors, radius, disabled} = props;
    const classnames = cn(BaseClassnames, (!disabled && ButtonStyles[colors ?? "primary"]), radius, disabled && ButtonStyles["disabled"], props.className);
    return <button {...props} className={classnames}>{props.children}</button>
}