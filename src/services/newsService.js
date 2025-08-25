// CoinDesk article list (ES) + Microlink (og:image)
const COINDESK_LIST = "https://data-api.coindesk.com/news/v1/article/list";
const MICROLINK = "https://api.microlink.io";

// Normaliza un artículo de CoinDesk
const normalize = (a, i = 0) => ({
  id: a.ID ?? a.id ?? i,
  title: a.TITLE ?? a.title ?? "",
  url: a.URL ?? a.url ?? a.canonical_url ?? "",
});

// (opcional) header con API key de CoinDesk si la pusiste en .env
const headers = (() => {
  const h = {};
  const key = import.meta.env?.VITE_COINDESK_API_KEY;
  if (key) h["authorization"] = `Apikey ${key}`;
  return h;
})();

export async function fetchCoindeskNewsESDetailed(limit = 12) {
  // 1) Pido la lista ES de CoinDesk (pido extra por si alguno falla)
  const listUrl = new URL(COINDESK_LIST);
  listUrl.searchParams.set("lang", "ES");
  listUrl.searchParams.set("limit", String(limit * 3));

  const res = await fetch(listUrl.toString(), { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`CoinDesk ES: ${res.status}`);

  const json = await res.json();
  const arr = Array.isArray(json?.Data) ? json.Data : Array.isArray(json?.data) ? json.data : [];

  // Base: tomo más items por si alguna URL falla al enriquecer
  const base = arr
    .filter((a) => a.URL ?? a.url ?? a.canonical_url)
    .slice(0, limit * 2)
    .map((a, i) => {
      const n = normalize(a, i);
      return {
        ...n,
        rawDescription: a.EXCERPT ?? a.DESCRIPTION ?? a.SUMMARY ?? "",
        rawDate: a.PUBLISHED ?? a.PUBLISH_DATE ?? a.CREATED ?? a.date ?? null,
      };
    });

  const safeISO = (d) => {
    const t = new Date(d);
    return isNaN(t.getTime()) ? new Date().toISOString() : t.toISOString();
  };

  // 2) Enriquecimiento por Microlink: description + date + og:image
  const enrichOne = async (it) => {
    try {
      const m = new URL(MICROLINK);
      m.searchParams.set("url", it.url);
      m.searchParams.set("fields", "title,description,date,image.url");
      const r = await fetch(m.toString(), { cache: "no-store" });
      const mj = await r.json();

      const img = mj?.data?.image?.url;
      const desc = mj?.data?.description || it.rawDescription || "";
      const dateRaw = mj?.data?.date || it.rawDate || null;

      return {
        id: it.id,
        title: it.title,
        url: it.url,
        image: img || "/slider/fallback.jpg",
        alt: it.title || "CryptoNews",
        description: desc,
        publishedAt: dateRaw ? safeISO(dateRaw) : new Date().toISOString(),
      };
    } catch {
      return {
        id: it.id,
        title: it.title,
        url: it.url,
        image: "/slider/fallback.jpg",
        alt: it.title || "CryptoNews",
        description: it.rawDescription || "",
        publishedAt: it.rawDate ? safeISO(it.rawDate) : new Date().toISOString(),
      };
    }
  };

  const enriched = await Promise.all(base.slice(0, limit).map(enrichOne));

  // 3) Completo por si faltó alguno
  while (enriched.length < limit) {
    enriched.push({
      id: `fallback-${enriched.length + 1}`,
      title: "CryptoNews",
      url: "#",
      image: "/slider/fallback.jpg",
      alt: "CryptoNews",
      description: "Resumen no disponible.",
      publishedAt: new Date().toISOString(),
    });
  }

  return enriched.slice(0, limit);
}
