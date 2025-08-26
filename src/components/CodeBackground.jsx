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

  return <canvas ref={canvasRef} className="code-background" />;
};

export default CodeBackground;
