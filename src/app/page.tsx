import Nav from "@/components/nav";
import { TodoList } from "@/components/todoList";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();
  if(!user) redirect("/login");
  return (
    <>
      <Nav></Nav>
      <div className="flex flex-col items-center">
        <TodoList></TodoList>
      </div>
    </>
  )
}
