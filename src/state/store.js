
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

  // ✅ zoekfilter met ternary
  result = result.filter(r =>
    store.search
      ? r.gewest && r.gewest.toLowerCase().includes(store.search.toLowerCase())
      : true
  );

  // ✅ dropdown filter (gewoon behouden)
  if (store.filters.gewest && store.filters.gewest.length > 0) {
    result = result.filter(r => r.gewest === store.filters.gewest);
  }

  // ✅ sorteren met ternary
  if (store.sort && store.sort.key) {
    const { key, dir } = store.sort;
    result = [...result].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      return !isNaN(valA) && !isNaN(valB)
        ? (dir === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA))
        : (dir === 'asc'
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA)));
    });
  }

  return result;
}
