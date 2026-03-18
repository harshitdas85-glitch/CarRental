import mongoose, { Schema } from "mongoose";
import UserModel from "./UserModel.js";

const { ObjectId } = Schema.Types;
const CarSchema = new Schema({
    owner:{
type: ObjectId,
ref: "UserModel"
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    image:{
      type : String,
       required:true
    },
    transmission:{
        type:String,
        required:true
    },
    fuel:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
const CarModel = mongoose.model("CarModel",CarSchema)
export default CarModel