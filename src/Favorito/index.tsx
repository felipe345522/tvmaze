import React, { useState, useEffect } from 'react';
import './style.css';
import ListaElementos from '../Lista de elementos';
import DetallePagina from '../Detalle página';

type Show = {
  id: number;
  name: string;
  image?: { medium: string; original: string } | null;
  genres: string[];
  rating: { average: number | null };
  summary: string | null;
  officialSite: string | null;
};

const Favorito: React.FC = () => {
  const [favorites, setFavorites] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleSelectShow = (show: Show) => {
    setSelectedShow(show);
  };

  const handleToggleFavorite = (show: Show) => {
    const newFavorites = favorites.filter(fav => fav.id !== show.id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleBack = () => {
    setSelectedShow(null);
  };

  if (selectedShow) {
    return <DetallePagina show={selectedShow} onBack={handleBack} onToggleFavorite={handleToggleFavorite} />;
  }

  return (
    <div className="favorito">
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes shows favoritos aún.</p>
      ) : (
        <ListaElementos shows={favorites} onSelectShow={handleSelectShow} onToggleFavorite={handleToggleFavorite} />
      )}
    </div>
  );
};

export default Favorito;