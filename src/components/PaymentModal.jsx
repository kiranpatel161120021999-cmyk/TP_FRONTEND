import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTimes, FaCreditCard, FaMobileAlt, FaBuilding, FaCheckCircle, FaLock } from "react-icons/fa";
import "../style/PaymentModal.css";

import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose, training, onSuccess }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [step] = useState(1); // 1: Pay, 2: Success
  const [loading, setLoading] = useState(false);

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
        setLoading(false);
        return;
      }

      toast.loading("Connecting to Admission Server...", { id: loadToast });

      const res = await axios.post("http://localhost:5000/api/trainings/enroll", {
        studentId,
        trainingId,
        amount: total
      });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Payment Received! Finalizing admission...", { id: loadToast });
        if (onSuccess) await onSuccess();
        
        // Wait 1 second for the user to see the success state before redirecting
        setTimeout(() => {
          navigate(`/success/${trainingId}`);
        }, 1200);
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
        setTimeout(() => {
          navigate(`/success/${trainingId}`);
        }, 1200);
        setLoading(false);
        return; 
      }

      const errorMsg = backendError || "Connection error. Ensure backend is running.";
      
      toast.error(errorMsg, { 
        duration: 5000,
        style: { border: '1px solid #ff4b4b', padding: '16px', color: '#ff4b4b', fontWeight: 'bold' }
      });
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

              <form onSubmit={handlePayment}>
                {method === 'card' && (
                  <div className="pm-card-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    <input type="text" placeholder="Card Number" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} required />
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} required />
                      <input type="text" placeholder="CVV" style={{ width: '80px', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} required />
                    </div>
                  </div>
                )}
                {method === 'upi' && (
                  <div className="pm-upi-form" style={{ marginBottom: '24px' }}>
                    <input type="text" placeholder="yourname@upi" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }} required />
                  </div>
                )}

                <button type="submit" className="pm-pay-btn" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                       <FaLock className="animate-pulse" /> Processing...
                    </div>
                  ) : (
                    <>
                      <FaLock /> Confirm & Pay ₹{total.toLocaleString()}
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="pm-success-state">
            <div className="pm-success-icon">
              <FaCheckCircle />
            </div>
            <h2>Enrollment Confirmed!</h2>
            <p>You have successfully admitted to <strong>{training.title}</strong>. A confirmation and access link has been sent to your registered email.</p>
            <button className="pm-pay-btn" onClick={handleSuccessClose}>
              Go to My Trainings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
