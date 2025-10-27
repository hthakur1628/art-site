# Kunsthaus Canvas Bids

A sophisticated online art auction platform built with React, featuring real-time bidding, user authentication, and a luxurious user interface designed for art collectors and enthusiasts.

## 🎨 Features

### Core Functionality
- **Live Art Auctions**: Browse and participate in ongoing art auctions with real-time updates
- **Interactive Bidding System**: Multi-step bidding process with confirmation and success states
- **User Authentication**: Secure sign-up and sign-in with custom authentication system
- **User Profiles**: Personalized accounts with bid history and profile management
- **Artwork Details**: Comprehensive artwork information including provenance and bid history
- **Protected Routes**: Authentication-required pages with automatic redirects
- **Responsive Design**: Mobile-first design optimized for all devices

### User Experience
- **Luxury UI/UX**: Sophisticated gold and charcoal color palette
- **Interactive Modals**: Professional bidding and artwork detail popups
- **Toast Notifications**: Real-time feedback for user actions using React Hot Toast
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Intuitive Navigation**: Clean, accessible navigation with React Router

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kunsthaus-canvas-bids
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
kunsthaus-canvas-bids/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── logos/
├── src/
│   ├── components/
│   │   ├── About.jsx                 # About page with company info
│   │   ├── ArtworkDetailModal.jsx    # Detailed artwork information modal
│   │   ├── AuctionList.jsx           # Auction listings with filtering
│   │   ├── BidModal.jsx              # Multi-step bidding process
│   │   ├── Home.jsx                  # Landing page with hero section
│   │   ├── MyBids.jsx                # User's bidding history
│   │   ├── Navbar.jsx                # Navigation with authentication
│   │   ├── Profile.jsx               # User profile management
│   │   ├── ProtectedRoute.jsx        # Route protection component
│   │   ├── SignIn.jsx                # User sign-in form
│   │   ├── SignUp.jsx                # User registration form
│   │   └── SimpleAuthModal.jsx       # Quick authentication modal
│   ├── context/
│   │   ├── AuthContext.js            # Authentication state management
│   │   └── AuctionContext.js         # Auction data and bidding logic
│   ├── App.js                        # Main application component
│   ├── App.css                       # Global styles and theme
│   └── index.js                      # Application entry point
├── package.json
└── README.md
```

## 🛠 Available Scripts

### Development
```bash
npm start          # Start development server (http://localhost:3000)
npm test           # Run test suite with Jest and Testing Library
npm run build      # Build optimized production bundle
npm run eject      # Eject from Create React App (one-way operation)
```

## 🔧 Technologies Used

### Frontend Framework
- **React 19.2.0** - Latest React with modern features and hooks
- **React Router DOM 7.9.4** - Client-side routing and navigation
- **React Icons 5.5.0** - Comprehensive icon library

### UI/UX Libraries
- **Framer Motion 12.23.24** - Smooth animations and micro-interactions
- **React Hot Toast 2.6.0** - Beautiful toast notifications

### Testing & Quality
- **Testing Library** - Comprehensive testing utilities for React
- **Jest DOM** - Custom Jest matchers for DOM testing
- **ESLint** - Code linting with React-specific rules

### Development Tools
- **React Scripts 5.0.1** - Build tools and webpack configuration
- **Web Vitals** - Performance monitoring

## 🎯 Key Components

### Authentication System
- **Custom Authentication**: JWT-like token management without external dependencies
- **Protected Routes**: Automatic redirects for unauthenticated users
- **Form Validation**: Client-side validation for registration and login
- **Persistent Sessions**: User sessions maintained across browser refreshes
- **Profile Management**: Users can update their information and view bid history

### Advanced Bidding System
- **Multi-Step Process**: Bid amount → Confirmation → Success feedback
- **Real-time Validation**: Minimum bid requirements and user authentication checks
- **Bid History**: Complete bidding history per artwork and user
- **Toast Notifications**: Immediate feedback for all bidding actions
- **Secure Placement**: Authentication required for all bidding activities

### Artwork Management
- **Detailed Information**: Comprehensive artwork details with tabbed interface
- **High-Quality Images**: Optimized image display with responsive sizing
- **Provenance Tracking**: Artwork history and authenticity information
- **Auction Status**: Real-time auction timing and current bid information
- **Category Filtering**: Browse by Paintings, Photography, Sculpture, and more

## 🎨 Design System

### Color Palette
- **Primary Gold**: #D4AF37 (Luxury accent and highlights)
- **Charcoal**: #2C2C2C (Primary text and navigation)
- **Light Gold**: #F4E4BC (Subtle backgrounds and hover states)
- **Pure White**: #FFFFFF (Clean backgrounds and cards)
- **Gradient Overlays**: Sophisticated gradients for hero sections

### Typography
- **Hierarchical Sizing**: Clear information architecture with consistent scaling
- **Readable Fonts**: Optimized for both desktop and mobile reading
- **Responsive Typography**: Fluid scaling across all device sizes

### Layout Principles
- **Mobile-First**: Designed primarily for mobile, enhanced for larger screens
- **Grid System**: Consistent spacing and alignment throughout
- **Card-Based Design**: Clean, organized content presentation
- **Accessibility**: WCAG compliant color contrasts and keyboard navigation

## 🔐 Authentication Flow

The application features a complete custom authentication system:

### Registration Process
1. User fills out registration form with validation
2. Email and password requirements enforced
3. Account created and user automatically signed in
4. Welcome toast notification displayed

### Login Process
1. Email/password authentication
2. Form validation with error handling
3. Successful login redirects to intended page
4. Authentication state persisted across sessions

### Protected Features
- Bidding on artworks requires authentication
- User profile and bid history pages
- Account settings and preferences
- Automatic redirects to sign-in for protected actions

For detailed setup instructions, see [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile**: 320px - 768px (Primary focus)
- **Tablet**: 768px - 1024px (Enhanced layout)
- **Desktop**: 1024px+ (Full feature set)

### Mobile Optimizations
- Touch-friendly button sizes (minimum 44px)
- Swipe gestures for modal navigation
- Optimized image loading for mobile networks
- Simplified navigation for smaller screens
- Thumb-friendly interaction zones

### Performance Features
- Lazy loading for artwork images
- Optimized bundle splitting
- Efficient re-rendering with React optimization
- Minimal CSS for faster load times

## 🧪 Testing Strategy

### Test Coverage
```bash
npm test                    # Run all tests
npm test -- --coverage     # Run with coverage report
npm test -- --watch        # Run in watch mode
```

### Testing Includes
- **Component Unit Tests**: Individual component functionality
- **Integration Tests**: User flow testing (sign-up, bidding, navigation)
- **Authentication Tests**: Login/logout and protected route behavior
- **Responsive Tests**: Mobile and desktop layout validation
- **Accessibility Tests**: Screen reader and keyboard navigation

## 🚀 Deployment

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build/` folder with:
- Minified JavaScript and CSS
- Optimized images and assets
- Service worker for caching
- Performance optimizations

### Deployment Platforms

#### Netlify (Recommended)
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy automatically on push

#### Vercel
1. Import project from Git
2. Framework preset: Create React App
3. Build and output settings auto-detected
4. Deploy with zero configuration

#### Traditional Hosting
1. Run `npm run build`
2. Upload `build/` folder contents to web server
3. Configure server for SPA routing (redirect all routes to index.html)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_endpoint
REACT_APP_ENVIRONMENT=development
```

### Customization Options
- **Color Theme**: Modify CSS custom properties in `App.css`
- **Auction Categories**: Update categories in `AuctionContext.js`
- **Authentication**: Extend auth system in `AuthContext.js`
- **Animations**: Customize Framer Motion settings in components

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper testing
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request with detailed description

### Code Standards
- Follow existing code style and formatting
- Add tests for new features
- Update documentation for significant changes
- Ensure responsive design for all new components
- Test accessibility features

## 📈 Performance Metrics

### Core Web Vitals
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Features
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Efficient state management
- Minimal re-renders with React.memo()
- Service worker caching

## 🔮 Roadmap & Future Enhancements

### Phase 1 (Current)
- ✅ Complete authentication system
- ✅ Advanced bidding interface
- ✅ Responsive design
- ✅ User profile management

### Phase 2 (Planned)
- **Real-time Updates**: WebSocket integration for live bidding
- **Payment Processing**: Stripe integration for actual transactions
- **Email Notifications**: Bid confirmations and auction updates
- **Advanced Search**: Filters by price, artist, medium, and date

### Phase 3 (Future)
- **Admin Dashboard**: Auction management and analytics
- **Social Features**: User reviews and artist following
- **Mobile App**: React Native companion app
- **AI Recommendations**: Personalized artwork suggestions
- **Multi-language Support**: Internationalization
- **Advanced Analytics**: User behavior and auction performance

## 🆘 Support & Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or start on different port
PORT=3001 npm start
```

#### Authentication Issues
- Check browser console for errors
- Verify localStorage is enabled
- Clear browser cache and cookies

### Getting Help
1. Check [Issues](../../issues) for existing solutions
2. Search documentation and README
3. Create detailed issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, browser)
   - Console errors or screenshots

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Create React App** - Initial project setup and build tools
- **React Community** - Excellent documentation and ecosystem
- **Framer Motion** - Beautiful animation library
- **React Hot Toast** - Elegant notification system
- **React Icons** - Comprehensive icon collection

## 📞 Contact

**Kunsthaus Canvas Bids**
- Website: [kunsthauscanvasbids.com](https://kunsthauscanvasbids.com)
- Email: info@kunsthauscanvasbids.com
- Phone: +1 (555) 123-4567

---

**Built with ❤️ for art enthusiasts and collectors worldwide**

*Experience the future of art auctions - where technology meets artistry*