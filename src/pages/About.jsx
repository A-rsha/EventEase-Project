import React from "react";
import { useNavigate } from "react-router-dom";


function About() {
    const navigate=useNavigate();
    return (
        <div className="min-h-screen text-black">

            <section className="text-center py-20 px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                    About <span className="bg-red-700 bg-clip-text text-transparent">
                        EventEase
                    </span>
                </h1>
                <p className="mt-6 text-lg text-blac/70 max-w-3xl mx-auto">
                    EventEase is a modern event management platform designed to help users
                    discover, create, and manage events effortlessly.
                </p>
            </section>


            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-6">What We Do</h2>
                    <p className="text-black/70 leading-relaxed">
                        We connect event organizers and attendees through a seamless
                        digital experience. From booking tickets to managing payments,
                        EventEase simplifies every step of event planning.
                    </p>
                </div>

                <div className="bg-black/10 backdrop-blur-lg border border-black/20 rounded-3xl p-8">
                    <ul className="space-y-4 text-black/80">
                        <li>Easy Event Creation</li>
                        <li>Secure Ticket Booking</li>
                        <li>Real-Time Seat Availability</li>
                        <li> Smart Payment Tracking</li>
                    </ul>
                </div>
            </section>


            <section className="py-20 px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

                    <div className="bg-black/10 backdrop-blur-lg border border-black/20 rounded-3xl p-6 text-center hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-4">Discover Events</h3>
                        <p className="text-black/70">
                            Explore trending and upcoming events near you.
                        </p>
                    </div>

                    <div className="bg-black/10 backdrop-blur-lg border border-black/20 rounded-3xl p-6 text-center hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-4">Create & Promote</h3>
                        <p className="text-black/70">
                            Organizers can easily create and promote events.
                        </p>
                    </div>

                    <div className="bg-black/10 backdrop-blur-lg border border-blavk/20 rounded-3xl p-6 text-center hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
                        <p className="text-black/70">
                            Safe and transparent ticket payment system.
                        </p>
                    </div>

                </div>
            </section>


            <section className="py-20 text-center bg-white/5">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-3xl font-bold">100+</h3>
                        <p className="text-black/70">Events Hosted</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">5K+</h3>
                        <p className="text-black/70">Tickets Sold</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">2K+</h3>
                        <p className="text-black/70">Active Users</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">99%</h3>
                        <p className="text-black/70">Customer Satisfaction</p>
                    </div>
                </div>
            </section>


            <section className="py-20 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    Ready to Explore Amazing Events?
                </h2>
                <button
                    onClick={() => navigate("/")}
                    className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-full font-semibold transition"
                >
                    Get Started
                </button>
            </section>

        </div>
    );
}

export default About;