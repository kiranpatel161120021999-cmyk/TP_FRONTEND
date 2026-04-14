import React, { useState } from "react";
import axios from "axios";
import { 
  FaCloudUploadAlt, FaFilePdf, FaCheckCircle, 
  FaExclamationTriangle, FaChartLine, FaRobot, 
  FaRedo, FaSearchPlus, FaMicrochip 
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/ResumeIntelligence.css";

const scanSteps = [
  "Initializing AI Engine...",
  "Parsing Resume text & structure...",
  "Checking ATS Compatibility...",
  "Analyzing Action Verbs & Metrics...",
  "Generating Final Score & Feedback..."
];

const ResumeIntelligence = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const startAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setResult(null);
    setScanStep(0);

    const stepInterval = setInterval(() => {
      setScanStep(prev => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 1500);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("/api/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      clearInterval(stepInterval);
      setScanStep(scanSteps.length - 1);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult(response.data.analysis);
      }, 800);

    } catch (error) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      alert(error.response?.data?.message || "Analysis failed. Please try again.");
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setIsAnalyzing(false);
    setScanStep(0);
  };

  return (
    <div className="res-page">
      <Header />

      <section className="res-hero">
        <div className="res-hero-bg"></div>
        <div className="res-container res-hero-content">
          <span className="res-badge"><FaRobot /> AI Powered</span>
          <h1>Resume <span>Intelligence</span> Lab</h1>
          <p>Score your resume against ATS benchmarks and get actionable AI-driven feedback instantly.</p>
        </div>
      </section>

      <section className="res-main-sec">
        <div className="res-container">
          <div className="res-box">
            {!isAnalyzing && !result && (
              <div className="res-upload-wrap">
                <div 
                  className={`res-dropzone ${file ? 'has-file' : ''}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="res-drop-icon" />
                  {file ? (
                    <div className="res-file-info">
                      <FaFilePdf className="file-type-icon" />
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  ) : (
                    <>
                      <h3>Drag &amp; Drop your Resume</h3>
                      <p>Supports .PDF (Max 5MB)</p>
                      <label className="res-browse-btn">
                        Browse Files
                        <input type="file" accept=".pdf" onChange={handleFileUpload} hidden />
                      </label>
                    </>
                  )}
                </div>
                <div className="res-action-row">
                  <button className="res-primary-btn" onClick={startAnalysis} disabled={!file}>
                    Analyze Resume <FaSearchPlus />
                  </button>
                  {file && <button className="res-text-btn" onClick={reset}>Clear File</button>}
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="res-scanning-wrap">
                <div className="res-scanner-circle">
                  <div className="rsc-inner"><FaRobot className="rsc-icon bouncing" /></div>
                  <svg className="rsc-ring"><circle cx="70" cy="70" r="66"></circle></svg>
                </div>
                <h3>{scanSteps[scanStep]}</h3>
                <div className="res-progress-wrap">
                  <div className="res-progress-bar" style={{width: `${((scanStep + 1) / scanSteps.length) * 100}%`}}></div>
                </div>
                <p>Our AI is scanning for keywords, contact info, and formatting compatibility...</p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="res-result-wrap">
                <div className="rr-header">
                  <div className="rr-score-box">
                    <svg className="rr-circle" viewBox="0 0 36 36">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle-stroke" strokeDasharray={`${result.score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="rr-score-val"><strong>{result.score}</strong><span>/ 100</span></div>
                  </div>
                  <div className="rr-summary">
                    <h2>Analysis Complete!</h2>
                    <span className={`ats-badge ats-${result.atsMatch.toLowerCase()}`}>ATS Match: {result.atsMatch}</span>
                  </div>
                  <button className="res-redo-btn" onClick={reset}><FaRedo /> New Scan</button>
                </div>

                <div className="rr-skills-sec">
                  <h4><FaMicrochip /> Detected Keywords</h4>
                  <div className="skills-cloud">
                    {result.skills.length > 0 ? result.skills.map((s, i) => (
                      <span key={i} className="skill-tag">{s}</span>
                    )) : <span className="no-skills">No specific tech skills detected</span>}
                  </div>
                </div>

                <div className="rr-grid">
                  <div className="rr-card rr-strengths">
                    <h4><FaCheckCircle className="icon-green" /> Strengths</h4>
                    <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </div>
                  <div className="rr-card rr-weaknesses">
                    <h4><FaExclamationTriangle className="icon-red" /> Gap Analysis</h4>
                    <ul>{result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
                  </div>
                </div>

                <div className="rr-tips-box">
                  <h4><FaChartLine className="icon-purple" /> Actionable Advice</h4>
                  <div className="tips-list">
                    {result.tips.map((t, i) => (
                      <div className="tip-item" key={i}>
                        <div className="tip-num">{i + 1}</div>
                        <p>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── INFO TICKERS ── */}
      <section className="res-info-sec">
        <div className="res-container">
          <div className="ri-grid">
            <div className="ri-card">
              <h3>Did you know?</h3>
              <p>75% of resumes are rejected by ATS (Applicant Tracking Systems) before a human ever reads them. Formatting is key.</p>
            </div>
            <div className="ri-card">
              <h3>The 6-Second Rule</h3>
              <p>Recruiters spend an average of 6 seconds skimming a resume. Make your metrics and achievements stand out bold and early.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResumeIntelligence;