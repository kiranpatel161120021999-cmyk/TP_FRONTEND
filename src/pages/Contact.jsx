import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/Contact.css";

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    e.target.reset();
  };

  return (
    <div className="contact-page">
      <Header />

      {/* ── ELITE MESH HERO ── */}
      <section className="contact-hero">
        <div className="contact-container contact-hero-content reveal-in">
          <span className="contact-badge"><i className="fa-solid fa-headset"></i> Support</span>
          <h1>Get in <span>Touch</span></h1>
          <p>Whether you have a question about placements, bootcamps, or partnerships, our team is ready to help you thrive.</p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="contact-main-sec">
        <div className="contact-container">
          <div className="contact-wrapper reveal-in">
            
            {/* LEFT INFO */}
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p className="info-sub">Reach out to us directly through any of these channels.</p>

              <div className="info-box border-bottom">
                <div className="icon-circle"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <h4>Campus Location</h4>
                  <p>CHARUSAT University Campus, Anand, Gujarat - 388421</p>
                </div>
              </div>

              <div className="info-box border-bottom">
                <div className="icon-circle"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <h4>Mon - Fri Hotline</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="info-box">
                <div className="icon-circle"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <h4>Official Email</h4>
                  <p>placement@charusat.ac.in</p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="contact-form">
              <h3>Send a Message</h3>
              <p className="form-sub">We usually respond within 24 hours.</p>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-control" placeholder="Rahul Sharma" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input className="form-control" type="email" placeholder="rahul@collage.edu" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Subject</label>
                  <input className="form-control" placeholder="How can we help?" required />
                </div>
                
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-control" placeholder="Write your message here..." required></textarea>
                </div>

                <button className="btn-submit">
                  Send Message <i className="fa-solid fa-paper-plane" style={{marginLeft:'8px'}}></i>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <div className="map-section reveal-in">
        <iframe
          title="CHARUSAT"
          src="https://www.google.com/maps?q=CHARUSAT&output=embed"
          loading="lazy"
        ></iframe>
      </div>

      {/* ── POPUP ── */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={e => e.stopPropagation()}>
            <i className="fa-solid fa-circle-check popup-icon"></i>
            <h2>Message Sent!</h2>
            <p>Thank you for reaching out. We will get back to you shortly.</p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Contact;
