import React, { useEffect, useState, useMemo } from "react";
import API from "../services/axios";
import { useNavigate } from "react-router-dom";

function FeatureSection({ searchText, location, category }) {
  const navigate = useNavigate();

  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [now, setNow] = useState(new Date());

  // Timer to update countdowns every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch all events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events/getEvents");

        // Sort events by date
        const sortedEvents = res.data.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setAllEvents(sortedEvents);
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  // Filtering based on search/location/category
  useEffect(() => {
    let filtered = [...allEvents];
    if (searchText) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (location) {
      filtered = filtered.filter((event) =>
        event.venue.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((event) => event.category === category);
    }
    setEvents(filtered);
  }, [searchText, location, category, allEvents]);

  // Count events per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    allEvents.forEach((event) => {
      counts[event.category] = (counts[event.category] || 0) + 1;
    });
    return counts;
  }, [allEvents]);

  // Highlight search text in event titles
  const highlightText = (text) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Countdown for upcoming events
  const getCountdown = (eventDate) => {
    const diff = new Date(eventDate) - now;
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Format time exactly like ManageEvents (from backend time field)
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <section className="pt-2 pb-16 px-4 md:px-8 -mt-55">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Upcoming Events
          </h1>
          <p className="text-gray-200">{events.length} Events Found</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center text-white py-16">
            <h2 className="text-xl font-semibold mb-2">No events found 😔</h2>
            <p className="text-gray-300">Try changing your filters.</p>
          </div>
        ) : (
          <div className="flex md:grid md:grid-cols-2 lg:flex gap-6 overflow-x-auto md:overflow-visible pb-4">
            {events.map((event) => {
              const dateObj = new Date(event.date);
              const formattedDate = dateObj.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              const formattedTime = formatTime(event.time); // <-- Correct time

              const isExpired = dateObj < now;
              const countdown = getCountdown(event.date);

              return (
                <div
                  key={event._id}
                  className={`group min-w-70 md:min-w-0 lg:min-w-[320px] w-full bg-fuchsia-300 rounded-2xl overflow-hidden shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col ${
                    isExpired ? "opacity-70" : ""
                  }`}
                >
                  <div className="relative h-52 overflow-hidden">
                    {event.image && (
                      <img
                        src={`http://localhost:4003/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    )}

                    <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                      {event.category} ({categoryCounts[event.category]})
                    </span>

                    {isExpired && (
                      <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Sold Out
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
                      {highlightText(event.title)}
                    </h3>

                    <div className="text-sm text-gray-600 mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p>
                          📅 {formattedDate} • {formattedTime}
                        </p>

                        {!isExpired && countdown && (
                          <span className="bg-fuchsia-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                            ⏳ {countdown}
                          </span>
                        )}
                      </div>

                      <p>📍 {event.venue}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <button
                        disabled={isExpired}
                        onClick={() =>
                          !isExpired && navigate(`/events/${event._id}`)
                        }
                        className={`w-full py-2.5 rounded-xl font-semibold transition duration-300 text-white ${
                          isExpired
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-linear-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600"
                        }`}
                      >
                        {isExpired ? "Sold Out" : "Get Ticket"}
                      </button>

                      <span className="text-pink-600 font-semibold whitespace-nowrap">
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