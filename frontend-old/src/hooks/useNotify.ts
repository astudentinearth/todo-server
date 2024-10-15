import { ToastsContext } from "@/context/ToastContext";

import { Toast } from "@/lib/types";
import { genID } from "@/lib/util";
import { useContext } from "react";

/** Returns 2 functions to manage toast notifications */
export function useNotify() {
    const { notifications, setNotifications } = useContext(ToastsContext);
    return {
        /**
         * Creates a new notification.
         * @param content Text content to be displayed
         * @param options Level and timeout options. Default level is "info" and timeout is 5000ms.
         */
        notify: (content: string, options?: {  level?: "error" | "warning" | "info"; timeout?: number; }) => {
            const { level, timeout } = options || {level: "info", timeout: 5000};
            const id = genID();
            const toast = { content, level: (level ?? "info"), id, timeout: (timeout ?? 5000) } as Toast;
            const state = [...notifications];
            state.push(toast);
            setNotifications(state);
            setTimeout(() => {
                const current = [...notifications];
                const filtered = current.filter((t) => t.id !== id);
                setNotifications(filtered);
            }, timeout ?? 5000);
        },
        /** Dismisses the given notification */
        dismiss: (id: string)=>{
            const current = [...notifications];
            const newState = current.filter((t)=>t.id!==id);
            setNotifications(newState);
        }
    };
}
