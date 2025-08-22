
export function initStore() {
  return {
    records: [],    // API data
    favorites: [],
    search: "",     // zoekterm
    sort: "gewest-asc",
    filters: {},
  };
}

export function getVisibleRecords(store) {
  const term = store.search?.toLowerCase() || "";

  let result = store.records.filter(r => {
    return term === "" 
      ? true 
      : r.gewest.toLowerCase().includes(term);
  });

  return result;
}
