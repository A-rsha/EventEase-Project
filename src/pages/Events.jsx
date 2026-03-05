import React, { useEffect, useState } from "react";
import API from "../services/axios";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/getEvents");
      setEvents(res.data.data || []);
    } catch (error) {
      console.error("Error fetching Events", error);
    }
  };

  useEffect(() => {
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
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {events.length === 0 ? (
        <p className="text-white text-center text-lg">No events found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {events.map((event) => {
            const dateObj = new Date(event.date);
            const formattedDate = dateObj.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            const formattedTime = formatTime(event.time);

            return (
              <div
                key={event._id}
                className="group relative flex flex-col h-full max-w-sm mx-auto 
                           bg-white/20 backdrop-blur-lg rounded-2xl overflow-hidden 
                           shadow-lg transition-all duration-300 
                           hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]"
              >
                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full z-10">
                  {event.category}
                </span>

                {event.image && (
                  <img src={`https://eventease-backend-3-py1w.onrender.com/${event.image}`}
                    alt={event.title}
                    className="w-full h-44 object-cover transition duration-500 group-hover:scale-110"
                  />
                )}

                <div className="flex flex-col grow p-5 text-white space-y-3">
                  <h3 className="text-lg font-bold tracking-wide">{event.title}</h3>

                  <p className="text-sm text-gray-200 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="text-sm space-y-1 text-gray-100">
                    <p>📅 {formattedDate} • {formattedTime}</p>
                    <p>📍 {event.venue}</p>
                  </div>

                  <p className="text-lg font-semibold text-pink-300 pt-2">
                    ₹{event.price}
                  </p>

                  <button
                    className="mt-auto w-full py-3 rounded-xl font-semibold 
                               bg-linear-to-r from-purple-600 to-pink-500 
                               hover:from-pink-500 hover:to-purple-600 
                               transition duration-300"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Events;