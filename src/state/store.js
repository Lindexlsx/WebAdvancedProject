
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
  let result = store.data
    // zoekfilter
    .filter(r =>
      store.search
        ? r.gewest.toLowerCase().includes(store.search.toLowerCase())
        : true
    )
    // dropdown filter
    .filter(r =>
      store.filters.gewest
        ? r.gewest === store.filters.gewest
        : true
    );

  // ✅ sorteren
  if (store.sort.key) {
    const { key, dir } = store.sort;
    result = [...result].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      // check type (getal of string)
      if (!isNaN(valA) && !isNaN(valB)) {
        return dir === 'asc'
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      } else {
        return dir === 'asc'
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });
  }

  return result;
}
