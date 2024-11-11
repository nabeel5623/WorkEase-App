import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaCalendar, FaClock, FaMapMarkerAlt, FaTools, FaRupeeSign } from 'react-icons/fa';
import '../styles/BookingPage.css';
import BookingConfirmation from './BookingConfirmation';
import { useBookings } from '../hooks/useBookings';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const worker = location.state?.worker;

  // Move all hooks to the top
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [hours, setHours] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const { addBooking, checkAvailability } = useBookings();

  // Use useEffect to handle worker data and price initialization
  useEffect(() => {
    if (!worker) {
      navigate('/find-craftsman');
      return;
    }
    setTotalPrice(worker.price);
  }, [worker, navigate]);

  // Format date for display
  const formatDate = (date) => {
    return {
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      month: date.toLocaleDateString('en-US', { month: 'short' })
    };
  };

  // Get available dates (next 14 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (you can modify this as needed)
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  // Available time slots based on selected date
  const getTimeSlots = () => {
    const slots = [];
    const currentDate = new Date();
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
    const isToday = selectedDateObj?.toDateString() === currentDate.toDateString();
    const currentHour = currentDate.getHours();

    // Time slots from 9 AM to 6 PM
    for (let hour = 9; hour <= 18; hour++) {
      // Skip past times for today
      if (isToday && hour <= currentHour) continue;

      const time = hour < 12 
        ? `${hour}:00 AM` 
        : `${hour === 12 ? 12 : hour - 12}:00 PM`;
      
      slots.push({
        time,
        available: true // You can add availability logic here
      });
    }

    return slots;
  };

  // Rest of your functions
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleHoursChange = (value) => {
    const newHours = Math.max(1, Math.min(8, value));
    setHours(newHours);
    setTotalPrice(newHours * (worker?.price || 0));
  };

  // Add this function to handle worker availability updates
  const updateWorkerAvailability = (workerId, date, time, hours) => {
    try {
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const bill = calculateBill();
      
      // Capture all worker and booking details at the time of booking
      const newBooking = {
        bookingId: `booking-${Date.now()}`,
        // Worker details
        workerId: worker.id,
        workerName: worker.name,
        workerDepartment: worker.department || worker.category, // Department/Category
        workerImage: worker.image,
        workerRating: worker.rating,
        workerLocation: worker.location,
        
        // Service details
        serviceType: worker.serviceType || worker.category,
        
        // Booking details
        date: selectedDate,
        time: selectedTime,
        hours: hours,
        
        // Price details (from booking calculation)
        basePrice: bill.basePrice,
        platformFee: bill.platformFee,
        tax: bill.tax,
        tipAmount: bill.tipAmount,
        totalPrice: bill.total,
        
        // Booking metadata
        timestamp: new Date().toISOString(),
        status: 'scheduled'
      };
      
      existingBookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
    } catch (error) {
      console.error('Error saving booking:', error);
      throw new Error('Failed to save booking');
    }
  };

  const handleBooking = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const bookingDetails = {
        workerId: worker.id,
        workerName: worker.name,
        date: selectedDate,
        time: selectedTime,
        hours: hours,
        totalPrice: calculateBill().total,
      };

      // Show confirmation animation
      setShowConfirmation(true);

      // Simulate API call to update worker availability
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Update worker availability
      updateWorkerAvailability(worker.id, selectedDate, selectedTime, hours);

      setBookingComplete(true);
    } catch (err) {
      setError('Failed to complete booking. Please try again.');
      setShowConfirmation(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display in billing
  const formatDateForBilling = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to check if a date is selected
  const isDateSelected = (dateToCheck) => {
    if (!selectedDate || !dateToCheck) return false;
    return new Date(selectedDate).toDateString() === dateToCheck.toDateString();
  };

  // Calculate fees and total
  const calculateBill = () => {
    const basePrice = worker.price * hours;
    const platformFee = Math.round(basePrice * 0.05); // 5% platform fee
    const tax = Math.round(basePrice * 0.18); // 18% GST
    const tipAmount = Math.round(basePrice * (tipPercentage / 100));
    const total = basePrice + platformFee + tax + tipAmount;
    
    return {
      basePrice,
      platformFee,
      tax,
      tipAmount,
      total
    };
  };

  const handleTipSelect = (percentage) => {
    setTipPercentage(percentage);
  };

  const handleConfirmationComplete = () => {
    // Add a small delay for the success animation to complete
    setTimeout(() => {
      navigate('/find-craftsman', { 
        state: { 
          bookingSuccess: true,
          message: `Successfully booked ${worker.name} for ${formatDateForBilling(selectedDate)} at ${selectedTime}` 
        }
      });
    }, 3000);
  };

  // Check availability before allowing booking
  const isTimeSlotAvailable = () => {
    if (!selectedDate || !selectedTime) return false;
    return checkAvailability(worker.id, selectedDate, selectedTime);
  };

  if (!worker) {
    return (
      <div className="booking-page">
        <div className="error-message">
          No worker selected. Please select a worker first.
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {error && <div className="error-message">{error}</div>}
      <div className="booking-container">
        <div className="worker-profile">
          <img src={worker.image} alt={worker.name} className="worker-image" />
          <div className="worker-info">
            <h2>{worker.name}</h2>
            <div className="rating">
              <FaStar className="star-icon" />
              <span>{worker.rating}</span>
              <span className="reviews">({worker.reviews} reviews)</span>
            </div>
            <p className="experience"><FaTools /> {worker.experience} experience</p>
            <p className="location"><FaMapMarkerAlt /> {worker.location}</p>
            <div className="skills">
              {worker.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-section">
          <h3>Select Date</h3>
          <div className="date-selector">
            {getAvailableDates().map((date, index) => {
              const formattedDate = formatDate(date);
              return (
                <button
                  key={index}
                  className={`date-button ${isDateSelected(date) ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(date.toISOString())}
                >
                  <div className="date-content">
                    <span className="weekday">{formattedDate.weekday}</span>
                    <span className="day">{formattedDate.day}</span>
                    <span className="month">{formattedDate.month}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <>
              <h3>Select Time</h3>
              <div className="time-selector">
                {getTimeSlots().map((slot, index) => (
                  <button
                    key={index}
                    className={`time-button ${selectedTime === slot.time ? 'selected' : ''} 
                      ${!slot.available ? 'unavailable' : ''}`}
                    onClick={() => handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                  >
                    <FaClock className="time-icon" />
                    <span>{slot.time}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="hours-selector">
            <h3>Number of Hours</h3>
            <div className="hours-input">
              <button 
                onClick={() => handleHoursChange(hours - 1)}
                disabled={hours <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={hours}
                onChange={(e) => handleHoursChange(parseInt(e.target.value))}
                min="1"
                max="8"
              />
              <button 
                onClick={() => handleHoursChange(hours + 1)}
                disabled={hours >= 8}
              >
                +
              </button>
            </div>
          </div>

          <div className="price-calculator">
            <div className="booking-details">
              {selectedDate && (
                <div className="booking-detail-item">
                  <span>Date:</span>
                  <span>{formatDateForBilling(selectedDate)}</span>
                </div>
              )}
              {selectedTime && (
                <div className="booking-detail-item">
                  <span>Time:</span>
                  <span>{selectedTime}</span>
                </div>
              )}
            </div>

            <div className="price-breakdown">
              <div className="price-details">
                <span>Rate per hour:</span>
                <span><FaRupeeSign />{worker.price}</span>
              </div>
              <div className="price-details">
                <span>Number of hours:</span>
                <span>{hours}</span>
              </div>
              <div className="price-details subtotal">
                <span>Base Price:</span>
                <span><FaRupeeSign />{calculateBill().basePrice}</span>
              </div>

              <div className="tip-section">
                <h4>Add Tip for Service Provider</h4>
                <div className="tip-options">
                  {[0, 5, 10, 15].map((percentage) => (
                    <button
                      key={percentage}
                      className={`tip-button ${tipPercentage === percentage ? 'selected' : ''}`}
                      onClick={() => handleTipSelect(percentage)}
                    >
                      {percentage === 0 ? 'No Tip' : `${percentage}%`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="fees-section">
                <div className="price-details fee">
                  <span>Platform Fee (5%):</span>
                  <span><FaRupeeSign />{calculateBill().platformFee}</span>
                </div>
                <div className="price-details fee">
                  <span>GST (18%):</span>
                  <span><FaRupeeSign />{calculateBill().tax}</span>
                </div>
                {tipPercentage > 0 && (
                  <div className="price-details fee">
                    <span>Tip ({tipPercentage}%):</span>
                    <span><FaRupeeSign />{calculateBill().tipAmount}</span>
                  </div>
                )}
              </div>

              <div className="price-details total">
                <span>Total Amount:</span>
                <span><FaRupeeSign />{calculateBill().total}</span>
              </div>
            </div>
          </div>

          <button 
            className="book-button"
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || isLoading || !isTimeSlotAvailable()}
          >
            {isLoading ? 'Processing...' : `Pay ₹${calculateBill().total}`}
          </button>

          {!isTimeSlotAvailable() && selectedDate && selectedTime && (
            <div className="error-message">
              This time slot is no longer available. Please select another time.
            </div>
          )}
        </div>
      </div>

      {showConfirmation && (
        <BookingConfirmation
          onComplete={handleConfirmationComplete}
          bookingDetails={{
            workerName: worker.name,
            date: selectedDate,
            time: selectedTime,
          }}
        />
      )}
    </div>
  );
}

export default BookingPage; 