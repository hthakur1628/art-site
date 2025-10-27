import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaSignOutAlt, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './SimpleAuthModal.css';

const SimpleAuthModal = () => {
  const { user, isAuthenticated, signOut, isLoading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = () => {
    signOut();
    setShowUserMenu(false);
  };

  if (isLoading) {
    return (
      <div className="auth-loading-btn">
        <FaSpinner className="spinner-small" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="user-menu-container">
        <button
          className="user-menu-trigger"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <FaUser />
            )}
          </div>
          <span className="user-name">{user.name}</span>
        </button>

        <AnimatePresence>
          {showUserMenu && (
            <motion.div
              className="user-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="user-info">
                <div className="user-avatar-large">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <div className="user-details">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="menu-divider"></div>

              <div className="menu-items">
                <Link to="/profile" className="menu-item" onClick={() => setShowUserMenu(false)}>
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <Link to="/my-bids" className="menu-item" onClick={() => setShowUserMenu(false)}>
                  <FaUser />
                  <span>My Bids</span>
                </Link>
              </div>

              <div className="menu-divider"></div>

              <button className="menu-item logout-item" onClick={handleSignOut}>
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {showUserMenu && (
          <div
            className="user-menu-overlay"
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </div>
    );
  }

  const handleSignInClick = () => {
    console.log('Sign In clicked - navigating to /signin');
  };

  const handleSignUpClick = () => {
    console.log('Sign Up clicked - navigating to /signup');
  };

  return (
    <div className="auth-buttons">
      <Link 
        to="/signin" 
        className="auth-btn signin-btn"
        onClick={handleSignInClick}
      >
        Sign In
      </Link>
      <Link 
        to="/signup" 
        className="auth-btn signup-btn"
        onClick={handleSignUpClick}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SimpleAuthModal;