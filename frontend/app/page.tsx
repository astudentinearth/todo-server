'use client'

import Nav from "@/components/nav";
import { TodoList } from "@/components/todoList";
import { useEffect, useState } from "react"

export default function Home() {
  const [auth, setAuth] = useState(false);
  useEffect(()=>{
    const req = new XMLHttpRequest();
    req.onload = ()=>{
        if(req.status!=200){
            window.location.href="/login";
        }
        else setAuth(true);
    };
    req.open("GET","/api/v1/validate-session",true);
    req.send();
  },[])
  return ( auth ?
    <>
      <Nav></Nav>
      <div className="flex flex-col items-center">
        <TodoList></TodoList>
      </div>
    </> : <></>
  )
}
