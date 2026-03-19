import jwt from "jsonwebtoken"

import UserModel from "../Models/UserModel.js";
const authuser = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorised Login Again"})
    }
    try{
       const decoded = jwt.verify(token,process.env.JWT_SECRET)
      
       req.user = await UserModel.findById(decoded).select("-password")
     
       next();




    }
    catch(error){
          console.log(error)
          return res.json({success:false,message:error.message})
    }
}
export default authuser