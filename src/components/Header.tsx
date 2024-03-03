"use client"
import { Button } from "@/components/ui";
import { logout } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function Header(props: { username: string; }) {
  const router = useRouter();
  const darkModeIconRef = useRef<HTMLElement>(null);
  useEffect(()=>{
    setIcon();
  });
  function toggleDarkMode(){
    const root = document.querySelector(":root");
    if(!root) return;
    if(root.classList.contains("dark")){
        localStorage.setItem("theme", "light");
        root.classList.remove("dark");
    }
    else{
      localStorage.setItem("theme", "dark");
      root.classList.add("dark");
    }
    setIcon();
  }
  const setIcon = ()=>{
    const cl = document.querySelector(":root")?.classList.contains("dark") ? "bi-moon" : "bi-brightness-high";
    darkModeIconRef.current?.classList.remove("bi-moon");
    darkModeIconRef.current?.classList.remove("bi-brightness-high");
    darkModeIconRef.current?.classList.add(cl);
  }
  return <div className="flex justify-start w-full sm:w-[608px] transition-[margin] gap-2 px-4  mt-4 sm:p-0 flex-grow-0">
    <span className="text-body text-2xl flex-shrink-0 block">{props.username}&apos;s list</span>
    <div className="w-full"></div>
    <Button onClick={() => {
      toggleDarkMode();
      }} colors="secondary" className="text-body flex-shrink-0 flex justify-center items-center w-10 h-10">
      <i ref={darkModeIconRef} className={"text-xl "}></i>
    </Button>
    <Button onClick={() => {
      router.push("/settings");
      }} colors="secondary" className="text-body flex-shrink-0 flex justify-center items-center w-10 h-10">
      <i className="bi-gear text-xl"></i>
    </Button>
    <Button onClick={() => {
      logout();
    }} colors="danger" className="text-body flex-shrink-0 flex justify-center items-center w-10 h-10">
      <i className="bi-box-arrow-right text-xl translate-x-[1px]"></i>
    </Button>
  </div>;
}


