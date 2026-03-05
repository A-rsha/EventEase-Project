import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postEvent } from '../../services/api'

function CreateEvent() {

    const navigate = useNavigate();
    const [date,setDate]=useState("");
    const [time,setTime]=useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        venue: "",
        price: "",
        totalSeats: "",
        image: null,
    })

    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0]
            setFormData({ ...formData, image: file });
            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        try {
            await postEvent(data);
            alert("Event Created Successfully 🎉");
            navigate("/admin/manage-events");
        } catch (error) {
            console.log("FULL ERROR:", error.response?.data || error);
            alert("Error creating event")
        }
    }

    return (
        <div className="bg-pink-100 min-h-screen py-6 px-4 md:px-8">

            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">

                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">
                    Create New Event
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Title"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Event Description"
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        onChange={handleChange}
                        required
                    />

                 
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Music">Music</option>
                        <option value="Tech">Tech</option>
                        <option value="Food">Food</option>
                        <option value="Business">Business</option>
                        <option value="Workshop">Workshop</option>
                        
                    </select>

                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="date"
                            name="date"
                            className="w-full p-3 border rounded-lg"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                    </div>

                  
                    <input
                        type="text"
                        name="venue"
                        placeholder="Venue"
                        className="w-full p-3 border rounded-lg"
                        onChange={handleChange}
                        required
                    />

                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            className="w-full p-3 border rounded-lg"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="totalSeats"
                            placeholder="Total Seats"
                            className="w-full p-3 border rounded-lg"
                            onChange={handleChange}
                            required
                        />
                    </div>

                  
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Upload Event Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="w-full"
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full md:w-1/2 mt-4 rounded-lg shadow-md"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-800 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold"
                    >
                        Create Event
                    </button>

                </form>
            </div>
        </div>
    )
}

export default CreateEvent
