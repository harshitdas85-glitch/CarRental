import React, { useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { CarContext } from '../Context/CarContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const ManageBooking = () => {
  const {ownercars,fetchOwnerCars,expiredtoken,token} = useContext(CarContext)
  
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-600';
      case 'completed': return 'bg-blue-100 text-blue-600';
      case 'pending': return 'bg-gray-400 text-white';
      case 'cancelled': return 'bg-red-400 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
   const [statuses, setStatuses] = useState({});

  const handleChange = async(id, event) => {
    const newValue = event.target.value;
    setStatuses((prev) => ({
      ...prev,
      [id]: newValue,
    }));
saveStatus(id,newValue)
    // Call your save function here

};

const saveStatus = async (id, newValue) => {
 
   
    try {
      if(token){
        const {data} = await axios.post("/api/order/change-status",{bookingId:id,status:newValue})
        console.log(data)
        if(data.success){
            fetchOwnerCars()
        }else if(data.message=='jwt expired'){
          console.log("inner")
              expiredtoken()
            }
          }
        else{
          console.log("outer")
          toast.error("No Token Login Again")
         setTimeout(() => {
  window.location.href = "/login";
}, 1500);
        }
    } catch (error) {
        console.log(error)
    }
  };


  return (
    <div className="flex flex-col  w-full py-8 rounded-l-3xl md:rounded-l-none rounded-r-3xl px-5  min-h-screen bg-[var(--bgc)]  mt-10 ">
    
      <div className="mb-8  ">
        <h1 className="text-2xl font-bold text-slate-900">Manage Bookings</h1>
        <p className="text-slate-500 mt-1">
          Track all customer bookings, approve or cancel requests, and manage booking statuses
        </p>
      </div>

      {/* Table Container */}
      <div className="border overflow-x-auto border-slate-200 rounded-xl scroll-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 ">
              <th className="px-6 py-4 text-sm font-medium text-slate-500">Car</th>
              <th className="px-6 py-4 text-sm font-medium text-slate-500">Date Range</th>
              <th className="px-6 py-4 text-sm font-medium text-slate-500">Total</th>
              <th className="px-6 py-4 text-sm font-medium text-slate-500">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ownercars.map((item) => (
              <tr key={item.id} className=" transition-colors">
    
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.car.image} 
                      alt=""
                      className="w-12 h-10 object-cover rounded-lg shadow-sm"
                    />

                    <span className="font-medium text-slate-700">{item.car.model}</span>
                  </div>
                </td>
                
            
                <td className="px-6 py-5 text-slate-600 text-sm">
                
                  {new Date(item.pickupDate).toLocaleDateString("en-GB")}
                <span>-</span>
                  {new Date(item.returnDate).toLocaleDateString("en-GB")}
                
             

                </td>
                

                {/* Total */}
                <td className="px-6 py-5 text-slate-700 font-medium">
                  {item.price}
                </td>

                {/* Status Badge */}
                <td className="px-6 py-5">
                  <span className={`px-3 py-1.5 rounded-full text-xs  font-semibold ${getStatusStyles(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                {/* Action Dropdown */}
                <td className="px-6 py-5 text-right">
                  <button className="inline-flex items-center gap-2  border border-slate-200 rounded-lg text-sm text-slate-400 bg-white transition-all">
                    <select  className='w-full px-3 outline-none py-1'  
                      value={statuses[item._id] || item.status || "pending"}
            onChange={(e) => handleChange(item._id, e)}
                              >
                        <option value="confirmed">confirmed</option>
                        <option value="pending">pending</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                   
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default ManageBooking;