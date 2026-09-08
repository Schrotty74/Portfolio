# Portfolio

[Deutsch](README.de.md)

[![Privacy Check](https://github.com/Schrotty74/Portfolio/actions/workflows/privacy-check.yml/badge.svg)](https://github.com/Schrotty74/Portfolio/actions/workflows/privacy-check.yml)

The public GitHub Pages app portfolio of [Schrotty74](https://github.com/Schrotty74), available at [schrotty74.github.io/Portfolio](https://schrotty74.github.io/Portfolio/).

It provides an English-first, German equivalent overview of eleven public projects, with project, technical, legal-notice and privacy pages. Where publicly available, each project page links to its manual, direct download, live web app and source repository.

## Publishing

GitHub Pages must serve the `main` branch from the repository root. The website is a static export: GitHub Pages requires no server-side runtime, cookies, analytics, forms or chat bot.

## Themes

The site provides Dark, Light and Colour themes. Their theme-specific rules are kept in `assets/dark-theme.css`, `assets/light-theme.css` and `assets/color-theme.css`; shared layout and component styling remains in the common stylesheets. The selected theme is stored locally under `portfolio-theme` using only the values `dark`, `light` or `color`.

## Privacy and maintenance

- Public project screenshots are loaded directly from GitHub's raw-content host.
- Release badges and separate latest Final/Beta download targets are refreshed daily from public GitHub release data by the repository workflow.
- The currently active global cache-busting system uses `cache-version.txt` and `.github/workflows/global-cache-bust.yml` to keep HTML references, CSS/JavaScript assets, internal ES-module imports and app-detail links on one version. Assets keep stable filenames; no versioned physical copies are created. For Theme-, cache-, loading- or deployment-related problems, follow [CACHE_BUSTING_PLAN.md](CACHE_BUSTING_PLAN.md) before changing that system.
- The manual **Check unused static assets** workflow reports unused resources by default; removal requires choosing `remove` when starting it.
- Before publication, run `bash Scripts/privacy-check.sh`, review public texts and images manually, and run `git diff --check`.
- The documented privacy review is in [PRIVACY_CHECK.md](PRIVACY_CHECK.md).
- Rules for adding or updating a project are in [PORTFOLIO_UPDATE.md](PORTFOLIO_UPDATE.md).
