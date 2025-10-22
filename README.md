# Kunsthaus Canvas Bids

A modern React-based auction site for art collectors and enthusiasts. This platform allows users to browse, bid on, and purchase exceptional artworks from renowned and emerging artists.

## Features

- **Responsive Design**: Mobile-first approach ensuring great experience across all devices
- **User Authentication**: Simple sign-in/sign-up system for bidding functionality
- **Real-time Auctions**: Live auction listings with countdown timers
- **Bidding System**: Secure bidding process with bid validation
- **Payment Integration**: Mock payment gateway for successful transactions
- **State Management**: Context API for efficient state management
- **Routing**: React Router for seamless navigation

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for SPA navigation
- **Context API**: State management for auction data and user authentication
- **CSS3**: Custom styling with responsive design
- **Mock APIs**: Simulated backend functionality for demonstration

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with authentication
│   ├── Footer.jsx          # Site footer with links
│   ├── Home.jsx            # Landing page with hero section
│   ├── AuctionList.jsx     # Auction listings with filtering
│   ├── About.jsx           # About page with company information
│   ├── AuthModal.jsx       # Authentication modal
│   └── PaymentModal.jsx    # Payment processing modal
├── context/
│   └── AuctionContext.js   # Global state management
├── App.js                  # Main application component
├── App.css                 # Global styles
└── index.js               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kunsthaus-canvas-bids
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Features Overview

### Authentication System
- Simple email/password authentication
- User session management
- Protected bidding functionality

### Auction Management
- Browse current auctions
- Filter by category (Paintings, Photography, Sculpture)
- Real-time countdown timers
- Bid placement with validation

### Responsive Design
- Mobile-optimized interface
- Tablet and desktop layouts
- Touch-friendly interactions

### State Management
- Centralized state with Context API
- User authentication state
- Auction data management
- Error handling and loading states

## Future Enhancements

- **Real Authentication**: Integration with Firebase or Auth0
- **Payment Gateway**: Stripe or PayPal integration
- **Real-time Updates**: WebSocket integration for live bidding
- **Image Upload**: Cloudinary or AWS S3 integration
- **Advanced Filtering**: Search, price ranges, artist filters
- **User Profiles**: Bidding history, watchlists, preferences
- **Admin Panel**: Auction management, user administration
- **Email Notifications**: Bid confirmations, auction updates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact:
- Email: info@kunsthauscanvasbids.com
- Phone: +1 (555) 123-4567# art-site
