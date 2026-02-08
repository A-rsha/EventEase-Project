const express = require('express')
const mongoose=require('mongoose')
const cors = require('cors')

const app= express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://fathimaarshak08_db_user:cwkQ1aMf78OTYmh9@cluster0.vnhcopk.mongodb.net/EventDB"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Connection Error:", err));

app.listen(4003,()=>{
    console.log("server running on port 4003");
})