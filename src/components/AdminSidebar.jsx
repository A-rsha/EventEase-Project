import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FaThLarge,
  FaCalendarPlus,
  FaRegCalendarAlt,
  FaTicketAlt,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";

function AdminSidebar() {

  const location = useLocation();

  const menuItems = [
    {
      name: "Overview",
      path: "/admin/dashboard",
      icon: <FaThLarge />,
    },

    {
      name: "Create Event",
      path: "/admin/create-Event",
      icon: <FaCalendarPlus />,
    },

    {
      name: "Manage Events",
      path: "/admin/manage-events",
      icon: <FaRegCalendarAlt />,
    },

    {
      name: "All Bookings",
      path: "/admin/bookings",
      icon: <FaTicketAlt />,
    },

    {
      name: "All Users",
      path: "/admin/Users",
      icon: <FaUsers />,
    },
  ];

  return (
    <div
      className="
      h-screen
      bg-black
      text-white
      px-5
      py-6
      flex
      flex-col
      border-r
      border-white/10
      "
    >

      {/* LOGO */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold tracking-tight text-white">
          EventEase
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Admin Dashboard
        </p>

      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-sm
              font-medium
              transition-all
              duration-200
              no-underline

              ${
                location.pathname === item.path
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }
            `}
            style={{ textDecoration: "none" }}
          >

            <span className="text-base">
              {item.icon}
            </span>

            <span className="no-underline">
              {item.name}
            </span>

          </Link>
        ))}

      </div>

      {/* BOTTOM */}
      <div className="mt-auto pt-8">

        <Link
          to="/"
          className="
          flex
          items-center
          justify-center
          gap-2
          bg-white
          text-black
          py-3
          rounded-xl
          font-medium
          hover:bg-gray-200
          transition
          no-underline
          "
          style={{ textDecoration: "none" }}
        >

          <FaArrowLeft />

          Back to Home

        </Link>

      </div>

    </div>
  );
}

export default AdminSidebar;