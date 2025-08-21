# Web Advanced Project

## I. Projectbeschrijving en functionaliteiten

Dit project toont bevolkingsstatistieken uit de **Statbel API** in een webapplicatie gebouwd met **Vite** en **moderne JavaScript** (ES6+).  
De toepassing ondersteunt data ophalen, normaliseren, filteren, sorteren en weergeven in een tabel.

**Live URL:** [https://web-advanced-project.vercel.app/](https://web-advanced-project.vercel.app/)  
**Repo:** [https://github.com/Lindexlsx/WebAdvancedProject](https://github.com/Lindexlsx/WebAdvancedProject)

### Functionaliteiten

#### Dataverzameling & -weergave
- ✅ Data wordt opgehaald uit de publieke Statbel API (endpoint met >20 objecten).
- ✅ Data wordt getoond op visueel aantrekkelijke manier: tabelweergave met min. 6 kolommen.
- Detailweergave van elk item:
  Basisdetails van de getoonde items: jaar, gewest, geslacht, leeftijd, nationaliteit/burgerlijke staat, aantal.

#### Interactiviteit
- **Filterfunctionaliteit** (op type, locatie, datum of ander criterium).
- **Zoekfunctie** (door data te doorzoeken).
- **Sorteermogelijkheden** (alfabetisch, datum, …).

  🔜 Filterfunctionaliteit, zoekfunctie en sorteren volgen nog.

#### Personalisatie
- Gebruikers kunnen **favorieten opslaan**.
- Data en voorkeuren worden **persistent bewaard** met `localStorage`.
- Extra gebruikersvoorkeuren (thema, taalkeuze of caching van API-data).

  🔜 Opslaan favorieten, gebruikersvoorkeuren, localStorage.

#### Gebruikerservaring
- **Responsive design** (werkt goed op mobiel en desktop):
  Basis responsive layout met tabelweergave.  
- **Visueel aantrekkelijke interface** (moderne styling):
  Eenvoudige navigatie met header en controls. 
- **Gebruiksvriendelijke navigatie** (knoppen, icoontjes, duidelijke feedback):
  🔜 Verdere verbeteringen in design en interactie volgen.

---

## II. Gebruikte API’s

- **Statbel Bestat API**  
  Endpoint: [https://bestat.statbel.fgov.be/bestat/api/views/47672f4b-3de4-408f-a1bd-ef28a1fe7c91](https://bestat.statbel.fgov.be/bestat/api/views/47672f4b-3de4-408f-a1bd-ef28a1fe7c91)  
  Documentatie/bron: [https://statbel.fgov.be](https://statbel.fgov.be)

---

## III. Implementatie van technische vereisten

### DOM manipulatie
- **Elementen selecteren** → zie `src/main.js` (lijn 31: `document.getElementById('search')`)
- **Elementen manipuleren** → zie `src/pages/Home.js` (lijn 2–3: `tableSection.innerHTML = ...`)
- **Events aan elementen koppelen** → zie `src/main.js` (lijn 32–46: eventlisteners op search, sort, themeToggle)

### Modern JavaScript
- **Gebruik van constanten** → overal (`const store = initStore()` in `src/main.js`, lijn 6)
- **Template literals** → bv. `src/pages/Home.js` (lijn 5–24: tabel-HTML met backticks)
- **Iteratie over arrays** → `src/pages/Home.js` (lijn 13–22: `store.data.map(...)`)
- **Array methodes** → 
  - `filter()` en `map()` in `src/api/client.js` (lijn 25–38)  
  - `map()` in `src/pages/Home.js` (lijn 13–22)
- **Arrow functions** → zie `src/main.js` (lijn 33–34: `(e) => { … }`)
- **Conditional (ternary) operator** → 🔜 nog te implementeren (voorzien in `src/components/Card.js`)
- **Callback functions** → eventhandlers in `src/main.js` (lijn 33, 37, 43)
- **Promises** → fetch API in `src/api/client.js` (lijn 6–9)
- **Async & Await** → `src/api/client.js` (lijn 3: `export async function getPopulationData()`)
- **Observer API** (één voorbeeld volstaat) → 🔜 nog te voorzien, bv. `IntersectionObserver` in `src/pages/Home.js`

### Data & API
- **Fetch om data op te halen** → `src/api/client.js` (lijn 6: `const res = await fetch(url)`)
- **JSON manipuleren en weergeven** → normalisatie in `src/api/client.js` (lijn 25–38) + rendering in `src/pages/Home.js` (lijn 5–24)

### Opslag & validatie
- **Formulier validatie** → voorlopig enkel zoekveld-event in `src/main.js` (lijn 33: `search.addEventListener('input', …)`)  
  🔜 uitbreiden met echte validatie (bv. required, min. lengte)
- **Gebruik van LocalStorage** → 🔜 voorzien in `src/lib/storage.js` (nog te implementeren)

### Styling & layout
- **Basis HTML layout** → `index.html` (lijn 11–27: header, controls, main/table)
- **Basis CSS** → `src/styles/styles.css` (lijn 1–21: body, header, layout; lijn 23–46: tabelstijl; lijn 48–63: dark theme)
- **Gebruiksvriendelijke elementen** → zoekveld, dropdown en themaknoppen in `index.html` (lijn 15–20)  
  🔜 uitbreiden met favorieten-knopjes of filtercomponent

### Tooling & structuur
- **Project opgezet met Vite** (zie `package.json` + `vite` scripts, `vite.config.js` kan aangemaakt worden indien nodig)
- **Folderstructuur**:
  - `src/` voor code (JS/CSS)
  - `public/` voor assets
  - `dist/` automatisch door build
  - `index.html` in root

---

## IV. Installatiehandleiding

1. **Clone repository**
   ```bash
   git clone https://github.com/Lindexlsx/WebAdvancedProject.git
   cd WebAdvancedProject

2. **Installeer dependencies**
   ```bash
   npm install

3. **Start development server**
   ```bash
   npm run dev

4. **Build voor productie**
   ```bash
   npm run build

5. **Preview build**
   ```bash
   run preview

   (komt later verder op punt)

---

## V. Screenshots

  (komt later verder op punt)

---

## VI. Gebruikte bronnen

- **Officiële documentatie**:
  - [https://vite.dev/](https://vite.dev/)
  - [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)
  - [API documentatie]: Statbel Bestat API
  - Lesmateriaal Web Advanced
- **AI-assistentie**:
  - Dit README en projectopzet werden (deels) voorbereid met ChatGPT, zie [chatlog]