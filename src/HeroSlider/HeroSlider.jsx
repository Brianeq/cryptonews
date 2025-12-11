import { useEffect, useState } from "react";
import "./HeroSlider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchCoindeskNewsESDetailed } from "../services/newsService";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const total = slides.length;
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const goTo = (i) => setIndex(i);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCoindeskNewsESDetailed(5);
        setSlides(data);
        setIndex(0);
        console.log("HeroSlider: primeras noticias", data); 
      } catch (e) {
        console.error(e);
        setSlides(
          [...Array(5)].map((_, i) => ({
            id: `fb-${i}`,
            title: "CryptoNews",
            url: "#",
            image: "/slider/fallback.jpg",
            alt: "CryptoNews",
          }))
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!total) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  if (loading || total === 0) {
    return (
      <section className="hs-wrapper" aria-label="Cargando slider">
        <div className="hs-viewport"><div className="hs-skeleton" /></div>
        <div className="hs-dots">{[...Array(5)].map((_, i) => <span key={i} className="hs-dot" />)}</div>
      </section>
    );
  }

  const current = slides[index] || {};
  const { image, url, alt, title } = current;
  const titleToShow = title || alt || "Ver noticia";

  return (
    <section className="hs-wrapper" aria-label="Slider de noticias cripto">
      <div className="hs-viewport">
        <a
          href={url}
          className="hs-media"
          aria-label={titleToShow}
          title={titleToShow}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="hs-img"
            src={image}
            alt={alt || titleToShow}
            loading="eager"
            onError={(e) => {
              e.currentTarget.src = "/slider/fallback.jpg";
              e.currentTarget.onerror = null;
            }}
          />
          {/* Overlay con degradado + título del artículo */}
          <div className="hs-grad" aria-hidden="true" />
          <div className="hs-caption">
            <h2>{titleToShow}</h2>
          </div>
        </a>

        <button className="hs-arrow hs-left" onClick={prev} aria-label="Anterior" type="button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="hs-arrow hs-right" onClick={next} aria-label="Siguiente" type="button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="hs-dots" role="tablist" aria-label="Paginación del slider">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            className={`hs-dot ${i === index ? "hs-dot--active" : ""}`}
            onClick={() => goTo(i)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
