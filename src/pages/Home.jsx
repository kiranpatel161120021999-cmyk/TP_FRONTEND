import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/home.css';

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

          <div className="mockup-container reveal-in reveal-d1">
            <div className="hero-card-float hcf-1">
              <div className="hcf-icon">📈</div>
              <div>
                <strong>98% Success</strong>
                <p>Placement Accuracy</p>
              </div>
            </div>
            
            <div className="dashboard-mockup">
              <div style={{display:'flex', height:'100%'}}>
                <div className="mock-content">
                  <div style={{width:'150px',height:'20px',background:'#e2e8f0',marginBottom:'30px',borderRadius:'4px'}}></div>
                  <div className="mock-grid">
                    <div className="mock-card" style={{display:'flex',padding:'15px',gap:'10px',alignItems:'center'}}>
                       <div style={{width:'40px',height:'40px',borderRadius:'8px',background:'#f1f5f9'}}></div>
                       <div style={{flex:1}}><div style={{width:'80%',height:'8px',background:'#f1f5f9',marginBottom:'6px'}}></div><div style={{width:'50%',height:'8px',background:'#f1f5f9'}}></div></div>
                    </div>
                    <div className="mock-card" style={{display:'flex',padding:'15px',gap:'10px',alignItems:'center'}}>
                       <div style={{width:'40px',height:'40px',borderRadius:'8px',background:'#f1f5f9'}}></div>
                       <div style={{flex:1}}><div style={{width:'80%',height:'8px',background:'#f1f5f9',marginBottom:'6px'}}></div><div style={{width:'50%',height:'8px',background:'#f1f5f9'}}></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-card-float hcf-2">
              <div className="hcf-icon">🏆</div>
              <div>
                <strong>Global Reach</strong>
                <p>500+ Hiring Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BENTO GRID FEATURES ═══ */}
      <section className="features-section">
        <div className="home-container">
          <div className="sec-header reveal-in">
            <span className="sec-badge">What We Offer</span>
            <h2>Everything to Get You Placed</h2>
            <p>A complete ecosystem built for ambitious students — from mastering core technical skills to signing your first offer letter.</p>
          </div>

          <div className="features-grid reveal-in reveal-d1">
            <div className="feat-card">
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
              <div className="feat-icon">
                <i className="fa-solid fa-code-merge"></i>
              </div>
              <h3>AI Intelligence</h3>
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

      {/* ═══ THE PROCESS ═══ */}
      <section className="steps-section">
        <div className="home-container">
          <div className="sec-header reveal-in">
            <span className="sec-badge">Your Journey</span>
            <h2>From Campus to Corporate</h2>
          </div>
          <div className="steps-row reveal-in reveal-d1">
            {['Register', 'Skill Up', 'AI Prep', 'Get Offers'].map((s, i) => (
              <div className="step-box" key={i}>
                <div className="step-num">0{i+1}</div>
                <h4>{s}</h4>
                <p>Simple and seamless transition to industry.</p>
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