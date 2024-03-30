import { Todo } from "./types";
import clsx, {ClassValue} from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Sorts todos by extracting the date portion of todo IDs
 * @returns Todo[]
 */
export function sortTodos(todos: Todo[]) {
  todos.sort((a, b) => {
    const _b = /(\d+)\$/.exec(b.id)
    const _a = /(\d+)\$/.exec(a.id)
    if (!_b || !_a) return 0
    if (_b[1] == null || _a[1] == null) return 0
    return Number(_b[1]) - Number(_a[1])
  })
}

/**
 * Constructs a className
 */
export function cn (...inputs: ClassValue[]){
  return twMerge(clsx(inputs));
}

/**
 * Checks if a string is blank - if there is anything left after removing (non breaking) space characters
 */
export function isWhitespace(s: string){
  return (s.replace(' ',"").replace(" ","").length) == 0;
}

export function genID(){
  return `${Date.now()}${Math.floor(Math.random()*100)}`;
}