import { auth } from "./auth.js";
import express from 'express'
import {validateUsername} from './lib/username.js'
import { db } from "./db.js";

/**
 * @param {express.Express} app 
 */
export function accountAPI(app){
    app.post("/api/v1/change-username", auth, async (req, res)=>{
        if(!req.session.user) {res.status(401).send("UNAUTHORIZED"); return};
        if(!req.body.newName) {res.status(400).send("NO_USERNAME_PROVIDED"); return};
        const name = req.body.newName.trim();
        if(!validateUsername(name)) {res.status(400).send("INVALID_USERNAME"); return};
        const users = await db("users").select().where({username: name}).then();
        try{
            if(users.length>0) res.status(403).send("USERNAME_NOT_AVAILABLE");
            else{
                db("users").update({username: name}).where({id: Number(req.session.user.id)}).then(()=>{
                    res.status(200).send();
                    return;
                }, ()=>{res.status(500).send("UNKNOWN_ERROR"); return});
            }
        }
        catch(err){
            console.log(err.message);
            res.status(500).send();
            return;
        }
    })
}