import React from 'react';
import { leftTiles, rightTiles } from './data';
import { useGameLogic } from './useGameLogic';
import './ExpressionMatcher.css';

const ExpressionMatcher = ({ onComplete }) => {
  const { 
    gameState, 
    handleLeftClick, 
    handleRightClick, 
    resetGame 
  } = useGameLogic(leftTiles, rightTiles, onComplete);

  return (
    <div className="expression-matcher">
      <h2>Задание 3: Соедини равные выражения</h2>
      
      <div className="tiles-container">
        <div className="left-tiles">
          {leftTiles.map(tile => (
            <Tile
              key={`left-${tile.id}`}
              tile={tile}
              isSelected={gameState.selectedLeft === tile.id}
              isMatched={gameState.matches.some(m => m.left === tile.id)}
              onClick={() => !gameState.matches.some(m => m.left === tile.id) && 
                handleLeftClick(tile.id)}
            />
          ))}
        </div>
        
        <div className="right-tiles">
          {rightTiles.map(tile => (
            <Tile
              key={`right-${tile.id}`}
              tile={tile}
              isSelected={gameState.selectedRight === tile.id}
              isMatched={gameState.matches.some(m => m.right === tile.id)}
              onClick={() => !gameState.matches.some(m => m.right === tile.id) && 
                handleRightClick(tile.id, tile.value)}
            />
          ))}
        </div>
      </div>
      
      <div className="status">
        {gameState.completed ? (
          <div className="success">Все выражения соединены верно!</div>
        ) : (
          <div>Соединено: {gameState.matches.length} из {leftTiles.length}</div>
        )}
      </div>
      
      <button className="reset-btn" onClick={resetGame}>
        Начать заново
      </button>
    </div>
  );
};

export default ExpressionMatcher;