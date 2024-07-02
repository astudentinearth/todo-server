'use client'

import { Todo } from "@/lib/types"
import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { TodoCard } from "./todoCard"
import LoadingSpinner from "../../loader"
import { CreateTodo, GetTodos } from "@/lib/actions/todo.actions"
import { TextInput } from "../../ui/custom"
import { isWhitespace, sortTodos } from "@/lib/util"
import { useNotify } from "@/hooks/useNotify"

/**
 * Provides the list and inputs for task management
 */
export function TodoList(){
    const [todos, setTodos] = useState([] as Todo[])
    const [loading, setLoading] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const {notify} = useNotify();
    const load = async ()=>{
        const res = await GetTodos();
        if(!res) {
          setTodos([]);
          notify("Could not load your tasks right now.", {level: "error"})
          return;
        }
        sortTodos(res);
        setTodos(res);
        setLoading(false);
    }
    useEffect(()=>{
        setLoading(true);
        load();
    },[])
    const inputKeyDown = (e: KeyboardEvent)=>{
      if(e.key=="Enter"){
        if(inputRef.current==null) return;
        if(isWhitespace(inputRef.current.value)) return;
        CreateTodo({completed: false, content: inputRef.current.value}).then(()=>{
          if(inputRef.current!=null) inputRef.current.value="";
        }).then(()=>{load()})
      }
    }
    return <div className="sm:flex-grow-0 justify-center p-4 pt-2 gap-2 flex flex-col flex-grow z-0 w-full sm:w-[640px]">
        <TextInput inputRef={inputRef} onKeyDown={inputKeyDown} placeholder="New todo" className="outline-none flex text-foreground p-3 rounded-lg w-full sm:w-[608px]"></TextInput> 
        {
            loading ? <div className="flex justify-center"><LoadingSpinner width={32} height={32}></LoadingSpinner></div>:
            todos.map((todo)=>{return <TodoCard reloadFunction={load} key={todo.id} todo={todo}></TodoCard>})
        }
    </div>
}

