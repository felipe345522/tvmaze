import React, { useState } from 'react';
import './style.css';

const Usuario: React.FC = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (user.name && user.email) {
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: '', email: '' });
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="usuario">
      <h1>Usuario</h1>
      {isLoggedIn ? (
        <div className="profile">
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="Nombre"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
      )}
    </div>
  );
};

export default Usuario;