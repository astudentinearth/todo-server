import { db } from "./db.js"
import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
/**
 * @param {express.Express} app 
 */
export function authAPI(app){
    app.post("/login",(req,res)=>{
        if(req.body.password==null) {res.status(400).send("No password provided"); return}
        if(req.body.username==null) {res.status(400).send("No username provided"); return}
        db("users").select("username","password","id").where({username: req.body.username}).then((val)=>{
            if(val.length==0 || val==null){
                return res.status(400).send("User doesn't exist.");
            }
            bcrypt.compare(req.body.password, val[0].password).then((match)=>{
                if(!match){
                    return res.status(400).send("Wrong password");
                }
                const token = jwt.sign({
                    username: val[0].username,
                    userId: val[0].id
                },process.env["FILECLOUD_JWT_KEY"],{expiresIn: "24h"})
                return res.status(200).send({message:"Login successful", username: val[0].username, token});
            })
        })
    })

    app.post("/register",(req,res)=>{
        if(req.body.password==null) {res.status(400).send("No password provided"); return}
        if(req.body.username==null) {res.status(400).send("No username provided"); return}
        bcrypt.hash(req.body.password, 10).then((hash)=>{
            db("users").insert({username:req.body.username, password:hash}).onConflict('username').ignore().then(()=>{
                res.status(200).send();
            })
        }).catch((e)=>{
            res.status(500).send("Couldn't hash password. User will not be registered.")
        });
    })
}

export async function auth(req, res, next){
    try{
        const token = await req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env["FILECLOUD_JWT_KEY"]);
        const user= await decoded;
        req.user=user;
        next();
    }
    catch(e){
        console.log(e);
        res.status(401).send("Invalid request.");
    }
}