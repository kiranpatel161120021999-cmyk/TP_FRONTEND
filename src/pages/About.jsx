import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/About.css";

const AboutUs = () => {
  return (
    <div className="about-page">

      <Header />

      {/* ── ELITE MESH HERO ── */}
      <section className="ab-hero">
        <div className="ab-container ab-hero-inner reveal-in">
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
      </section>

      {/* ── STATS STRIP ── */}
      <section className="ab-stats-wrap">
        <div className="ab-container">
          <div className="ab-stats reveal-in">
            <div className="ab-stat"><h3>500+</h3><p>Students Placed</p></div>
            <div className="ab-stat-separator"></div>
            <div className="ab-stat"><h3>120+</h3><p>Hiring Partners</p></div>
            <div className="ab-stat-separator"></div>
            <div className="ab-stat"><h3>12+</h3><p>Years of Excellence</p></div>
            <div className="ab-stat-separator"></div>
            <div className="ab-stat"><h3>98%</h3><p>Success Rate</p></div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="ab-section ab-mv-section">
        <div className="ab-container">
          <div className="ab-sec-header reveal-in">
            <span className="ab-sec-badge">Our Foundation</span>
            <h2>Mission &amp; Vision</h2>
            <p>Driving continuous innovation in student placement and training methodologies.</p>
          </div>
          <div className="ab-mv-grid">
            <div className="ab-mv-card reveal-in reveal-d1">
              <div className="ab-mv-icon" style={{background:'#f5f3ff', color:'#6d28d9'}}>
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p>To provide 100% placement assistance and groom students into globally competent professionals through structured training, mentorship, and industry exposure.</p>
              <ul className="ab-check-list">
                <li><span>✓</span> Structured training programs</li>
                <li><span>✓</span> Industry-relevant curriculum</li>
                <li><span>✓</span> Dedicated placement support</li>
              </ul>
            </div>
            
            <div className="ab-mv-card ab-mv-card--accent reveal-in reveal-d2">
              <div className="ab-mv-icon" style={{background:'rgba(255,255,255,0.15)', color:'white'}}>
                <i className="fa-regular fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>To be a center of excellence in training and placement, fostering strong industry linkages that transform students into confident, capable, and career-ready professionals.</p>
              <ul className="ab-check-list ab-check-list--white">
                <li><span>✓</span> Industry-academia partnerships</li>
                <li><span>✓</span> Global career readiness</li>
                <li><span>✓</span> Lifelong alumni network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER ── */}
      <section className="ab-quote-banner">
        <div className="ab-container">
          <div className="ab-quote-inner reveal-in">
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
          <div className="ab-sec-header reveal-in">
            <span className="ab-sec-badge">Our Focus</span>
            <h2>What We Do</h2>
            <p>Core pillars that drive student success at every stage of their academic journey.</p>
          </div>
          <div className="ab-val-grid">
            {[
              { icon: 'fa-laptop-code', title: 'Skill Development', desc: 'Technical workshops, coding bootcamps, and soft skill sessions tailored to industry needs.', color: 'purple' },
              { icon: 'fa-handshake', title: 'Campus Recruitment', desc: 'Hosting top MNCs and startups for exclusive on-campus hiring drives every semester.', color: 'blue' },
              { icon: 'fa-network-wired', title: 'Industry Connect', desc: 'Seminars, guest lectures, and industrial visits to give students real-world exposure.', color: 'emerald' },
              { icon: 'fa-robot', title: 'AI-Powered Tools', desc: 'Resume Intelligence and Mock Interview tools to sharpen your competitive edge.', color: 'amber' },
              { icon: 'fa-certificate', title: 'Certifications', desc: 'Earn verified training certificates recognized by leading industry partners.', color: 'rose' },
              { icon: 'fa-users', title: 'Alumni Network', desc: 'Stay connected with 500+ alumni placed across top companies worldwide.', color: 'purple' }
            ].map((v, i) => (
              <div className="ab-val-card reveal-in" key={i} style={{animationDelay: `${i * 0.1}s`}}>
                <div className={`ab-val-icon bg-${v.color}`}>
                  <i className={`fa-solid ${v.icon}`}></i>
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPAL MESSAGE ── */}
      <section className="ab-section ab-principal-section">
        <div className="ab-container">
          <div className="ab-sec-header reveal-in">
            <span className="ab-sec-badge">Leadership</span>
            <h2>Message from the Director</h2>
          </div>
          <div className="ab-principal-card reveal-in">
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
          <div className="ab-sec-header reveal-in">
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
              <div className="ab-team-card reveal-in" key={i} style={{animationDelay: `${i * 0.1}s`}}>
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
