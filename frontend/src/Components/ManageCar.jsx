import React, { useContext } from 'react';
import { Eye, Trash2,EyeOff } from 'lucide-react';
import { CarContext } from '../Context/CarContext';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const ManageCars = () => {
    
    // Sample data based on your image
    const {ownercarsposted,token,fetchcars,expiredtoken,fetchOwnerCarsPosted} = useContext(CarContext)
    console.log(ownercarsposted)
    const [available,setavailable] = useState(true)
    const isAvailability = async(carId)=>{
        if(token){
            const {data} = await axios.post("/api/owner/toggle-car",{carId})
            if(data.success){
                setavailable(!available)
          fetchOwnerCarsPosted()
          fetchcars()
            }
            else if(data.message=='jwt expired'){
              expiredtoken()
            }
            else{
                toast.error("error toggling")
            }
        }
        else{
                toast.error("No Token Login Again")
               setTimeout(() => {
                    window.location.href = "/login";
                  }, 1500);
        }
    }
const deletecar = async(carId)=>{
    console.log("going inside")
       if(token){
        const {data} = await axios.post("/api/owner/delete-car",{carId})
        console.log(data)
        if(data.success){
             fetchOwnerCarsPosted()
             fetchcars()
        }  else if(data.message=='jwt expired'){
              expiredtoken()
            }
            else{
              toast.error("unable to fetch")
            }  
       }
        else{
                 toast.error("No Token Login Again")
                     setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
        }
    }

  return (
    <div className="flex min-h-screen rounded-r-3xl   mt-10 w-full  bg-[var(--bgc)] ">
      {/* SIDEBAR (Use the responsive Sidebar we built earlier) */}

      <main className="flex-1 p-6 rounded-r-3xl  w-full md:p-12">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 font-serif">Manage Cars</h1>
          <p className="text-gray-500 text-sm">View all listed cars, update their details, or remove them from the booking platform</p>
        </header>

        {/* TABLE CONTAINER */}
        <div className="bg-[var(--bgc)] rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase font-semibold">
                  <th className="px-6 py-4">Car</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ownercarsposted.map((item) => (
                  <tr key={item._id} className=" transition-colors">
                    {/* CAR INFO */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.model} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                        <div>
                          <p className="font-bold text-gray-700 text-sm">{item.brand} {item.model}</p>
                          <p className="text-[10px] text-gray-400 capitalize">{item.seats} seats • {item.transmission}</p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-4 text-sm text-gray-600">{item.type}</td>

                    {/* PRICE */}
                    <td className="px-6 py-4 font-bold text-gray-700 text-sm">${item.price}/day</td>

                    {/* STATUS */}
                    <td className="px-6 py-4  text-center">
                      <span className={`px-3 py-1 w-fit rounded-full text-[10px] font-bold ${
                        item.isAvailable === true 
                        ? "bg-green-300 text-green-800" 
                        : "bg-red-50 text-red-600"
                      }`}>
                        {item.isAvailable ? "Available" 
                        : "Not Available"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4 text-gray-400">
                        <button onClick={()=>isAvailability(item._id)} className="hover:text-blue-600 transition-colors">{item.isAvailable==true ? <Eye  size={18} /> : <EyeOff  size={18}/>}</button>
                        <button onClick={()=>deletecar(item._id)} className="hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageCars;