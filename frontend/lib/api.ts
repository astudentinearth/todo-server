import { Todo } from "./types";

export function GetTodos(): Promise<Todo[]>{
    return new Promise((resolve, reject)=>{
        let req = new XMLHttpRequest();
        req.open("GET", "/api/v1/get-todos");
        req.onload = ()=>{
            if(req.status==200){
                const text = req.responseText;
                const json = JSON.parse(text);
                if(json.todos){
                    resolve((json.todos as Todo[]).sort((a,b)=>(Number(b.id)-Number(a.id))))
                }
                else resolve([])
            }
            if(req.status==500){
                alert("Internal server error")
            }
            resolve([])
        }
        req.send();
    })
}

export function UpdateTodo(todo: Todo){
    return new Promise((resolve)=>{
        let req = new XMLHttpRequest();
        req.open("PUT", "/api/v1/update-todo");
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = ()=>{
            resolve(req.status)
        }
        req.send(JSON.stringify(todo))
    })
}

export function DeleteTodo(todo: Todo){
    return new Promise((resolve)=>{
        let req = new XMLHttpRequest();
        req.open("DELETE", "/api/v1/delete-todo");
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = ()=>{
            resolve(req.status)
        }
        req.send(JSON.stringify({id: todo.id}))
    })
}

export function CreateTodo(todo:{content: string, completed: boolean}){
    return new Promise((resolve)=>{
        let req = new XMLHttpRequest();
        req.open("POST", "/api/v1/create-todo");
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = ()=>{
            resolve(req.status)
        }
        req.send(JSON.stringify({"content": todo.content, "completed": todo.completed}))
    })
}