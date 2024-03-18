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
    error: "border-danger"
}

/**
 * A styled input component for short, single line text.
 */
export function TextInput(props: TextInputProps){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {inputRef, ...attr} = props;
    return <input ref={props.inputRef} {...attr} className={"text-base block transition-colors bg-modal-1 outline-none border-[1px] p-2 rounded-lg" + " " + InputStyles[(props.error ? "error" : "normal")] + " " + (props.className ?? "")}></input>
}