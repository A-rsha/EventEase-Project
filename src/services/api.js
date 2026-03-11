import API from './axios'

export const register =(data)=>API.post('api/auth,data')
export const login=(data)=>API.post('api/auth,data')
export const updateStatus=(data)=>API.put(`/auth/updateStatus/${id}`,data)
export const getprofile=(data)=>API.get('/auth/profile')

export const postEvent=(data)=>
    API.post('/events/postEvent',data,{
      headers:{
        "Content-Type": "multipart/form-data",
      },
    })
export const getEvents=()=>
    API.get('/events/getEvents')
export const getEvent=(id,data)=>
    API.get(`/events/getEvent/${id}`,data)
export const deleteEvent = (id) =>
  API.delete(`/events/deleteEvent/${id}`);
export const updateEvent = (id, data) =>
  API.put(`/events/UpdateEvent/${id}`, data);

export const createBooking=(data)=>API.post('/bookings/createBooking',data)
export const getUserBooking=()=>API.get('/bookings/myBookings')
export const getAllBookings=()=>API.get('/bookings/getAllBookings')
export const getOneBooking=(id)=>API.get(`/bookings/getOneBooking/${id}`)
export const cancelBooking=(id)=>API.put(`/bookings/cancelBooking/${id}`)

export const createPayment=(data)=>API.post('/payments/createPayment',data)
export const getUserPayment=()=>API.get('/payments/getMyPayments')
export const getAllPayments=()=>API.get('/payments/getAllPayments')