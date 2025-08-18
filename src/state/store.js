export function initStore() {
  return {
    data: [],       // API data
    favorites: [],  // id's of objecten
    search: '',
    sort: 'name-asc',
    filters: {},    // bv. type/locatie/datum
  };
}
