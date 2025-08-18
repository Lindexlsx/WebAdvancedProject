const BASE = import.meta.env.VITE_API_BASE;
const KEY  = import.meta.env.VITE_API_KEY; // optioneel

export async function getItems() {
  const url = `${BASE}/items`; // pas dit aan naar je API endpoint
  const res = await fetch(url, {
    headers: KEY ? { 'Authorization': `Bearer ${KEY}` } : {}
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return await res.json();
}
