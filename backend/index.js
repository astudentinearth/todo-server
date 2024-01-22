import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import 'dotenv/config'
import { db, sessionPool } from "./db.js";
import { authAPI, auth } from "./auth.js";
import session from "express-session";
import filestore from "session-file-store"
import { userAPI } from "./user.js";
import { todoAPI } from "./todo.js";
import { accountAPI } from "./account.js";
import connectPgSimple from "connect-pg-simple";
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
    cookie: {maxAge: 30 * 24 * 60 * 1000},
    store: new (connectPgSimple(session))({
        pool: sessionPool,
        tableName: "sessions",
    })
}))

authAPI(app);
userAPI(app);
todoAPI(app);
accountAPI(app);
app.get("/api/v1/auth-test",auth, (req,res)=>{
    console.log(req.user);
    res.status(200).send("Authorized");
})

app.listen(9768, ()=>{
    console.log(`Server started`)
});
