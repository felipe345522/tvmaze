import { useState } from 'react'
import './App.css'
import Menu from './Menú'
import Home from './Home'
import Favorito from './Favorito'
import Original from './Original'
import Informativa from './Informativa'
import Usuario from './usuario'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'favorito':
        return <Favorito />
      case 'original':
        return <Original />
      case 'informativa':
        return <Informativa />
      case 'usuario':
        return <Usuario />
      default:
        return <Home />
    }
  }

  return (
    <main className="app-shell">
      <Menu onSelect={setCurrentPage} />
      {renderPage()}
    </main>
  )
}

export default App
