import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'

import { lazy,Suspense } from 'react'
import Navbar from "./Components/Navbar.jsx"
import { Route,Routes } from 'react-router-dom'
import './App.css'
const Home = lazy(() => import("./Pages/Home.jsx"));
const Collection = lazy(() => import("./Pages/Collection.jsx"));
const Order = lazy(() => import("./Pages/Order.jsx"));
const Booking = lazy(() => import("./Pages/Booking.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Footer = lazy(() => import("./Components/Footer.jsx"));
const Dashboard = lazy(() => import("./Components/Dashboard.jsx"));
const ManageBooking = lazy(() => import("./Components/ManageBooking.jsx"));
const ManageCars = lazy(() => import("./Components/ManageCar.jsx"));
const Add = lazy(() => import("./Components/AddCar.jsx"));
const Layout = lazy(() => import("./Pages/Layout.jsx"));

import { ToastContainer } from 'react-toastify';

import { CarContext } from './Context/CarContext.jsx'
function App() {
  const [count, setCount] = useState(0)
const {token} = useContext(CarContext)
return (
    <div>
      <Navbar/>
    <div className='px-4 sm:px-[2vw]  md:px-[2vw] lg:px-[3vw]'>
       <Suspense fallback={<div>Loading...</div>}>
  <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/collection' element={<Collection/>}/>
       <Route path='/orders' element={<Order/>}/>
       <Route path='/car/:CarId' element={<Booking/>}/>
       <Route path='/login' element={<Login token={token}/>}/>
       <Route path='/owner' element={<Layout/>}>
       <Route index element={<Dashboard/>}/>
       <Route path='add' element={<Add/>}/>
       <Route path='booking' element={<ManageBooking/>}/>
       <Route path='cars' element={<ManageCars/>}/>
                  </Route>
      
           
       </Routes>
</Suspense>
      <Footer/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    </div>
  )
}

export default App