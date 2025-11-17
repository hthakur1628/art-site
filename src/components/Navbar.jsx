import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SimpleAuthModal from './SimpleAuthModal';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="nav-logo">
            Kunsthaus Canvas Bids
          </Link>
        </motion.div>
        <div className="nav-menu">
          <motion.div custom={0} initial="hidden" animate="visible" variants={navItemVariants}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </motion.div>
          <motion.div custom={1} initial="hidden" animate="visible" variants={navItemVariants}>
            <Link to="/auctions" className="nav-link">
              Auctions
            </Link>
          </motion.div>
          <motion.div custom={2} initial="hidden" animate="visible" variants={navItemVariants}>
            <Link to="/gallery" className="nav-link">
              Gallery
            </Link>
          </motion.div>
          <motion.div custom={3} initial="hidden" animate="visible" variants={navItemVariants}>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </motion.div>
          {isAuthenticated && (
            <>
              <motion.div custom={4} initial="hidden" animate="visible" variants={navItemVariants}>
                <Link to="/my-bids" className="nav-link">
                  My Bids
                </Link>
              </motion.div>
              <motion.div custom={5} initial="hidden" animate="visible" variants={navItemVariants}>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </motion.div>
            </>
          )}
          <motion.div 
            custom={isAuthenticated ? 6 : 4} 
            initial="hidden" 
            animate="visible" 
            variants={navItemVariants}
          >
            <SimpleAuthModal />
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;