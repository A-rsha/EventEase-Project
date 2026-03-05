import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './layouts/DashboardLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateEvent from './pages/Admin/CreateEvent'
import ManageEvents from './pages/Admin/ManageEvents'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Payments from './pages/Payments'
import Bookings from './pages/Admin/Bookings'
import Ticket from './pages/Ticket'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>}/>
                  <Route path='/events' element={<Events />} />
                  <Route path='/events/:id' element={<EventDetails/>}/>
                  <Route path='/payments/:id' element={<Payments/>}/>
                  <Route path='/ticket/:id' element={<Ticket/>}/>
                  <Route path='/about' element={<About/>}/>
          
       </Route>

        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
       


        <Route path='/admin' element={<DashboardLayout />}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='create-Event' element={<CreateEvent />} />
          <Route path='manage-events' element={<ManageEvents />} />
          <Route path='bookings' element={<Bookings/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App