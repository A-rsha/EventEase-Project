import React, { useEffect, useState } from 'react'
import API from "../../services/axios"

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
};

function ManageEvents() {
  const [events, setEvents] = useState([])
  const [editEvent, setEditEvent] = useState(null)

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/getEvents")
      setEvents(res.data.data || [])
    } catch (error) {
      console.error('Error fetching Events', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/events/deleteEvent/${id}`)
      fetchEvents()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await API.put(`/events/updateEvent/${editEvent._id}`, editEvent)
      alert("Event Updated Successfully")
      setEditEvent(null)
      fetchEvents()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className='p-4 md:p-8'>

      <h2 className='text-2xl md:text-4xl font-bold text-black mb-6'>
        Events
      </h2>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {events.map((event) => (
            <div
              key={event._id}
              className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col'
            >
              {event.image && (
                <img
                  src={`http://localhost:4003/${event.image}`}
                  alt={event.title}
                  className="w-full h-44 object-cover"
                />
              )}

              <div className='p-4 space-y-2 grow'>
                <h3 className='text-lg md:text-xl font-semibold'>
                  {event.title}
                </h3>

                <p className='text-sm text-gray-600 line-clamp-2'>
                  {event.description}
                </p>

                <p className='text-sm'>{event.category}</p>
                <p className='text-sm'>{event.venue}</p>
                <p className='text-sm'>
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p className='text-sm'>⏰ {formatTime(event.time)}</p>
                <p className='font-semibold text-purple-700'>
                  ₹{event.price}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-3 p-4 border-t'>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => setEditEvent(event)}
                  className='w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl overflow-y-auto max-h-[90vh]"
          >
            <h3 className="text-xl md:text-2xl font-bold">
              Edit Event
            </h3>

            <input
              type="text"
              value={editEvent.title}
              onChange={(e) =>
                setEditEvent({ ...editEvent, title: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
              placeholder="Title"
            />

            <textarea
              value={editEvent.description}
              onChange={(e) =>
                setEditEvent({ ...editEvent, description: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
              placeholder="Description"
            />

            <select
              value={editEvent.category}
              onChange={(e) =>
                setEditEvent({ ...editEvent, category: e.target.value })
              }
              className='w-full p-2 border rounded-lg'
            >
              <option value="">Select Category</option>
              <option value="Music">Music</option>
              <option value="Tech">Tech</option>
              <option value="Food">Food</option>
              <option value="Business">Business</option>
              <option value="Workshop">Workshop</option>
            </select>

            <input
              type="text"
              value={editEvent.venue}
              onChange={(e) =>
                setEditEvent({ ...editEvent, venue: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
              placeholder="Venue"
            />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <input
                type="date"
                value={editEvent.date ? editEvent.date.split("T")[0] : ""}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, date: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="time"
                value={editEvent.time}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, time: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <input
              type="number"
              value={editEvent.price}
              onChange={(e) =>
                setEditEvent({ ...editEvent, price: e.target.value })
              }
              className="w-full border p-2 rounded-lg"
              placeholder="Price"
            />

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => setEditEvent(null)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ManageEvents