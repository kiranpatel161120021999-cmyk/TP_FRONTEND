import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { 
  FileText, Upload, Trash2, RefreshCcw, Search, CheckCircle, 
  XCircle, Loader2, Users, Building, Briefcase, PieChart, 
  Plus, Edit, Eye, Trash, LogOut, ChevronRight
} from 'lucide-react';
import { FaChartPie, FaUsers, FaBuilding, FaBriefcase, FaSignOutAlt, FaPlus, FaSearch } from "react-icons/fa";
import "../style/StudentDashboard.css"; 

function AdminDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTraining, setCurrentTraining] = useState({
    title: "", subject: "", description: "", duration: "", 
    startDate: "", price: "", language: "English", level: "Beginner"
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [stud, comp, train, pdfRes] = await Promise.all([
        axios.get("http://localhost:5000/api/students"),
        axios.get("http://localhost:5000/api/companies"),
        axios.get("http://localhost:5000/api/trainings"),
        axios.get("http://localhost:5000/api/syllabus")
      ]);
      setStudents(stud.data || []);
      setCompanies(comp.data || []);
      setTrainings(train.data || []);
      setPdfs(pdfRes.data || []);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to sync live data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveTraining = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Saving training...");
    try {
      const payload = { ...currentTraining, price: Number(currentTraining.price) };
      const res = await axios.post("http://localhost:5000/api/trainings/save", payload);
      if (currentTraining._id) {
        setTrainings(trainings.map(t => t._id === res.data._id ? res.data : t));
        toast.success("Training updated!", { id: loadingToast });
      } else {
        setTrainings([...trainings, res.data]);
        toast.success("New module launched!", { id: loadingToast });
      }
      setIsModalOpen(false);
      setCurrentTraining({ title: "", subject: "", description: "", duration: "", startDate: "", price: "", language: "English", level: "Beginner" });
    } catch {
      toast.error("Process failed", { id: loadingToast });
    }
  };

  const handleDeleteTraining = async (id) => {
    if (!window.confirm("Delete this training module permanently?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/trainings/${id}`);
      setTrainings(trainings.filter(t => t._id !== id));
      toast.success("Module removed");
    } catch {
      toast.error("Deletion failed");
    }
  };

  const handleUploadSyllabus = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setUploading(true);
    const loadingToast = toast.loading("Uploading Syllabus...");
    try {
      const res = await axios.post("http://localhost:5000/api/syllabus/upload", formData);
      setPdfs([res.data.data, ...pdfs]);
      toast.success("Syllabus added!", { id: loadingToast });
      e.target.reset();
    } catch {
      toast.error("Upload failed", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePdf = async (id) => {
    if (!window.confirm("Delete this syllabus?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/syllabus/${id}`);
      setPdfs(pdfs.filter(p => p._id !== id));
      toast.success("Syllabus removed");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const renderDashboard = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>Executive Dashboard</h2>
          <p>Global Training & Placement Overview</p>
        </div>
        <button onClick={loadData} className="primary-outline-btn" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCcw size={16}/> Sync
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="data-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
           <div style={{ padding: '16px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '16px', display: 'flex' }}><Users size={24} /></div>
           <div>
             <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Students</p>
             <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--tp-dark)' }}>{students.length.toString().padStart(2, '0')}</h3>
           </div>
        </div>
        <div className="data-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
           <div style={{ padding: '16px', background: '#dbeafe', color: '#2563eb', borderRadius: '16px', display: 'flex' }}><Building size={24} /></div>
           <div>
             <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Partners</p>
             <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--tp-dark)' }}>{companies.length.toString().padStart(2, '0')}</h3>
           </div>
        </div>
        <div className="data-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
           <div style={{ padding: '16px', background: '#dcfce7', color: '#16a34a', borderRadius: '16px', display: 'flex' }}><Briefcase size={24} /></div>
           <div>
             <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Training</p>
             <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--tp-dark)' }}>{trainings.length.toString().padStart(2, '0')}</h3>
           </div>
        </div>
        <div className="data-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
           <div style={{ padding: '16px', background: '#fef3c7', color: '#d97706', borderRadius: '16px', display: 'flex' }}><FileText size={24} /></div>
           <div>
             <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Syllabus Docs</p>
             <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--tp-dark)' }}>{pdfs.length.toString().padStart(2, '0')}</h3>
           </div>
        </div>
      </div>

      <div className="data-card table-card-pro">
        <h3 style={{ padding: '20px 24px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Plus size={18} color="var(--tp-primary)" /> Recent Enrollments
        </h3>
        <table className="modern-pro-table">
          <thead>
            <tr>
              <th>Student Details</th>
              <th>Platform Email</th>
              <th style={{ textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.slice(0, 5).map((s, i) => (
              <tr key={i}>
                <td>
                  <div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="cell-logo" style={{ minWidth: '40px', height: '40px', borderRadius: '10px', background: 'var(--tp-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {s.name[0]}
                    </div>
                    <strong>{s.name}</strong>
                  </div>
                </td>
                <td><span className="role-text">{s.email}</span></td>
                <td style={{ textAlign: 'right' }}><div className="status-pill selected" style={{ display: 'inline-flex' }}>Active</div></td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="3">
                  <div className="empty-table-msg">
                    <Users />
                    <p>No enrollments processed.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTrainings = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>Course Management</h2>
          <p>Deploy standard training modules to students.</p>
        </div>
        <button 
          onClick={() => { setIsModalOpen(true); setCurrentTraining({ title: "", subject: "", description: "", duration: "", startDate: "", price: "", language: "", level: "Beginner" }); }}
          className="primary-btn-pro" style={{ width: 'auto' }}
        >
          <FaPlus /> Launch Module
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {trainings.map(t => (
          <div key={t._id} className="data-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
               <span style={{ padding: '6px 12px', background: 'var(--tp-surface)', color: 'var(--tp-primary)', borderRadius: '8px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                 {t.subject}
               </span>
               <div style={{ display: 'flex', gap: '8px' }}>
                 <button onClick={() => { setIsModalOpen(true); setCurrentTraining(t); }} className="primary-outline-btn" style={{ padding: '8px', width: 'auto' }}><Edit size={14} /></button>
                 <button onClick={() => handleDeleteTraining(t._id)} className="primary-outline-btn" style={{ padding: '8px', width: 'auto', border: '1px solid #fee2e2', color: '#ef4444' }}><Trash size={14} /></button>
               </div>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--tp-dark)', marginBottom: '8px' }}>{t.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--tp-muted)', marginBottom: '20px', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--tp-border)' }}>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <span style={{ fontSize: '12px', color: 'var(--tp-muted)' }}>Duration</span>
                 <span style={{ fontWeight: '700', color: 'var(--tp-dark)' }}>{t.duration}</span>
               </div>
               <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--tp-primary)' }}>₹{t.price}</div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="data-card animate-fade" style={{ width: '100%', maxWidth: '700px', padding: '40px' }}>
             <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--tp-dark)', marginBottom: '24px' }}>{currentTraining._id ? "Update Course" : "Create New Module"}</h2>
             <form onSubmit={handleSaveTraining} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input placeholder="Course Title" value={currentTraining.title} onChange={e => setCurrentTraining({...currentTraining, title: e.target.value})} required style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none', width: '100%' }} />
                <input placeholder="Subject (e.g. Java)" value={currentTraining.subject} onChange={e => setCurrentTraining({...currentTraining, subject: e.target.value})} required style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none', width: '100%' }} />
                <textarea placeholder="Brief Description" value={currentTraining.description} onChange={e => setCurrentTraining({...currentTraining, description: e.target.value})} style={{ gridColumn: '1 / -1', padding: '16px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none', minHeight: '100px', fontFamily: 'inherit', width: '100%' }} />
                <input placeholder="Duration (e.g. 6 Weeks)" value={currentTraining.duration} onChange={e => setCurrentTraining({...currentTraining, duration: e.target.value})} style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none', width: '100%' }} />
                <input placeholder="Price (₹)" type="number" value={currentTraining.price} onChange={e => setCurrentTraining({...currentTraining, price: e.target.value})} style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none', width: '100%' }} />
                <input placeholder="Language (e.g. Hindi, English)" value={currentTraining.language || ""} onChange={e => setCurrentTraining({...currentTraining, language: e.target.value})} style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none', width: '100%' }} />
                <select value={currentTraining.level} onChange={e => setCurrentTraining({...currentTraining, level: e.target.value})} style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none', width: '100%', background: '#fff' }}>
                   <option>Beginner</option>
                   <option>Intermediate</option>
                   <option>Advanced</option>
                </select>
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
                   <button type="button" onClick={() => setIsModalOpen(false)} className="primary-outline-btn" style={{ width: 'auto' }}>Discard</button>
                   <button type="submit" className="primary-btn-pro" style={{ width: 'auto' }}>Confirm Setup</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderSyllabusManager = () => (
    <div className="dash-body animate-in">
      <div className="data-card" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--tp-dark)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Upload color="var(--tp-primary)" /> Upload New Syllabus PDF
        </h2>
        <form onSubmit={handleUploadSyllabus} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '20px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)' }}>Syllabus Title</label>
            <input 
              name="title" 
              placeholder="e.g. Java Full Stack Syllabus" 
              required 
              style={{ padding: '14px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)' }}>Select Training</label>
            <select name="trainingId" style={{ padding: '14px', borderRadius: '12px', border: '1px solid var(--tp-border)', outline: 'none', background: '#fff' }}>
              <option value="">General Syllabus</option>
              {trainings.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)' }}>PDF File</label>
             <div style={{ display: 'flex', gap: '12px' }}>
                <input type="file" name="pdf" accept=".pdf" required style={{ padding: '10px', background: '#fff', border: '1px solid var(--tp-border)', borderRadius: '12px', fontSize: '13px', flex: 1 }} />
                <button type="submit" disabled={uploading} className="primary-btn-pro" style={{ padding: '14px 24px', width: 'auto' }}>
                  {uploading ? <Loader2 className="animate-spin" size={18} /> : "Upload"}
                </button>
             </div>
          </div>
        </form>
      </div>

      <div className="data-card table-card-pro">
        <div style={{ padding: '24px', borderBottom: '1px solid var(--tp-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: '800', color: 'var(--tp-dark)', fontSize: '18px' }}>Manage Syllabus Documents</h3>
          <FaSearch color="var(--tp-muted)" />
        </div>
        <table className="modern-pro-table">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Assigned Training</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pdfs.map(pdf => (
              <tr key={pdf._id}>
                <td>
                  <div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700', color: 'var(--tp-dark)' }}>
                    <div className="cell-logo" style={{ minWidth: '40px', background: '#f8fafc', color: 'var(--tp-primary)' }}><FileText size={18} /></div>
                    <span className="role-text">{pdf.title}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--tp-muted)', fontWeight: '600' }}>{trainings.find(t => t._id === pdf.trainingId)?.title || "General"}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => handleDeletePdf(pdf._id)} className="primary-outline-btn" style={{ width: 'auto', padding: '8px 16px', border: '1px solid #fee2e2', color: '#ef4444' }}><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="fixed-sidebar">
        <div className="sidebar-logo">
          🎓 <span>Executive</span>
        </div>
        
        <nav className="side-nav">
          {[
            { id: "dashboard", icon: <FaChartPie />, label: "Dashboard" },
            { id: "trainings", icon: <FaBriefcase />, label: "Trainings" },
            { id: "syllabus", icon: <FileText size={18} />, label: "Syllabus" },
          ].map(item => (
            <div 
              key={item.id} 
              className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              {item.icon} <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => navigate("/")} className="logout-btn">
            <FaSignOutAlt /> <span>Sign Out Gateway</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="main-content-area">
        <header className="top-navbar">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search parameters..." />
          </div>
          <div className="profile-actions">
            <div className="nav-profile clickable-profile">
              <span>Admin TP Master</span>
              <div className="p-avatar">AD</div>
            </div>
          </div>
        </header>

        <section className="scroll-content">
          {loading ? (
            <div className="loader-container">
               <div className="loader-spin"></div>
               <p>Synchronizing Executive Data...</p>
            </div>
          ) : (
            <>
              {page === "dashboard" && renderDashboard()}
              {page === "trainings" && renderTrainings()}
              {page === "syllabus" && renderSyllabusManager()}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;