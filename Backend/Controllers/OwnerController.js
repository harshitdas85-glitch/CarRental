import UserModel from "../Models/UserModel.js";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); 
import CarModel from "../Models/CarModel.js";
import {v2 as cloudinary } from "cloudinary"
import Booking from "../Models/BookingModel.js";

export const changeRoleToOwner = async(req,res)=>{
    try{
        const {_id} = req.user;
        await UserModel.findByIdAndUpdate(_id,
          {role:'owner'},
               )
        res.json({success:true,message:"Now you can list your cars"})
    }
    catch(error){
console.log(error.message)
res.json({success:false,message:error.message})
    }
}
export const addcar = async(req,res)=>{
    try {
        const {_id} = req.user
        const imageFile = req.file; 
        if (!imageFile) {
            return res.json({ success: false, message: "No image file provided" });
        }
        let car = JSON.parse(req.body.carData)
 let result = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
 let image1 = result.secure_url
         await CarModel.create({...car,owner:_id,image:image1})
         res.json({success:true,message:"Car Added"})
    } catch (error) {
        console.log(error.message)
res.json({success:false,message:error.message})
    }

}
export const getOwnerCar = async(req,res)=>{
  try {
      const {_id} = req.user
    const owner = await CarModel.find({owner:_id})
    res.json({success:true,owner})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
} 
export const togglecar =async (req,res)=>{
      try {
      
      const {_id} = req.user
      const {carId} = req.body
       const car = await CarModel.findById(carId)
       if(car.owner.toString()!==_id.toString()){
        return res.json({success:false,message:"not the owner of the car"})
       }
     car.isAvailable = !car.isAvailable
       await car.save()

    res.json({success:true,message:"Availability toggled"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export const deletecar =async (req,res)=>{
      try {
      
      const {_id} = req.user
      const {carId} = req.body
      console.log(carId)
       const car = await CarModel.findById(carId)
       console.log(car)
       if(car.owner.toString()!==_id.toString()){
        return res.json({success:false,message:"not the owner of the car"})
       }
        car.owner = null
        car.isAvailable = false
        await car.save()

    res.json({success:true,message:"Car Removed"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
export const getdashboarddata = async (req,res)=>{
    try{
const { _id, role} = req.user 
 if(role!= 'owner'){
    return res.json({success:false,message:"Not authorised to access this"})
 }
 const cars = await CarModel.find({owner:_id})
 const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt:-1})
 const pendingbooking = await Booking.find({owner:_id,status:'pending'})
 const confirmedbooking = await Booking.find({owner:_id,status:'confirmed'})
  const MontlyRevenue  =  bookings.slice().filter(bookings=>bookings.status === 'confirmed').reduce((acc,booking)=>acc + booking.price,0)
const DashBoardData = {
    totalCars:cars.length,
    totalBookings:bookings.length,
    pendingbooking: pendingbooking.length,
    completedbookings:confirmedbooking.length,
    recentBookings:bookings.slice(0,3),
    MontlyRevenue
}
res.json({success:true,DashBoardData })
    }
    catch(error){

    }
}