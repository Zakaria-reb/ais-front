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



import React, { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 100, startDelay = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const typeTimer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);
          setTimeout(() => setShowCursor(true), 500);
        }
      }, speed);

      return () => clearInterval(typeTimer);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return (
    <div className="relative inline-block">
      <span className="font-fira text-xl lg:text-lg md:text-base sm:text-sm font-normal text-white/90 tracking-wide"
            style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}>
        {displayedText}
        {(isTyping || showCursor) && (
          <span 
            className="inline-block bg-cyber-blue w-0.5 h-5 ml-0.5 animate-blink"
            style={{ 
              boxShadow: '0 0 10px rgba(0, 170, 255, 0.8)',
              animation: 'blink 1s infinite'
            }}
          ></span>
        )}
      </span>
    </div>
  );
};

export default Typewriter;


import React, { useRef, useState, useEffect, useCallback } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const AboutSection = () => {
  const teamScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);
  
  // Momentum scrolling variables
  const momentumRef = useRef({
    lastScrollLeft: 0,
    velocity: 0,
    timestamp: Date.now(),
    animationId: null,
    isDragging: false,
    startX: 0,
    startScrollLeft: 0
  });

  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 3, // Scroll to activities section
      behavior: 'smooth'
    });
  };
    
  // Enhanced scroll position check with smooth transitions
  const checkScrollPosition = useCallback(() => {
    if (teamScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = teamScrollRef.current;
      const tolerance = 10;
      
      setCanScrollLeft(scrollLeft > tolerance);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
      
      // Calculate scroll velocity for visual effects
      const currentTime = Date.now();
      const deltaTime = currentTime - momentumRef.current.timestamp;
      const deltaScroll = scrollLeft - momentumRef.current.lastScrollLeft;
      
      if (deltaTime > 0) {
        const newVelocity = Math.abs(deltaScroll / deltaTime);
        setScrollVelocity(newVelocity);
        
        // Apply velocity-based visual effects
        if (newVelocity > 0.5) {
          teamScrollRef.current.style.filter = `blur(${Math.min(newVelocity * 2, 3)}px)`;
        } else {
          teamScrollRef.current.style.filter = 'blur(0px)';
        }
      }
      
      momentumRef.current.lastScrollLeft = scrollLeft;
      momentumRef.current.timestamp = currentTime;
    }
  }, []);

  // Smooth momentum scrolling with easing
  const scrollTeam = useCallback((direction) => {
    if (!teamScrollRef.current) return;

    const scrollAmount = 320; // Width of team member + gap
    const currentScroll = teamScrollRef.current.scrollLeft;
    const targetScroll = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : currentScroll + scrollAmount;
    
    // Enhanced smooth scrolling with custom easing
    const startScroll = currentScroll;
    const distance = targetScroll - startScroll;
    const startTime = Date.now();
    const duration = 800; // Increased duration for smoother effect
    
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      const currentPosition = startScroll + (distance * easedProgress);
      teamScrollRef.current.scrollLeft = currentPosition;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
        checkScrollPosition();
      }
    };
    
    setIsScrolling(true);
    requestAnimationFrame(animateScroll);
  }, [checkScrollPosition]);

  // Mouse tracking for proximity effects
  const handleMouseMove = useCallback((e) => {
    const rect = teamScrollRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  // Touch/drag momentum scrolling
  const handleMouseDown = useCallback((e) => {
    if (!teamScrollRef.current) return;
    
    momentumRef.current.isDragging = true;
    momentumRef.current.startX = e.pageX - teamScrollRef.current.offsetLeft;
    momentumRef.current.startScrollLeft = teamScrollRef.current.scrollLeft;
    
    teamScrollRef.current.style.cursor = 'grabbing';
    teamScrollRef.current.style.scrollBehavior = 'auto';
    
    e.preventDefault();
  }, []);

  const handleMouseMove2 = useCallback((e) => {
    if (!momentumRef.current.isDragging || !teamScrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - teamScrollRef.current.offsetLeft;
    const walk = (x - momentumRef.current.startX) * 2; // Scroll speed multiplier
    
    const newScrollLeft = momentumRef.current.startScrollLeft - walk;
    teamScrollRef.current.scrollLeft = newScrollLeft;
    
    // Calculate velocity for momentum
    const currentTime = Date.now();
    const deltaTime = currentTime - momentumRef.current.timestamp;
    const deltaScroll = newScrollLeft - momentumRef.current.lastScrollLeft;
    
    if (deltaTime > 0) {
      momentumRef.current.velocity = deltaScroll / deltaTime;
    }
    
    momentumRef.current.lastScrollLeft = newScrollLeft;
    momentumRef.current.timestamp = currentTime;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!momentumRef.current.isDragging || !teamScrollRef.current) return;
    
    momentumRef.current.isDragging = false;
    teamScrollRef.current.style.cursor = 'grab';
    teamScrollRef.current.style.scrollBehavior = 'smooth';
    
    // Apply momentum effect
    const velocity = momentumRef.current.velocity;
    const friction = 0.95;
    const threshold = 0.1;
    
    const applyMomentum = () => {
      if (Math.abs(momentumRef.current.velocity) > threshold && teamScrollRef.current) {
        momentumRef.current.velocity *= friction;
        teamScrollRef.current.scrollLeft -= momentumRef.current.velocity * 10;
        momentumRef.current.animationId = requestAnimationFrame(applyMomentum);
      } else {
        momentumRef.current.velocity = 0;
        if (momentumRef.current.animationId) {
          cancelAnimationFrame(momentumRef.current.animationId);
        }
        checkScrollPosition();
      }
    };
    
    if (Math.abs(velocity) > threshold) {
      applyMomentum();
    }
  }, [checkScrollPosition]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft' && canScrollLeft) {
      e.preventDefault();
      scrollTeam('left');
    } else if (e.key === 'ArrowRight' && canScrollRight) {
      e.preventDefault();
      scrollTeam('right');
    }
  }, [canScrollLeft, canScrollRight, scrollTeam]);

  // Auto-scroll to center focused member
  const snapToNearestMember = useCallback(() => {
    if (!teamScrollRef.current) return;
    
    const scrollContainer = teamScrollRef.current;
    const memberWidth = 320; // Width + gap
    const scrollLeft = scrollContainer.scrollLeft;
    const containerWidth = scrollContainer.clientWidth;
    const centerPosition = scrollLeft + containerWidth / 2;
    
    const nearestMemberIndex = Math.round(centerPosition / memberWidth);
    const targetScroll = nearestMemberIndex * memberWidth - containerWidth / 2 + memberWidth / 2;
    
    scrollContainer.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth'
    });
  }, []);

  // Enhanced scroll event handler
  const handleScroll2 = useCallback(() => {
    checkScrollPosition();
    
    // Debounced snap-to-member on scroll end
    clearTimeout(window.snapTimeout);
    window.snapTimeout = setTimeout(() => {
      if (!momentumRef.current.isDragging && !isScrolling) {
        snapToNearestMember();
      }
    }, 150);
  }, [checkScrollPosition, snapToNearestMember, isScrolling]);

  // Setup event listeners
  useEffect(() => {
    const scrollElement = teamScrollRef.current;
    
    if (scrollElement) {
      // Scroll events
      scrollElement.addEventListener('scroll', handleScroll2);
      
      // Mouse events for drag scrolling
      scrollElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove2);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Mouse tracking for proximity effects
      scrollElement.addEventListener('mousemove', handleMouseMove);
      
      // Keyboard navigation
      scrollElement.addEventListener('keydown', handleKeyDown);
      scrollElement.setAttribute('tabindex', '0'); // Make focusable
      
      // Initial position check
      checkScrollPosition();
      
      // Prevent default drag behavior on images
      scrollElement.style.cursor = 'grab';
      scrollElement.style.userSelect = 'none';
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll2);
        scrollElement.removeEventListener('mousedown', handleMouseDown);
        scrollElement.removeEventListener('mousemove', handleMouseMove);
        scrollElement.removeEventListener('keydown', handleKeyDown);
      }
      
      document.removeEventListener('mousemove', handleMouseMove2);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (momentumRef.current.animationId) {
        cancelAnimationFrame(momentumRef.current.animationId);
      }
      
      clearTimeout(window.snapTimeout);
    };
  }, [handleScroll2, handleMouseDown, handleMouseMove2, handleMouseUp, handleMouseMove, handleKeyDown, checkScrollPosition]);

  return (
    <div className="
      min-h-screen relative
      bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest
      overflow-hidden
    " id="about-section">
      {/* Cyber Grid Background */}
      <div className="
        absolute inset-0 opacity-20
        bg-[linear-gradient(90deg,rgba(0,170,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(0,170,255,0.1)_1px,transparent_1px)]
        bg-[size:50px_50px]
        animate-grid-move
      "></div>
      
      <div className="
        relative z-10 min-h-screen
        flex flex-col lg:flex-row items-center justify-center
        px-6 md:px-12 py-12 lg:py-24
        gap-12 lg:gap-16
      ">
        {/* Left side - Enhanced Image Terminal */}
        <div className="
          w-full max-w-lg lg:max-w-xl
          bg-gradient-to-br from-gray-900/90 to-black/90
          border border-cyber-blue/30
          rounded-lg overflow-hidden
          backdrop-blur-sm
          shadow-2xl shadow-cyber-blue/20
          transform hover:scale-105 transition-all duration-500
          hover:shadow-cyber-blue/40
        ">
          {/* Terminal Header */}
          <div className="
            flex items-center justify-between
            bg-gradient-to-r from-gray-800 to-gray-900
            px-4 py-3 border-b border-cyber-blue/20
          ">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
            <div className="
              font-fira text-xs text-cyber-blue
              bg-black/50 px-3 py-1 rounded
              border border-cyber-blue/30
            ">
              &gt; VISUAL_FEED_01.exe
            </div>
          </div>
          
          {/* Image Container */}
          <div className="relative overflow-hidden group">
            <img 
              src="about_us.jpg" 
              alt="AppinSciences Cyber Division" 
              className="
                w-full h-64 md:h-80 lg:h-96
                object-cover filter
                transition-all duration-700
                group-hover:scale-110 group-hover:brightness-110
              "
            />
            
            {/* Scan Lines Effect */}
            <div className="
              absolute inset-0
              bg-[linear-gradient(transparent_50%,rgba(0,170,255,0.03)_50%)]
              bg-[size:100%_4px]
              animate-scan-rotate
              pointer-events-none
            "></div>
            
            {/* Glitch Overlay */}
            <div className="
              absolute inset-0
              bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent
              translate-x-full animate-glitch-slide
              pointer-events-none
            "></div>
          </div>
          
          {/* Terminal Footer */}
          <div className="
            bg-gradient-to-r from-gray-800 to-gray-900
            px-4 py-3 border-t border-cyber-blue/20
          ">
            <div className="flex items-center justify-between">
              <span className="
                font-fira text-xs text-green-400
                bg-black/50 px-2 py-1 rounded
              ">
                STATUS: CONNECTED
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-1 h-4 bg-cyber-blue rounded-full
                      animate-pulse
                    `}
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      opacity: 1 - (i * 0.2)
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Cyberpunk Data Panel */}
        <div className="
          w-full max-w-2xl
          relative
          bg-gradient-to-br from-gray-900/80 to-black/90
          border border-cyber-blue/40
          rounded-lg p-6 md:p-8
          backdrop-blur-sm
          shadow-2xl shadow-cyber-blue/20
        ">
          {/* Panel Frame Effects */}
          <div className="absolute top-0 left-4 w-16 h-1 bg-gradient-to-r from-cyber-blue to-transparent"></div>
          <div className="absolute top-4 left-0 w-1 h-16 bg-gradient-to-b from-cyber-blue to-transparent"></div>
          <div className="absolute bottom-0 right-4 w-16 h-1 bg-gradient-to-l from-cyan-400 to-transparent"></div>
          <div className="absolute bottom-4 right-0 w-1 h-16 bg-gradient-to-t from-cyan-400 to-transparent"></div>

          {/* Header with glitch effect */}
          <div className="mb-8">
            <div className="relative">
              <h2 className="
                font-orbitron font-black text-2xl md:text-3xl
                bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300
                bg-clip-text text-transparent
                mb-4
                relative
                after:content-['APPINSCIENCES_PROTOCOL']
                after:absolute after:top-0 after:left-0
                after:text-cyber-blue/20 after:animate-pulse
                after:transform after:translate-x-0.5 after:translate-y-0.5
              ">
                APPINSCIENCES_PROTOCOL
              </h2>
            </div>
            
            {/* Data Stream */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 h-px bg-gradient-to-r from-cyber-blue to-transparent"></div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse"
                    style={{animationDelay: `${i * 0.2}s`}}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Main data content */}
          <div className="space-y-6">
            {/* Foundation Block */}
            <div className="
              bg-black/30 border border-cyber-blue/20
              rounded-lg p-6
              hover:border-cyber-blue/40 transition-colors duration-300
            ">
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-fira text-xs text-yellow-400
                  bg-yellow-400/10 px-2 py-1 rounded
                ">
                  [2013.INIT]
                </span>
                <span className="
                  font-fira text-xs text-cyber-blue
                  bg-cyber-blue/10 px-2 py-1 rounded
                ">
                  FOUNDATION_PROTOCOL
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
              ">
                ESTABLISHED IN 2013 AT ENSA EL JADIDA, APP IN 
                SCIENCES REPRESENTS A{' '}
                <span className="text-cyan-400 font-semibold">BOLD COMMITMENT</span>{' '}
                TO INNOVATION, CREATIVITY, AND STUDENT EMPOWERMENT.
              </p>
            </div>

            {/* Evolution Block */}
            <div className="
              bg-black/30 border border-cyber-blue/20
              rounded-lg p-6
              hover:border-cyber-blue/40 transition-colors duration-300
            ">
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-fira text-xs text-purple-400
                  bg-purple-400/10 px-2 py-1 rounded
                ">
                  [EVOLUTION.LOG]
                </span>
                <span className="
                  font-fira text-xs text-cyber-blue
                  bg-cyber-blue/10 px-2 py-1 rounded
                ">
                  GROWTH_MATRIX
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
              ">
                WHAT STARTED AS A{' '}
                <span className="text-pink-400 font-semibold">SHARED DESIRE</span>{' '}
                TO MAKE STUDENT LIFE MORE DYNAMIC HAS GROWN INTO A POWERHOUSE OF 
                PASSIONATE ENGINEERS DEDICATED TO{' '}
                <span className="text-cyan-400 font-semibold">TURNING IDEAS INTO 
                REAL-WORLD IMPACT</span> THROUGH TECH.
              </p>
            </div>

            {/* Core System Block */}
            <div className="
              bg-black/30 border border-cyber-blue/20
              rounded-lg p-6
              hover:border-cyber-blue/40 transition-colors duration-300
            ">
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-fira text-xs text-green-400
                  bg-green-400/10 px-2 py-1 rounded
                ">
                  [CORE.SYSTEM]
                </span>
                <span className="
                  font-fira text-xs text-cyber-blue
                  bg-cyber-blue/10 px-2 py-1 rounded
                ">
                  PRIMARY_DIRECTIVES
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
              ">
                AT THE HEART OF OUR CLUB ARE{' '}
                <span className="text-yellow-400 font-semibold">CREATIVE MINDS</span>{' '}
                AND COLLABORATIVE SPIRITS—DRIVING{' '}
                <span className="text-cyan-400 font-semibold">IMPACTFUL 
                PROJECTS</span>, ORGANIZING NATIONAL-SCALE EVENTS, AND 
                DELIVERING VALUE BEYOND THE CLASSROOM.
              </p>
            </div>
          </div>

          {/* Footer with system info */}
          <div className="mt-8 pt-6 border-t border-cyber-blue/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-xs font-fira">
                <span className="text-gray-400">SYS_VER: 11.2.3</span>
                <span className="text-gray-400">UPTIME: ∞</span>
                <span className="text-gray-400">
                  STATUS: <span className="text-green-400">ACTIVE</span>
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="
                h-full bg-gradient-to-r from-cyber-blue to-cyan-400
                w-full animate-pulse
                shadow-lg shadow-cyber-blue/50
              "></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Executive Team Section */}
      <div className="relative z-10 py-16 md:py-24 px-6 md:px-12">
        {/* Team Header */}
        <div className="text-center mb-16">
          <h2 className="
            font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl
            bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300
            bg-clip-text text-transparent
            mb-4
          ">
            MEET THE EXECUTIVE TEAM OF 2025-2026
          </h2>
        </div>

        {/* Enhanced Horizontal Scroll Container */}
        <div className="relative">
          <div className="
            overflow-x-auto scrollbar-hide
            pb-6
          " 
          ref={teamScrollRef}
          style={{
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`,
            '--scroll-velocity': scrollVelocity
          }}>
            <div className="flex space-x-8 min-w-max px-8">
              {/* Core Leadership */}
              {[
                { role: "President", img: "president.jpg", name: "[NAME_TO_BE_SET]" },
                { role: "Vice President", img: "vice-president.jpg", name: "[NAME_TO_BE_SET]" },
                { role: "General Secretary", img: "general-secretary.jpg", name: "[NAME_TO_BE_SET]" },
                { role: "Treasurer", img: "treasurer.jpg", name: "[NAME_TO_BE_SET]" },
                { role: "Head of Media", img: "head-media.jpg", name: "[NAME_TO_BE_SET]" },
                { role: "Head of Projects", img: "head-projects.jpg", name: "[NAME_TO_BE_SET]" },
                { role: "Sponsorship and Events Manager", img: "sponsorship-events-manager.jpg", name: "[NAME_TO_BE_SET]" },
                { role: "Vice Manager of Sponsorship and Events", img: "vice-manager-sponsorship.jpg", name: "[NAME_TO_BE_SET]" }
              ].map((member, index) => (
                <div 
                  key={index} 
                  className="
                    flex-shrink-0 w-80
                    group cursor-pointer
                    transform transition-all duration-500
                    hover:scale-105 hover:-translate-y-4
                  "
                  style={{
                    animationDelay: `${(index + 1) * 0.1}s`
                  }}
                >
                  <div className="
                    relative
                    bg-gradient-to-br from-gray-900/90 to-black/90
                    border border-cyber-blue/30
                    rounded-xl p-6
                    backdrop-blur-sm
                    shadow-lg shadow-cyber-blue/20
                    group-hover:shadow-2xl group-hover:shadow-cyber-blue/40
                    group-hover:border-cyan-400/50
                    transition-all duration-500
                  ">
                    {/* Cyberpunk Ring Container */}
                    <div className="relative mb-6 flex items-center justify-center">
                      {/* Outer Ring */}
                      <div className="
                        absolute inset-0 w-32 h-32 mx-auto
                        border-2 border-cyber-blue/40 rounded-full
                        animate-ring-rotate
                        group-hover:border-cyan-400/60
                        transition-colors duration-300
                      "></div>
                      
                      {/* Middle Ring */}
                      <div className="
                        absolute inset-2 w-28 h-28 mx-auto
                        border border-cyber-blue/30 rounded-full
                        animate-spin-reverse
                        group-hover:border-cyan-300/50
                        transition-colors duration-300
                      "></div>
                      
                      {/* Inner Ring */}
                      <div className="
                        absolute inset-4 w-24 h-24 mx-auto
                        border border-cyber-blue/20 rounded-full
                        animate-ring-rotate
                        group-hover:border-cyan-200/40
                        transition-colors duration-300
                      "></div>
                      
                      {/* Core Image Container */}
                      <div className="
                        relative w-20 h-20 mx-auto
                        rounded-full overflow-hidden
                        border-2 border-cyber-blue/50
                        group-hover:border-cyan-400/70
                        transition-all duration-500
                        group-hover:scale-110
                      ">
                        <img 
                          src={`team/${member.img}`} 
                          alt={member.role} 
                          className="
                            w-full h-full object-cover
                            filter grayscale group-hover:grayscale-0
                            transition-all duration-500
                          "
                          draggable="false"
                        />
                        
                        {/* Photo Overlay */}
                        <div className="
                          absolute inset-0
                          bg-gradient-to-t from-cyber-blue/20 to-transparent
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-500
                        "></div>
                        
                        {/* Scan Effect */}
                        <div className="
                          absolute inset-0
                          bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent
                          translate-x-full group-hover:animate-glitch-slide
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                        "></div>
                      </div>
                    </div>
                    
                    {/* Member Info */}
                    <div className="text-center space-y-2">
                      <div className="
                        font-orbitron font-bold text-sm md:text-base
                        text-cyber-blue
                        group-hover:text-cyan-400
                        transition-colors duration-300
                      ">
                        {member.role}
                      </div>
                      <div className="
                        font-rajdhani font-medium text-xs md:text-sm
                        text-gray-400
                        group-hover:text-gray-300
                        transition-colors duration-300
                      ">
                        {member.name}
                      </div>
                    </div>
                    
                    {/* Hover Accent Lines */}
                    <div className="
                      absolute top-4 left-4 w-8 h-0.5
                      bg-gradient-to-r from-cyber-blue to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute top-4 left-4 w-0.5 h-8
                      bg-gradient-to-b from-cyber-blue to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute bottom-4 right-4 w-8 h-0.5
                      bg-gradient-to-l from-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute bottom-4 right-4 w-0.5 h-8
                      bg-gradient-to-t from-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button 
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border-2 transition-all duration-300
                ${!canScrollLeft || isScrolling
                  ? 'border-gray-600 text-gray-600 cursor-not-allowed opacity-50'
                  : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black hover:shadow-lg hover:shadow-cyber-blue/50 hover:scale-110'
                }
              `}
              onClick={() => scrollTeam('left')}
              disabled={!canScrollLeft || isScrolling}
              aria-label="Scroll to previous team members"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 18L9 12L15 6V18Z" />
              </svg>
            </button>
            
            <button 
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border-2 transition-all duration-300
                ${!canScrollRight || isScrolling
                  ? 'border-gray-600 text-gray-600 cursor-not-allowed opacity-50'
                  : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black hover:shadow-lg hover:shadow-cyber-blue/50 hover:scale-110'
                }
              `}
              onClick={() => scrollTeam('right')}
              disabled={!canScrollRight || isScrolling}
              aria-label="Scroll to next team members"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 18L15 12L9 6V18Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile scroll hint */}
        <div className="
          text-center mt-8
          font-fira text-xs text-gray-500
          md:hidden
        ">
          Swipe or drag to navigate team members
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 flex justify-center pb-16">
        <ScrollIndicator 
          onClick={handleScroll}
          text="Access Next\nModule"
        />
      </div>
    </div>
  );
};

export default AboutSection;

import React from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ActivitiesSection = () => {
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 4, // Scroll to events section
      behavior: 'smooth'
    });
  };

  const activities = [
    {
      title: "Hackathons & Competitions",
      description: "24-hour coding marathons where innovative solutions are born",
      icon: "💻",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Tech Workshops",
      description: "Hands-on learning sessions covering cutting-edge technologies",
      icon: "🔧",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Innovation Labs",
      description: "Collaborative spaces for breakthrough project development",
      icon: "🔬",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Industry Networking",
      description: "Connect with professionals and expand your professional network",
      icon: "🤝",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="activities-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyber-blue/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-cyan-400/20 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-400/25 rotate-45 animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-cyber-blue bg-cyber-blue/10 px-4 py-2 rounded-full border border-cyber-blue/30">
              [ENGAGEMENT_PROTOCOLS]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              OUR ACTIVITIES
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto"></div>
        </div>

        {/* Activities Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="group relative bg-black/40 border border-cyber-blue/20 rounded-xl p-8 backdrop-blur-sm hover:border-cyber-blue/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyber-blue/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Activity Icon */}
                <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto">
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {activity.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-orbitron text-xl font-bold text-white mb-4 text-center group-hover:text-cyber-blue transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="font-rajdhani text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {activity.description}
                </p>

                {/* Hover Effects */}
                <div className="absolute top-2 left-2 w-6 h-0.5 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-2 left-2 w-0.5 h-6 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 right-2 w-6 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 right-2 w-0.5 h-6 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="font-rajdhani text-lg text-white/80 leading-relaxed mb-8">
              From coding workshops to innovation challenges, we offer a diverse range of activities designed to 
              enhance your technical skills and creative thinking. Join us for transformative experiences that 
              connect you with industry professionals and like-minded peers.
            </p>
            <div className="flex justify-center">
              <div className="bg-black/30 border border-cyber-blue/20 rounded-lg px-6 py-3">
                <span className="font-fira text-sm text-cyber-blue">
                  STATUS: <span className="text-green-400">ACTIVE_ENGAGEMENT</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Explore Our\nEvents"
      />
    </div>
  );
};

export default ActivitiesSection;


import React from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ContactSection = () => {
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 6, // Scroll to membership section
      behavior: 'smooth'
    });
  };

  return (
    <div className="section" id="contact-section">
      <div className="about-content">
        <h2 className="font-orbitron text-6xl font-bold text-cyber-blue text-center mb-12 drop-shadow-[0_0_30px_rgba(0,170,255,0.8)] tracking-[3px]">
          Contact Us
        </h2>
        <div className="max-w-4xl mx-auto text-center text-xl leading-relaxed text-white/90 font-rajdhani">
          <p className="mb-8">
            Ready to join our community of innovators? Have questions about
            our programs or want to collaborate on a project? We'd love to
            hear from you.
          </p>
          <p className="mb-8">
            Reach out through our social media channels, send us an email,
            or visit us on campus. Our doors are always open to curious minds
            and passionate builders.
          </p>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Join Our Community"
      />
    </div>
  );
};

export default ContactSection;

import React from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const EventsSection = () => {
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 5,
      behavior: 'smooth'
    });
  };

  const events = [
    {
      name: "TechFest 2025",
      description: "Annual technology festival showcasing innovation",
      date: "March 2025",
      type: "FESTIVAL",
      color: "from-purple-600 to-pink-600"
    },
    {
      name: "Innovation Summit",
      description: "Conference bringing together industry leaders",
      date: "June 2025", 
      type: "CONFERENCE",
      color: "from-blue-600 to-cyan-600"
    },
    {
      name: "Demo Day",
      description: "Students present groundbreaking projects",
      date: "October 2025",
      type: "SHOWCASE",
      color: "from-green-600 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="events-section">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-20 w-40 h-40 border-2 border-cyber-blue/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-28 h-28 border border-cyan-400/30 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/30">
              [EVENT_MATRIX]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SIGNATURE EVENTS
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </div>

        {/* Events Timeline */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyber-blue via-cyan-400 to-purple-400 rounded-full"></div>
            
            <div className="space-y-16">
              {events.map((event, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="group bg-black/40 border border-cyber-blue/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-400/20">
                      {/* Event Type Badge */}
                      <div className="inline-block mb-4">
                        <span className={`font-fira text-xs px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white font-semibold tracking-wider`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {event.name}
                      </h3>
                      
                      <p className="font-rajdhani text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {event.description}
                      </p>
                      
                      <div className="text-sm font-fira text-cyber-blue">
                        {event.date}
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="w-2/12 flex justify-center relative z-10">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${event.color} border-4 border-cyber-dark shadow-lg shadow-cyan-400/30 animate-pulse`}></div>
                  </div>
                  
                  {/* Date Side */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                    <div className="font-orbitron text-2xl font-bold text-gray-400">
                      {event.date.split(' ')[0]}
                      <div className="text-sm text-gray-500">{event.date.split(' ')[1]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="font-rajdhani text-lg text-white/80 leading-relaxed mb-8">
            Experience transformative events that shape the future of technology. Our signature events bring together 
            the brightest minds in tech, creating opportunities for learning, networking, and showcasing innovation.
          </p>
          <div className="flex justify-center">
            <div className="bg-black/30 border border-cyan-400/20 rounded-lg px-6 py-3">
              <span className="font-fira text-sm text-cyan-400">
                NEXT_EVENT: <span className="text-green-400">INITIALIZING...</span>
              </span>
            </div>
          </div>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Connect With Us"
      />
    </div>
  );
};

export default EventsSection;



import React, { useState, useEffect } from "react";

// Logo Component
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

// Typewriter Component
const Typewriter = ({ text, speed = 100, startDelay = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const typeTimer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);
          setTimeout(() => setShowCursor(true), 500);
        }
      }, speed);
      return () => clearInterval(typeTimer);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return (
    <div className="relative inline-block">
      <span className="font-fira text-xl lg:text-lg md:text-base sm:text-sm font-normal text-white/90 tracking-wide"
            style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}>
        {displayedText}
        {(isTyping || showCursor) && (
          <span
            className="inline-block bg-cyber-blue w-0.5 h-5 ml-0.5 animate-blink"
            style={{
              boxShadow: '0 0 10px rgba(0, 170, 255, 0.8)',
              animation: 'blink 1s infinite'
            }}
          ></span>
        )}
      </span>
    </div>
  );
};

// ScrollIndicator Component
const ScrollIndicator = ({ onClick, text = "Scroll Down to Learn\nMore About Us" }) => (
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
    <div className="relative min-h-[200vh]">
      {/* Hero View */}
      <div className={`
        fixed inset-0 w-full h-screen
        flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${currentView === 0 && !isTransitioning ? 'opacity-100 visible' : 'opacity-0 invisible'}
        ${isTransitioning ? 'opacity-50' : ''}
      `}>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
          {/* Logo */}
          <div className="mb-8">
            <Logo isScrolled={isScrolled} />
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="
              font-orbitron font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl
              bg-gradient-to-r from-white via-cyber-blue to-cyan-400
              bg-clip-text text-transparent
              tracking-wide leading-tight
              drop-shadow-lg
            "
            style={{
              textShadow: '0 0 30px rgba(0, 170, 255, 0.5)'
            }}>
              WHERE INNOVATION<br />
              MEETS APPLICATION
            </h1>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="
                font-fira text-2xl md:text-3xl font-bold text-cyber-blue
                animate-pulse
              "
              style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
                &lt;/&gt;
              </span>
              <Typewriter
                text="A space for curious minds to explore, build, and turn ideas into real-world impact."
                speed={80}
                startDelay={1500}
              />
              <span className="
                font-fira text-2xl md:text-3xl font-bold text-cyber-blue
                animate-pulse
              "
              style={{ textShadow: '0 0 15px rgba(0, 170, 255, 0.8)' }}>
                &lt;/&gt;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Internal About View - This is just a preview/teaser */}
      <div className={`
        fixed inset-0 w-full h-screen
        flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${currentView === 1 && !isTransitioning ? 'opacity-100 visible' : 'opacity-0 invisible'}
        ${isTransitioning ? 'opacity-50' : ''}
      `}>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="
              font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              text-white leading-tight mb-8
            "
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}>
              The most dynamic{' '}
              <span className="
                bg-gradient-to-r from-cyber-blue to-cyan-400
                bg-clip-text text-transparent
              "
              style={{ textShadow: '0 0 30px rgba(0, 170, 255, 0.6)' }}>
                tech & innovation club
              </span>{' '}
              at ENSA El Jadida.<br />
              Founded in{' '}
              <span className="
                bg-gradient-to-r from-yellow-400 to-orange-400
                bg-clip-text text-transparent
              ">
                2013
              </span>{' '}
              by future engineers, driven by<br />
              <span className="
                bg-gradient-to-r from-pink-400 to-purple-400
                bg-clip-text text-transparent
              ">
                passion
              </span>
              ,{' '}
              <span className="
                bg-gradient-to-r from-green-400 to-blue-400
                bg-clip-text text-transparent
              ">
                teamwork
              </span>
              , and{' '}
              <span className="
                bg-gradient-to-r from-cyan-400 to-blue-400
                bg-clip-text text-transparent
              ">
                bold ideas
              </span>
              .
            </h2>
          </div>
          
          {/* Scroll Indicator to the real About section */}
          <ScrollIndicator 
            onClick={handleScrollToRealAbout}
            text="Learn More\nAbout Us"
          />
        </div>
      </div>

      {/* Spacer to maintain scroll height */}
      <div className="h-[100vh]"></div>
    </div>
  );
};

export default HomeSection;


import React from "react";

const MembershipSection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="section" id="membership-section">
      <div className="about-content">
        <h2 className="font-orbitron text-6xl font-bold text-cyber-blue text-center mb-12 drop-shadow-[0_0_30px_rgba(0,170,255,0.8)] tracking-[3px]">
          Membership
        </h2>
        <div className="max-w-4xl mx-auto text-center text-xl leading-relaxed text-white/90 font-rajdhani mb-12">
          <p className="mb-8">
            Become part of a vibrant community where innovation thrives and
            ideas become reality. Our membership opens doors to exclusive
            workshops, mentorship programs, and networking opportunities.
          </p>
          <p className="mb-8">
            Whether you're a beginner eager to learn or an experienced developer
            looking to share knowledge, there's a place for you in our community.
          </p>
        </div>
       
        {/* Back to top button */}
        <br />
        <br />
        <div
          className="flex justify-center items-center gap-4 cursor-pointer p-4 rounded-[10px] bg-cyber-blue/10 border border-cyber-blue/30 transition-all duration-300 max-w-[300px] mx-auto hover:bg-cyber-blue/20 hover:-translate-y-0.5"
          onClick={handleScrollToTop}
        >
          <span className="font-orbitron text-sm font-medium tracking-[2px] text-cyber-blue uppercase">
            Back to Top
          </span>
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-cyber-blue drop-shadow-[0_0_5px_rgba(0,170,255,0.6)]"></div>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;




