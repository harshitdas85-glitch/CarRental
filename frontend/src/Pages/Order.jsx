import React, { useContext, useEffect } from 'react'
import RentedCar from '../Components/RentedCar'
import { CarContext } from '../Context/CarContext'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Order = () => {
  const {token} = useContext(CarContext)
  const navigate = useNavigate()
  const [cars,setcars] = useState([])
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const fetchuserorderdata = async()=>{
    if(token){
       const {data} = await axios.get("/api/order/user")
       console.log(data)
       if(data.success){
        console.log("got the data")
        setcars(data.userbooks)
       }
       else{
        console.log("error in fetching the data")
       }
    }else{
      toast.error("Not a valid token")
    }
  }
  useEffect(()=>{
    console.log(token)
    if(token){
    fetchuserorderdata()
    }
  },[token])
  console.log(cars)
  if(!cars){
      return <div className="mt-40 text-center">Loading car details...</div>;
  }
  return (
    <div className='mt-20 '>
      <div className='flex flex-col gap-5 mt-30'>
      <div className='text-3xl'>MY BOOKINGS</div>
      <div className='text-2xl mb-5'>
      
      </div>
      </div>
      <div className='flex flex-col gap-5'>
        {cars.map((item)=>(
         
          <RentedCar key={item._id} year={item.car.year} type={item.car.type} location={item?.car?.location} image={item.car.image} brand={item.car.brand} model={item.car.model} status={item.status} pickupDate={new Date (item.pickupDate).toLocaleDateString("en-GB")} returnDate={new Date (item.returnDate).toLocaleDateString("en-GB")} price={item.price} bookedOn={new Date(item.createdAt).toLocaleDateString("en-GB")}   />

        ))}
    
      </div>
    </div>
  )
}

export default Order
