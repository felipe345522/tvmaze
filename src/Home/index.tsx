import React, { useEffect, useState } from 'react';
import './style.css';
import Buscador from '../Buscador';
import Filtro from '../Filtro';
import ListaElementos from '../Lista de elementos';
import DetallePagina from '../Detalle página';
import type { Show } from '../types';

const Home: React.FC = () => {
  const [allShows, setAllShows] = useState<Show[]>([]);
  const [baseShows, setBaseShows] = useState<Show[]>([]);
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.tvmaze.com/shows', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data: Show[]) => {
        const shows = data.slice(0, 48);
        setAllShows(shows);
        setBaseShows(shows);
        setFilteredShows(shows);
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError('No se pudo cargar los shows. Intenta de nuevo más tarde.');
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setBaseShows(allShows);
      applyFilter(allShows, selectedGenres);
    } else {
      fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then((data: { show: Show }[]) => {
          const results = data.map(item => item.show);
          setBaseShows(results);
          applyFilter(results, selectedGenres);
        })
        .catch(() => {
          setError('Error en la búsqueda.');
        });
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

  const uniqueGenres = Array.from(new Set(allShows.flatMap(show => show.genres)));

  if (loading) return <div className="loading">Cargando shows...</div>;
  if (error) return <div className="error">{error}</div>;

  if (selectedShow) {
    return <DetallePagina show={selectedShow} onBack={handleBack} onToggleFavorite={handleToggleFavorite} />;
  }

  return (
    <div className="home">
      <h1>Shows Populares</h1>
      <Buscador onSearch={handleSearch} />
      <Filtro genres={uniqueGenres} onFilter={handleFilter} />
      <ListaElementos shows={filteredShows} onSelectShow={handleSelectShow} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default Home;