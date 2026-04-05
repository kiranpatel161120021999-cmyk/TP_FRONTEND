import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaClock, FaLaptopCode, FaCheckCircle, FaPlayCircle, FaFileAlt, FaCertificate, FaDownload, FaCode, FaLock, FaGraduationCap } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentModal from "../components/PaymentModal";

import "../style/Details.css";

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
      
      // 1. Fetch Training Details
      const courseRes = await axios.get(`http://localhost:5000/api/trainings/${id}`);
      setCourse(courseRes.data);

      // 2. Check Enrollment if student is logged in
      if (studentId) {
        const enrollRes = await axios.get(`http://localhost:5000/api/trainings/my-enrollments/${studentId}`);
        const enrolled = enrollRes.data.some(e => e._id === id);
        setIsEnrolled(enrolled);
      }
    } catch (err) {
      console.error("Fetch Data Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseAndEnrollment();
    // Auto-resume enrollment if coming back from login
    if (searchParams.get("action") === "enroll") {
       setIsPayOpen(true);
    }
  }, [fetchCourseAndEnrollment, searchParams]);

  const handleEnrollClick = () => {
    const studentId = localStorage.getItem("userId");
    
    if (!studentId) {
       // Direct redirection to login for a seamless flow
       navigate(`/login?redirect=/training-assignment/${id}&action=enroll`);
       return;
    }
    
    // User is logged in -> Open payment instantly
    setIsPayOpen(true);
  };

  const getUsefulLink = (subject) => {
    const links = {
      "React Native": "https://reactnative.dev/docs/getting-started",
      "React JS": "https://react.dev/",
      "Java": "https://docs.oracle.com/javase/tutorial/",
      "PHP": "https://www.php.net/manual/en/",
      "Python": "https://docs.python.org/3/tutorial/",
      "Full Stack": "https://developer.mozilla.org/en-US/docs/Learn",
      "Data Science": "https://www.kaggle.com/learn"
    };
    return links[subject] || "https://www.google.com/search?q=" + encodeURIComponent(subject + " documentation");
  };

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

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
              <span><FaLaptopCode /> {course.level || "Beginner"}</span>
              <span><FaCertificate /> Professional Certificate</span>
              {isEnrolled && <span className="enrolled-pill"><FaCheckCircle /> Access Unlocked</span>}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="cd-main">
        <div className="cd-container cd-grid">
          
          <div className="cd-content-left">
            {/* Video Player Section */}
            {isEnrolled ? (
              <div className="cd-section-box video-section">
                <h2>{course.videoUrl ? "Course Overview Video" : "Module Introduction (Preview)"}</h2>
                <div className="video-wrapper">
                  {course.videoUrl ? (
                    <video controls width="100%">
                      <source src={`http://localhost:5000${course.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
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
                  )}
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

            {/* Syllabus Roadmap */}
            <div className="cd-section-box">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="section-title"><FaLaptopCode className="sec-icon" /> Module Roadmap</h2>
                 {!isEnrolled && <span className="text-amber-500 font-bold flex items-center gap-2"><FaLock /> Enrollment Required</span>}
              </div>
              
              <div className="roadmap-container">
                <div className="roadmap-track"></div>
                
                {(() => {
                  const displaySyllabus = course.syllabus && course.syllabus.length > 0 
                    ? course.syllabus 
                    : [
                        { week: 1, title: "Foundations & Setup", description: "Master the core environmental configuration and basic syntax.", lessons: 5 },
                        { week: 2, title: "Architecture & Logic", description: "Deep dive into structural patterns and core module logic.", lessons: 8 },
                        { week: 3, title: "Advanced Integration", description: "Connecting external services and optimizing performance.", lessons: 6 }
                      ];

                  return displaySyllabus.map((item, index) => {
                    const isCompleted = isEnrolled && index < 0; 
                    const isCurrent = isEnrolled && index === 0;
                    
                    return (
                      <div className={`roadmap-node ${!isEnrolled ? 'locked' : ''}`} key={index}>
                        <div className={`roadmap-dot ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                           {isCompleted ? <FaCheckCircle /> : <div className="dot-inner"></div>}
                        </div>
                        <div className={`roadmap-card ${isEnrolled ? 'clickable-card' : ''}`}
                             onClick={(e) => { e.stopPropagation(); isEnrolled && window.open(getUsefulLink(course.subject), "_blank"); }}>
                          <div className="card-header">
                            <span className="week-label">Week {item.week}</span>
                            <h4>{item.title}</h4>
                            {!isEnrolled && <FaLock className="text-gray-300" />}
                          </div>
                          <p className="card-desc">{item.description}</p>
                          
                          {isEnrolled ? (
                            <div className="card-footer">
                              <span className="lesson-info"><FaFileAlt /> {item.lessons || 4} Lessons</span>
                              <div className="syll-buttons">
                                <a href={`http://localhost:5000/uploads/1773130692016-resume.pdf`} download={`${course.subject}_Notes_Week_${item.week}.pdf`} className="btn-syll-sm" onClick={(e) => e.stopPropagation()}>
                                    <FaDownload /> Download Study Guide
                                </a>
                                <button className="btn-syll-sm outline" onClick={(e) => { e.stopPropagation(); window.open(getUsefulLink(course.subject), "_blank"); }}>
                                  <FaPlayCircle /> Watch Lesson
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="card-footer locked-footer">
                               <p>Enroll to unlock this milestone</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}

                {course.syllabus?.length > 0 && (
                  <div className="roadmap-node milestone">
                    <div className="roadmap-dot milestone-dot">
                       <FaGraduationCap />
                    </div>
                    <div className="roadmap-card milestone-card">
                       <h4>Course Completion</h4>
                       <p>Final project review and certification.</p>
                       {isEnrolled && (
                          <button className="btn-certificate-download" onClick={() => window.open("/certificate/" + id, "_blank")}>
                            <FaCertificate /> Download Certificate
                          </button>
                       )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="cd-sidebar">
            <div className="cd-sticky-sidebar">
              {isEnrolled ? (
                <div className="cd-enroll-card success-card">
                  <div className="enroll-img success">
                    <FaCheckCircle className="enroll-play-icon" />
                    <p>Training Active</p>
                  </div>
                  <div className="enroll-body">
                    <h3>You're Admitted!</h3>
                    <p>Your enrollment was successful. You have lifetime access to these resources and certificate updates.</p>
                    <div className="progress-bar-container">
                       <div className="progress-label">Course Progress: 100% (Completed)</div>
                       <div className="progress-bg"><div className="progress-fill" style={{width: '100%', background: '#10b981'}}></div></div>
                    </div>
                    <button className="btn-enroll-primary success" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                      Resume Module
                    </button>
                    <a href="http://localhost:5000/uploads/1773130692016-resume.pdf" download="Essential_Course_Guide.pdf" className="btn-enroll-outline" style={{marginTop: '10px', display: 'block', textAlign: 'center', textDecoration: 'none', background: '#f5f3ff', color: '#6d28d9', padding: '10px', borderRadius: '8px', fontWeight: 'bold'}}>
                      <FaDownload /> Essential Guide PDF
                    </a>
                  </div>
                </div>
              ) : (
                <div className="cd-enroll-card">
                  <div className="enroll-img">
                    <FaPlayCircle className="enroll-play-icon" />
                    <p>Start Your Journey</p>
                  </div>
                  <div className="enroll-body">
                    <h3>₹{course.price || "9,440"}</h3>
                    <p>Gain full access to video lectures, syllabus PDFs, and a verified certificate.</p>
                    <button className="btn-enroll-primary" onClick={handleEnrollClick}>
                      Enroll & Pay Now
                    </button>
                    <ul className="enroll-features">
                      <li><FaCheckCircle className="ef-icon" /> On-demand Video</li>
                      <li><FaCheckCircle className="ef-icon" /> Weekly Syllabus PDFs</li>
                      <li><FaCheckCircle className="ef-icon" /> Career Guidance</li>
                    </ul>
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
        onSuccess={fetchCourseAndEnrollment}
        training={course} 
      />

      <Footer />
    </div>
  );
};

export default Details;
