import React from "react";

const ScrollIndicator = ({
  targetSection = "about",
  text = "Scroll Down to Learn\nMore About Us",
  className = ""
}) => {
  const scrollToSection = () => {
    const element = document.getElementById(targetSection);
    if (element) {
      const navHeight = 80;
      const elementTop = element.offsetTop - navHeight;
     
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  const textLines = text.split('\n');

  return (
    <div
      className={`flex flex-col items-center gap-4 cursor-pointer transition-all duration-300 hover:scale-110 group ${className}`}
      onClick={scrollToSection}
    >
      {/* Text content */}
      <div
        className="font-orbitron text-sm lg:text-xs font-medium tracking-[2px] text-white/80 uppercase text-center leading-relaxed transition-all duration-300 group-hover:text-white group-hover:scale-105"
        style={{ textShadow: '0 0 10px rgba(0, 170, 255, 0.5)' }}
      >
        {textLines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < textLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
     
      {/* Animated arrows */}
      <div className="flex flex-col gap-1 items-center">
        {[1, 0.75, 0.5].map((scale, index) => (
          <div
            key={index}
            className={`w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyber-blue transition-all duration-300 group-hover:border-t-cyan-400`}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))',
              opacity: 0.8 - (index * 0.25),
              transform: `scale(${scale})`,
              animation: `bounce 2s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0) scale(var(--scale, 1));
          }
          40%, 43% {
            transform: translateY(-8px) scale(var(--scale, 1));
          }
          70% {
            transform: translateY(-4px) scale(var(--scale, 1));
          }
          90% {
            transform: translateY(-2px) scale(var(--scale, 1));
          }
        }
      `}</style>
    </div>
  );
};
export default ScrollIndicator;