import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { LayoutDashboard, PlusCircle, Car, CalendarCheck, BookOpenCheck, Clock, CheckCircle, Menu, X } from 'lucide-react';
import { CarContext } from '../Context/CarContext';
const Sidebar = () => {
  const {user} = useContext(CarContext)
  const [current,setcurrent] = useState("dashboard")
  return (
     
        
      
     <aside className='bg-gray-300 mt-10  rounded-l-3xl  w-50 hidden md:block'>
        <div className="flex flex-col   items-center mb-10 mt-10">
         
          <h2 className="font-semibold text-gray-700 capitalize ">{user?.name}</h2>
        </div>

        <nav className="w-full px-4 space-y-2">
         <NavLink to="" onClick={()=>setcurrent("dashboard")} >
          
           <NavItem  active={current === "dashboard"} icon={<LayoutDashboard size={20}/>} label="Dashboard"   />
          </NavLink>
        <NavLink to="add" onClick={()=>setcurrent('add')}>
          
            <NavItem active={current === "add"}  icon={<PlusCircle size={20}/>} label="Add Car" />
          </NavLink>
        <NavLink to="cars" onClick={()=>setcurrent('cars')}>
           <NavItem active={current === "cars"}  icon={<Car size={20}/>} label="Manage Cars" />
          
          </NavLink> 
         <NavLink to="booking" onClick={()=>setcurrent('booking')}>
          <NavItem active={current === "booking"} icon={<CalendarCheck size={20}/>} label="Manage Bookings" />
          
          </NavLink> 
        </nav>
      </aside>

  )}
      const NavItem = ({ icon, label,onClick ,active =false }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
    active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'
  }`}>
    {icon} 
    <span className="text-sm">{label}</span>
  </div>
      )


export default Sidebar
