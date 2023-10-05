import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import 'dotenv/config'
import { pool } from "./db.js";
import { authAPI, auth } from "./auth.js";

var app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
authAPI(app);
app.get("/auth-test",auth, (req,res)=>{
    console.log(req.user);
    res.status(200).send("Authorized");
})

app.listen(9768, ()=>{
    console.log(`Server started`)
});
