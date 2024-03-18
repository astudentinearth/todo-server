import AccountMenu from "./accountMenu";

/** @deprecated Old navigation bar. Dropped in favor of Header.tsx */
export default function Nav(){
    return <div className="text-body z-[99] nav h-16 p-2 gap-2 bg-modal-2/50 items-center flex flex-row sticky left-0 right-0 top-0">
        <div className="flex-grow"></div>
        <AccountMenu></AccountMenu>
    </div>
}