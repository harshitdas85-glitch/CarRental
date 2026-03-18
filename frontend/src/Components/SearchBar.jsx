import React, { useContext, useEffect } from 'react'
import { CarContext } from '../Context/CarContext'
import { ListFilter } from 'lucide-react';

import { useState } from "react"
const SearchBar = () => {
  const {setsearched,searched,setfuel,settransmission,fuel,cars,transmission} = useContext(CarContext)
  const [isOpen, setIsOpen] = useState(false);
const filteringtransmission = (e) => {
  const value  = e 

  settransmission((prev) => {
    
    if(transmission.includes(value))
    {

      return prev.filter((item) => item !== value);
    }
    
    if (prev.includes(value)) return prev;
    
    return [...prev, value];
  });
};

const filteringfuel = (e)=>{
  const value = e
  setfuel((prev)=>{
    if(fuel.includes(value)){
    return  prev.filter((item)=>(item !== value))
    }
    if(prev.includes(value)){
      return prev
    }
   return [...prev,value]
  }
  )
} 

  return (
    <div className=' rounded-2xl w-3/4 m-auto h-auto flex justify-between items-center  bg-white'>
      <input type="text" onChange={(e)=>setsearched(e.target.value)} className='w-full px-3 py-2 outline-none rounded-2xl' placeholder='Search' />
      <div onClick={() => setIsOpen(!isOpen)} className='px-4 drop'>
        
        <ListFilter/>
        </div>
        {isOpen && (
          <div className='relative flex  justify-center'>
        <div className="absolute w-auto   mt-2 sm:w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1 text-gray-700 flex flex-col px-3">
            <div>Transmission</div>
            <div>
  <input checked={transmission.includes("Automatic")} onChange={(e)=>filteringtransmission(e.target.value)} value="Automatic" type="checkbox" />
             <span className='ml-1 sm:ml-2'>Automatic</span>

            </div>
          <div>
     <input checked={transmission.includes("Manual")} onChange={(e)=>filteringtransmission(e.target.value)} value="Manual" type="checkbox" />
             <span className='ml-2'>Manual</span>

          </div>
          </div>
          <div className="py-1 text-gray-700 flex flex-col px-3">
            <div>Fuel Type</div>
            <div>
  <input checked={fuel.includes("Gasoline")} onChange={(e)=>filteringfuel(e.target.value)} value="Gasoline" type="checkbox" />
             <span className='ml-2'>Gasoline</span>

            </div>
          <div>
     <input checked={fuel.includes("Diesel")} onChange={(e)=>filteringfuel(e.target.value)} value="Diesel" type="checkbox" />
             <span className='ml-2'>Diesel</span>

          </div>
          <div>
     <input checked={fuel.includes("Electric")} onChange={(e)=>filteringfuel(e.target.value)} value="Electric" type="checkbox" />
             <span className='ml-2'>Electric</span>

          </div>
          <div>
     <input checked={fuel.includes("Hybrid")} onChange={(e)=>filteringfuel(e.target.value)} value="Hybrid" type="checkbox" />
             <span className='ml-2'>Hybrid</span>

          </div>
          </div>
    </div>
          </div>
      )}

    </div>
  )
}

export default SearchBar
