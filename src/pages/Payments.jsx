import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/axios'

function Payments() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [booking, setBooking] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState("UPI")
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

 
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await API.get(`/bookings/getOneBooking/${id}`)
        setBooking(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBooking()
  }, [id])


  const handlePayment = async () => {
    setLoading(true)
    try {
      await API.post('/payments/createPayment', {
        bookingId: id,
        paymentMethod: selectedMethod,
      })


      const updated = await API.get(`/bookings/getOneBooking/${id}`)
      setBooking(updated.data.data)

      setShowModal(true)

      setTimeout(() => {
        navigate(`/ticket/${id}`)
      }, 2000)

    } catch (error) {
      alert(error.response?.data?.message || "Payment failed")
    } finally {
      setLoading(false)
    }
  }

  if (!booking) return <p className="text-white text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">

      <div className="w-full max-w-md border bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white space-y-4">

        <p className="text-2xl font-bold text-pink-300">
          {booking.event.title}
        </p>

        <p>
          📅 {new Date(booking.event.date).toLocaleDateString()} | {booking.event.time}
        </p>

        <p className="text-gray-300">📍 {booking.event.venue}</p>
        <p className="text-gray-300">🎟 Seats: {booking.numberOfSeats}</p>
        <p className="text-gray-300">💰 Total: ₹{booking.totalAmount}</p>

        <p className={`font-semibold ${
          booking.bookingStatus === "confirmed"
            ? "text-green-400"
            : "text-yellow-400"
        }`}>
          Status: {booking.bookingStatus}
        </p>

        <div className="space-y-4 mt-4">
          <p className="text-lg font-semibold">Select Payment Method</p>

          {["UPI", "Card", "NetBanking"].map((method) => (
            <div
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                ${
                  selectedMethod === method
                    ? "border-pink-500 bg-pink-500/20"
                    : "border-gray-600 bg-white/5 hover:bg-white/10"
                }`}
            >
              <span className="font-medium">{method}</span>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${
                    selectedMethod === method
                      ? "border-pink-500"
                      : "border-gray-500"
                  }`}
              >
                {selectedMethod === method && (
                  <div className="w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}

          <button
            className="w-full mt-4 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${booking.totalAmount}`}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-pink-300 text-white p-8 rounded-3xl w-96 text-center space-y-4">

            <h2 className="text-2xl font-bold text-green-600">
              ✅ Payment Successful
            </h2>

            <p className="font-semibold text-lg">
              {booking.event.title}
            </p>

            <p>🎟 Seats: {booking.numberOfSeats}</p>
            <p>💰 Amount Paid: ₹{booking.totalAmount}</p>

            <p className="font-semibold text-green-600">
              Status: {booking.bookingStatus}
            </p>

            <p className="text-sm text-gray-500">
              Redirecting to home...
            </p>

          </div>
        </div>
      )}

    </div>
  )
}

export default Payments