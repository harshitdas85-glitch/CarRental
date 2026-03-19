import React from 'react'

const TopRated = (props) => {
  return (
    <div className='flex flex-col justify-center items-center mt-50 gap-5'>
      <h1 className='text-2xl text-black sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl sans-serif'>
{props.top}
    
    </h1>
      <div className='text-center text-gray-500 text-balance  mb-10 text-md md:text-lg lg:text-xl   poppins-regular'>
     {props.bottom}
      </div>
    </div>
  )
}

export default TopRated
