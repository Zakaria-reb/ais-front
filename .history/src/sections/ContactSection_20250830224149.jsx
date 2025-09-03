import React from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ContactSection = () => {
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 6, // Scroll to membership section
      behavior: 'smooth'
    });
  };

  return (
    <div className="section" id="contact-section">
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
          Contact Us
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
            Ready to join our community of innovators? Have questions about 
            our programs or want to collaborate on a project? We'd love to 
            hear from you.
          </p>
          <p style={{ marginBottom: '2rem' }}>
            Reach out through our social media channels, send us an email, 
            or visit us on campus. Our doors are always open to curious minds 
            and passionate builders.
          </p>
        </div>
      </div>
      
      <ScrollIndicator 
        onClick={handleScroll}
        text="Join Our\nCommunity"
      />
    </div>
  );
};

export default ContactSection;
