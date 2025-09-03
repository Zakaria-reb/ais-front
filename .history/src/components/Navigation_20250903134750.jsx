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
        scrollTarget = viewportHeight * 3;
        break;
      case 'events':
        scrollTarget = viewportHeight * 4;
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
    <nav 
      className="fixed top-0 left-0 right-0 pt-8 pb-4 z-[100] transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        background: 'linear-gradient(180deg, rgba(4, 5, 13, 0.95) 0%, rgba(4, 5, 13, 0.85) 50%, rgba(4, 5, 13, 0.7) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(0, 170, 255, 0.1)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        boxShadow: `
          0 8px 32px rgba(4, 5, 13, 0.8),
          0 2px 16px rgba(0, 170, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `
      }}
    >
      {/* Magic shimmer overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 170, 255, 0.03) 50%, transparent)',
          animation: 'shimmer 3s ease-in-out infinite'
        }}
      />
      
      {/* Animated border glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 170, 255, 0.4) 50%, transparent)',
          animation: 'borderGlow 2s ease-in-out infinite alternate'
        }}
      />

      <div className="flex items-center justify-center relative max-w-[1400px] mx-auto px-8">
        {/* Header Logo */}
        <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 scale-75 transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          showHeaderLogo ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-75'
        }`}>
          <img 
            src="ais_web.png" 
            alt="AppinSciences Logo" 
            className="w-20 h-20 object-contain animate-glow"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(0, 170, 255, 0.6))'
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

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes borderGlow {
          0% { opacity: 0.2; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;