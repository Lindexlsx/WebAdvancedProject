export function renderFilters(store, onChange) {
  const controls = document.getElementById("controls");

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
  const errorBox = document.getElementById("error");

  // ✅ Validatie + zoekactie bij submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = searchInput.value.trim();
    const selectedGewest = filterGewest.value;

    // bestaande validatie: minimaal 2 letters indien ingevuld
    if (value && value.length < 2) {
      errorBox.style.display = "block";
      errorBox.textContent = "Voer minstens 2 letters in";
      return;
    }

    // ➕ extra validatie: gekozen gewest moet bestaan in dataset (indien gekozen)
    if (selectedGewest && !gewesten.includes(selectedGewest)) {
      errorBox.style.display = "block";
      errorBox.textContent = "Ongeldig gewest geselecteerd";
      return;
    }

    errorBox.style.display = "none";
    store.search = value;
    store.filters.gewest = selectedGewest; // state bij submit ook syncen
    onChange();
  });

  // ✅ Live update met inline validatie
  searchInput.addEventListener("input", (e) => {
    const v = e.target.value.trim();

    if (v.length === 0) {
      // leeg: fout weg, zoekterm wissen, reset lijst
      errorBox.style.display = "none";
      store.search = "";
      onChange();
      return;
    }

    if (v.length < 2) {
      // te kort: fout tonen, NIET filteren
      errorBox.style.display = "block";
      errorBox.textContent = "Voer minstens 2 letters in";
      return;
    }

    // geldig: fout weg en filteren
    errorBox.style.display = "none";
    store.search = v;
    onChange();
  });

  // ✅ Filter dropdown event
  filterGewest.addEventListener("change", (e) => {
    store.filters.gewest = e.target.value;
    onChange();
  });
}
