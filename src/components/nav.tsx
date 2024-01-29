'use client'
import AccountMenu from "./accountMenu";

export default function Nav(){
    return <div className="text-white z-[99] nav h-16 p-2 gap-2 bg-black-2/50 items-center flex flex-row sticky left-0 right-0 top-0">
        <div className="flex-grow"></div>
        <AccountMenu></AccountMenu>
    </div>
}