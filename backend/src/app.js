import dotenv from "dotenv";
dotenv.config();
import express from "express";
import noteRoute from "./routes/notes.route.js";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

app.use("/api/notes",noteRoute);

//wild card route
app.get("*name",(req,res)=>{
    res.send("this is wild card route");
});

export default app;