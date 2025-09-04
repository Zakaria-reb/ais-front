<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/ais_web.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind Configuration -->
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              'orbitron': ['Orbitron', 'monospace'],
              'rajdhani': ['Rajdhani', 'sans-serif'],
              'jetbrains': ['JetBrains Mono', 'Monaco', 'Menlo', 'monospace'],
              'fira': ['Fira Code', 'Monaco', 'Menlo', 'monospace'],
            },
            colors: {
              'cyber-blue': '#00aaff',
              'cyber-dark': '#020208',
              'cyber-darker': '#0a0f1c',
              'cyber-darkest': '#050510',
            },
            animation: {
              'blink': 'blink 1s infinite',
              'glow': 'glow 3s ease-in-out infinite alternate',
              'bounce-slow': 'bounce 2s ease-in-out infinite',
              'spin-slow': 'spin 20s linear infinite',
              'spin-reverse': 'spin-reverse 15s linear infinite',
              'ring-rotate': 'ring-rotate 10s linear infinite',
              'scan-rotate': 'scan-rotate 3s linear infinite',
              'grid-move': 'grid-move 20s linear infinite',
              'glitch-slide': 'glitch-slide 3s ease-in-out infinite',
            },
            keyframes: {
              blink: {
                '0%, 50%': { opacity: 1 },
                '51%, 100%': { opacity: 0 },
              },
              glow: {
                '0%': { filter: 'drop-shadow(0 0 30px rgba(0, 170, 255, 0.6))' },
                '100%': { filter: 'drop-shadow(0 0 50px rgba(0, 170, 255, 0.9))' },
              },
              'ring-rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
              'scan-rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
              'grid-move': {
                '0%': { transform: 'translate(0, 0)' },
                '100%': { transform: 'translate(50px, 50px)' },
              },
              'glitch-slide': {
                '0%, 90%': { transform: 'translateX(-100%)' },
                '95%': { transform: 'translateX(100%)' },
                '100%': { transform: 'translateX(-100%)' },
              },
              'spin-reverse': {
                '0%': { transform: 'rotate(360deg)' },
                '100%': { transform: 'rotate(0deg)' },
              },
            },
          },
        },
      }
    </script>

    <title>AIS Web</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>


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
      rootMargin: '-5% 0px -5% 0px', // Réduit de 10% à 5% pour déclenchement plus précoce
      threshold: [0.05, 0.2, 0.4] // Seuils plus bas pour déclenchement plus rapide
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section');
        
        if (entry.isIntersecting && entry.intersectionRatio >= 0.05) { // Réduit de 0.1 à 0.05
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
      const scrollThreshold = viewportHeight * 0.2; // Réduit de 0.3 à 0.2

      // Handle logo visibility avec transition plus rapide
      if (scrollPosition > scrollThreshold && !isScrolled) {
        setIsScrolled(true);
        setTimeout(() => setShowHeaderLogo(true), 100); // Réduit de 200ms à 100ms
      } else if (scrollPosition <= scrollThreshold && isScrolled) {
        setShowHeaderLogo(false);
        setTimeout(() => setIsScrolled(false), 100); // Réduit de 200ms à 100ms
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

      // Détection de section avec tolérance réduite
      const currentSection = sections.find(section =>
        scrollPosition >= section.start - 25 && scrollPosition < section.end - 25 // Réduit de 50 à 25
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

  // Fonction pour générer les classes d'animation avec durée réduite
  const getSectionClasses = (sectionId, baseClasses = "") => {
    const isVisible = visibleSections.has(sectionId);
    const animationClasses = isVisible 
      ? "opacity-100 translate-y-0 scale-100" 
      : "opacity-0 translate-y-8 scale-98"; // Réduit translate-y de 12 à 8, scale de 95 à 98
    
    return `${baseClasses} transition-all duration-700 ease-out transform ${animationClasses}`; // Réduit de 1000ms à 700ms
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
            className="w-full bg-gradient-to-t from-cyber-blue to-cyan-400 transition-all duration-200 ease-out" // Réduit de 300ms à 200ms
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