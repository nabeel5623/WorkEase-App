import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGasPump, FaUserMd, FaBox, FaTruck, FaHome, FaDog, FaCar, FaUtensils, 
         FaCamera, FaGraduationCap, FaBroom, FaTools, FaLeaf, FaPaintBrush } from 'react-icons/fa';
import '../styles/MoreServices.css';

function MoreServices() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Fuel Delivery",
      iconName: "FaGasPump",
      description: "Emergency fuel delivery to your location",
      price: "Service charge: ₹50",
      eta: "30-45 mins",
      category: "Emergency",
      basePrice: 50
    },
    {
      id: 2,
      name: "Doctor at Home",
      iconName: "FaUserMd",
      description: "Qualified doctors visit your home",
      price: "Starting from ₹999",
      eta: "2-3 hours",
      category: "Healthcare",
      basePrice: 999
    },
    {
      id: 3,
      name: "Courier Services",
      iconName: "FaBox",
      description: "Fast & secure delivery services",
      price: "Starting from ₹49",
      eta: "Same day delivery",
      category: "Delivery",
      basePrice: 49
    },
    {
      id: 4,
      name: "Home Shifting",
      iconName: "FaTruck",
      description: "Complete relocation solutions",
      price: "Get custom quote",
      eta: "As per schedule",
      category: "Moving",
      basePrice: 0
    },
    {
      id: 5,
      name: "Real Estate Services",
      iconName: "FaHome",
      description: "Find your perfect home",
      price: "Free consultation",
      eta: "Schedule meeting",
      category: "Property",
      basePrice: 0
    },
    {
      id: 6,
      name: "Pet Services",
      iconName: "FaDog",
      description: "Grooming, walking & pet care",
      price: "Starting from ₹299",
      eta: "Book slot",
      category: "Pets",
      basePrice: 299
    },
    {
      id: 7,
      name: "Car Wash",
      iconName: "FaCar",
      description: "Professional car cleaning",
      price: "Starting from ₹399",
      eta: "60-90 mins",
      category: "Automobile",
      basePrice: 399
    },
    {
      id: 8,
      name: "Food Delivery",
      iconName: "FaUtensils",
      description: "Local restaurants to your door",
      price: "Delivery from ₹30",
      eta: "30-45 mins",
      category: "Food",
      basePrice: 30
    },
    {
      id: 9,
      name: "Photography",
      iconName: "FaCamera",
      description: "Professional photo/video services",
      price: "Starting from ₹1999",
      eta: "Book date",
      category: "Events",
      basePrice: 1999
    },
    {
      id: 10,
      name: "Home Tutoring",
      iconName: "FaGraduationCap",
      description: "Expert tutors at your home",
      price: "From ₹299/hour",
      eta: "Schedule class",
      category: "Education",
      basePrice: 299
    },
    {
      id: 11,
      name: "Deep Cleaning",
      iconName: "FaBroom",
      description: "Complete home deep cleaning",
      price: "Starting from ₹1499",
      eta: "4-6 hours",
      category: "Cleaning",
      basePrice: 1499
    },
    {
      id: 12,
      name: "Appliance Repair",
      iconName: "FaTools",
      description: "All brand appliance repairs",
      price: "Visit charge ₹199",
      eta: "Same day",
      category: "Repairs",
      basePrice: 199
    },
    {
      id: 13,
      name: "Gardening",
      iconName: "FaLeaf",
      description: "Professional garden maintenance",
      price: "Starting from ₹599",
      eta: "Book slot",
      category: "Outdoor",
      basePrice: 599
    },
    {
      id: 14,
      name: "Interior Design",
      iconName: "FaPaintBrush",
      description: "Transform your living space",
      price: "Free consultation",
      eta: "Schedule meeting",
      category: "Home Improvement",
      basePrice: 0
    }
  ];

  const categories = ['All', ...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIconComponent = (iconName) => {
    const icons = {
      FaGasPump: <FaGasPump />,
      FaUserMd: <FaUserMd />,
      FaBox: <FaBox />,
      FaTruck: <FaTruck />,
      FaHome: <FaHome />,
      FaDog: <FaDog />,
      FaCar: <FaCar />,
      FaUtensils: <FaUtensils />,
      FaCamera: <FaCamera />,
      FaGraduationCap: <FaGraduationCap />,
      FaBroom: <FaBroom />,
      FaTools: <FaTools />,
      FaLeaf: <FaLeaf />,
      FaPaintBrush: <FaPaintBrush />
    };
    return icons[iconName];
  };

  const handleBookService = (service) => {
    const serviceData = {
      id: service.id,
      name: service.name,
      description: service.description,
      iconName: service.iconName,
      price: service.price,
      basePrice: service.basePrice,
      category: service.category
    };
    
    navigate(`/service-booking/${service.id}`, { 
      state: { service: serviceData }
    });
  };

  return (
    <div className="more-services-container">
      <h1>More Services</h1>
      
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">
              {getIconComponent(service.iconName)}
            </div>
            <h3>{service.name}</h3>
            <p className="description">{service.description}</p>
            <div className="service-details">
              <span className="price">{service.price}</span>
              <span className="eta">{service.eta}</span>
            </div>
            <button 
              className="book-service-btn"
              onClick={() => handleBookService(service)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoreServices; 