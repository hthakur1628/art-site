import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
        artist: "John Michael",
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
        soldPrice: 4500,
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
        featured: true,
        status: "sold"
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
        soldPrice: 1900,
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
        featured: false,
        status: "sold"
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
        soldPrice: 1800,
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
        featured: false,
        status: "sold"
      },
      {
        id: 10,
        title: "Mountain Vista",
        artist: "Ansel Adams",
        currentBid: 2800,
        startingBid: 1500,
        endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        category: "photography",
        description: "Iconic black and white landscape photograph capturing the majesty of mountain peaks with dramatic lighting and composition",
        year: 1942,
        medium: "Gelatin Silver Print",
        dimensions: "24 x 36 inches",
        bidCount: 19,
        watchers: 52,
        condition: "Excellent",
        provenance: "Adams Estate Collection",
        estimate: { low: 2500, high: 5000 },
        featured: true
      },
      {
        id: 11,
        title: "Urban Architecture",
        artist: "Berenice Abbott",
        currentBid: 1900,
        startingBid: 1000,
        endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
        category: "photography",
        description: "Striking architectural study of New York City buildings, showcasing geometric patterns and urban modernism",
        year: 1938,
        medium: "Silver Gelatin Print",
        dimensions: "20 x 24 inches",
        bidCount: 13,
        watchers: 38,
        condition: "Very Good",
        provenance: "Museum of the City of New York",
        estimate: { low: 1800, high: 3500 },
        featured: false
      },
      {
        id: 12,
        title: "Coastal Serenity",
        artist: "Hiroshi Sugimoto",
        currentBid: 3500,
        startingBid: 2000,
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop",
        category: "photography",
        description: "Minimalist seascape from the acclaimed Seascapes series, capturing the eternal dialogue between sea and sky",
        year: 1994,
        medium: "Gelatin Silver Print",
        dimensions: "30 x 40 inches",
        bidCount: 24,
        watchers: 71,
        condition: "Excellent",
        provenance: "Sugimoto Studio",
        estimate: { low: 3000, high: 6000 },
        featured: true
      },
      {
        id: 13,
        title: "Alexan Moray",
        artist: "Henry Moore",
        currentBid: 7500,
        startingBid: 4000,
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1593283590172-adfce2adf213?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2N1bHB0dXJlfGVufDB8fDB8fHww",
        category: "sculpture",
        description: "Abstract bronze sculpture featuring Moore's signature organic forms and negative space, exploring human figure themes",
        year: 1965,
        medium: "Bronze",
        dimensions: "48 x 24 x 24 inches",
        bidCount: 16,
        watchers: 48,
        condition: "Excellent",
        provenance: "Moore Foundation",
        estimate: { low: 7000, high: 12000 },
        featured: true
      },
      {
        id: 14,
        title: "The Angel",
        artist: "Barbara Hepworth",
        currentBid: 6200,
        startingBid: 3500,
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1570451789368-b951cf5534f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHNjdWxwdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
        category: "sculpture",
        description: "Elegant marble sculpture with pierced forms, exemplifying Hepworth's mastery of material and space",
        year: 1958,
        medium: "Marble",
        dimensions: "36 x 18 x 18 inches",
        bidCount: 21,
        watchers: 59,
        condition: "Excellent",
        provenance: "Hepworth Estate",
        estimate: { low: 6000, high: 10000 },
        featured: true
      },
      {
        id: 15,
        title: "Wings Of Love",
        artist: "Alexander Calder",
        currentBid: 12500,
        startingBid: 8000,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1548080819-84b0d779e8e5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "sculpture",
        description: "Dynamic mobile sculpture featuring balanced steel elements that move with air currents, creating ever-changing compositions",
        year: 1970,
        medium: "Steel & Wire",
        dimensions: "72 x 48 x 36 inches",
        bidCount: 28,
        watchers: 94,
        condition: "Excellent",
        provenance: "Calder Foundation",
        estimate: { low: 12000, high: 20000 },
        featured: true
      },
      {
        id: 16,
        title: "Kinetic Wave",
        artist: "Beeple",
        currentBid: 1500,
        startingBid: 800,
        endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=400&fit=crop",
        category: "digital",
        description: "Vibrant NFT artwork combining surreal imagery with social commentary, part of the acclaimed Everydays series",
        year: 2023,
        medium: "NFT Digital Art",
        dimensions: "4K Digital",
        bidCount: 35,
        watchers: 112,
        condition: "Mint",
        provenance: "Artist Direct",
        estimate: { low: 1200, high: 3000 },
        featured: true
      },
      {
        id: 17,
        title: "Reaching For Life",
        artist: "Refik Anadol",
        currentBid: 3200,
        startingBid: 2000,
        endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1642059893618-22daf30e92a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D",
        category: "digital",
        description: "AI-generated data sculpture transforming machine learning algorithms into mesmerizing visual patterns",
        year: 2024,
        medium: "AI Generated Art",
        dimensions: "8K Digital",
        bidCount: 27,
        watchers: 86,
        condition: "Mint",
        provenance: "Anadol Studio",
        estimate: { low: 3000, high: 6000 },
        featured: true
      },
      {
        id: 18,
        title: "Synthetic Longing",
        artist: "FEWOCiOUS",
        currentBid: 2400,
        startingBid: 1500,
        endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        image: "https://images.unsplash.com/photo-1704426882813-8acfff020487?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D",
        category: "digital",
        description: "Emotionally charged digital artwork exploring identity and transformation through bold colors and expressive forms",
        year: 2024,
        medium: "NFT Animation",
        dimensions: "1080p Loop",
        bidCount: 31,
        watchers: 78,
        condition: "Mint",
        provenance: "Artist Direct",
        estimate: { low: 2000, high: 4500 },
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
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Current Auctions
          </motion.h1>
          
          {/* Search and Controls */}
          <motion.div 
            className="auction-controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
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
          </motion.div>

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
          {getFilteredAndSortedAuctions().map((auction, index) => (
            <motion.div 
              key={auction.id} 
              className="auction-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
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
                {auction.featured && !auction.status && (
                  <div className="featured-badge">Featured</div>
                )}
                {auction.status === 'sold' && (
                  <div className="sold-badge">SOLD</div>
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
                    <div className="bid-label">{auction.status === 'sold' ? 'Sold For' : 'Current Bid'}</div>
                    <div className="bid-amount">
                      ${auction.status === 'sold' ? auction.soldPrice.toLocaleString() : auction.currentBid.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="auction-status">
                    <div className="time-remaining">
                      <div className="time-label">{auction.status === 'sold' ? 'Status' : 'Time Left'}</div>
                      <div className="time-value">
                        {auction.status === 'sold' ? 'Auction Ended' : formatTimeRemaining(auction.endTime)}
                      </div>
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
                  className={`bid-button ${auction.status === 'sold' ? 'sold-button' : ''}`}
                  onClick={() => handleBid(auction)}
                  disabled={auction.status === 'sold'}
                >
                  {auction.status === 'sold' ? (
                    <span>Sold - Bidding Closed</span>
                  ) : (
                    <>
                      <span>Place Bid</span>
                      <span className="min-bid">Min: ${(auction.currentBid + 50).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
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