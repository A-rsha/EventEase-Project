import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import API from "../services/axios";

function Login() {
const navigate =useNavigate();

const [formData,setFormData]=useState({
  email:"",
  password:""
})

const handleChange =(e)=>{
  setFormData({
    ...formData,
    [e.target.name]:e.target.value,
  })
}

const handleSubmit = async ()=>{
  try {
    const res=await API.post('/auth/login',formData);

    localStorage.setItem("token",res.data.token);
    localStorage.setItem("role",res.data.user.role);

    if(res.data.user.role === "admin"){
      navigate("/admin");
    }else{
      navigate("/")
    }
  } catch (error) {
     alert("Invalid Email or Password");
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center 
  bg-black">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg 
      border border-white/30 rounded-3xl p-8 shadow-2xl text-black">

        <h2 className="text-3xl text-white font-bold text-center mb-6">
          Login
        </h2>

    
        <div className="flex items-center gap-3 bg-white
        border border-white/20 rounded-xl px-4 py-3 mb-4">
          <FiMail />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            className="bg-transparent outline-none w-full "
          />
        </div>

        
        <div className="flex items-center gap-3 bg-white 
        border border-white/20 rounded-xl px-4 py-3 mb-6">
          <FiLock />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="bg-transparent outline-none w-full "
          />
        </div>

        <button className="w-full bg-black text-white
        transition py-3 rounded font-semibold" onClick={handleSubmit}>
          Login
        </button>

        <p className="text-center mt-6 text-sm text-black/80">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-300 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;