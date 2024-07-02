import LoginForm from "@/components/forms/LoginForm"
import { getUser } from "@/lib/actions/auth.actions"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage(){
    const user = await getUser();
    if(user) redirect("/");
    return <div className="absolute transition-colors sm:left-[50%] sm:right-auto sm:top-[50%] bottom-0 sm:bottom-auto justify-center bg-background sm:bg-view-1 sm:translate-x-[-50%] sm:w-[360px] w-full h-full sm:h-auto flex flex-col sm:translate-y-[-50%] text-foreground p-4 sm:rounded-lg sm:drop-shadow-xl sm:border-[1px] border-border hover:border-widget-hover">
        <h1 className="select-none">Sign in</h1>
        <LoginForm></LoginForm>
        <span className="block text-lg mt-4">{"Don't have an account? "} <Link className="text-primary-text hover:underline" href={"/signup"}>Sign up</Link></span>
    </div>
}