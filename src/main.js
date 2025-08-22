
import { initStore, getVisibleRecords } from './state/store.js';
import { renderHome } from './pages/Home.js';
import { renderFilters } from './components/Filters.js';
import { getBuildingData } from './api/client.js';
import './styles/styles.css';

const store = initStore();

async function mount() {
  try {
    const records = await getBuildingData();
    store.data = records; // ✅ consistente property (geen store.records)

    renderUI();
  } catch (err) {
    document.getElementById('app').innerHTML = `
      <p style="color:red">Kon geen data ophalen. Probeer later opnieuw.</p>
    `;
    console.error(err);
  }
}

function renderUI() {
  // Filters opnieuw renderen, callback hertekent tabel
  renderFilters(store, () => {
    const visible = getVisibleRecords(store); // ✅ zoek + filter toegepast
    renderHome(store, visible);
  });

  // Eerste keer tabel tekenen
  const visible = getVisibleRecords(store);
  renderHome(store, visible);
}

mount();
