import React, { useEffect, useState } from 'react';
import './style.css';

type Show = {
  id: number;
  name: string;
  image?: { medium: string; original: string } | null;
  network?: { name: string } | null;
};

const Original: React.FC = () => {
  const [originalShows, setOriginalShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(response => response.json())
      .then((data: Show[]) => {
        // Filter for shows with network (assuming original means network shows)
        const originals = data.filter(show => show.network).slice(0, 24);
        setOriginalShows(originals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Cargando shows originales...</div>;

  return (
    <div className="original">
      <h1>Shows Originales</h1>
      <div className="shows-grid">
        {originalShows.map((show) => (
          <div key={show.id} className="show-card">
            <img src={show.image?.medium || '/placeholder.png'} alt={show.name} />
            <h3>{show.name}</h3>
            <p>Red: {show.network?.name || 'Desconocida'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Original;