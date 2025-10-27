import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useAuction } from '../context/AuctionContext';
import BidModal from './BidModal';
import toast from 'react-hot-toast';
import './AuctionList.css';

const AuctionList = () => {
  const { auctions, setAuctions, isAuthenticated } = useAuction();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('ending-soon');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  // Classical masterpieces auction collection
  useEffect(() => {
    const mockAuctions = [
      {
        id: 1,
        title: "English Countryside with Cottage",
        artist: "John Constable",
        currentBid: 2500,
        startingBid: 1000,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        image: "https://e1.pxfuel.com/desktop-wallpaper/724/231/desktop-wallpaper-famous-classic-paintings-classical-painting-women.jpg",
        category: "painting",
        description: "Idyllic English countryside scene with thatched cottage, wooden bridge over stream, and dramatic cloudy sky",
        year: 1821,
        medium: "Oil on Canvas",
        dimensions: "48 x 36 inches",
        bidCount: 12,
        watchers: 45,
        condition: "Excellent",
        provenance: "Private English Estate",
        estimate: { low: 2000, high: 4000 },
        featured: true
      },
      {
        id: 2,
        title: "The Execution of Lady Jane Grey",
        artist: "Paul Delaroche",
        currentBid: 1800,
        startingBid: 800,
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1700145419681-c7aa5b343a73?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFRoZSUyMEV4ZWN1dGlvbiUyMG9mJTIwTGFkeSUyMEphbmUlMjBHcmV5JTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        category: "painting",
        description: "Dramatic historical painting depicting the tragic execution of the Nine Days' Queen, blindfolded and guided to the block",
        year: 1833,
        medium: "Oil on Canvas",
        dimensions: "97 x 117 inches",
        bidCount: 8,
        watchers: 32,
        condition: "Very Good",
        provenance: "National Gallery Collection",
        estimate: { low: 1500, high: 3000 },
        featured: false
      },
      {
        id: 3,
        title: "Napoleon Crossing the Alps",
        artist: "Jacques-Louis David",
        currentBid: 4200,
        startingBid: 2500,
        endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1580136579395-4bbb9ffdc4ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE5hcG9sZW9uJTIwQ3Jvc3NpbmclMjB0aGUlMjBBbHBzJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        category: "painting",
        description: "Iconic neoclassical painting of Napoleon on rearing horse, red cape flowing, crossing the treacherous Alpine pass",
        year: 1801,
        medium: "Oil on Canvas",
        dimensions: "102 x 87 inches",
        bidCount: 15,
        watchers: 28,
        condition: "Excellent",
        provenance: "Château de Malmaison",
        estimate: { low: 4000, high: 7000 },
        featured: true
      },
      {
        id: 4,
        title: "Self-Portrait with Death Playing the Fiddle",
        artist: "Arnold Böcklin",
        currentBid: 3200,
        startingBid: 2000,
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=400&fit=crop&auto=format&q=80",
        category: "painting",
        description: "Haunting symbolist self-portrait with Death as a skeleton playing violin, exploring themes of mortality and artistic creation",
        year: 1872,
        medium: "Oil on Canvas",
        dimensions: "30 x 24 inches",
        bidCount: 22,
        watchers: 67,
        condition: "Good",
        provenance: "Swiss Private Collection",
        estimate: { low: 3000, high: 6000 },
        featured: true
      },
      {
        id: 5,
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        currentBid: 8500,
        startingBid: 5000,
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1583934584129-0f9b9624cffd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=781 ",
        category: "painting",
        description: "Masterpiece of Dutch Golden Age painting, mysterious young woman with luminous pearl earring against dark background",
        year: 1665,
        medium: "Oil on Canvas",
        dimensions: "17.5 x 15 inches",
        bidCount: 18,
        watchers: 89,
        condition: "Excellent",
        provenance: "Mauritshuis Collection",
        estimate: { low: 8000, high: 12000 },
        featured: true
      },
      {
        id: 6,
        title: "Two Sisters Sharing Flowers",
        artist: "Edmund Blair Leighton",
        currentBid: 1750,
        startingBid: 800,
        endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1752317591850-cc25374a7fd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VHdvJTIwU2lzdGVycyUyMFNoYXJpbmclMjBGbG93ZXJzJTIwY2xhc3NjaWNhbCUyMHBhaW50aWduc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        category: "painting",
        description: "Victorian era painting depicting intimate moment between sisters in garden setting, one offering flowers to the other",
        year: 1901,
        medium: "Oil on Canvas",
        dimensions: "36 x 28 inches",
        bidCount: 6,
        watchers: 23,
        condition: "Very Good",
        provenance: "Private Victorian Collection",
        estimate: { low: 1500, high: 2500 },
        featured: false
      },
      {
        id: 7,
        title: "Portrait of a Young Woman",
        artist: "John William Waterhouse",
        currentBid: 2200,
        startingBid: 1200,
        endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600&h=400&fit=crop&auto=format&q=80",
        category: "painting",
        description: "Pre-Raphaelite style portrait with romantic sensibility, dark-haired beauty with penetrating gaze",
        year: 1896,
        medium: "Oil on Canvas",
        dimensions: "24 x 20 inches",
        bidCount: 9,
        watchers: 34,
        condition: "Excellent",
        provenance: "Royal Academy Collection",
        estimate: { low: 2000, high: 3500 },
        featured: false
      },
      {
        id: 8,
        title: "Girl with a Pearl Earring (Study)",
        artist: "Johannes Vermeer",
        currentBid: 6800,
        startingBid: 4500,
        endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1753285699148-2f66b55f546b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2lybCUyMHdpdGglMjBhJTIwUGVhcmwlMjBFYXJyaW5nJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        category: "painting",
        description: "Preparatory study for Vermeer's masterpiece, showing the same mysterious subject with pearl earring",
        year: 1665,
        medium: "Oil on Canvas",
        dimensions: "18 x 16 inches",
        bidCount: 14,
        watchers: 56,
        condition: "Excellent",
        provenance: "Private Dutch Collection",
        estimate: { low: 6000, high: 9000 },
        featured: true
      },
      {
        id: 9,
        title: "Alpine Lake with Gothic Cathedral",
        artist: "Caspar David Friedrich",
        currentBid: 1650,
        startingBid: 900,
        endTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1724173128864-b0e09c22e6a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWxwaW5lJTIwTGFrZSUyMHdpdGglMjBHb3RoaWMlMjBDYXRoZWRyYWwlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        category: "painting",
        description: "Romantic landscape with Gothic cathedral reflecting in pristine alpine waters, boats and figures in foreground",
        year: 1820,
        medium: "Oil on Canvas",
        dimensions: "42 x 32 inches",
        bidCount: 11,
        watchers: 41,
        condition: "Very Good",
        provenance: "German Romantic Collection",
        estimate: { low: 1400, high: 2800 },
        featured: false
      }
    ];
    setAuctions(mockAuctions);
  }, [setAuctions]);

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return "Auction Ended";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleBid = (auction) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to place a bid!");
      return;
    }
    
    setSelectedAuction(auction);
    setIsBidModalOpen(true);
  };

  const closeBidModal = () => {
    setIsBidModalOpen(false);
    setSelectedAuction(null);
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
          
          {/* Search and Controls */}
          <div className="auction-controls">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search artworks or artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="controls-row">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="ending-soon">Ending Soon</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="most-bids">Most Bids</option>
                <option value="featured">Featured</option>
              </select>
              
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> Filters
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className={`filter-buttons ${showFilters ? 'show' : ''}`}>
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
            <button 
              className={filter === 'digital' ? 'active' : ''}
              onClick={() => setFilter('digital')}
            >
              Digital Art
            </button>
          </div>
        </header>

        <div className="auctions-grid">
          {getFilteredAndSortedAuctions().map(auction => (
            <div key={auction.id} className="auction-card">
              <div className="auction-image-container">
                <img 
                  src={auction.image} 
                  alt={`${auction.title} by ${auction.artist}`}
                  className="auction-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                  }}
                />
                <div className="placeholder-artwork" style={{display: 'none'}}>
                  <div className="placeholder-content">
                    <div className="placeholder-icon">🎨</div>
                    <div className="placeholder-text">{auction.title}</div>
                    <div className="placeholder-artist">by {auction.artist}</div>
                  </div>
                </div>
                {auction.featured && (
                  <div className="featured-badge">Featured</div>
                )}
                <div className="auction-overlay">
                  <div className="bid-count">{auction.bidCount} bids</div>
                  <div className="watchers">{auction.watchers} watching</div>
                </div>
              </div>
              
              <div className="auction-details">
                <div className="artwork-header">
                  <h3 className="artwork-title">{auction.title}</h3>
                  <p className="artist-name">by {auction.artist}</p>
                  <div className="artwork-meta">
                    <span className="year">{auction.year}</span>
                    <span className="medium">{auction.medium}</span>
                  </div>
                </div>

                <div className="bid-section">
                  <div className="current-bid-info">
                    <div className="bid-label">Current Bid</div>
                    <div className="bid-amount">${auction.currentBid.toLocaleString()}</div>
                  </div>
                  
                  <div className="auction-status">
                    <div className="time-remaining">
                      <div className="time-label">Time Left</div>
                      <div className="time-value">{formatTimeRemaining(auction.endTime)}</div>
                    </div>
                    <div className="estimate">
                      <div className="estimate-label">Estimate</div>
                      <div className="estimate-value">
                        ${auction.estimate.low.toLocaleString()} - ${auction.estimate.high.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  className="bid-button"
                  onClick={() => handleBid(auction)}
                >
                  <span>Place Bid</span>
                  <span className="min-bid">Min: ${(auction.currentBid + 50).toLocaleString()}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bid Modal */}
        <BidModal 
          isOpen={isBidModalOpen}
          onClose={closeBidModal}
          auction={selectedAuction}
        />
      </div>
    </div>
  );
};

export default AuctionList;