import React from 'react';
import './style.css';

const Splash: React.FC = () => {
  return (
    <div className="splash">
      <div className="splash-content">
        <h1>TVMaze</h1>
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default Splash;