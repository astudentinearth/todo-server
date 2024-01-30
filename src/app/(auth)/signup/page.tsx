"use client"
import Link from "next/link"
import Image from "next/image"
import loader from "public/loader.svg"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import SignupForm from "@/components/forms/SignupForm"
import { ActionResult } from "next/dist/server/app-render/types"

export default function SignupPage(){
    return <div className="absolute left-[50%] top-[50%] bg-black-2 translate-x-[-50%] translate-y-[-50%] text-white p-4 rounded-lg drop-shadow-xl">
        <h1 className="select-none">Create account</h1>
        <SignupForm></SignupForm>
        <span className="block text-lg mt-4">{"Already have an account? "} <Link className="text-primary hover:underline" href={"/login"}>Sign in</Link></span>
    </div>
}