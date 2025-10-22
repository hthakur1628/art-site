import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <header className="about-header">
          <h1>About Kunsthaus Canvas Bids</h1>
          <p className="subtitle">Connecting art lovers with exceptional pieces since 2024</p>
        </header>

        <section className="mission-section">
          <div className="content-grid">
            <div className="text-content">
              <h2>Our Mission</h2>
              <p>
                At Kunsthaus Canvas Bids, we believe that exceptional art should be accessible 
                to passionate collectors worldwide. Our mission is to create a transparent, 
                secure, and engaging platform where artists and collectors can connect through 
                the timeless tradition of art auctions.
              </p>
              <p>
                We carefully curate each piece in our auctions, working directly with artists, 
                galleries, and private collectors to ensure authenticity and quality. Every 
                artwork tells a story, and we're here to help you discover yours.
              </p>
            </div>
            <div className="image-placeholder">
              <span>Our Gallery</span>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Authenticity</h3>
              <p>Every piece is verified by our team of art experts and comes with a certificate of authenticity.</p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>Clear bidding processes, detailed provenance information, and honest condition reports.</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>Building connections between artists, collectors, and art enthusiasts worldwide.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Leveraging technology to make art collecting more accessible and enjoyable.</p>
            </div>
          </div>
        </section>

        <section className="process-section">
          <h2>How It Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Browse Auctions</h3>
              <p>Explore our curated selection of artworks from various categories and time periods.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Register & Verify</h3>
              <p>Create your account and complete our simple verification process to start bidding.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Place Your Bids</h3>
              <p>Participate in live auctions or place advance bids on pieces that interest you.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Secure & Enjoy</h3>
              <p>Complete your purchase securely and arrange delivery of your new artwork.</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>Have questions about our auctions or need assistance? We're here to help.</p>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email:</strong> info@kunsthauscanvasbids.com
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> +1 (555) 123-4567
            </div>
            <div className="contact-item">
              <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;