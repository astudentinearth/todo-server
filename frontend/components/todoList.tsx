'use client'

import { CreateTodo, GetTodos } from "@/lib/api"
import { Todo } from "@/lib/types"
import { useEffect, useRef, useState } from "react"
import { TodoCard } from "./todoCard"

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
    return <div className="sm:flex-grow-0 flex-grow z-0">
        <input ref={inputRef} onKeyDown={(e)=>{
          if(e.key=="Enter"){
            if(inputRef.current==null) return;
            CreateTodo({completed: false, content: inputRef.current.value}).then(()=>{
              if(inputRef.current!=null) inputRef.current.value="";
            }).then(()=>{load()})
          }
        }} placeholder="New todo" className="outline-none block text-white bg-widget-normal p-2 rounded-md sm:w-[528px] m-4"></input>
        {
            loading ? <span className="text-white block text-center">Loading</span>
            :
            todos.map((todo)=>{return <TodoCard reloadFunction={load} key={todo.id} todo={todo}></TodoCard>})
        }
    </div>
}