import React, { useState } from 'react';
import './ExpressionMatcher.css';

const ExpressionMatcher = ({ onComplete }) => {
  // Исходные данные для плиток
  const leftTiles = [
    { id: 1, expression: '2 · (3 + 4)', value: 14 },
    { id: 2, expression: '3 · (4 + 2)', value: 18 },
    { id: 3, expression: '4 · (3 + 2)', value: 20 },
    { id: 4, expression: '4 · (2 + 6)', value: 32 }
  ];

  const rightTiles = [
    { id: 5, expression: '4 · 3 + 4 · 2', value: 20 },
    { id: 6, expression: '2 · 3 + 2 · 4', value: 14 },
    { id: 7, expression: '12 + 6', value: 18 },
    { id: 8, expression: '8 + 24', value: 32 }
  ];

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState([]);
  const [completed, setCompleted] = useState(false);

  const handleLeftClick = (tile) => {
    if (completed) return;
    setSelectedLeft(tile.id === selectedLeft ? null : tile.id);
  };

  const handleRightClick = (tile) => {
    if (completed || !selectedLeft) return;
    setSelectedRight(tile.id === selectedRight ? null : tile.id);
    
    // Проверяем совпадение значений
    const leftTile = leftTiles.find(t => t.id === selectedLeft);
    if (leftTile.value === tile.value) {
      setMatches([...matches, { left: selectedLeft, right: tile.id }]);
      setSelectedLeft(null);
      setSelectedRight(null);
      
      // Проверяем завершение задания
      if (matches.length + 1 === leftTiles.length) {
        setCompleted(true);
        onComplete();
      }
    }
  };

  const resetGame = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches([]);
    setCompleted(false);
  };

  return (
    <div className="expression-matcher">
      <h2>Задание 3: Соедини равные выражения</h2>
      
      <div className="tiles-container">
        <div className="left-tiles">
          {leftTiles.map(tile => {
            const isMatched = matches.some(m => m.left === tile.id);
            return (
              <div
                key={`left-${tile.id}`}
                className={`tile ${selectedLeft === tile.id ? 'selected' : ''} ${
                  isMatched ? 'matched' : ''
                }`}
                onClick={() => !isMatched && handleLeftClick(tile)}
              >
                {tile.expression}
              </div>
            );
          })}
        </div>
        
        <div className="right-tiles">
          {rightTiles.map(tile => {
            const isMatched = matches.some(m => m.right === tile.id);
            return (
              <div
                key={`right-${tile.id}`}
                className={`tile ${selectedRight === tile.id ? 'selected' : ''} ${
                  isMatched ? 'matched' : ''
                }`}
                onClick={() => !isMatched && handleRightClick(tile)}
              >
                {tile.expression}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="status">
        {completed ? (
          <div className="success">Все выражения соединены верно!</div>
        ) : (
          <div>Соединено: {matches.length} из {leftTiles.length}</div>
        )}
      </div>
      
      <button className="reset-btn" onClick={resetGame}>
        Начать заново
      </button>
    </div>
  );
};

export default ExpressionMatcher;