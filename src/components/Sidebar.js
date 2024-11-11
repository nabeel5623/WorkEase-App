import React, { useState } from 'react';
import { FaStar, FaRupeeSign } from 'react-icons/fa';
import '../styles/Sidebar.css';

function Sidebar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState(null);

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFilterChange({ priceRange: newRange, rating: selectedRating });
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
    onFilterChange({ priceRange, rating: rating === selectedRating ? null : rating });
  };

  return (
    <div className="sidebar">
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-range-container">
          <div className="price-inputs">
            <div className="price-field">
              <span className="rupee-symbol">₹</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                min="0"
                max={priceRange[1]}
                placeholder="Min"
              />
            </div>
            <span className="price-separator">to</span>
            <div className="price-field">
              <span className="rupee-symbol">₹</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                min={priceRange[0]}
                max="10000"
                placeholder="Max"
              />
            </div>
          </div>
          
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="slider"
            />
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="slider"
            />
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Rating</h3>
        <div className="rating-buttons">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={`rating-btn ${selectedRating === rating ? 'active' : ''}`}
              onClick={() => handleRatingClick(rating)}
            >
              <div className="stars">
                {[...Array(rating)].map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>
              <span>& up</span>
              <span className="rating-count">({Math.floor(Math.random() * 500 + 100)})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 