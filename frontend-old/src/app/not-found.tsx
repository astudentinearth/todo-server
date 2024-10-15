import Glow from "@/components/ui/custom/Glow";
import { Button } from "@/components/ui/custom";
import Link from "next/link";


export default function NotFound(){
    return <>
        <div className="bg-background w-full h-full absolute flex text-foreground items-center justify-center flex-col">
            <h1 className="md:text-[180px] text-[96px] block leading-[180px]">404</h1><br></br>
            <h2 className="p-2 block md:text-2xl text-xl text-center">{"We couldn't find what you were looking for."}</h2>
            <Button colors="secondary" className="md:text-2xl text-xl mt-2">
                <Link href={"/"}><i className="bi-arrow-left"></i>&nbsp;Go back home</Link>
            </Button>
        </div>
        <Glow></Glow>
    </>
}
