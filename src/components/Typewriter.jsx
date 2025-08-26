import React, { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 100, startDelay = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;

      const typeTimer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);
          setTimeout(() => setShowCursor(true), 500);
        }
      }, speed);

      return () => clearInterval(typeTimer);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return (
    <div className="typewriter-container">
      <span className="typewriter-text">
        {displayedText}
        {(isTyping || showCursor) && <span className="cursor"></span>}
      </span>
    </div>
  );
};

export default Typewriter;
