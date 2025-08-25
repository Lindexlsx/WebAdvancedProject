const KEY = 'wa-project';

export const storage = {
  get() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  },
  set(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj));
  },
  update(patch) {
    const cur = storage.get();
    storage.set({ ...cur, ...patch });
  }
};

const STORAGE_KEY = "favoriteViews";
let overwriteIndex = 0; // ronde-robin teller

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
    // waarschuwing en bevestiging
    const msg = "Opgelet: het maximale aantal favoriete views (3) is bereikt. " +
                "De oudste opgeslagen view zal worden overschreven. Wilt u doorgaan?";
    if (!confirm(msg)) return;

    favorites[overwriteIndex] = view;
    overwriteIndex = (overwriteIndex + 1) % 3; // ronde-robin
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function removeFavorite(index) {
  const favorites = loadFavorites();
  favorites.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
