import React, { useEffect, useState } from "react";
import API from "../../services/axios";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await API.get("/bookings/getAllBookings");
         setBookings(res.data.data);
               
            }catch(error){
                console.log("Booking error:",error)
            }
        };
           const fetchPayments=async()=>{
            try {
                const res=await API.get("/payments/getAllPayments");
                setPayments(res.data.data);
            } catch (error) {
                console.log("Payment error:",error)
            }
           }
        fetchBookings();
        fetchPayments();
    }, []);


    const getPaymentDetails = (bookingId) => {
        const payment = payments.find(
            (pay) => pay.bookingId?._id?.toString() === bookingId.toString()
        );

        return {
            method: payment?.paymentMethod || "N/A",
            status: payment?.paymentStatus || "Pending",
        };
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    All Bookings
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-600">

                        <thead className="bg-fuchsia-950 text-white uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Event</th>
                                <th className="px-6 py-3">Seats</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Booking Status</th>
                                <th className="px-6 py-3">Payment Method</th>
                                <th className="px-6 py-3">Payment Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {bookings.map((booking) => {
                                const payment = getPaymentDetails(booking._id);

                                return (
                                    <tr
                                        key={booking._id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {booking.user?.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {booking.user?.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            {booking.event?.title}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {booking.numberOfSeats}
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-fuchsia-950">
                                            ₹{booking.totalAmount}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "confirmed"
                                                        ? "bg-green-100 text-green-700"
                                                        : booking.bookingStatus === "confirmed"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {booking.bookingStatus}
                                            </span>
                                        </td>


                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                                {payment.method}
                                            </span>
                                        </td>


                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.status?.toLowerCase() === "success"
                                                        ? "bg-green-100 text-green-700"
                                                        : payment.status?.toLowerCase() === "failed"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
}

export default Bookings;