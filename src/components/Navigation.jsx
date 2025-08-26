import React from "react";

const Navigation = ({ showHeaderLogo, activeSection }) => {
  const menuItems = [
    { label: "HOME", id: "home" },
    { label: "ABOUT US", id: "about" },
    { label: "ACTIVITIES", id: "activities" },
    { label: "EVENTS", id: "events" },
    { label: "CONTACT", id: "contact" },
    { label: "MEMBERSHIP", id: "membership" }
  ];

  const handleNavClick = (sectionId) => {
    const viewportHeight = window.innerHeight;
    let scrollTarget = 0;

    // Fixed scroll targets to match the actual content positioning
    switch (sectionId) {
      case 'home':
        scrollTarget = 0;
        break;
      case 'about':
        scrollTarget = viewportHeight * 2; // AboutSection starts at 200vh
        break;
      case 'activities':
        scrollTarget = viewportHeight * 3; // ActivitiesSection starts at 300vh
        break;
      case 'events':
        scrollTarget = viewportHeight * 4; // EventsSection starts at 400vh
        break;
      case 'contact':
        scrollTarget = viewportHeight * 5; // ContactSection starts at 500vh
        break;
      case 'membership':
        scrollTarget = viewportHeight * 6; // MembershipSection starts at 600vh
        break;
      default:
        scrollTarget = 0;
    }

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className={`header-logo ${showHeaderLogo ? "visible" : ""}`}>
          <img src="ais_web.png" alt="AppinSciences Logo" className="header-logo-image" />
        </div>
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li 
              key={item.id} 
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
              {activeSection === item.id && <div className="active-indicator"></div>}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;