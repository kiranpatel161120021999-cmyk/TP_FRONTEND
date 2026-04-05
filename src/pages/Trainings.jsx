import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaClock, FaSearch, FaCode, FaServer, FaPaintBrush, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Training.css';

const getSubjectMetrics = (subject) => {
  switch(subject.toLowerCase()) {
    case 'java': return { icon: <FaCode />, colorClass: 'sub-java' };
    case 'php': return { icon: <FaServer />, colorClass: 'sub-php' };
    case 'python': return { icon: <FaLaptopCode />, colorClass: 'sub-python' };
    case 'react': return { icon: <FaCode />, colorClass: 'sub-react' };
    case 'nodejs': return { icon: <FaServer />, colorClass: 'sub-node' };
    case 'design': return { icon: <FaPaintBrush />, colorClass: 'sub-design' };
    default: return { icon: <FaLaptopCode />, colorClass: 'sub-default' };
  }
};

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterLanguage, setFilterLanguage] = useState("All");

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trainings");
        setTrainings(res.data);
      } catch (err) {
        console.error("Error fetching trainings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const uniqueSubjects = ["All", ...new Set(trainings.map(t => t.subject))];
  const uniqueLanguages = ["All", ...new Set(trainings.map(t => t.language || "English"))];

  const filteredTrainings = trainings.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "All" || t.subject === filterSubject;
    const matchesLanguage = filterLanguage === "All" || (t.language || "English") === filterLanguage;
    return matchesSearch && matchesSubject && matchesLanguage;
  });

  return (
    <div className="training-page">
      <Header />

      {/* ── ELITE MESH HERO ── */}
      <section className="trn-hero">
        <div className="trn-container trn-hero-content reveal-in">
          <span className="trn-badge"><FaGraduationCap /> Skill Up</span>
          <h1>Explore <span>Training Programs</span></h1>
          <p>Master industry-relevant skills with our curated assignments, bootcamps, and technical projects. Propel your career forward today.</p>
          
          <div className="trn-search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for Java, React, Data Science..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              value={filterSubject} 
              onChange={(e) => setFilterSubject(e.target.value)}
              className="trn-filter-select"
            >
              {uniqueSubjects.map(sub => (
                <option key={sub} value={sub}>{sub === "All" ? "Subjects" : sub}</option>
              ))}
            </select>
            <select 
              value={filterLanguage} 
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="trn-filter-select"
            >
              {uniqueLanguages.map(lang => (
                <option key={lang} value={lang}>{lang === "All" ? "Languages" : lang}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ── CARD GRID ── */}
      <section className="trn-main-sec">
        <div className="trn-container">
          
          <div className="trn-header-row reveal-in">
            <h2>Available Modules ({filteredTrainings.length})</h2>
          </div>

          {filteredTrainings.length === 0 ? (
            <div className="trn-empty">
              <FaLaptopCode className="empty-icon" />
              <h3>No trainings found</h3>
              <p>Try clearing your search or filter criteria.</p>
              <button className="trn-reset-btn" onClick={() => {setSearchTerm(""); setFilterSubject("All")}}>Reset Filters</button>
            </div>
          ) : (
            <div className="trn-grid">
              {filteredTrainings.map((training, index) => {
                const { icon, colorClass } = getSubjectMetrics(training.subject);
                
                return (
                  <div className="trn-card reveal-in" key={training.id} style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="trn-card-header">
                      <div className={`trn-icon-box ${colorClass}`}>
                        {icon}
                      </div>
                      <span className={`trn-level-badge level-${training.level.toLowerCase()}`}>
                        {training.level}
                      </span>
                    </div>

                    <h3 className="trn-title">{training.title}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <p className="trn-subject">Subject: <strong>{training.subject}</strong></p>
                      <span className="trn-lang-badge">{training.language || "English"}</span>
                    </div>

                    <div className="trn-meta">
                      <div className="tm-item">
                        <FaClock className="tm-icon" />
                        <span>Deadline: {training.date}</span>
                      </div>
                      <div className="tm-item">
                        <FaLaptopCode className="tm-icon" />
                        <span>Length: {training.duration}</span>
                      </div>
                    </div>

                    <div className="trn-card-actions">
                      <Link to={`/training-assignment/${training._id}`} className="btn-trn-primary">
                        Start Module
                      </Link>
                      <Link to={`/training-details/${training._id}`} className="btn-trn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        View Details <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trainings;
