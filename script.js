(() => {
  const key = "schrotty74-portfolio-theme";
  const select = document.querySelector(".theme-select");
  if (!select) return;

  const saved = localStorage.getItem(key);
  const theme = ["midnight", "light", "retro", "graphite-lime"].includes(saved) ? saved : "midnight";

  document.documentElement.dataset.theme = theme;
  select.value = theme;

  select.addEventListener("change", () => {
    document.documentElement.dataset.theme = select.value;
    localStorage.setItem(key, select.value);
  });
})();
