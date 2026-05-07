import React, { useEffect, useState } from "react";
import API from "../services/axios";
import { useNavigate } from "react-router-dom";

function FeatureSection({ searchText, location, category }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await API.get("/events/getEvents");
        setEvents(response.data.data || []);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    }
    fetchEvents();
  }, []);

  const now = new Date();

 
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);

    if (eventDate < now) return false;

    if (searchText && !event.title.toLowerCase().includes(searchText.toLowerCase()))
      return false;

    if (location && !event.venue.toLowerCase().includes(location.toLowerCase()))
      return false;

    if (category && event.category !== category) return false;

    return true;
  });
  

  function formatTime(time) {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  }

  return (
    <section className=" pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-black mt-6">
          Popular Events🔥
        </h1>
        <p className="text-black mb-6">6 Events Found</p>

        {upcomingEvents.length === 0 ? (
          <div className="text-center text-blackpy-16">
            <h2 className="text-xl font-semibold mb-2">Loading Events..</h2>
            <p className="text-black">Try changing your filters.</p>
          </div>
        ) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.slice(0,6).map((event) => {
              const eventDate = new Date(event.date);

              return (
                <div
                  key={event._id}
                  className="group min-w-70 md:min-w-0 lg:min-w-[320px] w-full bg-white shadow-2xl rounded-2xl  flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    {event.image && (
                  <img src={`https://eventease-backend-3-py1w.onrender.com/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    )}

                    <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 text-black">
                      {event.title}
                    </h3>

                    <div className="text-sm text-black mb-4 space-y-2">
                      <p>
                        📅 {eventDate.toLocaleDateString("en-IN")} • {formatTime(event.time)}
                      </p>
                      <p>📍 {event.venue}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <button
                        onClick={() => navigate(`/events/${event._id}`)}
                        className="w-full py-2.5 rounded font-semibold bg-black text-white transition duration-300"
                      >
                        Get Ticket
                      </button>
                      <span className="text-black font-semibold whitespace-nowrap">
                        ₹{event.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeatureSection;