import { useState } from "react";
import { ChangePasswordDialog } from "../dialogs";
import { Button } from "../ui";

export function SecurityWidget(){
    const [changePassVisible, setChangePassVisible] = useState(false);
    return <div className="border-[1px] border-widget-normal hover:border-widget-hover transition-colors p-4 rounded-2xl">
        <ChangePasswordDialog visible={changePassVisible} setVisible={setChangePassVisible}></ChangePasswordDialog>
        <h2>Security</h2>
        <div className="">
            <span className="pb-2 block select-none">You can change your password and logout from other devices.</span>
            <div className="flex">
                <Button onClick={(event)=>{
                    (event.target as HTMLElement)?.blur();
                    setChangePassVisible(true);
                    }} colors="primary" className="mr-2">Change password</Button>
                <Button colors="danger" disabled className="mr-2">Logout from all devices</Button>
            </div>
        </div>
    </div>
}