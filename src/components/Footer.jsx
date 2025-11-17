import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="footer">
      <div className="footer-decorative-top"></div>

      <motion.div
        className="footer-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
       <div className="footer-content">
          {/* Brand Section */}
          <motion.div className="footer-section brand-section" variants={itemVariants}>
            <h3 className="footer-logo">
              Kunsthaus Canvas Bids
            </h3>
            <p className="footer-tagline">
              Where art meets passion. Discover extraordinary artworks from world-renowned artists and emerging talents.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/auctions">Current Auctions</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/my-bids">My Bids</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#buyer-guide">Buyer's Guide</a></li>
              <li><a href="#seller-guide">Seller's Guide</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="footer-section contact-section" variants={itemVariants}>
            <h4>Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FaMapMarkerAlt className="contact-icon" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Address</span>
                  <span className="contact-value">123 Art District<br />New York, NY 10001</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FaPhone className="contact-icon" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+1 (555) 123-4567</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <FaEnvelope className="contact-icon" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">info@kunsthauscanvasbids.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div className="footer-newsletter" variants={itemVariants}>
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for exclusive auction previews and art insights</p>
            </div>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </motion.div>

        {/* Social & Bottom */}
        <div className="footer-bottom-section">
          <motion.div className="social-section" variants={itemVariants}>
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                <FaLinkedinIn />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="social-link">
                <FaPinterestP />
              </a>
            </div>
          </motion.div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p className="copyright">
              &copy; {currentYear} Kunsthaus Canvas Bids. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#terms">Terms of Service</a>
              <span className="separator">•</span>
              <a href="#privacy">Privacy Policy</a>
              <span className="separator">•</span>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="footer-decorative-bottom"></div>
    </footer>
  );
};

export default Footer;
