import React from "react";
import Logo from "../components/Logo";
import Typewriter from "../components/Typewriter";
import ScrollIndicator from "../components/ScrollIndicator";

const HomeSection = ({ isScrolled }) => {
  const handleScrollToAbout = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight, // Scroll direct vers AboutSection
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center" id="home-section">
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
        {/* Logo principal */}
        <div className="mb-8 lg:mb-12">
          <Logo isScrolled={isScrolled} />
        </div>

        {/* Contenu principal */}
        <div className="text-center space-y-8 lg:space-y-12 max-w-5xl mx-auto">
          {/* Titre principal avec animation améliorée */}
          <h1 className="
            font-orbitron font-black text-3xl md:text-5xl lg:text-6xl xl:text-7xl
            bg-gradient-to-r from-white via-cyber-blue to-cyan-400
            bg-clip-text text-transparent
            tracking-wide leading-tight
            animate-fade-in-up
          "
          style={{
            textShadow: '0 0 30px rgba(0, 170, 255, 0.5)',
            animationDelay: '0.5s',
            animationFillMode: 'both'
          }}>
            WHERE INNOVATION<br />
            MEETS APPLICATION
          </h1>
          
          {/* Sous-titre avec typewriter */}
          <div className="flex items-center justify-center gap-4 flex-wrap px-4">
            <span className="
              font-fira text-xl md:text-2xl lg:text-3xl font-bold text-cyber-blue
              animate-pulse
            "
            style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
              &lt;/&gt;
            </span>
            
            <div className="flex-1 max-w-3xl">
              <Typewriter
                text="A space for curious minds to explore, build, and turn ideas into real-world impact through technology."
                speed={70}
                startDelay={2000}
              />
            </div>
            
            <span className="
              font-fira text-xl md:text-2xl lg:text-3xl font-bold text-cyber-blue
              animate-pulse
            "
            style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
              &lt;/&gt;
            </span>
          </div>

          {/* Informations supplémentaires */}
          <div className="
            flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8
            text-sm md:text-base font-rajdhani text-white/70
            animate-fade-in-up
          "
          style={{
            animationDelay: '4s',
            animationFillMode: 'both'
          }}>
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-cyber-blue/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>EST. 2013</span>
            </div>
            
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-cyan-400/20">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>ENSA EL JADIDA</span>
            </div>
            
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-purple-400/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>TECH & INNOVATION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator 
        onClick={handleScrollToAbout}
        text="Discover Our Story"
      />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomeSection;