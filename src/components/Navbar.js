import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome,
  FaSearch,
  FaTools,
  FaEnvelope,
  FaUser,
  FaEllipsisH
} from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo-text">
            Work<span>Ease</span>
          </Link>
        </div>

        <div className="nav-right">
          <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <FaHome className="nav-icon" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/find-craftsman" 
                className={`nav-item ${location.pathname === '/find-craftsman' ? 'active' : ''}`}
              >
                <FaSearch className="nav-icon" />
                <span>Find Craftsman</span>
              </Link>
            </li>
            <li>
              <Link to="/more-services" className={`nav-item ${location.pathname === '/more-services' ? 'active' : ''}`}>
                <FaTools className="nav-icon" />
                <span>More Services <FaEllipsisH /></span>
              </Link>
            </li>
            <li>
              <Link to="/bookings" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                <FaEnvelope className="nav-icon" />
                <span>My Bookings</span>
              </Link>
            </li>
            <li>
              <Link to="/account" className="account-button">
                <FaUser className="nav-icon" />
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar; 