'use client'
import { cn } from "@/lib/util"
import Image from "next/image"

/**
 * Just a loading animation.
 * @returns 
 */
export default function LoadingSpinner(props: {class?: string, width: number, height: number}){
    return <Image className={cn("animate-spin block", props.class)} {...props} src="/loader.svg" alt="Loading"></Image>
}