/**
 * Email Service for Password Reset
 * 
 * In a production environment, this would integrate with:
 * - Backend API (Node.js/Express, Django, etc.)
 * - Email service provider (SendGrid, AWS SES, Mailgun, etc.)
 * - Database for storing reset tokens
 */

// Simulated email templates
const emailTemplates = {
  passwordReset: (resetLink, userEmail) => ({
    to: userEmail,
    subject: 'Reset Your Kunsthaus Canvas Bids Password',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .logo {
            color: #c9a96e;
            font-size: 24px;
            font-weight: bold;
            font-family: 'Playfair Display', serif;
          }
          .content {
            background: #ffffff;
            padding: 40px 30px;
            border-left: 1px solid #e0e0e0;
            border-right: 1px solid #e0e0e0;
          }
          .button {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(135deg, #c9a96e 0%, #f4e4bc 50%, #e4d4a7 100%);
            color: #0f0f0f;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(201, 169, 110, 0.3);
          }
          .footer {
            background: #f5f5f5;
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 10px 10px;
            border: 1px solid #e0e0e0;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Kunsthaus Canvas Bids</div>
        </div>
        
        <div class="content">
          <h2 style="color: #0f0f0f; margin-top: 0;">Reset Your Password</h2>
          
          <p>Hello,</p>
          
          <p>We received a request to reset the password for your Kunsthaus Canvas Bids account associated with <strong>${userEmail}</strong>.</p>
          
          <p>Click the button below to reset your password:</p>
          
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Reset Password</a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #c9a96e; font-size: 14px;">${resetLink}</p>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>This link will expire in <strong>1 hour</strong></li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Your password won't change until you create a new one</li>
            </ul>
          </div>
          
          <p>If you're having trouble clicking the button, you can also reset your password by visiting our website and using the "Forgot Password" feature.</p>
          
          <p>Best regards,<br>
          <strong>The Kunsthaus Canvas Bids Team</strong></p>
        </div>
        
        <div class="footer">
          <p>This is an automated email. Please do not reply to this message.</p>
          <p>© 2024 Kunsthaus Canvas Bids. All rights reserved.</p>
          <p style="margin-top: 10px;">
            <a href="https://kunsthaus-canvas-bids.com" style="color: #c9a96e; text-decoration: none;">Visit Website</a> | 
            <a href="https://kunsthaus-canvas-bids.com/help" style="color: #c9a96e; text-decoration: none;">Help Center</a>
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
      Reset Your Password - Kunsthaus Canvas Bids
      
      Hello,
      
      We received a request to reset the password for your account (${userEmail}).
      
      Click the link below to reset your password:
      ${resetLink}
      
      This link will expire in 1 hour.
      
      If you didn't request this reset, please ignore this email.
      
      Best regards,
      The Kunsthaus Canvas Bids Team
    `
  })
};

/**
 * Generate a secure reset token
 * In production, this would be done on the backend
 */
export const generateResetToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Send password reset email
 * @param {string} email - User's email address
 * @returns {Promise} - Resolves with success message
 */
export const sendPasswordResetEmail = async (email) => {
  try {
    // Generate reset token
    const token = generateResetToken();
    
    // Create reset link
    const resetLink = `${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    
    // Get email template
    const emailContent = emailTemplates.passwordReset(resetLink, email);
    
    // In production, this would call your backend API:
    // const response = await fetch('/api/auth/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log for development (remove in production)
    console.log('Password Reset Email:', {
      to: email,
      resetLink,
      token
    });
    
    // Store token in localStorage for demo purposes
    // In production, this would be stored in the database
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    resetTokens[email] = {
      token,
      expires: Date.now() + 3600000, // 1 hour
      used: false
    };
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    
    return {
      success: true,
      message: 'Password reset email sent successfully',
      resetLink // Only for demo purposes
    };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

/**
 * Verify reset token
 * @param {string} token - Reset token
 * @param {string} email - User's email
 * @returns {boolean} - True if token is valid
 */
export const verifyResetToken = (token, email) => {
  try {
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    const tokenData = resetTokens[email];
    
    if (!tokenData) {
      return false;
    }
    
    // Check if token matches
    if (tokenData.token !== token) {
      return false;
    }
    
    // Check if token is expired
    if (Date.now() > tokenData.expires) {
      return false;
    }
    
    // Check if token has been used
    if (tokenData.used) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying reset token:', error);
    return false;
  }
};

/**
 * Reset password with token
 * @param {string} token - Reset token
 * @param {string} email - User's email
 * @param {string} newPassword - New password
 * @returns {Promise} - Resolves with success message
 */
export const resetPasswordWithToken = async (token, email, newPassword) => {
  try {
    // Verify token
    if (!verifyResetToken(token, email)) {
      throw new Error('Invalid or expired reset token');
    }
    
    // In production, this would call your backend API:
    // const response = await fetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token, email, newPassword })
    // });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mark token as used
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    if (resetTokens[email]) {
      resetTokens[email].used = true;
      localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    }
    
    // Log for development (remove in production)
    console.log('Password reset successful for:', email);
    
    return {
      success: true,
      message: 'Password reset successfully'
    };
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export default {
  sendPasswordResetEmail,
  verifyResetToken,
  resetPasswordWithToken,
  generateResetToken
};
