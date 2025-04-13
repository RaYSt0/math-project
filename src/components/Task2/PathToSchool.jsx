import React, { useState } from 'react';
import './PathToSchool.css';

const PathToSchool = ({ onComplete }) => {
  const [path, setPath] = useState([0]); // Начинаем с плитки 17 (индекс 0)
  const [result, setResult] = useState(17); // Начальное значение 17
  const [availableTiles, setAvailableTiles] = useState([1, 4]); // Доступные плитки рядом с начальной
  
  const tiles = [
    { value: 17, operation: '+', row: 0, col: 0 },
    { value: 16, operation: '+', row: 0, col: 1 },
    { value: 8, operation: '-', row: 0, col: 2 },
    { value: 23, operation: '+', row: 0, col: 3 },
    { value: 18, operation: '+', row: 1, col: 0 },
    { value: 9, operation: '-', row: 1, col: 1 },
    { value: 10, operation: '+', row: 1, col: 2 },
    { value: 7, operation: '-', row: 2, col: 0 },
    { value: 17, operation: '+', row: 2, col: 1 },
    { value: 6, operation: '-', row: 2, col: 2 },
    { value: 14, operation: '+', row: 2, col: 3 },
    { value: 16, operation: '+', row: 3, col: 0 },
    { value: 5, operation: '-', row: 3, col: 1 },
    { value: 13, operation: '+', row: 3, col: 2 }
  ];

  // Определяем соседние плитки
  const getAdjacentTiles = (tileIndex) => {
    const currentTile = tiles[tileIndex];
    return tiles
      .map((tile, index) => ({ ...tile, index }))
      .filter(tile => {
        const rowDiff = Math.abs(tile.row - currentTile.row);
        const colDiff = Math.abs(tile.col - currentTile.col);
        return (rowDiff === 1 && colDiff === 0) || 
               (rowDiff === 0 && colDiff === 1);
      })
      .map(tile => tile.index);
  };

  const handleTileClick = (index) => {
    if (!availableTiles.includes(index) || path.includes(index)) return;
    
    const newPath = [...path, index];
    setPath(newPath);
    
    // Обновляем доступные плитки
    const newAvailableTiles = getAdjacentTiles(index)
      .filter(tileIndex => !newPath.includes(tileIndex));
    setAvailableTiles(newAvailableTiles);
    
    calculateResult(newPath);
  };

  const calculateResult = (currentPath) => {
    let currentResult = 17; // Начальное значение
    
    // Пропускаем первую плитку (она уже учтена в начальном значении)
    for (let i = 1; i < currentPath.length; i++) {
      const tile = tiles[currentPath[i]];
      if (tile.operation === '+') {
        currentResult += tile.value;
      } else {
        currentResult -= tile.value;
      }
    }
    
    setResult(currentResult);
    
    // Проверяем завершение задания (теперь проверяем на 42)
    if (currentPath.length === 7 && currentResult === 42) {
      onComplete();
    }
  };

  const resetPath = () => {
    setPath([0]);
    setResult(17);
    setAvailableTiles([1, 4]);
  };

  const undoLast = () => {
    if (path.length <= 1) return;
    
    const newPath = path.slice(0, -1);
    setPath(newPath);
    
    // Обновляем доступные плитки
    const lastTileIndex = newPath[newPath.length - 1];
    const newAvailableTiles = getAdjacentTiles(lastTileIndex)
      .filter(tileIndex => !newPath.includes(tileIndex));
    setAvailableTiles(newAvailableTiles);
    
    calculateResult(newPath);
  };

  // Проверяем, выполнены ли условия для активации кнопки "Готово"
  const isDone = result === 42 && path.length === 6;

  return (
    <div className="path-container">
      <h2>Помоги Глаше попасть в школу</h2>
      <p>Построй её путь так, чтобы равенство было верным</p>
      
      <div className="tiles-grid">
        {tiles.map((tile, index) => (
          <div 
            key={index}
            className={`tile ${path.includes(index) ? 'selected' : ''} ${
              availableTiles.includes(index) ? 'available' : ''
            }`}
            onClick={() => handleTileClick(index)}
            style={{
              gridRow: tile.row + 1,
              gridColumn: tile.col + 1
            }}
          >
            {tile.operation}{tile.value}
          </div>
        ))}
        <div className="result-tile" style={{ gridRow: 4, gridColumn: 4 }}>
          = 42
        </div>
      </div>
      
      <div className="current-result">
        Текущий результат: {result} {path.length > 0 && `(Шаг ${path.length}/6)`}
      </div>
      
      <div className="controls">
        <button onClick={undoLast} disabled={path.length <= 1}>Отменить ход</button>
        <button onClick={resetPath}>Начать сначала</button>
        <button 
          className={isDone ? 'ready' : ''}
          disabled={!isDone}
          onClick={() => isDone && onComplete()}
        >
          Готово
        </button>
      </div>
    </div>
  );
};

export default PathToSchool;