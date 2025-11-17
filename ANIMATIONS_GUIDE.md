# Website Animations Guide

## Overview
This document outlines all the animations added to make the Kunsthaus Canvas Bids website more attractive and engaging.

## Global Animations (App.css)

### Keyframe Animations
1. **fadeIn** - Simple fade in effect
2. **fadeInUp** - Fade in with upward movement
3. **fadeInDown** - Fade in with downward movement
4. **slideInLeft** - Slide in from left
5. **slideInRight** - Slide in from right
6. **scaleIn** - Scale up with fade in
7. **pulse** - Gentle pulsing effect
8. **shimmer** - Shimmer/shine effect
9. **float** - Floating up and down
10. **glow** - Glowing shadow effect

### Utility Classes
- `.animate-fade-in` - Apply fade in animation
- `.animate-fade-in-up` - Apply fade in up animation
- `.animate-fade-in-down` - Apply fade in down animation
- `.animate-slide-in-left` - Apply slide in left animation
- `.animate-slide-in-right` - Apply slide in right animation
- `.animate-scale-in` - Apply scale in animation
- `.animate-pulse` - Apply pulse animation
- `.animate-float` - Apply float animation
- `.animate-glow` - Apply glow animation

### Hover Effects
- `.hover-lift` - Lifts element on hover with shadow
- `.hover-scale` - Scales element on hover
- `.hover-glow` - Adds glow effect on hover

## Component-Specific Animations

### Navbar (Navbar.jsx)
- **Logo**: Slides in from left with fade (0.6s duration)
- **Nav Links**: Staggered fade in from top (0.1s delay between each)
- **Auth Button**: Animated with the nav items

### Auction List (AuctionList.jsx)
- **Page Title**: Fades in from top (0.6s duration)
- **Search Controls**: Fades in with upward movement (0.6s duration, 0.2s delay)
- **Auction Cards**: Staggered fade in with upward movement (0.1s delay per card)
- **Card Hover**: Lifts up 8px with smooth transition
- **Featured Badge**: Pulse animation with shimmer effect
- **Filter Buttons**: Lift on hover with shadow
- **Bid Button**: 
  - Lifts and scales on hover
  - Ripple effect on hover
  - Active state animation
- **Price Display**: Scales up and brightens on card hover
- **Metadata Badges**: Lift up on card hover
- **Search Input**: Lifts slightly on focus/hover

### Gallery (Gallery.jsx)
- **Gallery Items**: Staggered fade in with upward movement (0.1s delay per item)
- **Item Hover**: Lifts up 10px with smooth transition
- **Image Zoom**: Scales up 5% on hover
- **Metadata Badges**: Lift up on card hover

### About Page (About.jsx)
- **Page Title**: Fades in from top (0.6s duration)
- **Subtitle**: Fades in (0.6s duration, 0.2s delay)
- **Mission Section**: Fades in with upward movement when scrolled into view
- **Text Content**: Slides in from left when scrolled into view

### Home Page (Home.jsx)
- Already has framer-motion animations for:
  - Hero section
  - Featured artworks carousel
  - Statistics counter
  - Testimonials

## CSS Transitions

### Smooth Transitions Applied To:
1. **All Cards**: Transform, box-shadow, border-color
2. **Buttons**: Background, color, transform, box-shadow
3. **Images**: Transform, filter
4. **Inputs**: Border, box-shadow, transform
5. **Links**: Color, text-decoration

### Timing Functions
- **Fast**: 0.2s - Quick interactions
- **Normal**: 0.3s - Standard transitions
- **Slow**: 0.5s - Smooth, noticeable animations

## Animation Best Practices Used

1. **Performance**: Using `transform` and `opacity` for smooth 60fps animations
2. **Accessibility**: Respecting user preferences (can be enhanced with prefers-reduced-motion)
3. **Staggering**: Delays between similar elements for visual interest
4. **Hover States**: Clear feedback for interactive elements
5. **Loading States**: Smooth transitions for content appearance
6. **Scroll Animations**: Using `whileInView` for elements that appear on scroll

## Browser Compatibility
All animations use standard CSS3 and are compatible with:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements
Consider adding:
1. Page transition animations between routes
2. Loading skeleton screens
3. Micro-interactions for form validation
4. Parallax scrolling effects
5. Advanced scroll-triggered animations
6. Reduced motion media query support
