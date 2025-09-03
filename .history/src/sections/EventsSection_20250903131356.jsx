import React from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const EventsSection = () => {
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 5, // Scroll to contact section
      behavior: 'smooth'
    });
  };

  return (
    <div className="section" id="events-section">
      <div className="about-content">
        <h2 className="font-orbitron text-6xl font-bold text-cyber-blue text-center mb-12 drop-shadow-[0_0_30px_rgba(0,170,255,0.8)] tracking-[3px]">
          Events
        </h2>
        <div className="max-w-4xl mx-auto text-center text-xl leading-relaxed text-white/90 font-rajdhani">
          <p className="mb-8">
            Experience transformative events that shape the future of technology.
            Our annual conferences, competitions, and showcases bring together
            the brightest minds in tech.
          </p>
          <p className="mb-8">
            Stay tuned for our flagship events including TechFest, Innovation
            Summit, and Demo Day where students present their groundbreaking projects.
          </p>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Get In\nTouch"
      />
    </div>
  );
};

export default EventsSection;