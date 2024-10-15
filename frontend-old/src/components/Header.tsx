"use client"
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth.actions";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

/**
 * Provides navigation, theme and session controls.
 */
export function Header(props: { username: string; }) {
  const router = useRouter();
  const {setTheme, theme} = useTheme();
  // Dark mode switch event handler.
  const toggleDarkMode = () => theme==="dark" ? setTheme("light") : setTheme("dark");
  return <div className="flex justify-start w-full sm:w-[608px] transition-[margin] gap-2 px-4 mt-4 sm:p-0 flex-grow-0 text-foreground">
    <span className="text-2xl flex-shrink-0 block">{props.username}&apos;s list</span>
    <div className="w-full"></div>
    <Button data-testid="dark_mode_switch" onClick={toggleDarkMode} variant="outline" className="flex-shrink-0" size={"icon"}>
      {theme==="light" ? <Sun width={20} height={20}></Sun> : <Moon width={20} height={20}></Moon>}
    </Button>
    <Button onClick={() => { router.push("/settings") }} variant="outline" className="flex-shrink-0 flex justify-center items-center" size={"icon"}>
      <Settings width={20} height={20}></Settings>
    </Button>
    <Button onClick={() => {logout();}} variant="destructive" className="flex-shrink-0 flex justify-center items-center" size={"icon"}>
      <LogOut width={20} height={20}></LogOut>
    </Button>
  </div>;
}


