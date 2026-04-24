import React, { useEffect, useState } from 'react';
import './style.css';

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
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setShows(data.slice(0, 48));
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

  if (loading) return <div className="loading">Cargando shows...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1>Shows Populares</h1>
      <div className="shows-grid">
        {shows.map((show) => (
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