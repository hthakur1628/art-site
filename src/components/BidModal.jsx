import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGavel, FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useAuction } from '../context/AuctionContext';
import toast from 'react-hot-toast';
import './BidModal.css';

const BidModal = ({ isOpen, onClose, auction }) => {
  const { updateBid } = useAuction();
  const { user, isAuthenticated } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bidStep, setBidStep] = useState('form'); // 'form', 'confirmation', 'success'

  const minBidIncrement = 50;
  const minBid = auction ? auction.currentBid + minBidIncrement : 0;
  const suggestedBids = auction ? [
    auction.currentBid + minBidIncrement,
    auction.currentBid + (minBidIncrement * 2),
    auction.currentBid + (minBidIncrement * 5),
    auction.currentBid + (minBidIncrement * 10)
  ] : [];

  useEffect(() => {
    if (isOpen && auction) {
      setBidAmount('');
      setBidStep('form');
      setIsSubmitting(false);
    }
  }, [isOpen, auction]);

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return "Auction Ended";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please sign in to place a bid!");
      onClose();
      return;
    }

    const bid = parseFloat(bidAmount);
    if (isNaN(bid) || bid < minBid) {
      toast.error(`Minimum bid is $${minBid.toLocaleString()}`);
      return;
    }

    setBidStep('confirmation');
  };

  const confirmBid = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updateBid(auction.id, parseFloat(bidAmount));
      setBidStep('success');
      
      setTimeout(() => {
        onClose();
        toast.success(`Bid of $${parseFloat(bidAmount).toLocaleString()} placed successfully! 🎉`);
      }, 2000);
      
    } catch (error) {
      toast.error("Failed to place bid. Please try again.");
      setBidStep('form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestedBid = (amount) => {
    setBidAmount(amount.toString());
  };

  if (!auction) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="bid-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="bid-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>

            {bidStep === 'form' && (
              <div className="bid-form-content">
                <div className="modal-header">
                  <FaGavel className="modal-icon" />
                  <h2>Place Your Bid</h2>
                </div>

                <div className="artwork-summary">
                  <div className="artwork-image-small">
                    <div className="image-placeholder-small">
                      {auction.title}
                    </div>
                  </div>
                  <div className="artwork-details">
                    <h3>{auction.title}</h3>
                    <p className="artist-name">by {auction.artist}</p>
                    <div className="auction-info">
                      <div className="info-item">
                        <span className="label">Current Bid:</span>
                        <span className="value current-bid">${auction.currentBid.toLocaleString()}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Time Remaining:</span>
                        <span className="value time-remaining">{formatTimeRemaining(auction.endTime)}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Total Bids:</span>
                        <span className="value">{auction.bidCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleBidSubmit} className="bid-form">
                  <div className="bid-input-section">
                    <label htmlFor="bidAmount">Your Bid Amount</label>
                    <div className="bid-input-container">
                      <span className="currency-symbol">$</span>
                      <input
                        type="number"
                        id="bidAmount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={minBid.toLocaleString()}
                        min={minBid}
                        step="1"
                        required
                      />
                    </div>
                    <div className="bid-info">
                      <FaInfoCircle className="info-icon" />
                      <span>Minimum bid: ${minBid.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="suggested-bids">
                    <h4>Quick Bid Options</h4>
                    <div className="suggested-bids-grid">
                      {suggestedBids.map((amount, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`suggested-bid-btn ${bidAmount === amount.toString() ? 'active' : ''}`}
                          onClick={() => handleSuggestedBid(amount)}
                        >
                          ${amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bid-actions">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <FaGavel />
                      Review Bid
                    </button>
                  </div>
                </form>
              </div>
            )}

            {bidStep === 'confirmation' && (
              <div className="bid-confirmation-content">
                <div className="modal-header">
                  <FaExclamationTriangle className="modal-icon warning" />
                  <h2>Confirm Your Bid</h2>
                </div>

                <div className="confirmation-details">
                  <div className="artwork-summary-small">
                    <h3>{auction.title}</h3>
                    <p>by {auction.artist}</p>
                  </div>

                  <div className="bid-summary">
                    <div className="bid-amount-large">
                      ${parseFloat(bidAmount).toLocaleString()}
                    </div>
                    <p className="bid-note">
                      You are about to place a bid of <strong>${parseFloat(bidAmount).toLocaleString()}</strong>
                    </p>
                  </div>

                  <div className="terms-notice">
                    <FaInfoCircle className="info-icon" />
                    <p>
                      By placing this bid, you agree to our terms and conditions. 
                      If you win this auction, you will be charged the winning amount plus applicable fees.
                    </p>
                  </div>
                </div>

                <div className="bid-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setBidStep('form')}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={confirmBid}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner-small"></div>
                        Placing Bid...
                      </>
                    ) : (
                      <>
                        <FaGavel />
                        Confirm Bid
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {bidStep === 'success' && (
              <div className="bid-success-content">
                <div className="modal-header">
                  <FaCheckCircle className="modal-icon success" />
                  <h2>Bid Placed Successfully!</h2>
                </div>

                <div className="success-details">
                  <div className="success-animation">
                    <motion.div 
                      className="success-checkmark"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      ✓
                    </motion.div>
                  </div>

                  <div className="success-message">
                    <h3>Congratulations!</h3>
                    <p>
                      Your bid of <strong>${parseFloat(bidAmount).toLocaleString()}</strong> has been placed successfully.
                    </p>
                    <p className="success-note">
                      You will receive email notifications about the auction status.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BidModal;