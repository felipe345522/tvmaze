import React, { useState } from 'react';
import './style.css';

interface FiltroProps {
  genres: string[];
  onFilter: (selectedGenres: string[]) => void;
}

const Filtro: React.FC<FiltroProps> = ({ genres, onFilter }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreChange = (genre: string) => {
    const newSelected = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newSelected);
    onFilter(newSelected);
  };

  return (
    <div className="filtro">
      <h3>Filtrar por Género</h3>
      <div className="genres">
        {genres.map((genre) => (
          <label key={genre}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filtro;