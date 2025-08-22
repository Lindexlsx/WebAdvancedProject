# Web Advanced Project

## I. Projectbeschrijving en functionaliteiten

Dit project toont kadastrale statistieken van het gebouwenpark (Statbel API) in een webapplicatie gebouwd met **Vite** en **moderne JavaScript** (ES6+).  
De toepassing ondersteunt data ophalen, normaliseren, filteren, sorteren en weergeven in een tabel.

**Live URL:** [https://web-advanced-project.vercel.app/](https://web-advanced-project.vercel.app/)  
**Repo:** [https://github.com/Lindexlsx/WebAdvancedProject](https://github.com/Lindexlsx/WebAdvancedProject)

### Functionaliteiten

#### Dataverzameling & -weergave
- Data wordt opgehaald uit de publieke Statbel API (endpoint met >20 objecten).
- Data wordt getoond op visueel aantrekkelijke manier: tabelweergave met 6 kolommen.
- Detailweergave van elk item: Basisdetails van de getoonde items: karakteristieken, gewest, gebouwtypes, aantallen.


#### Interactiviteit
- **Zoekfunctie** (op gewest).
- **Filterfunctionaliteit** (dropdown selectie op gewest).
- **Sorteermogelijkheden** (alle kolommen oplopend/aflopend).

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
- **Gebruiksvriendelijke navigatie** (zoekveld, filters, intuïtief sorteren van kolommen via pijltjes):
  🔜 Verdere verbeteringen in design en interactie volgen.

---

## II. Gebruikte API’s

- **Statbel Bestat API**  
  Endpoint:  
  [https://bestat.statbel.fgov.be/bestat/api/views/6077dab9-47e8-468f-a53a-5237fa0673d6/result/JSON](https://bestat.statbel.fgov.be/bestat/api/views/6077dab9-47e8-468f-a53a-5237fa0673d6/result/JSON)  
  Documentatie/bron: [https://statbel.fgov.be](https://statbel.fgov.be)

---

## III. Implementatie van technische vereisten

### DOM manipulatie
- **Elementen selecteren** → zie `src/main.js` (lijn 31: `document.getElementById('search')`)
- **Elementen manipuleren** → zie `src/pages/Home.js` (lijn 2–3: `tableSection.innerHTML = ...`)
- **Events aan elementen koppelen** → zie `src/main.js` (lijn 32–46: eventlisteners op search, sort, themeToggle)

### Modern JavaScript
- **Gebruik van constanten** → bv. `const store = initStore()` in `src/main.js` (lijn 6)
- **Template literals** → `src/pages/Home.js` (lijn 39–69: tabel-HTML met backticks)
- **Iteratie over arrays** → `src/pages/Home.js` (lijn 57–67: `rows.map(...)`)
- **Array methodes** →  
  - `filter()` en `forEach()` in `src/api/client.js` (lijn 26–46)  
  - `map()` in `src/pages/Home.js` (lijn 57–67)
- **Arrow functions** → `src/main.js` (lijn 27–30: `(e) => { … }`)
- **Conditional (ternary) operator** → `src/state/store.js` (lijn 22–32, inline sorteercondities)
- **Callback functions** → eventhandlers in `src/components/Filters.js` (lijn 49–102)
- **Promises** → fetch API in `src/api/client.js` (lijn 7: `const res = await fetch(url)`)
- **Async & Await** → `src/api/client.js` (lijn 4: `export async function getBuildingData()`)
- **Observer API** → 🔜 nog te voorzien (bv. `IntersectionObserver` in `src/pages/Home.js`)

### Data & API
- **Fetch om data op te halen** → `src/api/client.js` (lijn 7–11)
- **JSON manipuleren en weergeven** → normalisatie in `src/api/client.js` (lijn 21–65) + rendering in `src/pages/Home.js` (lijn 39–69)

### Opslag & validatie
- **Formulier validatie** → `src/components/Filters.js` (lijn 63–87: min. lengte zoekterm + geldigheid gewest)  
- **Gebruik van LocalStorage** → 🔜 voorzien in `src/lib/storage.js` (nog te implementeren)

### Styling & layout
- **Basis HTML layout** → `index.html` (lijn 11–27: header, controls, main/table)
- **Basis CSS** → `src/styles/styles.css` (lijn 1–21: body, header, layout; lijn 23–46: tabelstijl; lijn 48–63: dark theme)
- **Gebruiksvriendelijke elementen** → zoekveld, dropdown en sorteerbare kolommen (`src/pages/Home.js` + `src/components/Filters.js`)
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

  🔜 Nog toe te voegen

---

## VI. Gebruikte bronnen

- **Officiële documentatie**:
  - [https://vite.dev/](https://vite.dev/)
  - [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)
  - [API documentatie]: Statbel Bestat API
  - Lesmateriaal Web Advanced
- **AI-assistentie**:
  - Dit README en projectopzet werden (deels) voorbereid met ChatGPT, zie [chatlog]