import React, { useEffect, useRef, useState, useCallback } from "react";

const CodeBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [performance, setPerformance] = useState('high');
  
  // Performance monitoring
  const fpsRef = useRef({ frames: 0, lastTime: Date.now() });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let pixelRatio = window.devicePixelRatio || 1;

    // Performance optimization
    const checkPerformance = () => {
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
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(pixelRatio, pixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Enhanced code blocks with AppinSciences branding
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
          "",
          "    def predict_success_rate(self, project_data):",
          "        model = self.load_ml_model()",
          "        return model.predict(project_data)",
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
          "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,",
          "    INDEX idx_category_status (category, status)",
          ");",
          "",
          "-- Query top performing innovations",
          "SELECT p.title, p.impact_score, m.name as lead",
          "FROM innovation_projects p",
          "JOIN members m ON p.lead_id = m.id",
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
          'echo "🌐 Live at: https://appinsciences.tech"',
        ],
        language: "bash",
        priority: "low",
      },
      {
        lines: [
          "package main",
          "",
          "import (",
          '    "fmt"',
          '    "time"',
          '    "github.com/appinsciences/innovation"',
          ")",
          "",
          "type InnovationEngine struct {",
          "    Projects    []Project",
          "    Members     []Member",
          "    ImpactScore float64",
          "}",
          "",
          "func (ie *InnovationEngine) StartInnovation() {",
          '    fmt.Println("🔥 Innovation Engine Started")',
          "    ",
          "    for {",
          "        ideas := ie.GenerateIdeas()",
          "        projects := ie.TransformIdeasToProjects(ideas)",
          "        ie.LaunchProjects(projects)",
          "        ",
          "        time.Sleep(24 * time.Hour) // Daily innovation cycle",
          "    }",
          "}",
        ],
        language: "go",
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
          "module.exports = router;",
        ],
        language: "javascript",
        priority: "medium",
      },
    ];

    // Floating particles system
    const particles = [];
    const maxParticles = performance === 'high' ? 50 : performance === 'medium' ? 30 : 15;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`, // Cyan to blue range
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Enhanced floating code blocks
    const floatingBlocks = [];
    const maxBlocks = performance === 'high' ? 12 : performance === 'medium' ? 8 : 5;

    for (let i = 0; i < maxBlocks; i++) {
      const block = codeBlocks[Math.floor(Math.random() * codeBlocks.length)];
      floatingBlocks.push({
        block: block,
        x: Math.random() * (canvas.width - 500),
        y: Math.random() * canvas.height + 300,
        speed: 0.2 + Math.random() * 0.8,
        opacity: 0.08 + Math.random() * 0.15,
        maxWidth: 400 + Math.random() * 200,
        rotation: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2,
        priority: block.priority,
      });
    }

    // Enhanced grid system
    const drawGrid = () => {
      const gridSize = 60;
      const gridOpacity = 0.03;
      
      ctx.strokeStyle = `rgba(0, 170, 255, ${gridOpacity})`;
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Particle animation
    const animateParticles = (time) => {
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Pulse effect
        particle.pulse += 0.02;
        const pulseFactor = 1 + Math.sin(particle.pulse) * 0.3;
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity * pulseFactor;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    // Enhanced syntax highlighting
    const getSyntaxColor = (line, language) => {
      const baseOpacity = 0.15;
      
      // Language-specific highlighting
      if (language === 'javascript' || language === 'jsx') {
        if (line.includes('class') || line.includes('function') || line.includes('const') || line.includes('let')) {
          return `rgba(255, 200, 100, ${baseOpacity + 0.1})`;
        }
        if (line.includes('//')) {
          return `rgba(120, 120, 120, ${baseOpacity})`;
        }
        if (line.includes('"') || line.includes("'") || line.includes('`')) {
          return `rgba(150, 255, 150, ${baseOpacity + 0.05})`;
        }
      } else if (language === 'python') {
        if (line.includes('def') || line.includes('class') || line.includes('import')) {
          return `rgba(255, 180, 120, ${baseOpacity + 0.1})`;
        }
        if (line.includes('#')) {
          return `rgba(120, 120, 120, ${baseOpacity})`;
        }
        if (line.includes('"""') || line.includes("'''")) {
          return `rgba(150, 255, 150, ${baseOpacity + 0.05})`;
        }
      } else if (language === 'sql') {
        if (line.includes('SELECT') || line.includes('CREATE') || line.includes('INSERT') || line.includes('UPDATE')) {
          return `rgba(255, 150, 200, ${baseOpacity + 0.1})`;
        }
        if (line.includes('--')) {
          return `rgba(120, 120, 120, ${baseOpacity})`;
        }
      }
      
      // Special AppinSciences highlighting
      if (line.includes('AppinSciences') || line.includes('Innovation') || line.includes('APPINSCIENCES')) {
        return `rgba(0, 200, 255, ${baseOpacity + 0.15})`;
      }
      
      return `rgba(150, 170, 255, ${baseOpacity})`;
    };

    // Main animation loop
    const animate = (time) => {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      checkPerformance();

      // Clear canvas with enhanced gradient
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.3, canvas.width * 0.8
      );
      gradient.addColorStop(0, "rgba(2, 2, 12, 0.98)");
      gradient.addColorStop(0.4, "rgba(8, 12, 25, 0.95)");
      gradient.addColorStop(0.8, "rgba(3, 8, 18, 0.97)");
      gradient.addColorStop(1, "rgba(1, 1, 8, 0.99)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid (only on high performance)
      if (performance === 'high') {
        drawGrid();
      }

      // Animate particles
      if (performance !== 'low') {
        animateParticles(time);
      }

      // Animate floating code blocks
      floatingBlocks.forEach((item, index) => {
        const lineHeight = 20;
        const fontSize = 14;

        // Skip low priority blocks on lower performance
        if (performance === 'low' && item.priority === 'low') return;
        if (performance === 'medium' && item.priority === 'low' && index % 2 === 0) return;

        ctx.font = `${fontSize}px "JetBrains Mono", "Monaco", "Menlo", "Ubuntu Mono", monospace`;

        // Add wobble effect
        item.wobble += 0.005;
        const wobbleX = Math.sin(item.wobble) * 2;
        const wobbleY = Math.cos(item.wobble * 0.7) * 1;

        item.block.lines.forEach((line, lineIndex) => {
          const yPos = item.y + lineIndex * lineHeight + wobbleY;
          const xPos = item.x + wobbleX;

          if (yPos < -lineHeight || yPos > canvas.height + lineHeight) return;

          const color = getSyntaxColor(line, item.block.language);
          
          // Add glow effect for special lines
          if (line.includes('AppinSciences') || line.includes('Innovation')) {
            ctx.save();
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(0, 200, 255, 0.6)';
          }

          ctx.fillStyle = color;
          ctx.fillText(line, xPos, yPos);

          if (line.includes('AppinSciences') || line.includes('Innovation')) {
            ctx.restore();
          }
        });

        // Update position
        item.y -= item.speed;
        item.x += Math.sin(item.wobble) * 0.1;

        // Reset position when out of view
        if (item.y < -item.block.lines.length * lineHeight - 200) {
          item.y = canvas.height + 200;
          item.x = Math.random() * (canvas.width - item.maxWidth);
          
          // Prioritize AppinSciences content
          const priorityBlocks = codeBlocks.filter(b => b.priority === 'high');
          const randomBlocks = Math.random() < 0.4 ? priorityBlocks : codeBlocks;
          item.block = randomBlocks[Math.floor(Math.random() * randomBlocks.length)];
          
          item.opacity = 0.08 + Math.random() * 0.15;
          item.speed = 0.2 + Math.random() * 0.8;
          item.wobble = Math.random() * Math.PI * 2;
        }
      });

      // Connection lines between particles (high performance only)
      if (performance === 'high') {
        ctx.strokeStyle = 'rgba(0, 170, 255, 0.1)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length - 1; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              const opacity = (150 - distance) / 150 * 0.1;
              ctx.strokeStyle = `rgba(0, 170, 255, ${opacity})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

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
  }, [isVisible, performance]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-screen h-screen z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #020208 0%, #0a0f1c 50%, #050510 100%)',
        }}
      />

      <div className="fixed top-0 left-0 w-screen h-screen z-[0] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest opacity-50" />
      </div>
    </>
  );
};

export default CodeBackground;