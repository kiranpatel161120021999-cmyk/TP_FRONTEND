import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Training.css';

// Legacy Mock Data for Programming Modules
const MOCK_MODULES = [
  {
    _id: "m1",
    title: "C & C++ Masterclass",
    subject: "C & C++",
    duration: "10 Weeks",
    price: "₹4,999",
    description: "Complete A-Z Training from basic syntax to advanced pointers and data structures. Teaches all core concepts for competitive programming.",
    level: "Beginner"
  },
  {
    _id: "m2",
    title: "Java Full Stack Development",
    subject: "Java",
    duration: "12 Weeks",
    price: "₹9,440",
    description: "Comprehensive bootcamp covering Core Java, Spring Boot, Hibernate, and Microservices. A complete hero-to-pro journey.",
    level: "Intermediate"
  },
  {
    _id: "m3",
    title: "Full Stack Web Mastery",
    subject: "React",
    duration: "14 Weeks",
    price: "₹12,500",
    description: "Teaches all modern web technologies: React, Node.js, Express, and MongoDB. Build and deploy 5+ industry-level projects.",
    level: "Advanced"
  },
  {
    _id: "m4",
    title: "Python for AI & Data Science",
    subject: "Python",
    duration: "12 Weeks",
    price: "₹8,999",
    description: "From basic Python to Machine Learning and AI. Teaches all industry libraries including NumPy, Pandas, and Scikit-learn.",
    level: "Intermediate"
  },
  {
    _id: "m5",
    title: "Cloud Computing with AWS",
    subject: "Cloud",
    duration: "8 Weeks",
    price: "₹15,000",
    description: "Get certified in AWS Cloud Architecture. This course teaches all essential AWS services for modern DevOps workflows.",
    level: "Advanced"
  },
  {
    _id: "m6",
    title: "Mobile App Development",
    subject: "Mobile",
    duration: "10 Weeks",
    price: "₹11,000",
    description: "Master Flutter and Dart to build cross-platform apps. Complete training for both Android and iOS markets.",
    level: "Intermediate"
  },
  {
    _id: "m7",
    title: "Cyber Security Essentials",
    subject: "Security",
    duration: "8 Weeks",
    price: "₹14,000",
    description: "Learn the fundamentals of ethical hacking, network security, and cryptography to protect modern digital assets.",
    level: "Beginner"
  },
  {
    _id: "m8",
    title: "DevOps & CI/CD Masterclass",
    subject: "DevOps",
    duration: "12 Weeks",
    price: "₹18,500",
    description: "Automate your workflow with Docker, Kubernetes, Jenkins, and Terraform. The ultimate guide for modern engineering.",
    level: "Advanced"
  },
  {
    _id: "m9",
    title: "UI/UX Design for Tech",
    subject: "Design",
    duration: "6 Weeks",
    price: "₹7,500",
    description: "Master Figma and design principles to create stunning, user-centric interfaces for web and mobile apps.",
    level: "Beginner"
  },
  {
    _id: "m10",
    title: "Data Engineering with SQL",
    subject: "Data",
    duration: "10 Weeks",
    price: "₹12,000",
    description: "Build robust data pipelines and master complex SQL queries for big data processing and analysis.",
    level: "Intermediate"
  },
  {
    _id: "m11",
    title: "AI & ML Specialization",
    subject: "AI",
    duration: "16 Weeks",
    price: "₹22,000",
    description: "Deep dive into Neural Networks, Deep Learning, and Computer Vision with TensorFlow and PyTorch.",
    level: "Advanced"
  },
  {
    _id: "m12",
    title: "Blockchain Mastery",
    subject: "Blockchain",
    duration: "10 Weeks",
    price: "₹15,000",
    description: "Master Solidity, smart contracts, and decentralized application development on the Ethereum network.",
    level: "Intermediate"
  }
];

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await axios.get("/api/trainings");
        if (res.data && res.data.length > 0) {
          setTrainings(res.data);
        } else {
          setTrainings(MOCK_MODULES);
        }
      } catch (err) {
        console.error("Error fetching trainings, using legacy defaults:", err);
        setTrainings(MOCK_MODULES);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedCard]);

  const filteredTrainings = trainings.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "All" || t.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ["All", ...new Set(trainings.map(t => t.subject))];
  return (
    <div className="training-page-pro">
      <Header />

      {/* ── ULTRA-PREMIUM HERO ── */}
      <section className="trn-hero-pro">
        <div className="trn-hero-grid-bg"></div>
        <div className="trn-container-pro">
          <div className="trn-hero-content-pro reveal-in">
            <div className="trn-hero-badge-pro">
              Elevate Your Skillset
            </div>
            <h1>The New Standard in<br/><span>Tech Education</span></h1>
            <p>
              Master industry-grade frameworks, modern infrastructure, and advanced software engineering with our curated modules designed for professionals.
            </p>
          </div>
        </div>
      </section>

      {/* ── MINIMALIST SEARCH PANEL ── */}
      <div className="trn-container-pro">
        <div className="trn-search-panel-pro reveal-in" style={{animationDelay: '0.2s'}}>
          <div className="trn-search-box-pro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trn-icon-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search curriculum..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="trn-filter-divider"></div>
          <div className="trn-filter-box-pro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trn-icon-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <select 
              className="trn-ghost-select-pro"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub === 'All' ? 'All Disciplines' : sub}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── CURATED CATALOG ── */}
      <section className="trn-main-sec-pro">
        <div className="trn-container-pro">
          <div className="trn-sec-header-pro reveal-in" style={{animationDelay: '0.3s'}}>
            <div>
              <h2>Premium Curriculum</h2>
              <p>Explore our rigorous tracks taught by industry veterans.</p>
            </div>
            <div className="trn-stats-pill-pro">
              {filteredTrainings.length} Active Modules
            </div>
          </div>

          {loading ? (
            <div className="trn-loader-wrapper-pro">
               <div className="trn-spinner-pro"></div>
            </div>
          ) : filteredTrainings.length === 0 ? (
            <div className="trn-empty-state-pro reveal-in">
              <div className="trn-empty-illustration-pro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </div>
              <h3>No matching modules</h3>
              <p>Try adjusting your search criteria to discover our curriculum.</p>
              <button className="trn-btn-reset-pro" onClick={() => {setSearchTerm(""); setFilterSubject("All")}}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="trn-grid-pro">
              {filteredTrainings.map((training, index) => (
                <div 
                  className={`trn-card-pro reveal-in`} 
                  key={training._id} 
                  style={{animationDelay: `${0.4 + (index * 0.1)}s`, cursor: 'pointer'}}
                  onClick={() => setSelectedCard(training)}
                >
                  <div className="trn-card-header-pro">
                    <span className="trn-subject-tag-pro">{training.subject}</span>
                    <div className="trn-card-price-pro">{training.price || "₹9,999"}</div>
                  </div>
                  
                  <div className="trn-card-body-pro">
                    <h3>{training.title}</h3>
                    <p className="trn-card-desc-pro">
                      {training.description || "Comprehensive syllabus covering industry standards and practical real-world applications."}
                    </p>
                    
                    <div className="trn-card-meta-pro" style={{ borderBottom: 'none', marginBottom: '0', paddingBottom: '0' }}>
                      <div className="trn-meta-item-pro">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        {training.duration}
                      </div>
                      <div className="trn-meta-item-pro">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        {training.level || 'Beginner'}
                      </div>
                    </div>
                  </div>

                  <div className="trn-card-footer-pro" style={{ display: 'none' }}>
                    {/* Hidden on card, moved to modal */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL OVERLAY ── */}
      {selectedCard && (
        <div className="trn-modal-overlay fadeIn" onClick={() => setSelectedCard(null)}>
          <div className="trn-modal-content scaleIn" onClick={(e) => e.stopPropagation()}>
            <button className="trn-modal-close" onClick={() => setSelectedCard(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="trn-card-header-pro" style={{ marginBottom: '32px' }}>
              <span className="trn-subject-tag-pro">{selectedCard.subject}</span>
              <div className="trn-card-price-pro">{selectedCard.price || "₹9,999"}</div>
            </div>
            
            <h2 className="trn-modal-title">{selectedCard.title}</h2>
            
            <div className="trn-card-meta-pro" style={{ paddingBottom: '24px', marginBottom: '24px', borderBottom: '1px solid var(--pro-border)' }}>
              <div className="trn-meta-item-pro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {selectedCard.duration}
              </div>
              <div className="trn-meta-item-pro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                {selectedCard.level || 'Beginner'}
              </div>
            </div>

            <p className="trn-modal-desc">
              {selectedCard.description || "Comprehensive syllabus covering industry standards and practical real-world applications."}
            </p>

            <div className="trn-modal-actions">
              <Link to={`/training-details/${selectedCard._id}`} className="trn-btn-primary-purple">
                View Full Syllabus
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Trainings;
