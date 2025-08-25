
import { initStore, getVisibleRecords } from "./state/store.js";
import { renderHome } from "./pages/Home.js";
import { renderFilters } from "./components/Filters.js";
import { getBuildingData } from "./api/client.js";
import { initThemeObserver } from "./lib/themeObserver.js";
import "./styles/styles.css";

const store = initStore();

async function mount() {
  try {
    store.data = await getBuildingData();
    renderUI();
    initThemeToggle();
    initThemeStats();
  } catch (err) {
    document.getElementById("app").innerHTML =
      `<p style="color:red">Kon geen data ophalen. Probeer later opnieuw.</p>`;
    console.error(err);
  }
}

function renderUI() {
  renderFilters(store, () => {
    renderHome(store, getVisibleRecords(store));
  });
  renderHome(store, getVisibleRecords(store));
}

function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    btn.textContent = document.body.classList.contains("dark")
      ? "Licht thema"
      : "Donker thema";
  });
}

function initThemeStats() {
  if (!localStorage.getItem("themeStats")) {
    localStorage.setItem("themeStats", JSON.stringify({ light: 0, dark: 0 }));
  }
  initThemeObserver(theme => {
    try {
      const stats = JSON.parse(localStorage.getItem("themeStats")) || { light: 0, dark: 0 };
      stats[theme] = (stats[theme] || 0) + 1;
      localStorage.setItem("themeStats", JSON.stringify(stats));
      console.log("📊 Gebruiker schakelde naar thema:", theme, stats);
    } catch (e) {
      console.error("❌ Fout bij updaten themeStats:", e);
    }
  });
}

mount();
