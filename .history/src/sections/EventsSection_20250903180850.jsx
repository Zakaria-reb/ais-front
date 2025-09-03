import React, { useState } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const EventsSection = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 4,
      behavior: 'smooth'
    });
  };

  const events = [
    {
      name: "TechFest 2025",
      description: "Annual technology festival showcasing cutting-edge innovations and breakthrough projects from our community",
      date: "March 15-17, 2025",
      location: "ENSA El Jadida Campus",
      type: "FESTIVAL",
      status: "PLANNING",
      color: "from-purple-600 to-pink-600",
      accentColor: "purple-400",
      highlights: ["48h Hackathon", "Tech Exhibitions", "Industry Speakers", "Networking Sessions"],
      participants: "500+ Expected"
    },
    {
      name: "Innovation Summit",
      description: "Premier conference bringing together industry leaders, researchers, and visionaries to shape the future of technology",
      date: "June 8-9, 2025", 
      location: "Conference Hall, ENSA",
      type: "CONFERENCE",
      status: "CONFIRMED",
      color: "from-blue-600 to-cyan-600",
      accentColor: "cyan-400",
      highlights: ["Keynote Speakers", "Panel Discussions", "Startup Pitches", "Career Fair"],
      participants: "300+ Professionals"
    },
    {
      name: "Demo Day",
      description: "Showcase platform where students present groundbreaking projects to industry experts and potential investors",
      date: "October 25, 2025",
      location: "Auditorium Principal",
      type: "SHOWCASE",
      status: "OPEN_REGISTRATION", 
      color: "from-green-600 to-teal-600",
      accentColor: "emerald-400",
      highlights: ["Project Presentations", "Investor Meetings", "Awards Ceremony", "Media Coverage"],
      participants: "150+ Projects"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="events-section">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-20 w-40 h-40 border-2 border-cyber-blue/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-28 h-28 border border-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-purple-400/25 rounded-lg rotate-12 animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/30">
              [EVENT_MATRIX_2025]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SIGNATURE EVENTS
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </div>

        {/* Events Interactive Timeline */}
        <div className="max-w-7xl mx-auto mb-16">
          {/* Event Selector */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 bg-black/40 rounded-full p-2 border border-cyber-blue/20">
              {events.map((event, index) => (
                <button
                  key={index}
                  onClick={() => setActiveEvent(index)}
                  className={`
                    px-6 py-3 rounded-full font-orbitron text-sm font-semibold
                    transition-all duration-300
                    ${activeEvent === index
                      ? `bg-gradient-to-r ${event.color} text-white shadow-lg`
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {event.type}
                </button>
              ))}
            </div>
          </div>

          {/* Active Event Display */}
          <div className="relative">
            {events.map((event, index) => (
              <div
                key={index}
                className={`
                  transition-all duration-500 ease-in-out
                  ${activeEvent === index ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0'}
                `}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Event Details */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className={`
                          font-fira text-xs px-3 py-1 rounded-full
                          bg-gradient-to-r ${event.color} text-white font-semibold tracking-wider
                        `}>
                          {event.status}
                        </span>
                        <span className="font-fira text-xs text-gray-400">
                          {event.participants}
                        </span>
                      </div>
                      
                      <h3 className="font-orbitron text-3xl lg:text-4xl font-bold text-white mb-4">
                        {event.name}
                      </h3>
                      
                      <p className="font-rajdhani text-lg text-gray-300 leading-relaxed mb-6">
                        {event.description}
                      </p>
                    </div>

                    {/* Event Meta */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${event.accentColor}`}></div>
                        <span className="font-fira text-sm text-gray-400">DATE:</span>
                        <span className="font-rajdhani text-white">{event.date}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${event.accentColor}`}></div>
                        <span className="font-fira text-sm text-gray-400">LOCATION:</span>
                        <span className="font-rajdhani text-white">{event.location}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="font-orbitron text-sm font-semibold text-cyber-blue mb-3 tracking-wide">
                        EVENT_HIGHLIGHTS
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {event.highlights.map((highlight, hIndex) => (
                          <div
                            key={hIndex}
                            className="
                              bg-black/30 border border-gray-700/50 rounded-lg p-3
                              font-rajdhani text-sm text-gray-300
                              hover:border-cyber-blue/30 transition-colors duration-300
                            "
                          >
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Display */}
                  <div className="flex justify-center">
                    <div className="relative">
                      {/* Main Event Visual */}
                      <div className={`
                        w-80 h-80 rounded-2xl bg-gradient-to-br ${event.color}
                        flex items-center justify-center text-6xl text-white
                        shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500
                      `}>
                        <div className="text-center">
                          <div className="font-orbitron text-4xl font-bold mb-2">
                            {event.name.split(' ')[0]}
                          </div>
                          <div className="font-rajdhani text-xl">
                            {event.date.split(',')[1]}
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className={`
                        absolute -top-4 -right-4 w-16 h-16 
                        bg-${event.accentColor} rounded-full
                        flex items-center justify-center text-white font-bold
                        animate-bounce-slow
                      `}>
                        {event.type.charAt(0)}
                      </div>
                      
                      <div className={`
                        absolute -bottom-4 -left-4 w-12 h-12
                        border-2 border-${event.accentColor} rounded-full
                        animate-spin-slow
                      `}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="font-rajdhani text-lg text-white/80 leading-relaxed mb-8">
            Experience transformative events that shape the future of technology. Our signature events bring together 
            the brightest minds in tech, creating opportunities for learning, networking, and showcasing innovation.
          </p>
          <div className="flex justify-center">
            <div className="bg-black/30 border border-cyan-400/20 rounded-lg px-6 py-3">
              <span className="font-fira text-sm text-cyan-400">
                NEXT_EVENT: <span className="text-green-400">TECHFEST_2025</span>
              </span>
            </div>
          </div>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Connect With Us"
      />
    </div>
  );
};

export default EventsSection;