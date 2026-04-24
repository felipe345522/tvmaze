import React, { useEffect, useState } from 'react';
import './style.css';
import Buscador from '../Buscador';
import Filtro from '../Filtro';
import ListaElementos from '../Lista de elementos';
import DetallePagina from '../Detalle página';
import type { Show } from '../types';
import {
  getOriginalShowList,
  filterShowsByGenres,
  getUniqueGenres,
  computeOriginalityScore,
  createOriginalShowTag,
  getTopOriginalShows,
} from './originalUtils';

const Original: React.FC = () => {
  const [allOriginalShows, setAllOriginalShows] = useState<Show[]>([]);
  const [baseShows, setBaseShows] = useState<Show[]>([]);
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(response => response.json())
      .then((data: Show[]) => {
        const originals = getOriginalShowList(data);
        setAllOriginalShows(originals);
        setBaseShows(originals);
        setFilteredShows(originals);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar shows originales.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setBaseShows(allOriginalShows);
      applyFilter(allOriginalShows, selectedGenres);
    } else {
      // Search within originals
      const results = allOriginalShows.filter(show =>
        show.name.toLowerCase().includes(query.toLowerCase())
      );
      setBaseShows(results);
      applyFilter(results, selectedGenres);
    }
  };

  const handleFilter = (genres: string[]) => {
    setSelectedGenres(genres);
    applyFilter(baseShows, genres);
  };

  const applyFilter = (shows: Show[], genres: string[]) => {
    const filtered = filterShowsByGenres(shows, genres);
    setFilteredShows(filtered);
  };

  const handleSelectShow = (show: Show) => {
    setSelectedShow(show);
  };

  const handleToggleFavorite = (show: Show) => {
    const stored = localStorage.getItem('favorites');
    let favorites: Show[] = stored ? JSON.parse(stored) : [];
    const isFavorite = favorites.some(fav => fav.id === show.id);
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== show.id);
      alert('Eliminado de favoritos');
    } else {
      favorites.push(show);
      alert('Agregado a favoritos');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleBack = () => {
    setSelectedShow(null);
  };

  const uniqueGenres = getUniqueGenres(allOriginalShows);
  const topOriginalShows = getTopOriginalShows(allOriginalShows, 3);

  if (loading) return <div className="loading">Cargando shows originales...</div>;
  if (error) return <div className="error">{error}</div>;

  if (selectedShow) {
    return <DetallePagina show={selectedShow} onBack={handleBack} onToggleFavorite={handleToggleFavorite} />;
  }

  return (
    <div className="original">
      <h1>Shows Originales</h1>
      <Buscador onSearch={handleSearch} />
      <Filtro genres={uniqueGenres} onFilter={handleFilter} />
      {topOriginalShows.length > 0 && (
        <section className="original-highlight">
          <h2>Selección original</h2>
          <div className="highlight-grid">
            {topOriginalShows.map(show => (
              <article key={show.id} className="highlight-card">
                <h3>{show.name}</h3>
                <p>{createOriginalShowTag(show)}</p>
                <span>Puntaje original: {computeOriginalityScore(show)}</span>
              </article>
            ))}
          </div>
        </section>
      )}
      <ListaElementos shows={filteredShows} onSelectShow={handleSelectShow} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default Original;