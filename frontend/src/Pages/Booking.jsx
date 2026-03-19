import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { CarContext } from '../Context/CarContext'
import axios from "axios"

const Booking = () => {
  const navigate = useNavigate()
  const { currency, cars,token,expiredtoken } = useContext(CarContext) 
  useEffect(() => {
 if (!token) {
   navigate("/");
  }
  }, [token, navigate]);
  const [carnow, setcarnow] = useState(null)
  
  const params = useParams()
  const id = params.id || params.CarId 

  const [FormData, SetFormData] = useState({
    car:id,
    pickupDate: "",
    returnDate: "",
  })

  const onchange = (e) => {
    const { name, value } = e.target
    SetFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onsubmit1 =async (e) => {
    e.preventDefault()
    if(token){
      const {data} = await axios.post("/api/order/create",FormData)
      
      if(data.success){
        toast.success("booked the car")
        console.log(data)
      }
      else if(data.message == 'jwt expired'){
       
        expiredtoken()
      }
      else if(data.message == 'Cannot book your own car'){
        toast.error(data.message)
      }
      else{
        toast.error("Car is Not Available for these dates")

      }
    }
  else{
    toast.error("Don't have a valid token")
  }
  SetFormData({
      car:id,
    pickupDate: "",
    returnDate: "",
  })
  }

  const find = () => {
    
    const car = cars.find((item) => item._id === id)
    if (car) {
      setcarnow(car)
    }
  }

  useEffect(() => {
    if (cars.length > 0) {
      find()
    }
  }, [id, cars]) 
  if (!carnow) {
    return <div className="mt-40 text-center">Loading car details...</div>;
  }

  return (
    <div className='mt-40'>
      <div className='flex flex-col md:gap-15 md:flex-row '>

        <div className='flex flex-col  md:w-2/4 lg:w-3/4 md:flex-col font-serif   md:gap-2'>
          {/* Fixed: check if image is string or array */}
          <img src={Array.isArray(carnow.image) ? carnow.image[0] : carnow.image} className='w-full md:w-full lg:w-3/4   rounded-2xl' alt="" />
          <div className='sm:'>
            {/* Fixed: Use brand and model if name is undefined */}
            <h1 className='text-start text-3xl mt-5'>{carnow.name || `${carnow.brand} ${carnow.model}`}</h1>
            <div className='text-gray-500 mb-10'>{carnow.type} | <span>{carnow.year}</span></div>
            <div className='grid grid-cols-2 md:grid-cols-4 md:w-full lg:w-3/4 gap-x-4 mb-10 gap-y-5  text-center '>
              <div className='w-full bg-white rounded-2xl  py-5'>{carnow.seats} seats</div>
              <div className=' bg-white rounded-2xl py-5 '>{carnow.fuel}</div>
              <div className=' bg-white rounded-2xl py-5'>{carnow.transmission}</div>
              <div className=' bg-white rounded-2xl py-5'>{carnow.location}</div>
            </div>
            <div className='text-lg'>
              Description
            </div>
            <div className='text-md sm:w-3/4'>{carnow.description}</div>
          </div>
        </div>


        <form onSubmit={onsubmit1} className='bg-white m-auto  w-4/5 md:w-2/5  lg:w-2/5 2xl:w-1/4 flex flex-col gap-3 py-4 rounded-2xl font-serif  h-auto px-10 md:mt-1 mt-20'>
          <div className='flex flex-row mb-5  justify-between '>
            <div>
              {currency} {carnow.price}
            </div>
            <div>
              Per Day
            </div>
          </div>
          <hr className='mb-5' />
          <div>
            PickUp Date 
          </div>
          <input type="date" id='pickup' onChange={onchange}
            value={FormData.pickupDate} name='pickupDate' className='border px-2 py-1' />
          <div>Return Date</div>
          <input type="date" onChange={onchange} value={FormData.returnDate} name='returnDate' className='border px-2 py-1' />
          <button type='submit' className='w-full cursor-pointer mb-4 rounded-lg mt-5 py-2 text-white bg-[var(--blue)]'>
            Book Now
          </button>
          <div className='text-center text-sm text-gray-500'>
            No credit card required to reserve
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
