import React from "react";
import { FiSearch, FiMapPin, FiGrid } from "react-icons/fi";
import FeautreSection from "../components/FeautreSection";

function Home() {
  return (
    <>
    <section className="pt-28 px-6 pb-20 overflow-x-auto">

      <div className="max-w-6xl mx-auto">

        
        <p className="text-fuchsia-800 italic text-lg">
          Find Your Next Excperience
        </p>

       
        <h1 className="text-4xl md:text-6xl font-bold text-fuchsia-600  leading-tight mt-4">
          Discover & Promote <br /> Upcoming Event
        </h1>

        
        <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/30 
        rounded-2xl p-5 flex flex-row items-center gap-6 w-200">

      
          <div className="flex items-center gap-2 flex-1">
            <FiSearch className="text-white text-lg" />
            <input
              type="text"
              placeholder="Search Event"
              className="bg-transparent outline-none text-white placeholder-white/70 w-full"
            />
          </div>

          <div className="h-6 w-px bg-white/30"></div>

         
          <div className="flex items-center gap-2 flex-1">
            <FiMapPin className="text-white text-lg" />
            <input
              type="text"
              placeholder="Search Location"
              className="bg-transparent outline-none text-white placeholder-white/70 w-full"
            />
          </div>

          <div className="h-6 w-px bg-white/30"></div>

          <div className="flex items-center gap-2 flex-1">
            <FiGrid className="text-white text-lg" />
            <select className="bg-transparent outline-none text-white w-full">
              <option className="text-black">Category</option>
            </select>
          </div>

          
          <button className="bg-purple-800 hover:bg-purple-900 text-white p-3 rounded-full transition">
            <FiSearch />
          </button>

        </div>

      </div>
      
    </section>
<FeautreSection/>
  </>
  
  );
}


export default Home;
