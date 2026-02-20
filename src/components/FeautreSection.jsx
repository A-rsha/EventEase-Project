import React from 'react'
import event1 from '../assets/event1.jpg'
import event2 from '../assets/event.2.jpg'
import event3 from '../assets/event3.jpg'

function FeatureSection() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">

           
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Upcoming Events
                    </h1>
                    <p className="text-gray-200">
                        You can choose to display featured events here.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {[ 
                        { img: event1, title: "Tech Innovation Summit", date: "Feb 25, 2026 • 10:00 AM", location: "Kochi, Kerala", price: "1500" },
                        { img: event2, title: "Mega Food Fest", date: "March 2, 2026 • 5:00 PM", location: "Kozhikode, Kerala", price: "500" },
                        { img: event3, title: "Magic Event", date: "Feb 28, 2026 • 9:00 PM", location: "Kozhikode, Kerala", price: "800" }
                    ].map((event, index) => (

                        <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

                            <div className="relative h-56 overflow-hidden ">
                                <img
                                    src={event.img}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                />

                                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                                    Event
                                </span>
                            </div>

                           
                            <div className="p-6 bg-fuchsia-300">

                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    {event.title}
                                </h3>

                                <div className="text-sm text-gray-600 mb-4 space-y-1">
                                    <p>📅 {event.date}</p>
                                    <p>📍 {event.location}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button className="px-4 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-pink-500 transition duration-300">
                                        Get Ticket
                                    </button>

                                    <span className="text-pink-500 font-semibold">
                                        ₹{event.price}
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default FeatureSection
