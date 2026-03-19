import React from 'react'
import { createContext, useEffect, useState } from "react";
import { createDefaultImportMeta } from "vite/module-runner";
import { Navigate, redirect, useNavigate } from "react-router-dom";
;
import axios from "axios"
import { toast } from 'react-toastify';
export const CarContext = createContext();
const CarContextProvider = (props) => {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
  const currency = '$'
  const [search,setsearch] = useState("")
  const [searched , setsearched] = useState("")
const [Cars,SetCars] = useState([])
const [registration,setregistration] = useState("register")
const [fuel,setfuel]= useState([])
const [transmission,settransmission] = useState([])
const [token,settoken] = useState("")
const [user,setuser] = useState(null)
const [owner,setowner] = useState(false)
const [showLogin,setshowlogin] = useState(true)
const [pickUpDate, setPickUpDate] = useState("");
const [ReturnDate, setReturnDate] = useState("");
const [cars,setcars] = useState([])
const [ownercars,setownercars] = useState([])
const [ownercarsposted,setownercarsposted] = useState([])
const navigate = useNavigate()
const [dashboardData,setDashboardData] = useState({})
const expiredtoken = ()=>{
        localStorage.removeItem("token")
        settoken(null)
        setuser(null)
        setowner(false)
        delete axios.defaults.headers.common['token'];
            toast.error("Token Expired  Login Again")
      //   setTimeout(() => {
      //    window.location.href = "/login";
      //  }, 1500);
}

   


const fetchdashboardData = async()=>{
    try {
        if(token){
          const {data} = await axios.get("/api/owner/dashboard")
          console.log(data)
          if(data.success){
          setDashboardData(data.DashBoardData)
          }else if(data.message === "jwt expired"){
              expiredtoken()
        }
      }
        else{ 
          toast.error("no token")
        }
    } catch (error) {
      console.log(error)
    }
}
const fetchOwnerCars = async()=>{
 try {
   if(token){
    
   const {data} = await axios.get("/api/order/owner")
  
   if(data.success){
     setownercars(data.bookings)
   }else if(data.message === "jwt expired"){
       expiredtoken()
   }
   else{ 
    toast.error("error in fetching cars")
   }
  }
 
 } catch (error) {
  console.log(error)
 }
}
const fetchOwnerCarsPosted = async()=>{
 try {
  
   if(token){  
   const {data} = await axios.post("/api/owner/cars")
   
   if(data.success){
     setownercarsposted(data.owner)
   }else if(data.message === "jwt expired"){
      expiredtoken()}
   else{ 
    toast.error("error in fetching owner cars")
   }
  }
 
 } catch (error) {
  console.log(error)
 }
}
const fetchcars = async()=>{
try {
const {data} = await axios.get('/api/user/cars')
data.success ? setcars(data.cars) :toast.error(data.message)

} catch (error) {
console.log(error)
}
}
const fetchuser = async()=>{
  try{
    const {data} = await axios.get("/api/user/data")
    console.log(data)
    if(data.success){
      setuser(data.user)
      console.log("checking user")
      setowner(data.user.role === 'owner')
      console.log("fetched the data")
     
    }else if(data.message === "jwt expired"){
        localStorage.removeItem("token")
        settoken(null)
        delete axios.defaults.headers.common['token'];
        setuser(null)
        setowner(false)
            toast.error("No Token Login Again")
                setTimeout(() => {
         window.location.href = "/login";
       }, 1500);
    }
    else{
      console.log(error.message)
    }
  }
  catch(error){
toast.error(error)
  }
}
const logout = () =>{
  localStorage.removeItem('token')
    settoken(null)
    setuser(null)
    setowner(false)
    delete axios.defaults.headers.common['token'];
    toast.success("You have been Logged Out") 
   
    
}
const changeRole = async()=>{
    if(token){
        axios.defaults.headers.common['token'] = token
        const {data} = await axios.post('/api/owner/change-role')
        if(data.success){
        setowner(true)
        }else if(data.message === 'jwt expired'){
         expiredtoken()
        }
    }
    else{ 
      console.log("not a valid token")
    window.location.href = "/login";
    }
  
  }
useEffect( ()=>{
  
  const token1 = localStorage.getItem('token')
  if(token1){
  settoken(token1)
}
else{
  settoken(null);
  setuser(null);
  setowner(false);
}
fetchcars()
},[])
useEffect(()=>{
  if(token){
    axios.defaults.headers = {
      ...axios.defaults.headers,
      common: {
        ...axios.defaults.headers?.common,
        token: token
      }
    }    
fetchuser()
fetchOwnerCars()
fetchOwnerCarsPosted()
fetchdashboardData()
}
},[token])


    const value ={
   expiredtoken, fetchOwnerCars,fetchOwnerCarsPosted,dashboardData,setownercarsposted,ownercarsposted, ownercars,setownercars,owner,registration,setregistration, currency,searched,setsearched,setsearch,search,SetCars,Cars,setfuel,settransmission,transmission,fuel,token,user,setuser,settoken,
        fetchcars,fetchuser,cars,showLogin,setshowlogin,pickUpDate,ReturnDate,logout,setcars,setPickUpDate,setReturnDate,changeRole
      }

      
      
      
    
  return (
    <CarContext.Provider value={value}>
        {props.children}
    </CarContext.Provider>
  )
}

export default CarContextProvider
