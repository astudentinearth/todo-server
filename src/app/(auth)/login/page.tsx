import LoginForm from "@/components/forms/LoginForm"
import { getUser } from "@/lib/actions/auth.actions"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage(){
    const user = await getUser();
    if(user) redirect("/");
    return <div className="absolute sm:left-[50%] sm:right-auto sm:top-[50%] bottom-0 sm:bottom-auto justify-center bg-black-1 sm:bg-black-2 sm:translate-x-[-50%] sm:w-[360px] w-full h-full sm:h-auto flex flex-col sm:translate-y-[-50%] text-white p-4 sm:rounded-lg sm:drop-shadow-xl sm:border-[1px] border-widget-normal hover:border-widget-hover">
        <h1 className="select-none">Sign in</h1>
        <LoginForm></LoginForm>
        <span className="block text-lg mt-4">{"Don't have an account? "} <Link className="text-primary hover:underline" href={"/signup"}>Sign up</Link></span>
    </div>
}