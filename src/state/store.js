
export function initStore() {
  return {
    data: [],
    favorites: [],
    search: '',
    filters: { gewest: '' },
    sort: { key: null, dir: 'asc' } // default: geen sortering
  };
}

export function getVisibleRecords(store) {
  let result = [...store.data]; // veilig kopiëren

  // zoekfilter (fallback = toon alles)
  if (store.search && store.search.length > 0) {
    const term = store.search.toLowerCase();
    result = result.filter(r => r.gewest && r.gewest.toLowerCase().includes(term));
  }

  // dropdown filter (bv. exact gewest)
  if (store.filters.gewest && store.filters.gewest.length > 0) {
    result = result.filter(r => r.gewest === store.filters.gewest);
  }

  // ✅ sorteren
  if (store.sort && store.sort.key) {
    const { key, dir } = store.sort;
    result = [...result].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      // numerieke sortering
      if (!isNaN(valA) && !isNaN(valB)) {
        return dir === 'asc'
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }
      // string sortering
      return dir === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  return result;
}
