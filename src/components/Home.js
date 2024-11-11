import { Link } from 'react-router-dom';
import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaMapMarkerAlt, FaTools, FaClock, FaUser, FaPhone, FaStar, FaNewspaper, FaArrowRight, FaChevronLeft, FaChevronRight, FaTimes, FaHeart, FaReply, FaEllipsisV, FaEdit, FaTrash, FaFlag } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



// Add this component before your hero section
const NewsTicker = () => {
  const [showAll, setShowAll] = useState(false);

  
  const newsItems = [
    {
      category: "TECHNOLOGY",
      title: "AI-Enhanced Tools Transform Traditional Craftsmanship",
      content: "Smart tools with real-time feedback improve accuracy by 35%",
      time: "2 hours ago",
      tag: "Featured"
    },
    {
      category: "BUSINESS",
      title: "Local Artisans See Record Growth Through Digital Platform",
      content: "Mobile bookings increase revenue by 50% for skilled craftsmen",
      time: "4 hours ago",
      tag: "Trending"
    },
    {
      category: "EDUCATION",
      title: "New Craftsman Training Program Launches in Mangalore",
      content: "₹2 Crore initiative to train next generation of skilled artisans",
      time: "Today, 10:30 AM",
      tag: "Latest"
    },
    {
      category: "INNOVATION",
      title: "Smart Workshops Reduce Service Time by 40%",
      content: "IoT-enabled tools revolutionize traditional work methods",
      time: "Today, 12:45 PM",
      tag: "Tech"
    },
    // Hidden by default
    {
      category: "AWARDS",
      title: "Karnataka Craftsmen Win National Recognition",
      content: "Three local artisans honored for excellence in traditional crafts",
      time: "Yesterday",
      tag: "Achievement"
    },
    {
      category: "MARKET",
      title: "Construction Sector Sees Surge in Skilled Labor Demand",
      content: "25% increase in demand for certified craftsmen",
      time: "2 days ago",
      tag: "Industry"
    },
    {
      category: "SUSTAINABILITY",
      title: "Eco-Friendly Construction Methods Drive Growth",
      content: "Green building practices create new opportunities",
      time: "2 days ago",
      tag: "Environment"
    },
    {
      category: "DIGITAL",
      title: "Mobile Platform Connects 1000+ Local Artisans",
      content: "Tech startup revolutionizes craftsman booking system",
      time: "3 days ago",
      tag: "Technology"
    }
  ];

  const displayedNews = showAll ? newsItems : newsItems.slice(0, 4);

  return (
    <section className="news-section">
      <div className="news-container">
        <div className="news-header">
          <div className="news-title">
            <FaNewspaper className="news-icon" />
            <h2>Latest in WorkEase</h2>
          </div>
          <button 
            className={`view-all-btn ${showAll ? 'active' : ''}`}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <FaTimes /> Show Less
              </>
            ) : (
              <>
                View All <FaArrowRight />
              </>
            )}
          </button>
        </div>

        <div className={`news-grid ${showAll ? 'expanded' : ''}`}>
          {displayedNews.map((news, index) => (
            <div 
              key={index} 
              className="news-card"
              style={{ '--index': index }}
            >
              <div className="card-header">
                <span className="news-category">{news.category}</span>
                <span className={`news-tag ${news.tag.toLowerCase()}`}>
                  {news.tag}
                </span>
              </div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-content">{news.content}</p>
              <div className="card-footer">
                <span className="news-time">
                  <FaClock /> {news.time}
                </span>
                <button className="read-more">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function Home() {
  const [isDialing, setIsDialing] = useState(false);
  const [callStatus, setCallStatus] = useState('dialing'); // 'dialing', 'failed'
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "PS",
      text: "Excellent plumbing service! The craftsman was professional and fixed the issue quickly. Very satisfied with WorkEase.",
      likes: 24,
      time: "2 days ago",
      isLiked: false,
      isCustomer: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      avatar: "RK",
      text: "As a craftsman on WorkEase, I love the flexibility and support they provide. Great platform for skilled professionals!",
      likes: 18,
      time: "3 days ago",
      isLiked: false,
      isCustomer: false
    },
    {
      id: 3,
      name: "Sarah Wilson",
      avatar: "SW",
      text: "The electrician was punctual and very knowledgeable. Fixed my wiring issues efficiently. Highly recommend!",
      likes: 31,
      time: "1 week ago",
      isLiked: false,
      isCustomer: true
    },
    {
      id: 4,
      name: "Mohammed Ali",
      avatar: "MA",
      text: "Being part of WorkEase has helped me grow my business. The platform is user-friendly and clients are great!",
      likes: 27,
      time: "5 days ago",
      isLiked: false,
      isCustomer: false
    },
    {
      id: 5,
      name: "Anita Desai",
      avatar: "AD",
      text: "Outstanding painting service! The team was professional and the results exceeded my expectations.",
      likes: 22,
      time: "1 day ago",
      isLiked: false,
      isCustomer: true
    },
    {
      id: 6,
      name: "David Chen",
      avatar: "DC",
      text: "The carpenter did an amazing job with my furniture repair. Very skilled and reasonable pricing.",
      likes: 19,
      time: "4 days ago",
      isLiked: false,
      isCustomer: true
    },
    {
      id: 7,
      name: "Suresh Patel",
      avatar: "SP",
      text: "WorkEase provides great opportunities for skilled craftsmen. The platform is reliable and payments are always on time.",
      likes: 25,
      time: "6 days ago",
      isLiked: false,
      isCustomer: false
    }
  ]);

  const additionalJobs = [
    {
      icon: "🏠",
      title: "Carpenter",
      experience: "4+ Years",
      location: "Mangalore",
      type: "Full-time",
      description: "Specialized in custom furniture and interior woodwork",
      requirements: [
        "Experience with modern woodworking tools",
        "Custom furniture design skills",
        "₹30,000 - ₹40,000/month"
      ]
    },
    {
      icon: "🎨",
      title: "Wall Texture Artist",
      experience: "3+ Years",
      location: "Mangalore",
      type: "Contract",
      description: "Create unique wall textures and decorative finishes",
      requirements: [
        "Portfolio of texture work",
        "Knowledge of modern finishes",
        "₹35,000 - ₹45,000/month"
      ]
    },
    {
      icon: "🛠️",
      title: "HVAC Technician",
      experience: "5+ Years",
      location: "Mangalore",
      type: "Full-time",
      description: "Installation and maintenance of HVAC systems",
      requirements: [
        "HVAC certification required",
        "Troubleshooting expertise",
        "₹40,000 - ₹50,000/month"
      ]
    },
    {
      icon: "🏗️",
      title: "Civil Engineer",
      experience: "6+ Years",
      location: "Mangalore",
      type: "Full-time",
      description: "Oversee construction projects and quality control",
      requirements: [
        "B.E. in Civil Engineering",
        "Project management experience",
        "₹50,000 - ₹65,000/month"
      ]
    },
    {
      icon: "🔧",
      title: "Maintenance Supervisor",
      experience: "8+ Years",
      location: "Mangalore",
      type: "Full-time",
      description: "Lead maintenance team for commercial properties",
      requirements: [
        "Multi-skill technical background",
        "Team management experience",
        "₹45,000 - ₹55,000/month"
      ]
    },
    {
      icon: "⚡",
      title: "Solar Panel Installer",
      experience: "3+ Years",
      location: "Mangalore",
      type: "Contract",
      description: "Installation and maintenance of solar power systems",
      requirements: [
        "Solar installation certification",
        "Height work experience",
        "₹30,000 - ₹40,000/month"
      ]
    },
    {
      icon: "🎨",
      title: "3D Interior Visualizer",
      experience: "4+ Years",
      location: "Mangalore",
      type: "Remote",
      description: "Create 3D visualizations for interior projects",
      requirements: [
        "3D modeling expertise",
        "Interior design knowledge",
        "₹40,000 - ₹50,000/month"
      ]
    },
    {
      icon: "🏠",
      title: "Renovation Specialist",
      experience: "7+ Years",
      location: "Mangalore",
      type: "Full-time",
      description: "Lead home renovation and remodeling projects",
      requirements: [
        "Multi-trade experience",
        "Project coordination skills",
        "₹45,000 - ₹60,000/month"
      ]
    }
  ];

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const [showOptions, setShowOptions] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOptions && !event.target.closest('.comment-options')) {
        setShowOptions(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showOptions]);

  const handleCall = () => {
    setIsDialing(true);
    setCallStatus('dialing');
    
    // Simulate call end after 5 seconds
    setTimeout(() => {
      setCallStatus('failed');
      // Auto close after showing message for 2 seconds
      setTimeout(() => {
        setIsDialing(false);
        setCallStatus('dialing');
      }, 2000);
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        setShowSuccess(false);
        setShowApplicationForm(false);
      }, 3000);
    }, 1500);
  };

  const handleLike = (id) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      name: "Guest User",
      avatar: "GU",
      text: newComment,
      likes: 0,
      time: "Just now",
      isLiked: false,
      isCustomer: true,
      badge: "Customer"
    };

    setComments(prevComments => [newCommentObj, ...prevComments]);
    setNewComment('');
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, text: editText };
      }
      return comment;
    }));
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  const handleReport = (id) => {
    alert('Comment has been reported to moderators.');
  };

  // Add this array of random comments
  const randomComments = [
    {
      name: "Arun Kumar",
      avatar: "AK",
      text: "Just had my AC serviced through WorkEase. The technician was excellent! Quick and professional service.",
      isCustomer: true
    },
    {
      name: "Maya Patel",
      avatar: "MP",
      text: "As a carpenter on WorkEase, I'm getting great projects. The platform really helps skilled professionals.",
      isCustomer: false
    },
    {
      name: "Lisa Chen",
      avatar: "LC",
      text: "The plumbing work was done perfectly. Very happy with the service and reasonable pricing!",
      isCustomer: true
    },
    {
      name: "Rahul Sharma",
      avatar: "RS",
      text: "Being an electrician on WorkEase has helped me expand my client base significantly.",
      isCustomer: false
    },
    {
      name: "Sneha Verma",
      avatar: "SV",
      text: "Excellent painting service! The team was professional and completed the work on time.",
      isCustomer: true
    },
    {
      name: "James Wilson",
      avatar: "JW",
      text: "The home cleaning service was thorough. Will definitely book again through WorkEase.",
      isCustomer: true
    },
    {
      name: "Karthik R",
      avatar: "KR",
      text: "Great platform for professionals. The payment system is reliable and support is excellent.",
      isCustomer: false
    },
    {
      name: "Zara Ahmed",
      avatar: "ZA",
      text: "Had my kitchen renovated through WorkEase. Amazing craftsmanship and attention to detail!",
      isCustomer: true
    }
  ];

  // Add this useEffect for auto-updating comments
  useEffect(() => {
    const addRandomComment = () => {
      const randomComment = randomComments[Math.floor(Math.random() * randomComments.length)];
      const newComment = {
        id: Date.now(),
        name: randomComment.name,
        avatar: randomComment.avatar,
        text: randomComment.text,
        likes: Math.floor(Math.random() * 20),
        time: "Just now",
        isLiked: false,
        isCustomer: randomComment.isCustomer
      };

      setComments(prevComments => {
        const updatedComments = [newComment, ...prevComments];
        // Keep only the latest 10 comments to prevent the list from getting too long
        return updatedComments.slice(0, 10);
      });
    };

    // Random interval between 10-15 seconds
    const getRandomInterval = () => Math.floor(Math.random() * (15000 - 10000) + 10000);

    let interval;
    const updateInterval = () => {
      addRandomComment();
      // Set next random interval
      interval = setTimeout(updateInterval, getRandomInterval());
    };

    // Start the first interval
    interval = setTimeout(updateInterval, getRandomInterval());

    // Cleanup
    return () => clearTimeout(interval);
  }, []);

  // Add animation for new comments
  const commentAppearAnimation = `
    @keyframes slideInNew {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <div className="home">
      <NewsTicker />
      <main className="main-content">
        <section className="hero">
          <h2>Find Skilled Craftsmen for Your Projects</h2>
          <p>Connect with professional craftsmen in your area for quality work</p>
          <Link to="/find-craftsman" className="cta-button">
            Find a Craftsman
          </Link>
        </section>

        <section className="tracking-section">
          <div className="tracking-container">
            <h2 className="tracking-title">Live Service Tracking</h2>
            <p className="tracking-subtitle">Real-time updates on your service request</p>

            <div className="tracking-content">
              {/* Map Container */}
              <div className="map-wrapper">
                <MapContainer
                  center={[12.8742, 74.8554]} // Mangalore coordinates
                  zoom={13}
                  className="service-map"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <Marker position={[12.8742, 74.8554]}>
                    <Popup>
                      Craftsman's Location
                    </Popup>
                  </Marker>
                </MapContainer>

                <div className="location-info">
                  <FaMapMarkerAlt />
                  <span>Mangalore, Karnataka</span>
                </div>
              </div>

              {/* Tracking Info */}
              <div className="tracking-info">
                <div className="service-status">
                  <div className="status-header">
                    <h3>Service #MNG2024</h3>
                    <span className="status-badge">
                      <span className="pulse"></span>
                      In Progress
                    </span>
                  </div>

                  <div className="craftsman-info">
                    <div className="craftsman-profile">
                      <div className="profile-image">
                        <FaUser />
                      </div>
                      <div className="profile-details">
                        <h4>Rajesh Kumar</h4>
                        <p>Expert Electrician</p>
                        <div className="rating">
                          <FaStar />
                          <span>4.9</span>
                          <small>(238 jobs)</small>
                        </div>
                      </div>
                    </div>
                    <button className="contact-btn" onClick={handleCall}>
                      <FaPhone /> Contact
                    </button>
                  </div>

                  <div className="progress-timeline">
                    <div className="timeline-item completed">
                      <div className="timeline-point"></div>
                      <div className="timeline-content">
                        <h4>Request Accepted</h4>
                        <p>10:30 AM</p>
                      </div>
                    </div>
                    <div className="timeline-item completed">
                      <div className="timeline-point"></div>
                      <div className="timeline-content">
                        <h4>On the Way</h4>
                        <p>10:45 AM</p>
                      </div>
                    </div>
                    <div className="timeline-item active">
                      <div className="timeline-point"></div>
                      <div className="timeline-content">
                        <h4>Near Location</h4>
                        <p>Expected in 5 mins</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-point"></div>
                      <div className="timeline-content">
                        <h4>Service Complete</h4>
                        <p>Pending</p>
                      </div>
                    </div>
                  </div>

                  <div className="live-updates">
                    <h4>Live Updates</h4>
                    <div className="updates-list">
                      <div className="update-item">
                        <FaClock />
                        <p>Craftsman is 0.5 km away from your location</p>
                        <span>Just now</span>
                      </div>
                      <div className="update-item">
                        <FaTools />
                        <p>All required tools and equipment confirmed</p>
                        <span>2 mins ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call Overlay */}
        {isDialing && (
          <div className="call-overlay">
            <div className="call-container">
              <div className="caller-info">
                <div className="caller-avatar">
                  <FaUser className="avatar-icon" />
                </div>
                <h3>Rajesh Kumar</h3>
                <p className="profession">Expert Electrician</p>
                
                {callStatus === 'dialing' ? (
                  <p className="call-status">Calling...</p>
                ) : (
                  <p className="call-status failed">
                    Craftsman is busy<br />
                    Will be available shortly. Hold tight!
                  </p>
                )}
              </div>

              <div className="dialer-animation">
                {callStatus === 'dialing' && (
                  <>
                    <div className="ring-animation">
                      <div className="ring"></div>
                      <div className="ring"></div>
                      <div className="ring"></div>
                    </div>
                    <div className="connecting-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </>
                )}
              </div>

              <button 
                className="end-call-btn"
                onClick={() => setIsDialing(false)}
              >
                <FaPhone className="phone-icon" />
              </button>
            </div>
          </div>
        )}

        {/* Careers Section */}
        <section className="careers-section">
          <div className="careers-container">
            <div className="careers-header">
              <h2>Join <span className="brand-text">Work<span className="brand-highlight">Ease</span></span>: Empowering Skilled Craftsmen</h2>
              <p>Be part of our growing network of professional craftsmen</p>
            </div>

            <div className="careers-grid">
              <div className="career-card">
                <div className="career-icon">👨‍🔧</div>
                <h3>Senior Plumber</h3>
                <div className="career-tags">
                  <span className="experience">5+ Years</span>
                  <span className="location">Mangalore</span>
                  <span className="type">Full-time</span>
                </div>
                <p>Lead plumbing projects and mentor junior team members</p>
                <ul className="requirements">
                  <li>Professional certification required</li>
                  <li>Team management experience</li>
                  <li>₹35,000 - ₹45,000/month</li>
                </ul>
                <button 
                  className="apply-btn"
                  onClick={() => {
                    setSelectedJob(additionalJobs[0]);
                    setShowApplicationForm(true);
                  }}
                >
                  Apply Now
                </button>
              </div>

              <div className="career-card">
                <div className="career-icon">⚡</div>
                <h3>Electrician</h3>
                <div className="career-tags">
                  <span className="experience">3+ Years</span>
                  <span className="location">Mangalore</span>
                  <span className="type">Full-time</span>
                </div>
                <p>Handle residential and commercial electrical projects</p>
                <ul className="requirements">
                  <li>ITI certification required</li>
                  <li>Safety protocol expertise</li>
                  <li>₹25,000 - ₹35,000/month</li>
                </ul>
                <button 
                  className="apply-btn"
                  onClick={() => {
                    setSelectedJob(additionalJobs[1]);
                    setShowApplicationForm(true);
                  }}
                >
                  Apply Now
                </button>
              </div>

              <div className="career-card">
                <div className="career-icon">🏗</div>
                <h3>Construction Supervisor</h3>
                <div className="career-tags">
                  <span className="experience">7+ Years</span>
                  <span className="location">Mangalore</span>
                  <span className="type">Full-time</span>
                </div>
                <p>Oversee construction projects and team coordination</p>
                <ul className="requirements">
                  <li>Civil engineering background</li>
                  <li>Project management skills</li>
                  <li>₹45,000 - ₹60,000/month</li>
                </ul>
                <button 
                  className="apply-btn"
                  onClick={() => {
                    setSelectedJob(additionalJobs[2]);
                    setShowApplicationForm(true);
                  }}
                >
                  Apply Now
                </button>
              </div>

              <div className="career-card featured">
                <div className="featured-tag">Featured</div>
                <div className="career-icon">🎨</div>
                <h3>Interior Designer</h3>
                <div className="career-tags">
                  <span className="experience">4+ Years</span>
                  <span className="location">Mangalore</span>
                  <span className="type">Full-time</span>
                </div>
                <p>Create innovative interior design solutions</p>
                <ul className="requirements">
                  <li>Design degree required</li>
                  <li>Portfolio showcase</li>
                  <li>₹40,000 - ₹55,000/month</li>
                </ul>
                <button 
                  className="apply-btn"
                  onClick={() => {
                    setSelectedJob(additionalJobs[3]);
                    setShowApplicationForm(true);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div className="careers-footer">
              <div className="benefits">
                <h3>Why Join Us?</h3>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span>🌟</span>
                    <p>Career Growth</p>
                  </div>
                  <div className="benefit-item">
                    <span>🏥</span>
                    <p>Health Insurance</p>
                  </div>
                  <div className="benefit-item">
                    <span>📱</span>
                    <p>Tool Allowance</p>
                  </div>
                  <div className="benefit-item">
                    <span>💰</span>
                    <p>Performance Bonus</p>
                  </div>
                </div>
              </div>
              <button 
                className="view-all-positions"
                onClick={() => setShowAllJobs(true)}
              >
                View All Positions
              </button>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="comments-section">
          <div className="comments-container">
            <div className="comments-header">
              <h2>Customer & Craftsman Reviews</h2>
              <p>Join the conversation and share your experience</p>
            </div>

            <div className="comment-form">
              <div className="user-avatar">
                <FaUser />
              </div>
              <form onSubmit={handleSubmitComment}>
                <input
                  type="text"
                  placeholder="Share your experience with WorkEase..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
                <button type="submit">Post Comment</button>
              </form>
            </div>

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  <div className="comment-header">
                    <div className="user-info">
                      <div className="avatar" style={{ backgroundColor: comment.isCustomer ? '#3b82f6' : '#10b981' }}>
                        {comment.avatar}
                      </div>
                      <div className="user-details">
                        <h4>{comment.name}</h4>
                        <span className="badge">{comment.isCustomer ? 'Customer' : 'Craftsman'}</span>
                        <span className="time">{comment.time}</span>
                      </div>
                    </div>
                    <div className="comment-options">
                      <button 
                        className="options-btn"
                        onClick={() => setShowOptions(comment.id)}
                      >
                        <FaEllipsisV />
                      </button>
                      {showOptions === comment.id && (
                        <div className="options-menu">
                          <button onClick={() => handleEdit(comment.id, comment.text)}>
                            <FaEdit /> Edit
                          </button>
                          <button onClick={() => handleDelete(comment.id)}>
                            <FaTrash /> Delete
                          </button>
                          <button onClick={() => handleReport(comment.id)}>
                            <FaFlag /> Report
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {editingId === comment.id ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <p className="comment-text">{comment.text}</p>
                  )}
                  
                  <div className="comment-actions">
                    <button 
                      className={`like-btn ${comment.isLiked ? 'liked' : ''}`}
                      onClick={() => handleLike(comment.id)}
                    >
                      <FaHeart /> {comment.likes}
                    </button>
                    <button className="reply-btn">
                      <FaReply /> Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Add this modal for additional jobs */}
      {showAllJobs && (
        <div className="jobs-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>All Available Positions</h2>
              <button 
                className="close-modal"
                onClick={() => setShowAllJobs(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-jobs-grid">
              {additionalJobs.map((job, index) => (
                <div key={index} className="career-card" style={{'--index': index}}>
                  <div className="career-icon">{job.icon}</div>
                  <h3>{job.title}</h3>
                  <div className="career-tags">
                    <span className="experience">{job.experience}</span>
                    <span className="location">{job.location}</span>
                    <span className="type">{job.type}</span>
                  </div>
                  <p>{job.description}</p>
                  <ul className="requirements">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                  <button 
                    className="apply-btn"
                    onClick={() => {
                      setSelectedJob(job);
                      setShowApplicationForm(true);
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add this application form modal */}
      {showApplicationForm && (
        <div className="application-modal">
          <div className="application-content">
            <div className="application-header">
              <h2>Apply for {selectedJob.title}</h2>
              <button 
                className="close-modal"
                onClick={() => setShowApplicationForm(false)}
              >
                ×
              </button>
            </div>

            <form className="application-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Years of Experience *</label>
                  <input 
                    type="number" 
                    required 
                    min="0"
                    placeholder="Years of experience"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Current Location *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="City, State"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Expected Salary (Monthly)</label>
                  <input 
                    type="text" 
                    placeholder="Expected salary in ₹"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Skills & Certifications *</label>
                  <textarea 
                    required 
                    placeholder="List your relevant skills and certifications"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group full-width">
                  <label>Work Experience *</label>
                  <textarea 
                    required 
                    placeholder="Describe your relevant work experience"
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-group full-width">
                  <label>Resume/CV *</label>
                  <div className="file-input">
                    <input 
                      type="file" 
                      required 
                      accept=".pdf,.doc,.docx"
                    />
                    <p className="file-help">PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                </div>
              </div>

              <div className="form-footer">
               
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </div>
            </form>

            {isSubmitting && (
              <div className="submission-overlay">
                <div className="loading-spinner"></div>
                <p>Submitting your application...</p>
              </div>
            )}

            {showSuccess && (
              <div className="success-overlay">
                <div className="success-animation">
                  <div className="checkmark">
                    <div className="check-line line-tip"></div>
                    <div className="check-line line-long"></div>
                  </div>
                </div>
                <h3>Application Submitted!</h3>
                <p>We hope you find a place in <span className="brand-text">Work<span className="brand-highlight">Ease</span></span></p>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Home; 