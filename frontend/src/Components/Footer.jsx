import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center sm:flex-row sm:justify-between mt-30 mb-10'>
        <div className='flex flex-col  gap-5  sm: w-1/4'>
          <img src={assets.logo} className='w-full sm:2/4 m-auto' alt="" />
          <div className='w-full hidden sm:block mt-3'>Premium car rental service with a wide selection of
luxury and everyday vehicles for all your driving
needs.</div>
        </div>
        <div className='flex flex-row mt-10 sm:mt-1 gap-3 sm:gap-20'>
        <div className='flex flex-col gap-2'>
          <p>Quick Links</p>
          <p>Home</p>
          <p>Browse Cars</p>
          <p>List Your Cars</p>
          <p>About Us</p>
        </div>
         <div className='flex flex-col gap-2'>
          <p>Quick Links</p>
          <p>Home</p>
          <p>Browse Cars</p>
          <p>List Your Cars</p>
          <p>About Us</p>
        </div>
         <div className='flex flex-col gap-2'>
          <p>Quick Links</p>
          <p>Home</p>
          <p>Browse Cars</p>
          <p>List Your Cars</p>
          <p>About Us</p>
        </div>
        </div>
      
    </div>
  )
}

export default Footer
