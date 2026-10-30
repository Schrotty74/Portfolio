// Persist the animation preference locally across pages, as on static app pages.
const motionKey = "portfolio-motion-paused";
try {
  if (typeof document !== "undefined") document.documentElement.dataset.motionPaused = localStorage.getItem(motionKey) === "true" ? "true" : "false";
} catch {}
export function motionPaused() {
  return typeof document !== "undefined" && document.documentElement.dataset.motionPaused === "true";
}
function syncMotionButtons() {
  for (const button of document.querySelectorAll("[data-motion-toggle]")) {
    const german = button.dataset.motionLocale === "de";
    button.setAttribute("aria-pressed", String(motionPaused()));
    button.textContent = motionPaused()
      ? (german ? "Animationen fortsetzen" : "Resume animations")
      : (german ? "Animationen pausieren" : "Pause animations");
  }
}
if (typeof document !== "undefined") {
  document.addEventListener("click", event => {
    if (!event.target.closest?.("[data-motion-toggle]")) return;
    document.documentElement.dataset.motionPaused = String(!motionPaused());
    try { localStorage.setItem(motionKey, document.documentElement.dataset.motionPaused); } catch {}
    syncMotionButtons();
    window.dispatchEvent(new Event("portfolio:motionchange"));
  });
  // Native fragment links also work without JavaScript; explicitly focus the target
  // after activation for browsers that scroll without moving keyboard focus.
  document.addEventListener("click", event => {
    if (!event.target.closest?.(".skip-link")) return;
    document.getElementById("main-content")?.focus({ preventScroll: true });
  });
}
