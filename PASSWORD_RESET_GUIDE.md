# Password Reset System - Implementation Guide

## Overview
This document describes the complete password reset system with email authentication for Kunsthaus Canvas Bids.

## Features

### 1. Forgot Password Page (`/forgot-password`)
- Clean, user-friendly interface
- Email validation
- Loading states
- Success confirmation screen
- Instructions for next steps

### 2. Reset Password Page (`/reset-password`)
- Token validation from email link
- Password strength indicator
- Password confirmation matching
- Real-time validation feedback
- Security requirements display

### 3. Email Service
- Secure token generation
- Professional email templates
- Token expiration (1 hour)
- Token usage tracking
- HTML and plain text email formats

## User Flow

```
1. User clicks "Forgot Password" on Sign In page
   ↓
2. User enters email address
   ↓
3. System sends reset email with unique link
   ↓
4. User clicks link in email
   ↓
5. User enters new password (with strength validation)
   ↓
6. Password is reset successfully
   ↓
7. User is redirected to Sign In page
```

## File Structure

```
src/
├── components/
│   ├── ForgotPassword.jsx      # Forgot password form
│   ├── ResetPassword.jsx       # Reset password form
│   ├── SignIn.jsx              # Updated with forgot password link
│   └── Auth.css                # Shared authentication styles
├── services/
│   └── emailService.js         # Email and token management
└── App.js                      # Updated with new routes
```

## Components

### ForgotPassword Component
**Location:** `src/components/ForgotPassword.jsx`

**Features:**
- Email input with validation
- Loading state during submission
- Success screen with instructions
- Link back to sign in
- Retry option

**Props:** None

**State:**
- `email`: User's email address
- `isLoading`: Loading state
- `emailSent`: Success state

### ResetPassword Component
**Location:** `src/components/ResetPassword.jsx`

**Features:**
- Token validation from URL parameters
- Password strength meter (4 levels)
- Password confirmation matching
- Real-time validation feedback
- Security requirements checklist
- Invalid token handling

**URL Parameters:**
- `token`: Reset token from email
- `email`: User's email address

**State:**
- `password`: New password
- `confirmPassword`: Password confirmation
- `showPassword`: Toggle password visibility
- `showConfirmPassword`: Toggle confirm password visibility
- `isLoading`: Loading state
- `tokenValid`: Token validation state
- `passwordStrength`: Password strength (0-4)

## Email Service

### Functions

#### `sendPasswordResetEmail(email)`
Sends a password reset email to the user.

**Parameters:**
- `email` (string): User's email address

**Returns:**
- Promise resolving to `{ success, message, resetLink }`

**Example:**
```javascript
import { sendPasswordResetEmail } from '../services/emailService';

try {
  const result = await sendPasswordResetEmail('user@example.com');
  console.log(result.message);
} catch (error) {
  console.error('Failed to send email:', error);
}
```

#### `verifyResetToken(token, email)`
Verifies if a reset token is valid.

**Parameters:**
- `token` (string): Reset token
- `email` (string): User's email address

**Returns:**
- Boolean indicating token validity

**Example:**
```javascript
import { verifyResetToken } from '../services/emailService';

const isValid = verifyResetToken(token, email);
if (!isValid) {
  console.log('Token is invalid or expired');
}
```

#### `resetPasswordWithToken(token, email, newPassword)`
Resets the user's password using a valid token.

**Parameters:**
- `token` (string): Reset token
- `email` (string): User's email address
- `newPassword` (string): New password

**Returns:**
- Promise resolving to `{ success, message }`

**Example:**
```javascript
import { resetPasswordWithToken } from '../services/emailService';

try {
  await resetPasswordWithToken(token, email, newPassword);
  console.log('Password reset successful');
} catch (error) {
  console.error('Failed to reset password:', error);
}
```

## Security Features

### 1. Token Security
- Cryptographically secure random tokens (32 bytes)
- One-time use tokens
- 1-hour expiration
- Token tied to specific email address

### 2. Password Requirements
- Minimum 8 characters
- Mix of uppercase and lowercase letters
- At least one number
- At least one special character
- Real-time strength validation

### 3. Validation
- Email format validation
- Password strength checking
- Password confirmation matching
- Token expiration checking
- Token usage tracking

## Email Template

The system includes a professional HTML email template with:
- Branded header with logo
- Clear call-to-action button
- Security warnings
- Plain text fallback
- Responsive design
- Professional footer

### Email Content Includes:
1. Greeting
2. Reset button (primary CTA)
3. Plain text link (backup)
4. Security notice with:
   - Expiration time
   - What to do if not requested
   - Password safety information
5. Support information
6. Footer with links

## Routes

Add these routes to your `App.js`:

```javascript
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// In your Routes component:
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
```

## Testing the System

### Demo Mode
The current implementation uses localStorage for demo purposes:

1. **Request Password Reset:**
   - Go to `/forgot-password`
   - Enter any email address
   - Check console for reset link

2. **Reset Password:**
   - Copy the reset link from console
   - Paste in browser
   - Enter new password
   - Verify password strength indicator
   - Submit to reset

### Testing Checklist
- [ ] Email validation works
- [ ] Loading states display correctly
- [ ] Success screen shows after email sent
- [ ] Reset link contains token and email
- [ ] Token validation works
- [ ] Invalid token shows error page
- [ ] Password strength meter updates
- [ ] Password confirmation matching works
- [ ] Form validation prevents weak passwords
- [ ] Success redirects to sign in
- [ ] Token expires after 1 hour
- [ ] Token can only be used once

## Production Integration

### Backend Requirements

To integrate with a real backend, you'll need:

1. **API Endpoints:**
   ```
   POST /api/auth/forgot-password
   POST /api/auth/reset-password
   GET  /api/auth/verify-token
   ```

2. **Database Tables:**
   ```sql
   CREATE TABLE password_reset_tokens (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES users(id),
     token VARCHAR(255) UNIQUE NOT NULL,
     email VARCHAR(255) NOT NULL,
     expires_at TIMESTAMP NOT NULL,
     used BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Email Service Integration:**
   - SendGrid
   - AWS SES
   - Mailgun
   - Postmark
   - Or any SMTP service

### Example Backend Integration

```javascript
// In emailService.js, replace the simulated API calls:

export const sendPasswordResetEmail = async (email) => {
  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  
  if (!response.ok) {
    throw new Error('Failed to send reset email');
  }
  
  return await response.json();
};

export const resetPasswordWithToken = async (token, email, newPassword) => {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, email, newPassword })
  });
  
  if (!response.ok) {
    throw new Error('Failed to reset password');
  }
  
  return await response.json();
};
```

## Customization

### Styling
All styles are in `Auth.css` and use CSS variables for easy customization:
- `--primary-gold`: Primary brand color
- `--success-green`: Success states
- `--error-red`: Error states
- `--dark-charcoal`: Text color

### Email Template
Customize the email template in `emailService.js`:
- Update branding colors
- Change logo
- Modify copy
- Add additional information
- Update footer links

### Token Expiration
Change token expiration time in `emailService.js`:
```javascript
expires: Date.now() + 3600000, // 1 hour (in milliseconds)
```

### Password Requirements
Modify password strength calculation in `ResetPassword.jsx`:
```javascript
useEffect(() => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;
  setPasswordStrength(strength);
}, [password]);
```

## Accessibility

The system includes:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader friendly
- High contrast support
- Clear error messages

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

Potential improvements:
1. Two-factor authentication
2. Email verification before reset
3. Password history checking
4. Account lockout after failed attempts
5. SMS-based reset option
6. Social login recovery
7. Security questions
8. Biometric authentication
9. Password manager integration
10. Multi-language support

## Troubleshooting

### Common Issues

**Issue:** Reset link doesn't work
- Check URL parameters are present
- Verify token hasn't expired
- Ensure token hasn't been used

**Issue:** Email not sending
- Check email service configuration
- Verify API endpoint is correct
- Check network requests in browser console

**Issue:** Password strength not updating
- Verify password meets minimum requirements
- Check regex patterns in code
- Ensure state is updating correctly

## Support

For issues or questions:
1. Check console for error messages
2. Verify all dependencies are installed
3. Review this documentation
4. Check the code comments
5. Test in different browsers

## License

This implementation is part of the Kunsthaus Canvas Bids project.
