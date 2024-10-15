import { useEffect, useRef } from "react";

export default function useClickOutside(callback: ()=>void){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref:any = useRef(null);
    const handler = (ev: Event)=>{
        if(ref.current && !ref.current.contains(ev.target)){
            document.body.removeEventListener("click", handler);
            callback();
        }
    }
    useEffect(()=>{document.body.addEventListener("click", handler, true);})
    return ref;
}