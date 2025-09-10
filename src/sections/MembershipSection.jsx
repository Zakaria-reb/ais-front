import React from "react";
import { Link } from 'react-router-dom';

const MembershipSection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleJoinRedirect = () => {
    window.location.href = '/inscription';
  };

  const membershipBenefits = [
    {
      title: "Exclusive Workshops",
      description: "Access to advanced technical training sessions",
      image: "/img/im1.jpg",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Mentorship Programs",
      description: "One-on-one guidance from industry professionals",
      image: "/img/im2.jpg",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Project Collaboration",
      description: "Work on real-world impactful projects",
      image: "/img/im3.jpg",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Networking Events",
      description: "Connect with tech leaders and innovators",
      image: "/img/im4.jpg",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="membership-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-24 left-16 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-24 right-20 w-40 h-40 border-2 border-cyber-blue/15 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-cyan-400/25 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-purple-400 bg-purple-400/10 px-4 py-2 rounded-full border border-purple-400/30">
              [MEMBERSHIP_PROTOCOL]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              JOIN THE MOVEMENT
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto mb-16">
          {/* Description */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="font-rajdhani text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              Become part of a vibrant community where innovation thrives and ideas become reality. 
              Our membership opens doors to exclusive workshops, mentorship programs, and networking opportunities.
            </p>
            <p className="font-rajdhani text-base md:text-lg text-white/70 leading-relaxed">
              Whether you're a beginner eager to learn or an experienced developer looking to share knowledge, 
              there's a place for you in our community.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {membershipBenefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-black/40 border border-cyber-blue/20 rounded-xl backdrop-blur-sm hover:border-purple-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-400/20 h-80"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110 transform"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${benefit.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="text-center">
                    <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300 drop-shadow-lg">
                      {benefit.title}
                    </h3>
                    <p className="font-rajdhani text-gray-200 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 drop-shadow-md">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="absolute top-2 left-2 w-6 h-0.5 bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                <div className="absolute top-2 left-2 w-0.5 h-6 bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                <div className="absolute bottom-2 right-2 w-6 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                <div className="absolute bottom-2 right-2 w-0.5 h-6 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              </div>
            ))}
          </div>

          {/* Call to Action - Simplified */}
          <div className="text-center mb-12">
            <div className="inline-block bg-black/30 border border-purple-400/20 rounded-xl p-12 backdrop-blur-sm max-w-3xl">
              <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Future?
              </h3>
              <p className="font-rajdhani text-lg text-gray-300 mb-8 leading-relaxed">
                Join hundreds of students who have already started their journey with us. 
                Get access to cutting-edge resources, mentorship, and opportunities that will 
                accelerate your career in technology.
              </p>
              <Link 
                to="/connexion"
                className="inline-block bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-lg font-rajdhani font-semibold text-xl hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:scale-105"
              >
                Join Now
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4 bg-black/30 border border-purple-400/20 rounded-lg px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-fira text-sm text-purple-400">
                  REGISTRATION: <span className="text-green-400">OPEN</span>
                </span>
              </div>
              <div className="w-px h-4 bg-purple-400/30"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-fira text-sm text-purple-400">
                  MEMBERS: <span className="text-blue-400">200+</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center">
          <div
            className="inline-flex items-center justify-center gap-4 cursor-pointer p-6 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 transition-all duration-500 hover:bg-cyber-blue/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyber-blue/30 group"
            onClick={handleScrollToTop}
          >
            <span className="font-orbitron text-lg font-medium tracking-[2px] text-cyber-blue uppercase group-hover:text-cyan-400 transition-colors duration-300">
              Return to Base
            </span>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-cyber-blue group-hover:border-b-cyan-400 transition-colors duration-300"
                   style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}></div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-cyber-blue/70 group-hover:border-b-cyan-400/70 transition-colors duration-300 transform scale-75"
                   style={{ filter: 'drop-shadow(0 0 6px rgba(0, 170, 255, 0.4))' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;