import { useEffect, useState } from 'react'
import './App.css'

type Show = {
  id: number
  name: string
  image?: { medium: string; original: string } | null
  genres: string[]
  rating: { average: number | null }
  summary: string | null
  officialSite: string | null
}

function App() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://api.tvmaze.com/shows', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        return response.json()
      })
      .then((data: Show[]) => {
        setShows(data.slice(0, 48))
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError('No se pudo cargar los shows. Intenta de nuevo más tarde.')
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <main className="app-shell">
      <header className="hero-panel">
        <div>
          <span className="eyebrow">TVMaze API</span>
          <h1>Programa, serie y ficha rápida</h1>
          <p className="lead">
            Explora una selección de programas de televisión con sus detalles, géneros y calificaciones.
          </p>
        </div>
      </header>

      <section className="content">
        {loading ? (
          <div className="status">Cargando shows…</div>
        ) : error ? (
          <div className="status error">{error}</div>
        ) : (
          <div className="grid">
            {shows.map((show) => (
              <article key={show.id} className="card">
                {show.image?.medium ? (
                  <img src={show.image.medium} alt={show.name} />
                ) : (
                  <div className="card-placeholder">Sin imagen</div>
                )}
                <div className="card-body">
                  <div className="card-header">
                    <h2>{show.name}</h2>
                    <span className="rating">⭐ {show.rating.average ?? 'N/A'}</span>
                  </div>
                  <p className="meta">{show.genres.length ? show.genres.join(' · ') : 'General'}</p>
                  <p
                    className="summary"
                    dangerouslySetInnerHTML={{ __html: show.summary ?? 'Sin descripción disponible.' }}
                  />
                  {show.officialSite ? (
                    <a className="visit-link" href={show.officialSite} target="_blank" rel="noreferrer">
                      Ver sitio oficial
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
