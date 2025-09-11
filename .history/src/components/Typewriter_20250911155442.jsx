import React, { useState, useEffect } from "react";

const Typewriter = ({ 
  text, 
  speed = 50, 
  startDelay = 0,
  loop = true,
  eraseSpeed = 30,
  eraseDelay = 100,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Délai initial avant de commencer
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    let timer;

    if (isTyping && currentIndex < text.length) {
      // Phase d'écriture
      timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (isTyping && currentIndex >= text.length) {
      // Fin d'écriture
      setIsTyping(false);
      
      if (loop) {
        // Attendre avant d'effacer
        timer = setTimeout(() => {
          setIsErasing(true);
        }, eraseDelay);
      }
    } else if (isErasing && currentIndex > 0) {
      // Phase d'effacement
      timer = setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setDisplayText(text.slice(0, currentIndex - 1));
      }, eraseSpeed);
    } else if (isErasing && currentIndex === 0) {
      // Fin d'effacement, recommencer
      setIsErasing(false);
      setIsTyping(true);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, isErasing, text, speed, eraseSpeed, eraseDelay, loop, hasStarted]);

  return (
    <span className={`font-inter text-lg md:text-xl text-gray-300 leading-relaxed ${className}`}>
      {displayText}
      {(isTyping || isErasing) && (
        <span className="inline-block w-0.5 h-6 bg-cyber-blue ml-1 animate-pulse"></span>
      )}
    </span>
  );
};

export default Typewriter;