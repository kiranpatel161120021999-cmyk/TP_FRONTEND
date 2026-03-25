import React from "react";

const TaskPanel = ({tasks}) => {
  return (
    <div className="task-panel">

      <h3>Your Tasks Today</h3>

      {tasks.map((task,index)=>(
        <p key={index}>• {task}</p>
      ))}

    </div>
  );
};

export default TaskPanel;