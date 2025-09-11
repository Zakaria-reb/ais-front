import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

const MembershipSection = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px 0px -100px 0px'
      }
    );

    observerRef.current = observer;

    // Observer tous les éléments animables
    elementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // CTA uses Link to /connexion now; no JS redirect required

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
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            visibleElements.has('header') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
          ref={el => elementsRef.current[0] = el}
          data-index="header"
        >
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
          <div 
            className={`text-center max-w-4xl mx-auto mb-16 transform transition-all duration-1000 ${
              visibleElements.has('description')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('description') ? '300ms' : '0ms' }}
            ref={el => elementsRef.current[1] = el}
            data-index="description"
          >
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
                className={`group relative overflow-hidden bg-black/40 border border-cyber-blue/20 rounded-xl backdrop-blur-sm hover:border-purple-400/40 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-400/20 h-80 transform ${
                  visibleElements.has(`benefit-${index}`)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ 
                  transitionDelay: visibleElements.has(`benefit-${index}`) ? `${600 + index * 150}ms` : '0ms'
                }}
                ref={el => elementsRef.current[index + 2] = el}
                data-index={`benefit-${index}`}
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
          <div 
            className={`text-center mb-12 transform transition-all duration-1000 ${
              visibleElements.has('cta')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('cta') ? '1200ms' : '0ms' }}
            ref={el => elementsRef.current[6] = el}
            data-index="cta"
          >
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
  className="group cursor-pointer"
>
  <div className="relative bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-400/40 rounded-lg px-8 py-4 group-hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/30 hover:-translate-y-1 hover:scale-105">
    <div className="flex items-center justify-center space-x-3">
      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
           style={{ boxShadow: '0 0 12px rgba(168, 85, 247, 0.8)' }}></div>
     
      <span className="font-rajdhani font-semibold text-xl tracking-wider text-white group-hover:text-purple-200 transition-colors duration-300"
            style={{ textShadow: '0 0 16px rgba(168, 85, 247, 0.8)' }}>
        JOIN NOW
      </span>
     
      <div className="flex space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  </div>
</Link>
            </div>
          </div>

          {/* System Status */}
          <div 
            className={`text-center mb-8 transform transition-all duration-1000 ${
              visibleElements.has('status')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('status') ? '1400ms' : '0ms' }}
            ref={el => elementsRef.current[7] = el}
            data-index="status"
          >
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
        <div className="relative z-10 flex justify-center pb-16">
        <ScrollIndicator
          targetSection="membership" // This will scroll to the membership section
          text="Join Our Community"
        />
      </div>
    </div>
  );
};

export default MembershipSection;