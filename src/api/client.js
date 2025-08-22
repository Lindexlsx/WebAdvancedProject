
const BASE = import.meta.env.VITE_API_BASE;
const VIEW = import.meta.env.VITE_API_VIEW;

console.log("🔍 Debug - VITE_API_BASE:", BASE);
console.log("🔍 Debug - VITE_API_VIEW:", VIEW);

export async function getBuildingData() {
  try {
    if (!BASE || !VIEW) {
      throw new Error("BASE of VIEW environment variable ontbreekt.");
    }

    const url = `${BASE}/${VIEW}/result/JSON`;
    console.log("🌐 Fetch URL:", url);

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const raw = await res.json();

    console.log("✅ Response keys:", Object.keys(raw));
    console.log("📊 Aantal facts ontvangen:", raw.facts?.length);

    const normalized = normalizeBuildingData(raw);

    console.log("📊 Aantal genormaliseerde records:", normalized.length);
    if (normalized.length > 0) {
      console.log("📌 Eerste record:", normalized[0]);
    }

    return normalized;
  } catch (err) {
    console.error("❌ Fout bij ophalen Statbel data:", err);

    // Toon ook melding in UI
    const tableSection = document.getElementById("table");
    if (tableSection) {
      tableSection.innerHTML = `
        <p style="color:red">Fout bij ophalen data: ${err.message}</p>
      `;
    }

    return [];
  }
}

function normalizeBuildingData(raw) {
  if (!raw || !raw.facts) return [];

  return raw.facts
    .filter(item => item.Gewest && item["Aantal eenheden"] != null)
    .map(item => ({
      karakteristieken: item["Karakteristieken"],
      gewest: item["Gewest"],
      gesloten: Number(item["Huizen in gesloten bebouwing"] || 0),
      halfopen: Number(item["Huizen in halfopen bebouwing"] || 0),
      open: Number(item["Huizen in open bebouwing, hoeven en kastelen"] || 0),
      gebouwen: Number(item["Buildings en flatgebouwen met appartementen"] || 0),
    }));
}
