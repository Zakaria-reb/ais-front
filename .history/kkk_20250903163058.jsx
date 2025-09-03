<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
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
    
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>


///
import React, { useEffect, useState } from "react";
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
    <div className="text-center relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest font-rajdhani text-white overflow-x-hidden">
      <CodeBackground />
      <Navigation showHeaderLogo={showHeaderLogo} activeSection={activeSection} />
      <div className="relative z-[2]">
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

export default App;/
////
import React from "react";

const MembershipSection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="section" id="membership-section">
      <div className="about-content">
        <h2 className="font-orbitron text-6xl font-bold text-cyber-blue text-center mb-12 drop-shadow-[0_0_30px_rgba(0,170,255,0.8)] tracking-[3px]">
          Membership
        </h2>
        <div className="max-w-4xl mx-auto text-center text-xl leading-relaxed text-white/90 font-rajdhani mb-12">
          <p className="mb-8">
            Become part of a vibrant community where innovation thrives and
            ideas become reality. Our membership opens doors to exclusive
            workshops, mentorship programs, and networking opportunities.
          </p>
          <p className="mb-8">
            Whether you're a beginner eager to learn or an experienced developer
            looking to share knowledge, there's a place for you in our community.
          </p>
        </div>
       
        {/* Back to top button */}
        <br />
        <br />
        <div
          className="flex justify-center items-center gap-4 cursor-pointer p-4 rounded-[10px] bg-cyber-blue/10 border border-cyber-blue/30 transition-all duration-300 max-w-[300px] mx-auto hover:bg-cyber-blue/20 hover:-translate-y-0.5"
          onClick={handleScrollToTop}
        >
          <span className="font-orbitron text-sm font-medium tracking-[2px] text-cyber-blue uppercase">
            Back to Top
          </span>
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-cyber-blue drop-shadow-[0_0_5px_rgba(0,170,255,0.6)]"></div>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;

////

import React, { useState, useEffect } from "react";

// Logo Component
const Logo = ({ isScrolled }) => (
  <div className={`flex flex-col items-center gap-4 opacity-100 transform scale-100 transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
    isScrolled ? 'opacity-0 scale-75 pointer-events-none' : ''
  }`}>
    <img
      src="ais_web.png"
      alt="AppinSciences Logo"
      className="w-[425px] h-[425px] lg:w-60 lg:h-60 md:w-52 md:h-52 sm:w-40 sm:h-40 object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] animate-glow"
      style={{
        filter: 'drop-shadow(0 0 30px rgba(0, 170, 255, 0.6))',
        animation: 'glow 3s ease-in-out infinite alternate'
      }}
    />
  </div>
);

// Typewriter Component
const Typewriter = ({ text, speed = 100, startDelay = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const typeTimer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);
          setTimeout(() => setShowCursor(true), 500);
        }
      }, speed);
      return () => clearInterval(typeTimer);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return (
    <div className="relative inline-block">
      <span className="font-fira text-xl lg:text-lg md:text-base sm:text-sm font-normal text-white/90 tracking-wide"
            style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}>
        {displayedText}
        {(isTyping || showCursor) && (
          <span
            className="inline-block bg-cyber-blue w-0.5 h-5 ml-0.5 animate-blink"
            style={{
              boxShadow: '0 0 10px rgba(0, 170, 255, 0.8)',
              animation: 'blink 1s infinite'
            }}
          ></span>
        )}
      </span>
    </div>
  );
};

// ScrollIndicator Component
const ScrollIndicator = ({ onClick, text = "Scroll Down to Learn\nMore About Us" }) => (
  <div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer transition-transform duration-300 hover:scale-110"
    onClick={onClick}
    style={{ animation: 'bounce 2s ease-in-out infinite' }}
  >
    <div className="font-orbitron text-sm lg:text-xs font-medium tracking-[2px] text-white/80 uppercase text-center leading-relaxed"
         style={{ textShadow: '0 0 10px rgba(0, 170, 255, 0.5)' }}>
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
   
    <div className="flex flex-col gap-1 items-center">
      <div
        className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyber-blue opacity-80"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}
      ></div>
      <div
        className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyber-blue opacity-50 transform scale-75"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}
      ></div>
      <div
        className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyber-blue opacity-30 transform scale-50"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}
      ></div>
    </div>
  </div>
);

const HomeSection = ({ isScrolled }) => {
  const [currentView, setCurrentView] = useState(0); // 0 = hero, 1 = about
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle scroll within the home section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // More precise transition points for cleaner switching
      if (scrollPosition < viewportHeight * 0.8) {
        // First 80% of viewport - show hero
        if (currentView !== 0) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentView(0);
            setIsTransitioning(false);
          }, 200);
        }
      } else if (scrollPosition < viewportHeight * 1.8) {
        // From 80% to 180% viewport - show internal about view
        if (currentView !== 1) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentView(1);
            setIsTransitioning(false);
          }, 200);
        }
      } else {
        // Beyond 180% viewport - hide both (transitioning to AboutSection)
        if (currentView !== -1) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentView(-1);
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
      top: viewportHeight,
      behavior: 'smooth'
    });
  };

  const handleScrollToRealAbout = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 2, // Scroll to the actual AboutSection
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-[200vh]">
      {/* Hero View */}
      <div className={`
        fixed inset-0 w-full h-screen
        flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${currentView === 0 && !isTransitioning ? 'opacity-100 visible' : 'opacity-0 invisible'}
        ${isTransitioning ? 'opacity-50' : ''}
      `}>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
          {/* Logo */}
          <div className="mb-8">
            <Logo isScrolled={isScrolled} />
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="
              font-orbitron font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl
              bg-gradient-to-r from-white via-cyber-blue to-cyan-400
              bg-clip-text text-transparent
              tracking-wide leading-tight
              drop-shadow-lg
            "
            style={{
              textShadow: '0 0 30px rgba(0, 170, 255, 0.5)'
            }}>
              WHERE INNOVATION<br />
              MEETS APPLICATION
            </h1>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="
                font-fira text-2xl md:text-3xl font-bold text-cyber-blue
                animate-pulse
              "
              style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
                &lt;/&gt;
              </span>
              <Typewriter
                text="A space for curious minds to explore, build, and turn ideas into real-world impact."
                speed={80}
                startDelay={1500}
              />
              <span className="
                font-fira text-2xl md:text-3xl font-bold text-cyber-blue
                animate-pulse
              "
              style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
                &lt;/&gt;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Internal About View - This is just a preview/teaser */}
      <div className={`
        fixed inset-0 w-full h-screen
        flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${currentView === 1 && !isTransitioning ? 'opacity-100 visible' : 'opacity-0 invisible'}
        ${isTransitioning ? 'opacity-50' : ''}
      `}>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="
              font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              text-white leading-tight mb-8
            "
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}>
              The most dynamic{' '}
              <span className="
                bg-gradient-to-r from-cyber-blue to-cyan-400
                bg-clip-text text-transparent
              "
              style={{ textShadow: '0 0 30px rgba(0, 170, 255, 0.6)' }}>
                tech & innovation club
              </span>{' '}
              at ENSA El Jadida.<br />
              Founded in{' '}
              <span className="
                bg-gradient-to-r from-yellow-400 to-orange-400
                bg-clip-text text-transparent
              ">
                2013
              </span>{' '}
              by future engineers, driven by<br />
              <span className="
                bg-gradient-to-r from-pink-400 to-purple-400
                bg-clip-text text-transparent
              ">
                passion
              </span>
              ,{' '}
              <span className="
                bg-gradient-to-r from-green-400 to-blue-400
                bg-clip-text text-transparent
              ">
                teamwork
              </span>
              , and{' '}
              <span className="
                bg-gradient-to-r from-cyan-400 to-blue-400
                bg-clip-text text-transparent
              ">
                bold ideas
              </span>
              .
            </h2>
          </div>
          
          {/* Scroll Indicator to the real About section */}
          <ScrollIndicator 
            onClick={handleScrollToRealAbout}
            text="Learn More\nAbout Us"
          />
        </div>
      </div>

      {/* Spacer to maintain scroll height */}
      <div className="h-[100vh]"></div>
    </div>
  );
};

export default HomeSection;



import React from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const EventsSection = () => {
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 5, // Scroll to contact section
      behavior: 'smooth'
    });
  };

  return (
    <div className="section" id="events-section">
      <div className="about-content">
        <h2 className="font-orbitron text-6xl font-bold text-cyber-blue text-center mb-12 drop-shadow-[0_0_30px_rgba(0,170,255,0.8)] tracking-[3px]">
          Events
        </h2>
        <div className="max-w-4xl mx-auto text-center text-xl leading-relaxed text-white/90 font-rajdhani">
          <p className="mb-8">
            Experience transformative events that shape the future of technology.
            Our annual conferences, competitions, and showcases bring together
            the brightest minds in tech.
          </p>
          <p className="mb-8">
            Stay tuned for our flagship events including TechFest, Innovation
            Summit, and Demo Day where students present their groundbreaking projects.
          </p>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Get In\nTouch"
      />
    </div>
  );
};

export default EventsSection;


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
        text="Join Our Community"
      />
    </div>
  );
};

export default ContactSection;


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



