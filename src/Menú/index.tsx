import React from 'react';
import './style.css';
import Icono from '../Icono';

interface MenuProps {
  onSelect: (page: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelect }) => {
  return (
    <nav className="menu">
      <ul>
        <li>
          <button onClick={() => onSelect('home')}>
            <Icono type="home" size={18} />
            Home
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('favorito')}>
            <Icono type="heart" size={18} />
            Favorito
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('original')}>
            <Icono type="play" size={18} />
            Original
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('informativa')}>
            <Icono type="info" size={18} />
            Informativa
          </button>
        </li>
        <li>
          <button onClick={() => onSelect('usuario')}>
            <Icono type="user" size={18} />
            Usuario
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;