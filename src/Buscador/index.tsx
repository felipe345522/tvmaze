import React, { useState } from 'react';
import './style.css';

interface BuscadorProps {
  onSearch: (query: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="buscador" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default Buscador;