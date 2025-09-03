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