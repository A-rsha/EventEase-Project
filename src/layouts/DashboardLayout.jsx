import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
function DashboardLayout() {
  return (
    <div className='flex min-h-screen bg-fuchsia-200'>
       
        <div className='w-64 bg-pink-100 shadow-md'>
           <AdminSidebar/>
        </div>
             
             <div className='flex-1 p-8'>
                <Outlet/>
             </div>

        </div>
  )
}

export default DashboardLayout