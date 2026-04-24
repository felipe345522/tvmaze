import React, { useState, useEffect } from 'react';
import './style.css';

type Show = {
  id: number;
  name: string;
  image?: { medium: string; original: string } | null;
};

const Favorito: React.FC = () => {
  const [favorites, setFavorites] = useState<Show[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const newFavorites = favorites.filter(show => show.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="favorito">
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes shows favoritos aún.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((show) => (
            <div key={show.id} className="favorite-item">
              <img src={show.image?.medium || '/placeholder.png'} alt={show.name} />
              <h3>{show.name}</h3>
              <button onClick={() => removeFavorite(show.id)}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorito;