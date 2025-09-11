import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
      AIS
    </Link>
  );
};

export default Logo;