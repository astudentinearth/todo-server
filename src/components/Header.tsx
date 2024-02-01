"use client"
import { Button } from "@/components/ui";
import { logout } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

export function Header(props: { username: string; }) {
  const router = useRouter();
  return <div className="flex justify-start w-full sm:w-[608px] transition-[margin] gap-2 px-4  mt-4 sm:p-0 flex-grow-0">
    <span className="text-white text-2xl flex-shrink-0 block">{props.username}&apos;s list</span>
    <div className="w-full"></div>
    <Button onClick={() => {
      router.push("/settings");
      }} colors="secondary" className="text-white flex-shrink-0 flex justify-center items-center w-10 h-10">
      <i className="bi-gear text-xl"></i>
    </Button>
    <Button onClick={() => {
      logout();
    }} colors="danger" className="text-white flex-shrink-0 flex justify-center items-center w-10 h-10">
      <i className="bi-box-arrow-right text-xl"></i>
    </Button>
  </div>;
}
