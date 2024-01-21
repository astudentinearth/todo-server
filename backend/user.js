import express from "express"
import { auth } from "./auth.js"
import { db } from "./db.js";
/**
 * 
 * @param {express.Express} app 
 */
export function userAPI(app){
    app.get("/api/v1/get-username",auth,(req,res)=>{
        res.status(200).send(req.session.user.username);
    })

    app.get("/api/v1/user-exists", async (req,res)=>{
        if(!req.body.username) {res.sendStatus(400); return}
        try {
            const q = await db("users").select().where({username: req.body.username}).then();
            if(q.length==0) res.status(200).send({exists: false});
            else res.status(200).send({exists: true});
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500);
        }
    })
}