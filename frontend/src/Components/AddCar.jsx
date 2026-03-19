import React, { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { useContext } from 'react';
import { CarContext } from '../Context/CarContext';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(null);

 const  {token} = useContext(CarContext)
  const [carData,setCarData] = useState({
    brand: "",
    model: "",
    description: "",
    price: 0,
    type: "",
    year: 0,
    seats: 0,
    fuel: "",
    transmission: "",
    location: ""
    
    
  })
 

  
  const onchangehandler = (e)=>{
    const {name,value} = e.target 
    setCarData((prev)=>(
      {
        ...prev,[name]:value
      }
    ))
    
  }
const onsubmithandler = async (e) => {
  e.preventDefault();
  try {
    if (!token) {
      toast.error("No Token Present");
      return;
    }

    const form = new FormData();
    form.append("image", image);

   
    form.append("carData", JSON.stringify(carData));

    const { data } = await axios.post(
      "/api/owner/add-car",
      form,
      
    );

    if (data.success) {
      toast.success("Successfully Added New Car");
      setCarData({
        brand: "",
        model: "",
        description: "",
        price: 0,
        type: "",
        year: 0,
        seats: 0,
        fuel: "",
        transmission: "",
        location: "",
      });
      setImage(null);
    } else {
      toast.error("Can't register new car");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};
  return (
    <div className="flex flex-col w-full rounded-r-3xl  md:flex-row min-h-screen mt-10 bg-[var(--bgc)] ">
    
   

     
      <main className="flex-1 p-6  ">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add New Car</h1>
          <p className="text-gray-500 text-sm">
            Fill in details to list a new car for booking, including pricing, availability, and car specifications.
          </p>
        </header>

        <form onSubmit={onsubmithandler} className=" space-y-6">
          {/* IMAGE UPLOAD AREA */}
          <div className="flex items-center gap-4">
            <label htmlFor='image' className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <UploadCloud className="text-gray-400" size={28} />
              <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Upload</span>
              <img src={image ? URL.createObjectURL(image) : null }  alt="" />
              <input  type="file" id='image'  className="hidden " onChange={(e) => setImage(e.target.files[0])} />
            </label>
            <p className="text-sm text-gray-400">Upload a picture of your car</p>
          </div>

          {/* ROW 1: BRAND & MODEL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup  onChange={(e)=>onchangehandler(e)} value={carData.brand} label="Brand" placeholder="e.g. BMW, Mercedes, Audi..." name="brand" />
            <InputGroup  onChange={(e)=>onchangehandler(e)} value={carData.model}  label="Model" placeholder="e.g. X5, E-Class, M4..." name="model" />
          </div>

          {/* ROW 2: YEAR, PRICE, CATEGORY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup  onChange={(e)=>onchangehandler(e)} value={carData.year}  label="Year" placeholder="2025" name="year" type="number" />
            <InputGroup  onChange={(e)=>onchangehandler(e)} value={carData.price}  label="Daily Price ($)" placeholder="100" name="price" type="number" />
            <InputGroup  onChange={(e)=>onchangehandler(e)} value={carData.type}  label="Category" placeholder="Sedan" name="type" />
          </div>

          {/* ROW 3: SPECS (Matches your filtering logic) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectGroup  onChange={(e)=>onchangehandler(e)} value={carData.transmission}  label="Transmission" name="transmission" options={["Automatic", "Manual"]} />
            <SelectGroup  onChange={(e)=>onchangehandler(e)} value={carData.fuel}  label="Fuel Type" name="fuel" options={["Petrol", "Diesel", "Electric", "Hybrid"]} />
            <InputGroup  onChange={(e)=>onchangehandler(e)} value={carData.seats}  label="Seating Capacity" placeholder="5" name="seats" type="number" />
          </div>

          {/* ROW 4: LOCATION */}
          <InputGroup  onChange={(e)=>onchangehandler(e)} value={carData.location}  label="Location" placeholder="e.g. San Francisco, CA" name="location" />

          {/* ROW 5: DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-600">Description</label>
            <textarea 
            onChange={(e)=>onchangehandler(e)}
              rows="4"
              name='description'
              placeholder="Describe your car, its condition, and any notable details..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button type='submit' className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-100">
            <CheckCircle2 size={18} />
            List Your Car
          </button>
        </form>
      </main>
    </div>
  );
};

// Reusable Input Component
const InputGroup = ({ label, placeholder,value, name, type = "text",onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold  text-gray-600">{label}</label>
    <input 
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500  text-sm placeholder:text-gray-700"
    />
  </div>
);

// Reusable Select Component
const SelectGroup = ({ label, name, value, options, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-gray-600">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);


export default Add;