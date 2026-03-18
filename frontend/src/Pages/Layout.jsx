import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import { CarContext } from '../Context/CarContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Layout = () => {
  const {token} = useContext(CarContext)
 const navigate  = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);


  return (
    <div className='flex flex-row mt-20 w-full justify-center'>
    <Sidebar/>
    <Outlet/>
    </div>
  )
}

export default Layout
