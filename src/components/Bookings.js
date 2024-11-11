import React, { useState, useEffect } from 'react';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaRupeeSign, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../styles/Bookings.css';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    loadBookings();
    window.addEventListener('storage', loadBookings);
    return () => window.removeEventListener('storage', loadBookings);
  }, []);

  const loadBookings = () => {
    try {
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      if (Array.isArray(savedBookings) && savedBookings.length > 0) {
        const sortedBookings = savedBookings.sort((a, b) => {
          const dateA = a?.bookingDetails?.bookingDate || '';
          const dateB = b?.bookingDetails?.bookingDate || '';
          return new Date(dateB) - new Date(dateA);
        });
        setBookings(sortedBookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    }
  };

  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    try {
      const updatedBookings = bookings.filter(booking => booking.id !== bookingToDelete.id);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      toast.success('Booking removed successfully');
    } catch (error) {
      toast.error('Failed to remove booking');
    } finally {
      setShowConfirmModal(false);
      setBookingToDelete(null);
    }
  };

  const ConfirmationModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Remove Booking</h3>
        <p>Are you sure you want to remove this booking?</p>
        <div className="modal-service-info">
          <span>{bookingToDelete?.service?.name}</span>
          <span>{bookingToDelete?.bookingDetails?.date}</span>
        </div>
        <div className="modal-actions">
          <button 
            className="modal-button cancel" 
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <button 
            className="modal-button confirm" 
            onClick={confirmDelete}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-icon">📅</div>
          <h3>No Bookings Yet</h3>
          <p>Your service bookings will appear here</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking?.id || Math.random()} className="booking-card">
              <div className="booking-header">
                <h3>{booking?.service?.name || 'Unnamed Service'}</h3>
                <div className="booking-actions">
                  <span className={`booking-status ${booking?.bookingDetails?.status || 'pending'}`}>
                    {booking?.bookingDetails?.status || 'Pending'}
                  </span>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteClick(booking)}
                    aria-label="Remove booking"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="booking-details">
                <div className="detail-item">
                  <FaCalendar />
                  <span>{booking?.bookingDetails?.date || 'Date not specified'}</span>
                </div>
                <div className="detail-item">
                  <FaClock />
                  <span>{booking?.bookingDetails?.time || 'Time not specified'}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>{booking?.bookingDetails?.address || 'Address not specified'}</span>
                </div>
              </div>

              <div className="price-details">
                <div className="price-item">
                  <span>Service Amount</span>
                  <span>
                    <FaRupeeSign />
                    {booking?.service?.basePrice || 0}
                  </span>
                </div>
                <div className="price-item total">
                  <span>Total Amount</span>
                  <span>
                    <FaRupeeSign />
                    {booking?.bookingDetails?.totalAmount || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showConfirmModal && <ConfirmationModal />}
    </div>
  );
}

export default Bookings;