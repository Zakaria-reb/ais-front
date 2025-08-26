import React from "react";

const ScrollIndicator = ({ 
  onClick, 
  text = "Scroll Down to Learn\nMore About Us" 
}) => (
  <div className="scroll-indicator" onClick={onClick}>
    <div className="scroll-text">
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
    <div className="scroll-arrows">
      <div className="scroll-arrow"></div>
      <div className="scroll-arrow"></div>
      <div className="scroll-arrow"></div>
    </div>
  </div>
);

export default ScrollIndicator;