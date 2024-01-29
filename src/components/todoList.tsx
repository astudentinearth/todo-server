'use client'

import { CreateTodo, GetTodos } from "@/lib/api"
import { Todo } from "@/lib/types"
import { useEffect, useRef, useState } from "react"
import { TodoCard } from "./todoCard"
import LoadingSpinner from "./loader"

export function TodoList(){
    const [todos, setTodos] = useState([] as Todo[])
    const [loading, setLoading] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const load = async ()=>{
        const res = await GetTodos();
        setTodos(res);
        setLoading(false);
    }
    useEffect(()=>{
        setLoading(true);
        load();
    },[])
    return <div className="sm:flex-grow-0 justify-center p-4 gap-2 flex flex-col flex-grow z-0 w-full sm:w-auto">
        <input ref={inputRef} onKeyDown={(e)=>{
          if(e.key=="Enter"){
            if(inputRef.current==null) return;
            CreateTodo({completed: false, content: inputRef.current.value}).then(()=>{
              if(inputRef.current!=null) inputRef.current.value="";
            }).then(()=>{load()})
          }
        }} placeholder="New todo" className="outline-none block text-white bg-widget-normal p-2 rounded-md flex-grow sm:w-[528px]"></input> 
        {
            loading ? <div className="flex justify-center"><LoadingSpinner width={32} height={32}></LoadingSpinner></div>
            :
            todos.map((todo)=>{return <TodoCard reloadFunction={load} key={todo.id} todo={todo}></TodoCard>})
        }
    </div>
}