import React from 'react';
import ReactDOM from 'react-dom/client'; // Измените импорт
import App from './App';

// Создайте корневой элемент
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеринг приложения
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);