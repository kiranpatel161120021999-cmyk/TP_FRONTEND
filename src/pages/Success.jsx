import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaBookOpen, FaChartLine, FaHome } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/Success.css";

const Success = () => {
  const { id } = useParams();
  const _navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [refId] = useState(() => Math.random().toString(36).substring(7).toUpperCase());

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/trainings/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchCourse();
  }, [id]);

  return (
    <div className="success-page">
      <Header />
      
      <main className="success-container">
        <div className="confetti-wrapper">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>

        <div className="success-card reveal-in">
          <div className="success-icon-wrapper">
            <FaCheckCircle className="main-success-icon" />
          </div>
          
          <h1 className="success-title">Admission Confirmed!</h1>
          <p className="success-subtitle">
            Welcome to the elite learning circle. Your access to <strong>{course?.title || "your module"}</strong> is now active.
          </p>

          <div className="success-details receipt-style">
            <div className="receipt-header">Transaction Receipt</div>
            <div className="detail-item">
              <span className="label">Course Name</span>
              <span className="value">{course?.title}</span>
            </div>
            <div className="detail-item">
              <span className="label">Amount Paid</span>
              <span className="value">₹{(Number(course?.price) + Math.round(Number(course?.price) * 0.18)).toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="label">Payment Status</span>
              <span className="value status-active">SUCCESS</span>
            </div>
            <div className="detail-item">
              <span className="label">Timestamp</span>
              <span className="value">{new Date().toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="label">Ref ID</span>
              <span className="value font-mono">ADMIT-{refId}</span>
            </div>
            <div className="receipt-footer">
               <div className="signature-box">
                  <span className="signature">Digitally Verified</span>
               </div>
            </div>
          </div>

          <div className="success-actions">
            <Link to={`/training-assignment/${id}`} className="success-btn btn-primary-glow">
              <FaBookOpen /> Start Learning Now
            </Link>
            <div className="success-secondary-actions">
              <Link to="/studentdashboard" className="success-btn btn-outline">
                <FaChartLine /> Dashboard
              </Link>
              <Link to="/" className="success-btn btn-outline">
                <FaHome /> Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
