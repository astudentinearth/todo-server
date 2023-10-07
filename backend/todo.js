import {db} from "./db.js"
import express from 'express'
import {auth} from './auth.js'
/**
 * 
 * @param {express.Express} app 
 */
export function todoAPI(app){
    app.get("/api/v1/get-todos",auth,(req,res)=>{
        if(!req.session.user) res.status(401).send("UNAUTHORIZED");
        db("todos").select("content","id","completed").where({userID: req.session.user.id.toString()}).then((val)=>{
            res.status(200).send({todos: val})
        }).catch(()=>{
            res.status(500).send("CANNOT_GET_TODOS")
        })
    })

    app.put("/api/v1/update-todo",auth,(req,res)=>{
        if(!req.session.user) {res.status(401).send("UNAUTHORIZED"); return}
        if(!req.body.id) {res.status(400).send("MISSING_IDENTIFIER"); return}
        if(!req.body.content) {res.status(400).send("MISSING_CONTENT"); return}
        const todo = {
            content: req.body.content,
            userID: req.session.user.id,
            id: req.body.id,
            completed: req.body.completed ?? false
        }
        db("todos").update(todo).where({userID: req.session.user.id, id: req.body.id}).then(()=>{res.status(200).send("TODO_UPDATED")}).catch(()=>{res.status(500).send()})
    })

    app.post("/api/v1/create-todo",auth,(req,res)=>{
        console.log(req.body);
        if(!req.session.user) {res.status(401).send("UNAUTHORIZED"); return}
        if(!req.body.content) {res.status(400).send("MISSING_CONTENT"); return}
        const id = `${req.session.user.id}${Date.now()}${Math.floor(Math.random()*100)}`
        const todo = {
            content: req.body.content,
            userID: req.session.user.id,
            id,
            completed: req.body.completed ?? false
        }
        db("todos").insert(todo).then(()=>{res.status(200).send("TODO_CREATED");}).catch(()=>{res.status(500).send()});
    })

    app.delete("/api/v1/delete-todo",auth,(req,res)=>{
        if(!req.session.user) {res.status(401).send("UNAUTHORIZED"); return}
        if(!req.body.id) {res.status(401).send("MISSING_IDENTIFIER"); return}
        db("todos").delete().where({id:req.body.id}).then(()=>{res.status(200).send("TODO_DELETED")}).catch(()=>{res.status(500).send()});
    })
}