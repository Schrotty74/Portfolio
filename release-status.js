(() => {
  const labels = document.documentElement.lang === "de"
    ? { Beta: "Beta", Final: "Final", Development: "Entwicklung" }
    : { Beta: "Beta", Final: "Final", Development: "Development" };

  fetch("release-status.json", { cache: "no-store" })
    .then(response => response.ok ? response.json() : {})
    .then(statuses => {
      document.querySelectorAll(".project[data-repository]").forEach(card => {
        const status = statuses[card.dataset.repository];
        const heading = card.querySelector("h3");
        if (!status || !heading || !labels[status.stage]) return;

        const badge = document.createElement("span");
        badge.className = "status";
        badge.textContent = labels[status.stage];
        heading.append(" ", badge);
      });
    })
    .catch(() => {});
})();
