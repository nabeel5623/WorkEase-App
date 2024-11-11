import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">Work<span>Ease</span></h3>
          <p>Connecting skilled craftsmen with quality projects. Your trusted platform for professional home services and repairs.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/find-craftsman">Find Craftsmen</Link></li>
            <li><Link to="/become-craftsman">Become a Craftsman</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/safety">Safety Information</Link></li>
            <li><Link to="/guidelines">Community Guidelines</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>
              <i className="fas fa-phone"></i>
              <span>+91 824-2424-555</span>
            </li>
            <li>
              <i className="fas fa-mobile-alt"></i>
              <span>+91 9845-012-345</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>support@workease.com</span>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>
                3rd Floor, City Centre Mall<br />
                K.S. Rao Road, Hampankatta<br />
                Mangalore, Karnataka 575001
              </span>
            </li>
            <li>
              <i className="fas fa-clock"></i>
              <span>
                Mon - Sat: 9:30 AM - 6:30 PM<br />
                Sunday: Closed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} WorkEase. All rights reserved.</p>
          <p className="footer-tagline">Crafted with <span className="heart">❤️</span> for craftsmen worldwide</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 