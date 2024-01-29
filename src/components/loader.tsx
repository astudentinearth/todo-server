'use client'
import Image from "next/image"
import loader from "public/loader.svg"

export default function LoadingSpinner(props: {class?: string, width: number, height: number}){
    return <Image className={"animate-spin block "+props.class} {...props} src={loader} alt="Loading"></Image>
}