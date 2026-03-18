import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); 
import mongoose from "mongoose";


const ConnectDB = async()=>{
    try{



        mongoose.connection.on(`connected`,()=>{
            console.log("DB CONNECTED")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/CarRental`)
    }
    catch(error){
        console.log(error)
    }
    }
export default ConnectDB