
import { initStore, getVisibleRecords } from './state/store.js';
import { renderHome } from './pages/Home.js';
import { renderFilters } from './components/Filters.js';
import { getBuildingData } from './api/client.js';
import { initThemeObserver } from './lib/ThemeObserver.js';
import './styles/styles.css';

const store = initStore();

async function mount() {
  try {
    const records = await getBuildingData();
    store.data = records; // ✅ consistente property (geen store.records)

    renderUI();
    initThemeToggle(); // thema-switcher initialiseren
    initThemeStats();
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

/**
 * Thema switcher initialiseren
 */
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      btn.textContent = "Licht thema";
    } else {
      btn.textContent = "Donker thema";
    }
  });
}

/** Statistieken van thema-gebruik */
function initThemeStats() {
  initThemeObserver((theme) => {
    console.log("📊 Gebruiker schakelde naar thema:", theme);

    // Eenvoudige telling in localStorage
    const stats = JSON.parse(localStorage.getItem("themeStats") || "{}");
    stats[theme] = (stats[theme] || 0) + 1;
    localStorage.setItem("themeStats", JSON.stringify(stats));
  });
}

mount();
