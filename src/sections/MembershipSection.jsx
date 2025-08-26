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
        <h2 className="section-title" style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '4rem',
          fontWeight: '700',
          color: '#00aaff',
          textAlign: 'center',
          marginBottom: '3rem',
          textShadow: '0 0 30px rgba(0, 170, 255, 0.8)',
          letterSpacing: '3px'
        }}>
          Membership
        </h2>
        <div className="about-text" style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '1.3rem',
          lineHeight: '1.8',
          color: 'rgba(255, 255, 255, 0.9)',
          fontFamily: 'Rajdhani, sans-serif',
          marginBottom: '3rem'
        }}>
          <p style={{ marginBottom: '2rem' }}>
            Become part of a vibrant community where innovation thrives and 
            ideas become reality. Our membership opens doors to exclusive 
            workshops, mentorship programs, and networking opportunities.
          </p>
          <p style={{ marginBottom: '2rem' }}>
            Whether you're a beginner eager to learn or an experienced developer 
            looking to share knowledge, there's a place for you in our community.
          </p>
        </div>
        
        {/* Back to top button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          cursor: 'pointer',
          padding: '1rem',
          borderRadius: '10px',
          background: 'rgba(0, 170, 255, 0.1)',
          border: '1px solid rgba(0, 170, 255, 0.3)',
          transition: 'all 0.3s ease',
          maxWidth: '300px',
          margin: '0 auto'
        }}
        onClick={handleScrollToTop}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(0, 170, 255, 0.2)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 170, 255, 0.1)';
          e.target.style.transform = 'translateY(0)';
        }}
        >
          <span style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '0.9rem',
            fontWeight: '500',
            letterSpacing: '2px',
            color: '#00aaff',
            textTransform: 'uppercase'
          }}>
            Back to Top
          </span>
          <div style={{
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '8px solid #00aaff',
            filter: 'drop-shadow(0 0 5px rgba(0, 170, 255, 0.6))'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;
