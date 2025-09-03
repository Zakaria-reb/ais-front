import React, { useState, useRef, useEffect } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ActivitiesSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 3, // Scroll vers events
      behavior: 'smooth'
    });
  };

  const activities = [
    {
      title: "Hackathons & Competitions",
      description: "24-hour coding marathons where innovative solutions are born. Collaborate with peers to solve real-world challenges.",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
      accentColor: "purple-400",
      features: ["Team Building", "Problem Solving", "Prize Awards", "Industry Mentoring"],
      frequency: "Monthly"
    },
    {
      title: "Tech Workshops",
      description: "Hands-on learning sessions covering cutting-edge technologies and industry best practices.",
      icon: "🔧",
      color: "from-blue-500 to-cyan-500",
      accentColor: "cyan-400",
      features: ["Skill Development", "Certifications", "Expert Instructors", "Practical Projects"],
      frequency: "Weekly"
    },
    {
      title: "Innovation Labs",
      description: "Collaborative spaces for breakthrough project development and research initiatives.",
      icon: "🔬",
      color: "from-green-500 to-teal-500",
      accentColor: "emerald-400",
      features: ["Research Projects", "Prototyping", "Lab Access", "Peer Collaboration"],
      frequency: "Ongoing"
    },
    {
      title: "Industry Networking",
      description: "Connect with professionals and expand your network through exclusive events and meetups.",
      icon: "🤝",
      color: "from-orange-500 to-red-500",
      accentColor: "orange-400",
      features: ["Professional Contacts", "Career Guidance", "Job Opportunities", "Mentorship"],
      frequency: "Bi-weekly"
    }
  ];

  // Intersection Observer pour les animations d'entrée
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" 
      id="activities-section"
    >
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
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Diverse experiences designed to enhance technical skills, foster creativity, and build lasting professional connections.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {activities.map((activity, index) => (
              <div
                key={index}
                data-index={index}
                className={`
                  group relative bg-black/40 border border-cyber-blue/20 rounded-2xl p-8
                  backdrop-blur-sm transition-all duration-700
                  hover:border-cyber-blue/40 hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyber-blue/20
                  ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ 
                  transitionDelay: `${index * 0.2}s`
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`
                        flex items-center justify-center w-14 h-14 rounded-xl
                        bg-gradient-to-r ${activity.color} text-2xl
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        {activity.icon}
                      </div>
                      <div>
                        <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-cyber-blue transition-colors duration-300">
                          {activity.title}
                        </h3>
                        <span className={`font-fira text-xs text-${activity.accentColor} bg-${activity.accentColor}/10 px-2 py-1 rounded`}>
                          {activity.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="font-rajdhani text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                  {activity.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-orbitron text-sm font-semibold text-cyber-blue mb-3 tracking-wide">
                    KEY_FEATURES
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activity.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="
                          bg-black/30 border border-gray-700/50 rounded-lg px-3 py-2
                          font-rajdhani text-sm text-gray-300
                          hover:border-cyber-blue/30 transition-colors duration-300
                        "
                      >
                        • {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className={`
                  w-full py-3 rounded-lg font-orbitron text-sm font-semibold tracking-wide
                  bg-gradient-to-r ${activity.color} text-white
                  hover:shadow-lg hover:scale-105
                  transition-all duration-300
                  opacity-0 group-hover:opacity-100
                `}>
                  LEARN MORE
                </button>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-6 h-0.5 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4 w-0.5 h-6 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 right-4 w-6 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 right-4 w-0.5 h-6 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="bg-black/30 border border-cyber-blue/20 rounded-xl p-8 backdrop-blur-sm mb-8">
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
              JOIN THE <span className="text-cyber-blue">INNOVATION</span> ECOSYSTEM
            </h3>
            <p className="font-rajdhani text-lg text-gray-300 leading-relaxed mb-6">
              From beginner-friendly workshops to advanced research labs, our activities cater to all skill levels. 
              Connect with peers, learn from experts, and build projects that make a real impact.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="font-orbitron text-3xl font-bold text-cyber-blue">50+</div>
                <div className="font-rajdhani text-gray-400">Monthly Activities</div>
              </div>
              <div className="space-y-2">
                <div className="font-orbitron text-3xl font-bold text-cyan-400">200+</div>
                <div className="font-rajdhani text-gray-400">Active Members</div>
              </div>
              <div className="space-y-2">
                <div className="font-orbitron text-3xl font-bold text-purple-400">15+</div>
                <div className="font-rajdhani text-gray-400">Industry Partners</div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex justify-center">
            <div className="bg-black/30 border border-cyber-blue/20 rounded-lg px-6 py-3">
              <span className="font-fira text-sm text-cyber-blue">
                STATUS: <span className="text-green-400">ACTIVELY_RECRUITING</span>
              </span>
            </div>
          </div>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Explore Our Events"
      />
    </div>
  );
};

export default ActivitiesSection;