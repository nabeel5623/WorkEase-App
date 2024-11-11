import React, { useState } from 'react';
import { FaPhone, FaWhatsapp, FaTimes, FaUser, FaMapMarkerAlt, FaTools, FaStar } from 'react-icons/fa';
import '../styles/CraftsmanContact.css';

function CraftsmanContact({ craftsman, onClose }) {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleContact = (type) => {
    setShowAnimation(true);
    setTimeout(() => {
      if (type === 'call') {
        window.location.href = `tel:${craftsman.phone}`;
      } else {
        window.location.href = `https://wa.me/${craftsman.phone}?text=Hi, I found you on the Craftsman app.`;
      }
      setShowAnimation(false);
    }, 1500);
  };

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="craftsman-profile">
          <div className="profile-image">
            {craftsman.image ? (
              <img src={craftsman.image} alt={craftsman.name} />
            ) : (
              <FaUser className="default-avatar" />
            )}
          </div>
          <div className="profile-info">
            <h2>{craftsman.name}</h2>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <FaStar 
                  key={index}
                  className={index < craftsman.rating ? 'star-filled' : 'star-empty'} 
                />
              ))}
              <span>({craftsman.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="craftsman-details">
          <div className="detail-item">
            <FaTools />
            <span>{craftsman.specialization}</span>
          </div>
          <div className="detail-item">
            <FaMapMarkerAlt />
            <span>{craftsman.location}</span>
          </div>
        </div>

        <div className="contact-actions">
          <button 
            className={`contact-button call ${showAnimation ? 'animating' : ''}`}
            onClick={() => handleContact('call')}
            disabled={showAnimation}
          >
            <FaPhone />
            <span>Call Now</span>
            {showAnimation && <div className="loading-ring"></div>}
          </button>
          
          <button 
            className={`contact-button whatsapp ${showAnimation ? 'animating' : ''}`}
            onClick={() => handleContact('whatsapp')}
            disabled={showAnimation}
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
            {showAnimation && <div className="loading-ring"></div>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CraftsmanContact; 