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
    <>
      <Header />

      {/* ===== PAGE HEADER ===== */}
      <section className="contact-page-header">
        <h1>Contact Us</h1>
        <p>Have questions? We're here to help you anytime.</p>
      </section>

      {/* ===== CONTACT BOX ===== */}
      <section className="container">
        <div className="contact-wrapper">

          {/* LEFT */}
          <div className="contact-info">
            <h3>Get In Touch</h3>

            <div className="info-box">
              <div className="icon-circle">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <h4>Our Location</h4>
                <p>CHARUSAT, Anand, Gujarat</p>
              </div>
            </div>

            <div className="info-box">
              <div className="icon-circle">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <h4>Phone Number</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-box">
              <div className="icon-circle">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <h4>Email Address</h4>
                <p>placement@charusat.ac.in</p>
              </div>
            </div>

            <div className="info-box">
              <div className="icon-circle">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <h4>Working Hours</h4>
                <p>Mon – Fri: 9:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <p>Fill the form and our team will get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit}>
              <input className="form-control" placeholder="Full Name" required />
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
                required
              />
              <input className="form-control" placeholder="Subject" required />
              <textarea
                className="form-control"
                placeholder="Message"
                required
              ></textarea>

              <button className="btn-submit">
                Send Message <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ===== MAP ===== */}
      <div className="map-section">
        <iframe
          title="CHARUSAT"
          src="https://www.google.com/maps?q=CHARUSAT&output=embed"
          loading="lazy"
        ></iframe>
      </div>

      {/* ===== POPUP ===== */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <i className="fa-solid fa-circle-check popup-icon"></i>
            <h2>Message Sent!</h2>
            <p>Thank you for contacting us.</p>
            <button
              className="popup-btn"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Contact;
