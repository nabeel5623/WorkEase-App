import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaUserAlt, 
         FaPhoneAlt, FaCreditCard, FaShieldAlt, FaGasPump, FaUserMd, 
         FaBox, FaTruck, FaHome, FaDog, FaCar, FaUtensils, FaCamera, 
         FaGraduationCap, FaBroom, FaTools, FaLeaf, FaPaintBrush } from 'react-icons/fa';
import LoadingAnimation from './LoadingAnimation';
import '../styles/ServiceBooking.css';

function ServiceBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    address: '',
    specialRequirements: ''
  });

  if (!service) {
    navigate('/more-services');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalAmount = (basePrice) => {
    const serviceFee = basePrice * 0.1;
    const tax = (basePrice + serviceFee) * 0.18;
    return basePrice + serviceFee + tax;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const booking = {
        id: `booking-${Date.now()}`,
        service: {
          id: service.id,
          name: service.name,
          iconName: service.iconName,
          category: service.category,
          price: service.basePrice
        },
        bookingDetails: {
          ...formData,
          status: 'confirmed',
          bookingDate: new Date().toISOString(),
          totalAmount: calculateTotalAmount(service.basePrice)
        }
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));

      toast.success('Booking confirmed successfully!');
      navigate('/bookings');
    } catch (error) {
      toast.error('Failed to process booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName) => {
    const icons = {
      FaGasPump: <FaGasPump className="service-icon-svg" />,
      FaUserMd: <FaUserMd className="service-icon-svg" />,
      FaBox: <FaBox className="service-icon-svg" />,
      FaTruck: <FaTruck className="service-icon-svg" />,
      FaHome: <FaHome className="service-icon-svg" />,
      FaDog: <FaDog className="service-icon-svg" />,
      FaCar: <FaCar className="service-icon-svg" />,
      FaUtensils: <FaUtensils className="service-icon-svg" />,
      FaCamera: <FaCamera className="service-icon-svg" />,
      FaGraduationCap: <FaGraduationCap className="service-icon-svg" />,
      FaBroom: <FaBroom className="service-icon-svg" />,
      FaTools: <FaTools className="service-icon-svg" />,
      FaLeaf: <FaLeaf className="service-icon-svg" />,
      FaPaintBrush: <FaPaintBrush className="service-icon-svg" />
    };
    return icons[iconName] || <FaHome className="service-icon-svg" />;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 20; i++) {
      const hour = i.toString().padStart(2, '0');
      slots.push(`${hour}:00`);
      if (i < 20) slots.push(`${hour}:30`);
    }
    return slots;
  };

  const renderServiceSpecificFields = () => {
    switch (service?.name) {
      case "Fuel Delivery":
        return (
          <div className="service-specific-fields">
            <h3>Fuel Details</h3>
            <div className="form-group">
              <select 
                className="form-input"
                name="fuelType"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
              </select>
              <input
                type="number"
                className="form-input"
                name="quantity"
                placeholder="Quantity (Liters)"
                min="1"
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="text"
              className="form-input"
              name="vehicleNumber"
              placeholder="Vehicle Number"
              onChange={handleInputChange}
              required
            />
          </div>
        );

      // ... other cases remain the same ...

      default:
        return (
          <div className="service-specific-fields">
            <h3>Service Details</h3>
            <textarea
              className="form-input"
              name="specialRequirements"
              placeholder="Describe your requirements"
              rows="3"
              onChange={handleInputChange}
            />
          </div>
        );
    }
  };

  return (
    <div className="service-booking-container">
      {loading && <LoadingAnimation />}
      
      <button className="back-button" onClick={() => navigate('/more-services')}>
        <FaArrowLeft /> Back to Services
      </button>

      <div className="service-booking-content">
        <div className="service-header">
          <div className="service-icon">
            {service?.iconName && getIconComponent(service.iconName)}
          </div>
          <h2>{service?.name}</h2>
          <p className="service-description">{service?.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-section">
            <h3>
              <FaCalendarAlt />
              Schedule
            </h3>
            <div className="form-group">
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="date"
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="input-with-icon">
                <FaClock className="input-icon" />
                <select
                  name="time"
                  className="form-input"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Time</option>
                  {generateTimeSlots().map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {renderServiceSpecificFields()}

          <div className="form-section">
            <h3>
              <FaUserAlt />
              Contact Details
            </h3>
            <div className="form-group">
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-with-icon">
                <FaPhoneAlt className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="input-with-icon">
              <FaMapMarkerAlt className="input-icon" />
              <textarea
                name="address"
                className="form-input"
                placeholder="Service Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="price-summary">
            <div className="price-item">
              <span>Service Charge</span>
              <span>₹{service?.basePrice || 0}</span>
            </div>
            <div className="price-item">
              <span>Service Fee (10%)</span>
              <span>₹{(service?.basePrice * 0.1) || 0}</span>
            </div>
            <div className="price-item">
              <span>GST (18%)</span>
              <span>₹{(service?.basePrice * 0.18) || 0}</span>
            </div>
            <div className="price-item total">
              <span>Total Amount</span>
              <span>₹{parseFloat(calculateTotalAmount(service?.basePrice || 0)).toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="confirm-booking-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceBooking;