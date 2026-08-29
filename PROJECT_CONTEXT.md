# Projektkontext: Portfolio

**Stand:** 29. August 2026
**Zweck:** Öffentliche, zweisprachige GitHub-Pages-Website für die Apps und Projekte von Schrotty74.

## Veröffentlichtes System

Die Website wird als statischer Export direkt aus dem Stamm des `main`-Branches durch GitHub Pages ausgeliefert. Es gibt keinen serverseitigen Anwendungscode.

| Bereich | Pfad | Aufgabe |
| --- | --- | --- |
| Englisch | `index.html`, `apps/<slug>/`, `apps/<slug>/technical/` | Standard-Sprache, Übersichts-, Projekt- und Technikseiten. |
| Deutsch | `de/`, `de/apps/<slug>/`, `de/apps/<slug>/technik/` | Gleichwertige deutsche Seiten. |
| Rechtliches | `privacy/`, `legal-notice/`, `de/datenschutz/`, `de/impressum/` | Datenschutzhinweise und Impressum. |
| Statische Ressourcen | `assets/`, `favicon.svg` | Lokale Skripte, Styles und Icons. |
| Suchmaschinen | `robots.txt`, `sitemap.xml` | Indexierungs- und Sitemap-Hinweise. |
| Release-Status | `release-status.json`, `.github/workflows/refresh-release-status.yml` | Öffentliche GitHub-Releases der elf Projekte; Übersicht und Detailseiten laden Status sowie aktuelle DMG-/ZIP-Zieladressen für die jeweils neueste Final- und Beta-Version innerhalb derselben GitHub-Pages-Website. |
| Prüfung | `Scripts/privacy-check.sh`, `.github/workflows/privacy-check.yml` | Prüfung auf Geheimnisse, private Pfade und frühere Hosting-Verweise. |

Alle Seiten sind statisch. Projektbilder werden bewusst direkt von `raw.githubusercontent.com/Schrotty74/...` geladen; damit ruft der Browser GitHub für diese Bilder auf. Andere Projekt- oder Downloadlinks werden erst nach Auswahl durch Besucher geöffnet.

## Datenschutzentscheidungen

- Keine eigenen Cookies, keine lokale Theme-Speicherung, keine Analysewerkzeuge, Werbenetzwerke, Formulare, Chatbots oder Tracker.
- Keine externen Schriftanbieter; Schriften stammen aus dem Browser/System.
- GitHub Pages verarbeitet bei der Auslieferung technische Verbindungsdaten nach den Bedingungen von GitHub. Die öffentlich verlinkte Datenschutzerklärung benennt dies.
- Die Statusdatei enthält nur öffentliche Release-Informationen (Stufe, Versionsbezeichnung, Zeitpunkt und direkte URL zu vorhandenen DMG-/ZIP-Dateien). Sie wird täglich aktualisiert und führt die jeweils neueste Final- und Beta-Version getrennt. Für den Status wird bei vorhandener Final-Version diese bevorzugt; ohne Final-Version erscheint die neueste Beta.
- Nur öffentliche, synthetische oder eindeutig freigegebene Projektbilder und Inhalte verwenden.

## Pflege- und Prüfablauf

1. Englische und deutsche Inhalte, Links, Handbücher und Downloads inhaltlich gleichwertig aktualisieren.
2. Öffentliche Quellen für Projektfakten prüfen; keine Angaben erfinden.
3. `bash Scripts/privacy-check.sh` und `git diff --check` ausführen.
4. Texte, Bilder, Ziel-URLs sowie Desktop- und Mobilansicht manuell prüfen.
5. GitHub Pages auf `main` und `/(root)` in den Repository-Einstellungen kontrollieren, wenn die Auslieferung geändert wurde.
6. Bei einem neuen öffentlichen Projekt die Repository-Zuordnung im Status-Workflow ergänzen und prüfen, dass das Badge auf der Übersicht erscheint.

Bei größeren Änderungen an Struktur, Datenschutz oder Veröffentlichung dieses Dokument und `NEXT_STEPS.md` aktualisieren.
