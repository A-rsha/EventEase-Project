import React, { useState, useEffect } from "react";
import { FiSearch, FiMapPin, FiGrid } from "react-icons/fi";
import FeautreSection from "../components/FeautreSection";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";

function Home() {

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const res = await API.get("/events/getEvents");

        const events = res.data.data || [];

        const uniqueCategories = [...new Set(events.map(event => event.category))];

        setCategories(uniqueCategories);

      } catch (error) {

        console.log("Error fetching categories", error);

      }

    };

    fetchCategories();

  }, []);

  return (
    <>
      <section className="pt-28 px-6 pb-60 overflow-x-auto min-h-screen">

        <div className="max-w-7xl mx-auto">

          <p className="text-fuchsia-500 bold text-lg mb-4 tracking-wide">
            Find Your Next Experience
          </p>

          <h1 className="max-w-5xl text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-extrabold leading-[1.05] tracking-tight bg-linear-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
            Discover & Promote <br className="hidden md:block" /> Upcoming Events
          </h1>

          <div className="mt-12 bg-fuchsia-950 border border-white/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 w-full">


            <div className="flex items-center gap-2 flex-1">
              <FiSearch className="text-white text-lg" />
              <input
                type="text"
                placeholder="Search Event"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

            <div className="hidden md:block h-6 w-px bg-white/30"></div>


            <div className="flex items-center gap-2 flex-1">
              <FiMapPin className="text-white text-lg" />
              <input
                type="text"
                placeholder="Search Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              />
            </div>

            <div className="h-6 w-px bg-white/30"></div>


            <div className="flex items-center gap-2 flex-1">
              <FiGrid className="text-white text-lg" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent outline-none text-white w-full"
              >
                <option value="" className="text-black">All Categories</option>

                {categories.map((cat, index) => (
                  <option key={index} value={cat} className="text-black">
                    {cat}
                  </option>
                ))}

              </select>
            </div>

            <button
              className="bg-purple-800 hover:bg-purple-900 text-white p-3 rounded-xl md:rounded-full transition "
            >
              <FiSearch />
            </button>

          </div>
        </div>
      </section>

      <FeautreSection
        searchText={searchText}
        location={location}
        category={category}
      />
    </>
  );
}

export default Home;