'use client'
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import "./todoCard.css"
import { Todo } from "@/lib/types";
import { DeleteTodo, UpdateTodo } from "@/lib/actions/todo.actions"
import { cn, convertDateToValue, isWhitespace } from "@/lib/util";
import useClickOutside from "@/hooks/useClickOutside";
interface TodoCardProps{
    todo: Todo,
    reloadFunction: ()=>void
}

// Tailwind classnames for (un)checked states
const CHECKED_CLASSNAMES = "checkbutton transition-colors rounded-full bg-primary w-8 h-8 cursor-default border-widget-normal";
const UNCHECKED_CLASSNAMES = "checkbutton transition-colors rounded-full bg-widget-normal active:bg-widget-active w-8 h-8 cursor-default border-widget-normal border-2 hover:border-widget-hover";

/** Returns a component that renders a single todo. */
export function TodoCard(props:TodoCardProps){
    const {content, completed, due_date} = props.todo;
    const [edit, setEdit] = useState(false);
    const textRef = useRef<HTMLSpanElement>(null);
    const editRef = useRef<HTMLTextAreaElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const cardRef = useClickOutside(()=>{
        handleEditComplete();
        setEdit(false);
    })
    useEffect(()=>{
        if(editRef.current==null) return
        if(dateRef.current==null) return
        if(edit) editRef.current.focus();
        editRef.current.value = props.todo.content;
        if(due_date==null) dateRef.current.value="";
        else dateRef.current.value = convertDateToValue(due_date);
        adjustHeight();
    },[edit])
    useEffect(()=>{
        if(dateRef.current==null) return
        if(due_date==null) dateRef.current.value="";
        else dateRef.current.value = convertDateToValue(due_date);
    })
    const handleEditComplete = ()=>{
        if(editRef.current==null) return;
        if(dateRef.current==null) return;
        if(isWhitespace(editRef.current.value)){
            editRef.current.value = content;
            setEdit(false);
        }
        UpdateTodo({...props.todo, content: editRef.current.value, due_date: new Date(dateRef.current.value)}).then(()=>{props.reloadFunction()})
        setEdit(false);
    }
    const handleDateChange = ()=>{
        if(dateRef.current==null) return;
        UpdateTodo({...props.todo, due_date: new Date(dateRef.current.value)}).then(()=>{props.reloadFunction()})
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
        if(e.key=="Enter"){
            e.preventDefault();
            handleEditComplete();
        }
    };
    const adjustHeight = ()=>{
        if(!editRef.current) return;
        editRef.current.style.height= `${editRef.current.scrollHeight+4}px`;
    }
    return <div ref={cardRef} onClick={(e)=>{
    e.preventDefault();
    setEdit(true);
    }} className={"grid min-h-16 bg-card-normal hover:bg-card-hover active:bg-card-active rounded-lg text-body todocard-mobile sm:todocard transition-colors" + (edit ? "brightness-125" : "")}>
        <button onClick={toggleCheck} className={cn(completed && CHECKED_CLASSNAMES, !completed && UNCHECKED_CLASSNAMES, (due_date!=null || edit) && "row-span-2")}><i className={completed ? "bi-check-lg text-white" : ""}></i></button>
        {edit ? <textarea ref={editRef} onKeyDown={handleKeydown}
        className="outline-none resize-none block w-full bg-widget-normal p-2 my-4 h-10 rounded-md border-widget-normal hover:border-widget-hover border-[1px] focus:border-primary"
        onInput={adjustHeight}></textarea> 
        : <span ref={textRef} className={cn("todotext select-none p-2 w-[200px] sm:w-[400px]", (due_date!=null || edit) && "mt-2")}>{content}</span>}
        <button onClick={handleDelete} className="hover:bg-danger hover:text-white  rounded-full transition-colors w-8 h-8 justify-self-center"><i className="bi-x-lg"></i></button>
        {(due_date == null && !edit) ? <></> :
        <div className={cn( "col-start-2 mb-2 ml-2")}>
            <label>Due date:</label>
            <input ref={dateRef} onClick={(e)=>{e.stopPropagation()}} onInput={handleDateChange} type="date" className={cn("bg-transparent w-36 ml-2 outline-none p-2 hover:bg-widget-hover active:bg-widget-active transition-colors rounded-md")}></input>
        </div>
        }
        
    </div>
}