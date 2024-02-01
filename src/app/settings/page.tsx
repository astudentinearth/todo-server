import Nav from "@/components/nav";
import "./settings.css"
import { AccountWidget, SecurityWidget } from "@/components/settings";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
export default async function SettingsPage() {
    const user = getUser();
    if(!user) redirect("/login");
    return (
    <>
        <Nav></Nav>
        <div className="text-white sm:flex sm:flex-col sm:items-center">
            <div className="sm:w-[620px] lg:w-[800px] transition-[width] p-4 w-full flex flex-col gap-3 flex-grow ">
                <h1 className="">Settings</h1>
                <SecurityWidget></SecurityWidget>
                <AccountWidget></AccountWidget>
                {/*<h2>Your data</h2>
                <div className="py-2">
                    <span className="pb-2 block">You can export your todos in a Markdown file and include them in other productivity tools you might be using.</span>
                    <Button colors="primary" className="mr-2">Export as Markdown</Button>
                </div>*/}
            </div>
        </div> 
    </> 
    )
}