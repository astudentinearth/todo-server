'use client'
import Nav from "@/components/nav";
import { TodoList } from "@/components/todoList";
import useAuthentication from "./hooks/useAuthentication";

export default function Home() {
  const [auth] = useAuthentication();
  return ( auth ?
    <>
      <Nav></Nav>
      <div className="flex flex-col items-center">
        <TodoList></TodoList>
      </div>
    </> : <></>
  )
}
