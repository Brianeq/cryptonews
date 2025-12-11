// src/services/newsGateway.js
import { fetchCoindeskNewsESDetailed } from "./newsService";

let cache = { ts: 0, items: [], limit: 0, pending: null };
const MAX_AGE = 10 * 60 * 1000; // 10 min

export async function getNews(limit = 12) {
  const now = Date.now();

  // cache válido y suficiente para el limit pedido
  if (cache.items.length && cache.limit >= limit && now - cache.ts < MAX_AGE) {
    return cache.items.slice(0, limit);
  }

  // si ya hay una promesa en curso, esperala
  if (cache.pending) {
    const items = await cache.pending;
    return items.slice(0, limit);
  }

  // disparar fetch real
  cache.pending = fetchCoindeskNewsESDetailed(limit)
    .then((items) => {
      cache.ts = Date.now();
      cache.items = items;
      cache.limit = items.length;
      cache.pending = null;
      return items;
    })
    .catch((err) => {
      cache.pending = null;
      throw err;
    });

  const result = await cache.pending;
  return result.slice(0, limit);
}
