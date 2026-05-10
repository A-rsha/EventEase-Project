import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../services/axios";
import { cancelBooking } from "../services/api";

function Navbar() {

  const [open, setOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [events, setEvents] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [payments, setPayments] = useState([]);

  const [activeTab, setActiveTab] = useState("bookings");

  const location = useLocation();

  useEffect(() => {

    const fetchData = async () => {

      try {

        const userRes = await API.get("/auth/profile");

        setUser(userRes.data);

        const role = userRes.data.role;

        if (role === "user") {

          const bookingRes = await API.get("/bookings/myBookings");

          setBookings(bookingRes.data.data || []);

          const paymentRes = await API.get("/payments/getMyPayments");

          setPayments(paymentRes.data.data || []);

        }

        const eventRes = await API.get("/events/getEvents");

        setEvents(eventRes.data.data || []);

      } catch (error) {

        console.log("Profile sidebar error:", error);

      }
    };

    fetchData();

  }, []);

  const handleCancelBooking = async (id) => {

    try {

      await cancelBooking(id);

      const bookingRes = await API.get("/bookings/myBookings");

      setBookings(bookingRes.data.data || []);

      alert("Booking cancelled successfully");

    } catch (error) {

      console.log(error);

    }
  };

  const initials = user?.name
    ? user.name.substring(0, 2).toUpperCase()
    : "";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav
        className="
        fixed
        top-0
        left-0
        w-full
        z-50
        backdrop-blur-xl
        bg-white/80
        border-b
        border-gray-200
        "
      >

        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="
            text-2xl
            md:text-3xl
            font-black
            tracking-tight
            text-black
            "
          >
            EventEase
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                to={link.path}
                style={{ textDecoration: "none" }}
                className={`
                relative
                text-sm
                font-semibold
                transition-all
                duration-300

                ${
                  location.pathname === link.path
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }
                `}
              >

                {link.name}

              </Link>
            ))}

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {user ? (

              <div
                onClick={() => setProfileOpen(true)}
                className="
                w-11
                h-11
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                font-bold
                cursor-pointer
                hover:scale-105
                transition
                "
              >
                {initials}
              </div>

            ) : (

              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                className="
                w-11
                h-11
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
                text-black
                hover:bg-black
                hover:text-white
                transition
                "
              >

                <FaUser />

              </Link>

            )}

            {/* BUTTON */}
            <Link
              to="/events"
              style={{ textDecoration: "none" }}
              className="
              hidden
              md:flex
              items-center
              justify-center
              bg-black
              text-white
              px-5
              py-3
              rounded-xl
              text-sm
              font-semibold
              hover:bg-gray-800
              transition
              "
            >
              Explore Events
            </Link>

            {/* MOBILE ICON */}
            <div className="md:hidden">

              {open ? (

                <MdClose
                  className="text-3xl cursor-pointer"
                  onClick={() => setOpen(false)}
                />

              ) : (

                <MdMenu
                  className="text-3xl cursor-pointer"
                  onClick={() => setOpen(true)}
                />

              )}

            </div>

          </div>

        </div>

        {/* MOBILE MENU */}
        {open && (

          <div
            className="
            md:hidden
            bg-white
            border-t
            border-gray-200
            px-6
            py-6
            space-y-5
            shadow-xl
            "
          >

            {navLinks.map((link) => (

              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                style={{ textDecoration: "none" }}
                className="
                block
                text-black
                font-semibold
                text-lg
                "
              >
                {link.name}
              </Link>

            ))}

            <Link
              to="/events"
              style={{ textDecoration: "none" }}
              className="
              block
              bg-black
              text-white
              text-center
              py-3
              rounded-xl
              font-medium
              "
            >
              Explore Events
            </Link>

          </div>

        )}

      </nav>

      {/* PROFILE DRAWER */}
      {profileOpen && (

        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">

          <div className="w-full sm:w-[420px] h-full bg-white shadow-2xl overflow-y-auto">

            {/* TOP */}
            <div className="p-6 border-b flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  My Profile
                </h2>

                <p className="text-sm text-gray-500">
                  Manage your account
                </p>

              </div>

              <button
                onClick={() => setProfileOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>

            </div>

            {/* USER */}
            <div className="p-6 text-center">

              <div className="w-24 h-24 mx-auto rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
                {initials}
              </div>

              <h3 className="mt-4 text-xl font-bold">
                {user?.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {user?.email}
              </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 px-6">

              <div className="bg-gray-100 rounded-2xl p-4 text-center">

                <h3 className="text-2xl font-bold">
                  {bookings.length}
                </h3>

                <p className="text-sm text-gray-500">
                  Bookings
                </p>

              </div>

              <div className="bg-gray-100 rounded-2xl p-4 text-center">

                <h3 className="text-2xl font-bold">
                  {events.length}
                </h3>

                <p className="text-sm text-gray-500">
                  Events
                </p>

              </div>

              <div className="bg-gray-100 rounded-2xl p-4 text-center">

                <h3 className="text-2xl font-bold">
                  {payments.length}
                </h3>

                <p className="text-sm text-gray-500">
                  Payments
                </p>

              </div>

            </div>

            {/* TABS */}
            <div className="flex gap-3 px-6 mt-8 overflow-x-auto">

              {["bookings", "payments", "events"].map((tab) => (

                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                  px-4
                  py-2
                  rounded-xl
                  capitalize
                  font-medium
                  whitespace-nowrap
                  transition

                  ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black"
                  }
                  `}
                >

                  {tab}

                </button>

              ))}

            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-4">

              {activeTab === "bookings" &&
                bookings.map((booking) => (

                  <div
                    key={booking._id}
                    className="bg-gray-100 rounded-2xl p-4"
                  >

                    <h3 className="font-bold text-lg">
                      {booking.event?.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2">
                      Seats: {booking.numberOfSeats}
                    </p>

                    <p className="text-sm text-gray-600">
                      Amount: ₹{booking.totalAmount}
                    </p>

                    <p className="text-sm text-gray-600">
                      Status: {booking.bookingStatus}
                    </p>

                    {booking.bookingStatus === "confirmed" && (

                      <button
                        onClick={() =>
                          handleCancelBooking(booking._id)
                        }
                        className="
                        mt-4
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        text-sm
                        "
                      >
                        Cancel Booking
                      </button>

                    )}

                  </div>

                ))}

              {activeTab === "payments" &&
                payments.map((payment) => (

                  <div
                    key={payment._id}
                    className="bg-gray-100 rounded-2xl p-4"
                  >

                    <h3 className="font-bold">
                      ₹ {payment.amount}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {payment.paymentMethod}
                    </p>

                    <p className="text-sm mt-2">
                      {payment.paymentStatus}
                    </p>

                  </div>

                ))}

              {activeTab === "events" &&
                events.map((event) => (

                  <div
                    key={event._id}
                    className="bg-gray-100 rounded-2xl p-4"
                  >

                    <h3 className="font-bold">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(event.date).toLocaleDateString()}
                    </p>

                  </div>

                ))}

            </div>

            {/* LOGOUT */}
            <div className="p-6">

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  window.location.href = "/login";
                }}
                className="
                w-full
                bg-black
                text-white
                py-3
                rounded-2xl
                font-semibold
                hover:bg-gray-800
                transition
                "
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  );
}

export default Navbar;