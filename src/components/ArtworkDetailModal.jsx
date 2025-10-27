import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaGavel, 
  FaHeart, 
  FaShare, 
  FaEye, 
  FaClock, 
  FaInfoCircle,
  FaStar,
  FaShieldAlt,
  FaRuler,
  FaCalendarAlt,
  FaPalette,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useAuction } from '../context/AuctionContext';
import BidModal from './BidModal';
import toast from 'react-hot-toast';
import './ArtworkDetailModal.css';

const ArtworkDetailModal = ({ isOpen, onClose, auction }) => {
  const { isAuthenticated } = useAuction();
  const [showBidModal, setShowBidModal] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isFavorited, setIsFavorited] = useState(false);

  if (!auction) return null;

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return "Auction Ended";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleBidClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to place a bid!");
      return;
    }
    setShowBidModal(true);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites ❤️");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const bidHistory = [
    { bidder: "Collector***", amount: auction.currentBid, time: "2 minutes ago" },
    { bidder: "ArtLover***", amount: auction.currentBid - 100, time: "15 minutes ago" },
    { bidder: "Gallery***", amount: auction.currentBid - 250, time: "1 hour ago" },
    { bidder: "Museum***", amount: auction.currentBid - 400, time: "3 hours ago" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="artwork-detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="artwork-detail-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>

            <div className="modal-content">
              {/* Left Side - Image and Gallery */}
              <div className="artwork-gallery">
                <div className="main-image">
                  <div className="image-placeholder-large">
                    <div className="artwork-title-overlay">
                      {auction.title}
                    </div>
                    {auction.featured && (
                      <div className="featured-badge-large">
                        <FaStar /> Featured
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="image-thumbnails">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="thumbnail">
                      <div className="thumbnail-placeholder">
                        View {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Details and Bidding */}
              <div className="artwork-info">
                <div className="artwork-header">
                  <div className="title-section">
                    <h1>{auction.title}</h1>
                    <p className="artist-name">by {auction.artist}</p>
                    <div className="artwork-year">{auction.year}</div>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      className={`favorite-btn ${isFavorited ? 'active' : ''}`}
                      onClick={handleFavorite}
                    >
                      <FaHeart />
                    </button>
                    <button className="share-btn" onClick={handleShare}>
                      <FaShare />
                    </button>
                  </div>
                </div>

                {/* Current Bid Section */}
                <div className="current-bid-section">
                  <div className="bid-amount">
                    <span className="label">Current Bid</span>
                    <span className="amount">${auction.currentBid.toLocaleString()}</span>
                  </div>
                  <div className="bid-stats">
                    <div className="stat-item">
                      <FaGavel />
                      <span>{auction.bidCount} bids</span>
                    </div>
                    <div className="stat-item">
                      <FaEye />
                      <span>{auction.watchers} watching</span>
                    </div>
                    <div className="stat-item">
                      <FaClock />
                      <span>{formatTimeRemaining(auction.endTime)}</span>
                    </div>
                  </div>
                </div>

                {/* Estimate Range */}
                <div className="estimate-section">
                  <span className="estimate-label">Estimate:</span>
                  <span className="estimate-range">
                    ${auction.estimate.low.toLocaleString()} - ${auction.estimate.high.toLocaleString()}
                  </span>
                </div>

                {/* Bid Button */}
                <button className="place-bid-btn" onClick={handleBidClick}>
                  <FaGavel />
                  Place Bid
                </button>

                {/* Tabs Section */}
                <div className="info-tabs">
                  <div className="tab-buttons">
                    <button 
                      className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                      onClick={() => setActiveTab('details')}
                    >
                      Details
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === 'provenance' ? 'active' : ''}`}
                      onClick={() => setActiveTab('provenance')}
                    >
                      Provenance
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === 'bidding' ? 'active' : ''}`}
                      onClick={() => setActiveTab('bidding')}
                    >
                      Bid History
                    </button>
                  </div>

                  <div className="tab-content">
                    {activeTab === 'details' && (
                      <div className="details-content">
                        <div className="detail-grid">
                          <div className="detail-item">
                            <FaPalette className="detail-icon" />
                            <div>
                              <span className="detail-label">Medium</span>
                              <span className="detail-value">{auction.medium}</span>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaRuler className="detail-icon" />
                            <div>
                              <span className="detail-label">Dimensions</span>
                              <span className="detail-value">{auction.dimensions}</span>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaCalendarAlt className="detail-icon" />
                            <div>
                              <span className="detail-label">Year Created</span>
                              <span className="detail-value">{auction.year}</span>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaShieldAlt className="detail-icon" />
                            <div>
                              <span className="detail-label">Condition</span>
                              <span className="detail-value">{auction.condition}</span>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <FaMapMarkerAlt className="detail-icon" />
                            <div>
                              <span className="detail-label">Provenance</span>
                              <span className="detail-value">{auction.provenance}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="description-section">
                          <h3>Description</h3>
                          <p>{auction.description}</p>
                          <p>
                            This exceptional work demonstrates the artist's mastery of their chosen medium, 
                            showcasing technical excellence and creative vision. The piece has been carefully 
                            maintained and comes with full documentation of its authenticity and provenance.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'provenance' && (
                      <div className="provenance-content">
                        <div className="provenance-timeline">
                          <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                              <span className="timeline-year">{auction.year}</span>
                              <span className="timeline-event">Created by {auction.artist}</span>
                              <span className="timeline-location">Artist's Studio</span>
                            </div>
                          </div>
                          
                          <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                              <span className="timeline-year">{auction.year + 1}</span>
                              <span className="timeline-event">First Exhibition</span>
                              <span className="timeline-location">Contemporary Art Gallery</span>
                            </div>
                          </div>
                          
                          <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                              <span className="timeline-year">{auction.year + 2}</span>
                              <span className="timeline-event">Private Collection</span>
                              <span className="timeline-location">Anonymous Collector</span>
                            </div>
                          </div>
                          
                          <div className="timeline-item active">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                              <span className="timeline-year">2024</span>
                              <span className="timeline-event">Kunsthaus Auction</span>
                              <span className="timeline-location">Current Auction</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="authenticity-section">
                          <div className="authenticity-badge">
                            <FaShieldAlt />
                            <div>
                              <h4>Authenticity Guaranteed</h4>
                              <p>This artwork comes with a certificate of authenticity and has been verified by our experts.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'bidding' && (
                      <div className="bidding-content">
                        <div className="bid-history">
                          <h3>Recent Bidding Activity</h3>
                          <div className="bid-list">
                            {bidHistory.map((bid, index) => (
                              <div key={index} className="bid-item">
                                <div className="bidder-info">
                                  <span className="bidder-name">{bid.bidder}</span>
                                  <span className="bid-time">{bid.time}</span>
                                </div>
                                <span className="bid-amount">${bid.amount.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bidding-info">
                          <div className="info-item">
                            <FaInfoCircle />
                            <div>
                              <h4>Bidding Information</h4>
                              <ul>
                                <li>Minimum bid increment: $50</li>
                                <li>Buyer's premium: 25% up to $300,000</li>
                                <li>Payment due within 7 days</li>
                                <li>Shipping and handling additional</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bid Modal */}
          <BidModal
            isOpen={showBidModal}
            onClose={() => setShowBidModal(false)}
            auction={auction}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkDetailModal;