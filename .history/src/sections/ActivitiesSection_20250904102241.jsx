import React from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ActivitiesSection = () => {
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
      image: "../", // Remplacez par le chemin de votre image
      alt: "Hackathon icon",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Tech Workshops",
      description: "Hands-on learning sessions covering cutting-edge technologies",
      image: "/images/workshop-icon.png", // Remplacez par le chemin de votre image
      alt: "Workshop icon",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Innovation Labs",
      description: "Collaborative spaces for breakthrough project development",
      image: "/images/innovation-icon.png", // Remplacez par le chemin de votre image
      alt: "Innovation lab icon",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Industry Networking",
      description: "Connect with professionals and expand your professional network",
      image: "/images/networking-icon.png", // Remplacez par le chemin de votre image
      alt: "Networking icon",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="activities-section">
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
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto"></div>
        </div>

        {/* Activities Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="group relative bg-black/40 border border-cyber-blue/20 rounded-xl p-8 backdrop-blur-sm hover:border-cyber-blue/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyber-blue/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Activity Image */}
                <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto">
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <img 
                      src={activity.image} 
                      alt={activity.alt}
                      className="w-8 h-8 object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-orbitron text-xl font-bold text-white mb-4 text-center group-hover:text-cyber-blue transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="font-rajdhani text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {activity.description}
                </p>

                {/* Hover Effects */}
                <div className="absolute top-2 left-2 w-6 h-0.5 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-2 left-2 w-0.5 h-6 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 right-2 w-6 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 right-2 w-0.5 h-6 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="font-rajdhani text-lg text-white/80 leading-relaxed mb-8">
              From coding workshops to innovation challenges, we offer a diverse range of activities designed to 
              enhance your technical skills and creative thinking. Join us for transformative experiences that 
              connect you with industry professionals and like-minded peers.
            </p>
            <div className="flex justify-center">
              <div className="bg-black/30 border border-cyber-blue/20 rounded-lg px-6 py-3">
                <span className="font-fira text-sm text-cyber-blue">
                  STATUS: <span className="text-green-400">ACTIVE_ENGAGEMENT</span>
                </span>
              </div>
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