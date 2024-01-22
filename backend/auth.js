import { db } from "./db.js"
import bcrypt from "bcrypt"
import express from "express"
/**
 * @param {express.Express} app 
 */
export function authAPI(app){
    app.post("/api/v1/login",(req,res)=>{
        if(req.body.password==null) {res.status(400).send("NO_PASSWORD"); return}
        if(req.body.username==null) {res.status(400).send("NO_USERNAME"); return}
        db("users").select("username","password","id").where({username: req.body.username}).then((val)=>{
            if(val.length==0 || val==null){
                return res.status(400).send("USER_DOESNT_EXIST");
            }
            bcrypt.compare(req.body.password, val[0].password).then((match)=>{
                if(!match){
                    return res.status(400).send("INVALID_PASSWORD");
                }
                else{
                    let value = {...val[0]};
                    const {password, ...user} = value;
                    req.session.user = user;
                    req.session.userAgent = req.headers["user-agent"];
                    req.session.loginTimestamp = new Date().toISOString();
                    res.status(200).send("LOGIN_SUCCESS");
                }
            })
        })
    })

    app.post("/api/v1/register",(req,res)=>{
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

    app.get("/api/v1/logout",(req,res)=>{
        req.session.destroy();
        res.status(200).send()
    })

    app.get("/api/v1/validate-session",(req,res)=>{
        try{
            if(req.session.user){
                res.status(200).send("SESSION_VALID");
            }
            else{
                res.status(401).send("SESSION_INVALID");
            }
        }
        catch{
            res.status(401).send("SESSION_INVALID");
        }
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
            res.status(401).send("SESSION_INVALID");
        }
    }
    catch(e){
        console.log(e);
        res.status(401).send("401 Unauthorized");
    }
}