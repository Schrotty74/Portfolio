# Projektkontext: Portfolio

**Stand:** 6. September 2026
**Zweck:** Öffentliche, zweisprachige GitHub-Pages-Website für die Apps und Projekte von Schrotty74.

## Veröffentlichtes System

Die Website wird als statischer Export direkt aus dem Stamm des `main`-Branches durch GitHub Pages ausgeliefert. Es gibt keinen serverseitigen Anwendungscode.

| Bereich | Pfad | Aufgabe |
| --- | --- | --- |
| Englisch | `index.html`, `apps/<slug>/`, `apps/<slug>/technical/` | Standard-Sprache, Übersichts-, Projekt- und Technikseiten. |
| Deutsch | `de/`, `de/apps/<slug>/`, `de/apps/<slug>/technical/` | Gleichwertige deutsche Seiten. |
| Rechtliches | `privacy/`, `legal-notice/`, `de/datenschutz/`, `de/impressum/` | Datenschutzhinweise und Impressum. |
| Statische Ressourcen | `assets/`, `favicon.svg` | Lokale Skripte, Styles und Icons mit stabilen Dateinamen. Geänderte browserseitig gecachte Ressourcen werden über eine erhöhte Query-Version referenziert. |
| Manuelle Asset-Prüfung | `.github/workflows/check-unused-assets.yml` | Prüft bei manuellem Start auf nicht referenzierte Assets. Standard ist nur ein Bericht; Löschen erfordert die ausdrücklich gewählte Aktion `remove`. |
| Suchmaschinen | `robots.txt`, `sitemap.xml` | Indexierungs- und Sitemap-Hinweise. |
| Release-Status | `release-status.json`, `.github/workflows/refresh-release-status.yml` | Öffentliche GitHub-Releases der elf Projekte; Übersicht und Detailseiten laden Status sowie aktuelle DMG-/ZIP-Zieladressen für die jeweils neueste Final- und Beta-Version innerhalb derselben GitHub-Pages-Website. |
| Prüfung | `Scripts/privacy-check.sh`, `.github/workflows/privacy-check.yml` | Prüfung auf Geheimnisse, private Pfade und frühere Hosting-Verweise. |

Die Portfolio-Startseite bleibt die kompakte Übersicht über alle Projekte. Die normalen Projektseiten unter `apps/<slug>/` beziehungsweise `de/apps/<slug>/` sind als besucherorientierte App-Homepages gedacht: Sie erklären Zweck und Nutzen der App, zeigen – sofern vorhanden – geprüfte öffentliche Screenshots, beschreiben den grundlegenden Ablauf, stellen zentrale Funktionen und Datenschutzmerkmale dar und führen zu Repository, Downloads und technischen Details. Die separaten `technical/`-Seiten bleiben die kompakte technische Darstellung für Architektur und Technologien.

HealthAtlas ist die erste Projektseite, die dieses ausführlichere Homepage-Modell als Referenz umsetzt. Weitere App-Seiten können nach demselben Grundprinzip umgestellt werden, wobei Texte, Screenshots, Funktionen und Downloads immer aus dem jeweiligen öffentlichen Projektstand abgeleitet werden und nicht schematisch erfunden werden dürfen.

Alle Seiten sind statisch. Projektbilder werden bewusst direkt von `raw.githubusercontent.com/Schrotty74/...` geladen; damit ruft der Browser GitHub für diese Bilder auf. Andere Projekt- oder Downloadlinks werden erst nach Auswahl durch Besucher geöffnet.

## Cache-Busting

- Die eigentlichen CSS- und JavaScript-Dateien behalten ihre Dateinamen. Eine Versionskennung wie `?v=...` ist nur Teil der URL und erzeugt keine zusätzliche Datei im Repository.
- Wenn sich HTML, CSS oder JavaScript so ändert, dass Browser noch eine alte Fassung zwischenspeichern könnten, muss die Cache-Busting-Version in den betroffenen Referenzen erhöht werden.
- Englische und deutsche Seiten, die dieselbe Ressource verwenden, müssen dieselbe aktuelle Versionskennung erhalten.
- Alte Versionen müssen nicht aus dem Repository gelöscht werden, weil dafür keine separaten Dateien angelegt werden. Veraltete Browser-/CDN-Caches laufen außerhalb des Repositorys aus oder werden durch die neue URL umgangen.

## Datenschutzentscheidungen

- Keine eigenen Cookies, keine lokale Theme-Speicherung, keine Analysewerkzeuge, Werbenetzwerke, Formulare, Chatbots oder Tracker.
- Keine externen Schriftanbieter; Schriften stammen aus dem Browser/System.
- GitHub Pages verarbeitet bei der Auslieferung technische Verbindungsdaten nach den Bedingungen von GitHub. Die öffentlich verlinkte Datenschutzerklärung benennt dies.
- Die Statusdatei enthält nur öffentliche Release-Informationen (Stufe, Versionsbezeichnung, Zeitpunkt und direkte URL zu vorhandenen DMG-/ZIP-Dateien). Sie wird täglich aktualisiert und führt die jeweils neueste Final- und Beta-Version getrennt. Der Status zeigt immer die zeitlich neueste veröffentlichte Version, also gegebenenfalls eine Beta.
- Nur öffentliche, synthetische oder eindeutig freigegebene Projektbilder und Inhalte verwenden.

## Pflege- und Prüfablauf

1. Englische und deutsche Inhalte, Links, Handbücher und Downloads inhaltlich gleichwertig aktualisieren.
2. Öffentliche Quellen für Projektfakten prüfen; keine Angaben erfinden.
3. Bei Änderungen an browserseitig gecachten HTML-, CSS- oder JavaScript-Ressourcen die Cache-Busting-Version erhöhen.
4. `bash Scripts/privacy-check.sh` und `git diff --check` ausführen.
5. Texte, Bilder, Ziel-URLs sowie Desktop- und Mobilansicht manuell prüfen.
6. GitHub Pages auf `main` und `/(root)` in den Repository-Einstellungen kontrollieren, wenn die Auslieferung geändert wurde.
7. Bei einem neuen öffentlichen Projekt die Repository-Zuordnung im Status-Workflow ergänzen und prüfen, dass das Badge auf der Übersicht erscheint.

Bei größeren Änderungen an Struktur, Datenschutz oder Veröffentlichung dieses Dokument und `NEXT_STEPS.md` aktualisieren.
