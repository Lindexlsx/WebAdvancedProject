// src/pages/Home.js

export function renderHome(store) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Home</h2>
    <p>Welkom bij mijn Web Advanced project!</p>
    <p>Items in store: ${store.items.length}</p>
  `;
}
