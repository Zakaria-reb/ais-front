import React, { useEffect, useRef, useState } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ContactSection = () => {
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

 

  const contactMethods = [
    {
      icon: "📧",
      label: "EMAIL",
      value: "contact@appinsciences.ma",
      description: "Send us your inquiries"
    },
    {
      icon: "📱",
      label: "PHONE",
      value: "+212 XX XX XX XX",
      description: "Direct communication line"
    },
    {
      icon: "📍",
      label: "LOCATION",
      value: "ENSA El Jadida, Morocco",
      description: "Visit us on campus"
    },
    {
      icon: "🌐",
      label: "SOCIAL",
      value: "@AppinSciences",
      description: "Follow our journey"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="contact-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 right-24 w-28 h-28 border border-cyber-blue/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-32 left-20 w-36 h-36 border-2 border-cyan-400/15 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-purple-400/20 rounded-full animate-bounce-slow"></div>
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
            <span className="font-fira text-sm text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/30">
              [COMMUNICATION_CHANNEL]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CONTACT US
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Description */}
          <div 
            className={`text-center max-w-4xl mx-auto mb-12 transform transition-all duration-1000 ${
              visibleElements.has('description')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('description') ? '300ms' : '0ms' }}
            ref={el => elementsRef.current[1] = el}
            data-index="description"
          >
            <p className="font-rajdhani text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              Ready to join our community of innovators? Have questions about our programs or want to 
              collaborate on a project? We'd love to hear from you.
            </p>
            <p className="font-rajdhani text-base md:text-lg text-white/70 leading-relaxed">
              Reach out through our channels, send us an email, or visit us on campus. 
              Our doors are always open to curious minds and passionate builders.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`group bg-black/40 border border-cyber-blue/20 rounded-xl p-6 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-400/20 transform ${
                  visibleElements.has(`contact-${index}`)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ 
                  transitionDelay: visibleElements.has(`contact-${index}`) ? `${600 + index * 150}ms` : '0ms'
                }}
                ref={el => elementsRef.current[index + 2] = el}
                data-index={`contact-${index}`}
              >
                {/* Icon */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300 group-hover:scale-110">
                    <span className="text-2xl">{method.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-orbitron text-sm font-bold text-blue-400 mb-2 tracking-wider group-hover:text-cyan-400 transition-colors duration-300">
                    {method.label}
                  </h3>
                  <p className="font-rajdhani text-white text-sm mb-2 group-hover:text-blue-100 transition-colors duration-300">
                    {method.value}
                  </p>
                  <p className="font-rajdhani text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                    {method.description}
                  </p>
                </div>

                {/* Hover Effects */}
                <div className="absolute top-2 left-2 w-6 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-2 left-2 w-0.5 h-6 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 right-2 w-6 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 right-2 w-0.5 h-6 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Status Indicator */}
          <div 
            className={`text-center mt-8 transform transition-all duration-1000 ${
              visibleElements.has('status')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('status') ? '1200ms' : '0ms' }}
            ref={el => elementsRef.current[6] = el}
            data-index="status"
          >
            <div className="inline-flex items-center space-x-3 bg-black/30 border border-blue-400/20 rounded-lg px-6 py-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="font-fira text-sm text-blue-400">
                COMMUNICATION_STATUS: <span className="text-white">ONLINE</span>
              </span>
            </div>
          </div>
        </div>
      </div>
     
      <ScrollIndicator
        onClick={handleScroll}
        text="Join Our\nCommunity"
      />
    </div>
  );
};

export default ContactSection;