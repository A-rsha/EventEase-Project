import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/axios";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

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

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
        <p className="text-gray-600 text-lg">
          Loading Event...
        </p>
      </div>
    );

  return (

    <div className="min-h-screen bg-[#f6f6f6] pt-24 pb-14 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-[28px] overflow-hidden border border-gray-200 shadow-sm">

          {/* IMAGE */}

          <div className="relative h-[260px] md:h-[340px] overflow-hidden">

            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <span className="absolute top-5 left-5 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full">
              {event.category}
            </span>

            <div className="absolute bottom-6 left-6 text-white">

              <h1 className="text-3xl md:text-4xl font-bold">
                {event.title}
              </h1>

              <p className="text-sm text-gray-200 mt-2">
                {new Date(event.date).toLocaleDateString()} •{" "}
                {formatTime(event.time)}
              </p>

            </div>

          </div>

          {/* CONTENT */}

          <div className="p-6 md:p-8">

            {/* DETAILS */}

            <div className="grid md:grid-cols-3 gap-4">

              <div className="bg-[#f8f8f8] rounded-2xl p-4 border border-gray-100">

                <div className="flex items-center gap-3">

                  <FiCalendar className="text-lg text-black" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Date
                    </p>

                    <h3 className="font-semibold text-sm">
                      {new Date(event.date).toLocaleDateString()}
                    </h3>

                  </div>

                </div>

              </div>

              <div className="bg-[#f8f8f8] rounded-2xl p-4 border border-gray-100">

                <div className="flex items-center gap-3">

                  <FiClock className="text-lg text-black" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Time
                    </p>

                    <h3 className="font-semibold text-sm">
                      {formatTime(event.time)}
                    </h3>

                  </div>

                </div>

              </div>

              <div className="bg-[#f8f8f8] rounded-2xl p-4 border border-gray-100">

                <div className="flex items-center gap-3">

                  <FiMapPin className="text-lg text-black" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Venue
                    </p>

                    <h3 className="font-semibold text-sm line-clamp-1">
                      {event.venue}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-8">

              <h2 className="text-lg font-semibold text-black mb-3">
                About Event
              </h2>

              <p className="text-gray-600 leading-relaxed text-[15px]">
                {event.description}
              </p>

            </div>

            {/* BOOKING SECTION */}

            <div className="mt-10 bg-[#fafafa] border border-gray-200 rounded-3xl p-5">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* PRICE */}

                <div>

                  <p className="text-sm text-gray-500">
                    Ticket Price
                  </p>

                  <h2 className="text-3xl font-bold text-black mt-1">
                    ₹{event.price}
                  </h2>

                </div>

                {/* QUANTITY */}

                <div>

                  <p className="text-sm text-gray-500 mb-3">
                    Quantity
                  </p>

                  <div className="flex items-center gap-4">

                    <button
                      onClick={() =>
                        quantity > 1 && setQuantity(quantity - 1)
                      }
                      className="
                      w-10
                      h-10
                      rounded-xl
                      border
                      border-gray-300
                      flex
                      items-center
                      justify-center
                      hover:bg-black
                      hover:text-white
                      transition
                      "
                    >
                      <FiMinus />
                    </button>

                    <span className="text-xl font-bold w-8 text-center">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        quantity < event.availableSeats &&
                        setQuantity(quantity + 1)
                      }
                      className="
                      w-10
                      h-10
                      rounded-xl
                      border
                      border-gray-300
                      flex
                      items-center
                      justify-center
                      hover:bg-black
                      hover:text-white
                      transition
                      "
                    >
                      <FiPlus />
                    </button>

                  </div>

                </div>

              </div>

              {/* FOOTER */}

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                <div>

                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <h3 className="text-2xl font-bold text-black mt-1">
                    ₹{quantity * event.price}
                  </h3>

                </div>

                <button
                  onClick={handleBooking}
                  className="
                  bg-black
                  hover:bg-gray-900
                  text-white
                  px-8
                  py-3.5
                  rounded-2xl
                  font-semibold
                  transition
                  "
                >
                  Book Tickets
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EventDetails;