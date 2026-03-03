import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postEvent } from '../../services/api'

function CreateEvent() {
    const navigate = useNavigate();

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
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("category", formData.category)
        data.append("date", formData.date);
        data.append("time", formData.time);
        data.append("venue", formData.venue);
        data.append("price", formData.price);
        data.append("totalSeats", formData.totalSeats);


        if (formData.image) {
            data.append("image", formData.image);
        }

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
        <div className='bg-pink-100 min-h-screen p-8'>
            <div className='max-w-3xl mx-auto bg-fuchsia-100 shadow-lg rounded-xl p-8'>
                <h2 className='text-3xl font-bold mb-6 text-black'>
                    Create New Event
                </h2>

                <form onSubmit={handleSubmit} className='space-y-5'>

                    <input
                        type="text"
                        name='title'
                        placeholder='Enter Title'
                        className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder='Event description'
                        rows="3"
                        className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                        onChange={handleChange}
                        required
                    />
                    <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                        required>
                        <option value="">Select Category</option>
                        <option value="Music">Music</option>
                        <option value="Tech">Tech</option>
                        <option value="Food">Food</option>
                        <option value="Business">Business</option>
                        <option value="Workshop">Workshop</option>
                    </select>

                    <input
                        type="date"
                        name='date'
                        className='w-full p-3 border rounded-lg'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className='w-full p-3 border rounded-lg'
                        required
                    />

                    <input
                        type="text"
                        name='venue'
                        placeholder='Venue'
                        className='w-full p-3 border rounded-lg'
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name='price'
                        placeholder='Price'
                        className='w-full p-3 border rounded-lg'
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name='totalSeats'
                        placeholder='Total seats'
                        className='w-full p-3 border rounded-lg'
                        onChange={handleChange}
                        required
                    />


                    <div>
                        <input
                            type="file"
                            name='image'
                            onChange={handleChange}
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full mt-3 rounded-lg"
                            />
                        )}
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-purple-800 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300'
                    >
                        Create Event
                    </button>

                </form>
            </div>
        </div>
    )
}

export default CreateEvent