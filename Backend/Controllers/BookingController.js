import Booking from "../Models/BookingModel.js"
import CarModel from "../Models/CarModel.js";





const checkAvailability = async(car,pickupDate,returnDate)=>{
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte : returnDate},
        returnDate:{$gte : pickupDate},
   
  

    })
    return bookings.length === 0;
}
export const checkAvailabilityofCar = async(req,res)=>{
    try {
        const {location,pickupDate,returnDate} = req.body
        const cars = await CarModel.find({location,isAvailable:true})
        const availablepromise = cars.map(async(car)=>{
            const isAvailable = await checkAvailability(car._id,pickupDate,returnDate)
            return {...car._doc,isAvailable:isAvailable}
        })
        let AvailableCars = await Promise.all(availablepromise);
        AvailableCars = AvailableCars.filter(car=>car.isAvailable ===true)
        res.json({success:true,AvailableCars})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}


export const createBooking = async (req,res)=>{
    try{
const {_id} = req.user
const {car,pickupDate,returnDate} = req.body
const isAvailable =  await checkAvailability(car,pickupDate,returnDate)
if(!isAvailable){
    return res.json({success:false,message:"car is not available"})
}
const carData = await CarModel.findById(car)
if(_id.toString()=== carData.owner.toString()){
    
    return res.send({staus:404,message:"Cannot book your own car"});
}

const picked = new Date(pickupDate)
const returned = new Date(returnDate)
const noOfDays = Math.ceil((returned - picked)/(1000*60 *60*24 ))  
const price = carData.price * noOfDays
await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price})
res.json({success:true,message:"created the booking"})

    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

export const userbooking = async(req,res)=>{
   try {
    const {_id} = req.user
    const userbooks = await Booking.find({user: _id }).populate('car').sort({createdAt:-1})
    res.json({success:true,userbooks})


   } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
   }
}

export const ownerbookings = async(req,res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({success:false,message:"not authorised"})
        }
        const {_id} =req.user
        const bookings =await  Booking.find({owner:_id}).populate('car user').select("-user.password").sort({createdAt:-1})
        return res.json({success:true,bookings})
    } catch (error) {
          console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

export const statuschangebooking = async(req,res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({success:false,message:"not authorised"})
        }
        const {_id} =req.user
        const {bookingId,status} = req.body
        const bookings = await Booking.findById(bookingId)
        if(bookings.owner.toString() != _id.toString() ){
            return
             res.json({success:false,message:"not authorised"})
        }
        bookings.status = status;
        await bookings.save()
        return res.json({success:true,message:"Status Updated"})
    } catch (error) {
          console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

