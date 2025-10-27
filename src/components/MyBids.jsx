import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaClock, FaTrophy, FaEye, FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useAuction } from '../context/AuctionContext';
import './MyBids.css';

const MyBids = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('active');

  if (!isAuthenticated) {
    return (
      <div className="my-bids-page">
        <div className="my-bids-container">
          <div className="auth-required">
            <h2>Please Sign In</h2>
            <p>You need to be signed in to view your bids.</p>
          </div>
        </div>
      </div>
    );
  }

  // Mock data for demonstration
  const mockBids = [
    {
      id: 1,
      auctionId: 1,
      amount: 2600,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'winning',
      artwork: {
        title: "Abstract Expressionism #47",
        artist: "Maria Rodriguez",
        currentBid: 2600,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      }
    },
    {
      id: 2,
      auctionId: 2,
      amount: 1900,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'outbid',
      artwork: {
        title: "Urban Dreams Collection",
        artist: "James Chen",
        currentBid: 2100,
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      }
    },
    {
      id: 3,
      auctionId: 5,
      amount: 5200,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'won',
      artwork: {
        title: "Marble Elegance",
        artist: "Isabella Romano",
        currentBid: 5200,
        endTime: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    }
  ];

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return "Auction Ended";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'winning':
        return <FaTrophy className="status-icon winning" />;
      case 'outbid':
        return <FaGavel className="status-icon outbid" />;
      case 'won':
        return <FaTrophy className="status-icon won" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'winning':
        return 'Winning';
      case 'outbid':
        return 'Outbid';
      case 'won':
        return 'Won';
      default:
        return 'Active';
    }
  };

  const filteredBids = mockBids.filter(bid => {
    if (activeTab === 'active') return bid.status === 'winning' || bid.status === 'outbid';
    if (activeTab === 'won') return bid.status === 'won';
    return true;
  });

  return (
    <div className="my-bids-page">
      <div className="my-bids-container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>My Bids</h1>
          <p>Track your bidding activity and auction results</p>
        </motion.div>

        <div className="bids-tabs">
          <button
            className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Bids
          </button>
          <button
            className={`tab-btn ${activeTab === 'won' ? 'active' : ''}`}
            onClick={() => setActiveTab('won')}
          >
            Won Auctions
          </button>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Bids
          </button>
        </div>

        <div className="bids-content">
          {filteredBids.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaGavel className="empty-icon" />
              <h3>No bids found</h3>
              <p>You haven't placed any bids in this category yet.</p>
            </motion.div>
          ) : (
            <div className="bids-grid">
              {filteredBids.map((bid, index) => (
                <motion.div
                  key={bid.id}
                  className={`bid-card ${bid.status}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bid-header">
                    <div className="bid-status">
                      {getStatusIcon(bid.status)}
                      <span className="status-text">{getStatusText(bid.status)}</span>
                    </div>
                    <div className="bid-time">
                      {bid.timestamp.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="artwork-info">
                    <div className="artwork-image">
                      <div className="image-placeholder">
                        {bid.artwork.title}
                      </div>
                    </div>
                    <div className="artwork-details">
                      <h3>{bid.artwork.title}</h3>
                      <p className="artist">by {bid.artwork.artist}</p>
                    </div>
                  </div>

                  <div className="bid-details">
                    <div className="bid-amounts">
                      <div className="my-bid">
                        <span className="label">My Bid</span>
                        <span className="amount">${bid.amount.toLocaleString()}</span>
                      </div>
                      <div className="current-bid">
                        <span className="label">Current Bid</span>
                        <span className="amount">${bid.artwork.currentBid.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="auction-status">
                      <div className="time-remaining">
                        <FaClock />
                        <span>{formatTimeRemaining(bid.artwork.endTime)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bid-actions">
                    <button className="btn btn-secondary">
                      <FaEye />
                      View Auction
                    </button>
                    {bid.status === 'outbid' && (
                      <button className="btn btn-primary">
                        <FaGavel />
                        Place New Bid
                      </button>
                    )}
                    {bid.status === 'won' && (
                      <button className="btn btn-primary">
                        <FaHeart />
                        View Purchase
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBids;