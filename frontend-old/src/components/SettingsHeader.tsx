"use client"
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { ChevronLeft, LogOut } from "lucide-react";

/** Top level controls on the settings page. */
export function SettingsHeader() {
    const router = useRouter();
    return <div className="flex gap-2 items-center">
        <Button onClick={()=>{router.push("/")}} variant="outline" size={"icon"} className="flex-shrink-0">
            <ChevronLeft width={20} height={20}></ChevronLeft>
        </Button>
        <div className="w-full flex-grow-0"></div>
        <h2 className="flex-shrink-0">Settings</h2>
        <div className="w-full flex-grow-0"></div>
        <Button onClick={()=>{logout()}} variant="destructive" size={"icon"} className="flex-shrink-0">
            <LogOut width={20} height={20}></LogOut>
        </Button>
    </div>
}
