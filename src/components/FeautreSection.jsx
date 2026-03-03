import React, { useEffect, useState, useMemo } from 'react'
import API from "../services/axios"
import { useNavigate } from 'react-router-dom'

function FeatureSection({ searchText, location, category }) {

    const navigate = useNavigate()

    const [allEvents, setAllEvents] = useState([])
    const [events, setEvents] = useState([])

  
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API.get("/events/getEvents")

                const today = new Date()

                const upcoming = res.data.data
                    .filter(event => new Date(event.date) >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))

                setAllEvents(upcoming)
                setEvents(upcoming)

            } catch (error) {
                console.error("Error fetching events", error)
            }
        }

        fetchEvents()
    }, [])

  
    useEffect(() => {

        let filtered = [...allEvents]

        if (searchText) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchText.toLowerCase())
            )
        }

        if (location) {
            filtered = filtered.filter(event =>
                event.venue.toLowerCase().includes(location.toLowerCase())
            )
        }

        if (category) {
            filtered = filtered.filter(event =>
                event.category === category
            )
        }

        setEvents(filtered)

    }, [searchText, location, category, allEvents])


 
    const categoryCounts = useMemo(() => {
        const counts = {}
        allEvents.forEach(event => {
            counts[event.category] = (counts[event.category] || 0) + 1
        })
        return counts
    }, [allEvents])


  
    const highlightText = (text) => {
        if (!searchText) return text

        const regex = new RegExp(`(${searchText})`, "gi")
        return text.split(regex).map((part, index) =>
            part.toLowerCase() === searchText.toLowerCase()
                ? <span key={index} className="bg-yellow-300 px-1 rounded">{part}</span>
                : part
        )
    }

    return (
        <section className="relative pt-6 pb-20 px-6 -mt-51">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Upcoming Events
                    </h1>
                    <p className="text-gray-200">
                        {events.length} Events Found
                    </p>
                </div>

                {events.length === 0 ? (
                    <div className="text-center text-white py-20">
                        <h2 className="text-2xl font-semibold mb-2">
                            No events found 😔
                        </h2>
                        <p className="text-gray-300">
                            Try changing your filters.
                        </p>
                    </div>
                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {events.map((event) => (

                            <div
                                key={event._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
                            >

                                <div className="relative h-56 overflow-hidden">
                                    {event.image && (
                                        <img
                                            src={`http://localhost:4003/${event.image}`}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                        />
                                    )}

                                    <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                                        {event.category} ({categoryCounts[event.category]})
                                    </span>
                                </div>

                                <div className="p-6 bg-fuchsia-300 flex flex-col grow">

                                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                        {highlightText(event.title)}
                                    </h3>

                                    <div className="text-sm text-gray-700 mb-4 space-y-1">
                                        <p>📅 {new Date(event.date).toLocaleString()}</p>
                                        <p>📍 {event.venue}</p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-3">

                                        <button
                                            className="w-full py-3 rounded-xl font-semibold 
                                            bg-linear-to-r from-purple-600 to-pink-500 
                                            hover:from-pink-500 hover:to-purple-600 
                                            transition duration-300 text-white"
                                            onClick={() => navigate(`/events/${event._id}`)}
                                        >
                                            Get Ticket
                                        </button>

                                        <span className="text-pink-600 font-semibold whitespace-nowrap">
                                            ₹{event.price}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}
            </div>
        </section>
    )
}

export default FeatureSection