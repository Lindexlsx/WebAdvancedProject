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
