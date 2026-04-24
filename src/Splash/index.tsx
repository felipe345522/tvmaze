import React from 'react';
import './style.css';
import Icono from '../Icono';

const Splash: React.FC = () => {
  return (
    <div className="splash">
      <div className="splash-content">
        <Icono type="layers" size={48} />
        <h1>TVMaze</h1>
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default Splash;