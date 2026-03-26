import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Home.css';

const Home = () => {

  useEffect(() => {
    axios.get("http://localhost:5000/api/test")
      .then(res => console.log("Backend attached:", res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-page">
      <Header />

      {/* ═══ ULTRA-PREMIUM HERO ═══ */}
      <section className="home-hero">
        <div className="home-container">
          <div className="hero-center-content reveal-in">
            <div className="hero-pill">
              <span>🚀</span> Trusted by Top Universities
            </div>
            <h1>Your Gateway to a <br/><span>Dream Career</span></h1>
            <p className="hero-subtitle">
              The ultimate Training & Placement portal. Build industry-grade skills, prepare with AI, and land your first job — all in one unified platform.
            </p>
            <div className="hero-actions centered-actions">
              <Link to="/signup" className="btn-hero-primary">Get Started for Free</Link>
              <Link to="/alljobs" className="btn-hero-outline">Explore Live Jobs</Link>
            </div>
            <div className="hero-badges centered-badges">
              <span>Free Registration</span>
              <span>Real Job Listings</span>
              <span>AI Tools Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PLACEMENT STATS STRIP ═══ */}
      <section className="stats-strip-sec">
        <div className="home-container">
          <div className="stats-strip-grid reveal-in">
            <div className="stat-item">
              <span className="stat-icon">💎</span>
              <div className="stat-content">
                <span className="stat-value">12.4 LPA</span>
                <span className="stat-label">Average Package</span>
              </div>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <span className="stat-icon">🔥</span>
              <div className="stat-content">
                <span className="stat-value">45+</span>
                <span className="stat-label">Active Drives</span>
              </div>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <span className="stat-icon">🌟</span>
              <div className="stat-content">
                <span className="stat-value">2500+</span>
                <span className="stat-label">Placed Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BENTO GRID FEATURES ═══ */}
      <section className="features-section">
        <div className="home-container">
          <div className="sec-header reveal-in">
            <span className="sec-badge">Ecosystem Features</span>
            <h2>Everything to Get You Placed</h2>
            <p>A complete ecosystem built for ambitious students — from mastering core technical skills to signing your first offer letter.</p>
          </div>

          <div className="features-grid reveal-in reveal-d1">
            <div className="feat-card">
              <div className="feat-pro-badge">Popular</div>
              <div className="feat-icon">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <h3>Skill Evolution</h3>
              <p>Master the top 1% skills with our curated bootcamps. From React to DSA, we bridge the campus-to-corporate gap.</p>
              <Link to="/trainings" className="feat-link">Explore Bootcamps →</Link>
            </div>

            <div className="feat-card feat-card--purple">
              <div className="feat-icon">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>Job Central</h3>
              <p>Instant access to high-impact drives. Track your entire recruitment lifecycle from one unified command center.</p>
              <Link to="/alljobs" className="feat-link">Browse Jobs →</Link>
            </div>

            <div className="feat-card">
              <div className="feat-pro-badge">AI Powered</div>
              <div className="feat-icon">
                <i className="fa-solid fa-code-merge"></i>
              </div>
              <h3>Resume Intelligence</h3>
              <p>Get your resume scored against industry benchmarks and receive real-time feedback for perfection.</p>
              <Link to="/resume-intelligence" className="feat-link">Check Score →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIVE JOBS ═══ */}
      <section className="featured-jobs-sec">
        <div className="home-container">
          <div className="sec-header reveal-in">
            <span className="sec-badge">Live Opportunities</span>
            <h2>Highly Requested Drives</h2>
            <p>Premium tier companies are actively shortlisting students right now.</p>
          </div>
          <div className="jobs-board-grid reveal-in reveal-d1">
            {[
              { company: "Google", role: "SDE Intern", location: "Hyderabad", salary: "18-25 LPA", tag: "New Listing", color: "#4285F4" },
              { company: "Amazon", role: "Cloud Support", location: "Bangalore", salary: "15-20 LPA", tag: "Hot Drive", color: "#FF9900" },
              { company: "Microsoft", role: "Frontend Dev", location: "Remote", salary: "12-18 LPA", tag: "Premium", color: "#00A4EF" }
            ].map((j, i) => (
              <div key={i} className="home-job-card">
                <div className="hjc-top">
                  <div className="hjc-logo-alt" style={{borderColor: j.color, color: j.color}}>{j.company[0]}</div>
                  <span className={`hjc-tag ${j.tag === 'Hot Drive' ? 'hjc-hot' : 'hjc-new'}`}>{j.tag}</span>
                </div>
                <h3>{j.role}</h3>
                <p className="hjc-company">{j.company} India</p>
                <div className="hjc-details">
                  <span>📍 {j.location}</span>
                  <span>💰 {j.salary}</span>
                </div>
                <Link to="/alljobs" className="hjc-btn">View Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECRUITER SHOWCASE ═══ */}
      <section className="recruiter-sec">
        <div className="home-container">
          <div className="sec-header reveal-in">
            <span className="sec-badge">Trust & Authority</span>
            <h2>Top Hiring Partners</h2>
          </div>
          <div className="recruiter-marquee">
            <div className="marquee-content">
              {['Google', 'Amazon', 'Microsoft', 'Adobe', 'Meta', 'Netflix', 'Tesla', 'Apple'].map((c, i) => (
                <div key={i} className="recruiter-logo">
                  <span>{c}</span>
                </div>
              ))}
              {/* Duplicate for infinite effect */}
              {['Google', 'Amazon', 'Microsoft', 'Adobe', 'Meta', 'Netflix', 'Tesla', 'Apple'].map((c, i) => (
                <div key={i+'d'} className="recruiter-logo">
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="testimonial-sec">
        <div className="home-container">
          <div className="sec-header reveal-in">
            <span className="sec-badge">Success Stories</span>
            <h2>Words from our Alumni</h2>
          </div>
          <div className="testi-grid reveal-in reveal-d1">
            {[
              { name: "Rahul Sharma", company: "Google", text: "The T&P Portal's AI tools were a game changer. The mock interviews felt like the real deal.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
              { name: "Sneha Patel", company: "Amazon", text: "From tracking applications to mastering DSA, everything I needed was in one place. Truly elite.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
              { name: "Vikram Singh", company: "Microsoft", text: "The expert bootcamps bridged the gap between my college syllabus and industry requirements.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" }
            ].map((t, i) => (
              <div key={i} className="testi-card">
                <div className="testi-quote">"</div>
                <p>{t.text}</p>
                <div className="testi-author">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <h4>{t.name}</h4>
                    <span>Placed at {t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE PROCESS ═══ */}
      <section className="steps-section">
        <div className="home-container">
          <div className="sec-header reveal-in">
            <span className="sec-badge">Your Journey</span>
            <h2>From Campus to Corporate</h2>
          </div>
          <div className="steps-row reveal-in reveal-d1">
            {[
              { title: 'Register', desc: 'Create your elite profile' },
              { title: 'Skill Up', desc: 'Master top technologies' },
              { title: 'AI Prep', desc: 'Refine with AI mock tools' },
              { title: 'Get Offers', desc: 'Sign your dream deal' }
            ].map((s, i) => (
              <div className="step-box" key={i}>
                <div className="step-num">0{i+1}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GRAND CTA ═══ */}
      <section className="cta-section">
        <div className="home-container">
          <div className="cta-inner reveal-in">
            <h2>Your Career Break is Waiting</h2>
            <p>Join thousands of successful alumni. Shape your future today.</p>
            <Link to="/signup" className="btn-cta-primary">Create Free Account</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;