import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaGraduationCap, FaCalendarAlt, FaChartLine, FaCheckCircle, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../style/StudentDashboard.css"; // Reuse dashboard styles for consistency

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const email = userInfo?.email;
        if (email) {
          const res = await axios.get(`http://localhost:5000/api/students/profile/${email}`);
          setUser(res.data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="loader-container" style={{height: '100vh'}}>
        <div className="loader-spin"></div>
        <p>Loading Profile...</p>
      </div>
    );
  }

  const userInitials = user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "VU";

  return (
    <div className="profile-page-wrapper animate-in" style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button 
        onClick={() => navigate(-1)} 
        className="back-btn-pro" 
        style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#6d28d9', fontWeight: 600, cursor: 'pointer' }}
      >
        <FaChevronLeft /> Back to Previous Page
      </button>

      <div className="page-header" style={{ marginBottom: "30px" }}>
        <div className="header-info">
          <h2 style={{ fontSize: '32px', color: '#1e1b4b' }}>My Academic Identity</h2>
          <p style={{ color: '#64748b' }}>Verified student credentials for placement excellence.</p>
        </div>
      </div>

      <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        <div className="data-card profile-main-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="profile-banner-pro" style={{ height: '120px', background: 'linear-gradient(135deg, #6d28d9 0%, #1e1b4b 100%)' }}>
             <div className="banner-badge" style={{ position: 'absolute', top: '20px', right: '20px' }}>
               Student ID: {user?.id || "STU-882"}
             </div>
          </div>
          
          <div className="profile-info-content" style={{ padding: '0 40px 40px', position: 'relative', marginTop: '-60px' }}>
            <div className="profile-avatar-large" style={{ width: '120px', height: '120px', fontSize: '42px', border: '6px solid #fff' }}>{userInitials}</div>
            
            <div className="profile-header-text" style={{ marginTop: '20px' }}>
               <h2 style={{ fontSize: '28px', marginBottom: '4px' }}>{user?.name || "Verified Student"}</h2>
               <p className="profile-sub" style={{ opacity: 0.7 }}>
                 {user?.course || "Academic Program"} | {user?.branch || "General Branch"} | Batch {user?.batch || "2025"}
               </p>
            </div>

            <div className="profile-details-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '24px', 
              marginTop: '40px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '30px'
            }}>
              <div className="detail-box">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</label>
                <p style={{ fontWeight: 600, color: '#1e293b' }}>{user?.email || "student@example.com"}</p>
              </div>
              <div className="detail-box">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Mobile Number</label>
                <p style={{ fontWeight: 600, color: '#1e293b' }}>{user?.con_no || "+91 XXXXX XXXXX"}</p>
              </div>
              <div className="detail-box">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Current CGPA</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <p style={{ fontWeight: 800, color: '#6d28d9', fontSize: '18px' }}>{user?.cgpa || "8.5"}</p>
                   <span style={{ fontSize: '12px', color: '#64748b' }}>/ 10.0</span>
                </div>
              </div>
              <div className="detail-box">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Placement Status</label>
                <span className={`status-pill ${user?.placed ? 'completed' : 'active'}`} style={{ display: 'inline-flex' }}>
                   <span className="s-dot"></span> {user?.placed ? "Placed 🎉" : "Actively Seeking"}
                </span>
              </div>
            </div>

            <div className="profile-skills-sec" style={{ marginTop: '40px' }}>
               <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '15px' }}>Technical Expertise</label>
               <div className="skills-row-pro">
                  {(user?.skills_text || "React.js, Node.js, Python, AWS, SQL").split(",").map((s, i) => (
                    <span key={i} className="skill-tag" style={{ background: '#f5f3ff', color: '#6d28d9', padding: '6px 14px', borderRadius: '20px', fontWeight: 600, fontSize: '13px' }}>{s.trim()}</span>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="data-card" style={{ padding: '30px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <FaCheckCircle style={{ color: '#10b981' }} /> Placement Readiness
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
             <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>92%</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Profile Completion</div>
             </div>
             <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>12</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Jobs Applied</div>
             </div>
             <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>04</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Interviews Done</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;