
const BASE = import.meta.env.VITE_API_BASE;
const VIEW = import.meta.env.VITE_API_VIEW;

export async function getBuildingData() {
  try {
    const url = `${BASE}/${VIEW}/result/JSON`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

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
  if (!raw || !raw.facts) return [];

  const grouped = {};

  raw.facts
    .filter(item => item["Gewest"] && item["Gewest"] !== "België")
    .forEach(item => {
      const key = `${item["Karakteristieken"]}-${item["Gewest"]}-${item["Jaar"]}`;

      if (!grouped[key]) {
        grouped[key] = {
          karakteristieken: item["Karakteristieken"],
          gewest: item["Gewest"],
          jaar: item["Jaar"],
          gesloten: 0,
          halfopen: 0,
          open: 0,
          gebouwen: 0
        };
      }

      const type = item["Gebouwtype"];
      const aantal = Number(item["Aantal eenheden"] ?? 0);

      if (type.includes("gesloten")) {
        grouped[key].gesloten += aantal;
      } else if (type.includes("halfopen")) {
        grouped[key].halfopen += aantal;
      } else if (type.includes("open")) {
        grouped[key].open += aantal;
      } else if (type.includes("flat") || type.includes("Buildings")) {
        grouped[key].gebouwen += aantal;
      }
    });

  const result = Object.values(grouped);
  console.log("Aantal genormaliseerde records:", result.length);
  console.log("Eerste record:", result[0]);
  return result;
}


