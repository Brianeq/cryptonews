// CoinGecko - markets con sparkline (7d)
// Free: funciona sin key. Si tenés una, ponela en .env como VITE_COINGECKO_KEY
// y se envía en el header 'x-cg-demo-api-key' (evita rate limits).
const API = "https://api.coingecko.com/api/v3/coins/markets";

const headers = (() => {
  const h = {};
  const key = import.meta.env?.VITE_COINGECKO_KEY;
  if (key) h["x-cg-demo-api-key"] = key; // opcional
  return h;
})();

export async function fetchMiniMarkets(ids = ["bitcoin", "ethereum"], vs = "usd") {
  const url = new URL(API);
  url.searchParams.set("vs_currency", vs);
  url.searchParams.set("ids", ids.join(","));
  url.searchParams.set("sparkline", "true");
  url.searchParams.set("precision", "2");
  url.searchParams.set("price_change_percentage", "1h,24h,7d");

  const res = await fetch(url.toString(), { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`CoinGecko ${res.status} ${res.statusText}`);
  const data = await res.json();

  // normalizo lo que necesitamos
  return data.map((c) => ({
    id: c.id,                      // "bitcoin"
    symbol: (c.symbol || "").toUpperCase(), // "BTC"
    name: c.name,                  // "Bitcoin"
    image: c.image,                // icono de moneda
    price: c.current_price,        // precio actual
    change24h: c.price_change_percentage_24h, // %
    spark: c.sparkline_in_7d?.price || [],   // array de precios 7d
  }));
}
