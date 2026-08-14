(() => {
  const glowStylesheet = document.createElement("link");
  glowStylesheet.rel = "stylesheet";
  glowStylesheet.href = new URL("../ambient-glow.css?v=ambient-2", document.currentScript.src).href;
  document.head.appendChild(glowStylesheet);

  const themeKey = "portfolio-theme";
  const select = document.querySelector("[data-theme-select]");
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme === "midnight" ? "" : theme;
    if (select) select.value = theme;
  };
  const stored = localStorage.getItem(themeKey) || "midnight";
  applyTheme(stored);
  select?.addEventListener("change", event => {
    const theme = event.target.value;
    localStorage.setItem(themeKey, theme);
    applyTheme(theme);
  });

  const project = document.querySelector("[data-repository]")?.dataset.repository;
  const badge = document.querySelector("[data-release-status]");
  if (!project || !badge) return;
  const labels = document.documentElement.lang === "de"
    ? { Beta: "Beta", Final: "Final", Development: "Entwicklung" }
    : { Beta: "Beta", Final: "Final", Development: "Development" };
  fetch("../release-status.json", { cache: "no-store" })
    .then(response => response.ok ? response.json() : {})
    .then(statuses => {
      const status = statuses[project];
      const label = status?.stage && labels[status.stage];
      if (!label) return;
      badge.textContent = label;
      badge.classList.add("visible");
    })
    .catch(() => {});
})();
