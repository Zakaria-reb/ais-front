import React, { useEffect, useState, useRef } from "react";
import CodeBackground from "./components/CodeBackground";
import Navigation from "./components/Navigation";
import HomeSection from "./sections/HomeSection";
import AboutSection from "./sections/AboutSection";
import ActivitiesSection from "./sections/ActivitiesSection";
import EventsSection from "./sections/EventsSection";
import ContactSection from "./sections/ContactSection";
import MembershipSection from "./sections/MembershipSection";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    activities: useRef(null),
    events: useRef(null),
    contact: useRef(null),
    membership: useRef(null),
  };

  // Observe quelle section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.4 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Gestion du logo en fonction du scroll
  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.2;
      const scrolled = window.scrollY > threshold;
      setShowHeaderLogo(scrolled);
      setIsScrolled(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative text-white bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest">
      <CodeBackground />
      <Navigation showHeaderLogo={showHeaderLogo} activeSection={activeSection} />

      <div className="relative z-10">
        <section id="home" ref={sectionRefs.home}>
          <HomeSection isScrolled={isScrolled} />
        </section>
        <section id="about" ref={sectionRefs.about}>
          <AboutSection />
        </section>
        <section id="activities" ref={sectionRefs.activities}>
          <ActivitiesSection />
        </section>
        <section id="events" ref={sectionRefs.events}>
          <EventsSection />
        </section>
        <section id="contact" ref={sectionRefs.contact}>
          <ContactSection />
        </section>
        <section id="membership" ref={sectionRefs.membership}>
          <MembershipSection />
        </section>
      </div>
    </div>
  );
}

export default App;
