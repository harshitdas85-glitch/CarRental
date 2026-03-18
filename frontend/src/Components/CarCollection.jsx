import React, { useContext, useEffect, useState } from 'react'
import TopRated from "./TopRated.jsx"
import Car from './Car.jsx'

import {CarContext } from "../Context/CarContext.jsx"
import { useSearchParams } from 'react-router-dom'
const CarCollection = () => {
const {Cars,cars,SetCars,user,setsearched,searched,transmission,settrasmission,fuel,setfuel} = useContext(CarContext)
const filter = ()=>{
  let carscopy = cars.slice()
  if(fuel.length > 0){
    carscopy = carscopy.filter(item=>fuel.includes(item.fuel))
  }
   if(transmission.length > 0){
    carscopy = carscopy.filter(item=>transmission.includes(item.transmission))
  }
  carscopy = carscopy.filter((e)=>(e.model).toLowerCase().includes(searched))

SetCars(()=>(carscopy))
}
useEffect(()=>{
  filter()
},[fuel,transmission,searched,cars])

  return (
    <>
    <div className='mt-10 ml-5'>
      Showing {Cars.length} Cars
    </div>
      <div className=' grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5  gap-5 place-items-center'>
   { Cars.length > 0 ?  Cars.map((item, index) => {
        return <Car 
            key={item._id || index} // Unique key for React
            _id={item._id}          // Pass _id from MongoDB
            name={item.brand} 
            seats={item.seats} 
            year={item.year} 
            type={item.type}
            model={item.model} 
            transmission={item.transmission} 
            fuel={item.fuel} 
            image={item.image} 
            location={item.location}
            owner={item.owner}      // Passing the owner ref from your model
        />}) : <div>Loading Premium Cars... </div> }
      </div>
</>
    
  )
}

export default CarCollection
