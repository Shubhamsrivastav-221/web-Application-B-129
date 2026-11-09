// Mock persistence (localStorage). If VITE_API_URL is set, the same db JSON is synced to GET/PUT {API}/db.
const API = import.meta.env.VITE_API_URL;
const KEY = 'crm_db';

export async function loadDb() {
  if (API) {
    try { const r = await fetch(`${API}/db`); if (r.ok) return await r.json(); } catch { /* fall back to local */ }
  }
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}

export async function saveDb(db) {
  try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { /* storage unavailable */ }
  if (API) {
    try { await fetch(`${API}/db`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(db) }); } catch { /* offline */ }
  }
}
