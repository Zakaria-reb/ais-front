import React, { useRef, useState, useEffect, useCallback } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const AboutSection = () => {
  const teamScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const teamSectionRef = useRef(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Animation states
  const [isVisible, setIsVisible] = useState({
    leftPanel: false,
    rightPanel: false,
    teamSection: false,
    teamHeader: false,
    teamMembers: Array(8).fill(false)
  });
  
  const momentumRef = useRef({
    lastScrollLeft: 0,
    velocity: 0,
    timestamp: Date.now(),
    animationId: null,
    isDragging: false,
    startX: 0,
    startScrollLeft: 0
  });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0.1, 0.3, 0.5, 0.7]
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const isIntersecting = entry.isIntersecting;
        const ratio = entry.intersectionRatio;

        if (target === leftPanelRef.current && ratio >= 0.3) {
          setIsVisible(prev => ({ ...prev, leftPanel: isIntersecting }));
        }
        
        if (target === rightPanelRef.current && ratio >= 0.2) {
          setIsVisible(prev => ({ ...prev, rightPanel: isIntersecting }));
        }
        
        if (target === teamSectionRef.current && ratio >= 0.1) {
          setIsVisible(prev => ({ ...prev, teamSection: isIntersecting }));
          
          if (isIntersecting) {
            // Animate team header first
            setTimeout(() => {
              setIsVisible(prev => ({ ...prev, teamHeader: true }));
            }, 300);
            
            // Then animate team members with staggered delay
            setTimeout(() => {
              const newTeamMembers = Array(8).fill(false);
              newTeamMembers.forEach((_, index) => {
                setTimeout(() => {
                  setIsVisible(prev => ({
                    ...prev,
                    teamMembers: prev.teamMembers.map((member, i) => 
                      i === index ? true : member
                    )
                  }));
                }, index * 150);
              });
            }, 600);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (leftPanelRef.current) observer.observe(leftPanelRef.current);
    if (rightPanelRef.current) observer.observe(rightPanelRef.current);
    if (teamSectionRef.current) observer.observe(teamSectionRef.current);

    return () => observer.disconnect();
  }, []);

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

      const m = momentumRef.current;
      if (m && m.animationId) {
        cancelAnimationFrame(m.animationId);
      }

      clearTimeout(window.snapTimeout);
    };
  }, [handleScroll2, handleMouseDown, handleMouseMove2, handleMouseUp, handleMouseMove, handleKeyDown, checkScrollPosition]);

  return (
    <div className="
      min-h-screen relative
      bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest
      overflow-hidden
    " id="about" ref={sectionRef}>
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
        {/* Left side - Enhanced Terminal with scroll animation */}
        <div 
          ref={leftPanelRef}
          className={`
            w-full max-w-lg lg:max-w-xl
            bg-gradient-to-br from-gray-900/95 to-black/95
            border border-cyber-blue/40
            rounded-xl overflow-hidden
            backdrop-blur-lg
            shadow-2xl shadow-cyber-blue/30
            transform hover:scale-[1.02] transition-all duration-500
            hover:shadow-cyber-blue/50
            hover:border-cyan-400/60
            ${isVisible.leftPanel 
              ? 'opacity-100 translate-x-0 translate-y-0' 
              : 'opacity-0 -translate-x-20 translate-y-10'
            }
            transition-all duration-1000 ease-out
          `}
          style={{
            transitionDelay: isVisible.leftPanel ? '0ms' : '0ms'
          }}
        >
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

        {/* Right side - Enhanced Data Panel with scroll animation */}
        <div 
          ref={rightPanelRef}
          className={`
            w-full max-w-2xl
            relative
            bg-gradient-to-br from-gray-900/85 to-black/95
            border border-cyber-blue/50
            rounded-xl p-6 md:p-8
            backdrop-blur-lg
            shadow-2xl shadow-cyber-blue/30
            hover:shadow-cyber-blue/50 hover:border-cyan-400/60
            transform transition-all duration-1200 ease-out
            ${isVisible.rightPanel 
              ? 'opacity-100 translate-x-0 translate-y-0' 
              : 'opacity-0 translate-x-20 translate-y-10'
            }
          `}
          style={{
            transitionDelay: isVisible.rightPanel ? '200ms' : '0ms'
          }}
        >
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

          {/* Enhanced Data Content with staggered animation */}
          <div className="space-y-8">
            {/* Foundation Block */}
            <div className={`
              bg-black/40 border border-cyber-blue/30
              rounded-xl p-6
              hover:border-cyber-blue/50 hover:bg-black/50
              transition-all duration-500
              hover:-translate-y-1 hover:shadow-xl hover:shadow-cyber-blue/20
              group
              ${isVisible.rightPanel 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible.rightPanel ? '400ms' : '0ms'
            }}>
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
            <div className={`
              bg-black/40 border border-purple-400/30
              rounded-xl p-6
              hover:border-purple-400/50 hover:bg-black/50
              transition-all duration-500
              hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-400/20
              group
              ${isVisible.rightPanel 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible.rightPanel ? '600ms' : '0ms'
            }}>
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
            <div className={`
              bg-black/40 border border-green-400/30
              rounded-xl p-6
              hover:border-green-400/50 hover:bg-black/50
              transition-all duration-500
              hover:-translate-y-1 hover:shadow-xl hover:shadow-green-400/20
              group
              ${isVisible.rightPanel 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible.rightPanel ? '800ms' : '0ms'
            }}>
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

          {/* Enhanced Footer with system info - animated */}
          <div className={`
            mt-10 pt-6 border-t border-cyber-blue/30
            transition-all duration-500
            ${isVisible.rightPanel 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{
            transitionDelay: isVisible.rightPanel ? '1000ms' : '0ms'
          }}>
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
            
            {/* Enhance