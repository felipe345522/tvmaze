import React from 'react';
import './style.css';

interface MenuProps {
  onSelect: (page: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelect }) => {
  return (
    <nav className="menu">
      <ul>
        <li><button onClick={() => onSelect('home')}>Home</button></li>
        <li><button onClick={() => onSelect('favorito')}>Favorito</button></li>
        <li><button onClick={() => onSelect('original')}>Original</button></li>
        <li><button onClick={() => onSelect('informativa')}>Informativa</button></li>
        <li><button onClick={() => onSelect('usuario')}>Usuario</button></li>
      </ul>
    </nav>
  );
};

export default Menu;