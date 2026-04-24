import React from 'react';
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

interface DetallePaginaProps {
  show: Show | null;
  onBack: () => void;
  onToggleFavorite: (show: Show) => void;
}

const DetallePagina: React.FC<DetallePaginaProps> = ({ show, onBack, onToggleFavorite }) => {
  if (!show) return <div>No show selected</div>;

  return (
    <div className="detalle-pagina">
      <button onClick={onBack}>Volver</button>
      <div className="show-detail">
        <img src={show.image?.original || show.image?.medium || '/placeholder.png'} alt={show.name} />
        <h1>{show.name}</h1>
        <p><strong>Géneros:</strong> {show.genres.join(', ')}</p>
        <p><strong>Rating:</strong> {show.rating.average || 'N/A'}</p>
        <div dangerouslySetInnerHTML={{ __html: show.summary || 'No summary available' }} />
        {show.officialSite && (
          <p><a href={show.officialSite} target="_blank" rel="noopener noreferrer">Sitio Oficial</a></p>
        )}
        <button onClick={() => onToggleFavorite(show)}>Agregar a Favoritos</button>
      </div>
    </div>
  );
};

export default DetallePagina;