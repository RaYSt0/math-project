import React from 'react';
import './Navigation.css';

const Navigation = ({ currentTask, completedTasks, onTaskChange }) => {
  return (
    <div className="navigation">
      {[1, 2, 3].map(taskNum => (
        <button
          key={taskNum}
          className={`nav-button ${currentTask === taskNum ? 'active' : ''} ${
            completedTasks.includes(taskNum) ? 'completed' : ''
          }`}
          onClick={() => onTaskChange(taskNum)}
        >
          {taskNum}
        </button>
      ))}
    </div>
  );
};

export default Navigation;