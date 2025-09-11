import React, { useRef, useState, useEffect } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ActivitiesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const descriptionRef = useRef(null);
  
  // Animation states
  const [isVisible, setIsVisible] = useState({
    section: false,
    header: false,
    grid: false,
    description: false,
    activities: Array(4).fill(false)
  });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-5% 0px -5% 0px',
      threshold: [0.1, 0.3, 0.5, 0.7]
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const isIntersecting = entry.isIntersecting;
        const ratio = entry.intersectionRatio;

        if (target === sectionRef.current && ratio >= 0.1) {
          setIsVisible(prev => ({ ...prev, section: isIntersecting }));
        }
        
        if (target === headerRef.current && ratio >= 0.3) {
          setIsVisible(prev => ({ ...prev, header: isIntersecting }));
        }
        
        if (target === gridRef.current && ratio >= 0.2) {
          setIsVisible(prev => ({ ...prev, grid: isIntersecting }));
          
          if (isIntersecting) {
            // Animate activities with staggered delay
            const newActivities = Array(4).fill(false);
            newActivities.forEach((_, index) => {
              setTimeout(() => {
                setIsVisible(prev => ({
                  ...prev,
                  activities: prev.activities.map((activity, i) => 
                    i === index ? true : activity
                  )
                }));
              }, index * 200);
            });
          }
        }
        
        if (target === descriptionRef.current && ratio >= 0.3) {
          setIsVisible(prev => ({ ...prev, description: isIntersecting }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 6.7, // Scroll to events section
      behavior: 'smooth'
    });
  };

  const activities = [
    {
      title: "Hackathons & Competitions",
      description: "24-hour coding marathons where innovative solutions are born",
      image: "/img/im1.jpg",
      alt: "Hackathon icon",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Tech Workshops",
      description: "Hands-on learning sessions covering cutting-edge technologies",
      image: "/img/im2.jpg",
      alt: "Workshop icon",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Innovation Labs",
      description: "Collaborative spaces for breakthrough project development",
      image: "/img/im3.jpg",
      alt: "Innovation lab icon",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Industry Networking",
      description: "Connect with professionals and expand your professional network",
      image: "/img/im4.jpg",
      alt: "Networking icon",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className={`
        min-h-screen relative 
        bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest 
        overflow-hidden
        transition-all duration-1500 ease-out
        ${isVisible.section 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-10'
        }
      `} 
      id="activities-section"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyber-blue/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-cyan-400/20 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-400/25 rotate-45 animate-pulse"></div>
      </div>

      {/* Enhanced Grid Background */}
      <div className="
        absolute inset-0 opacity-15
        bg-[linear-gradient(90deg,rgba(0,170,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(0,170,255,0.08)_1px,transparent_1px)]
        bg-[size:60px_60px]
        animate-grid-move
      "></div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Enhanced Header with scroll animation */}
        <div 
          ref={headerRef}
          className={`
            text-center mb-16
            transition-all duration-1000 ease-out
            ${isVisible.header 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform -translate-y-8'
            }
          `}
          style={{
            transitionDelay: isVisible.header ? '200ms' : '0ms'
          }}
        >
          <div className="inline-block mb-6">
            <span className="
              font-fira text-sm text-cyber-blue 
              bg-cyber-blue/10 px-6 py-3 rounded-full 
              border border-cyber-blue/30
              shadow-lg shadow-cyber-blue/20
              backdrop-blur-sm
            ">
              [ENGAGEMENT_PROTOCOLS]
            </span>
          </div>
          <h2 className="
            font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6
            relative
          ">
            <span className="
              bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300 
              bg-clip-text text-transparent
              drop-shadow-lg
            ">
              OUR ACTIVITIES
            </span>
            {/* Animated underline */}
            <div className="
              absolute -bottom-2 left-1/2 transform -translate-x-1/2
              w-0 h-1 bg-gradient-to-r from-cyber-blue to-cyan-400
              transition-all duration-1000 ease-out
              rounded-full
            " style={{
              width: isVisible.header ? '120px' : '0px',
              transitionDelay: isVisible.header ? '600ms' : '0ms'
            }}></div>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto rounded-full"></div>
        </div>

        {/* Enhanced Activities Grid with staggered animations */}
        <div 
          ref={gridRef}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`
                  group relative 
                  bg-black/40 border border-cyber-blue/20 rounded-xl p-8 
                  backdrop-blur-sm 
                  hover:border-cyber-blue/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyber-blue/20
                  transition-all duration-500 ease-out
                  ${isVisible.activities[index] 
                    ? 'opacity-100 transform translate-y-0 scale-100' 
                    : 'opacity-0 transform translate-y-12 scale-95'
                  }
                `}
                style={{ 
                  transitionDelay: isVisible.activities[index] ? `${index * 200}ms` : '0ms'
                }}
              >
                {/* Enhanced gradient background on hover */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-10
                  bg-gradient-to-br ${activity.color}
                  rounded-xl transition-opacity duration-500
                `}></div>

                {/* Enhanced Activity Image */}
                <div className="relative flex items-center justify-center w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.alt}
                    className="
                      w-full h-full object-cover 
                      group-hover:scale-105 transition-transform duration-500
                      filter brightness-90 contrast-110
                      group-hover:brightness-110
                    "
                  />
                  
                  {/* Image overlay effects */}
                  <div className="
                    absolute inset-0
                    bg-gradient-to-t from-black/30 via-transparent to-black/10
                    group-hover:from-black/20
                    transition-all duration-500
                  "></div>
                  
                  {/* Scan lines effect */}
                  <div className="
                    absolute inset-0
                    bg-[linear-gradient(transparent_50%,rgba(0,170,255,0.05)_50%)]
                    bg-[size:100%_2px]
                    opacity-0 group-hover:opacity-100
                    animate-scan-move
                    transition-opacity duration-300
                  "></div>
                </div>

                {/* Enhanced Content */}
                <h3 className="
                  font-orbitron text-xl font-bold text-white mb-4 text-center 
                  group-hover:text-cyber-blue transition-colors duration-300
                  drop-shadow-lg
                ">
                  {activity.title}
                </h3>
                <p className="
                  font-rajdhani text-gray-300 text-center leading-relaxed 
                  group-hover:text-gray-200 transition-colors duration-300
                  text-base
                ">
                  {activity.description}
                </p>

                {/* Enhanced Corner Accents */}
                <div className="absolute top-3 left-3 w-8 h-0.5 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute top-3 left-3 w-0.5 h-8 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-3 right-3 w-8 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-3 right-3 w-0.5 h-8 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Activity number badge */}
                <div className="
                  absolute top-3 right-3
                  font-fira text-xs
                  bg-black/70 text-cyber-blue
                  px-2 py-1 rounded-md
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  border border-cyber-blue/30
                  backdrop-blur-sm
                ">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Hover glow effect */}
                <div className={`
                  absolute inset-0 -z-10
                  bg-gradient-to-br ${activity.color}
                  opacity-0 group-hover:opacity-20
                  blur-xl rounded-xl
                  transition-opacity duration-700
                  transform scale-110
                `}></div>
              </div>
            ))}
          </div>

          {/* Enhanced Description with scroll animation */}
          <div 
            ref={descriptionRef}
            className={`
              text-center max-w-4xl mx-auto
              transition-all duration-1000 ease-out
              ${isVisible.description 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible.description ? '300ms' : '0ms'
            }}
          >
            <p className="
              font-rajdhani text-lg text-white/80 leading-relaxed mb-8
              backdrop-blur-sm
            ">
              From coding workshops to innovation challenges, we offer a diverse range of activities designed to 
              enhance your technical skills and creative thinking. Join us for transformative experiences that 
              connect you with industry professionals and like-minded peers.
            </p>
            
            {/* Enhanced Status Panel */}
            <div className="flex justify-center">
              <div className="
                bg-black/40 border border-cyber-blue/30 rounded-xl px-8 py-4
                backdrop-blur-sm
                hover:border-cyber-blue/50 hover:bg-black/50
                transition-all duration-300
                shadow-lg shadow-cyber-blue/10
                hover:shadow-cyber-blue/30
                group
              ">
                <span className="font-fira text-sm text-cyber-blue">
                  STATUS: <span className="
                    text-green-400 font-bold
                    group-hover:text-green-300
                    transition-colors duration-300
                  ">ACTIVE_ENGAGEMENT</span>
                </span>
                
                {/* Status indicator lights */}
                <div className="flex items-center justify-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"
                      style={{animationDelay: `${i * 0.2}s`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Explore Our Events"
      />

      {/* Additional CSS animations */}
      <style jsx>{`
        @keyframes scan-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        .animate-scan-move {
          animation: scan-move 2s ease-in-out infinite;
        }
        
        .animate-grid-move {
          animation: grid-move 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ActivitiesSection;