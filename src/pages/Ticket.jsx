import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/axios";
import { QRCodeCanvas } from "qrcode.react";

function Ticket() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await API.get(`/bookings/getOneBooking/${id}`);
        setBooking(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTicket();
  }, [id]);

  
  useEffect(() => {
    if (!booking) return;

    const interval = setInterval(() => {
      const difference =
        new Date(booking.event.date) - new Date();

      if (difference <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  if (!booking)
    return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md text-center space-y-4">

        <h2 className="text-2xl font-bold text-pink-400">
          🎟 Event Ticket
        </h2>

        <p className="text-lg font-semibold">
          {booking.event.title}
        </p>

        <p>
          📅 {new Date(booking.event.date).toLocaleDateString()}
        </p>

        <p>📍 {booking.event.venue}</p>

        <p>🎟 Seats: {booking.numberOfSeats}</p>

        <p>💰 Paid: ₹{booking.totalAmount}</p>


        {timeLeft ? (
          <div className="flex justify-center gap-4 mt-4">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div
                key={unit}
                className="bg-white/10 p-3 rounded-xl text-center w-16"
              >
                <p className="text-lg font-bold text-yellow-400">
                  {timeLeft[unit]}
                </p>
                <p className="text-xs capitalize">{unit}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-red-400 font-semibold">
            🎉 Event Started
          </p>
        )}

       
        <div className="flex justify-center mt-4">
          <QRCodeCanvas value={booking._id} size={120} />
        </div>

        <p className="text-sm text-gray-300 mt-2">
          Booking ID: {booking._id}
        </p>

      </div>

    </div>
  );
}

export default Ticket;