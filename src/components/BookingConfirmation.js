import { useState, useEffect } from 'react';
import { FaSpinner, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';
import '../styles/BookingConfirmation.css';

function BookingConfirmation({ onComplete, bookingDetails }) {
  const [stage, setStage] = useState('processing');

  useEffect(() => {
    // Processing animation
    setTimeout(() => {
      setStage('confirmed');
    }, 3000);

    // Complete the booking process
    setTimeout(() => {
      onComplete();
    }, 5000);
  }, [onComplete]);

  return (
    <div className="booking-confirmation-overlay">
      <div className="booking-confirmation-modal">
        {stage === 'processing' ? (
          <div className="processing-animation">
            <FaSpinner className="spinner" />
            <h2>Hold Tight!</h2>
            <p>We're confirming your booking...</p>
          </div>
        ) : (
          <div className="success-animation">
            <FaCheckCircle className="success-icon" />
            <h2>Successfully Booked!</h2>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingConfirmation; 