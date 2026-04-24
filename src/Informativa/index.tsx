import React from 'react';
import './style.css';

const Informativa: React.FC = () => {
  return (
    <div className="informativa">
      <h1>Información</h1>
      <p>Esta aplicación utiliza la API de TVMaze para mostrar información sobre series de televisión.</p>
      <h2>Características:</h2>
      <ul>
        <li>Lista de shows populares</li>
        <li>Búsqueda de shows</li>
        <li>Detalles de cada show</li>
        <li>Marcar como favoritos</li>
        <li>Filtros por género</li>
      </ul>
      <h2>API:</h2>
      <p>TV Maze API: <a href="https://www.tvmaze.com/api" target="_blank" rel="noopener noreferrer">https://www.tvmaze.com/api</a></p>
    </div>
  );
};

export default Informativa;