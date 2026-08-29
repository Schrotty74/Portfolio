# Privacy & security check

**Status:** Automated checks passed on **29 August 2026**; public text, link targets and image hosts were also reviewed for this publication.

This report explains the checks. It is not a legal assessment or a guarantee that no personal data can ever be present.

## Hosting and runtime privacy

- The portfolio is served as a static website through GitHub Pages. GitHub necessarily processes technical connection and usage data when it delivers the site; see the [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- Project screenshots are loaded directly from GitHub's raw-content host. Opening a page with such an image creates a direct browser request to GitHub.
- The portfolio itself has no analytics, advertising, forms, embedded third-party widgets, own cookies or local-storage persistence. It does not load external fonts.
- Links to a repository, manual, download, web app or shortcut are only opened after a visitor selects them. The target service's privacy terms then apply.

## Checks performed

- `Scripts/privacy-check.sh` rejects common private or secret file types, credentials, token patterns and private local paths.
- The check also rejects former ChatGPT Sites hosting references in website-facing source files, so the published website does not request assets from that hosting domain.
- All local styles, scripts and icons are published from this repository. Public project images use `raw.githubusercontent.com/Schrotty74/...`; no assets point to the former ChatGPT Sites URL.

## Limits and future changes

Automated checks cannot detect every form of personal data and cannot prove that older Git history never contained such data. Before every public change, review visible text, screenshots, links and downloads manually in addition to running the check. Do not publish real user data, private exports, logs, backups or credentials.

[Deutsche Fassung](PRIVACY_CHECK.de.md)
