import React from "react";

const AssignmentCard = ({title,progress}) => {
  return (
    <div className="assignment-card">

      <h4>{title}</h4>

      <div className="progress-bar">
        <div 
        className="progress"
        style={{width:`${progress}%`}}
        ></div>
      </div>

      <p>{progress}% Completed</p>

    </div>
  );
};

export default AssignmentCard;