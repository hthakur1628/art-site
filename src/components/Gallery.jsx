import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCheckCircle } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Artworks matching the auction collection - organized by category
  const artworks = [
    // PAINTINGS (9 artworks - 6 available, 3 sold)
    {
      id: 1,
      title: "English Countryside with Cottage",
      artist: "John Michael",
      year: 1821,
      category: "painting",
      price: 2500,
      image: "https://e1.pxfuel.com/desktop-wallpaper/724/231/desktop-wallpaper-famous-classic-paintings-classical-painting-women.jpg",
      status: "available",
      medium: "Oil on Canvas",
      dimensions: "48 × 36 inches"
    },
    {
      id: 2,
      title: "The Execution of Lady Jane Grey",
      artist: "Paul Delaroche",
      year: 1833,
      category: "painting",
      price: 1800,
      image: "https://images.unsplash.com/photo-1700145419681-c7aa5b343a73?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFRoZSUyMEV4ZWN1dGlvbiUyMG9mJTIwTGFkeSUyMEphbmUlMjBHcmV5JTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      status: "available",
      medium: "Oil on Canvas",
      dimensions: "97 × 117 inches"
    },
    {
      id: 3,
      title: "Napoleon Crossing the Alps",
      artist: "Jacques-Louis David",
      year: 1801,
      category: "painting",
      price: 4200,
      image: "https://images.unsplash.com/photo-1580136579395-4bbb9ffdc4ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE5hcG9sZW9uJTIwQ3Jvc3NpbmclMjB0aGUlMjBBbHBzJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      status: "sold",
      soldPrice: 4500,
      medium: "Oil on Canvas",
      dimensions: "102 × 87 inches"
    },
    {
      id: 4,
      title: "Self-Portrait with Death Playing the Fiddle",
      artist: "Arnold Böcklin",
      year: 1872,
      category: "painting",
      price: 3200,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=400&fit=crop&auto=format&q=80",
      status: "available",
      medium: "Oil on Canvas",
      dimensions: "30 × 24 inches"
    },
    {
      id: 5,
      title: "Girl with a Pearl Earring",
      artist: "Johannes Vermeer",
      year: 1665,
      category: "painting",
      price: 8500,
      image: "https://images.unsplash.com/photo-1583934584129-0f9b9624cffd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=781",
      status: "available",
      medium: "Oil on Canvas",
      dimensions: "17.5 × 15 inches"
    },
    {
      id: 6,
      title: "Two Sisters Sharing Flowers",
      artist: "Edmund Blair Leighton",
      year: 1901,
      category: "painting",
      price: 1750,
      image: "https://images.unsplash.com/photo-1752317591850-cc25374a7fd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VHdvJTIwU2lzdGVycyUyMFNoYXJpbmclMjBGbG93ZXJzJTIwY2xhc3NjaWNhbCUyMHBhaW50aWduc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      status: "sold",
      soldPrice: 1900,
      medium: "Oil on Canvas",
      dimensions: "36 × 28 inches"
    },
    {
      id: 7,
      title: "Portrait of a Young Woman",
      artist: "John William Waterhouse",
      year: 1896,
      category: "painting",
      price: 2200,
      image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600&h=400&fit=crop&auto=format&q=80",
      status: "available",
      medium: "Oil on Canvas",
      dimensions: "24 × 20 inches"
    },
    {
      id: 8,
      title: "Girl with a Pearl Earring (Study)",
      artist: "Johannes Vermeer",
      year: 1665,
      category: "painting",
      price: 6800,
      image: "https://images.unsplash.com/photo-1753285699148-2f66b55f546b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2lybCUyMHdpdGglMjBhJTIwUGVhcmwlMjBFYXJyaW5nJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      status: "available",
      medium: "Oil on Canvas",
      dimensions: "18 × 16 inches"
    },
    {
      id: 9,
      title: "Alpine Lake with Gothic Cathedral",
      artist: "Caspar David Friedrich",
      year: 1820,
      category: "painting",
      price: 1650,
      image: "https://images.unsplash.com/photo-1724173128864-b0e09c22e6a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWxwaW5lJTIwTGFrZSUyMHdpdGglMjBHb3RoaWMlMjBDYXRoZWRyYWwlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      status: "sold",
      soldPrice: 1800,
      medium: "Oil on Canvas",
      dimensions: "42 × 32 inches"
    },

    // PHOTOGRAPHY (3 artworks - all available)
    {
      id: 10,
      title: "Mountain Vista",
      artist: "Ansel Adams",
      year: 1942,
      category: "photography",
      price: 2800,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      status: "available",
      medium: "Gelatin Silver Print",
      dimensions: "24 × 36 inches"
    },
    {
      id: 11,
      title: "Urban Architecture",
      artist: "Berenice Abbott",
      year: 1938,
      category: "photography",
      price: 1900,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      status: "available",
      medium: "Silver Gelatin Print",
      dimensions: "20 × 24 inches"
    },
    {
      id: 12,
      title: "Coastal Serenity",
      artist: "Hiroshi Sugimoto",
      year: 1994,
      category: "photography",
      price: 3500,
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop",
      status: "available",
      medium: "Gelatin Silver Print",
      dimensions: "30 × 40 inches"
    },

    // SCULPTURE (3 artworks - all available)
    {
      id: 13,
      title: "Alexan Moray",
      artist: "Henry Moore",
      year: 1965,
      category: "sculpture",
      price: 7500,
      image: "https://images.unsplash.com/photo-1593283590172-adfce2adf213?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2N1bHB0dXJlfGVufDB8fDB8fHww",
      status: "available",
      medium: "Bronze",
      dimensions: "48 × 24 × 24 inches"
    },
    {
      id: 14,
      title: "The Angel",
      artist: "Barbara Hepworth",
      year: 1958,
      category: "sculpture",
      price: 6200,
      image: "https://images.unsplash.com/photo-1570451789368-b951cf5534f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHNjdWxwdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      status: "available",
      medium: "Marble",
      dimensions: "36 × 18 × 18 inches"
    },
    {
      id: 15,
      title: "Wings Of Love",
      artist: "Alexander Calder",
      year: 1970,
      category: "sculpture",
      price: 12500,
      image: "https://images.unsplash.com/photo-1548080819-84b0d779e8e5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "available",
      medium: "Steel & Wire",
      dimensions: "72 × 48 × 36 inches"
    },

    // DIGITAL ART (3 artworks - all available)
    {
      id: 16,
      title: "Kinetic Wave",
      artist: "Beeple",
      year: 2023,
      category: "digital",
      price: 1500,
      image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=400&fit=crop",
      status: "available",
      medium: "NFT Digital Art",
      dimensions: "4K Digital"
    },
    {
      id: 17,
      title: "Reaching For Life",
      artist: "Refik Anadol",
      year: 2024,
      category: "digital",
      price: 3200,
      image: "https://images.unsplash.com/photo-1642059893618-22daf30e92a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D",
      status: "available",
      medium: "AI Generated Art",
      dimensions: "8K Digital"
    },
    {
      id: 18,
      title: "Synthetic Longing",
      artist: "FEWOCiOUS",
      year: 2024,
      category: "digital",
      price: 2400,
      image: "https://images.unsplash.com/photo-1704426882813-8acfff020487?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D",
      status: "available",
      medium: "NFT Animation",
      dimensions: "1080p Loop"
    }
  ];

  const getFilteredArtworks = () => {
    let filtered = artworks;

    if (filter !== 'all') {
      if (filter === 'available' || filter === 'sold') {
        filtered = filtered.filter(art => art.status === filter);
      } else {
        filtered = filtered.filter(art => art.category === filter);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(art =>
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Art Gallery</h1>
          <p>Explore our curated collection of extraordinary artworks</p>
        </motion.div>
      </div>

      <div className="gallery-container">
        <div className="gallery-controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search artworks or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'available' ? 'active' : ''}
              onClick={() => setFilter('available')}
            >
              Available
            </button>
            <button
              className={filter === 'sold' ? 'active' : ''}
              onClick={() => setFilter('sold')}
            >
              Sold
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
        </div>

        <div className="gallery-grid">
          {getFilteredArtworks().map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className={`gallery-item ${artwork.status}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="artwork-image-container">
                <img src={artwork.image} alt={artwork.title} />
                {artwork.status === 'sold' && (
                  <div className="sold-overlay">
                    <FaCheckCircle />
                    <span>SOLD</span>
                  </div>
                )}
              </div>

              <div className="artwork-info">
                <h3>{artwork.title}</h3>
                <p className="artist">by {artwork.artist}</p>
                <div className="artwork-meta">
                  <span className="year">{artwork.year}</span>
                  <span className="medium">{artwork.medium}</span>
                </div>
                <div className="artwork-details">
                  <span className="dimensions">{artwork.dimensions}</span>
                </div>
                <div className="artwork-price">
                  {artwork.status === 'sold' ? (
                    <>
                      <span className="sold-label">Sold for</span>
                      <span className="price">${artwork.soldPrice.toLocaleString()}</span>
                    </>
                  ) : (
                    <>
                      <span className="price-label">Starting at</span>
                      <span className="price">${artwork.price.toLocaleString()}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
