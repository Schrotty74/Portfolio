# Projektkontext: Portfolio

**Stand:** 8. September 2026
**Zweck:** Öffentliche, zweisprachige GitHub-Pages-Website für die Apps und Projekte von Schrotty74.

## Veröffentlichtes System

Die Website wird als statischer Export direkt aus dem Stamm des `main`-Branches durch GitHub Pages ausgeliefert. Es gibt keinen serverseitigen Anwendungscode.

| Bereich | Pfad | Aufgabe |
| --- | --- | --- |
| Englisch | `index.html`, `apps/<slug>/`, `apps/<slug>/technical/` | Standard-Sprache, Übersichts-, Projekt- und Technikseiten. |
| Deutsch | `de/`, `de/apps/<slug>/`, `de/apps/<slug>/technical/` | Gleichwertige deutsche Seiten. |
| Rechtliches | `privacy/`, `legal-notice/`, `de/datenschutz/`, `de/impressum/` | Datenschutzhinweise und Impressum. |
| Statische Ressourcen | `assets/`, `favicon.svg` | Lokale Skripte, gemeinsame Styles, drei getrennte Theme-Dateien und Icons mit stabilen Dateinamen. `app-home-bridge.css` vereinheitlicht die App-Detailseiten; `app-gallery.css` steuert die responsiven Galerien und app-spezifische Größen/Anordnungen. |
| Cache-Busting | `cache-version.txt`, `.github/workflows/global-cache-bust.yml` | Repository-weite Cache-Version für HTML-, CSS-, JavaScript-, interne ES-Modul-Imports und App-Detail-Links. |
| Manuelle Asset-Prüfung | `.github/workflows/check-unused-assets.yml` | Prüft bei manuellem Start auf nicht referenzierte Assets. Standard ist nur ein Bericht; Löschen erfordert die ausdrücklich gewählte Aktion `remove`. |
| Suchmaschinen | `robots.txt`, `sitemap.xml` | Indexierungs- und Sitemap-Hinweise. |
| Release-Status | `release-status.json`, `.github/workflows/refresh-release-status.yml` | Öffentliche GitHub-Releases der elf Projekte; Übersicht und Detailseiten laden Status sowie aktuelle DMG-/ZIP-Zieladressen für die jeweils neueste Final- und Beta-Version innerhalb derselben GitHub-Pages-Website. |
| Prüfung | `Scripts/privacy-check.sh`, `.github/workflows/privacy-check.yml` | Prüfung auf Geheimnisse, private Pfade und frühere Hosting-Verweise. |

Die Portfolio-Startseite bleibt die kompakte Übersicht über alle Projekte. Die normalen Projektseiten unter `apps/<slug>/` beziehungsweise `de/apps/<slug>/` sind als besucherorientierte App-Homepages gedacht: Sie erklären Zweck und Nutzen der App, zeigen – sofern vorhanden – geprüfte öffentliche Screenshots, beschreiben den grundlegenden Ablauf, stellen zentrale Funktionen und Datenschutzmerkmale dar und führen zu Repository, Downloads und technischen Details. Die separaten `technical/`-Seiten bleiben die kompakte technische Darstellung für Architektur und Technologien.

Die App-Detailseiten verwenden inzwischen ein gemeinsames visuelles System. App-spezifische Abweichungen sind dort erlaubt, wo sie durch das Material sinnvoll sind, etwa unterschiedliche Galerie-Größen, Hochformatbegrenzungen oder die Web/Swift-Paarung bei UroBilanz. Inhalte, Screenshots, Funktionen und Downloads müssen weiterhin aus dem jeweiligen öffentlichen Projektstand abgeleitet werden und dürfen nicht schematisch erfunden werden.

Alle Seiten sind statisch. Projektbilder werden bewusst direkt von `raw.githubusercontent.com/Schrotty74/...` geladen; damit ruft der Browser GitHub für diese Bilder auf. Andere Projekt- oder Downloadlinks werden erst nach Auswahl durch Besucher geöffnet.

## Themes

- Gemeinsames Layout und gemeinsame Komponenten liegen in den gemeinsamen Stylesheets.
- Die drei Theme-Varianten werden getrennt in `assets/dark-theme.css`, `assets/light-theme.css` und `assets/color-theme.css` gepflegt.
- Das gewählte Theme wird browserseitig unter dem Schlüssel `portfolio-theme` in `localStorage` gespeichert. Zulässige Werte sind ausschließlich `dark`, `light` und `color`.
- Der gespeicherte Wert enthält keine personenbezogenen Daten und wird ausschließlich lokal zur Wiederherstellung der Theme-Auswahl verwendet.

## Cache-Busting

**Wichtig bei Theme-, Cache-, Lade- oder Deployment-Problemen:** Vor Analyse oder Änderungen zuerst `CACHE_BUSTING_PLAN.md` lesen und die dort festgelegte Reihenfolge sowie Einschränkungen einhalten. Diese Vorgabe hat für Änderungen am Cache-Busting Vorrang vor allgemeinen Pflegehinweisen in diesem Dokument.

- `cache-version.txt` ist die zentrale Versionsquelle für die gesamte Website.
- `.github/workflows/global-cache-bust.yml` erhöht die Version bei relevanten Änderungen und aktualisiert alle betroffenen Referenzen repository-weit.
- Die eigentlichen CSS- und JavaScript-Dateien behalten ihre Dateinamen. Eine Versionskennung wie `?v=...` ist nur Teil der URL und erzeugt keine zusätzliche Datei im Repository.
- HTML-Referenzen, CSS/JS-Assets, App-Detail-Links und relative JavaScript-Imports im ES-Modulbaum müssen auf derselben aktuellen Version bleiben. Dadurch werden neue Einstiegsmodule nicht mit älteren zwischengespeicherten Abhängigkeiten kombiniert.
- Keine per-App-Cache-Versionen und keine manuellen Versionskopien von Assets anlegen.
- Veraltete Browser-/CDN-Caches laufen außerhalb des Repositorys aus oder werden durch die neue URL umgangen.

## Datenschutzentscheidungen

- Keine eigenen Cookies, keine Analysewerkzeuge, Werbenetzwerke, Formulare, Chatbots oder Tracker.
- Die einzige lokale Browser-Speicherung ist die Theme-Präferenz in `localStorage`; gespeichert wird nur `dark`, `light` oder `color`.
- Keine externen Schriftanbieter; Schriften stammen aus dem Browser/System.
- GitHub Pages verarbeitet bei der Auslieferung technische Verbindungsdaten nach den Bedingungen von GitHub. Die öffentlich verlinkte Datenschutzerklärung benennt dies.
- Die Statusdatei enthält nur öffentliche Release-Informationen (Stufe, Versionsbezeichnung, Zeitpunkt und direkte URL zu vorhandenen DMG-/ZIP-Dateien). Sie wird täglich aktualisiert und führt die jeweils neueste Final- und Beta-Version getrennt. Der Status zeigt immer die zeitlich neueste veröffentlichte Version, also gegebenenfalls eine Beta.
- Nur öffentliche, synthetische oder eindeutig freigegebene Projektbilder und Inhalte verwenden.

## Pflege- und Prüfablauf

1. Englische und deutsche Inhalte, Links, Handbücher und Downloads inhaltlich gleichwertig aktualisieren.
2. Öffentliche Quellen für Projektfakten prüfen; keine Angaben erfinden.
3. Solange das globale Cache-Busting aktiv ist, keine Einzelversionen manuell pflegen oder zusätzliche Cache-Mechanismen einführen. Bei Theme-, Cache-, Lade- oder Deployment-Problemen ausschließlich nach `CACHE_BUSTING_PLAN.md` vorgehen: zuerst nur eine vorübergehende Deaktivierung des Workflows als Test anbieten; keine Vereinfachung, Löschung oder Bereinigung ohne ausdrückliche Entscheidung des Nutzers.
4. `bash Scripts/privacy-check.sh` und `git diff --check` ausführen.
5. Texte, Bilder, Ziel-URLs sowie Desktop- und Mobilansicht manuell prüfen.
6. GitHub Pages auf `main` und `/(root)` in den Repository-Einstellungen kontrollieren, wenn die Auslieferung geändert wurde.
7. Bei einem neuen öffentlichen Projekt die Repository-Zuordnung im Status-Workflow ergänzen und prüfen, dass das Badge auf der Übersicht erscheint.

Bei größeren Änderungen an Struktur, Datenschutz oder Veröffentlichung dieses Dokument und `NEXT_STEPS.md` aktualisieren.
