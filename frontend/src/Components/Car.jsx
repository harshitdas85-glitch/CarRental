import React, { lazy, useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { CarContext } from '../Context/CarContext'
import { Fuel } from 'lucide-react';
import { Cog } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Armchair } from 'lucide-react';

// 1. Change 'id' to '_id' to match MongoDB/Mongoose default
// 2. Add 'owner' if you want to display who the car belongs to
const Car = ({ _id, name, year, model, fuel,type, seats, transmission, location, image, owner }) => {
  const {token} = useContext(CarContext)
  return (
    <NavLink  to={ token ? `/car/${_id}` : '/login'}> {/* Changed from id to _id */}
        
      <div className='flex flex-col text-sm hover:scale-105 text-[--var(black)] font-serif shadow-[0px_10px_10px_0px_rgba(0,0,0,0.1)] bg-[var(--white)] rounded-xl aspect-video w-[230px] h-auto'>
        <img  src={image}  alt={name} className='w-full  h-full object-cover rounded-xl' />   
        
        <div className='mt-2 flex text-md mb-1 items-center flex-row z--1'>
          <div className='ml-3'>{name}</div>
          <div className='ml-1'>{model} </div>
          
         
        </div>
          {owner && <div className='px-3  text-[10px] opacity-70'>Listed by: <span className='z--1 uppercase'>{owner.name}</span></div>}
          <div className='ml-3 text-xs'>
            {year} &middot; {type}
            
            </div>

        <div className='flex mt-3 flex-row justify-between px-3'>
          <div className='flex flex-row items-center justify-center gap-1'><div>Seats:  </div> <div>{seats} </div></div>
          <div className='flex flex-row gap-2 justify-center items-center '><Fuel className='' size="30%"/><div>{fuel}</div></div>
        </div>

        <div className='flex flex-row mt-1 mb-3 justify-between px-3'>
          <div className='flex flex-row gap-2 justify-center items-center'><Cog size="30%"></Cog>{transmission}</div>
          <div className='flex flex-row gap-1 justify-center items-center'><MapPin size='35%'></MapPin><div>{location}</div></div>
        </div>
      </div>
    </NavLink>
  )
}

export default Car