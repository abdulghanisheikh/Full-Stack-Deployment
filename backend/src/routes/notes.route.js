import express from "express";
import {createNote,getAllNotes,deleteNote,updateNote,getNote} from "../controllers/note.controller.js";

const noteRoute=express.Router();

noteRoute.post("/",createNote);
noteRoute.get("/",getAllNotes);
noteRoute.delete("/:id",deleteNote);
noteRoute.patch("/:id",updateNote);
noteRoute.get("/:id",getNote);

export default noteRoute;