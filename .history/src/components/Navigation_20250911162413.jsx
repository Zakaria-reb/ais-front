import React, { useState } from "react";

const Navigation = ({ showHeaderLogo, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "HOME", id: "home" },
    { label: "ABOUT US", id: "about" },
    { label: "ACTIVITIES", id: "activities" },
    { label: "EVENTS", id: "events" },
    { label: "CONTACT", id: "contact" },
    { label: "MEMBERSHIP", id: "membership" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementTop = element.offsetTop - navHeight;

      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleJoinRedirect = () => (window.location.href = "/inscription");

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className="fixed top-0 left-0 right-0 pt-4 pb-3 z-[100] transition-all duration-500 ease-out"
      style={{
        background: showHeaderLogo
          ? "linear-gradient(135deg, rgba(2,2,8,0.95) 0%, rgba(10,15,28,0.92) 50%, rgba(5,5,16,0.95) 100%)"
          : "transparent",
        backdropFilter: showHeaderLogo ? "blur(16px) saturate(180%)" : "none",
        borderBottom: showHeaderLogo
          ? "1px solid rgba(0, 170, 255, 0.15)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {showHeaderLogo && (
          <a href="/" className="flex items-center gap-2">
            <img
              src="ais_web.png"
              alt="AIS Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-orbitron text-cyber-blue font-bold">AIS</span>
          </a>
        )}

        <ul className="hidden lg:flex gap-6">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`cursor-pointer transition ${
                activeSection === item.id
                  ? "text-cyber-blue font-bold"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <button
          onClick={handleJoinRedirect}
          className="hidden lg:block px-4 py-2 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-400 hover:bg-cyan-500/30 transition"
        >
          JOIN
        </button>

        <button
          onClick={toggleMobileMenu}
          className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1"
        >
          <span
            className={`block h-0.5 bg-cyber-blue transition ${
              isMobileMenuOpen && "rotate-45 translate-y-1.5"
            }`}
          />
          <span
            className={`block h-0.5 bg-cyber-blue transition ${
              isMobileMenuOpen && "opacity-0"
            }`}
          />
          <span
            className={`block h-0.5 bg-cyber-blue transition ${
              isMobileMenuOpen && "-rotate-45 -translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/80 backdrop-blur-md px-6 py-4">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer ${
                  activeSection === item.id
                    ? "text-cyber-blue font-bold"
                    : "text-white/85"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <button
            onClick={handleJoinRedirect}
            className="mt-6 w-full py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-400 rounded"
          >
            JOIN COMMUNITY
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
