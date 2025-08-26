import React from "react";

const Logo = ({ isScrolled }) => (
  <div className={`logo-container ${isScrolled ? "hidden" : ""}`}>
    <img src="ais_web.png" alt="AppinSciences Logo" className="logo-image" />
  </div>
);

export default Logo;
