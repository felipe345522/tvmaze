import React from 'react';
import './style.css';

type Show = {
  id: number;
  name: string;
  image?: { medium: string; original: string } | null;
  genres: string[];
  rating: { average: number | null };
};

interface ListaElementosProps {
  shows: Show[];
  onSelectShow: (show: Show) => void;
  onToggleFavorite: (show: Show) => void;
  buttonText?: string;
}

const ListaElementos: React.FC<ListaElementosProps> = ({ shows, onSelectShow, onToggleFavorite, buttonText = "Favorito" }) => {
  return (
    <div className="lista-elementos">
      <div className="shows-grid">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <img src={show.image?.medium || '/placeholder.png'} alt={show.name} onClick={() => onSelectShow(show)} />
            <h3 onClick={() => onSelectShow(show)}>{show.name}</h3>
            <p>Géneros: {show.genres.join(', ')}</p>
            <p>Rating: {show.rating.average || 'N/A'}</p>
            <button onClick={() => onToggleFavorite(show)}>{buttonText}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaElementos;