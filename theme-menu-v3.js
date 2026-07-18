(() => {
  const glowStylesheet = document.createElement("link");
  glowStylesheet.rel = "stylesheet";
  glowStylesheet.href = new URL("ambient-glow.css?v=ambient-2", document.currentScript.src).href;
  document.head.appendChild(glowStylesheet);

  const key = "schrotty74-portfolio-theme";
  const menu = document.querySelector(".theme-menu");
  const trigger = document.querySelector(".theme-trigger");
  const current = document.querySelector(".theme-current");
  const options = [...document.querySelectorAll(".theme-options button")];
  if (!menu || !trigger || !current || !options.length) return;

  const allowed = options.map(option => option.dataset.theme);
  const saved = localStorage.getItem(key);
  const initial = allowed.includes(saved) ? saved : "midnight";

  function applyTheme(theme) {
    const option = options.find(item => item.dataset.theme === theme) || options[0];
    document.documentElement.dataset.theme = option.dataset.theme;
    current.textContent = option.dataset.label;
    options.forEach(item => item.setAttribute("aria-selected", String(item === option)));
    localStorage.setItem(key, option.dataset.theme);
  }

  function closeMenu() {
    menu.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  }

  applyTheme(initial);
  trigger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    trigger.setAttribute("aria-expanded", String(open));
  });
  options.forEach(option => option.addEventListener("click", () => {
    applyTheme(option.dataset.theme);
    closeMenu();
  }));
  document.addEventListener("click", event => {
    if (!menu.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".hero .eyebrow, .hero h1, .hero .intro, .hero .button, .section-heading, .project, .principles");
  if (!reducedMotion && "IntersectionObserver" in window) {
    document.body.classList.add("motion-enabled");
    revealTargets.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 55, 260)}ms`);
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(element => observer.observe(element));
  }
})();