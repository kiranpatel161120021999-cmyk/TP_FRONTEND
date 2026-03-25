import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaPlay, FaRedo, FaCheckCircle, FaTimesCircle,
  FaLightbulb, FaClock, FaStar, FaTrophy, FaChevronRight,
  FaCode, FaUsers, FaBrain, FaChartBar
} from 'react-icons/fa';
import '../style/mock-interview.css';

const CATEGORIES = [
  { id: 'hr', icon: <FaUsers />, label: 'HR Round', color: '#6d28d9', bg: '#f5f3ff', count: 20 },
  { id: 'tech', icon: <FaCode />, label: 'Technical', color: '#0284c7', bg: '#e0f2fe', count: 25 },
  { id: 'aptitude', icon: <FaBrain />, label: 'Aptitude', color: '#059669', bg: '#d1fae5', count: 30 },
  { id: 'mgt', icon: <FaChartBar />, label: 'Management', color: '#d97706', bg: '#fef3c7', count: 15 },
];

const ALL_QUESTIONS = {
  hr: [
    { q: "Tell me about yourself.", hint: "Briefly cover your education and skills." },
    { q: "What are your strengths?", hint: "Mention strengths with examples." },
  ],
  tech: [
    { q: "Explain OOP concepts.", hint: "Encapsulation, Inheritance, Polymorphism." },
  ],
  aptitude: [
    { q: "15% of 240?", hint: "240 × 0.15 = 36" },
  ],
  mgt: [
    { q: "Leadership style?", hint: "Explain with example." },
  ],
};

const MockInterview = () => {
  const [selectedCat, setSelectedCat] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ good: 0, bad: 0 });
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const questions = selectedCat ? ALL_QUESTIONS[selectedCat] : [];
  const current = questions[currentIdx];
  const total = questions.length;

  const startSession = (catId) => {
    setSelectedCat(catId);
    setCurrentIdx(0);
    setScore({ good: 0, bad: 0 });
    setDone(false);
    setShowHint(false);
    setStarted(true);
  };

  const handleMark = (good) => {
    const newScore = good
      ? { ...score, good: score.good + 1 }
      : { ...score, bad: score.bad + 1 };

    setScore(newScore);

    if (currentIdx + 1 >= total) {
      setDone(true);
    } else {
      setCurrentIdx(i => i + 1);
      setShowHint(false);
    }
  };

  const reset = () => {
    setStarted(false);
    setSelectedCat(null);
    setCurrentIdx(0);
    setScore({ good: 0, bad: 0 });
    setDone(false);
    setShowHint(false);
  };

  const pct = total ? Math.round((score.good / total) * 100) : 0;

  return (
    <div className="mi-page">
      <Header />

      <section className="mi-hero">
        <h1>Mock Interview Simulator</h1>
      </section>

      <div className="mi-container">

        {!started && (
          <>
            <h2>Select Category</h2>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => startSession(cat.id)}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </>
        )}

        {started && !done && current && (
          <div>
            <h2>{current.q}</h2>

            {showHint && <p>💡 {current.hint}</p>}

            <button onClick={() => setShowHint(h => !h)}>
              Toggle Hint
            </button>

            <button onClick={() => handleMark(true)}>✔ Good</button>
            <button onClick={() => handleMark(false)}>✘ Improve</button>
          </div>
        )}

        {done && (
          <div>
            <h2>Result: {pct}%</h2>
            <button onClick={() => startSession(selectedCat)}>Retry</button>
            <button onClick={reset}>New Category</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MockInterview;