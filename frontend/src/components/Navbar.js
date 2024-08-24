
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaEnvelope, FaUserGraduate } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://imagetolink.com/ib/vlDlLMMbNO.png" alt="CareerCarve Logo" className='logo'/>
      </div>
      <ul className="navbar-links">
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="/about"><FaInfoCircle /> About</Link></li>
        <li><Link to="/contact"><FaEnvelope /> Contact</Link></li>
        <li><Link to="/dashboard"><FaUserGraduate /> Your Bookings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;