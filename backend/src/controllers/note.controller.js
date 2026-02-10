import noteModel from "../models/notes.model.js";

export async function createNote(req,res){
    const {title,description}=req.body;

    if(title.trim()===""||description.trim()===""){
        return res.status(400).json({
            success:false,
            message:"Title or description is empty."
        });
    }

    await noteModel.create({title,description});

    return res.status(200).json({
        success:true,
        message:"Note created"
    });
}

export async function getAllNotes(req,res){
    const notes=await noteModel.find();

    if(!notes){
        return res.status(400).json({
            success:false,
            message:"Notes fetch operation failed"
        });
    }

    return res.status(200).json({
        success:true,
        message:"Notes fetched",
        notes
    });
}

export async function deleteNote(req,res){
    const {id}=req.params;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        success:true,
        message:"Note deleted"
    });
}

export async function updateNote(req,res){
    const {description}=req.body;
    const {id}=req.params;

    await noteModel.findByIdAndUpdate(id,{
        description
    });

    res.status(200).json({
        success:true,
        message:"Note updated"
    });
}

export async function getNote(req,res){
    const {id}=req.params;

    const note=await noteModel.findOne({ _id:id });

    if(!note){
        return res.status(400).json({
            success:false,
            message:"Note fetch failed"
        });
    }

    res.status(200).json({
        success:true,
        message:"Note fetched",
        note
    });
}