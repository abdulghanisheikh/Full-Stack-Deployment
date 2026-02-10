import mongoose from "mongoose";

const MONGO_URI=process.env.MONGO_URI;

export async function connectToDB(){
    await mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log("Database connected");
    })
    .catch(()=>{
        console.log("Database connection failed");
    });
}