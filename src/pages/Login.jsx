import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-linear-to-br from-purple-900 via-pink-900 to-purple-400 px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg 
      border border-white/30 rounded-3xl p-8 shadow-2xl text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

    
        <div className="flex items-center gap-3 bg-white/10 
        border border-white/20 rounded-xl px-4 py-3 mb-4">
          <FiMail />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-transparent outline-none w-full placeholder-white/70"
          />
        </div>

        
        <div className="flex items-center gap-3 bg-white/10 
        border border-white/20 rounded-xl px-4 py-3 mb-6">
          <FiLock />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none w-full placeholder-white/70"
          />
        </div>

        <button className="w-full bg-purple-800 hover:bg-purple-900 
        transition py-3 rounded-xl font-semibold">
          Login
        </button>

        <p className="text-center mt-6 text-sm text-white/80">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-300 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
