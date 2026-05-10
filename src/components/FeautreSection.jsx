import React, { useEffect, useState } from "react";
import API from "../services/axios";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

function FeatureSection({ searchText, location, category }) {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {

    async function fetchEvents() {

      try {

        const response = await API.get("/events/getEvents");

        setEvents(response.data.data || []);

      } catch (error) {

        console.log("Error fetching events", error);

      }

    }

    fetchEvents();

  }, []);

  const filteredEvents = events.filter((event) => {

    if (
      searchText &&
      !event.title.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }

    if (
      location &&
      !event.venue.toLowerCase().includes(location.toLowerCase())
    ) {
      return false;
    }

    if (category && event.category !== category) {
      return false;
    }

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

    <section className="bg-[#f5f5f5] py-14 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}

        <div className="flex items-end justify-between mb-10">

          <div>

            <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
              Discover Events
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Popular This Week
            </h2>

          </div>

          <button
            onClick={() => navigate("/events")}
            className="
            hidden
            md:flex
            items-center
            gap-2
            text-sm
            font-medium
            text-black
            hover:gap-3
            transition-all
            "
          >
            View All
            <FiArrowRight />
          </button>

        </div>

        {/* EMPTY */}

        {filteredEvents.length === 0 ? (

          <div className="bg-white rounded-3xl p-14 text-center border border-gray-200">

            <h2 className="text-2xl font-bold text-black mb-3">
              No Events Found
            </h2>

            <p className="text-gray-500">
              Try searching with different keywords.
            </p>

          </div>

        ) : (

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            "
          >

            {filteredEvents.slice(0, 8).map((event) => {

              const eventDate = new Date(event.date);

              return (

                <div
                  key={event._id}
                  className="
                  group
                  bg-white
                  rounded-[26px]
                  overflow-hidden
                  border
                  border-gray-200
                  hover:border-black
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  "
                >

                  {/* IMAGE */}

                  <div className="relative h-52 overflow-hidden">

                    <img
                      src={event.image}
                      alt={event.title}
                      className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-500
                      "
                    />

                    {/* CATEGORY */}

                    <div className="absolute top-4 left-4">

                      <span
                        className="
                        bg-white
                        text-black
                        text-[11px]
                        font-semibold
                        px-3
                        py-1.5
                        rounded-full
                        shadow-sm
                        "
                      >
                        {event.category}
                      </span>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-5">

                    <h3
                      className="
                      text-lg
                      font-semibold
                      text-black
                      line-clamp-1
                      mb-2
                      "
                    >
                      {event.title}
                    </h3>

                    <p
                      className="
                      text-sm
                      text-gray-500
                      line-clamp-2
                      leading-relaxed
                      mb-5
                      "
                    >
                      {event.description}
                    </p>

                    {/* INFO */}

                    <div className="space-y-3 mb-5">

                      <div className="flex items-center gap-2 text-sm text-gray-600">

                        <FiCalendar className="text-black" />

                        <span>
                          {eventDate.toLocaleDateString("en-IN")} •{" "}
                          {formatTime(event.time)}
                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">

                        <FiMapPin className="text-black" />

                        <span className="line-clamp-1">
                          {event.venue}
                        </span>

                      </div>

                    </div>

                    {/* BOTTOM */}

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs text-gray-400 mb-1">
                          Starting From
                        </p>

                        <h4 className="text-xl font-bold text-black">
                          ₹{event.price}
                        </h4>

                      </div>

                      <button
                        onClick={() => navigate(`/events/${event._id}`)}
                        className="
                        bg-black
                        text-white
                        px-4
                        py-2.5
                        rounded-xl
                        text-sm
                        font-medium
                        hover:bg-gray-800
                        transition
                        "
                      >
                        Book Now
                      </button>

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