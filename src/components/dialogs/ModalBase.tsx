import { Dispatch, ReactNode, SetStateAction } from "react"

export interface ModalProps{
    visible?: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>, // required for the dialog to control its visibility
    children: ReactNode
}

/** Base component for modals/dialogs. Displays the dialog with an overlay if set visible. */
export function ModalBase(props: ModalProps){
    return (props.visible ? <div className="fixed left-0 right-0 flex items-center justify-center top-0 z-50 bottom-0 bg-modal-2/50 backdrop-blur-sm">
        <div className="p-4 bg-modal-1 border-[1px] border-widget-normal hover:border-widget-hover drop-shadow-xl rounded-2xl min-w-[384px]">
            {props.children}
        </div>
    </div> : <></>)
}