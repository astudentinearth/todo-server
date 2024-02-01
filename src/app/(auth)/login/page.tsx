import LoginForm from "@/components/forms/LoginForm"
import { getUser } from "@/lib/actions/auth.actions"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage(){
    const user = await getUser();
    if(user) redirect("/");
    return <div className="absolute left-[50%] top-[50%] bg-black-2 translate-x-[-50%] translate-y-[-50%] text-white p-4 rounded-lg drop-shadow-xl border-[1px] border-widget-normal hover:border-widget-hover">
        <h1 className="select-none">Sign in</h1>
        <LoginForm></LoginForm>
        <span className="block text-lg mt-4">{"Don't have an account? "} <Link className="text-primary hover:underline" href={"/signup"}>Sign up</Link></span>
    </div>
}