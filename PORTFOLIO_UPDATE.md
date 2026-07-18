# Portfolio update rule

This repository is the public entry point for Schrotty74 projects.

## New public app

When a new app has a public repository and is ready to be presented:

1. Add a project card to the portfolio in English and German.
2. Create a dedicated detail page under `projects/` for every new public app or collection, and link it from the project card and GitHub profile README.
3. Add the repository to `.github/workflows/refresh-release-status.yml` so its Beta/Final status is updated automatically.
4. Include its name, concise description, platform, repository link and, when available, live-app or download link.
5. Use only public assets and screenshots with synthetic demo data.
6. Add the app to the GitHub profile README: https://github.com/Schrotty74/Schrotty74
7. Add a PORTFOLIO_UPDATE.md file with this same rule to the new app repository.

## Public release of an existing app

Before a public release, check whether the portfolio needs an update. Update only
when public-facing information changed, such as the main description, status,
screenshots, supported platforms, repository URL, live-app URL or download URL.

Normal bug fixes and small internal changes do not require a portfolio update.

## Privacy

Never publish private user data, personal exports, logs, backups, licence keys
or screenshots containing real data. Public portfolio material must use only
synthetic demo data or intentionally public assets.
