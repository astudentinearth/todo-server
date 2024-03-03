import Link from "next/link"
import SignupForm from "@/components/forms/SignupForm"
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth.actions";

export default async function SignupPage(){
    const user = await getUser();
    if(user) redirect("/");
    return <div className="absolute transition-colors sm:left-[50%] sm:right-auto sm:top-[50%] bottom-0 sm:bottom-auto justify-center bg-modal-1 sm:bg-modal-2 sm:translate-x-[-50%] sm:w-[360px] w-full h-full sm:h-auto flex flex-col sm:translate-y-[-50%] text-body p-4 sm:rounded-lg sm:drop-shadow-xl sm:border-[1px] border-widget-normal hover:border-widget-hover">
        <h1 className="select-none">Create account</h1>
        <SignupForm></SignupForm>
        <span className="block text-lg mt-4">{"Already have an account? "} <Link className="text-primary hover:underline" href={"/login"}>Sign in</Link></span>
    </div>
}