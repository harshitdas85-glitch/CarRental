import React, { useContext, useState } from 'react';
import { LayoutDashboard, PlusCircle, Car, CalendarCheck, BookOpenCheck, Clock, CheckCircle, Menu, X } from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import { CarContext } from '../Context/CarContext';
const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const {user,setowner,ownercars,ownercarsposted,dashboardData} = useContext(CarContext)
console.log(ownercars)
  const stats = [
    { title: "Total Cars", count: dashboardData.totalCars, icon: <Car className="text-blue-600" />, bgColor: "bg-blue-50" },
    { title: "Total Bookings", count: dashboardData.totalBookings, icon: <BookOpenCheck className="text-blue-600" />, bgColor: "bg-blue-50" },
    { title: "Pending Bookings", count: dashboardData.pendingbooking , icon: <Clock className="text-blue-600" />, bgColor: "bg-blue-50" },
    { title: "Confirmed Bookings", count: dashboardData.completedbookings, icon: <CheckCircle className="text-blue-600" />, bgColor: "bg-blue-50" },
  ];

 

  return (
    <div className="flex w-full rounded-r-3xl  flex-col md:flex-row min-h-screen mt-10 bg-slate-50 font-sans">
      
      {/* MOBILE HEADER */}
     

      {/* SIDEBAR - Hidden on mobile unless toggled */}
    

      {/* OVERLAY for Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 rounded-r-3xl  bg-[var(--bgc)]  md:p-10">
        <header className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-xs md:text-sm max-w-xl">
            Monitor overall platform performance including total cars, bookings, and activities.
          </p>
        </header>

        {/* STATS CARDS - 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl  flex justify-between items-center shadow-lg">
              <div>
                <p className="text-gray-400 text-[10px] mb-1 uppercase font-semibold">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.count}</h3>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* RECENT BOOKINGS */}
          <section className="lg:col-span-2 bg-white p-5 md:p-6 rounded-xl  shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Recent Bookings</h3>
            <p className="text-gray-400 text-xs mb-6">Latest customer bookings</p>
            
            <div className="space-y-4">
              {dashboardData.recentBookings?.map((booking, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between pb-4   gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-500"><BookOpenCheck size={18}/></div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-700">{booking.car.model}</h4>
                      <p className="text-[10px] text-gray-400">{new Date (booking.pickupDate).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="font-bold text-gray-700 text-sm">{booking.price}</span>
                    <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${
                      booking.status === 'pending' ? 'bg-blue-50 text-red-600' : 
                      booking.status === 'confirmed' ? 'bg-gray-100 text-green-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MONTHLY REVENUE */}
          <section className="bg-white p-6 rounded-xl  shadow-xl flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Monthly Revenue</h3>
            <p className="text-gray-400 text-xs mb-8">Revenue for current month</p>
            <div className="flex-1 flex items-center justify-center py-6">
               <h2 className="text-4xl md:text-5xl font-black text-black">{dashboardData.MontlyRevenue}</h2>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Helper component for clean sidebar links
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
    active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'
  }`}>
    {icon} <span className="text-sm">{label}</span>
  </div>
);

export default AdminDashboard;