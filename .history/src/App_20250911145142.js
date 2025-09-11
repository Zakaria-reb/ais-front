import React, { useEffect, useState, useRef, useCallback } from "react";
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
  
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    activities: useRef(null),
    events: useRef(null),
    contact: useRef(null),
    membership: useRef(null)
  };

  // Optimized intersection observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0.1, 0.5, 0.9]
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Optimized scroll handler with debouncing
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollThreshold = viewportHeight * 0.15;

    if (scrollPosition > scrollThreshold && !isScrolled) {
      setIsScrolled(true);
      setTimeout(() => setShowHeaderLogo(true), 100);
    } else if (scrollPosition <= scrollThreshold && isScrolled) {
      setShowHeaderLogo(false);
      setTimeout(() => setIsScrolled(false), 100);
    }
  }, [isScrolled]);

  useEffect(() => {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  const sections = [
    { id: 'home', Component: HomeSection, props: { isScrolled } },
    { id: 'about', Component: AboutSection, props: {} },
    { id: 'activities', Component: ActivitiesSection, props: {} },
    { id: 'events', Component: EventsSection, props: {} },
    { id: 'contact', Component: ContactSection, props: {} },
    { id: 'membership', Component: MembershipSection, props: {} }
  ];

  return (
    <div className="text-center relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest font-rajdhani text-white overflow-x-hidden">
      <CodeBackground />
      <Navigation showHeaderLogo={showHeaderLogo} activeSection={activeSection} />
      
      <div className="relative z-[2]">
        {sections.map(({ id, Component, props }) => (
          <section
            key={id}
            id={id}
            ref={sectionRefs[id]}
            className="min-h-screen"
          >
            <Component {...props} />
          </section>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="fixed bottom-8 right-8 z-[90]">
        <div className="w-1 h-20 bg-gray-800 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="w-full bg-gradient-to-t from-cyber-blue to-cyan-400 transition-all duration-200 ease-out rounded-full"
            style={{
              height: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`,
              boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;