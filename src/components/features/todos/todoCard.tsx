'use client'
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import "./todoCard.css"
import { Todo } from "@/lib/types";
import { DeleteTodo, UpdateTodo } from "@/lib/actions/todo.actions"
import { TextInput } from "../../ui";
import { isWhitespace } from "@/lib/util";
interface TodoCardProps{
    todo: Todo,
    reloadFunction: ()=>void
}

// Tailwind classnames for (un)checked states
const CHECKED_CLASSNAMES = "checkbutton transition-colors rounded-full bg-primary w-8 h-8 cursor-default";
const UNCHECKED_CLASSNAMES = "checkbutton transition-colors rounded-full bg-widget-normal hover:bg-widget-hover active:bg-widget-active w-8 h-8 cursor-default";

/** Returns a component that renders a single todo. */
export function TodoCard(props:TodoCardProps){
    const {content, completed} = props.todo;
    const [edit, setEdit] = useState(false);
    const textRef = useRef<HTMLSpanElement>(null);
    const editRef = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        if(editRef.current==null) return
        if(edit) editRef.current.focus();
        editRef.current.value = props.todo.content;
    },[edit])
    const handleEditComplete = ()=>{
        if(editRef.current==null) return;
        if(isWhitespace(editRef.current.value)){
            editRef.current.value = content;
            setEdit(false);
        }
        UpdateTodo({...props.todo, content: editRef.current.value}).then(()=>{props.reloadFunction()})
        setEdit(false);
    }
    const toggleCheck = (e:MouseEvent)=>{
        e.stopPropagation();
        UpdateTodo({...props.todo, completed: !props.todo.completed}).then(()=>{props.reloadFunction()})
    }
    const handleDelete = (e:MouseEvent)=>{
        e.stopPropagation();
        DeleteTodo(props.todo).then(()=>{props.reloadFunction()})
    }
    const handleKeydown = (e:KeyboardEvent)=>{
        if(e.key=="Enter") handleEditComplete();
    };
    return <div onClick={(e)=>{
        e.preventDefault();
        setEdit(true);
        }} className={"grid h-16 bg-card-normal hover:bg-card-hover active:bg-card-active rounded-lg text-body todocard-mobile sm:todocard transition-colors" + (edit ? "brightness-125" : "")}>
        <button onClick={toggleCheck} className={completed ? CHECKED_CLASSNAMES : UNCHECKED_CLASSNAMES}><i className={completed ? "bi-check-lg text-white" : ""}></i></button>
        {edit ? <TextInput inputRef={editRef} onKeyDown={handleKeydown} onBlur={handleEditComplete} className="outline-none block w-full bg-widget-normal p-2 rounded-md"></TextInput> 
        : <span ref={textRef} className="todotext select-none p-2 w-[200px] sm:w-[400px]">{content}</span>}
        <button onClick={handleDelete} className="hover:bg-danger hover:text-white  rounded-full transition-colors w-8 h-8 justify-self-center"><i className="bi-x-lg"></i></button>
    </div>
}