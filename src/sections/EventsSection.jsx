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
        <h2 className="section-title" style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '4rem',
          fontWeight: '700',
          color: '#00aaff',
          textAlign: 'center',
          marginBottom: '3rem',
          textShadow: '0 0 30px rgba(0, 170, 255, 0.8)',
          letterSpacing: '3px'
        }}>
          Events
        </h2>
        <div className="about-text" style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '1.3rem',
          lineHeight: '1.8',
          color: 'rgba(255, 255, 255, 0.9)',
          fontFamily: 'Rajdhani, sans-serif'
        }}>
          <p style={{ marginBottom: '2rem' }}>
            Experience transformative events that shape the future of technology. 
            Our annual conferences, competitions, and showcases bring together 
            the brightest minds in tech.
          </p>
          <p style={{ marginBottom: '2rem' }}>
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
