import Link from "next/link"
import SignupForm from "@/components/forms/SignupForm"
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth.actions";

export default async function SignupPage(){
    const user = await getUser();
    if(user) redirect("/");
    return <div className="absolute left-[50%] top-[50%] bg-black-2 translate-x-[-50%] translate-y-[-50%] text-white p-4 rounded-lg drop-shadow-xl border-[1px] border-widget-normal hover:border-widget-hover">
        <h1 className="select-none">Create account</h1>
        <SignupForm></SignupForm>
        <span className="block text-lg mt-4">{"Already have an account? "} <Link className="text-primary hover:underline" href={"/login"}>Sign in</Link></span>
    </div>
}