import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, RefObject } from "react";

interface TextInputProps{
    inputRef?: RefObject<HTMLInputElement>,
    placeholder?: string,
    error?: boolean
    onChange?: ChangeEventHandler,
    onBlur?: FocusEventHandler,
    onFocus?: FocusEventHandler,
    className?: string,
    type?: "text" | "password",
    required?: boolean,
    onKeyDown?: KeyboardEventHandler
}

const InputStyles = {
    normal: "border-widget-normal hover:border-widget-hover focus:border-primary",
    error: "border-red-500/50"
}

export function TextInput(props: TextInputProps){
    return <input ref={props.inputRef} {...props} className={"text-base block transition-colors bg-black-1 outline-none border-[1px] p-2 rounded-lg" + " " + InputStyles[(props.error ? "error" : "normal")] + " " + (props.className ?? "")}></input>
}