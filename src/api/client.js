
const BASE = import.meta.env.VITE_API_BASE;
const VIEW = import.meta.env.VITE_API_VIEW;

export async function getPopulationData() {
  try {
    const url = `${BASE}/${VIEW}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const raw = await res.json();
    return normalizePopulationData(raw);
  } catch (err) {
    console.error("Fout bij ophalen Statbel data:", err);
    return [];
  }
}

