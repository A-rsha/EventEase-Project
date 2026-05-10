import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import API from "../services/axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post("/auth/register", formData);

      alert("Registered Successfully");

      navigate("/login");

    } catch (error) {

      alert("Registration Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">

      <div className="w-full max-w-5xl bg-white rounded-[30px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div
          className="hidden lg:flex flex-col justify-between p-10 text-white relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10">

            <h1 className="text-4xl font-bold tracking-tight">
              EventEase
            </h1>

          </div>

          <div className="relative z-10">

            <p className="uppercase text-sm tracking-[4px] text-gray-300 mb-4">
              Join EventEase
            </p>

            <h2 className="text-5xl font-bold leading-tight">
              Create Your Account & Explore Events
            </h2>

            <p className="mt-5 text-gray-300 text-base leading-7">
              Join thousands of users discovering concerts,
              workshops, festivals and unforgettable experiences.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-8 md:p-12 flex flex-col justify-center">

          <div className="mb-10">

            <h2 className="text-3xl font-bold text-gray-900">
              Register
            </h2>

            <p className="text-gray-500 mt-2">
              Create your account and continue exploring events.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}

            <div>

              <label className="text-sm font-medium text-gray-700 block mb-2">
                Full Name
              </label>

              <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 h-14 bg-gray-50 focus-within:border-black transition">

                <FiUser className="text-gray-500 text-lg" />

                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="bg-transparent outline-none w-full text-gray-800"
                  required
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="text-sm font-medium text-gray-700 block mb-2">
                Email Address
              </label>

              <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 h-14 bg-gray-50 focus-within:border-black transition">

                <FiMail className="text-gray-500 text-lg" />

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="bg-transparent outline-none w-full text-gray-800"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>

              <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 h-14 bg-gray-50 focus-within:border-black transition">

                <FiLock className="text-gray-500 text-lg" />

                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Create your password"
                  className="bg-transparent outline-none w-full text-gray-800"
                  required
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition duration-300"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* LOGIN */}

          <p className="text-center text-sm text-gray-500 mt-8">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-black font-semibold no-underline hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;