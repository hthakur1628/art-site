import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SimpleAuthModal from './SimpleAuthModal';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Kunsthaus Canvas Bids
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/auctions" className="nav-link">
            Auctions
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/my-bids" className="nav-link">
                My Bids
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </>
          )}
          <SimpleAuthModal />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;