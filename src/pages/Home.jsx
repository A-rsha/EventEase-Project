import React, { useState, useEffect } from "react";
import { FiSearch, FiMapPin, FiGrid } from "react-icons/fi";
import FeatureSection from "../components/FeautreSection";
import API from "../services/axios";

function Home() {

  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const res = await API.get("/events/getEvents");

        const events = res.data.data || [];

        const uniqueCategories = [
          ...new Set(events.map((event) => event.category)),
        ];

        setCategories(uniqueCategories);

      } catch (error) {

        console.log("Error fetching categories", error);

      }

    };

    fetchCategories();

  }, []);

  return (
    <>
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

       
        <div className="absolute inset-0 bg-black/65"></div>

       
        <div className="relative z-10 w-full px-6">

          <div className="max-w-7xl mx-auto">

           
            <div className="max-w-3xl">

              <p className="text-white/80 tracking-[3px] uppercase text-sm mb-5">
                Discover Amazing Experiences
              </p>

              <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
                Find Events <br />
                That Match Your Vibe
              </h1>

              <p className="text-gray-300 mt-6 text-lg leading-8 max-w-2xl">
                Explore concerts, workshops, festivals, tech meetups and
                unforgettable experiences happening around you.
              </p>

            </div>

          
            <div className="mt-12 bg-white rounded-3xl shadow-2xl p-4 lg:p-5">

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

              
                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-4">

                  <FiSearch className="text-xl text-gray-500" />

                  <input
                    type="text"
                    placeholder="Search events"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  />

                </div>

               
                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-4">

                  <FiMapPin className="text-xl text-gray-500" />

                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  />

                </div>

               
                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-4">

                  <FiGrid className="text-xl text-gray-500" />

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full outline-none text-gray-700 bg-transparent"
                  >

                    <option value="">
                      All Categories
                    </option>

                    {categories.map((cat, index) => (

                      <option
                        key={index}
                        value={cat}
                      >
                        {cat}
                      </option>

                    ))}

                  </select>

                </div>

              
                <button
                  className="
                  bg-black
                  hover:bg-gray-900
                  text-white
                  rounded-2xl
                  font-semibold
                  transition
                  duration-300
                  py-4
                  "
                >
                  Search Events
                </button>

              </div>

            </div>

          
         

          </div>

        </div>

      </section>

    
      <div className="bg-[#f8f8f8]">
        <FeatureSection
          searchText={searchText}
          location={location}
          category={category}
        />
      </div>
    </>
  );
}

export default Home;