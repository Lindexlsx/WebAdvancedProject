
import { getVisibleRecords } from '../state/store.js';

export function renderHome(store) {
  const tableSection = document.getElementById('table');
  const visible = getVisibleRecords(store);

  if (visible.length === 0) {
    tableSection.innerHTML = "<p>Geen resultaten gevonden.</p>";
    return;
  }

  tableSection.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Karakteristieken</th>
          <th>Gewest</th>
          <th>Jaar</th>
          <th>Huizen in gesloten bebouwing</th>
          <th>Huizen in halfopen bebouwing</th>
          <th>Huizen in open bebouwing, hoeven en kastelen</th>
          <th>Buildings en flatgebouwen met appartementen</th>
        </tr>
      </thead>
      <tbody>
        ${visible.map(r => `
          <tr>
            <td>${r.karakteristieken}</td>
            <td>${r.gewest}</td>
            <td>${r.jaar}</td>
            <td>${r.gesloten}</td>
            <td>${r.halfopen}</td>
            <td>${r.open}</td>
            <td>${r.gebouwen}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
