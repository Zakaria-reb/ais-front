import React, { useEffect, useRef, useState } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ActivitiesSection = () => {
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

  const activities = [
    {
      title: "Cyber Security Training",
      description: "Comprehensive cybersecurity workshops covering threat detection, ethical hacking, and security protocols",
      image: "/activities/cb.jpg",
      alt: "Cyber Security Training",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "IT Form - Web Development",
      description: "Full-stack web development bootcamp covering modern frameworks and technologies",
      image: "/activities/itform.jpg",
      alt: "IT Form Web Development",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Photoshop Creative Workshop",
      description: "Master digital design and photo manipulation with industry-standard tools",
      image: "/activities/photoshop.png",
      alt: "Photoshop Workshop",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "AI & Intelligent Systems",
      description: "Explore artificial intelligence, machine learning, and intelligent energy systems",
      image: "/activities/activit.jpg",
      alt: "AI Systems Training",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Innovation Challenge",
      description: "Scientific innovation days focusing on breakthrough technologies and research",
      image: "/img/innovation.jpg",
      alt: "Innovation Challenge",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Cloud Computing Azure",
      description: "Hands-on training in cloud platforms, Azure services, and OpenStack technologies",
      image: "/img/cloud-computing.jpg",
      alt: "Cloud Computing Training",
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Professional Development",
      description: "Leadership workshops and professional skill development programs",
      image: "/img/professional-dev.jpg",
      alt: "Professional Development",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Scientific Research Programs",
      description: "Research methodology workshops and scientific innovation competitions",
      image: "/img/scientific-research.jpg",
      alt: "Scientific Research",
      color: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="activities-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyber-blue/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-cyan-400/20 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-400/25 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-green-400/20 rounded-full animate-bounce"></div>
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
            <span className="font-fira text-sm text-cyber-blue bg-cyber-blue/10 px-4 py-2 rounded-full border border-cyber-blue/30">
              [TRAINING_AND_ACTIVITIES]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              OUR TRAINING PROGRAMS
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto"></div>
        </div>

        {/* Activities Grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`group relative bg-black/40 border border-cyber-blue/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyber-blue/40 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyber-blue/20 ${
                  visibleElements.has(`activity-${index}`)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ 
                  transitionDelay: visibleElements.has(`activity-${index}`) ? `${index * 100}ms` : '0ms'
                }}
                ref={el => elementsRef.current[index + 1] = el}
                data-index={`activity-${index}`}
              >
                {/* Activity Image */}
                <div className="flex items-center justify-center w-full h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <img 
                    src={activity.image} 
                    alt={activity.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <h3 className="font-orbitron text-lg font-bold text-white mb-3 text-center group-hover:text-cyber-blue transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="font-rajdhani text-sm text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {activity.description}
                </p>

                {/* Progress Indicator */}
                <div className="mt-4 flex justify-center">
                  <div className="bg-black/30 border border-cyber-blue/20 rounded-full px-3 py-1">
                    <span className="font-fira text-xs text-green-400">ACTIVE</span>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="absolute top-2 left-2 w-4 h-0.5 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-2 left-2 w-0.5 h-4 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 right-2 w-4 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 right-2 w-0.5 h-4 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glowing border effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${activity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div 
            className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${
              visibleElements.has('description')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('description') ? '800ms' : '0ms' }}
            ref={el => elementsRef.current[activities.length + 1] = el}
            data-index="description"
          >
            <p className="font-rajdhani text-lg text-white/80 leading-relaxed mb-8">
              Our comprehensive training programs cover cutting-edge technologies from cybersecurity to cloud computing. 
              Each program is designed by industry experts to provide hands-on experience with the latest tools and methodologies. 
              Join our community of learners and advance your technical expertise through practical, project-based learning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-black/30 border border-cyber-blue/20 rounded-lg px-4 py-2">
                <span className="font-fira text-sm text-cyber-blue">
                  PROGRAMS: <span className="text-green-400">{activities.length} ACTIVE</span>
                </span>
              </div>
              <div className="bg-black/30 border border-purple-400/20 rounded-lg px-4 py-2">
                <span className="font-fira text-sm text-purple-400">
                  STATUS: <span className="text-green-400">ENROLLMENT_OPEN</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 flex justify-center pb-16">
        <ScrollIndicator
          targetSection="events"
          text="Explore Our Events"
        />
      </div>
    </div>
  );
};

export default ActivitiesSection;