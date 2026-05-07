import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/axios';

function Payments() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await API.get(`/bookings/getOneBooking/${id}`);
        setBooking(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooking();
  }, [id]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      await API.post('/payments/createPayment', {
        bookingId: id,
        paymentMethod: selectedMethod,
      });

      const updated = await API.get(`/bookings/getOneBooking/${id}`);
      setBooking(updated.data.data);

      setShowModal(true);

      setTimeout(() => {
        navigate(`/ticket/${id}`);
      }, 2000);
    } catch (error) {
      alert(error.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return <p className="text-gray-700 text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-md p-6 text-gray-800 space-y-4">

        <p className="text-xl font-bold">{booking.event.title}</p>
        <p>📅 {new Date(booking.event.date).toLocaleDateString()} | {booking.event.time}</p>
        <p>📍 {booking.event.venue}</p>
        <p>🎟 Seats: {booking.numberOfSeats}</p>
        <p>💰 Total: ₹{booking.totalAmount}</p>

        <p className={`font-semibold ${
          booking.bookingStatus === "confirmed" ? "text-green-600" : "text-yellow-600"
        }`}>
          Status: {booking.bookingStatus}
        </p>

        <div className="space-y-3 mt-4">
          <p className="font-semibold">Select Payment Method</p>

          {["UPI", "Card", "NetBanking"].map((method) => (
            <div
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                selectedMethod === method ? "border-red-600 bg-purple-50" : "border-gray-400 hover:bg-gray-100"
              }`}
            >
              <span>{method}</span>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                selectedMethod === method ? "border-red-600" : "border-gray-400"
              }`}>
                {selectedMethod === method && <div className="w-2 h-2 bg-purredple-600 rounded-full"></div>}
              </div>
            </div>
          ))}

          <button
            className="w-full mt-3 py-2 rounded-md bg-black text-white font-medium  transition"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${booking.totalAmount}`}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow p-6 w-full max-w-sm text-center space-y-3 text-gray-800">
            <h2 className="text-xl font-bold text-green-600">✅ Payment Successful</h2>
            <p>{booking.event.title}</p>
            <p>🎟 Seats: {booking.numberOfSeats}</p>
            <p>💰 Amount Paid: ₹{booking.totalAmount}</p>
            <p className="font-semibold text-green-600">Status: {booking.bookingStatus}</p>
            <p className="text-sm text-gray-500">Redirecting to ticket...</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Payments;