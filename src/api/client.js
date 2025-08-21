const BASE = import.meta.env.VITE_API_BASE;
const VIEW = import.meta.env.VITE_API_VIEW;

export async function getPopulationData() {
  try {
    const url = `${BASE}/${VIEW}/result/JSON`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const raw = await res.json();

    const normalized = normalizePopulationData(raw);

    return normalized;
  } catch (err) {
    console.error("Fout bij ophalen Statbel data:", err);
    return [];
  }
}

function normalizePopulationData(raw) {
  if (!raw || !raw.facts) return [];

  return raw.facts
    .filter(item => item["Bevolking op 01 januari 2025"] !== null && item["Bevolking op 01 januari 2025"] !== undefined)
    .map(item => ({
      jaar: "2025", // jaar zit hier vast in de viewtitel
      gemeente: item["Gewest"] || item["België"], // afhankelijk van granulariteit
      geslacht: item["Geslacht"],
      leeftijd: item["Leeftijdsgroep"],
      nationaliteit: item["Mannen en vrouwen"], // of splitsen op Belg/niet-Belg als aanwezig
      burgerlijkeStaat: item["Burgerlijke staat"],
      aantal: Number(item["Bevolking op 01 januari 2025"])
    }));
}
