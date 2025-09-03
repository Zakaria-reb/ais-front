import React, { useState } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ContactSection = () => {
  const [hoveredContact, setHoveredContact] = useState(null);
  
  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 5, // Scroll vers membership
      behavior: 'smooth'
    });
  };

  const contactMethods = [
    {
      id: 'email',
      title: 'EMAIL_PROTOCOL',
      icon: '📧',
      primary: 'contact@appinsciences.com',
      secondary: 'Join our mailing list',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-400/30 hover:border-blue-400/60'
    },
    {
      id: 'location',
      title: 'PHYSICAL_NODE',
      icon: '📍',
      primary: 'ENSA El Jadida',
      secondary: 'Route de Casablanca, El Jadida',
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-400/30 hover:border-green-400/60'
    },
    {
      id: 'social',
      title: 'SOCIAL_NETWORKS',
      icon: '🔗',
      primary: '@AppinSciences',
      secondary: 'Follow our latest updates',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-400/30 hover:border-purple-400/60'
    },
    {
      id: 'phone',
      title: 'VOICE_CHANNEL',
      icon: '📱',
      primary: '+212 6XX XXX XXX',
      secondary: 'Direct line to our team',
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-400/30 hover:border-orange-400/60'
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="contact-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-20 w-32 h-32 border border-cyber-blue/20 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-24 h-24 border border-cyan-400/30 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-green-400/25 rotate-45 animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="font-fira text-sm text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/30">
              [COMMUNICATION_PROTOCOLS]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CONTACT INTERFACE
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ready to join our community of innovators? Initialize communication through multiple channels. 
            Our response protocols are optimized for rapid engagement.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          