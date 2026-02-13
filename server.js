require('dotenv').config();

const express = require('express')
const mongoose=require('mongoose')
const cors = require('cors')
const connectDB=require('./config/db')



const app= express();

app.use(cors());
app.use(express.json());
const authRoutes =require('./routes/authRoutes')
const eventRoutes =require('./routes/eventRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

app.use("/api/auth",authRoutes)
app.use("/api/events",eventRoutes)
app.use("/api/bookings",bookingRoutes)

connectDB();

  const PORT=process.env.PORT ||4003
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})