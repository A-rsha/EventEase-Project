import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiSmartphone,
  FiShield,
} from "react-icons/fi";
import API from "../services/axios";

function Payments() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [selectedMethod, setSelectedMethod] = useState("UPI");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {

    async function fetchBooking() {

      try {

        const res = await API.get(`/bookings/getOneBooking/${id}`);

        setBooking(res.data.data);

      } catch (error) {

        console.log(error);

      }
    }

    fetchBooking();

  }, [id]);

  const handlePayment = async () => {

    setLoading(true);

    try {

      await API.post("/payments/createPayment", {
        bookingId: id,
        paymentMethod: selectedMethod,
      });

      setSuccess(true);

      setTimeout(() => {

        navigate(`/ticket/${id}`);

      }, 1800);

    } catch (error) {

      alert(error.response?.data?.message || "Payment Failed");

    } finally {

      setLoading(false);

    }
  };

  const paymentMethods = [
    {
      name: "UPI",
      icon: <FiSmartphone />,
      desc: "Google Pay, PhonePe",
    },

    {
      name: "Card",
      icon: <FiCreditCard />,
      desc: "Visa & Mastercard",
    },

    {
      name: "NetBanking",
      icon: <FiShield />,
      desc: "All Indian banks",
    },
  ];

  if (!booking) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f5]">
        <p className="text-gray-500">Loading payment...</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#f4f4f5] py-16 px-4">

      <div className="max-w-4xl mx-auto">

        {/* TOP */}
        <button
          onClick={() => navigate(-1)}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            hover:text-black
            transition
            mb-5
          "
        >

          <FiArrowLeft />

          Back

        </button>

        {/* MAIN CARD */}
        <div
          className="
            bg-white
            rounded-[28px]
            border
            border-gray-200
            overflow-hidden
            grid
            lg:grid-cols-[1fr_350px]
          "
        >

          {/* LEFT */}
          <div className="p-6 md:p-8">

            <div className="mb-7">

              <p className="text-sm text-gray-500 mb-2">
                Payment
              </p>

              <h1 className="text-2xl font-bold text-black">
                Complete Your Booking
              </h1>

            </div>

            {/* METHODS */}
            <div className="space-y-3">

              {paymentMethods.map((method) => (

                <div
                  key={method.name}
                  onClick={() => setSelectedMethod(method.name)}
                  className={`
                    border
                    rounded-2xl
                    p-4
                    cursor-pointer
                    transition-all
                    duration-200

                    ${
                      selectedMethod === method.name
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-400"
                    }
                  `}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div
                        className={`
                          w-11
                          h-11
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-lg

                          ${
                            selectedMethod === method.name
                              ? "bg-white text-black"
                              : "bg-gray-100 text-black"
                          }
                        `}
                      >
                        {method.icon}
                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {method.name}
                        </h3>

                        <p
                          className={`
                            text-sm

                            ${
                              selectedMethod === method.name
                                ? "text-gray-300"
                                : "text-gray-500"
                            }
                          `}
                        >
                          {method.desc}
                        </p>

                      </div>

                    </div>

                    <div
                      className={`
                        w-5
                        h-5
                        rounded-full
                        border-2
                        flex
                        items-center
                        justify-center

                        ${
                          selectedMethod === method.name
                            ? "border-white"
                            : "border-gray-300"
                        }
                      `}
                    >

                      {selectedMethod === method.name && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* SECURITY */}
            <div
              className="
                mt-6
                bg-gray-100
                rounded-2xl
                p-4
                flex
                items-center
                gap-4
              "
            >

              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">

                <FiShield />

              </div>

              <div>

                <h3 className="font-semibold text-sm">
                  Secure Checkout
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Encrypted & protected payments.
                </p>

              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="
                w-full
                mt-7
                bg-black
                text-white
                py-4
                rounded-2xl
                font-semibold
                hover:opacity-90
                transition
                disabled:opacity-60
              "
            >
              {loading
                ? "Processing..."
                : `Pay ₹${booking.totalAmount}`}
            </button>

          </div>

          {/* RIGHT */}
          <div className="bg-[#fafafa] border-l border-gray-200 p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-sm text-gray-500">
                  Booking Summary
                </p>

                <h2 className="text-xl font-bold mt-1">
                  {booking.event.title}
                </h2>

              </div>

              <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                {booking.event.category}
              </span>

            </div>

            <div className="space-y-5 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>

                <span className="font-medium text-black">
                  {new Date(
                    booking.event.date
                  ).toLocaleDateString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Venue</span>

                <span className="font-medium text-black text-right">
                  {booking.event.venue}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Seats</span>

                <span className="font-medium text-black">
                  {booking.numberOfSeats}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>

                <span className="font-medium text-black">
                  {selectedMethod}
                </span>
              </div>

            </div>

            {/* TOTAL */}
            <div className="mt-8 border-t border-gray-200 pt-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <h1 className="text-3xl font-bold text-black mt-1">
                    ₹{booking.totalAmount}
                  </h1>

                </div>

                <div className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium">
                  Confirmed
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SUCCESS */}
      {success && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div
            className="
              bg-white
              rounded-[28px]
              w-full
              max-w-sm
              p-7
              text-center
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                mx-auto
                mb-5
              "
            >

              <FiCheck className="text-3xl" />

            </div>

            <h2 className="text-2xl font-bold text-black mb-2">
              Payment Successful
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed">
              Your ticket has been booked successfully.
            </p>

            <div className="bg-gray-100 rounded-2xl p-4 mt-6">

              <div className="flex justify-between mb-3">
                <span className="text-gray-500">
                  Event
                </span>

                <span className="font-medium">
                  {booking.event.title}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Paid
                </span>

                <span className="font-bold">
                  ₹{booking.totalAmount}
                </span>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Payments;