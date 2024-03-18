import { useState,useEffect,useRef } from "react";

/** Provides a hook to hide the component if user clicks outside the component. */
export default function useComponentVisible(initalIsVisible:boolean, excludeClass?:string){
    const [isComponentVisible,setIsComponentVisible] = useState(initalIsVisible);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref:any = useRef(null);
    const handleClickOutside = (event:MouseEvent)=>{
        if(ref.current && !ref.current.contains(event.target)){
            if(excludeClass && event.target instanceof HTMLElement){
                if(!(event.target.classList.contains(excludeClass ?? ""))){
                    setIsComponentVisible(false);
                }
            }
            else setIsComponentVisible(false);
        }
    };
    useEffect(()=>{
        document.addEventListener('click',handleClickOutside,true);
        return ()=>{
            document.removeEventListener('click',handleClickOutside,true);
        };
    },[]);
    return {ref,isComponentVisible,setIsComponentVisible};
}