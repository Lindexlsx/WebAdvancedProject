
export function initThemeObserver(onChange) {
  const target = document.body;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.attributeName === "class") {
        const theme = target.classList.contains("dark") ? "dark" : "light";
        onChange(theme);
      }
    });
  });

  observer.observe(target, { attributes: true });
}
