# Portfolio

[Deutsch](README.de.md)

[![Privacy Check](https://github.com/Schrotty74/Portfolio/actions/workflows/privacy-check.yml/badge.svg)](https://github.com/Schrotty74/Portfolio/actions/workflows/privacy-check.yml)

The public GitHub Pages app portfolio of [Schrotty74](https://github.com/Schrotty74), available at [schrotty74.github.io/Portfolio](https://schrotty74.github.io/Portfolio/).

It provides an English-first, German equivalent overview of eleven public projects, with project, technical, legal-notice and privacy pages. Where publicly available, each project page links to its manual, direct download, live web app and source repository.

## Publishing

GitHub Pages must serve the `main` branch from the repository root. The website is a static export: GitHub Pages requires no server-side runtime, cookies, analytics, forms or chat bot.

## Privacy and maintenance

- Public project screenshots are loaded directly from GitHub's raw-content host.
- Release badges and separate latest Final/Beta download targets are refreshed daily from public GitHub release data by the repository workflow.
- Local JavaScript and CSS resources use stable filenames, so normal updates replace the existing files instead of accumulating versioned copies.
- The manual **Check unused static assets** workflow reports unused resources by default; removal requires choosing `remove` when starting it.
- Before publication, run `bash Scripts/privacy-check.sh`, review public texts and images manually, and run `git diff --check`.
- The documented privacy review is in [PRIVACY_CHECK.md](PRIVACY_CHECK.md).
- Rules for adding or updating a project are in [PORTFOLIO_UPDATE.md](PORTFOLIO_UPDATE.md).
