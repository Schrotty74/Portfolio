# Projektkontext: Portfolio

**Stand:** 23. Juli 2026  
**Zweck:** Dieses Repository enthält die öffentliche, zweisprachige GitHub-Pages-Portfolioseite von Schrotty74. Es stellt ausgewählte Apps und Sammlungen vor und verlinkt auf öffentliche Repositories, Detailseiten sowie – falls vorhanden – laufende Web-Apps.

## Zuerst lesen

In einem neuen Chat zuerst diese Reihenfolge beachten:

1. `PROJECT_CONTEXT.md` – technische und fachliche Hauptquelle.
2. `NEXT_STEPS.md` – tatsächlich offene Punkte und Prioritäten.
3. `README.md` – lokales Öffnen und GitHub-Pages-Veröffentlichung.
4. `PORTFOLIO_UPDATE.md` – Regeln für neue oder öffentlich veränderte Projekte.
5. `PRIVACY_CHECK.md` und `PRIVACY_CHECK.de.md` – veröffentlichte Datenschutz- und Prüfhinweise.

Danach nur die für die Aufgabe relevanten Dateien lesen, zum Beispiel `index.html`, `de.html`, `projects/` oder die zugehörigen Stylesheets und Skripte.

## Architektur und wichtige Dateien

Die Seite ist eine statische Website ohne Paketmanager, Lockfile, Build-Schritt oder lokale Laufzeit-Abhängigkeiten.

| Bereich | Dateien | Aufgabe |
| --- | --- | --- |
| Hauptseiten | `index.html`, `de.html` | Englische und deutsche Portfolio-Übersicht; Projektkarten müssen inhaltlich und funktional gleichwertig bleiben. |
| Übersichts-Stil | `portfolio-nav-v4.css` | Aktuell eingebundenes Stylesheet für Navigation, Karten, Themes, responsive Layouts und Bewegung. Ältere CSS-Dateien bleiben im Repository, sind aber nicht die aktive Übersichtsreferenz. |
| Detailseiten | `projects/*.html`, `projects/*.de.html` | Englische und deutsche Detailseiten für jede öffentliche App oder Sammlung. |
| Detailseiten-Stil und -Verhalten | `projects/detail-v1.css`, `projects/detail-v1.js` | Gemeinsames Layout, Theme-Auswahl und Release-Status für Detailseiten. |
| Übersicht-Verhalten | `theme-menu-v3.js`, `release-status.js` | Themenmenü, lokale Theme-Speicherung, reduzierte Scroll-Animationen und Release-Chips auf der Übersicht. |
| Statusdaten | `release-status.json` | Generierte Zuordnung von Repository zu `stage`, `release` und `updatedAt`; keine manuelle Quelle für Release-Wahrheit. |
| Gemeinsame Optik | `ambient-glow.css`, `assets/` | Hintergrundeffekt sowie lokale GitHub-, Discord- und Social-Preview-Assets. |
| Datenschutzprüfung | `Scripts/privacy-check.sh`, `.github/workflows/privacy-check.yml` | Prüft nach verbotenen Dateien, typischen Geheimnissen und privaten Pfaden. |
| Status-Aktualisierung | `.github/workflows/refresh-release-status.yml` | Liest öffentliche Releases der gelisteten Projekte und schreibt bei Änderungen `release-status.json`. |

## Datenformate und Laufzeitdaten

- `release-status.json` ist ein JSON-Objekt. Ein Eintrag enthält `stage` (`Beta` oder `Final`), `release` und `updatedAt`.
- Die Übersichtskarten verwenden `data-repository`; `release-status.js` nutzt diesen Wert, um den Statuschip einzublenden.
- Die Theme-Wahl wird ausschließlich lokal im Browser gespeichert. Die Übersicht verwendet den Schlüssel `schrotty74-portfolio-theme`; die Detailseiten verwenden derzeit `portfolio-theme`.
- Projektbilder werden über öffentliche GitHub-Raw-URLs geladen. Nur synthetische Demo-Daten oder bewusst öffentliche Assets verwenden.

## Umgesetzter Stand

- Englische und deutsche Übersichtsseite mit acht Projektkarten sowie passenden Detailseiten unter `projects/`.
- Vier visuelle Themes: Midnight, Light, Retro und Graphite Lime.
- Release-Chips für Projekte mit Eintrag in `release-status.json`; die Daten werden automatisiert über GitHub Actions aktualisiert.
- Projekt-Hierarchie auf der Übersicht: AppAtlas als hervorgehobene Karte, UroBilanz und HealthAtlas als zweite Ebene, weitere Karten kompakter.
- Die Spotlight-Karten zeigen Screenshot oben und Informationen darunter; ein dezenter Verlauf verbindet Bild und Inhalt.
- Plattform-Symbole stehen vor den Plattformlabels der Karten.
- Respektvolle Animationen beachten `prefers-reduced-motion`.

## Lokaler Ablauf, Tests und Veröffentlichung

1. Für eine Sichtprüfung `index.html` direkt im Browser öffnen; ein Build-Schritt ist nicht vorgesehen.
2. Vor einer Veröffentlichung die Datenschutzprüfung ausführen:

   ```bash
   bash Scripts/privacy-check.sh
   ```

3. `git diff --check` ausführen, wenn Dateien geändert wurden.
4. Für öffentliche Änderungen zusätzlich die in `PORTFOLIO_UPDATE.md` genannten Portfolio- und Profilpflichten prüfen.
5. GitHub Pages wird laut `README.md` aus `main` und dem Repository-Stamm veröffentlicht. Diese Einstellung liegt außerhalb der versionierten Dateien.

Die Workflows führen die Datenschutzprüfung bei Pushes und Pull Requests aus. Die Status-Aktualisierung läuft stündlich sowie manuell und darf `release-status.json` eigenständig committen.

## Feste Regeln und Entscheidungen

- Sichtbare Inhalte müssen auf Englisch und Deutsch gepflegt werden, einschließlich Karten, Detailseiten, Links und sichtbarer UI-Texte.
- Jede neue öffentliche App oder Sammlung benötigt eine englische und eine deutsche Detailseite und passende Links von der jeweiligen Übersichtskarte.
- Die Projektliste in `.github/workflows/refresh-release-status.yml` muss für neue öffentliche Projekte ergänzt werden, wenn deren Release-Status automatisch erscheinen soll.
- `release-status.json` nicht manuell als Ersatz für einen fehlenden öffentlichen Release bearbeiten.
- Keine Analysewerkzeuge, Cookies, Formulare oder Tracker ergänzen, ohne die Datenschutzdokumentation und die tatsächliche Datenverarbeitung neu zu bewerten.
- Theme-Speicherung bleibt lokal; keine personenbezogenen Daten oder Telemetrie einführen.
- Bestehende, öffentlich sichtbare Informationen nur mit überprüften öffentlichen Quellen oder bereitgestellten Inhalten ändern.

## Datenschutz und Veröffentlichung

- Niemals private Daten, persönliche Exporte, Logs, Backups, Zugangsdaten, Schlüssel, Tokens, Zertifikate oder reale Nutzerdaten veröffentlichen.
- Screenshots dürfen nur synthetische Demo-Daten oder absichtlich öffentliche Inhalte enthalten.
- Vor jedem Push die Datenschutzprüfung ausführen; die Prüfung ersetzt keine menschliche Sichtprüfung von Bildern und Texten.
- In neuen Dokumenten und sichtbaren Texten ausschließlich den öffentlichen Namen **Schrotty74** verwenden.
- `PORTFOLIO_UPDATE.md` ist verbindlich, wenn neue öffentliche Projekte hinzukommen oder sich öffentlich sichtbare Projektinformationen ändern.

## Bekannte Einschränkungen und zu prüfende Punkte

- Die veröffentlichten Privacy-Dokumente sagen, dass keine externen Schriftanbieter geladen werden. Das aktuell aktive `portfolio-nav-v4.css` enthält jedoch einen `@import` von Google Fonts. Diese Abweichung ist vor der nächsten Datenschutzbehauptung oder Veröffentlichung fachlich zu klären; nicht ohne bewusste Entscheidung über die gewünschte Schriftstrategie ändern.
- Die GitHub-Pages-Einstellung ist nicht im Repository versioniert; nach einer Neuinstallation oder beim Umzug muss sie in den Repository-Einstellungen kontrolliert werden.
- Es gibt keine automatisierte visuelle Browserprüfung im Repository. Desktop- und Mobilansichten müssen bei Layoutänderungen manuell geprüft werden.
- Der aktuelle Stand von Abhängigkeiten oder zusätzlichen lokalen Werkzeugen ist unbekannt, weil keine Manifest- oder Lockdateien vorhanden sind.

## Dokumentationspflege

Bei größeren Änderungen an Architektur, Datenformaten, Workflows, Datenschutz, sichtbaren Funktionen oder bekannten Problemen dieses Dokument und `NEXT_STEPS.md` aktualisieren. Keine erledigten Punkte künstlich als offen stehen lassen und keine Testergebnisse ohne tatsächliche Ausführung dokumentieren.
