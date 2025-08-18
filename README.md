# Web Advanced Project

## I. Projectbeschrijving en functionaliteiten

**Live URL:** [https://web-advanced-project.vercel.app/](https://web-advanced-project.vercel.app/)  
**Repository:** [https://github.com/Lindexlsx/WebAdvancedProject](https://github.com/Lindexlsx/WebAdvancedProject)

### Functionaliteiten

#### Dataverzameling & -weergave
- Haalt data op van een publieke API (endpoint met minstens 20 objecten).
- Toont data op een visueel aantrekkelijke manier:
  - **Tabelweergave** met minstens 6 kolommen.
  - **Kaart- of kaartachtige visualisatie** (afhankelijk van API).
- Detailweergave van elk item.

#### Interactiviteit
- **Filterfunctionaliteit** (op type, locatie, datum of ander criterium).
- **Zoekfunctie** (door data te doorzoeken).
- **Sorteermogelijkheden** (alfabetisch, datum, …).

#### Personalisatie
- Gebruikers kunnen **favorieten opslaan**.
- Data en voorkeuren worden **persistent bewaard** met `localStorage`.
- Extra gebruikersvoorkeuren (thema, taalkeuze of caching van API-data).

#### Gebruikerservaring
- **Responsive design** (werkt goed op mobiel en desktop).
- **Visueel aantrekkelijke interface** (moderne styling).
- **Gebruiksvriendelijke navigatie** (knoppen, icoontjes, duidelijke feedback).

---

## II. Gebruikte API’s

- [API-naam] – [link naar documentatie]  
  _(hier vul je de gekozen dataset(s) en links in)_

---

## III. Implementatie van technische vereisten

### DOM manipulatie
- **Elementen selecteren** → zie `src/main.js` (lijn …)
- **Elementen manipuleren** → zie `src/components/Table.js` (lijn …)
- **Events aan elementen koppelen** → zie `src/components/Filters.js` (lijn …)

### Modern JavaScript
- **Gebruik van constanten** → overal (`const`)
- **Template literals** → bv. `src/pages/Home.js` (lijn …)
- **Iteratie over arrays** → `src/components/Table.js` (lijn …)
- **Array methodes** → `map`, `filter`, `find`, `sort` gebruikt in `src/components/…`
- **Arrow functions** → zie `src/lib/utils.js` (lijn …)
- **Conditional (ternary) operator** → zie `src/components/Card.js` (lijn …)
- **Callback functions** → `forEach` en eventhandlers (`src/components/Filters.js`)
- **Promises** → fetch API (`src/api/client.js`)
- **Async & Await** → `src/api/client.js`
- **Observer API** (één voorbeeld volstaat) → bv. `IntersectionObserver` in `src/pages/Home.js`

### Data & API
- **Fetch om data op te halen** → `src/api/client.js`
- **JSON manipuleren en weergeven** → `src/state/store.js` + rendering in `src/components/*`

### Opslag & validatie
- **Formulier validatie** → bv. zoek/filterformulier in `src/components/Filters.js`
- **Gebruik van LocalStorage** → `src/lib/storage.js`

### Styling & layout
- **Basis HTML layout** → `index.html`
- **Basis CSS** → `src/styles/styles.css` (flexbox/grid gebruikt)
- **Gebruiksvriendelijke elementen** → knoppen, favorieten-icoontjes (`src/components/Card.js`)

### Tooling & structuur
- **Project opgezet met Vite** (zie `vite.config.js`)
- **Folderstructuur**:
  - `src/` voor code (js/css)
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

---

## V. Screenshots

---

## VI. Gebruikte bronnen

- **Officiële documentatie**:
  - [https://vite.dev/](https://vite.dev/)
  - [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)
  - [API documentatie]
- **AI-assistentie**:
  - Dit README en projectopzet werden (deels) voorbereid met ChatGPT, zie [chatlog]