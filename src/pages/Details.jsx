import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaClock, FaLaptopCode, FaCheckCircle, FaPlayCircle, FaFileAlt, FaCertificate } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TRAININGS_DATA } from '../data/trainings';
import "../style/Details.css";

const Details = () => {
  const { id } = useParams();

  // Find the real course from our data
  const course = TRAININGS_DATA.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="course-details-page">
        <Header />
        <div className="cd-container" style={{padding: '100px 0', textAlign: 'center'}}>
          <h2>Course Not Found</h2>
          <Link to="/trainings" className="btn-enroll-primary" style={{display: 'inline-block', width: 'auto', marginTop: '20px'}}>Back to Trainings</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <Header />

      {/* HERO OVERVIEW */}
      <section className="cd-hero">
        <div className="cd-container cd-hero-flex">
          <div className="cd-hero-left">
            <span className="cd-badge">{course.subject} Module</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="cd-meta">
              <span><FaClock /> {course.duration}</span>
              <span><FaLaptopCode /> {course.level}</span>
              <span><FaCertificate /> Certificate Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="cd-main">
        <div className="cd-container cd-grid">
          
          <div className="cd-content-left">
            {/* What you'll learn */}
            <div className="cd-section-box">
              <h2>What you'll learn</h2>
              <ul className="cd-learn-list">
                {course.whatYouLearn.map((item, i) => (
                  <li key={i}><FaCheckCircle className="check-icon" /> {item}</li>
                ))}
              </ul>
            </div>

            {/* Syllabus */}
            <div className="cd-section-box">
              <h2>Course Syllabus</h2>
              <div className="cd-syllabus-list">
                {course.syllabus.map((mod, i) => (
                  <div className="syll-item" key={i}>
                    <div className="syll-week">Week {mod.week}</div>
                    <div className="syll-info">
                      <h4>{mod.title}</h4>
                      <span><FaFileAlt /> {mod.lessons} lessons</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cd-sidebar">
            <div className="cd-enroll-card">
              <div className="enroll-img">
                <FaPlayCircle className="enroll-play-icon" />
                <p>Preview this course</p>
              </div>
              <div className="enroll-body">
                <h3>Free for Students</h3>
                <p>Register to unlock full access to video lectures, assignments, and mentorship.</p>
                <Link to={`/training-details/${id}`} className="btn-enroll-primary">
                  Start Learning Now
                </Link>
                <ul className="enroll-features">
                  <li><FaCheckCircle className="ef-icon" /> 20 hours of on-demand video</li>
                  <li><FaCheckCircle className="ef-icon" /> 5 coding assignments</li>
                  <li><FaCheckCircle className="ef-icon" /> Access on mobile and TV</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
