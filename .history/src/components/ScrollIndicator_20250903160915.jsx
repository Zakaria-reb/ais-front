import React from "react";

const ScrollIndicator = ({
  onClick,
  text = "Scroll Down to Learn\nMore About Us"
}) => (
  <div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer transition-transform duration-300 hover:scale-110"
    onClick={onClick}
    style={{ animation: 'bounce 2s ease-in-out infinite' }}
  >
    <div className="font-orbitron text-sm lg:text-xs font-medium tracking-[2px] text-white/80 uppercase text-center leading-relaxed"
         style={{ textShadow: '0 0 10px rgba(0, 170, 255, 0.5)' }}>
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
    
    <div className="flex flex-col gap-1 items-center">
      <div 
        className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyber-blue opacity-80"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}
      ></div>
      <div 
        className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyber-blue opacity-50 transform scale-75"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}
      ></div>
      <div 
        className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyber-blue opacity-30 transform scale-50"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}
      ></div>
    </div>
  </div>
);

export default ScrollIndicator;