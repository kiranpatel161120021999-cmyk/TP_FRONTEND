import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaClock, FaCheckCircle, FaBuilding, FaArrowLeft } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { JOBS_DATA } from "../data/jobs";
import "../style/JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();

  // Find the exact job from data
  const job = JOBS_DATA.find((j) => j.id === parseInt(id));

  if (!job) {
    return (
      <div className="jd-page">
        <Header />
        <div className="jd-container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Job Not Found</h2>
          <p>The position you are looking for does not exist or has been closed.</p>
          <Link to="/alljobs" className="btn-jd-primary" style={{ display: 'inline-flex', marginTop: '20px' }}>Explore Other Jobs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="jd-page">
      <Header />

      {/* ── HERO ── */}
      <section className="jd-hero">
        <div className="jd-container">
          <Link to="/alljobs" className="jd-back-link">
            <FaArrowLeft /> Back to Jobs
          </Link>
          
          <div className="jd-hero-content">
            <div className="jdh-logo">
              <img src={job.logo} alt={job.company} />
            </div>
            <div className="jdh-info">
              <h1>{job.title}</h1>
              <div className="jdh-meta">
                <span><FaBuilding className="jdh-icon" /> {job.company}</span>
                <span><FaMapMarkerAlt className="jdh-icon" /> {job.location}</span>
                <span className="jdh-type">{job.type}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="jd-main">
        <div className="jd-container jd-grid">
          
          {/* LEFT: JOB DESCRIPTION */}
          <div className="jd-left">
            <div className="jd-section">
              <h2>About The Role</h2>
              <p>{job.description}</p>
              <p>We are seeking a highly motivated and skilled individual to join our fast-paced environment. The ideal candidate will be responsible for driving impactful projects from end to end, collaborating with cross-functional teams, and delivering high-quality results.</p>
            </div>

            <div className="jd-section">
              <h2>Key Responsibilities</h2>
              <ul className="jd-list">
                <li><FaCheckCircle className="jd-list-icon" /> Design, develop, and maintain clean, highly optimized code.</li>
                <li><FaCheckCircle className="jd-list-icon" /> Collaborate with product managers, designers, and other engineers.</li>
                <li><FaCheckCircle className="jd-list-icon" /> Troubleshoot, test, and maintain the core product software to ensure strong optimization.</li>
                <li><FaCheckCircle className="jd-list-icon" /> Contribute in all phases of the development lifecycle.</li>
              </ul>
            </div>

            <div className="jd-section">
              <h2>Required Skills & Qualifications</h2>
              <div className="jd-skills-wrap">
                {job.skills.map((skill, i) => (
                  <span key={i} className="jd-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: OVERVIEW & APPLY */}
          <div className="jd-right">
            <div className="jd-apply-card">
              <h3>Job Overview</h3>
              
              <div className="jd-overview-list">
                <div className="jo-item">
                  <div className="jo-icon"><FaMoneyBillWave /></div>
                  <div className="jo-text">
                    <strong>Salary Package</strong>
                    <span>{job.package}</span>
                  </div>
                </div>
                <div className="jo-item">
                  <div className="jo-icon"><FaBriefcase /></div>
                  <div className="jo-text">
                    <strong>Experience Required</strong>
                    <span>{job.experience}</span>
                  </div>
                </div>
                <div className="jo-item">
                  <div className="jo-icon"><FaClock /></div>
                  <div className="jo-text">
                    <strong>Posted Date</strong>
                    <span>{job.postedDate}</span>
                  </div>
                </div>
              </div>

              <div className="jd-vacancy">
                <strong>{job.vacancies}</strong> Vacancies Available
              </div>

              <div className="jd-actions">
                <Link 
                  to="/ApplyJob" 
                  state={job}
                  className="btn-jd-primary"
                >
                  Apply Now
                </Link>
                <p className="jd-notice">Applications close in 7 days</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetails;
