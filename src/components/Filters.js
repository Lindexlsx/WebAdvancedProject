
import { loadFavorites, saveFavorite, removeFavorite } from "../lib/storage.js";

export function renderFilters(store, onChange) {
  const controls = document.getElementById("controls");
  const favoritesBar = document.getElementById("favorites-bar");

  // unieke gewesten ophalen (uit de dataset)
  const gewesten = Array.from(
    new Set((store.data || []).map(r => r.gewest).filter(Boolean))
  );

  controls.innerHTML = `
    <form id="filters-form">
      <input 
        type="text" 
        id="search" 
        placeholder="Zoek op gewest..." 
        value="${store.search || ""}"
      />
      
      <select id="filter-gewest">
        <option value="">Alle gewesten</option>
        ${gewesten.map(g => `
          <option value="${g}" ${store.filters.gewest === g ? "selected" : ""}>
            ${g}
          </option>`).join("")}
      </select>

      <button type="submit">Zoek</button>
    </form>

    <div id="error" style="color:red; display:none;"></div>
  `;

  const form = document.getElementById("filters-form");
  const searchInput = document.getElementById("search");
  const filterGewest = document.getElementById("filter-gewest");
  const saveBtn = document.getElementById("save-view");
  const errorBox = document.getElementById("error");

  // ✅ Validatie + zoekactie bij submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = searchInput.value.trim();
    const selectedGewest = filterGewest.value;

    if (value && value.length < 2) {
      errorBox.style.display = "block";
      errorBox.textContent = "Voer minstens 2 letters in";
      return;
    }
    if (selectedGewest && !gewesten.includes(selectedGewest)) {
      errorBox.style.display = "block";
      errorBox.textContent = "Ongeldig gewest geselecteerd";
      return;
    }

    errorBox.style.display = "none";
    store.search = value;
    store.filters.gewest = selectedGewest;
    onChange();
  });

  // ✅ Live update
  searchInput.addEventListener("input", (e) => {
    const v = e.target.value.trim();
    if (v.length === 0) {
      errorBox.style.display = "none";
      store.search = "";
      onChange();
      return;
    }
    if (v.length < 2) {
      errorBox.style.display = "block";
      errorBox.textContent = "Voer minstens 2 letters in";
      return;
    }
    errorBox.style.display = "none";
    store.search = v;
    onChange();
  });

  filterGewest.addEventListener("change", (e) => {
    store.filters.gewest = e.target.value;
    onChange();
  });

  // ⭐ View opslaan
  saveBtn.addEventListener("click", () => {
    saveFavorite({
      search: store.search,
      filters: store.filters,
      sort: store.sort
    });
    renderFavorites();
  });

function renderFavorites() {
  const favorites = loadFavorites();
  if (favorites.length === 0) {
    favoritesBar.innerHTML = "<p>Geen favorieten opgeslagen.</p>";
    return;
  }

  favoritesBar.innerHTML = `
    <h4>Favorieten:</h4>
    <ul>
      ${favorites.map((f, i) => `
        <li>
          ⭐ View ${i + 1}
          <button data-apply="${i}">Gebruik</button>
          <button data-remove="${i}">X</button>
        </li>
      `).join("")}
    </ul>
  `;

  // events
  favoritesBar.querySelectorAll("[data-apply]").forEach(btn => {
    btn.addEventListener("click", () => {
      const fav = loadFavorites()[btn.dataset.apply];
      store.search = fav.search;
      store.filters = fav.filters;
      store.sort = fav.sort;
      onChange();
      renderFilters(store, onChange);
    });
  });

  favoritesBar.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFavorite(btn.dataset.remove);
      renderFavorites();
    });
  });
}

  renderFavorites();
}
