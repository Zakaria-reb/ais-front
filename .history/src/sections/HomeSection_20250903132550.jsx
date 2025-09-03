import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Typewriter from "../components/Typewriter";
import ScrollIndicator from "../components/ScrollIndicator";

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
    <div className="relative">
      {/* Hero View */}
      <div className={`
        fixed inset-0 z-10 flex items-center justify-center
        transition-all duration-500 ease-in-out
        ${currentView === 0 && !isTransitioning 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
        }
        ${isTransitioning ? 'transition-opacity duration-200' : ''}
      `}>
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12">
          <div className="w-full max-w-6xl flex flex-col items-center justify-center space-y-8">
            <Logo isScrolled={isScrolled} />
            
            <div className="text-center space-y-6 md:space-y-8">
              <h1 className="
                font-orbitron font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl
                leading-tight tracking-wider
                bg-gradient-to-r from-cyber-blue via-white to-cyan-400 
                bg-clip-text text-transparent
                drop-shadow-2xl
                animate-glow
              ">
                WHERE INNOVATION<br />
                MEETS APPLICATION
              </h1>
              
              <div className="
                flex items-center justify-center space-x-4
                text-lg md:text-xl lg:text-2xl
                font-jetbrains text-gray-300
                max-w-4xl mx-auto
              ">
                <span className="text-cyber-blue font-bold animate-pulse">&lt;/&gt;</span>
                <div className="flex-1 text-center">
                  <Typewriter
                    text="A space for curious minds to explore, build, and turn ideas into real-world impact."
                    speed={80}
                    startDelay={1500}
                  />
                </div>
                <span className="text-cyber-blue font-bold animate-pulse">&lt;/&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internal About View - This is just a preview/teaser */}
      <div className={`
        fixed inset-0 z-10 flex items-center justify-center
        transition-all duration-500 ease-in-out
        ${currentView === 1 && !isTransitioning 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
        }
        ${isTransitioning ? 'transition-opacity duration-200' : ''}
      `}>
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12">
          <div className="w-full max-w-7xl flex flex-col items-center justify-center space-y-12">
            <div className="text-center space-y-8">
              <h2 className="
                font-orbitron font-bold text-3xl md:text-5xl lg:text-6xl
                leading-tight tracking-wide
                text-white
              ">
                The most dynamic{' '}
                <span className="
                  bg-gradient-to-r from-cyber-blue to-cyan-400 
                  bg-clip-text text-transparent
                  font-black
                ">
                  tech & innovation club
                </span>{' '}
                at ENSA El Jadida.<br />
                Founded in{' '}
                <span className="
                  bg-gradient-to-r from-yellow-400 to-orange-500 
                  bg-clip-text text-transparent
                  font-black
                ">
                  2013
                </span>{' '}
                by future engineers, driven by<br />
                <span className="
                  bg-gradient-to-r from-pink-400 to-purple-500 
                  bg-clip-text text-transparent
                  font-black
                ">
                  passion
                </span>
                ,{' '}
                <span className="
                  bg-gradient-to-r from-green-400 to-blue-500 
                  bg-clip-text text-transparent
                  font-black
                ">
                  teamwork
                </span>
                , and{' '}
                <span className="
                  bg-gradient-to-r from-red-400 to-pink-500 
                  bg-clip-text text-transparent
                  font-black
                ">
                  bold ideas
                </span>
                .
              </h2>
            </div>
            
            {/* Scroll Indicator to the real About section */}
            <div className="mt-16">
              <ScrollIndicator 
                onClick={handleScrollToRealAbout}
                text="Learn More\nAbout Us"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to maintain scroll height */}
      <div className="h-[200vh]"></div>
    </div>
  );
};

export default HomeSection;