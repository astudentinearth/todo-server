import { Toast } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

interface ToastsContextType{
    notifications: Toast[],
    setNotifications: Dispatch<SetStateAction<Toast[]>>,
}

export const ToastsContext = createContext<ToastsContextType>({notifications:[], setNotifications:()=>{}})

