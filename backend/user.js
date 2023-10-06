import express from "express"
import { auth } from "./auth.js"
/**
 * 
 * @param {express.Express} app 
 */
export function userAPI(app){
    app.get("/api/v1/get-username",auth,(req,res)=>{
        res.status(200).send(req.session.user.username);
    })
}