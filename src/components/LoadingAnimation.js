import React from 'react';
import '../styles/LoadingAnimation.css';

const LoadingAnimation = () => (
  <div className="loading-overlay">
    <div className="loading-content">
      <div className="loading-spinner"></div>
      <p>Processing your booking...</p>
    </div>
  </div>
);

export default LoadingAnimation; 