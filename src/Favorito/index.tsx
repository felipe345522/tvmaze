import React, { useState, useEffect } from 'react';
import './style.css';
import Buscador from '../Buscador';
import Filtro from '../Filtro';
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
  const [baseFavorites, setBaseFavorites] = useState<Show[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Show[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      const favs = JSON.parse(stored);
      setFavorites(favs);
      setBaseFavorites(favs);
      setFilteredFavorites(favs);
    }
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setBaseFavorites(favorites);
      applyFilter(favorites, selectedGenres);
    } else {
      const results = favorites.filter(show =>
        show.name.toLowerCase().includes(query.toLowerCase())
      );
      setBaseFavorites(results);
      applyFilter(results, selectedGenres);
    }
  };

  const handleFilter = (genres: string[]) => {
    setSelectedGenres(genres);
    applyFilter(baseFavorites, genres);
  };

  const applyFilter = (shows: Show[], genres: string[]) => {
    let filtered = shows;
    if (genres.length > 0) {
      filtered = shows.filter(show => genres.some(genre => show.genres.includes(genre)));
    }
    setFilteredFavorites(filtered);
  };

  const handleSelectShow = (show: Show) => {
    setSelectedShow(show);
  };

  const handleToggleFavorite = (show: Show) => {
    const newFavorites = favorites.filter(fav => fav.id !== show.id);
    setFavorites(newFavorites);
    setBaseFavorites(newFavorites);
    applyFilter(newFavorites, selectedGenres);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    alert('Eliminado de favoritos');
  };

  const handleBack = () => {
    setSelectedShow(null);
  };

  const uniqueGenres = Array.from(new Set(favorites.flatMap(show => show.genres)));

  if (selectedShow) {
    return <DetallePagina show={selectedShow} onBack={handleBack} onToggleFavorite={handleToggleFavorite} />;
  }

  return (
    <div className="favorito">
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes shows favoritos aún.</p>
      ) : (
        <>
          <Buscador onSearch={handleSearch} />
          <Filtro genres={uniqueGenres} onFilter={handleFilter} />
          <ListaElementos shows={filteredFavorites} onSelectShow={handleSelectShow} onToggleFavorite={handleToggleFavorite} buttonText="Eliminar de Favoritos" />
        </>
      )}
    </div>
  );
};

export default Favorito;