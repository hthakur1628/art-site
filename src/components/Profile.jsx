import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendarAlt, FaShieldAlt, FaEdit } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="auth-required">
            <h2>Please Sign In</h2>
            <p>You need to be signed in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <h2>Profile not found</h2>
        <p>Unable to load user profile information.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-info">
            <h1>{user.name || 'Art Collector'}</h1>
            <p className="profile-subtitle">Premium Member</p>
          </div>
          <button className="edit-profile-btn">
            <FaEdit />
            Edit Profile
          </button>
        </motion.div>

        <div className="profile-content">
          <motion.div
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-value">{user.email}</span>
                </div>
              </div>
              
              <div className="info-item">
                <FaUser className="info-icon" />
                <div>
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user.name || 'Not provided'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <FaCalendarAlt className="info-icon" />
                <div>
                  <span className="info-label">Member Since</span>
                  <span className="info-value">
                    {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
              </div>
              
              <div className="info-item">
                <FaShieldAlt className="info-icon" />
                <div>
                  <span className="info-label">Email Verified</span>
                  <span className={`info-value ${user.verified ? 'verified' : 'unverified'}`}>
                    {user.verified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Account Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">12</div>
                <div className="stat-label">Active Bids</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5</div>
                <div className="stat-label">Won Auctions</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">28</div>
                <div className="stat-label">Watchlist Items</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">$45,200</div>
                <div className="stat-label">Total Spent</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>Preferences</h2>
            <div className="preferences-grid">
              <div className="preference-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Email notifications for bid updates
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  SMS alerts for auction endings
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <input type="checkbox" />
                  Marketing communications
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Weekly auction digest
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;