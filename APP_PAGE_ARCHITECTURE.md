# Portfolio: App-Seiten, Veröffentlichung und neue Apps

**Historischer Stand: 15. Oktober 2026; Ergänzung zum aktuellen Stand: 28. Oktober 2026.**

## Aktuelle Ergänzung (28. Oktober 2026)

Die Startseiten zeigen inzwischen **15 Projekt-/Sammlungskarten**. Die Sammlungen `Enigma-Plugins` und `LG-G5-Apps` verwenden den Filter **Collection / Sammlung**. Daneben gibt es eigene lokalisierte Detailseiten für die Ordnerprojekte; deren Inhalte werden durch `scripts/sync-collections.cjs` auf Grundlage der GitHub-Quellen und `collections/` aktualisiert. Diese Automatisierung betrifft **Sammlungs-Detailseiten**, nicht die individuell gestalteten App-Homepages. Die historischen Angaben über zwölf Apps und 24 Seiten unten beschreiben den Stand vom 15. Oktober und sind keine aktuelle Bestandszahl.

Die `LG-G5-Apps`-Sammlung enthält G5 System Monitor und G5 TV Launcher. Beim Launcher werden App-Icon oben und drei klickbare Screenshots **vor** den zehn Hauptfunktionen dargestellt; die Reihenfolge ist auch im Generator gesichert. BoxSystemInfo zeigt zehn Funktionen mit Link zu allen sechzehn (`FEATURES.md` / `FEATURES.de.md`). Bei e2Atlas verwenden DE und EN dasselbe Icon und dieselben fünf Screenshots.

**Verbindliche Priorität:** Bestehende Gestaltung, Seitenaufbau, getrennte App-Skripte, Themes, Animationen, Navigation, Sprache, Status und Downloads nicht ohne ausdrücklichen Auftrag ändern. Bei Inhaltsänderungen nur die betroffenen Seiten und zugehörigen Generator-/Synchronisationsregeln anpassen; keine gestalterische Vereinheitlichung oder ungefragte Umbauten.

## Ziel und Seitenstruktur

Die Portfolio-Website ist eine statische, zweisprachige GitHub-Pages-Website. Die **Startseiten** `index.html` (Englisch) und `de/index.html` (Deutsch) geben einen Überblick über alle Apps. **Jede App behält ihre eigene öffentliche Homepage** unter `apps/<slug>/index.html` und `de/apps/<slug>/index.html`. Das ist ausdrücklich erwünscht, keine Schwäche des Systems.

Die derzeit zwölf Apps besitzen zusammen 24 lokalisierte App-Seiten. Die vorhandenen `technical/`-Unterseiten bleiben separat. App-spezifische Texte, Bilder, Screenshots, Funktionen und technische Informationen bleiben individuell. Gemeinsame Dateien schaffen einheitliche Gestaltung und Funktionalität; es gibt **keinen vollständig automatischen Generator für neue App-Seiten**.

## Umstellung am 15. Oktober 2026

- Die beiden Indexseiten und die 24 App-Homepages wurden als unmittelbar gerenderte **statische HTML-Seiten** veröffentlicht. Die komplexe React-/Vinext-Hydration (`_R_`/`__VINEXT_RSC_CHUNKS__`) wurde auf diesen Seiten entfernt, um das Problem leerer App-Seiten beim ersten Laden zu vermeiden.
- Alle 24 App-Seiten laden jetzt das kleine gemeinsame Skript **`assets/static-app.js`**. Es ergänzt die vorhandenen HTML-Inhalte, statt sie durch eine dynamische App-Navigation aufzubauen.
- Gemeinsame Stylesheets, Dark-/Light-/Color-Themes, `assets/app-home-bridge.css` und vorhandene Animationen werden weiterverwendet. Die gewählte Theme-Einstellung wird als `portfolio-theme` in `localStorage` gespeichert.
- Die Markierung des aktiven Theme-Buttons auf den App-Seiten wurde nachträglich im gemeinsamen Skript korrigiert; die Verweise auf `static-app.js` wurden auf **`?v=47`** angepasst. Bei weiteren gemeinsamen Skriptänderungen sind die Asset-Verweise konsistent zu aktualisieren.
- Das fehlende e2Atlas-Titelbild wurde in beiden Sprachen durch `https://raw.githubusercontent.com/Schrotty74/e2Atlas/beta/Documentation/Screenshots/previews/welcome.png` ersetzt. Die vier weiteren e2Atlas-Screenshots blieben bestehen.
- Der veröffentlichte Umbau erfolgte über den Arbeitsbranch `portfolio-preview` und Pull Request **#3**; die Änderungen wurden auf `main` übernommen. Die früheren Arbeitsbranches `fix/e2atlas-shared-app-layout` und `refactor/unified-app-pages` wurden anschließend vom Nutzer gelöscht, Pull Request #2 geschlossen.
- Die automatische Cache-Validierung erfolgt über `.github/workflows/global-cache-bust.yml`; sie darf nicht mit einem früheren automatischen Cache-Umschreib-Workflow verwechselt werden. Bestehende `?v=`-Verweise sind zu respektieren. Vor einer Änderung am Caching gilt `CACHE_BUSTING_PLAN.md`.

**Grenze:** Die erfolgreiche GitHub-Pages-Veröffentlichung und die manuellen Tests der Start-/App-Seiten sind nicht mit einem vollständigen automatisierten Browser-Regressions- und Release-Wechsel-Test gleichzusetzen. Für neue Änderungen insbesondere Safari/iOS, Themes, Sprachwechsel, Bilder, Navigation, Animationen, Download-Links und Technikseiten prüfen.

## Automatische Beta-/Final-Erkennung und Downloads

- Der Workflow **`.github/workflows/refresh-release-status.yml`** prüft die explizit eingetragenen GitHub-Repositories (aktuell 15). Er läuft per `cron: "23 4,16 * * *"`, also täglich **04:23 und 16:23 UTC** (Sommerzeit in Wien: 06:23 und 18:23; Winterzeit: 05:23 und 17:23). Auch `workflow_dispatch` ist möglich.
- Er berücksichtigt veröffentlichte **Final-Releases und Prereleases/Betas** (keine Drafts), ermittelt die jüngsten Releases und deren verfügbare **DMG-/ZIP-Links** sowie ggf. Prüfsummen. Der Workflow schreibt **`release-status.json`** und aktualisiert weiterhin den eingebetteten Snapshot in `assets/app-detail.js` für ältere/andere Verbraucher. Außerdem enthält er einen optionalen GitHub-Profil-Sync.
- Die neue **Startseiten-Logik** liest `release-status.json` und aktualisiert die Status-Badges der App-Karten.
- Die neuen **App-Seiten** lesen per `assets/static-app.js` ebenfalls `release-status.json` und zeigen daraus den aktuellen Status und verfügbare Final-/Beta-Download-Links. Fehlende Dateitypen dürfen nicht als vorhanden dargestellt werden.
- **Wichtig:** Der Workflow erkennt nicht automatisch beliebige neue Repositories. Die Liste muss bei einer neuen App **einmalig ergänzt** werden. Nach erfolgreicher Einrichtung und Workflow-Ausführung laufen die Release-/Download-Aktualisierungen automatisch.
- Bei einem Release-Status ohne Downloads oder fehlgeschlagenem Abruf der JSON-Datei sind die UI-Fallbacks gezielt zu prüfen; die Live-Integration wurde nicht für jeden künftigen Release-Wechsel Ende-zu-Ende nachgewiesen.

## Verbindliche Layout-Gleichheit für alle Apps

**Alle App-Homepages und alle technischen Unterseiten sollen jeweils denselben bestehenden Aufbau verwenden.** Das gilt für Deutsch und Englisch, Desktop und Mobilgeräte. Wenn eine neue App hinzukommt oder eine vorhandene Seite geändert wird:

1. **Zuerst eine nachweislich funktionierende, aktuelle Seite desselben Typs als Vorlage verwenden** (App-Homepage für App-Homepage, Technikseite für Technikseite; z. B. ThermalAtlas oder UroBilanz).
2. **HTML-Struktur, CSS-Klassen, Typografie, Abstände, responsives Verhalten, Navigation, Themes, Animationen und gemeinsame JavaScript-Einbindung unverändert übernehmen.** Keine separaten Layouts, eigenen CSS-Sonderregeln oder abweichenden Animationen erfinden, nur um eine einzelne App darzustellen.
3. **Ausschließlich die app-spezifischen Inhalte ersetzen:** Name, Beschreibung, verifizierte Funktionen, Plattform/Technologien, Bilder, Links und Releases. Unterschiedliches Bildformat oder tatsächlich benötigte Inhalte dürfen innerhalb des vorhandenen Designsystems passend dargestellt werden.
4. **Alle deutschen und englischen Varianten konsistent halten** und die vorhandene automatische Release- und Download-Aktualisierung beibehalten.
5. **Vor der Veröffentlichung direkt mit mindestens einer bestehenden Seite vergleichen**, besonders auf iPhone/Safari. Abweichungen nur nach ausdrücklicher Abstimmung.

**Wichtig:** Gleiches Layout bedeutet **nicht** identische Texte oder eine gemeinsame Unterseite für alle Apps. Jede App behält ihre eigene App-Homepage und ihre eigene Technikseite. Neue Sonderlösungen sind ausdrücklich zu vermeiden.

## Verbindlicher Ablauf: neue App hinzufügen

**Der Nutzer gibt den Link zum neuen GitHub-Repository und beauftragt die Einbindung. Er muss weder eine HTML-Vorlage erstellen noch Dateien selbst bearbeiten.**

1. Öffentliches Repository prüfen: tatsächlicher App-Name, Beschreibung, Plattformen, Funktionen, Bilder, Datenschutz, Dokumentation, vorhandene Tags/Releases, verifizierte DMG-/ZIP-Artefakte.
2. Eine neue **englische und deutsche App-Homepage** auf Grundlage der existierenden statischen Seitenstruktur anlegen; vorhandene gemeinsame Stylesheets, Themes, Animationen und **`assets/static-app.js`** verwenden. App-spezifische Inhalte und Bilder korrekt einbauen, keine Fakten oder Downloads erfinden.
3. Die App auf **beiden Indexseiten** als Projektkarte mit korrektem Link, Kategorie und Status aufnehmen. Den vorhandenen Startseiten-Mechanismus für die Zuordnung `slug → Repository-Name` ergänzen.
4. Die neue App in die Liste `repositories` in **`.github/workflows/refresh-release-status.yml`** aufnehmen, damit die zweimal täglichen Beta-/Final-Prüfungen sie erfassen.
5. Die Zuordnung `slug → Repository-Name` in **`assets/static-app.js`** ergänzen. Bei Bedarf zugehörige Technikseiten (`apps/<slug>/technical/`, `de/apps/<slug>/technical/`), Ressourcenseiten, Sitemap, Metadaten, GitHub-Profil-README und sonstige direkte App-Listen aktualisieren.
6. Wenn gemeinsame CSS- oder JS-Dateien geändert wurden, die **bestehende Cache-Versionierung** und ihre Referenzen konsistent halten; **keinen eigenen Cache-Workflow** und keine separate Cache-Version pro App erstellen. `cache-version.txt` und die Validierungsregeln prüfen. Nicht ohne Anlass die Cache-Architektur verändern.
7. Vor Veröffentlichung prüfen: alle EN-/DE-Links, Themes inkl. aktiver Markierung und Persistenz, Navigation beim ersten Laden, Animationen, mobile Darstellung, gültige Bilder, Versionsstatus, Beta-/Final-Download-Links, `node Scripts/check-app-pages.mjs` und Privacy-Checks. Die Seitenprüfung liest Projektkarten aus den Startseiten und berücksichtigt neue Karten im bestehenden Format automatisch; die erforderlichen Repository- und Release-Zuordnungen müssen dennoch ergänzt werden.
8. Erst nach Prüfung veröffentlichen und GitHub-Pages-Deployment sowie Workflows kontrollieren.

### Was später automatisch läuft – und was nicht

| Vorgang | Automatisch? |
| --- | --- |
| Ein völlig neues GitHub-Repository als App hinzufügen | **Nein** — einmalige Einbindung nach Beauftragung |
| Neue App-Seiten und Übersichtskarten erzeugen | **Nein** — bei der Einbindung erstellt |
| Nach der Einbindung Releases der App prüfen | **Ja** — zweimal täglich und manuell auslösbar |
| Neueste Beta-/Final-Statusdaten aktualisieren | **Ja** — nach erfolgreichem Workflow-Lauf |
| Verfügbare DMG-/ZIP-Download-Links aktualisieren | **Ja** — aus den Release-Assets |
| HTML-Design und App-Beschreibung bei jeder neuen Version automatisch umschreiben | **Nein** |

## Sicherheit und Qualitätsregeln

Die öffentliche Homepage nicht für ungetestete Umbauten ersetzen. Keine privaten Daten, Logs, Zugangsdaten oder nicht freigegebenen Screenshots veröffentlichen. Technische Sonderseiten und bestehende App-spezifische Inhalte nicht ungeprüft vereinheitlichen. **Einzelne App-Homepages sind Absicht; gemeinsam genutzt wird nur die technische Grundlage.**

Weiterführende Dokumentation: `PORTFOLIO_UPDATE.md`, `PROJECT_CONTEXT.md`, `CACHE_BUSTING_PLAN.md`, `README.md`.
