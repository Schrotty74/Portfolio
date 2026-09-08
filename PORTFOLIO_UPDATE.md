# Portfolio update rule

This repository is the public entry point for Schrotty74 projects.

## New public app

When a new public project is ready to be presented:

1. Add it to the English and German overview.
2. Add English and German project pages under `apps/<slug>/` and `de/apps/<slug>/`, with matching technical pages under the corresponding `technical/` paths.
3. Use the current unified app-homepage design and interaction model already established for the portfolio. New app pages must follow the same visual system, section structure, responsive behaviour, animations and shared styling conventions as the existing redesigned app pages; only app-specific content, screenshots, features, privacy details, downloads and links change according to the verified public project state.
4. Keep app-specific galleries proportional to the source material. Portrait screenshots, character previews or other tall assets may use smaller maximum heights and denser responsive grids than normal landscape screenshots. Pair equivalent views when that improves comparison, as with UroBilanz Web/Swift views.
5. Include only verified public information: description, key features, platform, technologies, repository link and, where available, manual, direct download or live-app link.
6. Use public screenshots with synthetic, anonymised or intentionally public content only; prefer GitHub-hosted sources.
7. Keep the AI-assistance notice visible and accurate when AI was used for the project.
8. Update the public GitHub profile README when the project should be highlighted there.
9. Apply this same rule in the new app repository when it has its own public documentation.
10. Add the repository to `.github/workflows/refresh-release-status.yml` so the public release badge stays current.
11. While the global cache-busting workflow is active, new overview, app and technical pages must remain compatible with that existing system. Do not introduce a separate per-app cache version or versioned duplicate asset files. For any Theme-, Cache-, loading- or deployment-related problem, `CACHE_BUSTING_PLAN.md` takes precedence: do not automatically delete or clean up the cache-busting system; first offer a temporary workflow-disable test and only then follow the user's decision about simplification or full removal.
12. Theme-specific changes belong in `assets/dark-theme.css`, `assets/light-theme.css` or `assets/color-theme.css`; shared layout and component rules belong in the common stylesheets.

## Public release of an existing app

Update the portfolio when public-facing information changes, such as the main description, features, technologies, screenshots, platform, documentation, download URL, web-app URL or repository URL. Normal internal fixes do not automatically require a portfolio change.

While the existing global cache-busting workflow remains active, do not maintain cache versions manually or add separate cache mechanisms. If cache, theme, loading or deployment problems occur, follow `CACHE_BUSTING_PLAN.md` before changing the workflow or any cache-related references.

## Privacy

Never publish private data, personal exports, logs, backups, licence keys, credentials or screenshots containing real user data. Before publication, run the privacy check and manually review all visible texts, images and outgoing URLs.
