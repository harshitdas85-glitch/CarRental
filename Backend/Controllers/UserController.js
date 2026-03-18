import UserModel from "../Models/UserModel.js";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import CarModel from "../Models/CarModel.js";

const createToken = (_id)=>{
return jwt.sign({
_id
},
process.env.JWT_SECRET,
{expiresIn:"1h"}
)
} 

export const loginUser = async(req,res)=>{
    try{
      const {email,password } = req.body
      const storedemail = await UserModel.findOne({email})
      if(!storedemail){
        res.json({success:false,message:"User Doesn't Exists"})
      }
      const isMatch = await bcrypt.compare(password,storedemail.password)
      if(!isMatch){
        return res.json({success:false,message:"Wrong User Credentials"})
    }
    const token = createToken(storedemail._id)
    res.json({success:true,token})
}
    catch(error){
        console.log(error.message)
         res.status(500).json({ error: "Login failed" });
    }
}
const registerUser = async(req,res)=>{

   try {
     const {name,email,password} = req.body
     const check = await UserModel.findOne({email})
     if(check){
 return res.json({success:false,message:"User with this email already exists"})
     }
     const salt = await bcrypt.genSalt(10)
      const hashedpassword = await bcrypt.hash(password,salt)
      const newUser = new  UserModel({
         name:name,
         email:email,
         password:hashedpassword
      })
      const user = await newUser.save()
      const token = await createToken(user._id)
      res.json({success:true,token})
   } catch (error) {
    console.log(error.message)
    res.status(500).json({success:false,message:"Error Occured while registering"})
   }
}
const getuserdata = async(req,res)=>{
    try{
const {user} = req
res.json({success:true,user})

    }
    catch(error){
console.log(error.message)
res.json({success:false,message:error.message})
    }
}
const getcars = async(req,res)=>{
    try {
  
       const cars =  await CarModel.find({isAvailable:true}).populate('owner') 
       res.json({success:true,cars})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
}

export {registerUser,getuserdata,getcars}