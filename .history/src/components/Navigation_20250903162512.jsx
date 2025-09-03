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
    
    switch (sectionId) {
      case 'home':
        scrollTarget = 0;
        break;
      case 'about':
        scrollTarget = viewportHeight * 2;
        break;
      case 'activities':
        scrollTarget = viewportHeight * 4;
        break;
      case 'events':
        scrollTarget = viewportHeight * 5;
        break;
      case 'contact':
        scrollTarget = viewportHeight * 5;
        break;
      case 'membership':
        scrollTarget = viewportHeight * 6;
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
    <nav className="fixed top-0 left-0 right-0 pt-8 pb-4 z-[100] transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
         style={{
           background: showHeaderLogo 
             ? 'linear-gradient(135deg, rgba(4, 5, 13, 0.95) 0%, rgba(4, 5, 13, 0.98) 50%, rgba(4, 5, 13, 0.95) 100%)'
             : 'transparent',
           backdropFilter: showHeaderLogo ? 'blur(10px) saturate(180%)' : 'none',
           borderBottom: showHeaderLogo 
             ? '1px solid rgba(0, 170, 255, 0.2)' 
             : 'none',
           boxShadow: showHeaderLogo 
             ? '0 8px 32px rgba(4, 5, 13, 0.8), 0 0 0 1px rgba(0, 170, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
             : 'none'
         }}>
      {/* Effet de particules magiques */}
      {showHeaderLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"
               style={{ 
                 animation: 'float 4s ease-in-out infinite',
                 boxShadow: '0 0 10px rgba(0, 255, 255, 0.6)'
               }}></div>
          <div className="absolute top-2 right-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse opacity-40"
               style={{ 
                 animation: 'float 6s ease-in-out infinite reverse',
                 boxShadow: '0 0 8px rgba(100, 200, 255, 0.4)'
               }}></div>
          <div className="absolute bottom-1 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50"
               style={{ 
                 animation: 'float 5s ease-in-out infinite',
                 boxShadow: '0 0 12px rgba(200, 100, 255, 0.5)'
               }}></div>
        </div>
      )}

      <div className="flex items-center justify-center relative max-w-[1400px] mx-auto px-8">
        {/* Header Logo */}
        <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 scale-75 transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          showHeaderLogo ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-75'
        }`}>
          <img 
            src="ais_web.png" 
            alt="AppinSciences Logo" 
            className="w-20 h-20 object-contain"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(0, 170, 255, 0.6)) drop-shadow(0 0 30px rgba(0, 170, 255, 0.3))',
              animation: showHeaderLogo ? 'glow 3s ease-in-out infinite alternate' : 'none'
            }}
          />
        </div>

        {/* Navigation Menu */}
        <ul className="flex justify-center gap-16 list-none flex-wrap">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`font-orbitron text-sm font-medium tracking-[2px] cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] relative transform hover:-translate-y-1 hover:scale-105 ${
                activeSection === item.id 
                  ? 'text-cyber-blue scale-105' 
                  : 'text-white/70'
              }`}
              style={{
                textShadow: activeSection === item.id 
                  ? '0 0 10px rgba(0, 170, 255, 0.8), 0 0 20px rgba(0, 170, 255, 0.6), 0 0 30px rgba(0, 170, 255, 0.4)'
                  : '0 0 8px rgba(0, 150, 255, 0.3)'
              }}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={(e) => {
                e.target.style.color = '#00aaff';
                e.target.style.textShadow = '0 0 15px rgba(0, 170, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.target.style.textShadow = '0 0 8px rgba(0, 150, 255, 0.3)';
                }
              }}
            >
              {item.label}
              
              {/* Active Indicator */}
              {activeSection === item.id && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent rounded animate-pulse"
                     style={{
                       boxShadow: '0 0 10px #00aaff, 0 0 20px rgba(0, 170, 255, 0.5)',
                       animation: 'pulse 2s ease-in-out infinite alternate'
                     }}>
                  {/* Side dots */}
                  <div className="absolute top-0 -left-3 w-2 h-1 bg-cyber-blue rounded"
                       style={{ boxShadow: '0 0 8px #00aaff' }}></div>
                  <div className="absolute top-0 -right-3 w-2 h-1 bg-cyber-blue rounded"
                       style={{ boxShadow: '0 0 8px #00aaff' }}></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* CSS personnalisé pour les animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.8;
          }
        }
        
        @keyframes glow {
          0% { 
            filter: drop-shadow(0 0 15px rgba(0, 170, 255, 0.6)) drop-shadow(0 0 30px rgba(0, 170, 255, 0.3));
          }
          100% { 
            filter: drop-shadow(0 0 25px rgba(0, 170, 255, 0.8)) drop-shadow(0 0 50px rgba(0, 170, 255, 0.5));
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;