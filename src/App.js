import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import MissingNumberGame from './components/Task1/MissingNumberGame';
import PathToSchool from './components/Task2/PathToSchool';
import ExpressionMatcher from './components/Task3/ExpressionMatcher';
import './styles/global.css';

function App() {
  const [currentTask, setCurrentTask] = useState(1);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleTaskComplete = (taskNumber) => {
    if (!completedTasks.includes(taskNumber)) {
      setCompletedTasks([...completedTasks, taskNumber]);
    }
  };

  return (
    <div className="app">
      <Navigation 
        currentTask={currentTask} 
        completedTasks={completedTasks}
        onTaskChange={setCurrentTask}
      />
      
      <div className="task-container">
        {currentTask === 1 && (
          <MissingNumberGame onComplete={() => handleTaskComplete(1)} />
        )}
        {currentTask === 2 && (
          <PathToSchool onComplete={() => handleTaskComplete(2)} />
        )}
        {currentTask === 3 && (
          <ExpressionMatcher onComplete={() => handleTaskComplete(3)} />
        )}
      </div>
    </div>
  );
}

export default App;