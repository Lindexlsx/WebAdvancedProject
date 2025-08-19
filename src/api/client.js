
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

function normalizePopulationData(raw) {
  if (!raw || !raw.data) return [];

  return raw.data
    // filter: enkel rijen die een 'Value' hebben
    .filter(item => item.Value !== null && item.Value !== undefined)
    // map: elk item herschrijven naar vlakke structuur
    .map(item => ({
      jaar: item.jaar || item.Year,
      gemeente: item.gemeente || item.Municipality,
      geslacht: item.geslacht || item.Sex,
      leeftijd: item.leeftijd || item.Age,
      nationaliteit: item.nationaliteit || item.Nationality,
      burgerlijkeStaat: item.burgerlijkeStaat || item.MaritalStatus,
      aantal: Number(item.aantal || item.Value) // forceren naar nummer
    }));
}
