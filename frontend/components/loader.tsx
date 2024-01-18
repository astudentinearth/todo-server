'use client'
import Image from "next/image"
import loader from "@/public/loader.svg"

export default function LoadingSpinner(props: {className: string, width: number, height: number}){
    return <Image {...props} src={loader} alt="Loading"></Image>
}