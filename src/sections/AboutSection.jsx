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
    <div className="section cyberpunk-about-section" id="about-section">
      <div className="cyber-grid-background"></div>
      
      <div className="about-cyber-container">
        {/* Left side - Enhanced Image */}
        <div className="cyber-image-terminal">
          <div className="terminal-header">
            <div className="terminal-controls">
              <div className="control-dot red"></div>
              <div className="control-dot yellow"></div>
              <div className="control-dot green"></div>
            </div>
            <div className="terminal-title">&gt; VISUAL_FEED_01.exe</div>
          </div>
          <div className="image-container">
            <img 
              src="about_us.jpg" 
              alt="AppinSciences Cyber Division" 
              className="cyber-image"
            />
            <div className="scan-lines"></div>
            <div className="glitch-overlay"></div>
          </div>
          <div className="terminal-footer">
            <div className="status-bar">
              <span className="status-text">STATUS: CONNECTED</span>
              <div className="signal-strength">
                <div className="signal-bar"></div>
                <div className="signal-bar"></div>
                <div className="signal-bar"></div>
                <div className="signal-bar"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Cyberpunk Panel */}
        <div className="cyber-data-panel">
          <div className="panel-frame">
            {/* Header with glitch effect */}
            <div className="cyber-header">
              <div className="header-glitch">
                <span className="glitch-text" data-text="APPINSCIENCES_PROTOCOL">APPINSCIENCES_PROTOCOL</span>
              </div>
              <div className="data-stream">
                <div className="stream-line"></div>
                <div className="stream-dots">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>

            {/* Main data content */}
            <div className="cyber-content">
              <div className="data-block">
                <div className="block-header">
                  <span className="timestamp">[2013.INIT]</span>
                  <span className="data-type">FOUNDATION_PROTOCOL</span>
                </div>
                <p className="cyber-text">
                  ESTABLISHED IN 2013 AT ENSA EL JADIDA, APP IN 
                  SCIENCES REPRESENTS A <span className="highlight-cyan">BOLD COMMITMENT</span> TO 
                  INNOVATION, CREATIVITY, AND STUDENT EMPOWERMENT.
                </p>
              </div>

              <div className="data-block">
                <div className="block-header">
                  <span className="timestamp">[EVOLUTION.LOG]</span>
                  <span className="data-type">GROWTH_MATRIX</span>
                </div>
                <p className="cyber-text">
                  WHAT STARTED AS A <span className="highlight-magenta">SHARED DESIRE</span> TO MAKE STUDENT 
                  LIFE MORE DYNAMIC HAS GROWN INTO A POWERHOUSE OF 
                  PASSIONATE ENGINEERS DEDICATED TO <span className="highlight-cyan">TURNING IDEAS INTO 
                  REAL-WORLD IMPACT</span> THROUGH TECH.
                </p>
              </div>

              <div className="data-block">
                <div className="block-header">
                  <span className="timestamp">[CORE.SYSTEM]</span>
                  <span className="data-type">PRIMARY_DIRECTIVES</span>
                </div>
                <p className="cyber-text">
                  AT THE HEART OF OUR CLUB ARE <span className="highlight-yellow">CREATIVE MINDS</span> AND 
                  COLLABORATIVE SPIRITS—DRIVING <span className="highlight-cyan">IMPACTFUL 
                  PROJECTS</span>, ORGANIZING NATIONAL-SCALE EVENTS, AND 
                  DELIVERING VALUE BEYOND THE CLASSROOM.
                </p>
              </div>
            </div>

            {/* Footer with system info */}
            <div className="cyber-footer">
              <div className="system-info">
                <span className="info-item">SYS_VER: 11.2.3</span>
                <span className="info-item">UPTIME: ∞</span>
                <span className="info-item">STATUS: <span className="status-active">ACTIVE</span></span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>

          {/* Side accent elements */}
          <div className="panel-accents">
            <div className="accent-line top"></div>
            <div className="accent-line middle"></div>
            <div className="accent-line bottom"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Executive Team Section */}
      <div className="executive-team-section">
        <div className="team-header">
          <h2 className="team-title">MEET THE EXECUTIVE TEAM OF 2025-2026</h2>
        </div>

        {/* Enhanced Horizontal Scroll Container */}
        <div className="team-scroll-container">
          <div 
            className="team-scroll-wrapper" 
            ref={teamScrollRef}
            style={{
              '--mouse-x': `${mousePosition.x}px`,
              '--mouse-y': `${mousePosition.y}px`,
              '--scroll-velocity': scrollVelocity
            }}
          >
            <div className="team-grid all-members">
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
                  className="team-member"
                  style={{
                    '--member-index': index,
                    animationDelay: `${(index + 1) * 0.1}s`
                  }}
                >
                  <div className="member-frame">
                    <div className="cyberpunk-ring">
                      <div className="ring-outer"></div>
                      <div className="ring-middle"></div>
                      <div className="ring-inner"></div>
                      <div className="ring-core">
                        <img 
                          src={`team/${member.img}`} 
                          alt={member.role} 
                          className="member-photo"
                          draggable="false"
                        />
                        <div className="photo-overlay"></div>
                        <div className="scan-effect"></div>
                      </div>
                    </div>
                  </div>
                  <div className="member-info">
                    <div className="member-role">{member.role}</div>
                    <div className="member-name">{member.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          <div className="scroll-nav-buttons">
            <button 
              className={`scroll-nav-btn prev ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => scrollTeam('left')}
              disabled={!canScrollLeft || isScrolling}
              aria-label="Scroll to previous team members"
            >
              <svg viewBox="0 0 24 24">
                <path d="M15 18L9 12L15 6V18Z" />
              </svg>
            </button>
            <button 
              className={`scroll-nav-btn next ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => scrollTeam('right')}
              disabled={!canScrollRight || isScrolling}
              aria-label="Scroll to next team members"
            >
              <svg viewBox="0 0 24 24">
                <path d="M9 18L15 12L9 6V18Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile scroll hint */}
        <div className="mobile-scroll-hint">
          Swipe or drag to navigate team members
        </div>
      </div>

      <ScrollIndicator 
        onClick={handleScroll}
        text="Access Next\nModule"
      />
    </div>
  );
};

export default AboutSection;