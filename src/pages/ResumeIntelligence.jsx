import React, { useState, useEffect } from "react";
import { 
  FaCloudUploadAlt, FaFilePdf, FaCheckCircle, 
  FaExclamationTriangle, FaChartLine, FaRobot, 
  FaRedo, FaSearchPlus 
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/ResumeIntelligence.css";

const ResumeIntelligence = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);

  const scanSteps = [
    "Initializing AI Engine...",
    "Parsing Resume text & structure...",
    "Checking ATS Compatibility...",
    "Analyzing Action Verbs & Metrics...",
    "Generating Final Score & Feedback..."
  ];

  // Mock Analysis Process
  useEffect(() => {
    if (isAnalyzing) {
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep >= scanSteps.length) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setResult({
            score: 78,
            atsMatch: "Medium",
            strengths: [
              "Strong technical skill section",
              "Good educational formatting",
              "Clear contact information"
            ],
            weaknesses: [
              "Missing specific numbers/metrics in experience",
              "Too many generic buzzwords ('hardworking', 'team player')",
              "File format might fail some strict ATS parsers"
            ],
            tips: [
              "Start bullet points with strong action verbs (Achieved, Developed).",
              "Quantify your success (e.g., 'Improved performance by 20%').",
              "Use a standard, clean font (Arial, Calibri) for better ATS parsing."
            ]
          });
        } else {
          setScanStep(currentStep);
        }
      }, 1200); // 1.2s per step
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, scanSteps.length]);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    setIsAnalyzing(true);
    setScanStep(0);
    setResult(null);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="res-page">
      <Header />

      {/* ── HERO ── */}
      <section className="res-hero">
        <div className="res-hero-bg"></div>
        <div className="res-container res-hero-content">
          <span className="res-badge"><FaRobot /> AI Powered</span>
          <h1>Resume <span>Intelligence</span> Lab</h1>
          <p>Instantly score your resume, check ATS compatibility, and get actionable improvements from our AI engine to land more interviews.</p>
        </div>
      </section>

      {/* ── MAIN TOOL ── */}
      <section className="res-main-sec">
        <div className="res-container">
          <div className="res-box">
            
            {/* STATE 1: UPLOAD */}
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
                      <p>Supports .PDF, .DOCX (Max 5MB)</p>
                      <label className="res-browse-btn">
                        Browse Files
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} hidden />
                      </label>
                    </>
                  )}
                </div>

                <div className="res-action-row">
                  <button 
                    className="res-primary-btn" 
                    onClick={startAnalysis} 
                    disabled={!file}
                  >
                    Analyze Resume <FaSearchPlus />
                  </button>
                  {file && <button className="res-text-btn" onClick={reset}>Clear File</button>}
                </div>
              </div>
            )}

            {/* STATE 2: ANALYZING */}
            {isAnalyzing && (
              <div className="res-scanning-wrap">
                <div className="res-scanner-circle">
                  <div className="rsc-inner">
                    <FaRobot className="rsc-icon bouncing" />
                  </div>
                  <svg className="rsc-ring"><circle cx="70" cy="70" r="66"></circle></svg>
                </div>
                <h3>{scanSteps[scanStep]}</h3>
                <div className="res-progress-wrap">
                  <div 
                    className="res-progress-bar" 
                    style={{width: `${((scanStep + 1) / scanSteps.length) * 100}%`}}
                  ></div>
                </div>
                <p>Please wait, our AI is looking for keywords, formatting flaws, and ATS hooks.</p>
              </div>
            )}

            {/* STATE 3: RESULTS */}
            {result && !isAnalyzing && (
              <div className="res-result-wrap">
                <div className="rr-header">
                  <div className="rr-score-box">
                    <svg className="rr-circle" viewBox="0 0 36 36">
                      <path
                        className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle-stroke"
                        strokeDasharray={`${result.score}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="rr-score-val">
                      <strong>{result.score}</strong>
                      <span>/ 100</span>
                    </div>
                  </div>
                  <div className="rr-summary">
                    <h2>Analysis Complete!</h2>
                    <p>Your resume is looking decent, but there's room for improvement before you apply to top companies.</p>
                    <span className={`ats-badge ats-${result.atsMatch.toLowerCase()}`}>
                      ATS Match: {result.atsMatch}
                    </span>
                  </div>
                  <button className="res-redo-btn" onClick={reset}>
                    <FaRedo /> New Scan
                  </button>
                </div>

                <div className="rr-grid">
                  <div className="rr-card rr-strengths">
                    <h4><FaCheckCircle className="icon-green" /> What You Did Well</h4>
                    <ul>
                      {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div className="rr-card rr-weaknesses">
                    <h4><FaExclamationTriangle className="icon-red" /> Red Flags &amp; Weaknesses</h4>
                    <ul>
                      {result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
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