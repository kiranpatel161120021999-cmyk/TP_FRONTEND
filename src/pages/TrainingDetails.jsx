import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
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
  FaBookOpen,
  FaLock,
  FaGraduationCap,
  FaDownload,
  FaPlayCircle,
  FaCertificate
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentModal from "../components/PaymentModal";
import "../style/TrainingDetails.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const TrainingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const fetchTrainingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const studentId = localStorage.getItem("userId");
      const res = await axios.get(`/api/trainings/${id}`);
      setCourse(res.data);

      if (studentId) {
        const enrollRes = await axios.get(`/api/trainings/my-enrollments/${studentId}`);
        const enrolled = enrollRes.data.some(e => e._id === id);
        setIsEnrolled(enrolled);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Process failed load training data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTrainingData();
    // Auto-resume enrollment if coming back from login
    if (searchParams.get("action") === "enroll") {
      setIsPayModalOpen(true);
    }
  }, [fetchTrainingData, searchParams]);

  const handleEnrollClick = () => {
    const studentId = localStorage.getItem("userId");
    if (!studentId) {
      // Direct redirection to login for a seamless flow
      navigate(`/login?redirect=/training-details/${id}&action=enroll`);
      return;
    }
    setIsPayModalOpen(true);
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

  const getVideoLink = (subject, topic) => {
    if (topic) {
       return "https://www.youtube.com/results?search_query=" + encodeURIComponent(`${subject} ${topic} tutorial`);
    }
    const videoLinks = {
      "React Native": "https://www.youtube.com/results?search_query=react+native+full+course",
      "React JS": "https://www.youtube.com/results?search_query=react+js+full+course",
      "Java": "https://www.youtube.com/results?search_query=java+programming+full+course",
      "PHP": "https://www.youtube.com/results?search_query=php+full+course+for+beginners",
      "Python": "https://www.youtube.com/results?search_query=python+full+course",
      "Full Stack": "https://www.youtube.com/results?search_query=full+stack+web+development+course",
      "Data Science": "https://www.youtube.com/results?search_query=data+science+full+course"
    };
    return videoLinks[subject] || "https://www.youtube.com/results?search_query=" + encodeURIComponent(subject + " full tutorial");
  };

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

  if (!course) return (
    <div className="td-page">
      <Header />
      <div className="td-container error-container">
        <h2>Module Not Found</h2>
        <Link to="/trainings" className="td-back-btn">Return to Catalog</Link>
      </div>
      <Footer />
    </div>
  );

  const levelClass = `level-${course.level?.toLowerCase() || 'beginner'}`;

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
            <span className={`td-level-badge ${levelClass}`}>
              {course.level}
            </span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
          </div>
          <div className="td-quick-stats">
            <div className="stat-item"><FaClock /> {course.duration}</div>
            <div className="stat-item"><FaUserTie /> {course.instructor}</div>
            <div className="stat-item"><FaSignal /> {course.level}</div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="td-main">
        <div className="td-container td-layout">

          <div className="td-content-col">
            <section className="td-section">
              <h2><FaCheckCircle className="sec-icon" /> Module Objectives</h2>
              <div className="td-learn-grid">
                {["Industry standards", "Hands-on projects", "Cloud deployment", "Expert support"].map((item, index) => (
                  <div className="td-learn-item" key={index}>
                    <FaCheckCircle className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="td-section">
              <div className="flex justify-between items-center mb-8">
                <h2 className="section-title"><FaLaptopCode className="sec-icon" /> Detailed Learning Roadmap</h2>
                 <span className="td-syllabus-count">{course.syllabus?.length || 4} Milestone Weeks</span>
              </div>
              
              <div className="roadmap-container">
                <div className="roadmap-track"></div>
                
                {(() => {
                  const displaySyllabus = course.syllabus && course.syllabus.length > 0 
                    ? course.syllabus 
                    : [
                        { week: 1, title: "Foundations & Basics", description: "Learn the core concepts and setup your development environment.", lessons: 5 },
                        { week: 2, title: "Intermediate Concepts", description: "Deep dive into more complex structural patterns and logic modeling.", lessons: 7 },
                        { week: 3, title: "Advanced Topics", description: "Industry-standard project workflows and API integrations.", lessons: 6 },
                        { week: 4, title: "Deployment Projects", description: "Capstone real-world project deployment and code reviews.", lessons: 4 }
                      ];

                  return displaySyllabus.map((item, index) => (
                    <div className="roadmap-node" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="roadmap-dot">
                         <div className="dot-inner"></div>
                      </div>
                      <div className={`roadmap-card card-reveal ${isEnrolled ? 'clickable-card' : ''}`}
                           onClick={(e) => { e.stopPropagation(); isEnrolled && window.open(getUsefulLink(course.subject), "_blank"); }}>
                        <div className="card-header">
                          <span className="week-label">Week {item.week}</span>
                          <h4>{item.title}</h4>
                        </div>
                        <p className="card-desc">{item.description || "Master industry standards and core concepts for this developmental phase."}</p>
                         <div className="card-footer">
                            <span className="lesson-info"><FaBookOpen /> {item.lessons || 4} Interactive Lessons</span>
                            {isEnrolled ? (
                              <div className="syll-buttons">
                                <a href="/uploads/1773130692016-resume.pdf" download={`${course.subject}_Notes_Week_${item.week}.pdf`} 
                                   className="btn-syll-sm" onClick={(e) => e.stopPropagation()}>
                                    <FaDownload /> Download Study Guide
                                </a>
                              </div>
                            ) : (
                                <button className="btn-syll-sm outline" onClick={(e) => { e.stopPropagation(); window.open(getVideoLink(course?.subject || "Programming", item.title), "_blank"); }}>
                                  <FaPlayCircle /> Watch Lesson
                                </button>
                            )}
                         </div>
                      </div>
                    </div>
                  ));
                })()}

                <div className="roadmap-node milestone">
                  <div className="roadmap-dot milestone-dot">
                     <FaGraduationCap />
                  </div>
                  <div className="roadmap-card milestone-card">
                     <h4>Professional Certification</h4>
                     <p>Final project assessment and industry-recognized credential award.</p>
                     {isEnrolled && (
                        <button className="btn-certificate-download" 
                                style={{background: '#6d28d9', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold'}}
                                onClick={(e) => { e.stopPropagation(); window.open("/certificate/" + id, "_blank"); }}>
                          <FaCertificate /> Download Certificate
                        </button>
                     )}
                  </div>
                </div>
              </div>
            </section>

            {/* NEW: TECHNOLOGY STACK */}
            <section className="td-section">
              <h2 className="section-title">What You'll Master</h2>
              <div className="tech-stack-grid">
                {["React", "Node.js", "Express", "MongoDB", "Redux", "TypeScript"].map((tech, i) => (
                  <div className="tech-item" key={i}>
                    <FaCheckCircle className="text-indigo-400" /> {tech}
                  </div>
                ))}
              </div>
            </section>

            {/* NEW: INSTRUCTOR PROFILE */}
            <section className="td-section instructor-section">
              <h2 className="section-title">Your Instructor</h2>
              <div className="instructor-card">
                <div className="instructor-img">
                  <div className="img-placeholder">{course.instructor ? course.instructor[0] : 'I'}</div>
                </div>
                <div className="instructor-bio">
                  <h4>{course.instructor || "Industry Expert"}</h4>
                  <p>Senior Full-Stack Architect with over 12+ years of experience in enterprise development. Passionate about mentoring the next generation of engineers.</p>
                </div>
              </div>
            </section>

            {/* NEW: FAQ SECTION */}
            <section className="td-section">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="faq-accordion">
                {[
                  { q: "Is this training fully online?", a: "Yes, it is a self-paced online module with live mentorship sessions." },
                  { q: "Do I get a certificate?", a: "Upon successful completion of the final project, you receive a verification link for your LinkedIn profile." },
                  { q: "What are the prerequisites?", a: "Basic understanding of programming logic and variables is recommended." }
                ].map((faq, i) => (
                  <div className="faq-item" key={i}>
                    <div className="faq-question">
                      <span>{faq.q}</span>
                    </div>
                    <div className="faq-answer">{faq.a}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="td-sidebar-col">
            <div className="td-sticky-card">
              <div className="td-card-header">
                <h3>Enrollment Status</h3>
              </div>
              <div className="td-card-body">
                <div className="td-info-row">
                  <div className="info-icon"><FaClock /></div>
                  <div className="info-text">
                    <span className="info-label">Duration</span>
                    <span className="info-value">{course.duration}</span>
                  </div>
                </div>
                <div className="td-info-row">
                  <div className="info-icon"><FaGraduationCap /></div>
                  <div className="info-text">
                    <span className="info-label">Certificate</span>
                    <span className="info-value">Included</span>
                  </div>
                </div>

                <div className="td-action-box">
                  {isEnrolled ? (
                    <>
                      <p>You have full access!</p>
                      <div className="td-progress-mini" style={{ marginBottom: '15px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>Status: 100% (Completed)</div>
                        <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}><div style={{ width: '100%', height: '100%', background: '#10b981' }}></div></div>
                      </div>
                      <Link to={`/training-assignment/${course._id}`} className="td-primary-btn full-width">
                        Continue to Module <FaExternalLinkAlt />
                      </Link>
                      <a href="/uploads/1773130692016-resume.pdf" download={`${course.subject}_Complete_Study_Guide.pdf`}
                        style={{ marginTop: '10px', display: 'block', textAlign: 'center', textDecoration: 'none', color: '#6d28d9', fontWeight: 'bold', fontSize: '14px' }}>
                        <FaDownload /> Download Study Guide PDF
                      </a>
                    </>
                  ) : (
                    <>
                      <p>Individual Enrollment</p>
                      <button className="td-primary-btn full-width" onClick={handleEnrollClick}>
                        Enroll & Checkout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaymentModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        onSuccess={fetchTrainingData}
        training={course}
      />

      <Footer />
    </div>
  );
};

export default TrainingDetails;
