import React, { useRef, useState, useEffect, useCallback } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const AboutSection = () => {
  const teamScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
      top: viewportHeight * 4.5,
      behavior: 'smooth'
    });
  };
    
  const checkScrollPosition = useCallback(() => {
    if (teamScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = teamScrollRef.current;
      const tolerance = 10;
      
      setCanScrollLeft(scrollLeft > tolerance);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
    }
  }, []);

  const scrollTeam = useCallback((direction) => {
    if (!teamScrollRef.current) return;

    const scrollAmount = 320;
    const currentScroll = teamScrollRef.current.scrollLeft;
    const targetScroll = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : currentScroll + scrollAmount;
    
    const startScroll = currentScroll;
    const distance = targetScroll - startScroll;
    const startTime = Date.now();
    const duration = 800;
    
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

  const handleMouseMove = useCallback((e) => {
    const rect = teamScrollRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

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
    const walk = (x - momentumRef.current.startX) * 2;
    
    const newScrollLeft = momentumRef.current.startScrollLeft - walk;
    teamScrollRef.current.scrollLeft = newScrollLeft;
    
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

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft' && canScrollLeft) {
      e.preventDefault();
      scrollTeam('left');
    } else if (e.key === 'ArrowRight' && canScrollRight) {
      e.preventDefault();
      scrollTeam('right');
    }
  }, [canScrollLeft, canScrollRight, scrollTeam]);

  const snapToNearestMember = useCallback(() => {
    if (!teamScrollRef.current) return;
    
    const scrollContainer = teamScrollRef.current;
    const memberWidth = 320;
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

  const handleScroll2 = useCallback(() => {
    checkScrollPosition();
    
    clearTimeout(window.snapTimeout);
    window.snapTimeout = setTimeout(() => {
      if (!momentumRef.current.isDragging && !isScrolling) {
        snapToNearestMember();
      }
    }, 150);
  }, [checkScrollPosition, snapToNearestMember, isScrolling]);

  useEffect(() => {
    const scrollElement = teamScrollRef.current;
    
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll2);
      scrollElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove2);
      document.addEventListener('mouseup', handleMouseUp);
      scrollElement.addEventListener('mousemove', handleMouseMove);
      scrollElement.addEventListener('keydown', handleKeyDown);
      scrollElement.setAttribute('tabindex', '0');
      
      checkScrollPosition();
      
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
    " id="about">
      {/* Enhanced Cyber Grid Background */}
      <div className="
        absolute inset-0 opacity-20
        bg-[linear-gradient(90deg,rgba(0,170,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(0,170,255,0.1)_1px,transparent_1px)]
        bg-[size:50px_50px]
        animate-grid-move
      "></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyber-blue/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-cyan-400/15 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-400/20 rounded-full animate-ping"></div>
      </div>
      
      <div className="
        relative z-10 min-h-screen
        flex flex-col lg:flex-row items-center justify-center
        px-6 md:px-12 py-12 lg:py-24
        gap-12 lg:gap-16
      ">
        {/* Left side - Enhanced Terminal */}
        <div className="
          w-full max-w-lg lg:max-w-xl
          bg-gradient-to-br from-gray-900/95 to-black/95
          border border-cyber-blue/40
          rounded-xl overflow-hidden
          backdrop-blur-lg
          shadow-2xl shadow-cyber-blue/30
          transform hover:scale-[1.02] transition-all duration-500
          hover:shadow-cyber-blue/50
          hover:border-cyan-400/60
        ">
          {/* Enhanced Terminal Header */}
          <div className="
            flex items-center justify-between
            bg-gradient-to-r from-gray-800/90 to-gray-900/90
            px-4 py-3 border-b border-cyber-blue/30
            backdrop-blur-sm
          ">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" style={{animationDelay: '0.4s'}}></div>
            </div>
            <div className="
              font-fira text-xs text-cyber-blue
              bg-black/70 px-4 py-2 rounded-md
              border border-cyber-blue/40
              shadow-lg shadow-cyber-blue/20
            ">
              &gt; VISUAL_FEED_01.exe
            </div>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-cyber-blue/60 rounded-full animate-pulse" style={{animationDelay: `${i * 0.3}s`}}></div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Image Container */}
          <div className="relative overflow-hidden group">
            <img 
              src="about_us.jpg" 
              alt="AppinSciences Innovation Hub" 
              className="
                w-full h-64 md:h-80 lg:h-96
                object-cover filter
                transition-all duration-700
                group-hover:scale-110 group-hover:brightness-110
                group-hover:contrast-110
              "
            />
            
            {/* Enhanced Scan Lines */}
            <div className="
              absolute inset-0
              bg-[linear-gradient(transparent_50%,rgba(0,170,255,0.05)_50%)]
              bg-[size:100%_3px]
              animate-scan-rotate
              pointer-events-none
            "></div>
            
            {/* Enhanced Glitch Overlay */}
            <div className="
              absolute inset-0
              bg-gradient-to-r from-transparent via-cyber-blue/15 to-transparent
              translate-x-full animate-glitch-slide
              pointer-events-none
            "></div>
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyber-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Enhanced Terminal Footer */}
          <div className="
            bg-gradient-to-r from-gray-800/90 to-gray-900/90
            px-4 py-3 border-t border-cyber-blue/30
            backdrop-blur-sm
          ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="
                  font-fira text-xs text-green-400
                  bg-black/60 px-3 py-1 rounded-md
                  border border-green-400/30
                ">
                  STATUS: CONNECTED
                </span>
                <span className="font-fira text-xs text-gray-400">
                  PROTOCOL: <span className="text-cyber-blue">AIS_v2.0</span>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-1 h-4 bg-gradient-to-t from-cyber-blue to-cyan-400 rounded-full
                      animate-pulse
                    `}
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      opacity: 1 - (i * 0.15)
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Enhanced Data Panel */}
        <div className="
          w-full max-w-2xl
          relative
          bg-gradient-to-br from-gray-900/85 to-black/95
          border border-cyber-blue/50
          rounded-xl p-6 md:p-8
          backdrop-blur-lg
          shadow-2xl shadow-cyber-blue/30
          hover:shadow-cyber-blue/50 hover:border-cyan-400/60
          transition-all duration-500
        ">
          {/* Enhanced Panel Frame Effects */}
          <div className="absolute top-0 left-4 w-20 h-1 bg-gradient-to-r from-cyber-blue via-cyan-400 to-transparent rounded-full"></div>
          <div className="absolute top-4 left-0 w-1 h-20 bg-gradient-to-b from-cyber-blue via-cyan-400 to-transparent rounded-full"></div>
          <div className="absolute bottom-0 right-4 w-20 h-1 bg-gradient-to-l from-cyan-400 via-purple-400 to-transparent rounded-full"></div>
          <div className="absolute bottom-4 right-0 w-1 h-20 bg-gradient-to-t from-cyan-400 via-purple-400 to-transparent rounded-full"></div>

          {/* Enhanced Header */}
          <div className="mb-10">
            <div className="relative mb-6">
              <h2 className="
                font-orbitron font-black text-2xl md:text-3xl lg:text-4xl
                bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300
                bg-clip-text text-transparent
                mb-4
                relative
                after:content-['APPINSCIENCES_PROTOCOL']
                after:absolute after:top-0 after:left-0
                after:text-cyber-blue/15 after:animate-pulse
                after:transform after:translate-x-1 after:translate-y-1
                filter drop-shadow-lg
              "
              style={{
                textShadow: '0 0 30px rgba(0, 170, 255, 0.5)',
                filter: 'drop-shadow(0 0 20px rgba(0, 170, 255, 0.3))'
              }}>
                APPINSCIENCES_PROTOCOL
              </h2>
            </div>
            
            {/* Enhanced Data Stream */}
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex-1 h-px bg-gradient-to-r from-cyber-blue via-cyan-400 to-transparent"></div>
              <div className="flex space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-cyber-blue to-cyan-400 animate-pulse"
                    style={{animationDelay: `${i * 0.1}s`}}
                  ></div>
                ))}
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-cyan-400 via-purple-400 to-transparent"></div>
            </div>
          </div>

          {/* Enhanced Data Content */}
          <div className="space-y-8">
            {/* Foundation Block */}
            <div className="
              bg-black/40 border border-cyber-blue/30
              rounded-xl p-6
              hover:border-cyber-blue/50 hover:bg-black/50
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl hover:shadow-cyber-blue/20
              group
            ">
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-fira text-xs text-yellow-400
                  bg-yellow-400/10 px-3 py-1 rounded-full
                  border border-yellow-400/30
                ">
                  [2013.INIT]
                </span>
                <span className="
                  font-fira text-xs text-cyber-blue
                  bg-cyber-blue/10 px-3 py-1 rounded-full
                  border border-cyber-blue/30
                ">
                  FOUNDATION_PROTOCOL
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
                group-hover:text-gray-200 transition-colors duration-300
              ">
                ESTABLISHED IN 2013 AT ENSA EL JADIDA, APP IN 
                SCIENCES REPRESENTS A{' '}
                <span className="text-cyan-400 font-semibold bg-cyan-400/10 px-1 rounded">BOLD COMMITMENT</span>{' '}
                TO INNOVATION, CREATIVITY, AND STUDENT EMPOWERMENT.
              </p>
            </div>

            {/* Evolution Block */}
            <div className="
              bg-black/40 border border-purple-400/30
              rounded-xl p-6
              hover:border-purple-400/50 hover:bg-black/50
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-400/20
              group
            ">
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-fira text-xs text-purple-400
                  bg-purple-400/10 px-3 py-1 rounded-full
                  border border-purple-400/30
                ">
                  [EVOLUTION.LOG]
                </span>
                <span className="
                  font-fira text-xs text-purple-300
                  bg-purple-300/10 px-3 py-1 rounded-full
                  border border-purple-300/30
                ">
                  GROWTH_MATRIX
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
                group-hover:text-gray-200 transition-colors duration-300
              ">
                WHAT STARTED AS A{' '}
                <span className="text-pink-400 font-semibold bg-pink-400/10 px-1 rounded">SHARED DESIRE</span>{' '}
                TO MAKE STUDENT LIFE MORE DYNAMIC HAS GROWN INTO A POWERHOUSE OF 
                PASSIONATE ENGINEERS DEDICATED TO{' '}
                <span className="text-cyan-400 font-semibold bg-cyan-400/10 px-1 rounded">TURNING IDEAS INTO 
                REAL-WORLD IMPACT</span> THROUGH TECHNOLOGY.
              </p>
            </div>

            {/* Core System Block */}
            <div className="
              bg-black/40 border border-green-400/30
              rounded-xl p-6
              hover:border-green-400/50 hover:bg-black/50
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl hover:shadow-green-400/20
              group
            ">
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-fira text-xs text-green-400
                  bg-green-400/10 px-3 py-1 rounded-full
                  border border-green-400/30
                ">
                  [CORE.SYSTEM]
                </span>
                <span className="
                  font-fira text-xs text-green-300
                  bg-green-300/10 px-3 py-1 rounded-full
                  border border-green-300/30
                ">
                  PRIMARY_DIRECTIVES
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
                group-hover:text-gray-200 transition-colors duration-300
              ">
                AT THE HEART OF OUR CLUB ARE{' '}
                <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-1 rounded">CREATIVE MINDS</span>{' '}
                AND COLLABORATIVE SPIRITS—DRIVING{' '}
                <span className="text-cyan-400 font-semibold bg-cyan-400/10 px-1 rounded">IMPACTFUL 
                PROJECTS</span>, ORGANIZING NATIONAL-SCALE EVENTS, AND 
                DELIVERING VALUE BEYOND THE CLASSROOM.
              </p>
            </div>
          </div>

          {/* Enhanced Footer with system info */}
          <div className="mt-10 pt-6 border-t border-cyber-blue/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="font-fira text-xs text-gray-400">SYS_VER</div>
                <div className="font-orbitron text-sm text-cyber-blue font-bold">11.2.3</div>
              </div>
              <div className="text-center">
                <div className="font-fira text-xs text-gray-400">UPTIME</div>
                <div className="font-orbitron text-sm text-green-400 font-bold">∞</div>
              </div>
              <div className="text-center">
                <div className="font-fira text-xs text-gray-400">STATUS</div>
                <div className="font-orbitron text-sm text-green-400 font-bold">ACTIVE</div>
              </div>
              <div className="text-center">
                <div className="font-fira text-xs text-gray-400">MISSION</div>
                <div className="font-orbitron text-sm text-cyan-400 font-bold">∞</div>
              </div>
            </div>
            
            {/* Enhanced Progress bar */}
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div className="
                h-full bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300
                w-full animate-pulse
                shadow-lg shadow-cyber-blue/60
                relative
              ">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Executive Team Section */}
      <div className="relative z-10 py-16 md:py-24 px-6 md:px-12">
        {/* Team Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="
              font-fira text-sm text-cyan-400
              bg-cyan-400/10 px-6 py-3 rounded-full
              border border-cyan-400/30
              shadow-lg shadow-cyan-400/20
            ">
              [EXECUTIVE_TEAM.2025-2026]
            </span>
          </div>
          <h2 className="
            font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl
            bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300
            bg-clip-text text-transparent
            mb-6
            filter drop-shadow-lg
          "
          style={{
            textShadow: '0 0 40px rgba(0, 170, 255, 0.4)'
          }}>
            EXECUTIVE COMMAND STRUCTURE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto rounded-full"></div>
        </div>

        {/* Enhanced Horizontal Scroll Container */}
        <div className="relative">
          <div className="
            overflow-x-auto scrollbar-hide
            pb-8
          " 
          ref={teamScrollRef}
          style={{
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`
          }}>
            <div className="flex space-x-8 min-w-max px-8">
              {[
                { role: "President", img: "president.jpg", name: "[CLASSIFIED]", color: "from-red-500 to-pink-500" },
                { role: "Vice President", img: "vice-president.jpg", name: "[CLASSIFIED]", color: "from-blue-500 to-cyan-500" },
                
                { role: "General Secretary", img: "general-secretary.jpg", name: "[CLASSIFIED]", color: "from-green-500 to-teal-500" },
                { role: "Head of Media", img: "head-media.jpg", name: "[CLASSIFIED]", color: "from-purple-500 to-pink-500" },
                { role: "Head of Projects", img: "head-projects.jpg", name: "[CLASSIFIED]", color: "from-indigo-500 to-blue-500" },
                { role: "Sponsorship Manager", img: "sponsorship-events-manager.jpg", name: "[CLASSIFIED]", color: "from-teal-500 to-cyan-500" },
                { role: "Vice Sponsorship Manager", img: "vice-manager-sponsorship.jpg", name: "[CLASSIFIED]", color: "from-orange-500 to-red-500" }
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
                    bg-gradient-to-br from-gray-900/95 to-black/95
                    border border-cyber-blue/40
                    rounded-xl p-8
                    backdrop-blur-lg
                    shadow-lg shadow-cyber-blue/25
                    group-hover:shadow-2xl group-hover:shadow-cyan-400/40
                    group-hover:border-cyan-400/60
                    transition-all duration-500
                    overflow-hidden
                  ">
                    {/* Animated background gradient */}
                    <div className={`
                      absolute inset-0 opacity-0 group-hover:opacity-10
                      bg-gradient-to-br ${member.color}
                      transition-opacity duration-500
                    `}></div>

                    {/* Enhanced Cyberpunk Ring Container */}
                    <div className="relative mb-8 flex items-center justify-center">
                      {/* Outer Ring */}
                      <div className="
                        absolute inset-0 w-36 h-36 mx-auto
                        border-2 border-cyber-blue/50 rounded-full
                        animate-ring-rotate
                        group-hover:border-cyan-400/70
                        transition-colors duration-300
                      "></div>
                      
                      {/* Middle Ring */}
                      <div className="
                        absolute inset-3 w-30 h-30 mx-auto
                        border border-cyber-blue/40 rounded-full
                        animate-spin-reverse
                        group-hover:border-cyan-300/60
                        transition-colors duration-300
                      "></div>
                      
                      {/* Inner Ring */}
                      <div className="
                        absolute inset-6 w-24 h-24 mx-auto
                        border border-cyber-blue/30 rounded-full
                        animate-ring-rotate
                        group-hover:border-cyan-200/50
                        transition-colors duration-300
                      "></div>
                      
                      {/* Core Image Container */}
                      <div className="
                        relative w-20 h-20 mx-auto
                        rounded-full overflow-hidden
                        border-2 border-cyber-blue/60
                        group-hover:border-cyan-400/80
                        transition-all duration-500
                        group-hover:scale-110
                        shadow-lg shadow-cyber-blue/30
                        group-hover:shadow-cyan-400/50
                      ">
                        <img 
                          src={`team/${member.img}`} 
                          alt={member.role} 
                          className="
                            w-full h-full object-cover
                            filter grayscale group-hover:grayscale-0
                            transition-all duration-500
                            group-hover:contrast-110
                          "
                          draggable="false"
                        />
                        
                        {/* Photo Overlay */}
                        <div className={`
                          absolute inset-0
                          bg-gradient-to-t ${member.color} opacity-20
                          opacity-0 group-hover:opacity-30
                          transition-opacity duration-500
                        `}></div>
                        
                        {/* Enhanced Scan Effect */}
                        <div className="
                          absolute inset-0
                          bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent
                          translate-x-full group-hover:animate-glitch-slide
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                        "></div>
                      </div>

                      {/* Orbital particles */}
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`
                            absolute w-2 h-2 rounded-full
                            bg-gradient-to-r ${member.color}
                            opacity-0 group-hover:opacity-60
                            transition-opacity duration-500
                          `}
                          style={{
                            top: `${30 + Math.sin(i * 2) * 20}%`,
                            left: `${30 + Math.cos(i * 2) * 20}%`,
                            animation: `orbit ${3 + i}s linear infinite`,
                            animationPlayState: 'paused'
                          }}
                          onMouseEnter={(e) => e.target.style.animationPlayState = 'running'}
                          onMouseLeave={(e) => e.target.style.animationPlayState = 'paused'}
                        />
                      ))}
                    </div>
                    
                    {/* Enhanced Member Info */}
                    <div className="text-center space-y-3 relative z-10">
                      <div className="
                        font-orbitron font-bold text-sm md:text-base
                        text-cyber-blue
                        group-hover:text-cyan-400
                        transition-colors duration-300
                        tracking-wide
                      ">
                        {member.role}
                      </div>
                      <div className="
                        font-fira font-medium text-xs md:text-sm
                        text-gray-400
                        group-hover:text-gray-300
                        transition-colors duration-300
                        tracking-wider
                        bg-black/30 px-3 py-1 rounded-full
                        border border-gray-600/30
                        group-hover:border-cyan-400/30
                      ">
                        {member.name}
                      </div>
                    </div>
                    
                    {/* Enhanced Hover Accent Lines */}
                    <div className="
                      absolute top-4 left-4 w-10 h-0.5
                      bg-gradient-to-r from-cyber-blue to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute top-4 left-4 w-0.5 h-10
                      bg-gradient-to-b from-cyber-blue to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute bottom-4 right-4 w-10 h-0.5
                      bg-gradient-to-l from-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute bottom-4 right-4 w-0.5 h-10
                      bg-gradient-to-t from-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>

                    {/* Role badge */}
                    <div className="
                      absolute top-2 right-2
                      font-fira text-xs
                      bg-black/60 text-cyan-400
                      px-2 py-1 rounded-md
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      border border-cyan-400/30
                    ">
                      #{String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          <div className="flex items-center justify-center space-x-6 mt-12">
            <button 
              className={`
                flex items-center justify-center
                w-14 h-14 rounded-full
                border-2 transition-all duration-300
                ${!canScrollLeft || isScrolling
                  ? 'border-gray-600 text-gray-600 cursor-not-allowed opacity-50'
                  : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black hover:shadow-2xl hover:shadow-cyber-blue/60 hover:scale-110 hover:border-cyan-400'
                }
                backdrop-blur-sm
              `}
              onClick={() => scrollTeam('left')}
              disabled={!canScrollLeft || isScrolling}
              aria-label="Previous team members"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 18L9 12L15 6V18Z" />
              </svg>
            </button>
            
            {/* Scroll indicator dots */}
            <div className="flex space-x-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-cyber-blue/30 animate-pulse"
                  style={{animationDelay: `${i * 0.1}s`}}
                />
              ))}
            </div>
            
            <button 
              className={`
                flex items-center justify-center
                w-14 h-14 rounded-full
                border-2 transition-all duration-300
                ${!canScrollRight || isScrolling
                  ? 'border-gray-600 text-gray-600 cursor-not-allowed opacity-50'
                  : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black hover:shadow-2xl hover:shadow-cyber-blue/60 hover:scale-110 hover:border-cyan-400'
                }
                backdrop-blur-sm
              `}
              onClick={() => scrollTeam('right')}
              disabled={!canScrollRight || isScrolling}
              aria-label="Next team members"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 18L15 12L9 6V18Z" />
              </svg>
            </button>
          </div>

          {/* Enhanced Instructions */}
          <div className="
            text-center mt-8 space-y-2
            font-fira text-xs text-gray-500
          ">
            <div className="md:hidden">
              Swipe or drag to navigate • Tap to focus
            </div>
            <div className="hidden md:block">
              Use arrow keys or drag to navigate • Click to focus
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="relative z-10 flex justify-center pb-16">
        <ScrollIndicator 
          onClick={handleScroll}
          text="Initialize Next Module"
        />
      </div>

      {/* CSS for orbital animation */}
      <style jsx>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default AboutSection;