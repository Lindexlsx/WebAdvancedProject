
const KEY = "wa-project";
const STORAGE_KEY = "favoriteViews";
let overwriteIndex = 0; // ronde-robin teller

export const storage = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  },
  set(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj));
  },
  update(patch) {
    const cur = storage.get();
    storage.set({ ...cur, ...patch });
  }
};

export function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveFavorite(view) {
  const favorites = loadFavorites();

  if (favorites.length < 3) {
    favorites.push(view);
  } else {
    const msg =
      "Opgelet: maximaal 3 favoriete views toegestaan. " +
      "De oudste opgeslagen view wordt overschreven. Doorgaan?";
    if (!confirm(msg)) return;

    favorites[overwriteIndex] = view;
    overwriteIndex = (overwriteIndex + 1) % 3;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function removeFavorite(index) {
  const favorites = loadFavorites();
  favorites.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
