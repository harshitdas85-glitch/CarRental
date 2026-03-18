import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); 
import express from "express"
import cors from "cors"
import "dotenv/config"
import ConnectDB from "./Config/Mongodb.js"
import UserRouter from "./Routes/UserRouter.js"
import OwnerRouter from "./Routes/OwnerRoute.js"
import uploadonCloudinary from "./Config/Cloudinary.js"
import bookingRouter from "./Routes/BookingRoute.js"
const app = express()
const port  = process.env.PORT || 4000
ConnectDB()
uploadonCloudinary()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use('/api/user',UserRouter)
app.use('/api/owner',OwnerRouter)
app.use('/api/order',bookingRouter)
app.get('/',(req,res)=>{
    res.send("Api Working")
})
module.exports = app;
