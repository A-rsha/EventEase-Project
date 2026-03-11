import React, { useEffect, useState } from "react";
import API from "../../services/axios";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(events.map(event => event.category))];

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/getEvents");
      setEvents(res.data.data || []);
    } catch (error) {
      console.log("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/events/deleteEvent/${id}`);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/events/updateEvent/${editEvent._id}`, editEvent);
      alert("Event updated");
      setEditEvent(null);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((ev) => ev.category === selectedCategory);

  return (
    <div className="p-6  min-h-screen">

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Events</h2>

   
      <div className="mb-6 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-md border ${
              selectedCategory === cat
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

     
      {filteredEvents.length === 0 ? (
        <p className="text-gray-700">No events found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-md p-4 shadow flex flex-col">

              {event.image && (
                <img
                  src={`https://eventease-backend-3-py1w.onrender.com/${event.image}`}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}

              <h3 className="font-semibold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm mt-1">Category: {event.category}</p>
              <p className="text-sm">Venue: {event.venue}</p>
              <p className="text-sm">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm">Time: {event.time}</p>
              <p className="font-semibold text-purple-600">₹{event.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditEvent(event)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-3 text-gray-800">Edit Event</h3>

            <input
              type="text"
              value={editEvent.title}
              onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
              className="border p-2 w-full mb-2 rounded-md"
            />

            <textarea
              value={editEvent.description}
              onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
              className="border p-2 w-full mb-2 rounded-md"
            />

            <select
              value={editEvent.category}
              onChange={(e) => setEditEvent({ ...editEvent, category: e.target.value })}
              className="border p-2 w-full mb-2 rounded-md"
            >
              <option>Music</option>
              <option>Tech</option>
              <option>Food</option>
              <option>Business</option>
              <option>Workshop</option>
            </select>

            <input
              type="text"
              value={editEvent.venue}
              onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })}
              className="border p-2 w-full mb-2 rounded-md"
            />

            <input
              type="date"
              value={editEvent.date?.split("T")[0]}
              onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
              className="border p-2 w-full mb-2 rounded-md"
            />

            <input
              type="time"
              value={editEvent.time}
              onChange={(e) => setEditEvent({ ...editEvent, time: e.target.value })}
              className="border p-2 w-full mb-2 rounded-md"
            />

            <input
              type="number"
              value={editEvent.price}
              onChange={(e) => setEditEvent({ ...editEvent, price: e.target.value })}
              className="border p-2 w-full mb-4 rounded-md"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditEvent(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageEvents;