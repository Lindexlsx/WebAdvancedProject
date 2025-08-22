
export function renderFilters(store, onChange) {
  const controls = document.getElementById("controls");

  // unieke gewesten ophalen (uit de dataset)
  const gewesten = Array.from(new Set(store.data.map(r => r.gewest)));

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
  const errorBox = document.getElementById("error");

  // ✅ Validatie + zoekactie bij submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = searchInput.value.trim();

    if (value && value.length < 2) {
      errorBox.style.display = "block";
      errorBox.textContent = "Voer minstens 2 letters in";
      return;
    } else {
      errorBox.style.display = "none";
    }

    store.search = value;
    onChange();
  });

  // ✅ Live update zoekveld
  searchInput.addEventListener("input", (e) => {
    store.search = e.target.value.trim();
    onChange();
  });

  // ✅ Filter dropdown event
  filterGewest.addEventListener("change", (e) => {
    store.filters.gewest = e.target.value;
    onChange();
  });
}
