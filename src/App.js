import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuctionProvider } from './context/AuctionContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AuctionList from './components/AuctionList';
import About from './components/About';
import './App.css';

function App() {
  return (
    <AuctionProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auctions" element={<AuctionList />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuctionProvider>
  );
}

export default App;
