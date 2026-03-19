import React from 'react'
import { assets } from '../assets/assets.js'
import { useState } from 'react';
const Hero = () => {
  const [form, setform] = useState({
    pickupDate : "",
    returnDate: ""
  });
  return (
    <>
    <div className='flex flex-col  justify-center items-center mt-30 py-10 gap-3 sm:flex-row sm:justify-between '>
        <div className='sm:flex sm:flex-col gap-10 '>
      <div className='text-center  sm:flex sm:flex-col '>
<h1 className='text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-serif'>
    Best luxury Cars on Rent
    
    </h1>
<h1 className='text-2xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-serif '>
    Your Ride, Your Rules

    </h1>
      </div>
      <div className='text-center text-balance  mb-10 text-lg md:text-2xl lg:text-3xl font-serif'>
     Perfect for business trips, family vacations, or spontaneous getaways.
      </div>
      </div>
      <img className='w-full sm:w-2/4    rounded-4xl mb-10' loading='eager' fetchPriority='high' src={assets.car} alt="" />
    </div>


  </>
  )
}

export default Hero
