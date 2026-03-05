import { Link } from "react-router-dom";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/auth/profile");
        setUser(userRes.data);

        const bookingRes = await API.get("/bookings/myBookings");
        setBookings(bookingRes.data.data || []);

        const paymentRes = await API.get("/payments/getMyPayments");
        setPayments(paymentRes.data.data || []);

        const eventRes = await API.get('/events/getEvents')
        setEvents(eventRes.data.data || []);


      } catch (error) {
        console.log("Profile sidebar error:", error);
      }
    };

    fetchData();
  }, []);

  const handleCancelBooking =async(id)=>{
    try {
     await cancelBooking(id);
     
     const bookingRes=await API.get("/bookings/myBookings");
     setBookings(bookingRes.data.data || []);
     alert("Booking cancelled successfully")
    } catch (error) {
      console.log("Cancel error:",error)
    }
  }

  const initials = user?.name
    ? user.name.substring(0, 2).toUpperCase()
    : "";

  return (
    <nav className="relative">


      <div className="flex justify-between items-center py-6 w-full fixed top-0 z-50 backdrop-blur-md px-6">

        <h1 className="text-4xl font-bold text-fuchsia-700 hover:text-pink-500">
          EventEase
        </h1>

        <div className="hidden md:flex items-center gap-6 font-semibold">
          <Link className="no-underline! text-white hover:text-pink-500!" to="/">HOME</Link>
          <Link className="no-underline! text-white hover:text-pink-500!" to="/events">EVENTS</Link>
          <Link className="no-underline!  text-white hover:text-pink-500!" to="/about">ABOUT</Link>
        </div>

        <div className="flex items-center gap-4">

          {user ? (
            <div
              onClick={() => setProfileOpen(true)}
              className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full cursor-pointer"
            >
              {initials}
            </div>
          ) : (
            <Link to="/login">
              <FaUser className="text-xl" />
            </Link>
          )}

          <Link
            to="/events"
            className="no-underline! bg-fuchsia-950 text-white px-3 py-2 rounded hover:bg-pink-500 transition"
          >
            BUY TICKET
          </Link>

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


      {open && (
        <div className="md:hidden absolute top-20 left-0 w-full  backdrop-blur-md py-6 shadow-lg z-50">
          <div className="  flex flex-col items-center gap-6 font-semibold">
            <Link className="no-underline! text-white hover:text-pink-400" onClick={() => setOpen(false)} to="/">HOME</Link>
            <Link className="no-underline! text-white hover:text-pink-400" onClick={() => setOpen(false)} to="/events">EVENTS</Link>
            <Link className="no-underline! text-white hover:text-pink-400" onClick={() => setOpen(false)} to="/about">ABOUT</Link>
          </div>
        </div>
      )}


      {user && profileOpen && (
        <div className="fixed top-0 right-0 h-full w-96 
     backdrop-blur-md border
        text-white shadow-2xl z-50 flex flex-col">

          <div className="p-4 flex justify-end">
            <button
              onClick={() => setProfileOpen(false)}
              className="text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="px-6 pb-6 overflow-y-auto flex-1">


            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                {initials}
              </div>

              <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-white/70">{user.email}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div className="bg-white/10 p-4 rounded-xl">
                <h3 className="text-2xl font-bold">{bookings.length}</h3>
                <p className="text-xs text-white/70">Bookings</p>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <h3 className="text-2xl font-bold">{events.length}</h3>
                <p className="text-xs text-white/70">Events</p>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <h3 className="text-2xl font-bold">{payments.length}</h3>
                <p className="text-xs text-white/70">Payments</p>
              </div>
            </div>


            <div className="mt-8 space-y-3">

              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full p-3 rounded-xl transition ${activeTab === "bookings"
                  ? "bg-purple-600"
                  : "bg-white/10 hover:bg-white/20"
                  }`}
              >
                My Bookings
              </button>

              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full p-3 rounded-xl transition ${activeTab === "payments"
                  ? "bg-purple-600"
                  : "bg-white/10 hover:bg-white/20"
                  }`}
              >
                Payments
              </button>

              <button
                onClick={() => setActiveTab("events")}
                className={`w-full p-3 rounded-xl transition ${activeTab === "events"
                  ? "bg-purple-600"
                  : "bg-white/10 hover:bg-white/20"
                  }`}
              >
                My Events
              </button>

            </div>

            <div className="mt-6 space-y-3">

              {activeTab === "bookings" &&
                bookings.map((booking) => (
                  <div key={booking._id} className="bg-white/10 p-3 rounded-xl">
                    <h4 className="font-semibold">
                      {booking.event?.title}
                    </h4>
                    <p className="text-xl text-white/70">
                      Seats Booked: {booking.numberOfSeats}
                    </p>

                    <p className="text-xl text-white/70">
                      Total Amount: ₹{booking.totalAmount}
                    </p>
                    <p className="text-xl text-white/70">
                      Status:{booking.bookingStatus}
                    </p>

                    {booking.bookingStatus === "confirmed" && (
                      <button
                      onClick={()=>handleCancelBooking(booking._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm mt-2">
                       cancel Booking
                      </button>
                    )}
                  </div>
                ))}

              {activeTab === "payments" &&
                payments.map((payment) => (
                  <div key={payment._id} className="bg-white/10 p-3 rounded-xl">
                    <h4>Amount : ₹ {payment.amount}</h4>
                    <p className="text-xl text-white/70">
                      Payment : {payment.paymentMethod}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.status?.toLowerCase() === "success"
                        ? "bg-green-100 text-green-700"
                        : payment.status?.toLowerCase() === "failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-green-700"
                        }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </div>
                ))}

              {activeTab === "events" &&
                events.map((event) => (
                  <div key={event._id} className="bg-white/10 p-3 rounded-xl">
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-xs text-white/70">
                      {event.date}
                    </p>
                  </div>
                ))}

            </div>


            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="w-full bg-red-500/30 hover:bg-red-500/50 p-3 rounded-xl mt-8 transition"
            >
              Logout
            </button>

          </div>
        </div>
      )}

    </nav>
  );
}

export default Navbar;