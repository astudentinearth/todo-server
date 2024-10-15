import { cn } from "@/lib/util";
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
    normal: "border-border hover:border-widget-hover focus:border-primary",
    error: "border-destructive"
}

const BaseClassnames = "text-base block transition-colors bg-background outline-none border-[1px] p-2 rounded-lg";

/**
 * A styled input component for short, single line text.
 */
export function TextInput(props: TextInputProps){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {inputRef, ...attr} = props;
    const classnames = cn(BaseClassnames, InputStyles[(props.error ? "error" : "normal")], props.className);
    return <input ref={props.inputRef} {...attr} className={classnames}></input>
}