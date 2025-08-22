
import { getVisibleRecords } from '../state/store.js';

export function renderHome(store) {
  const tableSection = document.getElementById('table');
  const rows = getVisibleRecords(store);

  if (!rows.length) {
    tableSection.innerHTML = "<p>Geen resultaten gevonden.</p>";
    return;
  }

  // Definieer kolommen (key ↔ label). Keys moeten matchen met je genormaliseerde data.
  const headers = [
    { key: 'karakteristieken', label: 'Karakteristieken' },      // tekst
    { key: 'gewest',            label: 'Gewest' },               // tekst
    { key: 'gesloten',          label: 'Huizen in gesloten bebouwing' }, // nummer
    { key: 'halfopen',          label: 'Huizen in halfopen bebouwing' }, // nummer
    { key: 'open',              label: 'Huizen in open bebouwing, hoeven en kastelen' }, // nummer
    { key: 'gebouwen',          label: 'Buildings en flatgebouwen met appartementen' }, // nummer
  ];

  // Klein hulpfunctietje voor sort-pijltje
  const arrow = (key) => {
    if (store.sort?.key !== key) return '';
    return store.sort.dir === 'asc' ? ' ▲' : ' ▼';
  };

  tableSection.innerHTML = `
    <table>
      <thead>
        <tr>
          ${headers.map(h => `
            <th data-key="${h.key}" class="sortable">
              ${h.label}${arrow(h.key)}
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td>${r.karakteristieken}</td>
            <td>${r.gewest}</td>
            <td>${r.gesloten}</td>
            <td>${r.halfopen}</td>
            <td>${r.open}</td>
            <td>${r.gebouwen}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // 👉 Click-events op alle <th> (na innerHTML!)
  tableSection.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      // Toggle richting als dezelfde kolom; anders start met asc
      if (store.sort?.key === key) {
        store.sort.dir = store.sort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        store.sort = { key, dir: 'asc' };
      }
      // Herteken om sortering + pijltje te updaten
      renderHome(store);
    });
  });
}
