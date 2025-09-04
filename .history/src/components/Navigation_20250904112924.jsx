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
    
    // CORRECTION: Points de scroll alignés avec App.js
    switch (sectionId) {
      case 'home':
        scrollTarget = 0;
        break;
      case 'about':
        scrollTarget = viewportHeight * 2.5; // Correspond à App.js
        break;
      case 'activities':
        scrollTarget = viewportHeight *5.5; // Correspond à App.js
        break;
      case 'events':
        scrollTarget = viewportHeight * 6.7; // Correspond à App.js
        break;
      case 'contact':
        scrollTarget = viewportHeight * 9; // Correspond à App.js
        break;
      case 'membership':
        scrollTarget = viewportHeight * 11; // Correspond à App.js
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

      <div className="flex items-center justify-center relative max-w-7xl mx-auto px-8">
        {/* Header Logo - Taille réduite et style cohérent */}
        <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out ${
          showHeaderLogo ? 'opacity-100 visible scale-100 translate-x-0' : 'opacity-0 invisible scale-75 -translate-x-4'
        }`}>
          <div className="relative flex items-center gap-3">
            {/* Logo plus petit */}
            <div className="relative">
              <img 
                src="ais_web.png" 
                alt="AppinSciences Logo" 
                className="w-10 h-10 object-contain relative z-10 transition-all duration-300"
                style={{
                  filter: showHeaderLogo 
                    ? 'drop-shadow(0 0 12px rgba(0, 170, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 170, 255, 0.3))' 
                    : 'none'
                }}
              />
              {/* Cercle lumineux autour du logo - plus petit */}
              {showHeaderLogo && (
                <div className="absolute inset-0 w-10 h-10 rounded-full border border-cyber-blue/25 animate-spin-slow"></div>
              )}
            </div>
            
            {/* Nom du logo cohérent avec le style */}
            <div className="font-orbitron text-sm font-bold tracking-wider text-cyber-blue"
                 style={{
                   textShadow: '0 0 12px rgba(0, 170, 255, 0.8), 0 0 24px rgba(0, 170, 255, 0.4)'
                 }}>
              AIS
            </div>
          </div>
        </div>

        {/* Navigation Menu - Style plus cohérent */}
        <ul className="flex justify-center gap-10 list-none flex-wrap">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`relative group font-orbitron text-xs font-semibold tracking-[2px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:scale-105 ${
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
              <span className="relative z-10 px-2 py-1">{item.label}</span>
              
              {/* Effet de survol plus subtil */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -mx-2 -my-1"></div>
              
              {/* Indicateur actif plus cohérent */}
              {activeSection === item.id && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-pulse"
                       style={{
                         boxShadow: '0 0 12px rgba(0, 170, 255, 0.6)',
                       }}>
                  </div>
                  {/* Points latéraux plus discrets */}
                  <div className="absolute top-0 -left-1 w-0.5 h-0.5 bg-cyber-blue rounded-full"
                       style={{ boxShadow: '0 0 6px rgba(0, 170, 255, 0.5)' }}></div>
                  <div className="absolute top-0 -right-1 w-0.5 h-0.5 bg-cyber-blue rounded-full"
                       style={{ boxShadow: '0 0 6px rgba(0, 170, 255, 0.5)' }}></div>
                </div>
              )}
              
              {/* Points de navigation plus subtils */}
              <div className="absolute top-1/2 -left-4 w-0.5 h-0.5 bg-cyber-blue/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ transform: 'translateY(-50%)', boxShadow: '0 0 4px rgba(0, 170, 255, 0.3)' }}></div>
            </li>
          ))}
        </ul>
        
        {/* Indicateur de section actuelle plus compact */}
        {showHeaderLogo && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="text-xs font-fira text-cyber-blue/70 tracking-wider bg-cyber-blue/5 px-2 py-1 rounded border border-cyber-blue/15"
                 style={{
                   backdropFilter: 'blur(8px)',
                   textShadow: '0 0 8px rgba(0, 170, 255, 0.4)'
                 }}>
              [{activeSection.toUpperCase()}]
            </div>
          </div>
        )}
      </div>

      {/* Particules flottantes plus discrètes */}
      {showHeaderLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      `}</style>
    </nav>
  );
};

export default Navigation;