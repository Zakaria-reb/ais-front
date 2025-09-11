import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";

// Composant Typewriter intégré et corrigé
const Typewriter = ({ text, speed = 50, startDelay = 0, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted || !text) return;

    const startTimer = setTimeout(() => {
      setHasStarted(true);
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(typeInterval);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay, hasStarted, onComplete]);

  return (
    <span className="font-inter text-lg md:text-xl text-gray-300 leading-relaxed">
      {displayText}
      {!isComplete && (
        <span className="animate-pulse text-cyber-blue ml-1">|</span>
      )}
    </span>
  );
};

const HomeSection = ({ isScrolled }) => {
  const [currentView, setCurrentView] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [typewriterKey, setTypewriterKey] = useState(0); // Pour forcer le reset du typewriter

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
            // Reset typewriter quand on revient à la vue hero
            setTypewriterKey(prev => prev + 1);
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
      {/* Particules d'arrière-plan améliorées */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero View */}
      <div className={`
        fixed inset-0 w-full h-screen z-[5]
        flex flex-col items-center justify-center
        transition-all duration-700 ease-in-out
        ${currentView === 0 && !isTransitioning ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
      `}>
        
        <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 pt-20 md:pt-24">
          {/* Logo avec effets améliorés */}
          <div className="mb-12 relative group">
            <Logo isScrolled={isScrolled} />
            
            {/* Anneaux orbitaux améliorés */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] lg:w-80 lg:h-80 border border-cyber-blue/20 rounded-full animate-spin-slow opacity-60"></div>
              <div className="absolute w-[450px] h-[450px] lg:w-96 lg:h-96 border-2 border-dotted border-cyan-400/20 rounded-full animate-spin-reverse opacity-40"></div>
              <div className="absolute w-[500px] h-[500px] lg:w-[420px] lg:h-[420px] border border-dashed border-blue-400/10 rounded-full animate-spin-slow opacity-30"></div>
            </div>

            {/* Effet de pulsation énergétique */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 bg-cyber-blue/5 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Contenu principal amélioré */}
          <div className="text-center space-y-10 max-w-5xl mx-auto relative z-10">
            <div className="relative group">
              <h1 className="
                  font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl
                  bg-gradient-to-r from-white via-cyan-300 to-blue-400
                  bg-clip-text text-transparent
                  tracking-wider leading-tight
                  mb-6
                  relative
                  text-center
                  transition-all duration-300
                  group-hover:scale-105
                "
                style={{
                  textShadow: '0 0 30px rgba(0, 200, 255, 0.6), 0 0 60px rgba(0, 200, 255, 0.3)',
                  filter: 'drop-shadow(0 4px 15px rgba(0, 200, 255, 0.4))'
                }}>
                  INNOVATION × APPLICATION
                </h1>
              
              {/* Ligne décorative */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-cyber-blue animate-pulse"></div>
                <div className="w-3 h-3 border-2 border-cyber-blue rounded-full animate-spin"></div>
                <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-cyber-blue animate-pulse"></div>
              </div>
            </div>
            
            {/* Section Typewriter améliorée */}
            <div className="
              relative
              bg-black/30 backdrop-blur-md
              border border-cyber-blue/30 rounded-2xl
              p-8 md:p-10 mx-auto max-w-4xl
              hover:border-cyber-blue/50 transition-all duration-500
              hover:shadow-2xl hover:shadow-cyber-blue/20
              hover:scale-[1.02]
              group
            ">
              {/* Header du terminal */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-600/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="font-fira text-xs text-gray-500">~/innovation-lab</span>
              </div>

              <div className="flex items-start gap-4">
                <span className="
                  font-fira text-2xl md:text-3xl font-bold text-cyber-blue
                  animate-pulse mt-1 flex-shrink-0
                "
                style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
                  &gt;
                </span>
                
                <div className="flex-1 min-h-[2.5rem] flex items-center">
                  <Typewriter
                    key={typewriterKey}
                    text="A space for curious minds to explore, build, and turn ideas into real-world impact."
                    speed={60}
                    startDelay={1500}
                  />
                </div>
              </div>
              
              {/* Barre de statut améliorée */}
              <div className="
                flex items-center justify-center space-x-6
                font-fira text-xs text-gray-400 mt-6 pt-4
                border-t border-gray-600/20
              ">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>STATUS: <span className="text-green-400 font-semibold">ONLINE</span></span>
                </div>
                <span className="text-gray-600">|</span>
                <span>INNOVATORS: <span className="text-cyber-blue font-bold">∞</span></span>
                <span className="text-gray-600">|</span>
                <span>IMPACT: <span className="text-yellow-400 font-bold">LIMITLESS</span></span>
              </div>
            </div>

            {/* Appel à l'action amélioré */}
            <div className="space-y-6 pt-4">
              <button
                onClick={handleScrollToAbout}
                className="
                  group relative
                  inline-flex items-center space-x-4
                  bg-gradient-to-r from-cyber-blue/20 to-cyan-400/20
                  border-2 border-cyber-blue/40 rounded-full
                  px-8 py-4 text-lg
                  hover:from-cyber-blue/30 hover:to-cyan-400/30
                  hover:border-cyber-blue/70
                  hover:shadow-2xl hover:shadow-cyber-blue/30
                  transition-all duration-300
                  transform hover:scale-105 hover:-translate-y-1
                  active:scale-95
                "
              >
                <span className="
                  font-orbitron font-bold tracking-wider
                  text-cyber-blue group-hover:text-cyan-300
                  transition-colors duration-300
                ">
                  INITIALIZE EXPLORATION
                </span>
                <div className="
                  w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px]
                  border-l-transparent border-r-transparent border-t-cyber-blue
                  group-hover:border-t-cyan-300 transition-all duration-300
                  animate-bounce group-hover:animate-none
                  group-hover:translate-x-1
                "></div>
                
                {/* Effet de brillance au survol */}
                <div className="
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  rounded-full opacity-0 group-hover:opacity-100
                  transform translate-x-[-100%] group-hover:translate-x-[100%]
                  transition-all duration-700
                "></div>
              </button>

              {/* Indicateur de scroll */}
              <div className="flex flex-col items-center space-y-2 pt-8">
                <span className="font-fira text-xs text-gray-500 tracking-wider">SCROLL TO DISCOVER</span>
                <div className="flex flex-col space-y-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-cyber-blue/60 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Preview View améliorée */}
      <div className={`
        fixed inset-0 w-full h-screen z-[5]
        flex flex-col items-center justify-center
        transition-all duration-700 ease-in-out
        ${currentView === 1 && !isTransitioning ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-105'}
      `}>
        <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
          {/* Grille animée d'arrière-plan */}
          <div className="
            absolute inset-0 opacity-10
            bg-[linear-gradient(90deg,rgba(0,170,255,0.3)_1px,transparent_1px),linear-gradient(180deg,rgba(0,170,255,0.3)_1px,transparent_1px)]
            bg-[size:40px_40px]
            animate-grid-move
          "></div>

          {/* Contenu de prévisualisation */}
          <div className="text-center space-y-8 max-w-4xl mx-auto z-10">
            <h2 className="
              font-orbitron font-bold text-2xl md:text-3xl
              text-white opacity-80
              tracking-wider
            ">
              ABOUT TO LOAD...
            </h2>
            
            {/* Barre de chargement stylisée */}
            <div className="w-full max-w-md mx-auto">
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyber-blue to-cyan-400 h-2 rounded-full animate-loading-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer pour la hauteur de scroll */}
      <div className="h-[70vh]"></div>
    </div>
  );
};

export default HomeSection;