import React from 'react'
import Navbar from '../components/Navbar'

import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout({children}) {
  return (
    <div className='min-h-screen bg-fuchsia-950 text-white'>
      <Navbar/>
        <div className='grow max-w-7xl mx-auto w-full px-6 py-10'>
        {children}
        </div>
        <Outlet/>
        <Footer/>
        
    </div>
  )
}

export default MainLayout