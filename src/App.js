import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Account from './components/Account';
import Footer from './components/Footer';
import FindCraftsman from './components/FindCraftsman';
import BookingPage from './components/BookingPage';
import Bookings from './components/Bookings';
import MoreServices from './components/MoreServices';
import ServiceBooking from './components/ServiceBooking';
import { ToastContainer } from 'react-toastify';
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-craftsman" element={<FindCraftsman />} />
          <Route path="/more-services" element={<MoreServices />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/book-craftsman/:workerId" element={<BookingPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/service-booking/:serviceId" element={<ServiceBooking />} />
        </Routes>
        <Footer />
        <ToastContainer />
       
      </div>
    </Router>
  );
}

export default App; 