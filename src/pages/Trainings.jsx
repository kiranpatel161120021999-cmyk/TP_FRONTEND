import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaClock, FaSearch, FaCode, FaServer, FaPaintBrush, FaGraduationCap } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Training.css';

import { TRAININGS_DATA as MOCK_TRAININGS } from '../data/trainings';

// Helper to assign icons/colors based on subject
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  const uniqueSubjects = ["All", ...new Set(MOCK_TRAININGS.map(t => t.subject))];

  const filteredTrainings = MOCK_TRAININGS.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSubject === "All" || t.subject === filterSubject;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="training-page">
      <Header />

      {/* ── HERO ── */}
      <section className="trn-hero">
        <div className="trn-container trn-hero-content">
          <span className="trn-badge"><FaGraduationCap /> Skill Up</span>
          <h1>Explore <span>Training Programs</span></h1>
          <p>Master industry-relevant skills with our curated assignments, bootcamps, and technical projects.</p>
          
          <div className="trn-search-box">
            <div className="trn-search-input">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search for Java, React, Data Science..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              value={filterSubject} 
              onChange={(e) => setFilterSubject(e.target.value)}
              className="trn-filter-select"
            >
              {uniqueSubjects.map(sub => (
                <option key={sub} value={sub}>{sub === "All" ? "All Subjects" : sub}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ── CARD GRID ── */}
      <section className="trn-main-sec">
        <div className="trn-container">
          
          <div className="trn-header-row">
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
              {filteredTrainings.map(training => {
                const { icon, colorClass } = getSubjectMetrics(training.subject);
                
                return (
                  <div className="trn-card" key={training.id}>
                    <div className="trn-card-header">
                      <div className={`trn-icon-box ${colorClass}`}>
                        {icon}
                      </div>
                      <span className={`trn-level-badge level-${training.level.toLowerCase()}`}>
                        {training.level}
                      </span>
                    </div>

                    <h3 className="trn-title">{training.title}</h3>
                    <p className="trn-subject">Subject: <strong>{training.subject}</strong></p>

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
                      <Link to={`/training-details/${training.id}`} className="btn-trn-primary">
                        Start Module
                      </Link>
                      <Link to={`/training-assignment/${training.id}`} className="btn-trn-outline">
                        Details
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
