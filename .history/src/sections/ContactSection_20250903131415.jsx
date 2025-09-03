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
        <h2 className="font-orbitron text-6xl font-bold text-cyber-blue text-center mb-12 drop-shadow-[0_0_30px_rgba(0,170,255,0.8)] tracking-[3px]">
          Contact Us
        </h2>
        <div className="max-w-4xl mx-auto text-center text-xl leading-relaxed text-white/90 font-rajdhani">
          <p className="mb-8">
            Ready to join our community of innovators? Have questions about
            our programs or want to collaborate on a project? We'd love to
            hear from you.
          </p>
          <p className="mb-8">
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