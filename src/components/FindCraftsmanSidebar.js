import React, { useState, useEffect } from 'react';
import { FaStar, FaRupeeSign, FaFilter, FaCheck } from 'react-icons/fa';
import '../styles/FindCraftsmanSidebar.css';

function FindCraftsmanSidebar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = newValue;
    
    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && newValue > priceRange[1]) return;
    if (index === 1 && newValue < priceRange[0]) return;
    
    setPriceRange(newRange);
    onFilterChange({ priceRange: newRange, rating: selectedRating });
  };

  const calculateFill = () => {
    const percent1 = (priceRange[0] / 10000) * 100;
    const percent2 = (priceRange[1] / 10000) * 100;
    return { left: `${percent1}%`, width: `${percent2 - percent1}%` };
  };

  return (
    <div className="find-craftsman-sidebar">
      <div className="sidebar-header">
        <FaFilter className="filter-icon" />
        <h2>Filters</h2>
      </div>

      <div className="filter-section price-section">
        <h3>Price Range</h3>
        <div className="price-range-inputs">
          <div className="price-input-group">
            <label>Min Price</label>
            <div className="price-input">
              <FaRupeeSign className="rupee-icon" />
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                min="0"
                max="10000"
              />
            </div>
          </div>
          <div className="price-input-group">
            <label>Max Price</label>
            <div className="price-input">
              <FaRupeeSign className="rupee-icon" />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                min="0"
                max="10000"
              />
            </div>
          </div>
        </div>

        <div className="range-slider-container">
          <div className="range-track">
            <div 
              className="range-fill"
              style={calculateFill()}
            />
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="range-input"
          />
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="range-input"
          />
        </div>
      </div>

      <div className="filter-section rating-section">
        <h3>Rating</h3>
        <div className="rating-options">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={`rating-option ${selectedRating === rating ? 'active' : ''}`}
              onClick={() => {
                setSelectedRating(selectedRating === rating ? null : rating);
                onFilterChange({
                  priceRange,
                  rating: selectedRating === rating ? null : rating
                });
              }}
            >
              <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`star ${index < rating ? 'filled' : 'empty'}`}
                  />
                ))}
              </div>
              <span className="rating-label">{`${rating} & above`}</span>
              <span className="rating-count">
                ({Math.floor(Math.random() * 500 + 100)})
              </span>
              {selectedRating === rating && (
                <FaCheck className="check-icon" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindCraftsmanSidebar; 