import { Todo, UserSession } from "./types";

export function GetTodos(): Promise<Todo[]>{
    return new Promise((resolve )=>{
        const req = new XMLHttpRequest();
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
        const req = new XMLHttpRequest();
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
        const req = new XMLHttpRequest();
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
        const req = new XMLHttpRequest();
        req.open("POST", "/api/v1/create-todo");
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = ()=>{
            resolve(req.status)
        }
        req.send(JSON.stringify({"content": todo.content, "completed": todo.completed}))
    })
}

/**
 * Asks the backend to query the database and check if any users have this username.
 * Authentication is not required for this API.
 * @param username Username to be searched
 * @returns True if user exists, false if user doesn't exist or something goes wrong
 */
export async function CheckUserExists(username: string){
    try{const res = await fetch("/api/v1/user-exists", {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username})
    });
    const response = await res.json();
    if(!("exists" in response)) {throw new Error("Invalid response");}
    if(response.exists) return true
    else return false}
    catch (error){
        if(error instanceof Error) window.alert(error.message);
        return false;
    }
}

/**
 * Changes the username of currently logged in user. Authentication is required for this API.
 * @param newName New username
 */
export async function ChangeUsername(newName: string){
    try {
        const res = await fetch("/api/v1/change-username", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({newName})
        });
        if(res.ok) return true;
        else throw new Error("We couldn't change your username.")

    } catch (error) {
        if(error instanceof Error) window.alert(error.message);
        return false;
    }
}

export async function ChangePassword(oldPassword: string, newPassword: string){
    try{
        const res = await fetch("/api/v1/change-password", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({oldPassword, newPassword})});
        if(res.ok) return true;
        else throw new Error("Password change failed.");
    }
    catch(error){
        if(error instanceof Error) window.alert(error.message);
        return false;
    }
}

export async function GetUserSessions(){
    try {
        const res = await fetch("/api/v1/get-sessions", {method: "GET", headers: {"Content-Type": "application/json"}});
        if(!res.ok) throw new Error("Couldn't fetch user sessions.");
        const body = await res.json();
        if(!("sessions" in body)) throw new Error("Response body is empty.");
        if(Array.isArray(body.sessions)){
            return body.sessions as UserSession[];
        }
        else throw new Error("Bad response.");
    } catch (error) {
        if(error instanceof Error) window.alert(error.message);
        return null;
    }
}

export async function LogoutAllDevices(){
    try {
        const res = await fetch("/api/v1/force-logout", {method: "DELETE"});
        if(!res.ok) throw new Error("Logout failed.");
        else return true;

    } catch (error) {
        if(error instanceof Error) window.alert(error.message);
        return false;
    }
}