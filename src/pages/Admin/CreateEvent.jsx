import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postEvent } from '../../services/api';

function CreateEvent() {
  const navigate = useNavigate();
  const [customCategory, setCustomCategory] = useState("");
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
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    if (formData.category === "Other") data.set("category", customCategory);

    try {
      await postEvent(data);
      alert("Event Created Successfully 🎉");
      navigate("/admin/manage-events");
    } catch (error) {
      console.log("FULL ERROR:", error.response?.data || error);
      alert("Error creating event");
    }
  };

  return (
    <div className="bg-fuchsia-200 min-h-screen py-6 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-purple-100 rounded-md p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center md:text-left">
          Create New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            className="w-full p-3 border rounded-md focus:ring-1 focus:ring-purple-500"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            rows="4"
            className="w-full p-3 border rounded-md focus:ring-1 focus:ring-purple-500"
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-1 focus:ring-purple-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Business">Business</option>
            <option value="Workshop">Workshop</option>
            <option value="Other">Add New Category</option>
          </select>

          {formData.category === "Other" && (
            <input
              type="text"
              placeholder="Enter New Category"
              className="w-full p-3 border rounded-md mt-2"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              className="w-full p-3 border rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full p-3 border rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="totalSeats"
              placeholder="Total Seats"
              className="w-full p-3 border rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Upload Event Image</label>
            <input type="file" name="image" onChange={handleChange} className="w-full" />
            {preview && <img src={preview} alt="Preview" className="w-full md:w-1/2 mt-3 rounded-md" />}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-600 transition-colors font-medium"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;