import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

const CodeBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [performance, setPerformance] = useState('high');
  
  // Performance monitoring
  const performanceRef = useRef({ 
    frames: 0, 
    lastTime: performance.now(),
    checkInterval: 60 // Check every 60 frames
  });

  // Memoized code blocks to prevent recreation on each render
  const codeBlocks = useMemo(() => [
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
        "",
        "    def predict_success_rate(self, project_data):",
        "        model = self.load_ml_model()",
        "        return model.predict(project_data)"
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
        "    team_size INT,",
        "    status ENUM('ideation', 'development', 'deployed'),",
        "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        ");",
        "",
        "-- Query top performing innovations",
        "SELECT p.title, p.impact_score, m.name as lead",
        "FROM innovation_projects p",
        "JOIN members m ON p.lead_id = m.id",
        "WHERE p.impact_score > 8.5",
        "ORDER BY p.impact_score DESC;"
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
        "",
        '  <section className="project-showcase">',
        "    {projects.map(project => (",
        '      <ProjectCard key={project.id}',
        "        title={project.title}",
        "        tech={project.techStack}",
        "        impact={project.impactScore}",
        "      />",
        "    ))}",
        "  </section>",
        "</div>"
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
        "# Environment Setup",
        "export NODE_ENV=production",
        "export CLUB_NAME=AppinSciences",
        "export INNOVATION_MODE=enabled",
        "",
        "# Build Process",
        "npm run build:optimized",
        "docker build -t appinsciences/platform:latest .",
        "",
        "# Deploy to Cloud",
        "kubectl apply -f k8s/",
        "kubectl scale deployment appinsciences --replicas=3",
        "",
        'echo "✅ Platform deployed successfully!"',
        'echo "🌐 Live at: https://appinsciences.tech"'
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
        "// Innovation Endpoints",
        "router.get('/api/v1/innovations', async (req, res) => {",
        "  try {",
        "    const innovations = await Innovation.find()",
        "      .populate('creator', 'name skills')",
        "      .sort({ impactScore: -1 });",
        "    ",
        "    res.json({",
        "      success: true,",
        "      data: innovations,",
        "      meta: {",
        '        club: "AppinSciences",',
        '        motto: "Innovation × Application",',
        "        totalInnovations: innovations.length",
        "      }",
        "    });",
        "  } catch (error) {",
        "    res.status(500).json({ error: error.message });",
        "  }",
        "});",
        "",
        "module.exports = router;"
      ],
      language: "javascript",
      priority: "medium",
    }
  ], []);

  // Performance settings based on current performance level
  const performanceSettings = useMemo(() => ({
    high: { particles: 50, blocks: 12, showGrid: true, showConnections: true },
    medium: { particles: 30, blocks: 8, showGrid: false, showConnections: false },
    low: { particles: 15, blocks: 5, showGrid: false, showConnections: false }
  }), []);

  // Performance monitoring function
  const checkPerformance = useCallback(() => {
    const perfRef = performanceRef.current;
    perfRef.frames++;
    
    if (perfRef.frames % perfRef.checkInterval === 0) {
      const now = performance.now();
      const deltaTime = now - perfRef.lastTime;
      const fps = (perfRef.checkInterval * 1000) / deltaTime;
      
      perfRef.lastTime = now;
      
      if (fps < 30 && performance === 'high') {
        setPerformance('medium');
      } else if (fps < 20 && performance === 'medium') {
        setPerformance('low');
      } else if (fps > 45 && performance === 'medium') {
        setPerformance('high');
      } else if (fps > 35 && performance === 'low') {
        setPerformance('medium');
      }
    }
  }, [performance]);

  // Syntax color function
  const getSyntaxColor = useCallback((line, language) => {
    const baseOpacity = 0.12;
    
    // Special AppinSciences highlighting
    if (line.includes('AppinSciences') || line.includes('Innovation') || line.includes('APPINSCIENCES')) {
      return `rgba(0, 200, 255, ${baseOpacity + 0.15})`;
    }
    
    // Language-specific highlighting
    const patterns = {
      javascript: {
        keywords: ['class', 'function', 'const', 'let', 'var', 'async', 'await'],
        comments: '//',
        strings: ['"', "'", '`']
      },
      jsx: {
        keywords: ['className', 'key', 'useState', 'useEffect'],
        comments: '//',
        strings: ['"', "'"]
      },
      python: {
        keywords: ['def', 'class', 'import', 'from', 'async', 'await'],
        comments: '#',
        strings: ['"""', "'''", '"', "'"]
      },
      sql: {
        keywords: ['SELECT', 'CREATE', 'INSERT', 'UPDATE', 'DELETE', 'FROM', 'WHERE'],
        comments: '--',
        strings: ['"', "'"]
      },
      bash: {
        keywords: ['echo', 'export', 'npm', 'docker', 'kubectl'],
        comments: '#',
        strings: ['"', "'"]
      }
    };

    const langPatterns = patterns[language];
    if (langPatterns) {
      if (langPatterns.keywords.some(keyword => line.includes(keyword))) {
        return `rgba(255, 200, 100, ${baseOpacity + 0.08})`;
      }
      if (line.includes(langPatterns.comments)) {
        return `rgba(120, 120, 120, ${baseOpacity})`;
      }
      if (langPatterns.strings.some(str => line.includes(str))) {
        return `rgba(150, 255, 150, ${baseOpacity + 0.05})`;
      }
    }
    
    return `rgba(150, 170, 255, ${baseOpacity})`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { 
      alpha: false,
      desynchronized: true,
      powerPreference: "default"
    });
    
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap pixel ratio for performance

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particles = [];
    const settings = performanceSettings[performance];
    
    for (let i = 0; i < settings.particles; i++) {
      particles.push({
        x: Math.random() * canvas.width / pixelRatio,
        y: Math.random() * canvas.height / pixelRatio,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Initialize floating code blocks
    const floatingBlocks = [];
    for (let i = 0; i < settings.blocks; i++) {
      const block = codeBlocks[Math.floor(Math.random() * codeBlocks.length)];
      floatingBlocks.push({
        block,
        x: Math.random() * (canvas.width / pixelRatio - 400),
        y: Math.random() * canvas.height / pixelRatio + 300,
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.08 + Math.random() * 0.12,
        rotation: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    // Grid drawing function
    const drawGrid = () => {
      if (!settings.showGrid) return;
      
      const gridSize = 60;
      const gridOpacity = 0.02;
      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;
      
      ctx.strokeStyle = `rgba(0, 170, 255, ${gridOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      
      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      
      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      
      ctx.stroke();
    };

    // Particle animation
    const animateParticles = () => {
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Pulse effect
        particle.pulse += 0.02;
        const pulseFactor = 1 + Math.sin(particle.pulse) * 0.2;
        
        // Boundary wrapping
        const width = canvas.width / pixelRatio;
        const height = canvas.height / pixelRatio;
        
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        
        // Draw particle
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

    // Draw connection lines between particles
    const drawConnections = () => {
      if (!settings.showConnections) return;
      
      ctx.strokeStyle = 'rgba(0, 170, 255, 0.08)';
      ctx.lineWidth = 0.5;
      
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

      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;

      // Clear canvas with gradient background
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.3, 0,
        width * 0.5, height * 0.3, width * 0.8
      );
      gradient.addColorStop(0, "rgba(2, 2, 12, 0.98)");
      gradient.addColorStop(0.4, "rgba(8, 12, 25, 0.95)");
      gradient.addColorStop(0.8, "rgba(3, 8, 18, 0.97)");
      gradient.addColorStop(1, "rgba(1, 1, 8, 0.99)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      drawGrid();

      // Animate particles
      animateParticles();

      // Draw connection lines
      drawConnections();

      // Animate floating code blocks
      ctx.font = '14px "JetBrains Mono", "Monaco", "Menlo", "Ubuntu Mono", monospace';
      
      floatingBlocks.forEach((item, index) => {
        // Skip blocks based on performance and priority
        if (performance === 'low' && item.block.priority === 'low') return;
        if (performance === 'medium' && item.block.priority === 'low' && index % 2 === 0) return;

        const lineHeight = 18;
        
        // Add subtle wobble effect
        item.wobble += 0.004;
        const wobbleX = Math.sin(item.wobble) * 1.5;
        const wobbleY = Math.cos(item.wobble * 0.7) * 1;

        item.block.lines.forEach((line, lineIndex) => {
          const yPos = item.y + lineIndex * lineHeight + wobbleY;
          const xPos = item.x + wobbleX;

          if (yPos < -lineHeight || yPos > height + lineHeight) return;

          const color = getSyntaxColor(line, item.block.language);
          
          // Add glow effect for special lines
          if (line.includes('AppinSciences') || line.includes('Innovation')) {
            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(0, 200, 255, 0.4)';
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

        // Reset position when out of view
        if (item.y < -item.block.lines.length * lineHeight - 200) {
          item.y = height + 200;
          item.x = Math.random() * (width - 400);
          
          // Prioritize high-priority blocks
          const priorityBlocks = codeBlocks.filter(b => b.priority === 'high');
          const selectedBlocks = Math.random() < 0.6 ? priorityBlocks : codeBlocks;
          item.block = selectedBlocks[Math.floor(Math.random() * selectedBlocks.length)];
          
          item.opacity = 0.08 + Math.random() * 0.12;
          item.speed = 0.3 + Math.random() * 0.7;
          item.wobble = Math.random() * Math.PI * 2;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Visibility change handler
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, performance, performanceSettings, codeBlocks, checkPerformance, getSyntaxColor]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #020208 0%, #0a0f1c 50%, #050510 100%)',
          zIndex: 1,
        }}
      />

      <div 
        className="fixed inset-0 w-full h-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(0, 100, 200, 0.1) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
    </>
  );
};

export default CodeBackground;