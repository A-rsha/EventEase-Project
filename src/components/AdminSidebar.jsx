import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Over View", path: "/admin/dashboard" },
    { name: "Create Events", path: "/admin/create-Event" },
    { name: "Manage Events", path: "/admin/manage-events" },
    {name: "All Bookings" ,path:"/admin/bookings"},
    {name: "All Users" ,path:"/admin/Users"}
  ];

  return (
    <div className="w-full md:w-64 bg-pink-100 text-white p-6 ">
      <h2 className="text-2xl font-bold mb-10 text-black">
        EventEase Admin
      </h2>

      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-3 rounded-lg transition-all duration-200 no-underline! text-black ${
                location.pathname === item.path
                  ? "bg-fuchsia-950 text-white"
                  : "hover:bg-fuchsia-200"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-purple-700 pt-6">
        <Link
          to="/"
          className="text-black no-underline! block px-14 py-3 rounded-lg hover:bg-fuchsia-950 transition "
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;