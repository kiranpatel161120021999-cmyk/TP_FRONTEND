import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/About.css";

const AboutUs = () => {
  return (
    <div className="about-page">

      <Header />

      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="ab-container ab-hero-inner">
          <span className="ab-badge">🏫 Who We Are</span>
          <h1>Empowering Students to<br /><span>Achieve Excellence</span></h1>
          <p>
            The Training &amp; Placement Cell is the backbone of our institute —
            dedicated to bridging the gap between academia and industry,
            one student at a time.
          </p>
          <div className="ab-hero-btns">
            <a href="#team" className="ab-btn-primary">Meet Our Team</a>
            <Link to="/contact" className="ab-btn-outline">Contact Us →</Link>
          </div>
        </div>
        <div className="ab-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="ab-stats-wrap">
        <div className="ab-container">
          <div className="ab-stats">
            <div className="ab-stat"><h3>500+</h3><p>Students Placed</p></div>
            <div className="ab-stat"><h3>120+</h3><p>Hiring Partners</p></div>
            <div className="ab-stat"><h3>12+</h3><p>Years of Excellence</p></div>
            <div className="ab-stat"><h3>98%</h3><p>Success Rate</p></div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="ab-section ab-mv-section">
        <div className="ab-container">
          <div className="ab-sec-header">
            <span className="ab-sec-badge">Our Foundation</span>
            <h2>Mission &amp; Vision</h2>
          </div>
          <div className="ab-mv-grid">
            <div className="ab-mv-card">
              <div className="ab-mv-icon" style={{background:'#f5f3ff', color:'#6d28d9'}}>
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p>To provide 100% placement assistance and groom students into globally competent professionals through structured training, mentorship, and industry exposure.</p>
              <ul className="ab-check-list">
                <li>✅ Structured training programs</li>
                <li>✅ Industry-relevant curriculum</li>
                <li>✅ Dedicated placement support</li>
              </ul>
            </div>
            <div className="ab-mv-card ab-mv-card--accent">
              <div className="ab-mv-icon" style={{background:'rgba(255,255,255,0.2)', color:'white'}}>
                <i className="fa-regular fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>To be a center of excellence in training and placement, fostering strong industry linkages that transform students into confident, capable, and career-ready professionals.</p>
              <ul className="ab-check-list ab-check-list--white">
                <li>✅ Industry-academia partnerships</li>
                <li>✅ Global career readiness</li>
                <li>✅ Lifelong alumni network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER ── */}
      <section className="ab-quote-banner">
        <div className="ab-container">
          <div className="ab-quote-inner">
            <span className="ab-quote-mark">"</span>
            <h2>Quality is not an act, it is a habit.</h2>
            <p>We strive for quality in every aspect of our training &amp; placement process.</p>
            <span className="ab-quote-attr">— T&amp;P Cell Philosophy</span>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="ab-section ab-values-section">
        <div className="ab-container">
          <div className="ab-sec-header">
            <span className="ab-sec-badge">Our Focus</span>
            <h2>What We Do</h2>
            <p>Core pillars that drive student success at every stage.</p>
          </div>
          <div className="ab-val-grid">
            <div className="ab-val-card">
              <div className="ab-val-icon" style={{background:'#f5f3ff', color:'#6d28d9'}}>
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3>Skill Development</h3>
              <p>Technical workshops, coding bootcamps, and soft skill sessions tailored to industry needs.</p>
            </div>
            <div className="ab-val-card">
              <div className="ab-val-icon" style={{background:'#e0f2fe', color:'#0284c7'}}>
                <i className="fa-solid fa-handshake"></i>
              </div>
              <h3>Campus Recruitment</h3>
              <p>Hosting top MNCs and startups for exclusive on-campus hiring drives every semester.</p>
            </div>
            <div className="ab-val-card">
              <div className="ab-val-icon" style={{background:'#d1fae5', color:'#059669'}}>
                <i className="fa-solid fa-network-wired"></i>
              </div>
              <h3>Industry Connect</h3>
              <p>Seminars, guest lectures, and industrial visits to give students real-world exposure.</p>
            </div>
            <div className="ab-val-card">
              <div className="ab-val-icon" style={{background:'#fef3c7', color:'#d97706'}}>
                <i className="fa-solid fa-robot"></i>
              </div>
              <h3>AI-Powered Tools</h3>
              <p>Resume Intelligence and Mock Interview tools to sharpen your competitive edge.</p>
            </div>
            <div className="ab-val-card">
              <div className="ab-val-icon" style={{background:'#fee2e2', color:'#dc2626'}}>
                <i className="fa-solid fa-certificate"></i>
              </div>
              <h3>Certifications</h3>
              <p>Earn verified training certificates recognized by leading industry partners.</p>
            </div>
            <div className="ab-val-card">
              <div className="ab-val-icon" style={{background:'#ede9fe', color:'#7c3aed'}}>
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Alumni Network</h3>
              <p>Stay connected with 500+ alumni placed across top companies worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPAL MESSAGE ── */}
      <section className="ab-section ab-principal-section">
        <div className="ab-container">
          <div className="ab-sec-header">
            <span className="ab-sec-badge">Leadership</span>
            <h2>Message from the Director</h2>
          </div>
          <div className="ab-principal-card">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
              alt="Principal"
              className="ab-principal-img"
            />
            <div className="ab-principal-body">
              <div className="ab-quote-decor">"</div>
              <p className="ab-principal-quote">
                Our goal is not just to place students in jobs, but to prepare them for life. 
                We believe every student has unique potential, and our mission is to unlock it 
                through the right training, mentorship, and opportunities.
              </p>
              <h4>Dr. Arvind Kumar</h4>
              <span>Principal / Director</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="ab-section ab-team-section" id="team">
        <div className="ab-container">
          <div className="ab-sec-header">
            <span className="ab-sec-badge">The People</span>
            <h2>Meet Our Team</h2>
            <p>The passionate people behind every placement success story.</p>
          </div>
          <div className="ab-team-grid">
            {[
              { name:'Khushi Patel',     role:'Placement Officer',  img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400' },
              { name:'Mr. Rohan Das',    role:'Training Head',      img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400' },
              { name:'Ms. Priya Kapoor', role:'Coordinator',        img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400' },
              { name:'Mr. Vikram Malhotra', role:'Industry Relations', img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400' },
            ].map((m, i) => (
              <div className="ab-team-card" key={i}>
                <div className="ab-team-img-wrap">
                  <img src={m.img} alt={m.name} />
                </div>
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
