
import { initStore, getVisibleRecords } from './state/store.js';
import { renderHome } from './pages/Home.js';
import { renderFilters } from './components/Filters.js';
import { getBuildingData } from './api/client.js';
import { initThemeObserver } from './lib/themeObserver.js';
import './styles/styles.css';

const store = initStore();

async function mount() {
  try {
    const records = await getBuildingData();
    store.data = records; // ✅ consistente property (geen store.records)

    renderUI();
    initThemeToggle(); // thema-switcher initialiseren
    initThemeStats();  // observer activeren
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

function initThemeStats() {
  // init key als die nog niet bestaat
  if (!localStorage.getItem("themeStats")) {
    localStorage.setItem("themeStats", JSON.stringify({ light: 0, dark: 0 }));
  }

  initThemeObserver((theme) => {
    console.log("📊 Gebruiker schakelde naar thema:", theme);

    try {
      const stats = JSON.parse(localStorage.getItem("themeStats")) || { light: 0, dark: 0 };
      stats[theme] = (stats[theme] || 0) + 1;
      localStorage.setItem("themeStats", JSON.stringify(stats));
      console.log("✅ themeStats updated:", stats);
    } catch (e) {
      console.error("❌ Fout bij updaten themeStats:", e);
    }
  });
}


mount();
