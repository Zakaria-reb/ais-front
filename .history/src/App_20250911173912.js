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
  const [scrollProgress, setScrollProgress] = useState(0);
  
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
      rootMargin: '-20% 0px -20% 0px', // Réduire la marge pour une détection plus précoce
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9] // Plus de seuils pour une meilleure détection
    };

    const observerCallback = (entries) => {
      // Trier les entrées par leur position dans la page
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          const aRect = a.boundingClientRect;
          const bRect = b.boundingClientRect;
          // Prioriser les sections qui sont plus hautes dans la viewport
          return Math.abs(aRect.top) - Math.abs(bRect.top);
        });

      if (visibleSections.length > 0) {
        const mostVisibleSection = visibleSections.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });
        
        setActiveSection(mostVisibleSection.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Alternative: Détection basée sur le scroll pour plus de précision
  const updateActiveSectionOnScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3; // Point de référence dans le tiers supérieur
    
    const sections = [
      { id: 'home', element: sectionRefs.home.current },
      { id: 'about', element: sectionRefs.about.current },
      { id: 'activities', element: sectionRefs.activities.current },
      { id: 'events', element: sectionRefs.events.current },
      { id: 'contact', element: sectionRefs.contact.current },
      { id: 'membership', element: sectionRefs.membership.current }
    ];

    let currentSection = 'home';

    for (const section of sections) {
      if (section.element) {
        const sectionTop = section.element.offsetTop;
        const sectionBottom = sectionTop + section.element.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
          break;
        }
      }
    }

    setActiveSection(currentSection);
  }, []);

  // Calculate scroll progress
  const calculateScrollProgress = useCallback(() => {
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = documentHeight - windowHeight;
    
    if (maxScroll <= 0) return 0;
    
    return Math.min((scrollPosition / maxScroll) * 100, 100);
  }, []);

  // Optimized scroll handler with debouncing
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollThreshold = viewportHeight * 0.15;

    // Update scroll progress
    setScrollProgress(calculateScrollProgress());

    // Update active section based on scroll position
    updateActiveSectionOnScroll();

    // Update header visibility
    if (scrollPosition > scrollThreshold && !isScrolled) {
      setIsScrolled(true);
      setTimeout(() => setShowHeaderLogo(true), 100);
    } else if (scrollPosition <= scrollThreshold && isScrolled) {
      setShowHeaderLogo(false);
      setTimeout(() => setIsScrolled(false), 100);
    }
  }, [isScrolled, calculateScrollProgress, updateActiveSectionOnScroll]);

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
    window.addEventListener("resize", throttledScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", throttledScroll);
    };
  }, [handleScroll]);

  const sections = [
    { id: 'home', Component: HomeSection, props: { isScrolled } },
    { id: 'about', Component: AboutSection, props: {} },
    { id: 'activities', Component: ActivitiesSection, props: {} },
    { id: 'events', Component: EventsSection, props: {} },
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
        <div className="relative group">
          {/* Progress bar container */}
          <div className="w-1 h-20 bg-black/40 border border-cyber-blue/20 rounded-full overflow-hidden backdrop-blur-sm transition-all duration-300 group-hover:w-1.5 group-hover:bg-black/60">
            <div 
              className="w-full bg-gradient-to-t from-cyber-blue via-cyan-400 to-purple-400 transition-all duration-200 ease-out rounded-full relative"
              style={{
                height: `${scrollProgress}%`,
                boxShadow: '0 0 12px rgba(0, 170, 255, 0.8), 0 0 24px rgba(0, 170, 255, 0.4)'
              }}
            >
              {/* Animated glow effect */}
              <div className="absolute top-0 left-0 w-full h-2 bg-white/30 rounded-full animate-pulse opacity-60"></div>
            </div>
          </div>
          
          {/* Floating indicator */}
          <div 
            className="absolute -left-8 w-6 h-6 border-2 border-cyber-blue/40 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              top: `${Math.max(0, Math.min(scrollProgress, 95))}%`,
              transform: 'translateY(-50%)'
            }}
          >
            <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"
                 style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}>
            </div>
          </div>
          
          {/* Progress text */}
          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-black/80 border border-cyber-blue/30 rounded-lg px-2 py-1 backdrop-blur-sm">
              <span className="font-orbitron text-xs font-semibold text-cyber-blue tracking-wider">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
          
          {/* Section indicators */}
          <div className="absolute -left-3 top-0 h-full flex flex-col justify-between py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {sections.map(({ id }, index) => (
              <div
                key={id}
                className={`w-2 h-2 rounded-full border transition-all duration-300 cursor-pointer hover:scale-125 ${
                  activeSection === id 
                    ? 'bg-cyber-blue border-cyber-blue shadow-[0_0_8px_rgba(0,170,255,0.6)]' 
                    : 'bg-transparent border-cyber-blue/40 hover:bg-cyber-blue/20'
                }`}
                onClick={() => {
                  const element = document.getElementById(id);
                  if (element) {
                    const navHeight = 80;
                    const elementTop = element.offsetTop - navHeight;
                    window.scrollTo({
                      top: elementTop,
                      behavior: 'smooth'
                    });
                  }
                }}
                title={`Go to ${id.charAt(0).toUpperCase() + id.slice(1)} section`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;