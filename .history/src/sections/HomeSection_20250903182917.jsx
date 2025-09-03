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
      top: viewportHeight * 1.7,
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
        <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
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
                font-orbitron font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                bg-gradient-to-r from-white via-cyber-blue to-cyan-400
                bg-clip-text text-transparent
                tracking-wide leading-tight
                mb-6
                relative
              "
              style={{
                textShadow: '0 0 40px rgba(0, 170, 255, 0.6)',
                filter: 'drop-shadow(0 0 20px rgba(0, 170, 255, 0.3))'
              }}>
                WHERE INNOVATION<br />
                MEETS APPLICATION
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