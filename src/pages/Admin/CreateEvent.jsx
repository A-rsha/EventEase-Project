import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../services/axios'

function CreateEvent() {
    const navigate = useNavigate();

    const [formData,setFormData]=useState({
        title:"",
        description:"",
        date:"",
        venue:"",
        price:"",
        totalSeats:"",
        image:null,
    })

    const [preview,setPreview]=useState(null);

    const handleChange=(e)=>{
        if(e.target.name === "image"){
            const file = e.target.files[0]
            setFormData({...formData,image:file});
            setPreview(URL.createObjectURL(file));
        }else{
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const data=new FormData();
        data.append("title",formData.title);
        data.append("description",formData.description);
        data.append("date",formData.date);
        data.append("venue", formData.venue);
        data.append("price",formData.price);
        data.append("totalSeats", formData.totalSeats);
      data.append("image",formData.image);

      try {
        await API.post("/events/create",data,{
            headers:{
                "content-Type": "multipart/form-data"
            },
        })
          alert("Event Created Successfully 🎉");
      navigate("/admin/manage-events");

      } catch (error) {
        console.log(error.response?.data || error.message);
        alert("Error creating event")
      }
    }
  return (
    <div className='bg-pink-100 min-h-screen p-8'>
        <div className='max-w-3xl mx-auto bg-fuchsia-100 shadow-lg rounded-xl p-8'>
            <h2 className='text-3xl font-bold mb-6 text-black'>Create New Event </h2>

            <form onSubmit={handleSubmit} className='sapce-y-5'>
                <input type="text"name='title'
                placeholder='Enter Title'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus-ring-purple-500'
                onChange={handleChange}
                required />

                <textarea name="description"
                placeholder='Event description'
                rows="3"
                className='w-full p-3 border rounded-lg foucs:outline-none focus:ring-2 focus-ring-purple-500'
                onChange={handleChange}
                required/>

                <input type="date" name='date'
                className='w-full p-3 border rounded-lg'
                              onChange={handleChange}
                required />

                <input type="text" name='venue' placeholder='venue'
                className='w-full p-3 border rounded-lg'
                              onChange={handleChange}
                required />

                <input type="text" name='price'
                placeholder='price'
                className='w-full p-3 border rounded-lg'
                              onChange={handleChange}
                required />

                <input type="number" name='totalSeats'
                placeholder='Total seats'
                className='w-full p-3 border rounded-lg'
                              onChange={handleChange}
                required />

                <div>
                    <input type="file"
                    name='image'
                    accept='image/*'
                    onChange={handleChange}
                    required />

                 {preview && (
  <img
    src={preview}
    alt="Preview"
    className="w-full p-3 border rounded-lg"
  />
)}
                </div>

                <button type='submit' className='w-full bg-purple-800 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300'
                >Create Event</button>
            </form>

        </div>
    </div>
  )
}

export default CreateEvent