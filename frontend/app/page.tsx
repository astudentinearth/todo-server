'use client'

import Nav from "@/components/nav";
import { TodoCard } from "@/components/todoCard";
import { TodoList } from "@/components/todoList";
import { CreateTodo } from "@/lib/api";
import { useEffect, useRef } from "react"

export default function Home() {

  useEffect(()=>{
    let req = new XMLHttpRequest();
    req.onreadystatechange = ()=>{
        if(req.readyState==4 && req.status!=200){
            window.location.href="/login";
        }
    };
    req.open("GET","/api/v1/validate-session",true);
    req.send();
  },[])
  return (
    <>
      <Nav></Nav>
      <div className="flex flex-col items-center">
        
        <TodoList></TodoList>
    </div>
    </>
  )
}
