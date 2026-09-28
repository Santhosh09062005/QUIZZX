import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://santhosh09062005_db_user:<db_password>@cluster0.b7r91jm.mongodb.net/QUIZZX")
    .then(()=>{
        console.log("DB CONNECTED")
    })
};



