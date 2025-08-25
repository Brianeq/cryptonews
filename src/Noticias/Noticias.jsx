import { useEffect, useState } from "react";
import "./Noticias.css";
import { fetchCoindeskNewsESDetailed } from "../services/newsService";

export default function Noticias(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchCoindeskNewsESDetailed(12); // cantidad a mostrar
        if (alive) setItems(data);
      } catch (e) {
        console.error(e);
        if (alive) setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section className="nd-wrapper">
      <h1 className="nd-title">Noticias destacadas</h1>

      {loading ? (
        <ul className="nd-list">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="nd-item nd-skel" />
          ))}
        </ul>
      ) : items.length === 0 ? (
        <p className="nd-empty">No hay noticias para mostrar ahora mismo.</p>
      ) : (
        <ul className="nd-list">
          {items.map((n) => (
            <li key={n.id || n.url} className="nd-item">
              <a className="nd-thumb" href={n.url} target="_blank" rel="noreferrer">
                <img src={n.image} alt={n.alt || n.title} loading="lazy" />
              </a>

              <div className="nd-body">
                <a className="nd-hl" href={n.url} target="_blank" rel="noreferrer">
                  {n.title}
                </a>

                <p className="nd-desc">{n.description}</p>

                <time className="nd-date" dateTime={n.publishedAt}>
                  {new Date(n.publishedAt).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
