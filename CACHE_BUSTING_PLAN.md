# Cache-Busting: Beobachtung und weiteres Vorgehen

Stand: 2026-09-08

## Hintergrund

Der globale automatische Cache-Bust wurde am 6. September 2026 eingeführt, damit Browser nach Änderungen an der Portfolio-Seite schneller und zuverlässiger die aktuelle Version laden.

Vor der Einführung gab es vor allem dieses Problem:

- Änderungen an der Portfolio-Seite waren teilweise erst mit Verzögerung sichtbar.
- Die Seite selbst blieb dabei grundsätzlich stabil.
- Theme-Auswahl und App-Detailseiten zeigten keine vergleichbaren temporären Ausfälle.

Seit der Einführung des globalen Cache-Bustings wurden wiederholt folgende Probleme beobachtet:

- Das gewählte Theme (`dark`, `light`, `color`) wurde trotz Speicherung in `localStorage` beim Neuladen zeitweise nicht zuverlässig übernommen.
- Das Theme sprang teilweise auf Dunkel oder auf einen zuvor verwendeten Theme-Zustand zurück.
- App-Detailseiten zeigten zeitweise nur den Hintergrund ohne den eigentlichen Seiteninhalt.
- Das Verhalten trat besonders auffällig in Safari und unter iOS/WebKit auf.
- Nach vollständigem Beenden des Browsers, kurzer Wartezeit und erneutem Laden funktionierten Theme und App-Seiten wieder normal.
- Firefox unter macOS war teilweise bereits wieder stabil, während WebKit-basierte Browser noch einen inkonsistenten Zustand zeigten.

Das deutet darauf hin, dass der aktuelle globale Cache-Bust zeitweise inkonsistente Kombinationen aus HTML, CSS und JavaScript-Modulen bzw. aufeinanderfolgenden GitHub-Pages-Deployments erzeugen kann.

## Aktueller Stand

Die Theme-Auswahl wird weiterhin in `localStorage` unter `portfolio-theme` gespeichert.

Der aktuelle Theme-Fix soll dafür sorgen, dass die Theme-Persistenz möglichst unabhängig von gecachten bzw. versionierten JavaScript-Modulen funktioniert.

Der globale Cache-Bust bleibt vorerst unverändert aktiv und wird beobachtet.

## Verbindliches weiteres Vorgehen

Wenn bei einer künftigen normalen Änderung an der Portfolio-Seite erneut eines der folgenden Probleme auftritt:

- falsches oder wechselndes Theme nach Neuladen,
- Theme-Persistenz funktioniert nicht zuverlässig,
- leere App-Detailseiten bzw. nur Hintergrund ohne Inhalt,
- vorübergehend inkonsistente Darstellung nach einem Deployment,
- andere neue Probleme, die zeitlich mit dem Cache-Bust zusammenhängen,

dann gilt folgende Reihenfolge:

### Schritt 1: Cache-Busting vereinfachen

Zuerst eine deutlich vereinfachte Cache-Busting-Lösung umsetzen.

Ziele:

- nicht mehr bei jeder Änderung die komplette Portfolio-Seite global neu versionieren,
- möglichst nur tatsächlich geänderte CSS-/JavaScript-Assets versionieren,
- keine unnötige Umschreibung sämtlicher HTML-/App-Seiten,
- Theme-Persistenz nicht an globale Cache-Versionen koppeln,
- Theme-Logik und `localStorage` nicht durch den Cache-Workflow verändern,
- möglichst nur ein GitHub-Pages-Deployment pro eigentlicher Inhaltsänderung erzeugen,
- vermeiden, dass alte und neue HTML-/JS-Versionen kurzfristig miteinander vermischt werden.

Wichtig: Bei dieser Vereinfachung dürfen keine fachlichen oder visuellen Änderungen an der Portfolio-Homepage vorgenommen werden, die nicht direkt für die Cache-Busting-Änderung notwendig sind.

### Schritt 2: Vollständige Entfernung des Cache-Bustings

Falls die vereinfachte Lösung weiterhin Probleme verursacht, neue Probleme erzeugt oder die Website nach Deployments weiterhin zeitweise inkonsistent ist, soll der globale Cache-Bust vollständig und sauber entfernt werden.

Dabei gilt ausdrücklich:

- Den Cache-Bust vollständig entfernen, nicht durch neue komplexe Sonderlogik ersetzen.
- Die normale GitHub-Pages-Auslieferung wieder verwenden.
- Bestehende Homepage-Funktionen, Layouts, Inhalte, Themes und App-Seiten nicht verändern.
- Nur Dateien oder Code ändern, die direkt mit dem Cache-Busting verbunden sind oder durch dessen Entfernung technisch angepasst werden müssen.
- Rein cachebezogene Reste wie Workflow, `cache-version.txt`, `?v=`-Versionierungen oder andere nur dafür eingeführte Mechanismen sauber entfernen, soweit dies für die vollständige Entfernung notwendig ist.
- Theme-Persistenz über `localStorage` erhalten.
- Keine sonstigen Refactorings oder Designänderungen im selben Schritt durchführen.
- Nach der Entfernung prüfen, ob Homepage, Theme-Wechsel, Reload, Sprachwechsel und mehrere App-Detailseiten stabil funktionieren.
- Den Git-Diff anschließend ausschließlich als Kontrolle verwenden, damit bestätigt wird, dass nur Cache-Bust-bezogene Änderungen vorgenommen wurden und nichts anderes unbeabsichtigt verändert wurde.

Danach muss die Portfolio-Seite funktional wieder dem Zustand vor Einführung des Cache-Busts entsprechen, nur mit dem heutigen Inhalt. Ansonsten darf nichts geändert werden.

## Priorität

Stabilität hat Vorrang vor sofortiger Sichtbarkeit von Änderungen.

Wenn die Wahl zwischen diesen beiden Zuständen besteht:

1. eine Änderung erscheint etwas später im Browser, die Website bleibt aber stabil,
2. eine Änderung erscheint schneller, dafür gibt es zeitweise falsche Themes oder leere Seiten,

dann ist Zustand 1 ausdrücklich vorzuziehen.

## Nicht automatisch ändern

Solange kein erneutes Problem nach einer normalen Portfolio-Änderung beobachtet wird, soll aufgrund dieser Notiz allein nichts am Cache-Bust geändert werden.

Erst bei erneutem Auftreten der beschriebenen Probleme soll Schritt 1 umgesetzt werden. Schritt 2 folgt nur, wenn Schritt 1 nicht zuverlässig funktioniert oder neue Probleme verursacht.
