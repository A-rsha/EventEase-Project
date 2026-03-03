import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import API from "../../services/axios";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);


  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/getEvents");
      setEvents(res.data.data || []);
    } catch (error) {
      console.error("Error fetching Events", error);
    }
  };


  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/getAllBookings");
      setBookings(res.data.data || []);
    } catch (error) {
      console.error("Error fetching Bookings", error);
    }
  };


  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments/getAllPayments");
      const allPayments = res.data.data || [];

      setPayments(allPayments);

      const revenue = allPayments
        .filter((p) => p.paymentStatus === "success")
        .reduce((acc, curr) => acc + curr.amount, 0);

      setTotalRevenue(revenue);
    } catch (error) {
      console.error("Error fetching Payments", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchBookings();
    fetchPayments();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 m-6">


      <div className="bg-white text-black rounded-2xl shadow-md p-6 hover:shadow-xl transition">
        <FaCalendarAlt className="text-purple-500 text-3xl mb-3" />
        <p className="text-sm uppercase text-gray-600">Total Events</p>
        <h1 className="text-4xl font-bold">{events.length}</h1>
      </div>


      <div className="bg-white text-black rounded-2xl shadow-md p-6 hover:shadow-xl transition">
        <FaTicketAlt className="text-purple-500 text-3xl mb-3" />
        <p className="text-sm uppercase text-gray-600">Total Bookings</p>
        <h1 className="text-4xl font-bold">
          {bookings.filter(b => b.bookingStatus === "confirmed").length}
        </h1>
      </div>


      <div className="bg-white text-black rounded-2xl shadow-md p-6 hover:shadow-xl transition">
        <div className="text-3xl mb-3 text-green-600">💰</div>
        <p className="text-sm uppercase text-gray-600">Total Revenue</p>
        <h1 className="text-4xl font-bold text-green-600">
          ₹ {totalRevenue.toLocaleString()}
        </h1>
      </div>


      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 mt-6">

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Bookings
        </h2>

        {bookings
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((booking) => (
            <div
              key={booking._id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <h4 className="font-semibold text-gray-800">
                  {booking.user?.name || "User"}
                </h4>
                <p className="text-sm text-gray-500">
                  {booking.event?.title}
                </p>
              </div>

              <div className="text-sm text-gray-600">
                Seats: {booking.numberOfSeats}
              </div>

              <div className="text-sm font-semibold text-gray-800">
                ₹ {booking.totalAmount}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.bookingStatus === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : booking.bookingStatus === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {booking.bookingStatus}
              </span>
            </div>
          ))}
      </div>

    </div>
  );
}

export default AdminDashboard;