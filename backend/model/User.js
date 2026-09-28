import mongoose from "mongoose";

// we've created a mongoose useschema in this folder
const userSchema= new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['User','admin'],
        default:'User'
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    }
}, {timestamps: true});

const User =mongoose.model("User",userSchema);
export default User;