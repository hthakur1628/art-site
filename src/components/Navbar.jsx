import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuction } from '../context/AuctionContext';
import AuthModal from './AuthModal';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, setUser } = useAuction();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuth = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <>
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
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">Welcome, {user.name}</span>
                <button className="nav-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            ) : (
              <button className="nav-btn" onClick={() => setShowAuthModal(true)}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
    </>
  );
};

export default Navbar;