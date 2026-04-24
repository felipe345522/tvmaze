import React, { useEffect, useState } from 'react';
import './style.css';
import Buscador from '../Buscador';
import Filtro from '../Filtro';
impprt Splash from '../Splash';


type Show = {
  id: number;
  name: string;
  image?: { medium: string; original: string } | null;
  genres: string[];
  rating: { average: number | null };
  summary: string | null;
  officialSite: string | null;
};

const Home: React.FC = () => {
  const [allShows, setAllShows] = useState<Show[]>([]);
  const [baseShows, setBaseShows] = useState<Show[]>([]);
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

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

  const uniqueGenres = Array.from(new Set(allShows.flatMap(show => show.genres)));

  if (loading) return <div className="loading">Cargando shows...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1>Shows Populares</h1>
      <Buscador onSearch={handleSearch} />
      <Filtro genres={uniqueGenres} onFilter={handleFilter} />
      <div className="shows-grid">
        {filteredShows.map((show) => (
          <div key={show.id} className="show-card">
            <img src={show.image?.medium || '/placeholder.png'} alt={show.name} />
            <h3>{show.name}</h3>
            <p>Géneros: {show.genres.join(', ')}</p>
            <p>Rating: {show.rating.average || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;