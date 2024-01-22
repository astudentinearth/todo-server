import { auth } from "./auth.js";
import express from 'express'
import {validateUsername} from './lib/username.js'
import { db } from "./db.js";
import bcrypt from "bcrypt"

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
    app.post("/api/v1/change-password", auth, async (req,res)=>{
        if(!req.session.user) {res.sendStatus(401); return}
        if(!('oldPassword' in req.body && 'newPassword' in req.body)) {res.status(400).send("MISSING_FIELDS"); return}
        try{
            if(!(typeof req.body.newPassword === "string" && typeof req.body.oldPassword === "string")) {res.status(400).send("TYPES_DO_NOT_MATCH"); return}
            if(req.body.newPassword.length < 8) {res.status(400).send("PASSWORD_TOO_SHORT"); return}
            const users = await db("users").select().where({id: Number(req.session.user.id)}).then();
            if(users.length==0) {res.sendStatus(500); return}
            const user = users[0];
            if(!await bcrypt.compare(req.body.oldPassword, user.password)) {res.status(401).send("INCORRECT_PASSWORD")}
            else{
                const newHash = await bcrypt.hash(req.body.newPassword, 10);
                await db("users").update({password: newHash}).where({id: Number(req.session.user.id)}).then();
                res.sendStatus(200);
            }
        }
        catch(error){
            console.log(error.message);
            res.sendStatus(500);    
        }
    })
    // TODO: Get all sessions
    app.get("/api/v1/get-sessions", auth, async (req,res)=>{
        try{
            console.log(typeof req.session.user.id)
            if(isNaN(req.session.user.id)){
                console.log(`\x1b[33mA user has an ID that is not a number. Skipping to avoid a potential SQL injection.\x1b[0m`)
                res.sendStatus(400);
                return;
            }
            const results = (await db("sessions").select().whereRaw("(sess->'user'->>'id')::int = ?", [req.session.user.id]));
            const sessions = results.map((x)=>({
                expire: x.expire, userAgent: (x.sess.userAgent ?? "Unknown device"), loginTimestamp: x.sess.loginTimestamp
            }));
            res.status(200).send({sessions});
        }
        catch(error){
            if (error instanceof Error){
                console.log("\x1b[31m----Server Error----\n", error.message, "\n--Stack trace\n", error.stack, "\x1b[0m")
            }
            res.sendStatus(500);
        }
    })
    // TODO: End all sessions
}