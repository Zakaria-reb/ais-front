import React, { useEffect, useState } from "react";
import "./styles/global.css";

import CodeBackground from "./components/CodeBackground";
import Navigation from "./components/Navigation";

import HomeSection from "./sections/HomeSection";
import AboutSection from "./sections/AboutSection";
import ActivitiesSection from "./sections/ActivitiesSection";
import EventsSection from "./sections/EventsSection";
import ContactSection from "./sections/ContactSection";
import MembershipSection from "./sections/MembershipSection";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollThreshold = viewportHeight * 0.3;

      // Handle logo visibility
      if (scrollPosition > scrollThreshold && !isScrolled) {
        setIsScrolled(true);
        setTimeout(() => setShowHeaderLogo(true), 300);
      } else if (scrollPosition <= scrollThreshold && isScrolled) {
        setShowHeaderLogo(false);
        setTimeout(() => setIsScrolled(false), 300);
      }

      // Fixed section mapping to match actual content positioning
      const sections = [
        { id: 'home', start: 0, end: viewportHeight * 1.8 }, // Home section (includes internal about view)
        { id: 'about', start: viewportHeight * 1.8, end: viewportHeight * 3 }, // AboutSection
        { id: 'activities', start: viewportHeight * 3, end: viewportHeight * 4 }, // ActivitiesSection  
        { id: 'events', start: viewportHeight * 4, end: viewportHeight * 5 }, // EventsSection
        { id: 'contact', start: viewportHeight * 5, end: viewportHeight * 6 }, // ContactSection
        { id: 'membership', start: viewportHeight * 6, end: Infinity } // MembershipSection
      ];

      const currentSection = sections.find(section => 
        scrollPosition >= section.start && scrollPosition < section.end
      );

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, activeSection]);

  return (
    <div className="App">
      <CodeBackground />
      <Navigation showHeaderLogo={showHeaderLogo} activeSection={activeSection} />
      <div className="overlay">
        <HomeSection isScrolled={isScrolled} />
        <AboutSection />
        <ActivitiesSection />
        <EventsSection />
        <ContactSection />
        <MembershipSection />
      </div>
    </div>
  );
}

export default App;