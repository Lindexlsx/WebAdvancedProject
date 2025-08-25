
import { getVisibleRecords } from '../state/store.js';

export function renderHome(store) {
  const tableSection = document.getElementById('table');
  const rows = getVisibleRecords(store);

  console.log("🔎 getVisibleRecords rows:", rows.length, rows[0]);

  if (!rows.length) {
    tableSection.innerHTML = "<p>Geen resultaten gevonden.</p>";
    return;
  }

  const headers = [
    { key: 'karakteristieken', label: 'Karakteristieken' },
    { key: 'gewest',            label: 'Gewest' },
    { key: 'gesloten',          label: 'Huizen in gesloten bebouwing' },
    { key: 'halfopen',          label: 'Huizen in halfopen bebouwing' },
    { key: 'open',              label: 'Huizen in open bebouwing, hoeven en kastelen' },
    { key: 'gebouwen',          label: 'Buildings en flatgebouwen met appartementen' },
  ];

  // Bepaal actieve richting (default = desc)
  const arrow = (key) => {
    if (!store.sort || store.sort.key !== key) {
      return `<span class="arrow" data-key="${key}" data-dir="desc">▼</span>`;
    }
    return store.sort.dir === 'asc'
      ? `<span class="arrow" data-key="${key}" data-dir="asc">▲</span>`
      : `<span class="arrow" data-key="${key}" data-dir="desc">▼</span>`;
  };

  tableSection.innerHTML = `
    <table>
      <thead>
        <tr>
          ${headers.map(h => `
            <th>
              ${h.label}
              ${arrow(h.key)}
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td>${r.karakteristieken}</td>
            <td>${r.gewest}</td>
            <td class="numeric">${Number(r.gesloten).toLocaleString("nl-BE")}</td>
            <td class="numeric">${Number(r.halfopen).toLocaleString("nl-BE")}</td>
            <td class="numeric">${Number(r.open).toLocaleString("nl-BE")}</td>
            <td class="numeric">${Number(r.gebouwen).toLocaleString("nl-BE")}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // 👉 Click-events op pijltjes, niet op hele header
  tableSection.querySelectorAll('.arrow').forEach(span => {
    span.addEventListener('click', () => {
      const key = span.dataset.key;
      const currentDir = store.sort?.key === key ? store.sort.dir : 'desc';
      store.sort = { key, dir: currentDir === 'asc' ? 'desc' : 'asc' };
      renderHome(store);
    });
  });
}
