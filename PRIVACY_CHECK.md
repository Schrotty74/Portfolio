# Privacy & security check

**Status:** No findings from the documented automated checks on **16 July 2026**.

This report is public so visitors can see what was checked. It is not a guarantee that a repository can never contain private data.

## Scope

- The current public repositories accessible under **Schrotty74** were searched for common high-risk indicators: private-key headers, GitHub tokens, common API-key prefixes, absolute user paths and Gmail addresses.
- The portfolio was additionally reviewed for runtime privacy: it contains no analytics, cookies, forms or trackers. Its only JavaScript stores the chosen visual style locally in the browser and does not send data anywhere.
- The portfolio uses system fonts and does not request Google Fonts or another external font provider.
- Project images are loaded from GitHub's raw-content host. GitHub Pages and these images necessarily involve a request to GitHub; GitHub's privacy terms apply.

## Result

The automated indicator scan found no actual credentials or private user paths. Some text matches were benign references in tests, documentation or check scripts — not secrets.

## Protection for future changes

Every change to this portfolio repository runs [Scripts/privacy-check.sh](Scripts/privacy-check.sh) through GitHub Actions. The check rejects common private file types as well as clear patterns for keys, tokens and personal paths.

## Limits

Automated checks cannot identify every kind of personal information and cannot prove that data was never present in older Git history. A human review remains necessary before publishing, especially for screenshots, sample files, exports, backups, logs and documentation.

If you discover a potential privacy issue, do not repost the data. Remove it first or report it through a private contact channel.

[Deutsche Fassung](PRIVACY_CHECK.de.md)
