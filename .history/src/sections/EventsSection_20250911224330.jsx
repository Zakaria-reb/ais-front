import React, { useEffect, useRef, useState } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const EventsSection = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px 0px -100px 0px'
      }
    );

    observerRef.current = observer;

    // Observer tous les éléments animables
    elementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  

  const events = [
    {
      name: "HACKATHON",
      description: "48-hour intensive coding challenge where students build innovative solutions",
      date: "March 2025",
      type: "COMPETITION",
      color: "from-green-600 to-emerald-600",
      image: "/events/Cq", // Your hackathon event image
      alt: "Hackathon event poster"
    },
    {
      name: "CyberQuest 3.0",
      description: "Cybersecurity competition and workshop series",
      date: "June 2025", 
      type: "CONFERENCE",
      color: "from-purple-600 to-pink-600",
      image: "/img/ev2.png", // Your CyberQuest event image
      alt: "CyberQuest 3.0 event poster"
    },
    {
      name: "Era's Exchange",
      description: "International student and professional exchange program",
      date: "September 2025",
      type: "EXCHANGE",
      color: "from-blue-600 to-cyan-600",
      image: "/img/ev3.png", // Your Era's Exchange event image
      alt: "Era's Exchange event poster"
    },
    {
      name: "IT FORM Workshop",
      description: "Technical workshop series on modern IT practices and tools",
      date: "November 2025",
      type: "WORKSHOP",
      color: "from-indigo-600 to-blue-600",
      image: "/img/ev1.png", // Your IT Form event image
      alt: "IT Form workshop poster"
    },
    {
      name: "Cyber Security Summit",
      description: "Annual cybersecurity awareness and training summit",
      date: "December 2025",
      type: "SUMMIT",
      color: "from-red-600 to-orange-600",
      image: "/img/ev2.png", // Your Cyber Security event image
      alt: "Cyber Security Summit poster"
    },
    {
      name: "ATekTalk Conference",
      description: "Technology talks and networking event with industry experts",
      date: "February 2025",
      type: "CONFERENCE",
      color: "from-teal-600 to-green-600",
      image: "/img/ev3.png", // Your ATekTalk event image
      alt: "ATekTalk Conference poster"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="events-section">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-20 w-40 h-40 border-2 border-cyber-blue/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-28 h-28 border border-cyan-400/30 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-300 ${
            visibleElements.has('header') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
          ref={el => elementsRef.current[0] = el}
          data-index="header"
        >
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/30">
              [EVENT_MATRIX]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SIGNATURE EVENTS
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </div>

        {/* Events Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyber-blue via-cyan-400 to-purple-400 rounded-full transition-all duration-500 ${
                visibleElements.has('timeline') 
                  ? 'h-full opacity-100' 
                  : 'h-0 opacity-0'
              }`}
              ref={el => elementsRef.current[1] = el}
              data-index="timeline"
              style={{ transitionDelay: visibleElements.has('timeline') ? '300ms' : '0ms' }}
            ></div>
            
            <div className="space-y-20">
              {events.map((event, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} transform transition-all duration-300 ${
                    visibleElements.has(`event-${index}`)
                      ? 'translate-x-0 opacity-100'
                      : index % 2 === 0 
                        ? '-translate-x-16 opacity-0'
                        : 'translate-x-16 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: visibleElements.has(`event-${index}`) ? `${200 + index * 100}ms` : '0ms'
                  }}
                  ref={el => elementsRef.current[index + 2] = el}
                  data-index={`event-${index}`}
                >
                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="group bg-black/40 border border-cyber-blue/20 rounded-xl overflow-hidden backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-400/20">
                      {/* Event Poster Image */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Event Type Badge on Image */}
                        <div className="absolute top-4 left-4">
                          <span className={`font-fira text-xs px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white font-semibold tracking-wider shadow-lg`}>
                            {event.type}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                          {event.name}
                        </h3>
                        
                        <p className="font-rajdhani text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {event.description}
                        </p>
                        
                        <div className="text-sm font-fira text-cyber-blue">
                          {event.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="w-2/12 flex justify-center relative z-10">
                    <div 
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${event.color} border-4 border-cyber-dark shadow-lg shadow-cyan-400/30 animate-pulse transform transition-all duration-700 ${
                        visibleElements.has(`node-${index}`)
                          ? 'scale-100 opacity-100'
                          : 'scale-0 opacity-0'
                      }`}
                      ref={el => elementsRef.current[index + 5] = el}
                      data-index={`node-${index}`}
                      style={{ 
                        transitionDelay: visibleElements.has(`node-${index}`) ? `${300 + index * 100}ms` : '0ms'
                      }}
                    ></div>
                  </div>
                  
                  {/* Date Side */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                    <div 
                      className={`font-orbitron text-2xl font-bold text-gray-400 transform transition-all duration-800 ${
                        visibleElements.has(`date-${index}`)
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-0'
                      }`}
                      ref={el => elementsRef.current[index + 8] = el}
                      data-index={`date-${index}`}
                      style={{ 
                        transitionDelay: visibleElements.has(`date-${index}`) ? `${400 + index * 100}ms` : '0ms'
                      }}
                    >
                      {event.date.split(' ')[0]}
                      <div className="text-sm text-gray-500">{event.date.split(' ')[1]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div 
          className={`text-center max-w-4xl mx-auto transform transition-all duration-300 ${
            visibleElements.has('description')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: visibleElements.has('description') ? '1200ms' : '0ms' }}
          ref={el => elementsRef.current[11] = el}
          data-index="description"
        >
          <p className="font-rajdhani text-lg text-white/80 leading-relaxed mb-8">
            Experience transformative events that shape the future of technology. Our signature events bring together 
            the brightest minds in tech, creating opportunities for learning, networking, and showcasing innovation.
          </p>
          <div className="flex justify-center">
            <div className="bg-black/30 border border-cyan-400/20 rounded-lg px-6 py-3">
              <span className="font-fira text-sm text-cyan-400">
                NEXT_EVENT: <span className="text-green-400">INITIALIZING...</span>
              </span>
            </div>
          </div>
        </div>
      </div>
     
      <div className="relative z-10 flex justify-center pb-16">
        <ScrollIndicator
          targetSection="membership" // This will scroll to the membership section
          text="Join Our Community"
        />
      </div>
    </div>
  );
};

export default EventsSection;