<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind Configuration -->
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              'orbitron': ['Orbitron', 'monospace'],
              'rajdhani': ['Rajdhani', 'sans-serif'],
              'jetbrains': ['JetBrains Mono', 'Monaco', 'Menlo', 'monospace'],
              'fira': ['Fira Code', 'Monaco', 'Menlo', 'monospace'],
            },
            colors: {
              'cyber-blue': '#00aaff',
              'cyber-dark': '#020208',
              'cyber-darker': '#0a0f1c',
              'cyber-darkest': '#050510',
            },
            animation: {
              'blink': 'blink 1s infinite',
              'glow': 'glow 3s ease-in-out infinite alternate',
              'bounce-slow': 'bounce 2s ease-in-out infinite',
              'spin-slow': 'spin 20s linear infinite',
              'spin-reverse': 'spin-reverse 15s linear infinite',
              'ring-rotate': 'ring-rotate 10s linear infinite',
              'scan-rotate': 'scan-rotate 3s linear infinite',
              'grid-move': 'grid-move 20s linear infinite',
              'glitch-slide': 'glitch-slide 3s ease-in-out infinite',
            },
            keyframes: {
              blink: {
                '0%, 50%': { opacity: 1 },
                '51%, 100%': { opacity: 0 },
              },
              glow: {
                '0%': { filter: 'drop-shadow(0 0 30px rgba(0, 170, 255, 0.6))' },
                '100%': { filter: 'drop-shadow(0 0 50px rgba(0, 170, 255, 0.9))' },
              },
              'ring-rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
              'scan-rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
              'grid-move': {
                '0%': { transform: 'translate(0, 0)' },
                '100%': { transform: 'translate(50px, 50px)' },
              },
              'glitch-slide': {
                '0%, 90%': { transform: 'translateX(-100%)' },
                '95%': { transform: 'translateX(100%)' },
                '100%': { transform: 'translateX(-100%)' },
              },
              'spin-reverse': {
                '0%': { transform: 'rotate(360deg)' },
                '100%': { transform: 'rotate(0deg)' },
              },
            },
          },
        },
      }
    </script>
    
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>


import React, { useEffect, useState } from "react";
import CodeBackground from "./components/CodeBackground";
import Navigation from "./components/Navigation";
import HomeSection from "./sections/HomeSection";
import AboutSection from "./sections/AboutSection";
import ActivitiesSection from "./sections/ActivitiesSection";
import EventsSection from "./sections/EventsSection";
import ContactSection from "./sections/ContactSection";
import MembershipSection from "./sections/MembershipSection";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollThreshold = viewportHeight * 0.3;

      // Handle logo visibility avec transition plus fluide
      if (scrollPosition > scrollThreshold && !isScrolled) {
        setIsScrolled(true);
        setTimeout(() => setShowHeaderLogo(true), 200);
      } else if (scrollPosition <= scrollThreshold && isScrolled) {
        setShowHeaderLogo(false);
        setTimeout(() => setIsScrolled(false), 200);
      }

      // CORRECTION: Section mapping précis et cohérent
      const sections = [
        { id: 'home', start: 0, end: viewportHeight * 1.7 },
        { id: 'about', start: viewportHeight * 1.7, end: viewportHeight * 2.9 },
        { id: 'activities', start: viewportHeight * 2.9, end: viewportHeight * 3.9 },
        { id: 'events', start: viewportHeight * 3.9, end: viewportHeight * 4.9 },
        { id: 'contact', start: viewportHeight * 4.9, end: viewportHeight * 5.9 },
        { id: 'membership', start: viewportHeight * 5.9, end: Infinity }
      ];

      // Détection de section avec tolérance
      const currentSection = sections.find(section =>
        scrollPosition >= section.start - 50 && scrollPosition < section.end - 50
      );

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Throttle pour optimiser les performances
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [isScrolled, activeSection]);

  return (
    <div className="text-center relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest font-rajdhani text-white overflow-x-hidden">
      <CodeBackground />
      <Navigation showHeaderLogo={showHeaderLogo} activeSection={activeSection} />
      
      <div className="relative z-[2]">
        <HomeSection isScrolled={isScrolled} />
        <AboutSection />
        <ActivitiesSection />
        <EventsSection />
        <ContactSection />
        <MembershipSection />
      </div>
      
      {/* Progress indicator */}
      <div className="fixed bottom-8 right-8 z-[90]">
        <div className="w-1 h-20 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-t from-cyber-blue to-cyan-400 transition-all duration-300 ease-out"
            style={{ 
              height: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;


import React from "react";

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

export default Logo;


import React, { useEffect, useRef } from "react";

const CodeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Code blocks for floating effect
    const codeBlocks = [
      {
        lines: [
          "function InitMemberPortal() {",
          '    $("#banner").hover(',
          "        function() { changeTabStyle(this, 4, 3); },",
          "        function() { changeTabStyle(this, 6, 1); }",
          "    );",
          "}"
        ],
        language: "javascript",
      },
      {
        lines: [
          "class AppinSciencesClub:",
          '    def __init__(self, name="Innovation Hub"):',
          "        self.members = []",
          "        self.projects = []",
          "        self.events = []",
          "    ",
          "    def add_member(self, member):",
          "        self.members.append(member)",
          '        print(f"Welcome {member.name}!")',
        ],
        language: "python",
      },
      {
        lines: [
          "SELECT m.name, m.skills, p.title",
          "FROM club_members m",
          "JOIN projects p ON m.id = p.lead_id",
          "WHERE m.active = 1",
          "ORDER BY p.created_date DESC;",
        ],
        language: "sql",
      },
      {
        lines: [
          '<script src="https://code.jquery.js" language="javascript">',
          '<script language="JavaScript" src="template.js">',
          '<script language="JavaScript" type="text/javascript">',
        ],
        language: "html",
      },
      {
        lines: [
          "public class InnovationTracker {",
          "    private List<Project> activeProjects;",
          "    ",
          "    public void trackProgress(int projectId) {",
          '        System.out.println("Tracking innovation...");',
          "        updateProjectStatus(projectId);",
          "    }",
          "}",
        ],
        language: "java",
      },
      {
        lines: [
          "function changeTabStyle(input, count, suffix) {",
          '    var filename = $(input).attr("src");',
          '    filename = "img/" + filename + suffix + ".jpg";',
          '    $(input).attr("src", filename);',
          "}",
        ],
        language: "javascript",
      },
      {
        lines: [
          "#!/bin/bash",
          'echo "AppinSciences deployment started"',
          "docker-compose up -d appinsciences-web",
          "kubectl apply -f club-deployment.yaml",
          'echo "Innovation platform is live!"',
        ],
        language: "bash",
      },
      {
        lines: [
          "import numpy as np",
          "import pandas as pd",
          "from sklearn.cluster import KMeans",
          "",
          "def analyze_member_skills(data):",
          '    skills_matrix = pd.get_dummies(data["skills"])',
          "    kmeans = KMeans(n_clusters=3)",
          "    clusters = kmeans.fit_predict(skills_matrix)",
          "    return clusters",
        ],
        language: "python",
      },
      {
        lines: [
          "CREATE TABLE innovation_projects (",
          "    id INT PRIMARY KEY AUTO_INCREMENT,",
          "    title VARCHAR(200) NOT NULL,",
          "    description TEXT,",
          "    tech_stack JSON,",
          '    status ENUM("planning", "development", "completed"),',
          "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
          ");",
        ],
        language: "sql",
      },
      {
        lines: [
          'const express = require("express");',
          "const app = express();",
          "",
          'app.get("/api/members", (req, res) => {',
          "    res.json({",
          '        club: "AppinSciences",',
          "        members: getMemberList(),",
          '        motto: "Where Innovation Meets Application"',
          "    });",
          "});",
        ],
        language: "javascript",
      },
    ];

    const floatingBlocks = [];

    for (let i = 0; i < 8; i++) {
      const block = codeBlocks[Math.floor(Math.random() * codeBlocks.length)];
      floatingBlocks.push({
        block: block,
        x: Math.random() * (canvas.width - 400),
        y: Math.random() * canvas.height + 200,
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.15 + Math.random() * 0.25,
        maxWidth: 350 + Math.random() * 100,
      });
    }

    const animate = () => {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(2, 2, 8, 0.95)");
      gradient.addColorStop(0.5, "rgba(10, 15, 28, 0.9)");
      gradient.addColorStop(1, "rgba(5, 5, 16, 0.95)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      floatingBlocks.forEach((item) => {
        const lineHeight = 18;
        const fontSize = 13;

        ctx.font = `${fontSize}px "Monaco", "Menlo", "Ubuntu Mono", monospace`;

        item.block.lines.forEach((line, lineIndex) => {
          const yPos = item.y + lineIndex * lineHeight;

          if (yPos < -lineHeight || yPos > canvas.height + lineHeight) return;

          let color = `rgba(100, 150, 255, ${item.opacity})`;

          if (line.includes("function") || line.includes("def") || line.includes("class")) {
            color = `rgba(255, 200, 100, ${item.opacity})`;
          } else if (line.includes("//") || line.includes("#") || line.includes("/*")) {
            color = `rgba(120, 120, 120, ${item.opacity})`;
          } else if (line.includes('"') || line.includes("'")) {
            color = `rgba(150, 255, 150, ${item.opacity})`;
          } else if (line.includes("SELECT") || line.includes("FROM") || line.includes("WHERE")) {
            color = `rgba(255, 150, 200, ${item.opacity})`;
          } else if (line.includes("AppinSciences") || line.includes("Innovation")) {
            color = `rgba(0, 200, 255, ${item.opacity + 0.1})`;
          }

          ctx.fillStyle = color;
          ctx.fillText(line, item.x, yPos);
        });

        item.y -= item.speed;

        if (item.y < -item.block.lines.length * lineHeight - 100) {
          item.y = canvas.height + 100;
          item.x = Math.random() * (canvas.width - item.maxWidth);
          item.block = codeBlocks[Math.floor(Math.random() * codeBlocks.length)];
          item.opacity = 0.15 + Math.random() * 0.25;
          item.speed = 0.3 + Math.random() * 0.7;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-screen h-screen z-[1] pointer-events-none"
    />
  );
};

export default CodeBackground;


import React from "react";

const ScrollIndicator = ({
  onClick,
  text = "Scroll Down to Learn\nMore About Us"
}) => (
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

export default ScrollIndicator;


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
        scrollTarget = viewportHeight * 1.8; // Correspond à App.js
        break;
      case 'activities':
        scrollTarget = viewportHeight * 3; // Correspond à App.js
        break;
      case 'events':
        scrollTarget = viewportHeight * 4; // Correspond à App.js
        break;
      case 'contact':
        scrollTarget = viewportHeight * 5; // Correspond à App.js
        break;
      case 'membership':
        scrollTarget = viewportHeight * 6; // Correspond à App.js
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
        {/* Header Logo - Amélioré */}
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
            {/* Cercle lumineux autour du logo */}
            {showHeaderLogo && (
              <div className="absolute inset-0 w-16 h-16 rounded-full border border-cyber-blue/30 animate-spin-slow"></div>
            )}
          </div>
        </div>

        {/* Navigation Menu - Style amélioré */}
        <ul className="flex justify-center gap-12 list-none flex-wrap">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`relative group font-orbitron text-xs font-semibold tracking-[2.5px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-110 ${
                activeSection === item.id 
                  ? 'text-cyber-blue scale-110' 
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
              
              {/* Effet de survol */}
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
              
              {/* Points de navigation */}
              <div className="absolute top-1/2 -left-6 w-1 h-1 bg-cyber-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ transform: 'translateY(-50%)', boxShadow: '0 0 6px rgba(0, 170, 255, 0.4)' }}></div>
            </li>
          ))}
        </ul>
        
        {/* Indicateur de section actuelle */}
        {showHeaderLogo && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="text-xs font-fira text-cyber-blue/80 tracking-wider">
              [{activeSection.toUpperCase()}]
            </div>
          </div>
        )}
      </div>

      {/* Particules flottantes améliorées */}
      {showHeaderLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full animate-pulse"
              style={{ 
                left: `${20 + (i * 12)}%`,
                top: `${30 + Math.sin(i) * 40}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 10px rgba(0, 170, 255, 0.6)',
                opacity: 0.3 + (i * 0.1)
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-12px) scale(1.2); 
            opacity: 0.8;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;import React from "react";

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
        scrollTarget = viewportHeight * 1.8; // Correspond à App.js
        break;
      case 'activities':
        scrollTarget = viewportHeight * 3; // Correspond à App.js
        break;
      case 'events':
        scrollTarget = viewportHeight * 4; // Correspond à App.js
        break;
      case 'contact':
        scrollTarget = viewportHeight * 5; // Correspond à App.js
        break;
      case 'membership':
        scrollTarget = viewportHeight * 6; // Correspond à App.js
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
        {/* Header Logo - Amélioré */}
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
            {/* Cercle lumineux autour du logo */}
            {showHeaderLogo && (
              <div className="absolute inset-0 w-16 h-16 rounded-full border border-cyber-blue/30 animate-spin-slow"></div>
            )}
          </div>
        </div>

        {/* Navigation Menu - Style amélioré */}
        <ul className="flex justify-center gap-12 list-none flex-wrap">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`relative group font-orbitron text-xs font-semibold tracking-[2.5px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-110 ${
                activeSection === item.id 
                  ? 'text-cyber-blue scale-110' 
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
              
              {/* Effet de survol */}
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
              
              {/* Points de navigation */}
              <div className="absolute top-1/2 -left-6 w-1 h-1 bg-cyber-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ transform: 'translateY(-50%)', boxShadow: '0 0 6px rgba(0, 170, 255, 0.4)' }}></div>
            </li>
          ))}
        </ul>
        
        {/* Indicateur de section actuelle */}
        {showHeaderLogo && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="text-xs font-fira text-cyber-blue/80 tracking-wider">
              [{activeSection.toUpperCase()}]
            </div>
          </div>
        )}
      </div>

      {/* Particules flottantes améliorées */}
      {showHeaderLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full animate-pulse"
              style={{ 
                left: `${20 + (i * 12)}%`,
                top: `${30 + Math.sin(i) * 40}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 10px rgba(0, 170, 255, 0.6)',
                opacity: 0.3 + (i * 0.1)
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-12px) scale(1.2); 
            opacity: 0.8;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;import React from "react";

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
        scrollTarget = viewportHeight * 1.8; // Correspond à App.js
        break;
      case 'activities':
        scrollTarget = viewportHeight * 3; // Correspond à App.js
        break;
      case 'events':
        scrollTarget = viewportHeight * 4; // Correspond à App.js
        break;
      case 'contact':
        scrollTarget = viewportHeight * 5; // Correspond à App.js
        break;
      case 'membership':
        scrollTarget = viewportHeight * 6; // Correspond à App.js
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
        {/* Header Logo - Amélioré */}
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
            {/* Cercle lumineux autour du logo */}
            {showHeaderLogo && (
              <div className="absolute inset-0 w-16 h-16 rounded-full border border-cyber-blue/30 animate-spin-slow"></div>
            )}
          </div>
        </div>

        {/* Navigation Menu - Style amélioré */}
        <ul className="flex justify-center gap-12 list-none flex-wrap">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`relative group font-orbitron text-xs font-semibold tracking-[2.5px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-110 ${
                activeSection === item.id 
                  ? 'text-cyber-blue scale-110' 
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
              
              {/* Effet de survol */}
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
              
              {/* Points de navigation */}
              <div className="absolute top-1/2 -left-6 w-1 h-1 bg-cyber-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ transform: 'translateY(-50%)', boxShadow: '0 0 6px rgba(0, 170, 255, 0.4)' }}></div>
            </li>
          ))}
        </ul>
        
        {/* Indicateur de section actuelle */}
        {showHeaderLogo && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="text-xs font-fira text-cyber-blue/80 tracking-wider">
              [{activeSection.toUpperCase()}]
            </div>
          </div>
        )}
      </div>

      {/* Particules flottantes améliorées */}
      {showHeaderLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full animate-pulse"
              style={{ 
                left: `${20 + (i * 12)}%`,
                top: `${30 + Math.sin(i) * 40}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 10px rgba(0, 170, 255, 0.6)',
                opacity: 0.3 + (i * 0.1)
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-12px) scale(1.2); 
            opacity: 0.8;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;import React from "react";

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
        scrollTarget = viewportHeight * 1.8; // Correspond à App.js
        break;
      case 'activities':
        scrollTarget = viewportHeight * 3; // Correspond à App.js
        break;
      case 'events':
        scrollTarget = viewportHeight * 4; // Correspond à App.js
        break;
      case 'contact':
        scrollTarget = viewportHeight * 5; // Correspond à App.js
        break;
      case 'membership':
        scrollTarget = viewportHeight * 6; // Correspond à App.js
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
        {/* Header Logo - Amélioré */}
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
            {/* Cercle lumineux autour du logo */}
            {showHeaderLogo && (
              <div className="absolute inset-0 w-16 h-16 rounded-full border border-cyber-blue/30 animate-spin-slow"></div>
            )}
          </div>
        </div>

        {/* Navigation Menu - Style amélioré */}
        <ul className="flex justify-center gap-12 list-none flex-wrap">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`relative group font-orbitron text-xs font-semibold tracking-[2.5px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-110 ${
                activeSection === item.id 
                  ? 'text-cyber-blue scale-110' 
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
              
              {/* Effet de survol */}
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
              
              {/* Points de navigation */}
              <div className="absolute top-1/2 -left-6 w-1 h-1 bg-cyber-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ transform: 'translateY(-50%)', boxShadow: '0 0 6px rgba(0, 170, 255, 0.4)' }}></div>
            </li>
          ))}
        </ul>
        
        {/* Indicateur de section actuelle */}
        {showHeaderLogo && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="text-xs font-fira text-cyber-blue/80 tracking-wider">
              [{activeSection.toUpperCase()}]
            </div>
          </div>
        )}
      </div>

      {/* Particules flottantes améliorées */}
      {showHeaderLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full animate-pulse"
              style={{ 
                left: `${20 + (i * 12)}%`,
                top: `${30 + Math.sin(i) * 40}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 10px rgba(0, 170, 255, 0.6)',
                opacity: 0.3 + (i * 0.1)
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-12px) scale(1.2); 
            opacity: 0.8;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
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
        scrollTarget = viewportHeight * 1.8; // Correspond à App.js
        break;
      case 'activities':
        scrollTarget = viewportHeight * 3; // Correspond à App.js
        break;
      case 'events':
        scrollTarget = viewportHeight * 4; // Correspond à App.js
        break;
      case 'contact':
        scrollTarget = viewportHeight * 5; // Correspond à App.js
        break;
      case 'membership':
        scrollTarget = viewportHeight * 6; // Correspond à App.js
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
        {/* Header Logo - Amélioré */}
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
            {/* Cercle lumineux autour du logo */}
            {showHeaderLogo && (
              <div className="absolute inset-0 w-16 h-16 rounded-full border border-cyber-blue/30 animate-spin-slow"></div>
            )}
          </div>
        </div>

        {/* Navigation Menu - Style amélioré */}
        <ul className="flex justify-center gap-12 list-none flex-wrap">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`relative group font-orbitron text-xs font-semibold tracking-[2.5px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-110 ${
                activeSection === item.id 
                  ? 'text-cyber-blue scale-110' 
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
              
              {/* Effet de survol */}
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
              
              {/* Points de navigation */}
              <div className="absolute top-1/2 -left-6 w-1 h-1 bg-cyber-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ transform: 'translateY(-50%)', boxShadow: '0 0 6px rgba(0, 170, 255, 0.4)' }}></div>
            </li>
          ))}
        </ul>
        
        {/* Indicateur de section actuelle */}
        {showHeaderLogo && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="text-xs font-fira text-cyber-blue/80 tracking-wider">
              [{activeSection.toUpperCase()}]
            </div>
          </div>
        )}
      </div>

      {/* Particules flottantes améliorées */}
      {showHeaderLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full animate-pulse"
              style={{ 
                left: `${20 + (i * 12)}%`,
                top: `${30 + Math.sin(i) * 40}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 10px rgba(0, 170, 255, 0.6)',
                opacity: 0.3 + (i * 0.1)
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-12px) scale(1.2); 
            opacity: 0.8;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;






