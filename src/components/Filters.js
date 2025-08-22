
export function renderFilters(store, onChange) {
  const controls = document.getElementById("controls");

  controls.innerHTML = `
    <form id="filters-form">
      <input 
        type="text" 
        id="search" 
        placeholder="Zoek op gewest..." 
        value="${store.search || ""}"
      />
      <button type="submit">Zoek</button>
    </form>
    <div id="error" style="color:red; display:none;"></div>
  `;

  const form = document.getElementById("filters-form");
  const searchInput = document.getElementById("search");
  const errorBox = document.getElementById("error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = searchInput.value.trim();

    // simpele validatie: minimaal 2 letters
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

  // live update
  searchInput.addEventListener("input", (e) => {
    store.search = e.target.value.trim();
    onChange();
  });
}
