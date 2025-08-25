
export function initThemeObserver(onChange) {
  const target = document.body;

  const observer = new MutationObserver((mutations) => {
    console.log("🔍 Mutation detected:", mutations); // 👈 extra log
    mutations.forEach((m) => {
      if (m.attributeName === "class") {
        const isDark = target.classList.contains("dark");
        console.log("📊 Observer theme:", isDark ? "dark" : "light"); // 👈 extra log
        onChange(isDark ? "dark" : "light");
      }
    });
  });

  observer.observe(target, { attributes: true });
}
