// src/components/Table.js

// Definieer de kolommen die je wilt tonen.
// Elke entry bevat een label (kolomtitel) en de key (eigenschap in je data-object).
const COLUMNS = [
  { label: "Jaar", key: "jaar" },
  { label: "Gemeente", key: "gemeente" },
  { label: "Geslacht", key: "geslacht" },
  { label: "Leeftijd", key: "leeftijd" },
  { label: "Nationaliteit", key: "nationaliteit" },
  { label: "Burgerlijke staat", key: "burgerlijkeStaat" },
  { label: "Aantal", key: "aantal" },
];

/**
 * Render een HTML-tabel in de container #table
 * @param {Array} data - genormaliseerde records
 */
export function renderTable(data) {
  const container = document.getElementById("table");
  if (!container) return;

  // Bouw de table head
  const thead = `
    <thead>
      <tr>
        ${COLUMNS.map(col => `<th>${col.label}</th>`).join("")}
      </tr>
    </thead>
  `;

  // Bouw de table body
  const tbody = `
    <tbody>
      ${data.map(row => `
        <tr>
          ${COLUMNS.map(col => `<td>${row[col.key]}</td>`).join("")}
        </tr>
      `).join("")}
    </tbody>
  `;

  // Zet de volledige tabel in de container
  container.innerHTML = `
    <table class="data-table">
      ${thead}
      ${tbody}
    </table>
  `;
}
