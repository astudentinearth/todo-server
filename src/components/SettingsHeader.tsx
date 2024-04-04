"use client"
import { Button } from "@/components/ui/custom";
import { logout } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

/** Top level controls on the settings page. */
export function SettingsHeader() {
    const router = useRouter();
    return <div className="flex gap-2 items-center">
        <Button onClick={()=>{router.push("/")}} colors="secondary" className="h-10 flex flex-shrink-0 gap-2 text-xl items-center justify-center">
            <i className="bi-chevron-left"></i>
            <span>Back</span>
        </Button>
        <div className="w-full flex-grow-0"></div>
        <Button onClick={()=>{logout()}} colors="danger" className="h-10 w-10 flex-shrink-0 flex gap-2 text-xl items-center justify-center">
            <i className="bi-box-arrow-right"></i>
        </Button>
    </div>
}
