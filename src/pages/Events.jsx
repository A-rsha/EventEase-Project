import React, { useEffect, useState } from "react";
import API from "../services/axios";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

function Events() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const res = await API.get("/events/getEvents");

        setEvents(res.data.data || []);

      } catch (error) {

        console.error("Error fetching events", error);

      }

    };

    fetchEvents();

  }, []);

  const formatTime = (timeString) => {

    if (!timeString) return "";

    const [hour, minute] = timeString.split(":");

    const hourNum = parseInt(hour);

    const ampm = hourNum >= 12 ? "PM" : "AM";

    const hour12 = hourNum % 12 || 12;

    return `${hour12}:${minute} ${ampm}`;

  };

  return (

    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}

        <div className="mb-14 text-center">

          <p className="text-sm uppercase tracking-[5px] text-gray-500 mb-4 font-medium">
            Find Your Experience
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Explore Events
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Discover concerts, workshops, conferences and unforgettable moments happening near you.
          </p>

        </div>

        {/* LOADING */}

        {events.length === 0 ? (

          <div className="flex items-center justify-center py-32">

            <div className="text-center">

              <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-5"></div>

              <h2 className="text-xl font-semibold text-black">
                Loading Events...
              </h2>

            </div>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {events.map((event) => {

              const eventDate = new Date(event.date);

              const formattedDate = eventDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              const formattedTime = formatTime(event.time);

              return (

                <div
                  key={event._id}
                  className="
                  group
                  bg-white
                  rounded-[28px]
                  overflow-hidden
                  border
                  border-gray-200
                  hover:border-black
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  flex
                  flex-col
                  "
                >

                  {/* IMAGE */}

                  <div className="relative overflow-hidden h-56">

                    {event.image ? (

                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                    ) : (

                      <div className="w-full h-full bg-gray-200"></div>

                    )}

                    {/* CATEGORY */}

                    <span className="absolute top-4 left-4 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                      {event.category}
                    </span>

                  </div>

                  {/* CONTENT */}

                  <div className="p-6 flex flex-col grow">

                    <h2 className="text-2xl font-bold text-black line-clamp-1">
                      {event.title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed mt-3 line-clamp-2">
                      {event.description}
                    </p>

                    {/* DETAILS */}

                    <div className="space-y-4 mt-6">

                      <div className="flex items-center gap-3 text-sm text-gray-700">

                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                          <FiCalendar />
                        </div>

                        <span>{formattedDate}</span>

                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-700">

                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                          <FiClock />
                        </div>

                        <span>{formattedTime}</span>

                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-700">

                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                          <FiMapPin />
                        </div>

                        <span className="line-clamp-1">
                          {event.venue}
                        </span>

                      </div>

                    </div>

                    {/* FOOTER */}

                    <div className="mt-auto pt-8 flex items-center justify-between">

                      <div>

                        <p className="text-xs text-gray-500 mb-1">
                          Ticket Price
                        </p>

                        <h3 className="text-2xl font-bold text-black">
                          ₹{event.price}
                        </h3>

                      </div>

                      <button
                        onClick={() => navigate(`/events/${event._id}`)}
                        className="
                        flex
                        items-center
                        gap-2
                        bg-black
                        hover:bg-gray-900
                        text-white
                        px-5
                        py-3
                        rounded-2xl
                        font-medium
                        transition
                        "
                      >
                        View
                        <FiArrowRight />
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default Events;