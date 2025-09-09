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

//</link>


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


import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import ScrollIndicator from "../components/ScrollIndicator";
import Typewriter from "../components/Typewriter";

const HomeSection = ({ isScrolled }) => {
  const [currentView, setCurrentView] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      if (scrollPosition < viewportHeight * 0.8) {
        // Hero view
        if (currentView !== 0) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentView(0);
            setIsTransitioning(false);
          }, 200);
        }
      } else if (scrollPosition < viewportHeight * 1.6) {
        // About preview
        if (currentView !== 1) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentView(1);
            setIsTransitioning(false);
          }, 200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleScrollToAbout = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 1.8,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-[170vh]" id="home">
      {/* Hero View */}
      <div className={`
        fixed inset-0 w-full h-screen z-[5]
        flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${currentView === 0 && !isTransitioning ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        
        <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 pt-20 md:pt-24">
          {/* Enhanced Logo with Cyber Effects */}
          
          <div className="mb-8 relative">
            <Logo isScrolled={isScrolled} />
            
            {/* Orbital Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] lg:w-80 lg:h-80 border border-cyber-blue/20 rounded-full animate-spin-slow"></div>
              <div className="absolute w-[550px] h-[550px] lg:w-96 lg:h-96 border border-cyan-400/10 rounded-full animate-spin-reverse"></div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="text-center space-y-8 max-w-5xl mx-auto relative z-10">
            <div className="relative">
              <h1 className="
                  font-orbitron font-bold text-2xl md:text-3xl lg:text-4xl
                  bg-gradient-to-r from-white via-cyan-300 to-blue-400
                  bg-clip-text text-transparent
                  tracking-wider leading-snug
                  mb-4
                  relative
                  text-center
                  animate-pulse
                "
                style={{
                  textShadow: '0 0 25px rgba(0, 200, 255, 0.8), 0 0 50px rgba(0, 200, 255, 0.4)',
                  filter: 'drop-shadow(0 2px 10px rgba(0, 200, 255, 0.5))'
                }}>
                  INNOVATION × APPLICATION
                </h1>
              
              {/* Glitch overlay effect */}
              <div className="
                absolute inset-0 opacity-0 animate-pulse
                bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent
              "></div>
            </div>
            
            {/* Enhanced Typewriter Section */}
            <div className="
              bg-black/20 backdrop-blur-sm
              border border-cyber-blue/20 rounded-xl
              p-6 md:p-8 mx-auto max-w-4xl
              hover:border-cyber-blue/40 transition-all duration-500
              hover:shadow-2xl hover:shadow-cyber-blue/20
            ">
              <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
                <span className="
                  font-fira text-2xl md:text-3xl font-bold text-cyber-blue
                  animate-pulse
                "
                style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
                  &lt;/&gt;
                </span>
                
                <div className="flex-1 text-center">
                  <Typewriter
                    text="A space for curious minds to explore, build, and turn ideas into real-world impact."
                    speed={60}
                    startDelay={1500}
                  />
                </div>
                
                <span className="
                  font-fira text-2xl md:text-3xl font-bold text-cyber-blue
                  animate-pulse
                "
                style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
                  &lt;/&gt;
                </span>
              </div>
              
              {/* Status bar */}
              <div className="
                flex items-center justify-center space-x-4
                font-fira text-xs text-gray-400 mt-4
              ">
                <span>STATUS: <span className="text-green-400">ACTIVE</span></span>
                <span>|</span>
                <span>MEMBERS: <span className="text-cyber-blue">∞</span></span>
                <span>|</span>
                <span>INNOVATION: <span className="text-yellow-400">∞</span></span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-6">
              <div className="
                inline-flex items-center space-x-3
                bg-gradient-to-r from-cyber-blue/10 to-cyan-400/10
                border border-cyber-blue/30 rounded-full
                px-6 py-3
                hover:from-cyber-blue/20 hover:to-cyan-400/20
                hover:border-cyber-blue/50
                transition-all duration-300
                cursor-pointer group
              "
              onClick={handleScrollToAbout}>
                <span className="
                  font-orbitron text-sm font-semibold tracking-wider
                  text-cyber-blue group-hover:text-cyan-400
                  transition-colors duration-300
                ">
                  INITIALIZE EXPLORATION
                </span>
                <div className="
                  w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px]
                  border-l-transparent border-r-transparent border-t-cyber-blue
                  group-hover:border-t-cyan-400 transition-colors duration-300
                  animate-bounce
                "></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Preview View */}
      <div className={`
        fixed inset-0 w-full h-screen z-[5]
        flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${currentView === 1 && !isTransitioning ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
          {/* Animated Background Grid */}
          <div className="
            absolute inset-0 opacity-5
            bg-[linear-gradient(90deg,rgba(0,170,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(0,170,255,0.1)_1px,transparent_1px)]
            bg-[size:60px_60px]
            animate-grid-move
          "></div>

          
          {/* Enhanced Scroll Indicator */}
          
        </div>
      </div>

      {/* Spacer for scroll height */}
      <div className="h-[70vh]"></div>
    </div>
  );
};

export default HomeSection;

import React, { useState } from "react";

const Navigation = ({ showHeaderLogo, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "HOME", id: "home" },
    { label: "ABOUT US", id: "about" },
    { label: "ACTIVITIES", id: "activities" },
    { label: "EVENTS", id: "events" },
    { label: "CONTACT", id: "contact" },
    { label: "MEMBERSHIP", id: "membership" }
  ];

  const handleNavClick = (sectionId) => {
    const viewportHeight = window.innerHeight;
    let scrollTarget = 0;
    
    switch (sectionId) {
      case 'home':
        scrollTarget = 0;
        break;
      case 'about':
        scrollTarget = viewportHeight * 1.8;
        break;
      case 'activities':
        scrollTarget = viewportHeight * 4.5;
        break;
      case 'events':
        scrollTarget = viewportHeight * 6.7;
        break;
      case 'contact':
        scrollTarget = viewportHeight * 9;
        break;
      case 'membership':
        scrollTarget = viewportHeight * 11;
        break;
      default:
        scrollTarget = 0;
    }

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });

    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 pt-4 pb-3 z-[100] transition-all duration-500 ease-out"
         style={{
           background: showHeaderLogo 
             ? 'linear-gradient(135deg, rgba(2, 2, 8, 0.95) 0%, rgba(10, 15, 28, 0.92) 50%, rgba(5, 5, 16, 0.95) 100%)'
             : 'transparent',
           backdropFilter: showHeaderLogo ? 'blur(16px) saturate(180%)' : 'none',
           borderBottom: showHeaderLogo 
             ? '1px solid rgba(0, 170, 255, 0.15)' 
             : 'none',
           boxShadow: showHeaderLogo 
             ? '0 4px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 170, 255, 0.08)'
             : 'none'
         }}>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Structure différente selon showHeaderLogo */}
        {showHeaderLogo ? (
          // Layout avec logo quand scrolled
          <div className="flex items-center justify-between">
            {/* Header Logo - Responsive sizing */}
            <div className="transition-all duration-500 ease-out opacity-100 visible scale-100 translate-x-0">
              <div className="relative flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <img 
                    src="ais_web.png" 
                    alt="AppinSciences Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain relative z-10 transition-all duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 12px rgba(0, 170, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 170, 255, 0.3))'
                    }}
                  />
                  <div className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-cyber-blue/25 animate-spin-slow"></div>
                </div>
                
                <div className="font-orbitron text-xs sm:text-sm font-bold tracking-wider text-cyber-blue"
                     style={{
                       textShadow: '0 0 12px rgba(0, 170, 255, 0.8), 0 0 24px rgba(0, 170, 255, 0.4)'
                     }}>
                  AIS
                </div>
              </div>
            </div>

            {/* Desktop Navigation Menu - Hidden on mobile */}
            <ul className="hidden lg:flex justify-center gap-6 xl:gap-10 list-none">
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`relative group font-orbitron text-xs font-semibold tracking-[1.5px] xl:tracking-[2px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:scale-105 ${
                    activeSection === item.id 
                      ? 'text-cyber-blue scale-105' 
                      : 'text-white/85 hover:text-white'
                  }`}
                  style={{
                    textShadow: activeSection === item.id 
                      ? '0 0 12px rgba(0, 170, 255, 0.8), 0 0 24px rgba(0, 170, 255, 0.4)'
                      : '0 0 8px rgba(0, 170, 255, 0.15)',
                    animationDelay: `${index * 0.08}s`
                  }}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="relative z-10 px-1 xl:px-2 py-1">{item.label}</span>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -mx-1 xl:-mx-2 -my-1"></div>
                  
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 xl:w-8 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-pulse"
                           style={{ boxShadow: '0 0 12px rgba(0, 170, 255, 0.6)' }}>
                      </div>
                      <div className="absolute top-0 -left-1 w-0.5 h-0.5 bg-cyber-blue rounded-full"
                           style={{ boxShadow: '0 0 6px rgba(0, 170, 255, 0.5)' }}></div>
                      <div className="absolute top-0 -right-1 w-0.5 h-0.5 bg-cyber-blue rounded-full"
                           style={{ boxShadow: '0 0 6px rgba(0, 170, 255, 0.5)' }}></div>
                    </div>
                  )}
                  
                  <div className="absolute top-1/2 -left-3 xl:-left-4 w-0.5 h-0.5 bg-cyber-blue/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ transform: 'translateY(-50%)', boxShadow: '0 0 4px rgba(0, 170, 255, 0.3)' }}></div>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button - Visible only on mobile/tablet */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="relative w-8 h-8 flex flex-col justify-center items-center group"
                aria-label="Toggle mobile menu"
              >
                <div className={`w-6 h-0.5 bg-cyber-blue transition-all duration-300 transform ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
                     style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
                <div className={`w-6 h-0.5 bg-cyber-blue transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
                     style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
                <div className={`w-6 h-0.5 bg-cyber-blue transition-all duration-300 transform mt-1 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
                     style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
              </button>
            </div>

            {/* Desktop Status Indicator */}
            <div className="hidden lg:block">
              <div className="text-xs font-fira text-cyber-blue/70 tracking-wider bg-cyber-blue/5 px-2 py-1 rounded border border-cyber-blue/15"
                   style={{
                     backdropFilter: 'blur(8px)',
                     textShadow: '0 0 8px rgba(0, 170, 255, 0.4)'
                   }}>
                [{activeSection.toUpperCase()}]
              </div>
            </div>
          </div>
        ) : (
          // Layout centré quand pas scrolled
          <div className="flex items-center justify-center relative">
            {/* Desktop Navigation Menu - Centré */}
            <ul className="hidden lg:flex justify-center gap-6 xl:gap-10 list-none">
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`relative group font-orbitron text-xs font-semibold tracking-[1.5px] xl:tracking-[2px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:scale-105 ${
                    activeSection === item.id 
                      ? 'text-cyber-blue scale-105' 
                      : 'text-white/85 hover:text-white'
                  }`}
                  style={{
                    textShadow: activeSection === item.id 
                      ? '0 0 12px rgba(0, 170, 255, 0.8), 0 0 24px rgba(0, 170, 255, 0.4)'
                      : '0 0 8px rgba(0, 170, 255, 0.15)',
                    animationDelay: `${index * 0.08}s`
                  }}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="relative z-10 px-1 xl:px-2 py-1">{item.label}</span>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -mx-1 xl:-mx-2 -my-1"></div>
                  
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 xl:w-8 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-pulse"
                           style={{ boxShadow: '0 0 12px rgba(0, 170, 255, 0.6)' }}>
                      </div>
                      <div className="absolute top-0 -left-1 w-0.5 h-0.5 bg-cyber-blue rounded-full"
                           style={{ boxShadow: '0 0 6px rgba(0, 170, 255, 0.5)' }}></div>
                      <div className="absolute top-0 -right-1 w-0.5 h-0.5 bg-cyber-blue rounded-full"
                           style={{ boxShadow: '0 0 6px rgba(0, 170, 255, 0.5)' }}></div>
                    </div>
                  )}
                  
                  <div className="absolute top-1/2 -left-3 xl:-left-4 w-0.5 h-0.5 bg-cyber-blue/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ transform: 'translateY(-50%)', boxShadow: '0 0 4px rgba(0, 170, 255, 0.3)' }}></div>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button - Position absolue pour centrer le menu */}
            <div className="lg:hidden absolute right-0">
              <button
                onClick={toggleMobileMenu}
                className="relative w-8 h-8 flex flex-col justify-center items-center group"
                aria-label="Toggle mobile menu"
              >
                <div className={`w-6 h-0.5 bg-cyber-blue transition-all duration-300 transform ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
                     style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
                <div className={`w-6 h-0.5 bg-cyber-blue transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
                     style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
                <div className={`w-6 h-0.5 bg-cyber-blue transition-all duration-300 transform mt-1 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
                     style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 transition-all duration-300 ease-out ${
        isMobileMenuOpen 
          ? 'opacity-100 visible pointer-events-auto' 
          : 'opacity-0 invisible pointer-events-none'
      }`}
           style={{ top: '70px' }}>
        
        {/* Background overlay */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isMobileMenuOpen ? 'backdrop-blur-md' : ''
          }`}
          style={{
            background: isMobileMenuOpen 
              ? 'linear-gradient(135deg, rgba(2, 2, 8, 0.95) 0%, rgba(10, 15, 28, 0.92) 50%, rgba(5, 5, 16, 0.95) 100%)'
              : 'transparent'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu Content */}
        <div className={`relative z-10 transition-all duration-300 transform ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-4 opacity-0'
        }`}>
          
          {/* Menu items */}
          <div className="px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`relative group cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 ${
                    activeSection === item.id 
                      ? 'text-cyber-blue' 
                      : 'text-white/85 hover:text-white'
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animation: isMobileMenuOpen ? `slideInFromRight 0.3s ease-out ${index * 0.05}s both` : 'none'
                  }}
                  onClick={() => handleNavClick(item.id)}
                >
                  <div className="bg-black/20 border border-cyber-blue/20 rounded-lg p-4 backdrop-blur-sm hover:border-cyber-blue/40 hover:bg-black/30 transition-all duration-300">
                    
                    {/* Menu item content */}
                    <div className="flex items-center justify-between">
                      <span className="font-orbitron text-sm font-semibold tracking-[2px]"
                            style={{
                              textShadow: activeSection === item.id 
                                ? '0 0 12px rgba(0, 170, 255, 0.8)' 
                                : '0 0 8px rgba(0, 170, 255, 0.2)'
                            }}>
                        {item.label}
                      </span>
                      
                      {/* Active indicator */}
                      {activeSection === item.id && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"
                               style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
                          <span className="font-fira text-xs text-cyber-blue/70 tracking-wider">
                            ACTIVE
                          </span>
                        </div>
                      )}
                      
                      {/* Arrow indicator */}
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-cyber-blue opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Status Footer */}
          <div className="px-4 pb-6">
            <div className="bg-black/30 border border-cyber-blue/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-4 text-xs font-fira">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-cyber-blue">STATUS: <span className="text-green-400">ONLINE</span></span>
                </div>
                <div className="w-px h-4 bg-cyber-blue/30"></div>
                <span className="text-cyber-blue/70">
                  SECTION: <span className="text-cyber-blue">{activeSection.toUpperCase()}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles for desktop */}
      {showHeaderLogo && (
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-cyber-blue rounded-full animate-pulse"
              style={{ 
                left: `${25 + (i * 15)}%`,
                top: `${40 + Math.sin(i) * 20}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
                boxShadow: '0 0 8px rgba(0, 170, 255, 0.4)',
                opacity: 0.2 + (i * 0.1)
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-8px) scale(1.1); 
            opacity: 0.6;
          }
        }
        
        @keyframes slideInFromRight {
          0% {
            transform: translateX(20px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;

