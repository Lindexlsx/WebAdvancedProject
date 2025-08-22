
import { initStore, getVisibleRecords } from './state/store.js';
import { renderHome } from './pages/Home.js';
import { renderFilters } from './components/Filters.js';
import { getBuildingData } from './api/client.js';
import './styles/styles.css';

const store = initStore();

async function mount() {
  try {
    const records = await getBuildingData();
    store.records = records;

    renderUI();
  } catch (err) {
    document.getElementById('app').innerHTML = `
      <p style="color:red">Kon geen data ophalen. Probeer later opnieuw.</p>
    `;
    console.error(err);
  }
}

function renderUI() {
  renderFilters(store, () => renderHome(store));
  renderHome(store);
}

mount();
