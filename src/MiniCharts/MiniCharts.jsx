import { useEffect, useMemo, useState } from "react";
import "./MiniCharts.css";
import { fetchMiniMarkets } from "../services/marketService";

/* === Mini componente inline para el gráfico === */
function Sparkline({ points = [], color = "#16a34a", height = 80, strokeW = 2 }) {
  // viewBox fijo: el SVG se estira a width:100% por CSS
  const width = 320;

  const path = useMemo(() => {
    if (!points.length) return "";
    const min = Math.min(...points);
    const max = Math.max(...points);
    const pad = 4;
    const w = width - pad * 2;
    const h = height - pad * 2;

    if (max === min) {
      const y = pad + h / 2;
      return `M${pad},${y} L${pad + w},${y}`;
    }

    const sx = (i) => pad + (i * w) / (points.length - 1);
    const sy = (v) => pad + h - ((v - min) * h) / (max - min);

    let d = `M${sx(0)},${sy(points[0])}`;
    for (let i = 1; i < points.length; i++) d += ` L${sx(i)},${sy(points[i])}`;
    return d;
  }, [points, height]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mc-spark" style={{ width: "100%", height }}>
      <path d={path} fill="none" stroke={color} strokeWidth={strokeW} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* === Card una por moneda === */
function Card({ coin }) {
  // color por variación 24h (podés cambiar a 7d si querés)
  const up = (coin.change24h ?? 0) >= 0;
  const color = up ? "#16a34a" : "#dc2626";

  return (
    <article className="mc-card">
      <header className="mc-head">
        <div className="mc-id">
          {coin.image ? (
            <img src={coin.image} alt={coin.name} style={{ width: 28, height: 28, borderRadius: "999px" }} />
          ) : null}
          <h3>
            {coin.name} <span>{coin.symbol}</span>
          </h3>
        </div>
        <div className="mc-price">
          <strong>${Number(coin.price).toLocaleString()}</strong>
          <span className={`mc-pct ${up ? "mc-up" : "mc-down"}`}>
            {up ? "▲" : "▼"} {Math.abs(coin.change24h || 0).toFixed(2)}%
          </span>
        </div>
      </header>

      <Sparkline points={coin.spark} color={color} height={80} />
      <footer className="mc-foot">7 días</footer>
    </article>
  );
}

/* === Contenedor de los 2 minigráficos === */
export default function MiniCharts() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMiniMarkets(["bitcoin", "ethereum"], "usd");
        // asegurar orden BTC, ETH
        const order = ["bitcoin", "ethereum"];
        data.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
        setCoins(data);
      } catch (e) {
        console.error(e);
        setCoins([
          { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 0, change24h: 0, spark: [] },
          { id: "ethereum", symbol: "ETH", name: "Ethereum", price: 0, change24h: 0, spark: [] },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section
      className="mc-wrapper"
      aria-label="Resumen de mercado BTC y ETH"
      /* fallback de layout por si el CSS no carga */
      style={{ width: "min(1400px, 96vw)", margin: "8px auto 24px" }}
    >
      <div
        className="mc-grid"

      >
        {loading
          ? [0, 1].map((i) => <div key={i} className="mc-card mc-skel" />)
          : coins.map((c) => <Card key={c.id} coin={c} />)}
      </div>
    </section>
  );
}
