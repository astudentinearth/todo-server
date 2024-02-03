import "./settings.css"
import { AccountWidget, SecurityWidget } from "@/components/settings";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { SettingsHeader } from "../../components/SettingsHeader";
import { DataWidget } from "@/components/settings/DataWidget";

export const metadata: Metadata = {
    title: "Settings"
}


export default async function SettingsPage() {
    const user = getUser();
    if (!user) redirect("/login");
    return (
        <>
            <div className="text-white sm:flex sm:flex-col sm:items-center">
                <div className="sm:w-[620px] lg:w-[800px] transition-[width] p-4 w-full flex flex-col gap-3 flex-grow ">
                    <SettingsHeader></SettingsHeader>
                    <SecurityWidget></SecurityWidget>
                    <AccountWidget></AccountWidget>
                    <DataWidget></DataWidget>
                </div>
            </div>
        </>
    )
}