
// src/lib/ThemeObserver.js
export function initThemeObserver(onChange) {
  const target = document.body;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.attributeName === "class") {
        const isDark = target.classList.contains("dark");
        onChange(isDark ? "dark" : "light");
      }
    });
  });

  observer.observe(target, { attributes: true });
}
