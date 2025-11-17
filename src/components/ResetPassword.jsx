import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { verifyResetToken, resetPasswordWithToken } from '../services/emailService';
import './Auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    // Validate token on component mount
    if (!token || !email) {
      setTokenValid(false);
      toast.error('Invalid or expired reset link');
      return;
    }
    
    // Verify token with email service
    const isValid = verifyResetToken(token, email);
    if (!isValid) {
      setTokenValid(false);
      toast.error('Invalid or expired reset link');
    }
  }, [token, email]);

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return '#e74c3c';
      case 2:
        return '#f39c12';
      case 3:
        return '#3498db';
      case 4:
        return '#27ae60';
      default:
        return '#ddd';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordStrength < 2) {
      toast.error('Please choose a stronger password');
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordWithToken(token, email, password);
      setIsLoading(false);
      toast.success('Password reset successfully!');
      
      // Redirect to sign in page
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || 'Failed to reset password. Please try again.');
      console.error('Password reset error:', error);
    }
  };

  if (!tokenValid) {
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
              <FaTimesCircle style={{ fontSize: '4rem', color: 'var(--error-red)', marginBottom: '1rem' }} />
              <h1>Invalid Reset Link</h1>
              <p>This password reset link is invalid or has expired.</p>
            </div>

            <div className="auth-footer" style={{ marginTop: '2rem' }}>
              <p>
                <Link to="/forgot-password" className="auth-link">
                  Request a new reset link
                </Link>
              </p>
              <p style={{ marginTop: '1rem' }}>
                <Link to="/signin" className="auth-link">
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
            <h1>Reset Your Password</h1>
            <p>Create a new password for your account</p>
            {email && (
              <p style={{ color: 'var(--primary-gold)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {email}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <div className="input-container">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill" 
                      style={{ 
                        width: `${(passwordStrength / 4) * 100}%`,
                        backgroundColor: getStrengthColor()
                      }}
                    />
                  </div>
                  <span className="strength-text" style={{ color: getStrengthColor() }}>
                    {getStrengthText()}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-container">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {confirmPassword && (
                  <div className="password-match">
                    {password === confirmPassword ? (
                      <FaCheckCircle className="match-icon success" />
                    ) : (
                      <FaTimesCircle className="match-icon error" />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="demo-credentials">
              <small>
                <strong>Password Requirements:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li>At least 8 characters long</li>
                  <li>Mix of uppercase and lowercase letters</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </small>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
            >
              {isLoading ? (
                <>
                  <span className="spinner">⏳</span>
                  <span>Resetting Password...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  <span>Reset Password</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              <Link to="/signin" className="auth-link">
                Back to Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
