import React from "react";
import { Link, useParams } from "react-router-dom";
import { 
  FaLaptopCode, 
  FaCalendarAlt, 
  FaAlignLeft, 
  FaExternalLinkAlt, 
  FaChevronLeft, 
  FaTag,
  FaCheckCircle,
  FaClock,
  FaSignal,
  FaUserTie,
  FaBookOpen
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TRAININGS_DATA } from '../data/trainings';
import "../style/trainingDetails.css";

const TrainingDetails = () => {
  const { id } = useParams(); 

  const assignment = TRAININGS_DATA.find(c => c.id === parseInt(id));

  if (!assignment) {
    return (
      <div className="td-page">
        <Header />
        <div className="td-container error-container">
          <h2>Module Not Found</h2>
          <p>We couldn't find the training module you're looking for.</p>
          <Link to="/trainings" className="td-primary-btn mt-4">Back to Trainings</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="td-page">
      <Header />

      {/* Hero Section */}
      <section className="td-hero">
        <div className="td-hero-bg"></div>
        <div className="td-container">
          <Link to="/trainings" className="td-back-btn">
            <FaChevronLeft /> Back to Trainings
          </Link>
          <div className="td-hero-content">
            <span className={`td-level-badge level-${assignment.level.toLowerCase()}`}>
              {assignment.level}
            </span>
            <h1>{assignment.title}</h1>
            <p>{assignment.description}</p>
          </div>
          <div className="td-quick-stats">
            <div className="stat-item"><FaClock /> {assignment.duration}</div>
            <div className="stat-item"><FaUserTie /> {assignment.instructor}</div>
            <div className="stat-item"><FaSignal /> {assignment.level}</div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="td-main">
        <div className="td-container td-layout">
          
          {/* Left Column */}
          <div className="td-content-col">
            
            <div className="td-section">
              <h2><FaBookOpen className="sec-icon"/> What You'll Learn</h2>
              <div className="td-learn-grid">
                {assignment.whatYouLearn && assignment.whatYouLearn.map((item, idx) => (
                  <div key={idx} className="td-learn-item">
                    <FaCheckCircle className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="td-section">
              <h2><FaLaptopCode className="sec-icon"/> Course Syllabus</h2>
              <div className="td-syllabus">
                {assignment.syllabus && assignment.syllabus.map((unit, idx) => (
                  <div key={idx} className="td-syllabus-item">
                    <div className="syl-week">Week {unit.week}</div>
                    <div className="syl-content">
                      <h4>{unit.title}</h4>
                      <span>{unit.lessons} Lessons</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="td-sidebar-col">
            <div className="td-sticky-card">
              <div className="td-card-header">
                <h3>Module Overview</h3>
              </div>
              <div className="td-card-body">
                
                <div className="td-info-row">
                  <div className="info-icon"><FaTag /></div>
                  <div className="info-text">
                    <span className="info-label">Subject</span>
                    <span className="info-value">{assignment.subject}</span>
                  </div>
                </div>

                <div className="td-info-row">
                  <div className="info-icon"><FaCalendarAlt /></div>
                  <div className="info-text">
                    <span className="info-label">Start Date</span>
                    <span className="info-value">{assignment.date}</span>
                  </div>
                </div>

                <div className="td-info-row">
                  <div className="info-icon"><FaClock /></div>
                  <div className="info-text">
                    <span className="info-label">Duration</span>
                    <span className="info-value">{assignment.duration}</span>
                  </div>
                </div>

                <div className="td-action-box">
                  <p>Ready to master this module?</p>
                  <a 
                    href={assignment.fileUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="td-primary-btn full-width"
                  >
                    Open Training File <FaExternalLinkAlt />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainingDetails;
