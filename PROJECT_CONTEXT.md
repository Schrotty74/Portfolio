# Projektkontext: Portfolio

**Stand:** 28. Oktober 2026
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
| Release-Status | `release-status.json`, `.github/workflows/refresh-release-status.yml` | Öffentliche GitHub-Releases der im Workflow eingetragenen Repositories; Übersicht und Detailseiten laden Status sowie aktuelle DMG-/ZIP-Zieladressen für die jeweils neueste Final- und Beta-Version innerhalb derselben GitHub-Pages-Website. |
| Prüfung | `Scripts/privacy-check.sh`, `.github/workflows/privacy-check.yml` | Prüfung auf Geheimnisse, private Pfade und frühere Hosting-Verweise. |

Die Portfolio-Startseite bleibt die kompakte Übersicht über alle Projekte. Die normalen Projektseiten unter `apps/<slug>/` beziehungsweise `de/apps/<slug>/` sind als besucherorientierte App-Homepages gedacht: Sie erklären Zweck und Nutzen der App, zeigen – sofern vorhanden – geprüfte öffentliche Screenshots, beschreiben den grundlegenden Ablauf, stellen zentrale Funktionen und Datenschutzmerkmale dar und führen zu Repository, Downloads und technischen Details. Die separaten `technical/`-Seiten bleiben die kompakte technische Darstellung für Architektur und Technologien.

Die App-Detailseiten verwenden inzwischen ein gemeinsames visuelles System. App-spezifische Abweichungen sind dort erlaubt, wo sie durch das Material sinnvoll sind, etwa unterschiedliche Galerie-Größen, Hochformatbegrenzungen oder die Web/Swift-Paarung bei UroBilanz. Inhalte, Screenshots, Funktionen und Downloads müssen weiterhin aus dem jeweiligen öffentlichen Projektstand abgeleitet werden und dürfen nicht schematisch erfunden werden.

Alle Seiten sind statisch. Projektbilder werden bewusst direkt von `raw.githubusercontent.com/Schrotty74/...` geladen; damit ruft der Browser GitHub für diese Bilder auf. Andere Projekt- oder Downloadlinks werden erst nach Auswahl durch Besucher geöffnet.

## Bedienbarkeit und Barrierefreiheit

- Jede Seite bietet einen Sprunglink zum fokussierbaren Hauptinhalt. Der Sprachwechsel führt zur entsprechenden Seite der anderen Sprache.
- Die Kategorien auf der Übersicht sind auf schmalen Bildschirmen vollständig sichtbar. Die Auswahl steht als `category` in der URL; der Ergebniszähler meldet Änderungen über eine Live-Region.
- `assets/site-accessibility.js` steuert die Animationspause für das aktuelle Dokument. Diese Auswahl wird nicht gespeichert. Wiederholte Laufschrift-Inhalte werden vor Screenreadern verborgen.
- `assets/image-sizes.js` enthält die geprüften Bildabmessungen für die Übersicht und dynamisch ergänzte Galerien. Bilder unterhalb des Einstiegs werden verzögert geladen.
- Bei Änderungen am statischen Export müssen HTML, eingebettete RSC-Daten und die zugehörigen Client-Komponenten zusammenpassen.

## Themes

- Gemeinsames Layout und gemeinsame Komponenten liegen in den gemeinsamen Stylesheets.
- Die drei Theme-Varianten werden getrennt in `assets/dark-theme.css`, `assets/light-theme.css` und `assets/color-theme.css` gepflegt.
- Das gewählte Theme wird browserseitig unter dem Schlüssel `portfolio-theme` in `localStorage` gespeichert. Zulässige Werte sind ausschließlich `dark`, `light` und `color`.
- Das zuletzt gewählte Theme soll nach Reload und Seitenwechsel erhalten bleiben und nicht auf einen anderen Theme-Zustand zurückspringen.
- Der gespeicherte Wert enthält keine personenbezogenen Daten und wird ausschließlich lokal zur Wiederherstellung der Theme-Auswahl verwendet.

## Cache-Busting

- `cache-version.txt` ist die zentrale Versionsquelle für die gesamte Website.
- `.github/workflows/global-cache-bust.yml` validiert bei relevanten Änderungen nur noch, dass alle Referenzen die zentrale Version verwenden; er ändert keine Dateien, erstellt keinen Commit und löst keine zweite Pages-Veröffentlichung aus.
- Die globale Version wird bei einer bewussten Änderung am statischen Export einmalig im selben Änderungsstand gesetzt. Die eigentlichen CSS- und JavaScript-Dateien behalten ihre Dateinamen; `?v=...` ist nur Teil der URL.
- HTML-Referenzen, CSS/JS-Assets, App-Detail-Links und relative JavaScript-Imports im ES-Modulbaum müssen auf derselben aktuellen Version bleiben.
- Keine per-App-Cache-Versionen und keine manuellen Versionskopien von Assets anlegen.
- **Nicht bei jeder Homepage-Änderung erhöhen:** Reine Text- oder Feature-Listen-Änderungen sowie neue Unterseiten erfordern normalerweise keine neue Cache-Version. Bei Änderungen an gemeinsam genutztem CSS/JavaScript (einschließlich Themes und Animationen) prüfen, ob eine Erhöhung zur Cache-Aktualisierung nötig ist; Bildänderungen abhängig von ihrer Cache-Strategie behandeln.
- **Jede neue CSS-/JS-Einbindung prüfen:** Referenzen müssen die vom bestehenden Validierungsworkflow akzeptierte `?v=`-Version tragen. Insbesondere niemals neue Stylesheets ohne Versionsparameter in HTML oder Seitengeneratoren aufnehmen. Aktuellen Wert stets aus `cache-version.txt` lesen, nicht als feste Zahl in Anleitungen übernehmen.
- **Fehlerfall vom 28.10.2026:** Zehn HTML-Seiten banden `section-dot-animation.css` ohne `?v=` ein. Dadurch scheiterte `Validate global cache version`, obwohl die GitHub-Pages-Veröffentlichung und die Abschnittsanimation funktionierten. Die Links und der Generator wurden auf `?v=45` korrigiert; die nachfolgende Cache-Validierung und Pages-Veröffentlichung waren erfolgreich. Bei künftigen Änderungen Generator und erzeugte Seiten gemeinsam kontrollieren.
- **Abnahme:** Nach relevanten Änderungen GitHub-Actions-Status (`Validate global cache version` sowie Pages-Veröffentlichung) kontrollieren; eine fehlgeschlagene Validierung bedeutet nicht automatisch eine defekte Homepage. Bestehendes Design, Themes, Animationen und Navigation unverändert lassen, sofern nicht ausdrücklich beauftragt.
- `CACHE_BUSTING_PLAN.md` ist ein Sonderplan und wird nicht bei normalen Homepage-Änderungen automatisch angewendet. Erst wenn der Nutzer ausdrücklich meldet, dass das bekannte Theme-, Lade- oder Cache-Problem erneut aufgetreten ist, diesen Plan lesen und befolgen.
- Bei einer solchen erneuten Problemmeldung nicht sofort pausieren, löschen oder bereinigen: zuerst nur eine vorübergehende Deaktivierung des Workflows als Test anbieten. Weitere Schritte ausschließlich nach ausdrücklicher Entscheidung des Nutzers.

## Datenschutzentscheidungen

- Keine eigenen Cookies, keine Analysewerkzeuge, Werbenetzwerke, Formulare, Chatbots oder Tracker.
- Die einzige lokale Browser-Speicherung ist die Theme-Präferenz in `localStorage`; gespeichert wird nur `dark`, `light` oder `color`.
- Keine externen Schriftanbieter; Schriften stammen aus dem Browser/System.
- GitHub Pages verarbeitet bei der Auslieferung technische Verbindungsdaten nach den Bedingungen von GitHub. Die öffentlich verlinkte Datenschutzerklärung benennt dies.
- Die Statusdatei enthält nur öffentliche Release-Informationen (Stufe, Versionsbezeichnung, Zeitpunkt und direkte URL zu vorhandenen DMG-/ZIP-Dateien). Sie wird täglich aktualisiert und führt die jeweils neueste Final- und Beta-Version getrennt. Der Status zeigt immer die zeitlich neueste veröffentlichte Version, also gegebenenfalls eine Beta.
- Nur öffentliche, synthetische oder eindeutig freigegebene Projektbilder und Inhalte verwenden.

## Aktueller Stand der Startseiten und Sammlungen (28. Oktober 2026)

- Die englische und deutsche Startseite zeigen derzeit **15 Projekt- und Sammlungskarten**. Jede Kartenkategorie besitzt einen passenden Filter; für die beiden Sammlungen `Enigma-Plugins` und `LG-G5-Apps` heißen die Filter **Collection** beziehungsweise **Sammlung**. Der bestehende visuelle Stil und die Filtermechanik bleiben verbindlich erhalten.
- Sammlungseinträge und zweisprachige Detailseiten werden für Ordnerprojekte durch `scripts/sync-collections.cjs` und die Daten unter `collections/` betreut. Bestehende individuelle App-Homepages und ihre Skripte dürfen dadurch nicht umgestaltet werden.
- Unter `LG-G5-Apps` sind **G5 System Monitor** und **G5 TV Launcher** eingetragen. Die Launcher-Detailseiten zeigen oben das originale App-Icon, darunter drei vergrößerbare Screenshots (Übersicht, Favoriten, Eingänge) **vor** der Feature-Liste; diese Reihenfolge ist auch im Generator hinterlegt.
- Die zweisprachigen BoxSystemInfo-Sammlungsseiten zeigen zehn Hauptfunktionen im bestehenden Kachelstil und verlinken auf die vollständigen GitHub-Listen (`FEATURES.md` und `FEATURES.de.md`).
- Die e2Atlas-Detailseiten verwenden oben das App-Icon und dieselben fünf Screenshots in Deutsch und Englisch.
- **Oberste Priorität:** HTML-Struktur, Layout, Farben, Themes, Animationen, Navigation, Sprachwechsel, Downloads und automatische Aktualisierungen erhalten. Nur ausdrücklich beauftragte Inhalte gezielt ändern und sowohl statische Seiten als auch ihre zuständigen Generatoren/Quellzuordnungen konsistent halten.

## Abschnittsanimation: Ursache, Korrektur und Prüfvorgabe (28. Oktober 2026)

- **Symptom:** Auf mehreren App- und Sammlungsseiten (unter anderem NZBPort, Enigma-Plugins und LG G5 Apps) fehlte der leuchtende Punkt, der entlang der Abschnittstrennlinien abwechselnd von links nach rechts und zurück läuft. Auf e2Atlas funktionierte er.
- **Ursache:** Die Animation war in `assets/app-home-bridge.css` definiert, doch diese Datei wurde auf den betroffenen statischen HTML-Seiten nicht eingebunden. Bei früheren Anpassungen wurde dieser visuelle Effekt nicht seitenübergreifend überprüft.
- **Korrektur:** Die relevanten Animationsregeln wurden in `assets/section-dot-animation.css` bereitgestellt. Betroffene Seiten laden sie direkt oder über `assets/static-app.js` nach. Der Generator `scripts/sync-collections.cjs` berücksichtigt die Einbindung bei neu erzeugten Sammlungsseiten. e2Atlas wird vom dynamischen Nachladen ausgenommen, da der Effekt dort schon vorhanden war.
- **Ergebnis:** Der Nutzer hat bestätigt, dass die Animation wieder auf allen Seiten funktioniert. HTML-/JavaScript-Syntaxprüfungen allein gelten ausdrücklich **nicht** als visueller Funktionstest.
- **Verbindliche Regel:** Das vorhandene Design einschließlich Abschnittsanimationen, Bewegungsrichtung, Übergängen, Hover-Effekten, Abständen und Themes hat oberste Priorität. Bei jeder relevanten Änderung deutsche und englische Seiten sowie unterschiedliche Seitentypen gegen eine funktionierende Referenz vergleichen. CSS-Einbindungen und Generator-Ausgaben prüfen; visuelle/browserbasierte Tests nicht als durchgeführt behaupten, wenn nur Quelltext geprüft wurde. Keine ungefragten Layout- oder Animationsumbauten.

## Release-Synchronisierung: reparierter Stand und nächste Kontrolle (30. Oktober 2026)

- **Ausgangslage:** Der GitHub-Projekt-Watch meldete veraltete HTML-Versionen/Bögen, fehlende SHA256-Links und einen unzutreffenden Final-Status der Sammlung Enigma-Plugins. Die zentrale `release-status.json` war bei e2Atlas, FileAtlas und ThermalAtlas bereits aktueller als einzelne statische App-Seiten und Startseiten-Badges.
- **Behobene Versionseinträge:** Die englischen und deutschen App-Detailseiten sowie Startseiten-Badges wurden auf e2Atlas Final `v1.0.0-final`, FileAtlas Final `v1.11.0` und ThermalAtlas Final `v1.2.0` abgeglichen. `scripts/sync-static-releases.cjs` wird künftig aus `.github/workflows/refresh-release-status.yml` aufgerufen, um bestehende statische Release-Badges, Detailseiten-Release-Blöcke und Downloads aus `release-status.json` nachzuführen. Die Startseitenpfade sind für EN und DE getrennt behandelt; bei der deutschen Sprache bleibt `Entwicklung` lokalisiert.
- **Prüfsummen:** Die Asset-Erkennung im Release-Workflow akzeptiert SHA256-/Checksum-Dateinamen auch mit Versionssuffix (z. B. `SHA256SUMS.txt` und `SHA256SUMS-0.2.txt`). In `release-status.json` sind die zuvor fehlenden Links zu FileAtlas `v1.11.0` und NZBPort `v0.2` enthalten. `assets/static-app.js` berücksichtigt beim dynamischen Rendern jetzt auch SHA256- und IPK-Links, damit sie nicht nach dem Laden verschwinden.
- **Sammlungen:** `release-status.json` führt `Enigma-Plugins` mit `stage: "Collection"`, ohne eine Plugin-Version als Sammlungsrelease auszugeben. BoxSystemInfo bleibt in `items.BoxSystemInfo` mit eigenem Release-Status erhalten. Die Profil-READMEs bezeichnen die Sammlungen weiterhin als Collection/Sammlung.
- **Abnahme am 30.10.2026:** Die betroffenen Dateien und Skripte wurden erneut über GitHub kontrolliert; die Release-Synchronisierung (Lauf `41027075533`), die Cache-Validierung (Lauf `41027396595`) sowie spätere Pages-Veröffentlichungen (u. a. Lauf `41027504476`) waren erfolgreich. Die tatsächliche Aktualisierung beim **nächsten neuen Release** ist noch ein offener Praxistest, kein bereits bewiesenes Ergebnis.
- **Historische Fehlmeldungen:** Lauf `41026974111` scheiterte, weil der Workflow vor dem neuen Skript `scripts/sync-static-releases.cjs` veröffentlicht wurde (`MODULE_NOT_FOUND`); späterer Synchronisierungslauf erfolgreich. Pages-Lauf `41027267530` scheiterte wegen gleichzeitiger Deployments; spätere Veröffentlichung erfolgreich. Diese historischen Failed-Meldungen allein bedeuten keinen aktuell defekten Stand. Künftig abhängige Dateien und Workflow-Anpassungen zusammen veröffentlichen bzw. in richtiger Reihenfolge bereitstellen und **sämtliche** relevanten Läufe inklusive Failed/Cancelled prüfen.
- **Bei der nächsten planmäßigen Prüfung:** Neue Beta-/Final-Releases mit `release-status.json`, dem eingebetteten Status in `assets/app-detail.js`, EN/DE-Startseiten-Badges, EN/DE-App-Detailseiten und Download-/SHA256-Links vergleichen. Bei Sammlungen die Trennung von Collection und Unterprojekt prüfen; anschließend Release-Sync, Cache-Prüfung, Privacy Check und Pages-Deployment samt Fehlerprotokollen auswerten. Keine Erfolgsgarantie vor dem praktischen Wiederholungstest.
- **Unverändert lassen:** Homepage-Design, HTML-Anordnung außerhalb der Release-Elemente, drei Themes, Navigation, Abschnittsanimationen, Bilder und sonstige Features. Keine generelle Neugestaltung und keine ungefragten Workflow-Umbauten.

## Verbindliche Regressionstests für automatische Synchronisierung (30. Oktober 2026)

- **Fehlerursache und Lehre:** Bei der Umstellung von Enigma-Plugins auf `Collection` wurde `BoxSystemInfo` zunächst korrekt als Unterprojekt gespeichert, jedoch durch eine spätere Synchronisierung erneut als `Collection` verschachtelt. Die erste Prüfung kontrollierte das Vorhandensein der gewünschten Struktur, aber nicht ihre **Idempotenz** bei erneuter Ausführung. Der GitHub-Projekt-Watch entdeckte diese Abweichung nachträglich. Dieser Prüffehler darf sich nicht wiederholen.
- **Pflichttest bei jeder Änderung an Generatoren, Release-/Profil- oder Sammlungs-Synchronisierung:** Eingaben und erwartete Ausgabe definieren; das betroffene Skript mit denselben Daten **mindestens zweimal** nacheinander in einer Testumgebung ausführen und beide Ausgaben vergleichen. Der zweite Lauf darf weder weitere Verschachtelungen noch ungewollte Änderungen, doppelte Einträge oder veraltete Werte erzeugen (Idempotenz). Nur Syntax- und Erfolgsstatusprüfungen reichen nicht aus.
- **Strukturelle Assertions:** Bei Enigma-Plugins muss `stage === "Collection"` gelten, `items.BoxSystemInfo.stage` den tatsächlichen Plugin-Status enthalten und `items.BoxSystemInfo.items` **nicht** existieren. Dasselbe Prinzip für andere Sammlungen und deren Unterprojekte anwenden; Versions-/Release-Metadaten dürfen niemals zu einem falschen Sammlungsstatus führen.
- **End-to-End-Prüfung:** `release-status.json`, den eingebetteten Status in `assets/app-detail.js`, alle betroffenen englischen/deutschen statischen Detailseiten und Startseiten-Badges, Download-/SHA256-Links sowie den GitHub-Profilstatus gegenseitig abgleichen. Relevante erfolgreiche **und fehlgeschlagene** GitHub-Actions-Jobs samt Logs kontrollieren. Bei jedem nächsten neuen Release besonders die automatische Übernahme überprüfen.
- **Veröffentlichungssicherheit:** Abhängige Skripte und Workflow-Änderungen konsistent bereitstellen und nach Möglichkeit zusammengehörige Anpassungen in einem Commit bündeln, damit weder fehlende Skriptdateien noch konkurrierende Pages-Deployments entstehen. Bei jeder Prüfung festhalten, **was tatsächlich getestet wurde**; eine erfolgreiche Veröffentlichung nicht mit vollständiger Funktions- oder Idempotenzprüfung gleichsetzen.
- **Nicht verändern:** Vorhandene Homepage-Optik, drei Themes, Animationen, Navigation und App-spezifische Seitenarchitektur dürfen durch technische Synchronisierungsfixes nicht umgebaut werden.

## Pflege- und Prüfablauf

1. Englische und deutsche Inhalte, Links, Handbücher und Downloads inhaltlich gleichwertig aktualisieren.
2. Öffentliche Quellen für Projektfakten prüfen; keine Angaben erfinden.
3. Bei relevanten HTML-, CSS- oder JavaScript-Änderungen die zentrale Cache-Version bei Bedarf gezielt erhöhen und die Referenzen konsistent halten; der Validierungsworkflow darf keinen zweiten Commit oder Pages-Build erzeugen.
4. Bei erneuten Cache-, Lade- oder Theme-Problemen `CACHE_BUSTING_PLAN.md` als Diagnose- und Prüfnotiz verwenden; keine zusätzliche automatische Umschreibung aller Seiten einführen.
5. `bash Scripts/privacy-check.sh` und `git diff --check` ausführen.
6. Texte, Bilder, Ziel-URLs sowie Desktop- und Mobilansicht manuell prüfen.
7. GitHub Pages auf `main` und `/(root)` in den Repository-Einstellungen kontrollieren, wenn die Auslieferung geändert wurde.
8. Bei einem neuen öffentlichen Projekt die Repository-Zuordnung im Status-Workflow ergänzen und prüfen, dass das Badge auf der Übersicht erscheint.

Bei größeren Änderungen an Struktur, Datenschutz oder Veröffentlichung dieses Dokument und `NEXT_STEPS.md` aktualisieren.
