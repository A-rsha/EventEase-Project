import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/axios";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  FiCalendar,
  FiMapPin,
  FiCreditCard,
  FiDownload,
} from "react-icons/fi";

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
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  const downloadPDF = async () => {
    const element = document.getElementById("ticket-card");

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const width = 190;
    const height =
      (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, width, height);

    pdf.save("EventEase-Ticket.pdf");
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6]">
        <p className="text-gray-500 text-sm">
          Loading Ticket...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6] px-4 py-10 flex items-center justify-center">

      <div
        id="ticket-card"
        className="
        w-full
        max-w-sm
        bg-white
        rounded-[32px]
        border
        border-gray-200
        shadow-sm
        overflow-hidden
        "
      >

        {/* TOP */}
        <div className="px-6 pt-6 pb-5 border-b border-dashed border-gray-300">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                Event Ticket
              </p>

              <h1 className="text-2xl font-bold text-black leading-tight">
                {booking.event.title}
              </h1>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center text-lg font-bold">
              🎟
            </div>

          </div>

          <div className="mt-6 space-y-4">

            <div className="flex items-center gap-3 text-sm text-gray-600">

              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <FiCalendar />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Event Date
                </p>

                <p className="font-medium text-black">
                  {new Date(
                    booking.event.date
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">

              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <FiMapPin />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Venue
                </p>

                <p className="font-medium text-black">
                  {booking.event.venue}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* CENTER */}
        <div className="px-6 py-5">

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-[#f8f8f8] rounded-2xl p-4">

              <p className="text-xs text-gray-400 mb-1">
                Seats
              </p>

              <h3 className="text-xl font-bold text-black">
                {booking.numberOfSeats}
              </h3>

            </div>

            <div className="bg-[#f8f8f8] rounded-2xl p-4">

              <p className="text-xs text-gray-400 mb-1">
                Amount Paid
              </p>

              <h3 className="text-xl font-bold text-black">
                ₹{booking.totalAmount}
              </h3>

            </div>

          </div>

          {/* COUNTDOWN */}
          {timeLeft ? (
            <div className="mt-6">

              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                Event Starts In
              </p>

              <div className="grid grid-cols-3 gap-3">

                <div className="bg-black text-white rounded-2xl py-4 text-center">
                  <h3 className="text-xl font-bold">
                    {timeLeft.days}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Days
                  </p>
                </div>

                <div className="bg-black text-white rounded-2xl py-4 text-center">
                  <h3 className="text-xl font-bold">
                    {timeLeft.hours}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Hours
                  </p>
                </div>

                <div className="bg-black text-white rounded-2xl py-4 text-center">
                  <h3 className="text-xl font-bold">
                    {timeLeft.minutes}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Minutes
                  </p>
                </div>

              </div>

            </div>
          ) : (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-700 rounded-2xl py-4 text-center text-sm font-semibold">
              Event Started
            </div>
          )}

        </div>

        {/* BOTTOM */}
        <div className="px-6 pb-6 pt-2 border-t border-dashed border-gray-300">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-xs text-gray-400 mb-1">
                Booking ID
              </p>

              <p className="text-sm font-semibold text-black">
                #{booking._id.slice(0, 10)}
              </p>

            </div>

            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">

              <FiCreditCard />

              Paid

            </div>

          </div>

          <button
            onClick={downloadPDF}
            className="
            w-full
            bg-black
            hover:bg-gray-900
            text-white
            py-3
            rounded-2xl
            font-semibold
            transition
            flex
            items-center
            justify-center
            gap-2
            "
          >

            <FiDownload />

            Download Ticket

          </button>

        </div>

      </div>

    </div>
  );
}

export default Ticket;