import { useEffect, useState } from "react";
export default function useAuthentication(){
    const authState = useState(false);
    useEffect(()=>{
        const req = new XMLHttpRequest();
        req.onload = ()=>{
            if(req.status!=200){
                window.location.href="/login";
            }
            else authState[1](true);
        };
        req.open("GET","/api/v1/validate-session",true);
        req.send();
    },[])
  return authState;
}