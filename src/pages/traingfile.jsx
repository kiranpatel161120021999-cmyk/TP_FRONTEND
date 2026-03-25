import React from "react";
import { Link, useParams } from "react-router-dom";
import "../style/trainingDetails.css";

const TrainingDetails = () => {
  const { id } = useParams(); // 🔥 URL se id

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">Training and Placement System</div>
        <ul>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/trainings">All Trainings</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* PAGE TITLE */}
      <div className="page-title">
        Training Details (ID: {id})
      </div>

      {/* CONTENT */}
      <div className="content">
        <div className="card">
          <div className="card-body">

            <div className="row">
              <div className="label">Training Title</div>
              <div className="value">Java Basic Assignments</div>
            </div>

            <div className="row">
              <div className="label">Subject Name</div>
              <div className="value">Java</div>
            </div>

            <div className="row">
              <div className="label">Training Start Date</div>
              <div className="value">3 April, 2018</div>
            </div>

            <div className="row">
              <div className="label">Description</div>
              <div className="value">Java Basic Assignments</div>
            </div>

            <div className="row">
              <div className="label">Training File</div>
              <div className="value">
                <a
                  href="https://youtu.be/yRpLlJmRo2w"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Training File
                </a>
              </div>
            </div>

            <div className="btn-box">
              <Link to="/login">
                <button className="btn">Login to Enroll</button>
              </Link>
            </div>

            <div className="btn-box">
              <Link to="/trainings">
                <button className="btn">Back To Trainings</button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingDetails;
