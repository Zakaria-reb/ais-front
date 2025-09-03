import React from "react";

const Navigation = ({ showHeaderLogo, activeSection }) => {
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
    
    // Points de scroll cohérents avec App.js
    switch (sectionId) {
      case 'home':
        scrollTarget = 0;
        break;
      case 'about':
        scrollTarget = viewportHeight; // Section about commence à 100vh
        break;
      case 'activities':
        scrollTarget = viewportHeight * 2; // Section activities à 200vh
        break;
      case 'events':
        scrollTarget = viewportHeight * 3; // Section events à 300vh
        break;
      case 'contact':
        scrollTarget = viewportHeight * 4; // Section contact à 400vh
        break;
      case 'membership':
        scrollTarget = viewportHeight * 5; // Section membership à 500vh
        break;
      default:
        scrollTarget = 0;
    }

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 pt-6 pb-4 z-[100] transition-all duration-500 ease-out"
         style={{
           background: showHeaderLogo 
             ? 'linear-gradient(135deg, rgba(2, 2, 8, 0.98) 0%, rgba(10, 15, 28, 0.95) 50%, rgba(5, 5, 16, 0.98) 100%)'
             : 'transparent',
           backdropFilter: showHeaderLogo ? 'blur(12px) saturate(180%)' : 'none',
           borderBottom: showHeaderLogo 
             ? '1px solid rgba(0, 170, 255, 0.25)' 
             : 'none',
           boxShadow: showHeaderLogo 
             ? '0 8px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 170, 255, 0.1)'
             : 'none'
         }}>

      <div className="flex items-center justify-center relative max-w-7xl mx-auto px-8">
        {/* Header Logo - Animation améliorée */}
        <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out ${
          showHeaderLogo ? 'opacity-100 visible scale-100 translate-x-0' : 'opacity-0 invisible scale-75 -translate-x-4'
        }`}>
          <div className="relative">
            <img 
              src="ais_web.png" 
              alt="AppinSciences Logo" 
              className="w-16 h-16 object-contain relative z-10"
              style={{
                filter: showHeaderLogo 
                  ? 'drop-shadow(0 0 20px rgba(0, 170, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 170, 255, 0.4))' 
                  : 'none'
              }}
            />
            {/* Cercle lumineux optimisé */}
            {showHeaderLogo && (
              <div className="absolute inset-0 w-16 h-16 rounded-full border border-cyber-blue/30 animate-spin-slow"></div>
            )}
          </div>
        </div>

        {/* Navigation Menu - Style unifié */}
        <ul className="flex justify-center gap-8 lg:gap-12 list-none flex-wrap">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`relative group font-orbitron text-xs font-semibold tracking-[2.5px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105 ${
                activeSection === item.id 
                  ? 'text-cyber-blue scale-105' 
                  : 'text-white/80 hover:text-white'
              }`}
              style={{
                textShadow: activeSection === item.id 
                  ? '0 0 15px rgba(0, 170, 255, 0.9), 0 0 30px rgba(0, 170, 255, 0.6)'
                  : '0 0 10px rgba(0, 170, 255, 0.2)',
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="relative z-10">{item.label}</span>
              
              {/* Effet de survol optimisé */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -mx-3 -my-2"></div>
              
              {/* Indicateur actif amélioré */}
              {activeSection === item.id && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-pulse"
                       style={{
                         boxShadow: '0 0 15px rgba(0, 170, 255, 0.8)',
                       }}>
                  </div>
                  <div className="absolute top-0 -left-2 w-1 h-0.5 bg-cyber-blue rounded-full"
                       style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
                  <div className="absolute top-0 -right-2 w-1 h-0.5 bg-cyber-blue rounded-full"
                       style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
                </div>
              )}
            </li>
          ))}
        </ul>
        
        {/* Indicateur de section - Performance améliorée */}
        {showHeaderLogo && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="text-xs font-fira text-cyber-blue/80 tracking-wider">
              [{activeSection.toUpperCase()}]
            </div>
          </div>
        )}
      </div>

      {/* Particules flottantes optimisées */}
      {showHeaderLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full"
              style={{ 
                left: `${25 + (i * 15)}%`,
                top: `${40 + Math.sin(i) * 20}%`,
                animation: `float ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)',
                opacity: 0.4 + (i * 0.1)
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-8px) scale(1.1); 
            opacity: 0.8;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;