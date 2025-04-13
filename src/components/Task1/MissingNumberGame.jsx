import React, { useState } from 'react';
import './MissingNumberGame.css';

const MissingNumberGame = ({ onComplete }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Данные для задания
  const sequence = [1, 2, 3, 4, 5];
  const partialSequence = [3, 4, 5];
  const correctAnswer = 6;
  const answerOptions = [1, 7, 6, 9, 10];

  const handleNumberSelect = (number) => {
    if (isCompleted) return;
    
    setSelectedNumber(number);
    setFeedback('');
  };

  const checkAnswer = () => {
    if (selectedNumber === null) {
      setFeedback('Выберите вариант!');
      return;
    }

    if (selectedNumber === correctAnswer) {
      setFeedback('Правильно! Молодец!');
      setIsCompleted(true);
      onComplete();
    } else {
      setFeedback('Неверно. Попробуйте ещё раз!');
    }
  };

  const resetGame = () => {
    setSelectedNumber(null);
    setFeedback('');
    setIsCompleted(false);
  };

  return (
    <div className="task1-container">
      <h2>Задание 1: Выбери пропущенную цифру</h2>
      
      <div className="sequence-container">
        {/* Полная последовательность с data-testid */}
        <div className="number-sequence" data-testid="full-sequence">
          {sequence.map((num, index) => (
            <div key={`full-${index}`} className="number">
              {num}
            </div>
          ))}
        </div>
        
        {/* Частичная последовательность с data-testid */}
        <div className="number-sequence" data-testid="partial-sequence">
          {partialSequence.map((num, index) => (
            <div key={`partial-${index}`} className="number">
              {num}
            </div>
          ))}
          <div 
            className={`number ${selectedNumber ? 'selected' : 'empty'} ${
              isCompleted ? 'correct' : ''
            }`}
            data-testid="missing-number"
          >
            {selectedNumber || '?'}
          </div>
        </div>
      </div>
      
      {/* Опции ответов с data-testid */}
      <div className="options-container">
        {answerOptions.map(num => (
          <div 
            key={`opt-${num}`}
            className={`option ${selectedNumber === num ? 'active' : ''} ${
              isCompleted ? 'disabled' : ''
            }`}
            onClick={() => handleNumberSelect(num)}
            data-testid={`option-${num}`}
          >
            {num}
          </div>
        ))}
      </div>
      
      <div className={`feedback ${feedback ? (isCompleted ? 'correct' : 'incorrect') : ''}`}>
        {feedback}
      </div>
      
      <div className="buttons-container">
        <button 
          className="check-btn" 
          onClick={checkAnswer}
          disabled={isCompleted}
        >
          Проверить
        </button>
        <button className="reset-btn" onClick={resetGame}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default MissingNumberGame;