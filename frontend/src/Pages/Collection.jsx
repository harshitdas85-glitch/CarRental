import React from 'react'
import  { Suspense, lazy } from 'react';

const CarCollection = lazy(() => import('../Components/CarCollection'));
const TopRated = lazy(() => import('../Components/TopRated'));
const SearchBar = lazy(() => import('../Components/SearchBar'));

const Collection = () => {
  
  return (
    <div>
       <TopRated top="Our Collection" bottom="Browse our selection of premium vehicles available for your next adventure"/>
          <SearchBar/>
    <CarCollection/>

    </div>
  )
}

export default Collection
