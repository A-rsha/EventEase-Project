import API from './axios'

export const getEvents=(data)=>API.post('/api/events,data')

export const getAllBookings=(data)=>API.post('/api/bookings,data')