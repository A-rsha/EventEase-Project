import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/axios";

function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await API.get(`/events/getEvent/${id}`);
        setEvent(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    try {
      const res = await API.post("/bookings/createBooking", {
        eventId: event._id,
        numberOfSeats: quantity,
      });
      navigate(`/payments/${res.data.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };

  if (!event) return <p className="text-black text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white text-black shadow-2xl rounded-lg overflow-hidden">
        
        <div className="md:flex flex-col md:flex-row">
          {event.image && (
            <div className="md:w-1/2 h-64 md:h-auto">
              <img
src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-black px-2 py-1 text-xs rounded">
                {event.category}
              </span>
            </div>
          )}

          <div className="md:w-1/2 p-4 flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p className="text-black">{event.description}</p>
              <p className="text-black">
                📅 {new Date(event.date).toLocaleDateString()} | {formatTime(event.time)}
              </p>
              <p className="text-black">📍 {event.venue}</p>

              <div className="mt-2">
                <p>Seats Left: {event.availableSeats} / {event.totalSeats}</p>
                <div className="bg-black h-2 rounded mt-1">
                  <div
                    className="bg-black h-2 rounded"
                    style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-lg font-bold mt-2">Price: ₹{event.price}</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="bg-black text-white px-2 py-1 rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => quantity < event.availableSeats && setQuantity(quantity + 1)}
                className="bg-black text-white  px-2 py-1 rounded"
              >
                +
              </button>
            </div>

            <p>Total: ₹{quantity * event.price}</p>

            <button
              onClick={handleBooking}
              className="bg-black text-white w-full py-2 rounded mt-2"
            >
              Book Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventDetails;