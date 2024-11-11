import { useState, useEffect } from 'react';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage when component mounts
    const loadedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(loadedBookings);
  }, []);

  const addBooking = (booking) => {
    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const checkAvailability = (workerId, date, time) => {
    const workerBookings = bookings.filter(b => b.workerId === workerId);
    const bookingDate = new Date(`${date}T${time}`);
    
    return !workerBookings.some(booking => {
      const existingBookingDate = new Date(`${booking.date}T${booking.time}`);
      const bookingEnd = new Date(existingBookingDate.getTime() + (booking.hours * 60 * 60 * 1000));
      return bookingDate >= existingBookingDate && bookingDate <= bookingEnd;
    });
  };

  return {
    bookings,
    addBooking,
    checkAvailability
  };
}; 