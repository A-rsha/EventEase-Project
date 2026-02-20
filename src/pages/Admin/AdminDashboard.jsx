import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaCalendarAlt, FaTicketAlt } from 'react-icons/fa'


function AdminDashboard() {
  const [events, setEvents] = useState([])
  const [bookings, SetBookings] = useState([])

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4003/api/events/getEvents"
      );
      setEvents(res.data.data);
      console.log("Events", res.data.data)
    } catch (error) {
      console.error('Error fetching Events', error)
    }
  }

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4003/api/bookings/AllBookings"
      );
      SetBookings(res.data.data);
      console.log("Bookings", res.data.data)
    } catch (error) {
      console.error('Error fetching Bookings', error)
    }
  }

  useEffect(() => {
    fetchEvents(),
      fetchBookings()
  }, [])
  return (
    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8 m-6'>

      <div className='card text-black rounded-lg shadow-md p-6'>
        <FaCalendarAlt className='text-purple-500 text-2xl' />
        <p className='text-sm suppercase text-black'>Total Events</p>
        <h1 className='text-4xl font-bold'>{events.length}</h1>
      </div>

      <div className='card text-black  rounded-lg shadow-md p-6  '>
        <FaTicketAlt className='text-purple-500 text-2xl' />
        <p className='text-sm uppercase text-black'>Total Bookings</p>
        <h1 className='text-4xl font-bold'>{bookings.length}</h1>
      </div>

      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center border-t">
            <td className="p-3">Tech Fest</td>
            <td>12 Feb 2026</td>
            <td>Kochi</td>
            <td className="text-green-600">Upcoming</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard