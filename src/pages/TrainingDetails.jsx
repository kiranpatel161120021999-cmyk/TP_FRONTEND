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

// Syncing same Mock Data for Details View
const MOCK_MODULES = [
  {
    _id: "m1",
    title: "C & C++ Masterclass",
    subject: "C & C++",
    duration: "10 Weeks",
    price: "4999",
    instructor: "Rajesh Kumar",
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
    instructor: "Amit Sharma",
    description: "Comprehensive bootcamp covering Core Java, Spring Boot, Hibernate, and Microservices. A complete hero-to-pro journey.",
    level: "Intermediate",
    syllabus: [
      { week: 1, title: "Core Java Foundations", description: "OOPs concepts, Inheritance, Polymorphism.", lessons: 6 },
      { week: 2, title: "Collections & Streams", description: "Advanced data handling and functional Java.", lessons: 5 },
      { week: 3, title: "Spring Boot Intro", description: "Rest APIs and dependency injection.", lessons: 7 },
      { week: 4, title: "Microservices", description: "Distributed systems and cloud deployment.", lessons: 5 }
    ]
  },
  {
    _id: "m3",
    title: "Full Stack Web Mastery",
    subject: "React",
    duration: "14 Weeks",
    price: "12500",
    instructor: "Sneha Patil",
    description: "Teaches all modern web technologies: React, Node.js, Express, and MongoDB. Build and deploy 5+ industry-level projects.",
    level: "Advanced"
  },
  {
    _id: "m4",
    title: "Python for AI & Data Science",
    subject: "Python",
    duration: "12 Weeks",
    price: "8999",
    instructor: "Dr. Vikram Singh",
    description: "From basic Python to Machine Learning and AI. Teaches all industry libraries including NumPy, Pandas, and Scikit-learn.",
    level: "Intermediate"
  },
  {
    _id: "m5",
    title: "Cloud Computing with AWS",
    subject: "Cloud",
    duration: "8 Weeks",
    price: "15000",
    instructor: "Priya Das",
    description: "Get certified in AWS Cloud Architecture. This course teaches all essential AWS services for modern DevOps workflows.",
    level: "Advanced"
  },
  {
    _id: "m6",
    title: "Mobile App Development",
    subject: "Mobile",
    duration: "10 Weeks",
    price: "11000",
    instructor: "Nitin Verma",
    description: "Master Flutter and Dart to build cross-platform apps. Complete training for both Android and iOS markets.",
    level: "Intermediate"
  }
];

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
      
      // Try fetching from API first
      try {
        const res = await axios.get(`/api/trainings/${id}`);
        if (res.data) {
          setCourse(res.data);
        } else {
          throw new Error("Empty data");
        }
      } catch (err) {
        // Fallback to Mock Data if API fails or ID is mock ID
        const mockCourse = MOCK_MODULES.find(m => m._id === id);
        if (mockCourse) {
          setCourse(mockCourse);
        } else {
          setCourse(null);
        }
      }

      if (studentId) {
        try {
          const enrollRes = await axios.get(`/api/trainings/my-enrollments/${studentId}`);
          const enrolled = enrollRes.data.some(e => e._id === id);
          setIsEnrolled(enrolled);
        } catch (e) {
          console.log("No enrollments found");
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTrainingData();
    if (searchParams.get("action") === "enroll") {
      setIsPayModalOpen(true);
    }
  }, [fetchTrainingData, searchParams]);

  const handleEnrollClick = () => {
    const studentId = localStorage.getItem("userId");
    if (!studentId) {
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
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(`${subject} ${topic} tutorial`);
  };

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

  if (!course) return (
    <div className="td-page">
      <Header />
      <div className="td-container error-container" style={{padding: '100px 0', textAlign: 'center'}}>
        <h2>Module Not Found</h2>
        <p>Sorry, we couldn't find the training module you are looking for.</p>
        <Link to="/trainings" className="td-back-btn" style={{marginTop: '20px', display: 'inline-block', color: '#6d28d9', fontWeight: 'bold'}}>Return to Catalog</Link>
      </div>
      <Footer />
    </div>
  );

  const levelClass = `level-${course.level?.toLowerCase() || 'beginner'}`;

  return (
    <div className="td-page">
      <Header />

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
            <div className="stat-item"><FaUserTie /> {course.instructor || "Expert Trainer"}</div>
            <div className="stat-item"><FaSignal /> {course.level}</div>
          </div>
        </div>
      </section>

      <section className="td-main">
        <div className="td-container td-layout">

          <div className="td-content-col">
            <section className="td-section">
              <h2><FaCheckCircle className="sec-icon" /> Module Objectives</h2>
              <div className="td-learn-grid">
                {["Industry standards", "Hands-on projects", "Complete A-Z Mastery", "Expert support"].map((item, index) => (
                  <div className="td-learn-item" key={index}>
                    <FaCheckCircle className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="td-section">
              <div className="flex justify-between items-center mb-8">
                <h2 className="section-title"><FaLaptopCode className="sec-icon" /> Training Roadmap</h2>
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
                        { week: 4, title: "Live Projects & Deployment", description: "Capstone real-world project deployment and code reviews.", lessons: 4 }
                      ];

                  return displaySyllabus.map((item, index) => (
                    <div className="roadmap-node" key={index}>
                      <div className="roadmap-dot">
                         <div className="dot-inner"></div>
                      </div>
                      <div className={`roadmap-card ${isEnrolled ? 'clickable-card' : ''}`}
                           onClick={(e) => { e.stopPropagation(); isEnrolled && window.open(getUsefulLink(course.subject), "_blank"); }}>
                        <div className="card-header">
                          <span className="week-label">Week {item.week}</span>
                          <h4>{item.title}</h4>
                        </div>
                        <p className="card-desc">{item.description}</p>
                         <div className="card-footer">
                            <span className="lesson-info"><FaBookOpen /> {item.lessons || 4} Lessons</span>
                            {!isEnrolled && (
                                <button className="btn-syll-sm outline" onClick={(e) => { e.stopPropagation(); window.open(getVideoLink(course.subject, item.title), "_blank"); }}>
                                  <FaPlayCircle /> Preview
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
                  </div>
                </div>
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
                  <div className="info-icon"><FaCertificate /></div>
                  <div className="info-text">
                    <span className="info-label">Certificate</span>
                    <span className="info-value">Verified</span>
                  </div>
                </div>

                <div className="td-action-box" style={{marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px'}}>
                  {isEnrolled ? (
                    <>
                      <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '15px' }}>
                        <FaCheckCircle /> You are enrolled!
                      </div>
                      <Link to={`/training-assignment/${course._id}`} className="td-primary-btn full-width" style={{textAlign: 'center', display: 'block', textDecoration: 'none'}}>
                        Start Learning Course
                      </Link>
                    </>
                  ) : (
                    <>
                      <div style={{fontSize: '24px', fontWeight: '800', color: '#1e1b4b', marginBottom: '10px'}}>₹{course.price || "9,440"}</div>
                      <p style={{fontSize: '14px', color: '#64748b', marginBottom: '20px'}}>Includes lifetime access to all resources and a professional certificate.</p>
                      <button className="td-primary-btn full-width" style={{background: '#6d28d9', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', width: '100%'}} 
                              onClick={handleEnrollClick}>
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
        onSuccess={() => { setIsEnrolled(true); setIsPayModalOpen(false); }}
        training={course}
      />

      <Footer />
    </div>
  );
};

export default TrainingDetails;
