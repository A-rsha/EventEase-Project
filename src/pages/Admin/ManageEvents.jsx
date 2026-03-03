import React, { useEffect, useState } from 'react'
import API from "../../services/axios";

function ManageEvents() {
  const [events, setEvents] = useState([])
  const [editEvent, setEditEvent] = useState(null)

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/getEvents")
      setEvents(res.data.data)
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
    <div className='p-6'>
      <h2 className='text-4xl font-bold text-black mb-6'> EVENTS</h2>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {events.map((event) => (
            <div key={event._id} className='bg-fuchsia-300 rounded-xl shadow-lg overflow-hidden'>
              {event.image && (
                <img
                  src={`http://localhost:4003/${event.image}`}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className='p-4 space-y-2'>
                <h3 className='text-xl font-semibold'>{event.title}</h3>
                <p>{event.description}</p>
                <p>{event.category}</p>
                <p>{event.venue}</p>
                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                <p>⏰{event.time}</p>
                <p>₹{event.price}</p>
              </div>

              <div className='flex justify-between p-4 border-t'>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>

                <button
                  onClick={() => setEditEvent(event)}
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg'
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

   
      {editEvent && (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg w-96 space-y-3">

            <h3 className="text-xl font-bold">Edit Event</h3>

            <input
              type="text"
              placeholder="Title"
              value={editEvent.title}
              onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
              className="w-full border p-2"
            />

            <input
              type="text"
              placeholder="Description"
              value={editEvent.description}
              onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
              className="w-full border p-2"
            />

             <select
                        name='category'
                        value={editEvent.category}
                        onChange={(e)=>setEditEvent({...editEvent, category: e.target.value})}
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
              type="text"
              placeholder="Venue"
              value={editEvent.venue}
              onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })}
              className="w-full border p-2"
            />
            <input
              type="date"
              placeholder='date'
              value={editEvent.date ? editEvent.date.split("T")[0]:""}
              onChange={(e) =>
                setEditEvent({ ...editEvent, date: e.target.value })
              }
              className="w-full border p-2"
            />
            <input type="time"
            placeholder='time'
            value={editEvent.time}
            onChange={(e)=>setEditEvent({...editEvent, time : e.target.value})} 
             className="w-full border p-2"/>

            <input
              type="number"
              placeholder="Price"
              value={editEvent.price}
              onChange={(e) => setEditEvent({ ...editEvent, price: e.target.value })}
              className="w-full border p-2"
            />

            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => setEditEvent(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  )
}

export default ManageEvents