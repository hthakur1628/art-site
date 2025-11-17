import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { sendPasswordResetEmail } from '../services/emailService';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendPasswordResetEmail(email);
      setIsLoading(false);
      setEmailSent(true);
      toast.success('Password reset link sent to your email!');
      
      // For demo purposes, show the reset link in console
      console.log('Reset link (demo):', result.resetLink);
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to send reset email. Please try again.');
      console.error('Password reset error:', error);
    }
  };

  if (emailSent) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <motion.div 
            className="auth-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="auth-header">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <FaCheckCircle style={{ fontSize: '4rem', color: 'var(--success-green)', marginBottom: '1rem' }} />
              </motion.div>
              <h1>Check Your Email</h1>
              <p>We've sent a password reset link to:</p>
              <p style={{ color: 'var(--primary-gold)', fontWeight: '600', marginTop: '0.5rem' }}>{email}</p>
            </div>

            <div className="email-instructions">
              <h3>What's next?</h3>
              <ol style={{ textAlign: 'left', lineHeight: '1.8', color: 'var(--dark-gray)' }}>
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the password reset link in the email</li>
                <li>Create a new password</li>
                <li>Sign in with your new password</li>
              </ol>
              
              <div className="demo-credentials" style={{ marginTop: '1.5rem' }}>
                <small>
                  <strong>Note:</strong> The reset link will expire in 1 hour for security purposes.
                </small>
              </div>
            </div>

            <div className="auth-footer" style={{ marginTop: '2rem' }}>
              <p>
                Didn't receive the email?{' '}
                <button 
                  onClick={() => setEmailSent(false)}
                  className="auth-link"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  Try again
                </button>
              </p>
              <p style={{ marginTop: '1rem' }}>
                <Link to="/signin" className="auth-link">
                  <FaArrowLeft style={{ marginRight: '0.5rem' }} />
                  Back to Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h1>Forgot Password?</h1>
            <p>No worries! Enter your email and we'll send you reset instructions.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-container">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner">⏳</span>
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Remember your password?{' '}
              <Link to="/signin" className="auth-link">
                Sign In
              </Link>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <Link to="/" className="auth-link">
                <FaArrowLeft style={{ marginRight: '0.5rem' }} />
                Back to Home
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
