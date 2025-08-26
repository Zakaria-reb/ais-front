import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Typewriter from "../components/Typewriter";
import ScrollIndicator from "../components/ScrollIndicator";

const HomeSection = ({ isScrolled }) => {
  const [currentView, setCurrentView] = useState(0); // 0 = hero, 1 = about
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle scroll within the home section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // More precise transition points for cleaner switching
      if (scrollPosition < viewportHeight * 0.8) {
        // First 80% of viewport - show hero
        if (currentView !== 0) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentView(0);
            setIsTransitioning(false);
          }, 200);
        }
      } else if (scrollPosition < viewportHeight * 1.8) {
        // From 80% to 180% viewport - show internal about view
        if (currentView !== 1) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentView(1);
            setIsTransitioning(false);
          }, 200);
        }
      } else {
        // Beyond 180% viewport - hide both (transitioning to AboutSection)
        if (currentView !== -1) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentView(-1);
            setIsTransitioning(false);
          }, 200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleScrollToAbout = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: 'smooth'
    });
  };

  const handleScrollToRealAbout = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 2, // Scroll to the actual AboutSection
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-section-wrapper">
      {/* Hero View */}
      <div className={`home-view hero-view ${
        currentView === 0 && !isTransitioning ? 'active' : 'hidden'
      } ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="section">
          <div className="main-content">
            <Logo isScrolled={isScrolled} />
            <div className="content-center">
              <h1 className="main-title">
                WHERE INNOVATION<br />
                MEETS APPLICATION
              </h1>
              <div className="subtext">
                <span className="code-bracket">&lt;/&gt;</span>
                <Typewriter
                  text="A space for curious minds to explore, build, and turn ideas into real-world impact."
                  speed={80}
                  startDelay={1500}
                />
                <span className="code-bracket">&lt;/&gt;</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Internal About View - This is just a preview/teaser */}
      <div className={`home-view about-view ${
        currentView === 1 && !isTransitioning ? 'active' : 'hidden'
      } ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="about-section section">
          <div className="about-content">
            <h2 className="about-title">
              The most dynamic <span className="highlight">tech & innovation club</span> at ENSA El Jadida.<br />
              Founded in <span className="highlight">2013</span> by future engineers, driven by<br />
              <span className="highlight">passion</span>, <span className="highlight">teamwork</span>, and <span className="highlight">bold ideas</span>.
            </h2>
          </div>
          
          {/* Scroll Indicator to the real About section */}
          <ScrollIndicator 
            onClick={handleScrollToRealAbout}
            text="Learn More\nAbout Us"
          />
        </div>
      </div>

      {/* Spacer to maintain scroll height */}
      <div className="home-spacer"></div>
    </div>
  );
};

export default HomeSection;