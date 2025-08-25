
const BASE = import.meta.env.VITE_API_BASE;
const VIEW = import.meta.env.VITE_API_VIEW;

export async function getBuildingData() {
  try {
    const url = `${BASE}/${VIEW}/result/JSON`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

    const raw = await res.json();
    const normalized = normalizeBuildingData(raw);

    console.log("Aantal genormaliseerde records:", normalized.length);
    console.log("Eerste record:", normalized[0]);

    return normalized;
  } catch (err) {
    console.error("Fout bij ophalen Statbel data:", err);
    return [];
  }
}

function normalizeBuildingData(raw) {
  if (!raw?.facts) return [];

  const grouped = {};

  raw.facts
    .filter(i => i["Gewest"] && i["Gewest"] !== "België")
    .forEach(i => {
      const key = `${i["Karakteristieken"]}-${i["Gewest"]}-${i["Jaar"]}`;

      if (!grouped[key]) {
        grouped[key] = {
          karakteristieken: i["Karakteristieken"],
          gewest: i["Gewest"],
          jaar: i["Jaar"],
          gesloten: 0,
          halfopen: 0,
          open: 0,
          gebouwen: 0
        };
      }

      const aantal = Number(i["Aantal eenheden"] ?? 0);
      if (i["Gebouwtype"].includes("gesloten")) grouped[key].gesloten += aantal;
      else if (i["Gebouwtype"].includes("halfopen")) grouped[key].halfopen += aantal;
      else if (i["Gebouwtype"].includes("open")) grouped[key].open += aantal;
      else if (i["Gebouwtype"].includes("flat") || i["Gebouwtype"].includes("Buildings")) grouped[key].gebouwen += aantal;
    });

  const result = Object.values(grouped);
  console.log("Aantal genormaliseerde records:", result.length);
  console.log("Eerste record:", result[0]);
  return result;
}
