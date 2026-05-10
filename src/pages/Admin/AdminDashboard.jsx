import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import API from "../../services/axios";

function AdminDashboard() {

  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
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

    <div className="min-h-screen bg-[#f6f6f6] p-4 md:p-6">

      {/* HEADING */}
      <div className="mb-6">

        <p className="text-sm text-gray-500">
          Welcome Back 👋
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-black mt-1">
          Dashboard
        </h1>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* EVENTS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

          <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center text-lg mb-4">
            <FaCalendarAlt />
          </div>

          <p className="text-sm text-gray-500">
            Total Events
          </p>

          <h2 className="text-3xl font-bold text-black mt-1">
            {events.length}
          </h2>

        </div>

        {/* BOOKINGS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

          <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center text-lg mb-4">
            <FaTicketAlt />
          </div>

          <p className="text-sm text-gray-500">
            Confirmed Bookings
          </p>

          <h2 className="text-3xl font-bold text-black mt-1">
            {
              bookings.filter(
                (b) => b.bookingStatus === "confirmed"
              ).length
            }
          </h2>

        </div>

        {/* REVENUE */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

          <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center text-lg mb-4">
            ₹
          </div>

          <p className="text-sm text-gray-500">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-black mt-1">
            ₹ {totalRevenue.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-black">
            Recent Bookings
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest booking activities
          </p>

        </div>

        <div className="space-y-3">

          {bookings
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
            )
            .slice(0, 5)
            .map((booking) => (

              <div
                key={booking._id}
                className="
                bg-[#fafafa]
                border
                border-gray-100
                rounded-2xl
                p-4
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-3
                "
              >

                {/* USER */}
                <div>

                  <h3 className="font-semibold text-black">
                    {booking.user?.name || "User"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {booking.event?.title}
                  </p>

                </div>

                {/* SEATS */}
                <div>

                  <p className="text-xs text-gray-400">
                    Seats
                  </p>

                  <h4 className="font-semibold text-black">
                    {booking.numberOfSeats}
                  </h4>

                </div>

                {/* AMOUNT */}
                <div>

                  <p className="text-xs text-gray-400">
                    Amount
                  </p>

                  <h4 className="font-semibold text-black">
                    ₹ {booking.totalAmount}
                  </h4>

                </div>

                {/* STATUS */}
                <span
                  className={`px-4 py-2 rounded-full text-xs font-semibold self-start md:self-auto
                  ${
                    booking.bookingStatus === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.bookingStatus === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }
                  `}
                >
                  {booking.bookingStatus}
                </span>

              </div>
            ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;