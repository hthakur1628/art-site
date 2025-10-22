import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGavel, FaShieldAlt, FaUsers, FaStar, FaArrowRight, FaPlay } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({ auctions: 0, artists: 0, collectors: 0, sales: 0 });

  const featuredArtworks = [
    { title: "Abstract Symphony", artist: "Elena Vasquez", price: "$45,000", image: "artwork1" },
    { title: "Urban Dreams", artist: "Marcus Chen", price: "$32,000", image: "artwork2" },
    { title: "Golden Horizon", artist: "Sofia Rodriguez", price: "$28,500", image: "artwork3" }
  ];

  const testimonials = [
    { name: "Alexandra Morrison", role: "Art Collector", text: "The most sophisticated auction platform I've used. Exceptional curation and seamless experience." },
    { name: "David Chen", role: "Gallery Owner", text: "Kunsthaus has revolutionized how we connect with serious collectors worldwide." },
    { name: "Isabella Rodriguez", role: "Artist", text: "A platform that truly values and showcases artistic excellence." }
  ];

  useEffect(() => {
    // Animate stats counter
    const timer = setTimeout(() => {
      setStats({ auctions: 1247, artists: 892, collectors: 15420, sales: 2840000 });
    }, 1000);

    // Auto-slide carousel
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArtworks.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Where Art Meets
              <span className="gradient-text"> Passion</span>
            </h1>
            <p className="hero-subtitle">
              Discover extraordinary artworks from world-renowned artists and emerging talents. 
              Join the most prestigious auction house in the digital age.
            </p>
            
            <div className="hero-buttons">
              <Link to="/auctions" className="btn btn-primary">
                <FaGavel />
                Explore Auctions
                <FaArrowRight />
              </Link>
              <button className="btn btn-ghost">
                <FaPlay />
                Watch Demo
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.auctions.toLocaleString()}+</span>
                <span className="stat-label">Auctions</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.artists.toLocaleString()}+</span>
                <span className="stat-label">Artists</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.collectors.toLocaleString()}+</span>
                <span className="stat-label">Collectors</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">${(stats.sales / 1000000).toFixed(1)}M+</span>
                <span className="stat-label">Sales Volume</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="featured-carousel">
              {featuredArtworks.map((artwork, index) => (
                <div 
                  key={index}
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <div className="artwork-card">
                    <div className="artwork-image">
                      <div className="image-placeholder">
                        {artwork.title}
                      </div>
                      <div className="artwork-overlay">
                        <span className="artwork-price">{artwork.price}</span>
                      </div>
                    </div>
                    <div className="artwork-info">
                      <h3>{artwork.title}</h3>
                      <p>by {artwork.artist}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="carousel-indicators">
                {featuredArtworks.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose Kunsthaus Canvas Bids?</h2>
            <p>Experience the future of art collecting with our premium platform</p>
          </motion.div>

          <div className="features-grid">
            {[
              { icon: FaGavel, title: "Curated Excellence", desc: "Hand-selected masterpieces from established and emerging artists worldwide" },
              { icon: FaShieldAlt, title: "Secure & Transparent", desc: "Blockchain-verified authenticity and secure payment processing" },
              { icon: FaUsers, title: "Expert Community", desc: "Connect with art specialists, collectors, and enthusiasts globally" },
              { icon: FaStar, title: "Premium Experience", desc: "White-glove service from discovery to delivery" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Trusted by Art Enthusiasts Worldwide</h2>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Your Collection?</h2>
            <p>Join thousands of collectors who trust Kunsthaus for their art investments</p>
            <div className="cta-buttons">
              <Link to="/auctions" className="btn btn-primary">
                Browse Auctions
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;