import { TodoList } from "@/components/features/todos/todoList";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { Header } from "../components/Header";


export default async function Home() {
  const user = await getUser();
  if (!user) redirect("/login");
  return (
    <>
      <div className="flex flex-col items-center">
        <Header username={user.username}></Header>
        <TodoList></TodoList>
      </div>
    </>
  )
}
