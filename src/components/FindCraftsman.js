import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { 
  FaBolt, 
  FaWrench, 
  FaHammer, 
  FaTree, 
  FaBroom, 
  FaTools, 
  FaCog,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { craftsmenData } from '../data/craftsmenData';
import CraftsmenList from './CraftsmenList';
import '../styles/FindCraftsman.css';

function FindCraftsman() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const toastShown = useRef(false);

  const categories = [
    { id: 'electrician', name: 'Electricians', icon: <FaBolt />, count: 10 },
    { id: 'plumber', name: 'Plumbers', icon: <FaWrench />, count: 10 },
    { id: 'carpenter', name: 'Carpenters', icon: <FaHammer />, count: 10 },
    { id: 'gardener', name: 'Gardeners', icon: <FaTree />, count: 10 },
    { id: 'cleaner', name: 'Cleaners', icon: <FaBroom />, count: 10 },
    { id: 'handyman', name: 'Handyman', icon: <FaTools />, count: 10 },
    { id: 'appliance', name: 'Appliance Repair', icon: <FaCog />, count: 10 }
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceFilter = (value) => {
    setPriceFilter(value);
  };

  const handleRatingFilter = (value) => {
    setRatingFilter(value);
  };

  const filterCraftsmen = () => {
    let filtered = selectedCategory === 'all' 
      ? Object.values(craftsmenData).flat()
      : craftsmenData[selectedCategory];

    if (searchQuery) {
      filtered = filtered.filter(worker => 
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.skills.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (priceFilter !== 'all') {
      filtered = filtered.filter(worker => {
        switch(priceFilter) {
          case 'low': return worker.price <= 300;
          case 'medium': return worker.price > 300 && worker.price <= 400;
          case 'high': return worker.price > 400;
          default: return true;
        }
      });
    }

    if (ratingFilter !== 'all') {
      filtered = filtered.filter(worker => 
        worker.rating >= parseInt(ratingFilter)
      );
    }

    return filtered;
  };

  useEffect(() => {
    // Show success message only if redirected after booking and toast hasn't been shown
    if (location.state?.bookingSuccess && !toastShown.current) {
      toast.success(location.state.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'booking-success-toast'
      });
      
      // Mark toast as shown
      toastShown.current = true;
      
      // Clear the state after showing the message
      window.history.replaceState({}, document.title);
    }

    // Cleanup function to reset the ref when component unmounts
    return () => {
      toastShown.current = false;
    };
  }, [location]);

  return (
    <div className="find-craftsman-page">
      <aside className={`sidebar ${showFilters ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h3>Filters</h3>
          <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
        </div>

        <div className="filter-section">
          <h4>Categories</h4>
          <div className="category-list">
            <button
              className={`category-item ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('all')}
            >
              <FaTools />
              <span>All Services</span>
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Price Range</h4>
          <div className="price-filters">
            <label className="radio-label">
              <input 
                type="radio" 
                name="price" 
                value="all"
                checked={priceFilter === 'all'}
                onChange={(e) => handlePriceFilter(e.target.value)}
              /> All Prices
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="price" 
                value="low"
                checked={priceFilter === 'low'}
                onChange={(e) => handlePriceFilter(e.target.value)}
              /> ₹300 and below
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="price" 
                value="medium"
                checked={priceFilter === 'medium'}
                onChange={(e) => handlePriceFilter(e.target.value)}
              /> ₹301 - ₹400
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="price" 
                value="high"
                checked={priceFilter === 'high'}
                onChange={(e) => handlePriceFilter(e.target.value)}
              /> Above ₹400
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h4>Rating</h4>
          <div className="rating-filters">
            <label className="radio-label">
              <input 
                type="radio" 
                name="rating" 
                value="all"
                checked={ratingFilter === 'all'}
                onChange={(e) => handleRatingFilter(e.target.value)}
              /> All Ratings
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="rating" 
                value="4"
                checked={ratingFilter === '4'}
                onChange={(e) => handleRatingFilter(e.target.value)}
              /> 4+ Stars
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="rating" 
                value="4.5"
                checked={ratingFilter === '4.5'}
                onChange={(e) => handleRatingFilter(e.target.value)}
              /> 4.5+ Stars
            </label>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="search-header">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>

        {selectedCategory === 'all' && !searchQuery ? (
          <div className="categories-grid">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="category-card"
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.count} available</p>
                <button className="view-button">View All</button>
              </div>
            ))}
          </div>
        ) : (
          <CraftsmenList 
            craftsmen={filterCraftsmen()} 
            category={selectedCategory}
          />
        )}
      </main>
    </div>
  );
}

export default FindCraftsman;