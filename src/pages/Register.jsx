import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import API from "../services/axios"

function Register() {
const navigate = useNavigate();

const [formData,setFormData]=useState({
  name:"",
  email:"",
  password:"",
})
const handleChange =(e)=>{
  setFormData({
    ...formData,
    [e.target.name]:e.target.value,
  })
}


const handleSubmit =async()=>{
  try {
    await API.post("/auth/register",formData);
    alert("Registered successfully");
    navigate('/login')
  } catch (error) {
    alert("Registration failed")
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-linear-to-br from-purple-900 via-pink-900 to-purple-400 px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg 
      border border-white/30 rounded-3xl p-8 shadow-2xl text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        
        <div className="flex items-center gap-3 bg-white/10 
        border border-white/20 rounded-xl px-4 py-3 mb-4">
          <FiUser />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="bg-transparent outline-none w-full placeholder-white/70"
          />
        </div>

        <div className="flex items-center gap-3 bg-white/10 
        border border-white/20 rounded-xl px-4 py-3 mb-4">
          <FiMail />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            className="bg-transparent outline-none w-full placeholder-white/70"
          />
        </div>

        
        <div className="flex items-center gap-3 bg-white/10 
        border border-white/20 rounded-xl px-4 py-3 mb-6">
          <FiLock />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="bg-transparent outline-none w-full placeholder-white/70"
          />
        </div>
         
      

        <button className="w-full bg-purple-800 hover:bg-purple-900 
        transition py-4 mt-4 rounded-2xl font-semibold " onClick={handleSubmit}>
          Create Account
        </button>

        <p className="text-center mt-6 text-sm text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-300 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
