import {Routes,Route} from 'react-router-dom';
import App from './App';

function Main() {

  return (
    <Routes>
        <Route path='/' element={<App />} />
    </Routes>
  )
}

export default Main
import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main.js';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);

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


import React from "react";

const MembershipSection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const membershipBenefits = [
    {
      title: "Exclusive Workshops",
      description: "Access to advanced technical training sessions",
      image: "/img/im1.jpg",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Mentorship Programs",
      description: "One-on-one guidance from industry professionals",
      image: "/img/im2.jpg",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Project Collaboration",
      description: "Work on real-world impactful projects",
      image: "/img/im3.jpg",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Networking Events",
      description: "Connect with tech leaders and innovators",
      image: "/img/im4.jpg",
      color: "from-orange-500 to-red-500"
    }
  ];

  const membershipTiers = [
    {
      title: "STUDENT MEMBER",
      price: "FREE",
      duration: "Academic Year",
      features: [
        "Access to workshops",
        "Club events participation",
        "Basic project collaboration",
        "Community networking"
      ],
      highlight: false,
      color: "border-cyber-blue/30"
    },
    {
      title: "ACTIVE MEMBER",
      price: "25 DH",
      duration: "Per Month",
      features: [
        "All Student benefits",
        "Priority workshop access",
        "Mentorship program",
        "Advanced project roles",
        "Industry networking events"
      ],
      highlight: true,
      color: "border-cyan-400/50"
    },
    {
      title: "PREMIUM MEMBER",
      price: "100 DH",
      duration: "Per Semester",
      features: [
        "All Active benefits",
        "1-on-1 mentoring sessions",
        "Leadership opportunities",
        "Internship referrals",
        "Exclusive tech talks",
        "Certificate programs"
      ],
      highlight: false,
      color: "border-purple-400/30"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="membership-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-24 left-16 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-24 right-20 w-40 h-40 border-2 border-cyber-blue/15 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-cyan-400/25 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-purple-400 bg-purple-400/10 px-4 py-2 rounded-full border border-purple-400/30">
              [MEMBERSHIP_PROTOCOL]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              JOIN THE MOVEMENT
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto mb-16">
          {/* Description */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="font-rajdhani text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              Become part of a vibrant community where innovation thrives and ideas become reality. 
              Our membership opens doors to exclusive workshops, mentorship programs, and networking opportunities.
            </p>
            <p className="font-rajdhani text-base md:text-lg text-white/70 leading-relaxed">
              Whether you're a beginner eager to learn or an experienced developer looking to share knowledge, 
              there's a place for you in our community.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {membershipBenefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-black/40 border border-cyber-blue/20 rounded-xl backdrop-blur-sm hover:border-purple-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-400/20 h-80"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110 transform"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${benefit.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="text-center">
                    <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300 drop-shadow-lg">
                      {benefit.title}
                    </h3>
                    <p className="font-rajdhani text-gray-200 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 drop-shadow-md">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="absolute top-2 left-2 w-6 h-0.5 bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                <div className="absolute top-2 left-2 w-0.5 h-6 bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                <div className="absolute bottom-2 right-2 w-6 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                <div className="absolute bottom-2 right-2 w-0.5 h-6 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              </div>
            ))}
          </div>

          {/* Membership Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                className={`group relative bg-black/40 border-2 ${tier.color} rounded-xl p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${tier.highlight ? 'hover:shadow-cyan-400/30 scale-105' : 'hover:shadow-purple-400/20'}`}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {/* Highlight Badge */}
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-1 rounded-full text-xs font-bold font-orbitron tracking-wider">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className={`font-orbitron text-lg font-bold mb-2 ${tier.highlight ? 'text-cyan-400' : 'text-white'} group-hover:text-purple-400 transition-colors duration-300`}>
                    {tier.title}
                  </h3>
                  <div className="mb-2">
                    <span className={`font-orbitron text-3xl font-bold ${tier.highlight ? 'text-cyan-400' : 'text-white'}`}>
                      {tier.price}
                    </span>
                  </div>
                  <p className="font-rajdhani text-gray-400 text-sm">
                    {tier.duration}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${tier.highlight ? 'bg-cyan-400' : 'bg-purple-400'} flex-shrink-0`}></div>
                      <span className="font-rajdhani text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <div className={`w-full py-3 rounded-lg font-rajdhani font-semibold transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                    tier.highlight 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-lg hover:shadow-cyan-400/30' 
                      : 'border border-purple-400 text-purple-400 hover:bg-purple-400/10'
                  }`}>
                    {tier.price === "FREE" ? "Join Now" : "Choose Plan"}
                  </div>
                </div>

                {/* Tier-specific hover effects */}
                <div className={`absolute top-4 left-4 w-8 h-0.5 ${tier.highlight ? 'bg-cyan-400' : 'bg-purple-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className={`absolute top-4 left-4 w-0.5 h-8 ${tier.highlight ? 'bg-cyan-400' : 'bg-purple-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mb-12">
            <div className="inline-block bg-black/30 border border-purple-400/20 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
                Ready to Transform Your Future?
              </h3>
              <p className="font-rajdhani text-gray-300 mb-6 leading-relaxed max-w-2xl">
                Join hundreds of students who have already started their journey with us. 
                Get access to cutting-edge resources, mentorship, and opportunities that will 
                accelerate your career in technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  Start Your Journey
                </div>
                <div className="border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-lg font-rajdhani font-semibold text-lg hover:bg-purple-400/10 transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  Contact Us
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4 bg-black/30 border border-purple-400/20 rounded-lg px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-fira text-sm text-purple-400">
                  REGISTRATION: <span className="text-green-400">OPEN</span>
                </span>
              </div>
              <div className="w-px h-4 bg-purple-400/30"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-fira text-sm text-purple-400">
                  MEMBERS: <span className="text-blue-400">200+</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center">
          <div
            className="inline-flex items-center justify-center gap-4 cursor-pointer p-6 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 transition-all duration-500 hover:bg-cyber-blue/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyber-blue/30 group"
            onClick={handleScrollToTop}
          >
            <span className="font-orbitron text-lg font-medium tracking-[2px] text-cyber-blue uppercase group-hover:text-cyan-400 transition-colors duration-300">
              Return to Base
            </span>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-cyber-blue group-hover:border-b-cyan-400 transition-colors duration-300"
                   style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}></div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-cyber-blue/70 group-hover:border-b-cyan-400/70 transition-colors duration-300 transform scale-75"
                   style={{ filter: 'drop-shadow(0 0 6px rgba(0, 170, 255, 0.4))' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;


