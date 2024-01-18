'use client'

import Nav from "@/components/nav";
import { TodoList } from "@/components/todoList";
import { useEffect } from "react"

export default function Home() {

  useEffect(()=>{
    const req = new XMLHttpRequest();
    req.onload = ()=>{
        if(req.status!=200){
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
