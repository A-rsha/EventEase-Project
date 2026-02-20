import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout({children}) {
  return (
    <div className='min-h-screen bg-linear-to-br from-purple-6900 via-pink-900 to-purple-300 text-white'>
      <Navbar/>
        <div className='grow max-w-7xl mx-auto w-full px-6 py-10'>
        {children}
        </div>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default MainLayout