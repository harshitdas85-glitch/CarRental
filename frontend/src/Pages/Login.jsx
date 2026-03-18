import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { CarContext } from '../Context/CarContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Login = () => {
    const {registration,setregistration,showLogin,settoken,token,setshowlogin} = useContext(CarContext)
    const navigate = useNavigate();
   useEffect(() => {
     if (token) {
       navigate("/");
     }
   }, [token, navigate]);
const [state,setstate] = useState("register")
const [formdata,setformdata] = useState({
    name:"",
    email:"",
    password:"",

})
const onchange = (e)=>{
    const {name,value} = e.target
    setformdata((prev)=>({...prev,[name]:value}))
}
const onsubmithandlerregister = async(e)=>{
    e.preventDefault()
   try {

      const {data} = await axios.post("/api/user/register", formdata);
      console.log("Registration successful:", data);
      if(data.success){
        localStorage.setItem("token",data.token)
        console.log(data.token)
        settoken(data.token)
        setshowlogin(false)
        navigate("/")
      }
      else{
        toast.error(data.message)
      }
     
    } catch (error) {
    toast.error("Error registering user:", error.response?.data || error.message);
      // Show error message to user
    }


}
const [formdatalogin,setformdatalogin] = useState({
    
    email:"",
    password:"",

})

const onsubmithandlerlogin = async(e)=>{
    e.preventDefault()
    try{
      const {data} = await axios.post("/api/user/login",formdatalogin)
    
      if(data.success){
        localStorage.setItem("token",data.token)
        settoken(data.token)
        setshowlogin(false)
        navigate("/")
      }else{
        toast.error(data.message)
      }
    }
    catch(error){
         toast.error("Error registering user:", error.response?.data || error.message);
    }
}
const onchangelogin = (e)=>{
    const {name,value} = e.target
    setformdatalogin((prev)=>({...prev,[name]:value}))
}
 return registration =="register" ? (
    <div>
      <section class=" bg-blue">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
       
 
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-blue-200 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Sign up to your account
              </h1>
              <form onSubmit={onsubmithandlerregister} class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Your Username</label>
                      <input onChange={(e)=>onchange(e)} type="text" required={true} value={formdata.name} name="name" id="name" class=" border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="akash roy....." />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input onChange={(e)=>onchange(e)} type="email" required={true} value={formdata.email} name="email" id="email" class=" border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" onChange={((e)=>onchange(e))} required={true} value={formdata.password} name="password" id="password" placeholder="••••••••" class=" border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-black">Remember me</label>
                          </div>
                      </div>
                      <a href="/login" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full  font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer outline-none">Sign up</button>
                  <p class="text-sm font-light text-gray-500 dark:text-black">
                      Don’t have an account yet? <Link href="/login" onClick={()=>setregistration("login")} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  ) :  (
    <div>
      <section class=" bg-blue">
  <div class="flex flex-col items-center  justify-center px-6 py-8 mx-auto h-screen lg:py-0">
       
 
      <div class="w-full bg-blue-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form onSubmit={onsubmithandlerlogin} class="space-y-4 md:space-y-6" action="#">
                  
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input onChange={(e)=>onchangelogin(e)} type="email" required={true} value={formdatalogin.email} name="email" id="email" class=" border border-gray-300 outline-none text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" onChange={((e)=>onchangelogin(e))} required={true} value={formdatalogin.password} name="password" id="password" placeholder="••••••••" class=" border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-black">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit"  class="w-full cursor-pointer text-black   bg-primary-600  font-medium rounded-lg outline-none text-sm px-5 py-2.5 text-center ">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-black">
                     Have an account ?  <Link href="/login"  onClick={()=>setregistration("register")}  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p> 
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  ) 
}

export default Login
