import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { CarContext } from '../Context/CarContext'

const Listing = () => {
 const {changeRole,token,owner} = useContext(CarContext)
const navigate = useNavigate()
 
  return ((owner && token) ? null : (
    <div className='w-full md:w-3/4 flex mt-50 flex-col md:flex-row bg-[var(--white)] rounded-lg text-black mt-10 mx-auto h-auto shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
      
      {/* Text Section */}
        <div className="flex justify-center  md:hidden md:w-1/2 p-5">
        <img className="rounded-2xl w-full md:w-auto max-h-64 md:max-h-none object-cover" src={assets.car1} alt="Luxury Car" />
      </div>
      <div className='flex flex-col gap-2 px-5 py-5 font-serif md:w-1/2'>
        <div className="text-lg md:text-xl font-semibold">
          Do You Own a Luxury Car?
        </div>    
        <div className="text-sm md:text-base leading-relaxed">
          Monetize your vehicle effortlessly by listing it on CarRental.
          We take care of insurance, driver verification, and secure payments —
          so you can earn passive income, stress-free.
        </div>   
        <NavLink onClick={()=>changeRole()} className="bg-[var(--blue)] w-full md:w-1/3 text-center py-2 rounded-lg text-white font-medium mt-3">
          LIST
        </NavLink> 
      </div>

      {/* Image Section */}
      <div className="flex justify-center hidden md:block md:w-1/2 p-5">
        <img className="rounded-2xl w-full md:w-auto max-h-64 md:max-h-none object-cover" src={assets.car1} alt="Luxury Car" />
      </div>
    </div>
  )
)}

export default Listing