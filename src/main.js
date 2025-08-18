import { initStore } from './state/store.js';
import { renderHome } from './pages/Home.js';

const store = initStore();

function mount() {
  renderHome(store); // bouwt de UI op in #table en #visual
  wireEvents();
}

function wireEvents() {
  const search = document.getElementById('search');
  const sort = document.getElementById('sort');
  const themeToggle = document.getElementById('theme-toggle');

  search.addEventListener('input', (e) => {
    store.search = e.target.value;
    renderHome(store);
  });

  sort.addEventListener('change', (e) => {
    store.sort = e.target.value;
    renderHome(store);
  });

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    // optioneel: preference bewaren in localStorage
  });
}

mount();
