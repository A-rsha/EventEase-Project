import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/axios';


function EventDetails() {
  const navigate =useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null)
  const [quantity, setQunatity] = useState(1);

  const fetchEvent = async () => {
    try {
      const res = await API.get(`/events/getEvent/${id}`);
      setEvent(res.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleBooking =async()=>{
    try {
      const res =await API.post('/bookings/createBooking',{
        eventId:event._id,
        numberOfSeats:quantity,
      });

   
      navigate(`/payments/${res.data.data._id}`)
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  }


  useEffect(() => {
    fetchEvent()
  }, [id]);
  if (!event) return <p>Loading....</p>

  return (
    <div className="min-h-screen bg-linear-to-br p-6">
      <div className="max-w-10xl mx-auto">

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-8">

          {event.image && (
            <div className="relative">
                 <img src={`https://eventease-backend-3-py1w.onrender.com/${event.image}`}
                alt={event.title}
                className="w-full h-full object-cover  transition duration-500 group-hover:scale-110"
              />
              <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-4 py-1 rounded-full shadow-md">
                {event.category}
              </span>
            </div>
          )}

          <div className="p-8 text-white flex flex-col justify-between">

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-pink-300">
                {event.title}
              </h2>

              <p className="text-gray-300">
                {event.description}
              </p>

              <p className="text-gray-300">
                📅 {new Date(event.date).toLocaleDateString()} | {event.time}
              </p>

              <p className="text-gray-300">
                📍 {event.venue}
              </p>

              <div className="mt-4">
                <p className="text-sm text-gray-300">
                  Seats Left: {event.availableSeats} / {event.totalSeats}
                </p>

                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{
                      width: `${(event.availableSeats / event.totalSeats) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <p className="text-2xl font-bold text-pink-400 mt-4">
                ₹{event.price}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => quantity > 1 && setQunatity(quantity - 1)}
                className="px-3 py-1 bg-gray-700 rounded"
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  quantity < event.availableSeats && setQunatity(quantity + 1)
                }
                className="px-3 py-1 bg-gray-700 rounded"
              >
                +
              </button>
            </div>

            <p className="mt-2 text-pink-300">
              Total: ₹{quantity * event.price}
            </p>


            <button
              className="mt-8 w-full py-3 rounded-xl font-semibold 
                       bg-linear-to-r from-purple-600 to-pink-500 
                       hover:from-pink-500 hover:to-purple-600 
                       transition duration-300 shadow-lg"
             onClick={handleBooking}>
              Book Now
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default EventDetails