import React from 'react'
import { assets } from '../assets/assets'

const RentedCar = ({image,status,model,year,location,type,pickupDate,returnDate,price,user,brand,bookedOn}) => {
    console.log(location)
  return (
    <div className=' md:text-md  2xl:text-xl ' >
      <div className='flex flex-col md:flex-row bg-[var(--white)] font-serif justify-between px-5 py-3 h-auto rounded-lg'>
      <div className='flex flex-col  lg:w-3/4 md:flex-row justify-start'>
      <div className='flex flex-col gap-1 w-full gap-3 md:gap-1 md:w-1/3 '>
<img src={image} className='w-full rounded-lg' alt="" />
<div className='text-md  '>{brand} {model}</div>
<div className='text-sm md:text-md'>{year} &middot; {type} &middot; <span>{location}</span></div>
      </div>
      <div>
        <div className='flex flex-col md:mt-1 md:px-3 mb-5 mt-4 gap-2 lg:gap-3'>
            <div className='flex flex-row'>

            <div className='md:hidden'>Status :</div>
            <div className={`px-3 mx-2 w-fit py-0.2 ${status === "confirmed" ? "bg-green-400" : "bg-red-400"}  shadow-2xs text-white rounded-2xl`}>
                {status}
                </div>
            </div>
                <div  className='flex flex-row gap-1'>
                
                    <div>
                        Pickup Date : 
                    </div>
                   <div>{pickupDate}</div>
                </div>
                 <div  className='flex flex-row gap-1'>
                
                 
                    <div>
                        Return Date : 
                    </div>
                   <div>{returnDate} </div>
                   
                </div>

        </div>
      </div>
      </div>
      
      <div className='flex flex-col text-md '>
        <div>Total Price : <span>{price}</span></div>
        
        <div>Booked on : {bookedOn}</div>
      </div>
      </div>
  
    </div>
  )
}

export default RentedCar
