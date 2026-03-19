import React, { useContext, useState,useEffect } from 'react'
import { assets } from '../assets/assets'
import { TextAlignJustify } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { CarContext } from '../Context/CarContext';
const Navbar = () => {

    const [nav,setnav] = useState(false);
    const {user,logout,owner,changeRole,token,axios,setowner,setshowlogin,showLogin} = useContext(CarContext)
     useEffect(() => {
    if (nav) {
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = "auto";   // restore scroll
    }
  }, [nav]);

  return (
    <>
    <div className="fixed z-10 bg-blue-200 text-black top-0 left-0 h-16 w-full py-5 inline-flex justify-between items-center px-6">
  {/* Logo */}
  <img className="w-30 " src={assets.logo} alt="Logo" />

  {/* Mobile menu */}
  <div onClick={()=>setnav(!nav)} className="md:hidden"><TextAlignJustify/></div>

 
  <div className="hidden w-3/5 justify-between forum-regular items-center md:flex gap-8">
    <div className='flex gap-7 ml-10 md:text-sm  xl:text-lg 2xl:text-xl  '>
    <NavLink to="/">
        <div >Home</div>
        </NavLink>
  <NavLink to="/collection">
  
      <div>Cars</div>
    </NavLink> 
  <NavLink to={(owner && token) ? "/owner" : "/login" }>
    { owner ? <div>Dashboard </div> : <div onClick={()=>changeRole()}>List Cars</div>} 
    
    </NavLink> 

    </div>
  
    <div className="hidden items-center md:flex gap-6">
        <NavLink to={token ? "/orders" : "/"}>
        
   {token ? <div >My Bookings </div> : ""}

        </NavLink>
      
   <NavLink to="/login">
    <button onClick={()=>{user ? logout() : setshowlogin(true)}} className=' hidden  md:block bg-[var(--blue)] text-white px-2 py-1 outline-none cursor-pointer rounded-sm' type=''>{user ? 'Logout' : 'Login'}</button>
    
    </NavLink> 
  </div>
  </div>
    
</div>
  <div className={` border h-screen   overflow-hidden top-0 z-10 w-full md:hidden ${nav ? "fixed":"hidden" }  bg-blue-200 `}>
    <div className='flex flex-col px-4 poppins-regular py-10 gap-5'>
     <button onClick={()=>setnav(!nav)}>
        Back
     </button>
        
        <hr />
       <NavLink to="/" className="" onClick={()=>setnav(!nav)}>
         <button className=''>Home</button>
        
        </NavLink> 
        <hr />
        <NavLink to="/collection" onClick={()=>setnav(!nav)}>
             <div>Cars</div>
            
            </NavLink>
        <hr />
        {user ? 
          <> <NavLink to={token ? "/orders" : "/"} onClick={()=>setnav(!nav)}>
        <div >My Bookings </div>

        </NavLink>
        <hr />
        </>
        : null}
    <NavLink to={(owner && token) ? "/owner" : "/login" } onClick={()=>setnav(!nav)}>
    { owner ? <div>Dashboard </div> : <div onClick={()=>changeRole()}>List Cars</div>} 
    
    </NavLink> 
     
        <hr />
        {(owner && token) ? 
     
     <> <NavLink to="/owner/add" onClick={()=>setnav(!nav)}>
             <div>Add Cars</div>
            
            </NavLink>
      <hr />
      <NavLink to="/owner/cars" onClick={()=>setnav(!nav)}>
             <div>Manage Cars</div>
            
            </NavLink>
      <hr /> 
     <NavLink to="/owner/booking" onClick={()=>setnav(!nav)}>
             <div>Manage Bookings</div>
            
            </NavLink>
      <hr />
      </>
     
      : null
      }
       <NavLink to="/login" onClick={()=>setnav(!nav)}>
    <div onClick={()=>{user ? logout()  : setshowlogin(true) }} className=' ' type=''>{user ? 'Logout' : 'Login'}</div>
    
    </NavLink> 
      <hr />



    </div>
  </div>
</>
  )
}

export default Navbar
