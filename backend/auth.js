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
                else{
                    req.session.user = val[0]
                    res.status(200).send("Login success")
                }
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

    app.get("/logout",(req,res)=>{
        req.session.destroy();
        res.redirect("/");
    })
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
export async function auth(req, res, next){
    try{
        if(req.session.user){
            next();
        }
        else{
            next(new Error("User not logged in."))
        }
    }
    catch(e){
        console.log(e);
        res.status(401).send("401 Unauthorized");
    }
}