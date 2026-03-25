import React from "react";
import { Link } from "react-router-dom";
import "./PhpAssignment.css";

const PhpAssignment = () => {
  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">Training & Placement System</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/trainings">Trainings</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>

      {/* TITLE */}
      <div className="page-title">PHP Basic Assignment</div>

      {/* CONTENT */}
      <div className="assignment-container">
        <div className="assignment-card">

          <div className="row">
            <span className="label">Subject:</span>
            <span className="value">PHP</span>
          </div>

          <div className="row">
            <span className="label">Assignment Title:</span>
            <span className="value">PHP Basics Practice</span>
          </div>

          <div className="row">
            <span className="label">Due Date:</span>
            <span className="value">15 March 2026</span>
          </div>

          <div className="row">
            <span className="label">Description:</span>
            <span className="value">
              Create basic PHP programs using variables, loops, conditions,
              functions, and forms.
            </span>
          </div>

          <div className="row">
            <span className="label">Assignment File:</span>
            <span className="value">
              <a
                href="https://www.php.net/manual/en/tutorial.php"
                target="_blank"
                rel="noreferrer"
              >
                View Assignment
              </a>
            </span>
          </div>

          <div className="btn-group">
            <button className="btn primary">Submit Assignment</button>
            <Link to="/trainings">
              <button className="btn secondary">Back</button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default PhpAssignment;
