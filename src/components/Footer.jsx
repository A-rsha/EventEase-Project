import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 mt-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-14">

          {/* LOGO */}
          <div>
            <h1 className="text-3xl font-black mb-4">
              EventEase
            </h1>

            <p className="text-gray-400 leading-relaxed">
              Discover concerts, workshops, conferences and unforgettable experiences happening around you.
            </p>

            <div className="flex items-center gap-4 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition"
              >
                <FaGithub />
              </a>

            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link
                to="/"
                className="no-underline text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/events"
                className="no-underline text-gray-400 hover:text-white transition"
              >
                Events
              </Link>

              <Link
                to="/about"
                className="no-underline text-gray-400 hover:text-white transition"
              >
                About
              </Link>

            </div>
          </div>

          {/* EVENT TYPES */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Categories
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <p>Music Events</p>
              <p>Tech Conferences</p>
              <p>Workshops</p>
              <p>Food Festivals</p>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-4">
              Get updates about upcoming events and offers.
            </p>

            <div className="flex flex-col gap-3">

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none text-white placeholder-gray-500"
              />

              <button
                className="
                bg-gradient-to-r
                from-purple-600
                to-pink-500
                hover:from-purple-700
                hover:to-pink-600
                py-3
                rounded-xl
                font-semibold
                transition
                "
              >
                Subscribe
              </button>

            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-gray-500 text-sm">

          <p>
            © 2026 EventEase. All rights reserved.
          </p>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;