import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['owner','user'],
        default:'user'
    }
},{timestamps:true})
const UserModel = mongoose.model.UserModel || mongoose.model('UserModel',UserSchema)
export default UserModel