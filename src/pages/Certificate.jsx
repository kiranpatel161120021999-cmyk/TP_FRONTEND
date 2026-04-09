import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaAward, FaGraduationCap, FaDownload, FaPrint, FaArrowLeft } from "react-icons/fa";
import "../style/Certificate.css";

const Certificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [userName, setUserName] = useState("Verified Student");
  const [certId] = useState(() => Math.random().toString(36).substring(7).toUpperCase());

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/trainings/${id}`);
        setCourse(res.data);
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        if (userInfo.name) setUserName(userInfo.name);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-page">
      <div className="cert-actions no-print">
         <button onClick={() => navigate(-1)} className="cert-btn-back"><FaArrowLeft /> Back</button>
         <button onClick={handlePrint} className="cert-btn-print"><FaPrint /> Print / Save as PDF</button>
      </div>

      <div className="certificate-container">
        <div className="cert-border-outer">
          <div className="cert-border-inner">
            <div className="cert-content">
              <div className="cert-header">
                <div className="cert-logo">🎓 T&P PORTAL</div>
                <div className="cert-badge">
                  <FaAward />
                </div>
              </div>

              <div className="cert-main">
                <h1 className="cert-title">CERTIFICATE</h1>
                <p className="cert-subtitle">OF COMPLETION</p>
                
                <div className="cert-awarded-to">
                  <span>This certificate is proudly presented to</span>
                  <h2>{userName}</h2>
                </div>

                <div className="cert-course-info">
                  <p>for successfully completing the industry-standard training module</p>
                  <h3>{course?.title || "Professional Training Module"}</h3>
                  <p>delivered by T&P Portal in collaboration with industry experts.</p>
                </div>
              </div>

              <div className="cert-footer">
                <div className="cert-sig-box">
                  <div className="sig-line"></div>
                  <span className="sig-label">Training Coordinator</span>
                </div>

                <div className="cert-stamp">
                   <FaGraduationCap />
                   <span>VERIFIED</span>
                </div>

                <div className="cert-sig-box">
                  <div className="sig-line"></div>
                  <span className="sig-label">Industrial Partner</span>
                </div>
              </div>

              <div className="cert-id-tag">
                 Certificate ID: TP-{id?.substring(0,6).toUpperCase()}-{certId}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
