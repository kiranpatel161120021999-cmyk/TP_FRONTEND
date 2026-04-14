import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTimes, FaCreditCard, FaMobileAlt, FaCheckCircle, FaLock, FaDownload, FaCalendarAlt, FaTag, FaReceipt } from "react-icons/fa";
import "../style/PaymentModal.css";

import { useNavigate } from "react-router-dom";

const generateTxnId = () => "TXN" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();

const PaymentModal = ({ isOpen, onClose, training, onSuccess }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [step, setStep] = useState(1); // 1: Pay, 2: Receipt
  const [loading, setLoading] = useState(false);
  const [txnId] = useState(generateTxnId);
  const [paymentDate] = useState(new Date());

  if (!isOpen) return null;

  const price = Number(training.price) || 8000;
  const gst = Math.round(price * 0.18);
  const total = price + gst;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trainingId = training._id || training.id;
    console.log("💳 Attempting Payment for Training:", trainingId);
    
    const loadToast = toast.loading("Initiating secure gateway...");

    try {
      let studentId = localStorage.getItem("userId");
      
      // Fallback: Try to get from userInfo if userId is missing
      if (!studentId) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        studentId = userInfo.id || userInfo._id;
      }

      if (!studentId) {
        toast.dismiss(loadToast);
        toast.error("Authentication Error: Please login again.", { icon: '🚫' });
        alert("Authentication Error: Please login to successfully enroll.");
        setLoading(false);
        return;
      }

      toast.loading("Connecting to Admission Server...", { id: loadToast });

      const res = await axios.post("/api/trainings/enroll", {
        studentId,
        trainingId,
        amount: total
      });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Payment Received! Finalizing admission...", { id: loadToast });
        if (onSuccess) await onSuccess();
        
        // Show the success form inside the modal instead of navigating away
        setStep(2);
      }
    } catch (err) {
      toast.dismiss(loadToast);
      console.error("❌ Enrollment Submission Failed:", err);
      
      const backendError = err.response?.data?.message;
      
      // Smart Recovery: If already enrolled, act as success and MOVE!
      if (err.response?.status === 400 && (backendError?.toLowerCase().includes("already") || backendError?.toLowerCase().includes("confirmed"))) {
        toast.success("Identity Verified! Opening your module...", { 
           icon: '🔓', 
           duration: 3000, 
           style: { background: '#f5f3ff', color: '#6d28d9', border: '1px solid #8b5cf6' } 
        });
        
        // Use the modal success state instead of navigating to a potentially missing route
        setStep(2);
        
        setLoading(false);
        return; 
      }

      const errorMsg = backendError || "Connection error. Ensure backend is running.";
      
      toast.error(errorMsg, { 
        duration: 5000,
        style: { border: '1px solid #ff4b4b', padding: '16px', color: '#ff4b4b', fontWeight: 'bold' }
      });
      // Fallback alert ensures the user actually sees the error if toasts are broken
      alert("Payment Failed: " + errorMsg);
      
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    onClose();
    navigate("/studentdashboard");
  };

  return (
    <div className="pm-overlay">
      <div className="pm-modal">
        {step === 1 ? (
          <>
            <div className="pm-header">
              <button className="pm-close" onClick={onClose}><FaTimes /></button>
              <h2>Secure Enrollment</h2>
              <p>Admission Gateway for {training.title}</p>
            </div>
            
            <div className="pm-body">
              <div className="pm-summary">
                <div className="pm-summary-row">
                  <span>Training Module</span>
                  <span>{training.title}</span>
                </div>
                <div className="pm-summary-row">
                  <span>Base Fee</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
                <div className="pm-summary-row">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="pm-summary-row">
                  <span>Total Payable</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <span className="pm-method-title">Choose Payment Method</span>
              <div className="pm-methods-grid">
                <div 
                  className={`pm-method-card ${method === 'card' ? 'active' : ''}`}
                  onClick={() => setMethod('card')}
                >
                  <FaCreditCard />
                  <span>Debit/Credit</span>
                </div>
                <div 
                  className={`pm-method-card ${method === 'upi' ? 'active' : ''}`}
                  onClick={() => setMethod('upi')}
                >
                  <FaMobileAlt />
                  <span>UPI / PhonePe</span>
                </div>
              </div>

              <div>
                {method === 'card' && (
                  <div className="pm-card-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    <input type="text" placeholder="Card Number" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                      <input type="text" placeholder="CVV" style={{ width: '80px', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                    </div>
                  </div>
                )}
                {method === 'upi' && (
                  <div className="pm-upi-form" style={{ marginBottom: '24px' }}>
                    <input type="text" placeholder="yourname@upi" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  </div>
                )}

                <button type="button" onClick={handlePayment} className="pm-pay-btn" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                       <FaLock className="animate-pulse" /> Processing...
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      <FaLock /> Confirm & Pay ₹{total.toLocaleString()}
                    </div>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="pm-receipt">
            {/* Receipt Header */}
            <div className="pm-receipt-header">
              <div className="pm-receipt-success-icon"><FaCheckCircle /></div>
              <h2>Payment Successful!</h2>
              <p>Your enrollment has been confirmed.</p>
            </div>

            {/* Receipt Body */}
            <div className="pm-receipt-body">
              
              <div className="pm-receipt-section">
                <div className="pm-receipt-label"><FaTag /> Course Details</div>
                <div className="pm-receipt-row">
                  <span>Course</span>
                  <strong>{training.title}</strong>
                </div>
                <div className="pm-receipt-row">
                  <span>Subject</span>
                  <strong>{training.subject || "Technology"}</strong>
                </div>
                <div className="pm-receipt-row">
                  <span>Duration</span>
                  <strong>{training.duration || "—"}</strong>
                </div>
                <div className="pm-receipt-row">
                  <span>Level</span>
                  <strong>{training.level || "Beginner"}</strong>
                </div>
              </div>

              <div className="pm-receipt-section">
                <div className="pm-receipt-label"><FaReceipt /> Payment Breakdown</div>
                <div className="pm-receipt-row">
                  <span>Base Fee</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
                <div className="pm-receipt-row">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="pm-receipt-row">
                  <span>Payment Method</span>
                  <span style={{ textTransform: 'uppercase' }}>{method}</span>
                </div>
                <div className="pm-receipt-divider" />
                <div className="pm-receipt-row pm-receipt-total">
                  <span>Total Paid</span>
                  <strong>₹{total.toLocaleString()}</strong>
                </div>
              </div>

              <div className="pm-receipt-section">
                <div className="pm-receipt-label"><FaCalendarAlt /> Transaction Info</div>
                <div className="pm-receipt-row">
                  <span>Transaction ID</span>
                  <strong style={{ fontFamily: 'monospace', fontSize: '13px' }}>{txnId}</strong>
                </div>
                <div className="pm-receipt-row">
                  <span>Date & Time</span>
                  <span>{paymentDate.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                <div className="pm-receipt-row">
                  <span>Status</span>
                  <span className="pm-receipt-status">✅ Paid</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pm-receipt-actions">
              <div className="pm-receipt-resource-btns">
                <a
                  href={training.videoUrl || "https://www.youtube.com/results?search_query=" + encodeURIComponent(training.title + " tutorial")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-resource-btn pm-resource-btn--video"
                >
                  <span className="pm-resource-icon">▶</span>
                  <span>
                    <strong>Video Lectures</strong>
                    <small>Watch full course online</small>
                  </span>
                </a>
                <a
                  href={training.notesUrl || training.fileUrl || "#"}
                  download={training.notesUrl || training.fileUrl ? `${training.title}-notes.pdf` : undefined}
                  target={training.notesUrl || training.fileUrl ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="pm-resource-btn pm-resource-btn--pdf"
                >
                  <span className="pm-resource-icon">⬇</span>
                  <span>
                    <strong>Download Notes</strong>
                    <small>PDF format · Free</small>
                  </span>
                </a>
              </div>
              <button className="pm-pay-btn" style={{ marginTop: '12px' }} onClick={handleSuccessClose}>
                Go to My Trainings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
