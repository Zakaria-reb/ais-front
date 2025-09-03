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
  const [visibleSections, setVisibleSections] = useState(new Set(['home'])); // Home est visible par défaut
  
  // Refs pour chaque section
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    activities: useRef(null),
    events: useRef(null),
    contact: useRef(null),
    membership: useRef(null)
  };

  // Hook pour l'intersection observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', // Déclenche quand la section est à 10% du viewport
      threshold: [0.1, 0.3, 0.5] // Plusieurs seuils pour plus de fluidité
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section');
        
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          setVisibleSections(prev => new Set([...prev, sectionId]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer toutes les sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollThreshold = viewportHeight * 0.3;

      // Handle logo visibility avec transition plus fluide
      if (scrollPosition > scrollThreshold && !isScrolled) {
        setIsScrolled(true);
        setTimeout(() => setShowHeaderLogo(true), 200);
      } else if (scrollPosition <= scrollThreshold && isScrolled) {
        setShowHeaderLogo(false);
        setTimeout(() => setIsScrolled(false), 200);
      }

      // Section mapping précis et cohérent
      const sections = [
        { id: 'home', start: 0, end: viewportHeight * 1.8 },
        { id: 'about', start: viewportHeight * 1.8, end: viewportHeight * 4.5 },
        { id: 'activities', start: viewportHeight * 4.5, end: viewportHeight * 6.7 },
        { id: 'events', start: viewportHeight * 6.7, end: viewportHeight * 9 },
        { id: 'contact', start: viewportHeight * 9, end: viewportHeight * 11 },
        { id: 'membership', start: viewportHeight * 11, end: Infinity }
      ];

      // Détection de section avec tolérance
      const currentSection = sections.find(section =>
        scrollPosition >= section.start - 50 && scrollPosition < section.end - 50
      );

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Throttle pour optimiser les performances
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
  }, [isScrolled, activeSection]);

  // Fonction pour générer les classes d'animation
  const getSectionClasses = (sectionId, baseClasses = "") => {
    const isVisible = visibleSections.has(sectionId);
    const animationClasses = isVisible 
      ? "opacity-100 translate-y-0 scale-100" 
      : "opacity-0 translate-y-12 scale-95";
    
    return `${baseClasses} transition-all duration-1000 ease-out transform ${animationClasses}`;
  };

  return (
    <div className="text-center relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest font-rajdhani text-white overflow-x-hidden">
      <CodeBackground />
      <Navigation showHeaderLogo={showHeaderLogo} activeSection={activeSection} />
      
      <div className="relative z-[2]">
        {/* Home Section - toujours visible */}
        <div 
          ref={sectionRefs.home}
          data-section="home"
          className={getSectionClasses('home')}
        >
          <HomeSection isScrolled={isScrolled} />
        </div>

        {/* About Section */}
        <div 
          ref={sectionRefs.about}
          data-section="about"
          className={getSectionClasses('about')}
        >
          <AboutSection />
        </div>

        {/* Activities Section */}
        <div 
          ref={sectionRefs.activities}
          data-section="activities"
          className={getSectionClasses('activities')}
        >
          <ActivitiesSection />
        </div>

        {/* Events Section */}
        <div 
          ref={sectionRefs.events}
          data-section="events"
          className={getSectionClasses('events')}
        >
          <EventsSection />
        </div>

        {/* Contact Section */}
        <div 
          ref={sectionRefs.contact}
          data-section="contact"
          className={getSectionClasses('contact')}
        >
          <ContactSection />
        </div>

        {/* Membership Section */}
        <div 
          ref={sectionRefs.membership}
          data-section="membership"
          className={getSectionClasses('membership')}
        >
          <MembershipSection />
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="fixed bottom-8 right-8 z-[90]">
        <div className="w-1 h-20 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-t from-cyber-blue to-cyan-400 transition-all duration-300 ease-out"
            style={{
              height: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;