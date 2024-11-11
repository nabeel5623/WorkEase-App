import React from 'react';
import { FaPercent, FaGift, FaClock, FaUsers, FaTag } from 'react-icons/fa';
import '../styles/OfferShowcase.css';

function OfferShowcase() {
  const showcaseOffers = [
    {
      id: 1,
      title: "New User Special",
      discount: "50% OFF",
      code: "NEWUSER50",
      description: "First-time users get 50% off on any service",
      validTill: "Valid for 7 days",
      icon: <FaGift />,
      color: "#4f46e5"
    },
    {
      id: 2,
      title: "Weekend Deal",
      discount: "₹200 OFF",
      code: "WEEKEND200",
      description: "Special discount for weekend bookings",
      validTill: "Every Sat-Sun",
      icon: <FaTag />,
      color: "#0891b2"
    },
    {
      id: 3,
      title: "Early Bird",
      discount: "30% OFF",
      code: "EARLY30",
      description: "Book between 6 AM - 9 AM",
      validTill: "Valid daily",
      icon: <FaClock />,
      color: "#059669"
    },
    {
      id: 4,
      title: "Group Booking",
      discount: "40% OFF",
      code: "GROUP40",
      description: "Book for 3 or more services",
      validTill: "Limited time",
      icon: <FaUsers />,
      color: "#dc2626"
    }
  ];

  return (
    <section className="showcase-section">
      <div className="showcase-container">
        <div className="showcase-header">
          <h2>Special Offers</h2>
          <p>Exclusive deals just for you</p>
        </div>
        
        <div className="offers-grid">
          {showcaseOffers.map(offer => (
            <div 
              key={offer.id} 
              className="offer-card"
              style={{ borderColor: offer.color }}
            >
              <div 
                className="offer-icon" 
                style={{ backgroundColor: offer.color }}
              >
                {offer.icon}
              </div>
              <h3>{offer.title}</h3>
              <div className="offer-discount">{offer.discount}</div>
              <p>{offer.description}</p>
              <div className="offer-code">
                Use code: <span>{offer.code}</span>
              </div>
              <div className="offer-validity">{offer.validTill}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfferShowcase; 