'use client'

import { useEffect } from "react"

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
    <div>

    </div>
  )
}
