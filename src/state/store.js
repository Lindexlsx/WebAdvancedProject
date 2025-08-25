
export function initStore() {
  return {
    data: [],
    favorites: [],
    search: "",
    filters: { gewest: "" },
    sort: { key: null, dir: "asc" }
  };
}

export function getVisibleRecords(store) {
  let result = [...store.data];

  // zoekfilter
  result = result.filter(r =>
    store.search
      ? r.gewest?.toLowerCase().includes(store.search.toLowerCase())
      : true
  );

  // dropdown filter
  if (store.filters.gewest) {
    result = result.filter(r => r.gewest === store.filters.gewest);
  }

  // sortering
  if (store.sort?.key) {
    const { key, dir } = store.sort;
    result.sort((a, b) => {
      const valA = a[key], valB = b[key];
      return !isNaN(valA) && !isNaN(valB)
        ? dir === "asc" ? valA - valB : valB - valA
        : dir === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
    });
  }

  return result;
}
