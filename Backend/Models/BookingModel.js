import mongoose from "mongoose";
import { Schema } from "mongoose";
const {ObjectId} = Schema.Types
const BookingSchema =  new mongoose.Schema({
    car:{
        type:ObjectId,
        ref: "CarModel",
        required:true
        },
          user:{
        type:ObjectId,
        ref: "UserModel",
        required:true
        },
           owner:{
        type:ObjectId,
        ref: "UserModel",
        required:true
        },
        pickupDate: {
            type:Date,
            required:true
        },
        returnDate:{
            type:Date,
            required:true
        },
        status:{
            type:String,
            enum:['pending','confirmed','cancelled'] ,
            default:'pending'
        },
        price:{
            type:Number,
            required:true
        }
},{timestamps:true}) 
const Booking = mongoose.model('Booking',BookingSchema)
export default Booking