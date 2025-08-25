
const COLUMNS = [
  { label: "Jaar", key: "jaar" },
  { label: "Gemeente", key: "gemeente" },
  { label: "Geslacht", key: "geslacht" },
  { label: "Leeftijd", key: "leeftijd" },
  { label: "Nationaliteit", key: "nationaliteit" },
  { label: "Burgerlijke staat", key: "burgerlijkeStaat" },
  { label: "Aantal", key: "aantal" }
];

export function renderTable(data) {
  const container = document.getElementById("table");
  if (!container) return;

  const thead = `
    <thead>
      <tr>${COLUMNS.map(c => `<th>${c.label}</th>`).join("")}</tr>
    </thead>
  `;

  const tbody = `
    <tbody>
      ${data.map(r => `
        <tr>${COLUMNS.map(c => `<td>${r[c.key]}</td>`).join("")}</tr>
      `).join("")}
    </tbody>
  `;

  container.innerHTML = `<table class="data-table">${thead}${tbody}</table>`;
}
