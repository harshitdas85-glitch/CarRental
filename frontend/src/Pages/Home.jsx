import React from 'react'
import { lazy, useContext,Suspense } from 'react'

import Hero from '../Components/Hero.jsx';
import TopRated from '../Components/TopRated.jsx';
import Car from '../Components/Car.jsx';
import Listing from '../Components/Listing.jsx';
import Review from '../Components/Review.jsx';
import Email from '../Components/Email.jsx';




import { CarContext } from '../Context/CarContext.jsx'
function Home() {
  const {cars,token} = useContext(CarContext)
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <div>
  <Hero/>
  <TopRated top="Top Rated Cars" bottom="We’ve got the best cars, because your journey deserves nothing less."/>
 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 place-items-center px-4'>
        {cars.length > 0 ? cars.slice(0,5).map((item) => (
  <Car 
    key={item._id} 
    _id={item._id} 
    name={`${item.brand} ${item.model}`}
    type={item.type} // Combine brand and model
    seats={item.seats} 
    year={item.year} 
    transmission={item.transmission} 
    fuel={item.fuel} 
    image={item.image} // Just item.image (no [0])
    location={item.location} 
  />
))
          : (
          <p className="col-span-full text-gray-400">Loading premium vehicles...</p>
        )}
      </div>  
    <Listing/>
    <TopRated top="What Our Customers Say" bottom="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."/>
    <div className=' grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-4 2xl:grid-cols-4  gap-5 justify-center items-center '>
 
  <Review name="Lucas Meyer" city="Berlin, Germany" text="I’ve tried countless rental services, but none deliver the seamless booking and thoughtful touches that CarRental consistently provides."/>
   <Review name="Sofia Almeida" city="Lisbon, Portugal" text="Other platforms felt generic and rushed, but CarRental impressed me with its tailored approach and genuine care for every detail which was the best part."/>
    <Review name="David Chen" city="Toronto, Canada" text="I’ve tried countless rental services, but none deliver the seamless booking and thoughtful touches that CarRental consistently provides."/>
    <Review name="Sofia Almeida" city="Lisbon, Portugal" text="Other platforms felt generic and rushed, but CarRental impressed me with its tailored approach and genuine care for every detail which was the best part"/>

    </div>
    <TopRated top="Never Miss a Deal!" bottom="Subscribe to get the latest offers, new collections, and exclusive discounts."/>
    <Email/>
    </div>
    </Suspense>

  )
}

export default Home
