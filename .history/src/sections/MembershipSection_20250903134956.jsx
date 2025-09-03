import React from "react";

const MembershipSection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="section" id="membership-section">
      <div className="about-content">
        <h2 className="font-orbitron text-6xl font-bold text-cyber-blue text-center mb-12 drop-shadow-[0_0_30px_rgba(0,170,255,0.8)] tracking-[3px]">
          Membership
        </h2>
        <div className="max-w-4xl mx-auto text-center text-xl leading-relaxed text-white/90 font-rajdhani mb-12">
          <p className="mb-8">
            Become part of a vibrant community where innovation thrives and
            ideas become reality. Our membership opens doors to exclusive
            workshops, mentorship programs, and networking opportunities.
          </p>
          <p className="mb-8">
            Whether you're a beginner eager to learn or an experienced developer
            looking to share knowledge, there's a place for you in our community.
          </p>
        </div>
       
        {/* Back to top button */}
        <b></b>
        <div 
          className="flex justify-center items-center gap-4 cursor-pointer p-4 rounded-[10px] bg-cyber-blue/10 border border-cyber-blue/30 transition-all duration-300 max-w-[300px] mx-auto hover:bg-cyber-blue/20 hover:-translate-y-0.5"
          onClick={handleScrollToTop}
        >
          <span className="font-orbitron text-sm font-medium tracking-[2px] text-cyber-blue uppercase">
            Back to Top
          </span>
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-cyber-blue drop-shadow-[0_0_5px_rgba(0,170,255,0.6)]"></div>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;