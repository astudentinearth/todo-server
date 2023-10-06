import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import 'dotenv/config'
import { db } from "./db.js";
import { authAPI, auth } from "./auth.js";
import session from "express-session";
import filestore from "session-file-store"

var app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    name: "todo-session",
    secret: process.env["TODO_SESSION_KEY"],
    saveUninitialized: false,
    resave: false,
    store: new (filestore(session))()
}))

authAPI(app);
app.get("/auth-test",auth, (req,res)=>{
    console.log(req.user);
    res.status(200).send("Authorized");
})

app.listen(9768, ()=>{
    console.log(`Server started`)
});
