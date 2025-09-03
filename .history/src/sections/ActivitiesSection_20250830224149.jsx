import React from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ActivitiesSection = () => {
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 4, // Scroll to events section
      behavior: 'smooth'
    });
  };

  return (
    <div className="section" id="activities-section">
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
          Our Activities
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
            From coding workshops to innovation challenges, we offer a diverse 
            range of activities designed to enhance your technical skills and 
            creative thinking.
          </p>
          <p style={{ marginBottom: '2rem' }}>
            Join us for hackathons, tech talks, project collaborations, 
            and networking events that connect you with industry professionals 
            and like-minded peers.
          </p>
        </div>
      </div>
      
      <ScrollIndicator 
        onClick={handleScroll}
        text="Check Out Our\nEvents"
      />
    </div>
  );
};

export default ActivitiesSection;