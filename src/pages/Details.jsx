import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaClock, FaLaptopCode, FaCheckCircle, FaPlayCircle, FaFileAlt, FaCertificate, FaDownload, FaCode, FaLock, FaGraduationCap } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentModal from "../components/PaymentModal";

import "../style/Details.css";

// Syncing same Mock Data for Learning View
const MOCK_MODULES = [
  {
    _id: "m1",
    title: "C & C++ Masterclass",
    subject: "C & C++",
    duration: "10 Weeks",
    price: "4999",
    description: "Complete A-Z Training from basic syntax to advanced pointers and data structures. Teaches all core concepts for competitive programming.",
    level: "Beginner",
    syllabus: [
      { week: 1, title: "Intro & Syntax", description: "Variables, types, and basic I/O.", lessons: 5 },
      { week: 2, title: "Control Flow", description: "Loops, conditionals, and logic.", lessons: 6 },
      { week: 3, title: "Functions", description: "Scope, recursion, and modularity.", lessons: 4 },
      { week: 4, title: "Pointers & DMA", description: "Memory management and addressing.", lessons: 8 }
    ]
  },
  {
    _id: "m2",
    title: "Java Full Stack Development",
    subject: "Java",
    duration: "12 Weeks",
    price: "9440",
    description: "Comprehensive bootcamp covering Core Java, Spring Boot, Hibernate, and Microservices. A complete hero-to-pro journey.",
    level: "Intermediate",
    syllabus: [
      { week: 1, title: "Core Java Foundations", description: "OOPs concepts, Inheritance, Polymorphism.", lessons: 6 },
      { week: 2, title: "Collections & Streams", description: "Advanced data handling and functional Java.", lessons: 5 },
      { week: 3, title: "Spring Boot Intro", description: "Rest APIs and dependency injection.", lessons: 7 },
      { week: 4, title: "Microservices", description: "Distributed systems and cloud deployment.", lessons: 5 }
    ]
  }
];

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);

  const fetchCourseAndEnrollment = React.useCallback(async () => {
    setLoading(true);
    try {
      const studentId = localStorage.getItem("userId");
      
      // Try API
      try {
        const courseRes = await axios.get(`/api/trainings/${id}`);
        setCourse(courseRes.data);
      } catch {
        // Fallback to Mock
        const mock = MOCK_MODULES.find(m => m._id === id);
        if (mock) setCourse(mock);
      }

      if (studentId) {
        try {
          const enrollRes = await axios.get(`/api/trainings/my-enrollments/${studentId}`);
          const enrolled = enrollRes.data.some(e => e._id === id);
          setIsEnrolled(enrolled);
        } catch { console.log("No enrollments"); }
      }
    } catch (err) {
      console.error("Fetch Data Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseAndEnrollment();
    if (searchParams.get("action") === "enroll") {
       setIsPayOpen(true);
    }
  }, [fetchCourseAndEnrollment, searchParams]);

  const handleEnrollClick = () => {
    const studentId = localStorage.getItem("userId");
    if (!studentId) {
       navigate(`/login?redirect=/training-assignment/${id}&action=enroll`);
       return;
    }
    setIsPayOpen(true);
  };

  const getUsefulLink = (subject) => {
    return "https://www.google.com/search?q=" + encodeURIComponent(subject + " documentation");
  };

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

  if (!course) {
    return (
      <div className="course-details-page">
        <Header />
        <div className="cd-container" style={{padding: '100px 0', textAlign: 'center'}}>
          <h2>Course Not Found</h2>
          <Link to="/trainings" className="btn-enroll-primary" style={{display: 'inline-block', width: 'auto', marginTop: '20px', background: '#6d28d9', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px'}}>Back to Trainings</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <Header />

      <section className="cd-hero">
        <div className="cd-container cd-hero-flex">
          <div className="cd-hero-left">
            <span className="cd-badge">{course.subject} Module</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="cd-meta">
              <span><FaClock /> {course.duration}</span>
              <span><FaLaptopCode /> {course.level || "Beginner"}</span>
              <span><FaCertificate /> Professional Certificate</span>
              {isEnrolled && <span className="enrolled-pill"><FaCheckCircle /> Access Unlocked</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="cd-main">
        <div className="cd-container cd-grid">
          
          <div className="cd-content-left">
            {isEnrolled ? (
              <div className="cd-section-box video-section">
                <h2>Module Introduction</h2>
                <div className="video-wrapper">
                    <iframe 
                      width="100%" 
                      height="400" 
                      src="https://www.youtube.com/embed/SqcY0GlETPk" 
                      title="Educational Preview" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{borderRadius: '12px'}}
                    ></iframe>
                </div>
              </div>
            ) : (
              <div className="cd-section-box locked-overlay">
                 <div className="locked-content">
                    <FaLock />
                    <h3>Video Content Locked</h3>
                    <p>Enroll in this module to unlock the video library and start learning.</p>
                 </div>
              </div>
            )}

            <div className="cd-section-box">
              <h2 className="section-title"><FaLaptopCode className="sec-icon" /> Module Roadmap</h2>
              <div className="roadmap-container">
                <div className="roadmap-track"></div>
                                {(course.syllabus || [
                  { week: 1, title: "Foundations", description: "Core concepts and environment setup.", lessons: 5 },
                  { week: 2, title: "Core Logic", description: "Structural patterns and algorithms.", lessons: 8 }
                ]).map((item, index) => (
                  <div className={`roadmap-node ${!isEnrolled ? 'locked' : ''}`} key={index}>
                    <div className="roadmap-dot">
                       {isEnrolled ? <FaCheckCircle /> : <div className="dot-inner"></div>}
                    </div>
                    <div className={`roadmap-card ${isEnrolled ? 'clickable-card' : ''}`}>
                      <div className="card-header">
                        <span className="week-label">Week {item.week}</span>
                        <h4>{item.title}</h4>
                        {!isEnrolled && <FaLock />}
                      </div>
                      <p className="card-desc">{item.description}</p>
                      {isEnrolled && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                          <a
                            href={item.videoUrl || "https://www.youtube.com/results?search_query=" + encodeURIComponent((course.title || '') + " " + (item.title || '') + " tutorial")}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              padding: '7px 14px', borderRadius: '8px', textDecoration: 'none',
                              background: '#f5f3ff', color: '#6d28d9', fontWeight: '700',
                              fontSize: '12px', border: '1.5px solid #ddd6fe', transition: 'all 0.2s'
                            }}
                            onMouseOver={e => { e.currentTarget.style.background='#6d28d9'; e.currentTarget.style.color='white'; }}
                            onMouseOut={e => { e.currentTarget.style.background='#f5f3ff'; e.currentTarget.style.color='#6d28d9'; }}
                          >
                            <FaPlayCircle /> Video
                          </a>
                          <a
                            href={item.notesUrl || "https://www.google.com/search?q=" + encodeURIComponent((course.title || '') + " " + (item.title || '') + " notes PDF")}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              padding: '7px 14px', borderRadius: '8px', textDecoration: 'none',
                              background: '#fefce8', color: '#92400e', fontWeight: '700',
                              fontSize: '12px', border: '1.5px solid #fde68a', transition: 'all 0.2s'
                            }}
                            onMouseOver={e => { e.currentTarget.style.background='#f59e0b'; e.currentTarget.style.color='white'; }}
                            onMouseOut={e => { e.currentTarget.style.background='#fefce8'; e.currentTarget.style.color='#92400e'; }}
                          >
                            <FaDownload /> Notes
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cd-sidebar">
            <div className="cd-sticky-sidebar">
              {isEnrolled ? (
                <div className="cd-enroll-card success-card">
                  <div className="enroll-body">
                    <h3>You're Admitted!</h3>
                    <p>Start your learning journey now with full resource access.</p>
                    <button className="btn-enroll-primary success" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                      Resume Module
                    </button>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
                      <a
                        href={course.videoUrl || "https://www.youtube.com/results?search_query=" + encodeURIComponent((course.title || '') + " tutorial")}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                          padding: '14px 10px', borderRadius: '12px', textDecoration: 'none',
                          background: '#f5f3ff', border: '2px solid #ddd6fe', color: '#6d28d9',
                          fontWeight: '700', fontSize: '13px', transition: 'all 0.3s'
                        }}
                        onMouseOver={e => { e.currentTarget.style.background='#6d28d9'; e.currentTarget.style.color='white'; }}
                        onMouseOut={e => { e.currentTarget.style.background='#f5f3ff'; e.currentTarget.style.color='#6d28d9'; }}
                      >
                        <FaPlayCircle style={{ fontSize: '22px' }} />
                        Video Lecture
                      </a>
                      <a
                        href={course.notesUrl || course.fileUrl || "https://www.google.com/search?q=" + encodeURIComponent((course.title || '') + " notes PDF download")}
                        download={course.notesUrl || course.fileUrl ? `${course.title}-notes.pdf` : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                          padding: '14px 10px', borderRadius: '12px', textDecoration: 'none',
                          background: '#fefce8', border: '2px solid #fde68a', color: '#92400e',
                          fontWeight: '700', fontSize: '13px', transition: 'all 0.3s'
                        }}
                        onMouseOver={e => { e.currentTarget.style.background='#f59e0b'; e.currentTarget.style.color='white'; }}
                        onMouseOut={e => { e.currentTarget.style.background='#fefce8'; e.currentTarget.style.color='#92400e'; }}
                      >
                        <FaDownload style={{ fontSize: '22px' }} />
                        Notes PDF
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cd-enroll-card">
                  <div className="enroll-body">
                    <h3>₹{course.price || "9,440"}</h3>
                    <p>Gain full access to video lectures, syllabus PDFs, and a verified certificate.</p>
                    <button className="btn-enroll-primary" onClick={handleEnrollClick} style={{background: '#6d28d9', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', width: '100%'}}>
                      Enroll & Pay Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <PaymentModal 
        isOpen={isPayOpen} 
        onClose={() => setIsPayOpen(false)} 
        onSuccess={() => { setIsEnrolled(true); }}
        training={course} 
      />

      <Footer />
    </div>
  );
};

export default Details;
