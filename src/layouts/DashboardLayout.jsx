import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">

      {/* SIDEBAR */}
      <div className="hidden md:block w-72 fixed left-0 top-0 h-screen">
        <AdminSidebar />
      </div>

      {/* MOBILE SIDEBAR */}
      <div className="md:hidden">
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-72 p-4 md:p-8 overflow-x-hidden">
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;