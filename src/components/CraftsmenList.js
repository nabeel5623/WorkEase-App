import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaPhoneAlt, FaWhatsapp, FaRegClock, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CraftsmenList.css';

function CraftsmenList({ craftsmen = [], category = 'all' }) {
  const navigate = useNavigate();
  const [loadingContact, setLoadingContact] = useState({
    workerId: null,
    type: null
  });

  if (!craftsmen || craftsmen.length === 0) {
    return (
      <div className="no-results">
        <h3>No craftsmen found</h3>
        <p>Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  const handleHire = (worker) => {
    navigate(`/book-craftsman/${worker.id}`, { state: { worker } });
  };

  const handleContact = async (worker, type) => {
    setLoadingContact({ workerId: worker.id, type });
    
    // Simulate API call with 2-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    toast.success(
      `${worker.name} will contact you shortly via ${type === 'whatsapp' ? 'WhatsApp' : 'phone'}!`, 
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
    
    setLoadingContact({ workerId: null, type: null });
  };

  const isWorkerAvailable = (worker) => {
    // This would typically check against your bookings database
    // For now, we'll simulate with localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const workerBookings = bookings.filter(b => b.workerId === worker.id);
    
    // Check if worker has any current bookings
    const now = new Date();
    return !workerBookings.some(booking => {
      const bookingDate = new Date(booking.date);
      const bookingEnd = new Date(bookingDate.getTime() + (booking.hours * 60 * 60 * 1000));
      return now >= bookingDate && now <= bookingEnd;
    });
  };

  return (
    <div className="craftsmen-list-container">
      <h2 className="category-title">
        {category === 'all' 
          ? 'All Available Craftsmen' 
          : `Available ${category.charAt(0).toUpperCase() + category.slice(1)}s`}
      </h2>
      
      <div className="craftsmen-grid">
        {craftsmen.map(worker => (
          <div key={worker.id} className={`craftsman-card ${!isWorkerAvailable(worker) ? 'unavailable' : ''}`}>
            <div className="craftsman-header">
              <img src={worker.image} alt={worker.name} className="craftsman-image" />
              <div className="craftsman-info">
                <h3>{worker.name}</h3>
                <div className="rating">
                  <FaStar className="star-icon" />
                  <span>{worker.rating}</span>
                  <span className="reviews">({worker.reviews} reviews)</span>
                </div>
                <p className="experience">{worker.experience} experience</p>
              </div>
            </div>

            <div className="craftsman-details">
              <div className="skills">
                {worker.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>

              <div className="location-availability">
                <p className="location">{worker.location}</p>
                <p className={`availability ${worker.availability.includes('Now') ? 'available' : ''}`}>
                  <FaRegClock className="availability-icon" />
                  {worker.availability}
                </p>
              </div>

              <div className="price-section">
                <p className="price">₹{worker.price}/hour</p>
                <div className="action-buttons">
                  <button 
                    className={`contact-btn whatsapp ${
                      loadingContact.workerId === worker.id && 
                      loadingContact.type === 'whatsapp' ? 'loading' : ''
                    }`}
                    onClick={() => handleContact(worker, 'whatsapp')}
                    disabled={loadingContact.workerId === worker.id}
                  >
                    {loadingContact.workerId === worker.id && 
                     loadingContact.type === 'whatsapp' ? (
                      <FaSpinner className="spinner" />
                    ) : (
                      <FaWhatsapp />
                    )}
                    WhatsApp
                  </button>
                  <button 
                    className={`contact-btn call ${
                      loadingContact.workerId === worker.id && 
                      loadingContact.type === 'call' ? 'loading' : ''
                    }`}
                    onClick={() => handleContact(worker, 'call')}
                    disabled={loadingContact.workerId === worker.id}
                  >
                    {loadingContact.workerId === worker.id && 
                     loadingContact.type === 'call' ? (
                      <FaSpinner className="spinner" />
                    ) : (
                      <FaPhoneAlt />
                    )}
                    Call
                  </button>
                </div>
              </div>

              {!isWorkerAvailable(worker) && (
                <div className="unavailable-overlay">
                  <span className="unavailable-badge">Currently Unavailable</span>
                </div>
              )}

              <button 
                className="hire-button"
                onClick={() => handleHire(worker)}
                disabled={!isWorkerAvailable(worker)}
              >
                {isWorkerAvailable(worker) ? 'Hire Now' : 'Not Available'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CraftsmenList; 