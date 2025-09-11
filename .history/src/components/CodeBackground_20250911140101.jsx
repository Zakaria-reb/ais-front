import React, { useEffect, useRef, useState, useCallback } from "react";

const CodeBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [performance, setPerformance] = useState('high');
  
  // Performance monitoring
  const fpsRef = useRef({ frames: 0, lastTime: Date.now() });

  // Memoized code blocks configuration
  const codeBlocks = [
    {
      lines: [
        "// AppinSciences Innovation Protocol",
        "class DigitalTransformation {",
        "  constructor() {",
        '    this.vision = "Innovation × Application";',
        '    this.mission = "Empowering Future Leaders";',
        "    this.values = ['Creativity', 'Collaboration'];",
        "  }",
        "",
        "  async initializeInnovation() {",
        "    const ideas = await this.gatherIdeas();",
        "    return this.transformToReality(ideas);",
        "  }",
        "}"
      ],
      language: "javascript",
      priority: "high",
    },
    {
      lines: [
        "# AppinSciences Member Analytics",
        "import numpy as np",
        "import pandas as pd",
        "from sklearn.cluster import KMeans",
        "",
        "class ClubAnalytics:",
        '    def __init__(self, club_name="AppinSciences"):',
        "        self.club = club_name",
        "        self.members = []",
        "        self.projects = []",
        "",
        "    def analyze_innovation_trends(self):",
        '        """Analyze member innovation patterns"""',
        "        innovation_score = self.calculate_impact()",
        "        return self.generate_insights(innovation_score)",
      ],
      language: "python",
      priority: "high",
    },
    {
      lines: [
        "/* AppinSciences Database Schema */",
        "CREATE DATABASE appinsciences_hub;",
        "USE appinsciences_hub;",
        "",
        "CREATE TABLE innovation_projects (",
        "    id INT PRIMARY KEY AUTO_INCREMENT,",
        "    title VARCHAR(255) NOT NULL,",
        "    category ENUM('AI', 'Web', 'Mobile', 'IoT'),",
        "    impact_score DECIMAL(5,2),",
        "    status ENUM('ideation', 'development', 'deployed'),",
        "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        ");",
        "",
        "SELECT p.title, p.impact_score",
        "FROM innovation_projects p",
        "WHERE p.impact_score > 8.5",
        "ORDER BY p.impact_score DESC;",
      ],
      language: "sql",
      priority: "medium",
    },
    {
      lines: [
        "<!-- AppinSciences React Component -->",
        '<div className="innovation-hub">',
        '  <header className="cyber-header">',
        '    <h1 className="glitch-text">',
        "      APPINSCIENCES",
        "    </h1>",
        '    <p className="tagline">',
        "      Where Innovation Meets Application",
        "    </p>",
        "  </header>",
        '  <ProjectShowcase projects={projects} />',
        "</div>",
      ],
      language: "jsx",
      priority: "medium",
    },
    {
      lines: [
        "#!/bin/bash",
        "# AppinSciences Deployment Pipeline",
        'echo "🚀 Deploying Innovation Platform..."',
        "",
        "export NODE_ENV=production",
        "export INNOVATION_MODE=enabled",
        "",
        "npm run build:optimized",
        "docker build -t appinsciences/platform .",
        "kubectl apply -f k8s/",
        "",
        'echo "✅ Deployment successful!"',
        'echo "🌐 Live: https://appinsciences.tech"',
      ],
      language: "bash",
      priority: "low",
    },
    {
      lines: [
        "// AppinSciences API Routes",
        "const express = require('express');",
        "const router = express.Router();",
        "",
        "router.get('/api/v1/innovations', async (req, res) => {",
        "  try {",
        "    const innovations = await Innovation.find()",
        "      .populate('creator', 'name skills')",
        "      .sort({ impactScore: -1 });",
        "    ",
        "    res.json({",
        "      success: true,",
        "      data: innovations,",
        "      meta: { club: 'AppinSciences' }",
        "    });",
        "  } catch (error) {",
        "    res.status(500).json({ error: error.message });",
        "  }",
        "});",
      ],
      language: "javascript",
      priority: "medium",
    },
  ];

  // Performance optimization functions
  const checkPerformance = useCallback(() => {
    const now = Date.now();
    fpsRef.current.frames++;
    
    if (now - fpsRef.current.lastTime >= 1000) {
      const fps = fpsRef.current.frames;
      fpsRef.current.frames = 0;
      fpsRef.current.lastTime = now;
      
      if (fps < 30 && performance === 'high') {
        setPerformance('medium');
      } else if (fps < 20 && performance === 'medium') {
        setPerformance('low');
      }
    }
  }, [performance]);

  // Syntax highlighting function
  const getSyntaxColor = useCallback((line, language) => {
    const baseOpacity = 0.15;
    
    // AppinSciences branding highlight
    if (line.includes('AppinSciences') || line.includes('Innovation') || line.includes('APPINSCIENCES')) {
      return `rgba(0, 200, 255, ${baseOpacity + 0.15})`;
    }
    
    // Language-specific highlighting
    const patterns = {
      javascript: {
        keywords: ['class', 'function', 'const', 'let', 'async', 'await'],
        comments: ['//', '/*'],
        strings: ['"', "'", '`'],
        color: 'rgba(255, 200, 100, {opacity})'
      },
      python: {
        keywords: ['def', 'class', 'import', 'from'],
        comments: ['#'],
        strings: ['"""', "'''", '"', "'"],
        color: 'rgba(255, 180, 120, {opacity})'
      },
      sql: {
        keywords: ['SELECT', 'CREATE', 'INSERT', 'UPDATE', 'FROM', 'WHERE'],
        comments: ['--'],
        strings: ["'"],
        color: 'rgba(255, 150, 200, {opacity})'
      }
    };

    const pattern = patterns[language];
    if (pattern) {
      if (pattern.keywords.some(keyword => line.includes(keyword))) {
        return pattern.color.replace('{opacity}', baseOpacity + 0.1);
      }
      if (pattern.comments.some(comment => line.includes(comment))) {
        return `rgba(120, 120, 120, ${baseOpacity})`;
      }
      if (pattern.strings.some(str => line.includes(str))) {
        return `rgba(150, 255, 150, ${baseOpacity + 0.05})`;
      }
    }
    
    return `rgba(150, 170, 255, ${baseOpacity})`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    resizeCanvas();

    // Initialize particles
    const particles = [];
    const getMaxParticles = () => ({
      high: 40,
      medium: 25,
      low: 12
    }[performance]);

    const initializeParticles = () => {
      const maxParticles = getMaxParticles();
      particles.length = 0;
      
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.8,
          opacity: Math.random() * 0.4 + 0.2,
          color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    // Initialize floating code blocks
    const floatingBlocks = [];
    const getMaxBlocks = () => ({
      high: 10,
      medium: 7,
      low: 4
    }[performance]);

    const initializeFloatingBlocks = () => {
      const maxBlocks = getMaxBlocks();
      floatingBlocks.length = 0;
      
      for (let i = 0; i < maxBlocks; i++) {
        const block = codeBlocks[Math.floor(Math.random() * codeBlocks.length)];
        floatingBlocks.push({
          block,
          x: Math.random() * Math.max(0, canvas.width - 500),
          y: Math.random() * canvas.height + 300,
          speed: 0.3 + Math.random() * 0.6,
          opacity: 0.1 + Math.random() * 0.12,
          maxWidth: 400 + Math.random() * 150,
          rotation: (Math.random() - 0.5) * 0.015,
          wobble: Math.random() * Math.PI * 2,
          priority: block.priority,
        });
      }
    };

    initializeParticles();
    initializeFloatingBlocks();

    // Enhanced grid drawing
    const drawGrid = () => {
      const gridSize = 50;
      const gridOpacity = 0.025;
      
      ctx.strokeStyle = `rgba(0, 170, 255, ${gridOpacity})`;
      ctx.lineWidth = 0.4;
      ctx.setLineDash([2, 8]);
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.setLineDash([]);
    };

    // Particle animation
    const animateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.02;
        
        const pulseFactor = 1 + Math.sin(particle.pulse) * 0.25;
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = particle.opacity * pulseFactor;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    // Connection lines between particles
    const drawConnections = () => {
      if (performance !== 'high') return;
      
      ctx.lineWidth = 0.4;
      
      for (let i = 0; i < particles.length - 1; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.08;
            ctx.strokeStyle = `rgba(0, 170, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Main animation loop
    const animate = () => {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      checkPerformance();

      // Enhanced background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.3, canvas.width * 0.7
      );
      gradient.addColorStop(0, "rgba(5, 8, 20, 0.98)");
      gradient.addColorStop(0.5, "rgba(10, 15, 30, 0.96)");
      gradient.addColorStop(1, "rgba(2, 4, 12, 0.99)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid (high performance only)
      if (performance === 'high') {
        drawGrid();
      }

      // Animate particles
      if (performance !== 'low') {
        animateParticles();
        drawConnections();
      }

      // Animate floating code blocks
      ctx.font = '13px "JetBrains Mono", "Monaco", "Menlo", monospace';
      
      floatingBlocks.forEach((item, index) => {
        // Performance filtering
        if (performance === 'low' && item.priority === 'low') return;
        if (performance === 'medium' && item.priority === 'low' && index % 2 === 0) return;

        const lineHeight = 18;
        
        // Wobble animation
        item.wobble += 0.004;
        const wobbleX = Math.sin(item.wobble) * 1.5;
        const wobbleY = Math.cos(item.wobble * 0.8) * 0.8;

        item.block.lines.forEach((line, lineIndex) => {
          const yPos = item.y + lineIndex * lineHeight + wobbleY;
          const xPos = item.x + wobbleX;

          if (yPos < -lineHeight || yPos > canvas.height + lineHeight) return;

          const color = getSyntaxColor(line, item.block.language);
          
          // Special glow for branded content
          if (line.includes('AppinSciences') || line.includes('Innovation')) {
            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(0, 200, 255, 0.5)';
          }

          ctx.fillStyle = color;
          ctx.fillText(line, xPos, yPos);

          if (line.includes('AppinSciences') || line.includes('Innovation')) {
            ctx.restore();
          }
        });

        // Update position
        item.y -= item.speed;
        item.x += Math.sin(item.wobble) * 0.08;

        // Reset when out of view
        if (item.y < -item.block.lines.length * lineHeight - 150) {
          item.y = canvas.height + 150;
          item.x = Math.random() * Math.max(0, canvas.width - item.maxWidth);
          
          // Prioritize high-priority blocks
          const availableBlocks = Math.random() < 0.4 
            ? codeBlocks.filter(b => b.priority === 'high')
            : codeBlocks;
          item.block = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];
          
          item.opacity = 0.1 + Math.random() * 0.12;
          item.speed = 0.3 + Math.random() * 0.6;
          item.wobble = Math.random() * Math.PI * 2;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleResize = () => {
      resizeCanvas();
      initializeParticles();
      initializeFloatingBlocks();
    };

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, performance, checkPerformance, getSyntaxColor]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #050814 0%, #0c1220 50%, #040610 100%)',
        }}
      />
      
      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 text-xs text-cyan-400 bg-black/50 px-2 py-1 rounded">
          Performance: {performance}
        </div>
      )}
    </>
  );
};

export default CodeBackground;