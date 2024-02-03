import { validateRequest } from "@/lib/auth";
import {prisma} from "@/lib/db"
import { Todo } from "@/lib/types";
import { sortTodos } from "@/lib/util";

export const dynamic = 'force-dynamic';

export async function GET(){
    const {user} = await validateRequest();
    let md = "";
    if(!user) return new Response(null, {status: 403});
    try{
        const db = await prisma.todos.findMany({where: {userID: user.id}});
        console.log(typeof db);
        if(!(db instanceof Array)) return new Response(null, {status: 500});
        if((db.length==0)) return new Response(null, {status: 500});
        const todos = db as Todo[];
        sortTodos(todos);
        for (const todo of todos){
            md+=`- [${todo.completed ? "X" : " "}] ${todo.content}\n`;
        }
    } catch(error){
        if(error instanceof Error) console.log(error.message, error.stack);
        return new Response(null, {status: 500});
    }
    const buffer = Buffer.from(md, 'utf8');
    const headers = new Headers();
    headers.append("Content-Type", "text/markdown");
    headers.append("Content-Disposition", 'attachment; filename="todos.md"');
    return new Response(buffer, {headers});
}