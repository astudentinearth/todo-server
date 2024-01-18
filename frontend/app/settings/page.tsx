'use client'
import Nav from "@/components/nav";
import useAuthentication from "../hooks/useAuthentication";
import "./settings.css"
export default function SettingsPage() {
    const [auth] = useAuthentication();
    return (auth?
    <>
        <Nav></Nav>
        <div className="text-white sm:flex sm:flex-col sm:items-center">
            <div className="sm:w-[620px] p-4 w-full flex-grow bg-black-3">
                <h1>Settings</h1>
                <hr></hr>
                <br></br>
                <h2>Account</h2>
                
            </div>
        </div> 
    </> 
    : <></>)
}