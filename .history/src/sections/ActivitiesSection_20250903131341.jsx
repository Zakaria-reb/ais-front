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
        <h2 className="font-orbitron text-6xl font-bold text-cyber-blue text-center mb-12 drop-shadow-[0_0_30px_rgba(0,170,255,0.8)] tracking-[3px]">
          Our Activities
        </h2>
        <div className="max-w-4xl mx-auto text-center text-xl leading-relaxed text-white/90 font-rajdhani">
          <p className="mb-8">
            From coding workshops to innovation challenges, we offer a diverse
            range of activities designed to enhance your technical skills and
            creative thinking.
          </p>
          <p className="mb-8">
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