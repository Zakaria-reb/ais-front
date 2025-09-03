import React, { useEffect, useState, useRef } from "react";
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
  const throttleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollThreshold = viewportHeight * 0.2; // Plus fluide

      // Gestion du logo header avec throttling
      if (scrollPosition > scrollThreshold && !isScrolled) {
        setIsScrolled(true);
        setTimeout(() => setShowHeaderLogo(true), 150);
      } else if (scrollPosition <= scrollThreshold && isScrolled) {
        setShowHeaderLogo(false);
        setTimeout(() => setIsScrolled(false), 150);
      }

      // Détection de section active - COHÉRENTE
      const sections = [
        { id: 'home', start: 0, end: viewportHeight * 0.8 },
        { id: 'about', start: viewportHeight * 0.8, end: viewportHeight * 1.8 },
        { id: 'activities', start: viewportHeight * 1.8, end: viewportHeight * 2.8 },
        { id: 'events', start: viewportHeight * 2.8, end: viewportHeight * 3.8 },
        { id: 'contact', start: viewportHeight * 3.8, end: viewportHeight * 4.8 },
        { id: 'membership', start: viewportHeight * 4.8, end: Infinity }
      ];

      // Trouver la section active
      const currentSection = sections.find(section =>
        scrollPosition >= section.start - 100 && scrollPosition < section.end - 100
      );

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Throttle optimisé pour les performances
    const throttledScroll = () => {
      if (throttleRef.current) return;
      
      throttleRef.current = requestAnimationFrame(() => {
        handleScroll();
        throttleRef.current = null;
      });
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // État initial

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (throttleRef.current) {
        cancelAnimationFrame(throttleRef.current);
      }
    };
  }, [isScrolled, activeSection]);

  return (
    <div className="text-center relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest font-rajdhani text-white overflow-x-hidden">
      <CodeBackground />
      <Navigation showHeaderLogo={showHeaderLogo} activeSection={activeSection} />
      
      <div className="relative z-[2]">
        {/* Section principale - chaque section fait min-h-screen */}
        <HomeSection isScrolled={isScrolled} />
        <AboutSection />
        <ActivitiesSection />
        <EventsSection />
        <ContactSection />
        <MembershipSection />
      </div>
      
      {/* Indicateur de progression optimisé */}
      <div className="fixed bottom-8 right-8 z-[90]">
        <div className="w-1 h-20 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="w-full bg-gradient-to-t from-cyber-blue to-cyan-400 transition-all duration-200 ease-out rounded-full"
            style={{ 
              height: `${Math.min((scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;