import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaGavel, FaClock, FaHeart, FaEye, FaStar, FaArrowUp } from 'react-icons/fa';
import { useAuction } from '../context/AuctionContext';
import toast from 'react-hot-toast';
import './AuctionList.css';

const AuctionList = () => {
  const { auctions, setAuctions, updateBid, isAuthenticated } = useAuction();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('ending-soon');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced mock auction data
  useEffect(() => {
    const mockAuctions = [
      {
        id: 1,
        title: "Abstract Expressionism #47",
        artist: "Maria Rodriguez",
        currentBid: 2500,
        startingBid: 1000,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        image: "placeholder1",
        category: "painting",
        description: "A stunning piece showcasing bold colors and dynamic brushstrokes",
        year: 2023,
        medium: "Oil on Canvas",
        dimensions: "48 x 36 inches",
        bidCount: 12,
        watchers: 45,
        condition: "Excellent",
        provenance: "Artist's Studio",
        estimate: { low: 2000, high: 4000 },
        featured: true
      },
      {
        id: 2,
        title: "Urban Dreams Collection",
        artist: "James Chen",
        currentBid: 1800,
        startingBid: 800,
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        image: "placeholder2",
        category: "photography",
        description: "Captivating urban landscapes captured during golden hour",
        year: 2022,
        medium: "Digital Photography",
        dimensions: "24 x 16 inches (Edition of 50)",
        bidCount: 8,
        watchers: 32,
        condition: "Mint",
        provenance: "Gallery Exhibition",
        estimate: { low: 1500, high: 3000 },
        featured: false
      },
      {
        id: 3,
        title: "Ceramic Vessel Symphony",
        artist: "Sarah Thompson",
        currentBid: 950,
        startingBid: 500,
        endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        image: "placeholder3",
        category: "sculpture",
        description: "Hand-thrown ceramic vessels with intricate glazing techniques",
        year: 2023,
        medium: "Ceramic, Glaze",
        dimensions: "12 x 8 x 8 inches",
        bidCount: 15,
        watchers: 28,
        condition: "Excellent",
        provenance: "Artist's Studio",
        estimate: { low: 800, high: 1500 },
        featured: true
      },
      {
        id: 4,
        title: "Digital Renaissance",
        artist: "Alex Morgan",
        currentBid: 3200,
        startingBid: 2000,
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        image: "placeholder4",
        category: "digital",
        description: "NFT artwork blending classical and contemporary elements",
        year: 2023,
        medium: "Digital Art (NFT)",
        dimensions: "4K Resolution",
        bidCount: 22,
        watchers: 67,
        condition: "Digital",
        provenance: "Minted by Artist",
        estimate: { low: 3000, high: 6000 },
        featured: true
      },
      {
        id: 5,
        title: "Marble Elegance",
        artist: "Isabella Romano",
        currentBid: 5500,
        startingBid: 4000,
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        image: "placeholder5",
        category: "sculpture",
        description: "Classical marble sculpture with modern interpretation",
        year: 2022,
        medium: "Carrara Marble",
        dimensions: "24 x 12 x 12 inches",
        bidCount: 18,
        watchers: 89,
        condition: "Excellent",
        provenance: "Private Collection",
        estimate: { low: 5000, high: 8000 },
        featured: false
      },
      {
        id: 6,
        title: "Watercolor Dreams",
        artist: "Emma Watson",
        currentBid: 750,
        startingBid: 400,
        endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        image: "placeholder6",
        category: "painting",
        description: "Delicate watercolor painting of botanical subjects",
        year: 2023,
        medium: "Watercolor on Paper",
        dimensions: "16 x 12 inches",
        bidCount: 6,
        watchers: 23,
        condition: "Very Good",
        provenance: "Artist's Studio",
        estimate: { low: 600, high: 1200 },
        featured: false
      }
    ];
    setAuctions(mockAuctions);
  }, []);

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return "Auction Ended";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleBid = (auctionId, currentBid, minIncrement = 50) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to place a bid!");
      return;
    }
    
    const bidAmount = prompt(`Enter your bid (minimum: $${(currentBid + minIncrement).toLocaleString()}):`);
    if (bidAmount && parseFloat(bidAmount) >= currentBid + minIncrement) {
      updateBid(auctionId, parseFloat(bidAmount));
      toast.success("Bid placed successfully! 🎉");
    } else if (bidAmount) {
      toast.error(`Bid must be at least $${(currentBid + minIncrement).toLocaleString()}!`);
    }
  };

  const toggleFavorite = (auctionId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(auctionId)) {
      newFavorites.delete(auctionId);
      toast.success("Removed from watchlist");
    } else {
      newFavorites.add(auctionId);
      toast.success("Added to watchlist ❤️");
    }
    setFavorites(newFavorites);
  };

  const getFilteredAndSortedAuctions = () => {
    let filtered = auctions;
    
    // Filter by category
    if (filter !== 'all') {
      filtered = filtered.filter(auction => auction.category === filter);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(auction => 
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort auctions
    switch (sortBy) {
      case 'ending-soon':
        return filtered.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
      case 'price-low':
        return filtered.sort((a, b) => a.currentBid - b.currentBid);
      case 'price-high':
        return filtered.sort((a, b) => b.currentBid - a.currentBid);
      case 'most-bids':
        return filtered.sort((a, b) => b.bidCount - a.bidCount);
      case 'featured':
        return filtered.sort((a, b) => b.featured - a.featured);
      default:
        return filtered;
    }
  };

  return (
    <div className="auction-list">
      <div className="auction-container">
        <header className="auction-header">
          <h1>Current Auctions</h1>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'painting' ? 'active' : ''}
              onClick={() => setFilter('painting')}
            >
              Paintings
            </button>
            <button 
              className={filter === 'photography' ? 'active' : ''}
              onClick={() => setFilter('photography')}
            >
              Photography
            </button>
            <button 
              className={filter === 'sculpture' ? 'active' : ''}
              onClick={() => setFilter('sculpture')}
            >
              Sculpture
            </button>
          </div>
        </header>

        <div className="auctions-grid">
          {filteredAuctions.map(auction => (
            <div key={auction.id} className="auction-card">
              <div className="auction-image">
                <div className="placeholder-artwork">
                  {auction.title}
                </div>
              </div>
              <div className="auction-details">
                <h3>{auction.title}</h3>
                <p className="artist">by {auction.artist}</p>
                <div className="bid-info">
                  <div className="current-bid">
                    <span className="label">Current Bid:</span>
                    <span className="amount">${auction.currentBid.toLocaleString()}</span>
                  </div>
                  <div className="time-remaining">
                    <span className="label">Time Remaining:</span>
                    <span className="time">{formatTimeRemaining(auction.endTime)}</span>
                  </div>
                </div>
                <button 
                  className="bid-button"
                  onClick={() => handleBid(auction.id, auction.currentBid)}
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionList;