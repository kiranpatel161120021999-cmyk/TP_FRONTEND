import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaClock, FaFire } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { JOBS_DATA } from "../data/jobs";
import "../style/AllJobs.css";

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredJobs = JOBS_DATA.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "All" || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="jobs-board-page">
      <Header />

      {/* ── HERO ── */}
      <section className="job-hero">
        <div className="job-hero-bg"></div>
        <div className="job-hero-content">
          <span className="job-badge"><FaFire /> 200+ Live Openings</span>
          <h1>Find Your <span>Dream Job</span></h1>
          <p>Explore top opportunities from premium recruiters, startups, and Fortune 500 companies.</p>
          
          <div className="job-search-bar">
            <div className="search-input-wrap">
              <FaSearch className="icon-search" />
              <input 
                type="text" 
                placeholder="Search by role, company, or skills (e.g. React, Java)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="job-type-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── JOBS GRID ── */}
      <section className="job-main-sec">
        <div className="job-container">
          
          <div className="job-header-row">
            <h2>Recommended Opportunities ({filteredJobs.length})</h2>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="job-empty-state">
              <FaBriefcase className="empty-icon" />
              <h3>No jobs found matching your criteria.</h3>
              <p>Try clearing your search or filters.</p>
              <button onClick={() => {setSearchTerm(""); setFilterType("All")}} className="btn-outline">Reset Search</button>
            </div>
          ) : (
            <div className="job-grid">
              {filteredJobs.map(job => (
                <div className="job-card" key={job.id}>
                  
                  <div className="jc-top">
                    <div className="jc-logo">
                      <img src={job.logo} alt={job.company} />
                    </div>
                    <span className={`jc-type type-${job.type.toLowerCase().replace('-','')}`}>
                      {job.type}
                    </span>
                  </div>

                  <h3 className="jc-title">{job.title}</h3>
                  <h4 className="jc-company">{job.company}</h4>

                  <div className="jc-info-grid">
                    <div className="jci-item">
                      <FaMapMarkerAlt className="jci-icon" /> {job.location}
                    </div>
                    <div className="jci-item">
                      <FaMoneyBillWave className="jci-icon" /> {job.package}
                    </div>
                    <div className="jci-item">
                      <FaBriefcase className="jci-icon" /> {job.experience}
                    </div>
                    <div className="jci-item">
                      <FaClock className="jci-icon" /> {job.postedDate}
                    </div>
                  </div>

                  <div className="jc-skills">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-pill">{skill}</span>
                    ))}
                    {job.skills.length > 3 && <span className="skill-pill">+ {job.skills.length - 3}</span>}
                  </div>

                  <div className="jc-footer">
                    <Link to={`/job/${job.id}`} className="jc-apply-btn">View & Apply</Link>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllJobs;
