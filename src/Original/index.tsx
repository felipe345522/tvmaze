import React, { useEffect, useState } from 'react';
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
  network?: { name: string } | null;
};

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
        // Filter for shows with network (original network shows)
        const originals = data.filter(show => show.network).slice(0, 48);
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
    let filtered = shows;
    if (genres.length > 0) {
      filtered = shows.filter(show => genres.some(genre => show.genres.includes(genre)));
    }
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
    } else {
      favorites.push(show);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleBack = () => {
    setSelectedShow(null);
  };

  const uniqueGenres = Array.from(new Set(allOriginalShows.flatMap(show => show.genres)));

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
      <ListaElementos shows={filteredShows} onSelectShow={handleSelectShow} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default Original;