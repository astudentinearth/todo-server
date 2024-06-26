"use server"

import { Todo } from "../types"
import { validateRequest } from "../auth"
import { prisma } from "@/lib/db";
import { isWhitespace } from "../util";

/**
 * Loads todos of current user.
 * @returns `Promise<Todo[]>`
 */
export async function GetTodos(): Promise<Todo[] | null>{
    const {user} = await validateRequest();
    if(!user) return [];
    try {
        if(!prisma) return null;
        const results = await prisma.todos.findMany({where: {userID: user.id}})
        return results as Todo[];
    } catch (error) {
        if(error instanceof Error) console.log(error.message, error.stack)
        return null;
    }
}

/**
 * Perform changes on a todo.
 * @param todo to be updated
 */
export async function UpdateTodo(todo: Todo){
    const {user} = await validateRequest();
    if(!user) return [];
    if(isWhitespace(todo.content)) return;
    // Omit the ID to prevent artifical changes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, ...data} = todo;
    if(data.content.length > 255) data.content=data.content.substring(0,255);
    
    try {
        if(!prisma) return null;
        await prisma.todos.update({where: {
            id: todo.id
        }, data: {...data}})
    } catch (error) {
        if(error instanceof Error) console.log(error.message, error.stack)
        return null;
    }
}

/**
 * Creates a new todo
 * @param todo contents and completion status only.
 */
export async function CreateTodo(todo: {content: string, completed: boolean}){
    const {user} = await validateRequest();
    if(!user) return [];
    if(isWhitespace(todo.content)) return;
    const id = `${Date.now()}$${user.id}${Math.floor(Math.random()*100)}`;
    try{
        if(!prisma) return;
        await prisma.todos.create({data: {...todo, id, completed: false, userID: user.id}});
    }
    catch (error) {
        if(error instanceof Error) console.log(error.message, error.stack)
        return null;
    }
}

/**
 * Deletes a todo.
 * @param todo to be deleted.
 */
export async function DeleteTodo(todo: Todo){
    const {user} = await validateRequest();
    if(!user) return [];
    try{
        if(!prisma) return;
        await prisma.todos.delete({where: {id: todo.id, userID: user.id}});
    }
    catch (error) {
        if(error instanceof Error) console.log(error.message, error.stack)
        return null;
    }
}