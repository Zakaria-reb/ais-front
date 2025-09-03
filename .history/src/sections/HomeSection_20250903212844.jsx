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
  font-orbitron font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl
  bg-gradient-to-r from-white via-cyber-blue to-cyan-400
  bg-clip-text text-transparent
  tracking-wide leading-tight
  mb-6
  relative
  group
  overflow-hidden
  animate-pulse-glow
"
style={{
  textShadow: '0 0 40px rgba(0, 170, 255, 0.6)',
  filter: 'drop-shadow(0 0 20px rgba(0, 170, 255, 0.3))',
  animation: 'titleGlow 3s ease-in-out infinite alternate, typewriter 4s steps(40) 1s both'
}}>
  {/* Particules flottantes en arrière-plan */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-ping" style={{ animationDelay: '0s' }}></div>
    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-ping" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-ping" style={{ animationDelay: '2s' }}></div>
  </div>
  
  {/* Effet de scan laser */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -skew-x-12 animate-scan"></div>
  
  {/* Bordure holographique */}
  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm rounded-lg"></div>
  
  <span className="relative z-10 inline-block transform transition-all duration-300 group-hover:scale-105">
    WHERE <span className="text-cyan-300 animate-pulse">INNOVATION</span>
    <br />
    <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
      MEETS
    </span> <span className="text-white/90 relative">
      APPLICATION
      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent animate-expand"></div>
    </span>
  </span>

  <style jsx>{`
    @keyframes titleGlow {
      0%, 100% {
        filter: drop-shadow(0 0 20px rgba(0, 170, 255, 0.3)) drop-shadow(0 0 40px rgba(0, 170, 255, 0.1));
      }
      50% {
        filter: drop-shadow(0 0 30px rgba(0, 170, 255, 0.5)) drop-shadow(0 0 60px rgba(0, 170, 255, 0.2));
      }
    }
    
    @keyframes scan {
      0% { transform: translateX(-100%) skewX(-12deg); }
      100% { transform: translateX(200%) skewX(-12deg); }
    }
    
    @keyframes expand {
      0% { width: 0%; }
      100% { width: 100%; }
    }
    
    .animate-scan {
      animation: scan 3s linear infinite;
    }
    
    .animate-expand {
      animation: expand 2s ease-out 1s both;
    }
    
    .animate-pulse-glow {
      animation: titleGlow 3s ease-in-out infinite alternate;
    }
  `}</style>
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