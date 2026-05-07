import React, { useEffect, useState } from "react";
import API from "../services/axios";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events/getEvents");
        const now = new Date();

        const upcoming = (res.data.data || []).filter(
          (event) => new Date(event.date) >= now
        );

        setEvents(upcoming);
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
    <div className="p-4 max-w-6xl mx-auto min-h-screen ">

      {events.length === 0 ? (
        <p className="text-black text-center text-lg mt-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => {
            console.log("IMAGE URL:",event.image)
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
                className="bg-white  overflow-hidden shadow-2xl rounded-2xl flex flex-col"
              >
              
                <span className="bg-black text-white text-xs px-2 py-1 rounded absolute m-2">
                  {event.category}
                </span>

               
                {event.image && (
                  <img
                    src={`https://eventease-backend-3-py1w.onrender.com/${event.image}`}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                )}

               
                <div className="flex flex-col p-4 grow text-black space-y-2">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-black line-clamp-2">{event.description}</p>
                  <p className="text-sm text-black">📅 {formattedDate} • {formattedTime}</p>
                  <p className="text-sm text-black">📍 {event.venue}</p>
                  <p className="text-base font-bold mt-2">₹{event.price}</p>

                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="mt-auto bg-black py-2 rounded text-white font-medium  transition-colors"
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