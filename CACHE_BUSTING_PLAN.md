# Cache-Busting: Beobachtung und weiteres Vorgehen

Stand: 15. Oktober 2026

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

Das deutet darauf hin, dass der frühere globale Cache-Bust zeitweise inkonsistente Kombinationen aus HTML, CSS und JavaScript-Modulen bzw. aufeinanderfolgenden GitHub-Pages-Deployments erzeugt hat.

## Aktueller Stand

Die Theme-Auswahl wird weiterhin in `localStorage` unter `portfolio-theme` gespeichert.

Der aktuelle Theme-Fix soll dafür sorgen, dass die Theme-Persistenz möglichst unabhängig von gecachten bzw. versionierten JavaScript-Modulen funktioniert. Ziel ist, dass nach Reload oder Seitenwechsel immer das zuletzt gewählte Theme erhalten bleibt und nicht auf ein anderes Theme zurückspringt.

Der frühere automatische Schreib-Workflow wurde am 15. Oktober 2026 durch eine reine Validierung ersetzt. `.github/workflows/global-cache-bust.yml` prüft jetzt nur noch die Referenzen, ändert keine Dateien, erstellt keinen Folge-Commit und löst keinen zweiten Pages-Build aus. Die zentrale Version in `cache-version.txt` wird bei einer geplanten Inhaltsänderung gezielt erhöht.

## Neue Veröffentlichungslogik

Pro eigentlicher Änderung gibt es jetzt nur noch einen normalen GitHub-Pages-Build. Die Cache-Version wird nicht mehr nachträglich durch einen Bot-Commit verändert. Dadurch werden keine konkurrierenden Folge-Deployments erzeugt und HTML, CSS sowie JavaScript bleiben im selben Veröffentlichungsstand.

Der GitHub-Actions-Workflow dient nur als Konsistenzprüfung. Wenn Referenzen nicht zur zentralen Version passen, schlägt die Prüfung fehl; sie schreibt nichts zurück.

## Wann dieser Sonderplan angewendet wird

Dieser Sonderplan soll **nicht** bei jeder normalen Änderung an der Homepage, an App-Seiten oder an anderen Portfolio-Inhalten automatisch angesprochen oder ausgelöst werden.

Er wird erst dann angewendet, wenn der Nutzer ausdrücklich meldet, dass das bekannte Theme-, Lade- oder Cache-Problem erneut aufgetreten ist, zum Beispiel:

- falsches oder wechselndes Theme nach Neuladen,
- Theme-Persistenz funktioniert nicht zuverlässig,
- das zuletzt gewählte Theme wird nicht wiederhergestellt,
- leere App-Detailseiten bzw. nur Hintergrund ohne Inhalt,
- vorübergehend inkonsistente Darstellung nach einem Deployment,
- ein anderes vom Nutzer ausdrücklich als erneutes Cache-/Theme-Problem gemeldetes Verhalten.

Bei normalen Portfolio-Änderungen ohne eine solche Problemmeldung läuft nur die Validierung. Sie erzeugt keinen zusätzlichen Commit und keine zweite Veröffentlichung.

## Verbindliches weiteres Vorgehen nach erneuter Problemmeldung

### Schritt 0: Zuerst nur die Auslieferung prüfen

Nicht sofort `?v=`-Versionierungen entfernen und keine Dateien bereinigen.

Zuerst prüfen: GitHub-Pages-Build, veröffentlichte Commit-Version, CDN-Cache und Browser-/WebKit-Cache getrennt betrachten. Der Validierungsworkflow kann bei Bedarf vorübergehend deaktiviert werden, ohne die Website-Dateien zu verändern.

Ziel dieses Tests:

- prüfen, ob Homepage und App-Detailseiten ohne neue Cache-Bust-Läufe stabil laden,
- Theme-Wechsel und Theme-Persistenz über Reloads testen,
- Safari, Firefox und iOS/WebKit vergleichen,
- feststellen, ob die beobachteten Probleme tatsächlich verschwinden, sobald der Cache-Bust nicht mehr ausgeführt wird.

Bestehende `?v=`-Werte und `cache-version.txt` bleiben dabei unverändert. Eine Deaktivierung ist nur ein Diagnose-Schritt; die Website-Dateien werden dadurch nicht verändert.

### Schritt 1: Cache-Busting vereinfachen

Wenn der Test bestätigt, dass der Cache-Bust die Probleme verursacht und der Nutzer zunächst eine vereinfachte Lösung versuchen möchte, eine deutlich vereinfachte Cache-Busting-Lösung umsetzen.

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

Auch hier gilt: Nicht automatisch löschen. Vor der vollständigen Entfernung ausdrücklich mit dem Nutzer abstimmen, dass jetzt wirklich gelöscht und bereinigt werden soll.

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

Solange der Nutzer kein erneutes Theme-, Lade- oder Cache-Problem meldet, soll aufgrund dieser Notiz allein nichts am Cache-Bust geändert oder vorgeschlagen werden. Der aktive Workflow darf bei normalen relevanten Portfolio-Änderungen weiterlaufen und die Cache-Version wie bisher erhöhen.

Erst nach einer ausdrücklichen erneuten Problemmeldung des Nutzers soll Schritt 0 angeboten werden. Keine Löschung, Bereinigung oder Vereinfachung ohne ausdrückliche Entscheidung des Nutzers. Schritt 1 folgt nur, wenn der Nutzer nach dem Deaktivierungs-Test eine vereinfachte Lösung versuchen möchte. Schritt 2 folgt nur, wenn Schritt 1 nicht zuverlässig funktioniert, neue Probleme verursacht oder der Nutzer ausdrücklich die vollständige Entfernung wünscht.

## Dokumentierter Ladeweg nach der e2Atlas-Reparatur

Am 15. Oktober 2026 wurde der alte e2Atlas-Lade-/Bundle-Weg entfernt. Dieser konnte in Safari, Firefox und anderen Browsern zeitweise einen alten HTML-/JavaScript-Stand bzw. das alte 11-App-Bundle weiterverwenden.

Wichtig ist die Trennung der Zuständigkeiten:

- Das verbleibende kleine e2Atlas-Inline-Script steuert ausschließlich „Animationen pausieren/fortsetzen“. Es lädt keine App-Daten, ersetzt keine Workflows und ist nicht der eigentliche Cache-Bust.
- Die sofortige Aktualisierung beruht auf konsistenten HTML-, CSS- und JavaScript-Referenzen sowie dem gemeinsamen veröffentlichten Stand. Sie wird nicht durch einen nachträglichen Bot-Commit oder einen zweiten Pages-Build erzwungen.
- App-Daten, Status-/Build-Anzeigen, Download- und Detail-Links sowie Release-/Profil-Workflows bleiben getrennt und werden durch diesen Ladeweg nicht verändert.
- App-Detailseiten müssen die gemeinsame `assets/app-home-bridge.css` laden. Dadurch verwenden sie dieselbe Abschnitts-/Zwischenanimation wie die übrigen App-Seiten.
- Kein alter Loader, kein zusätzlicher Folge-Commit und keine Mischung aus alten und neuen Asset-Versionen darf wieder eingeführt werden.

Die e2Atlas-Seite wurde an die gemeinsame App-Detail-Struktur angepasst. Die Änderung wurde am 15. Oktober 2026 per GitHub Pages veröffentlicht und live geprüft. Diese Dokumentation beschreibt den stabilisierten Ladeweg; sie führt keinen neuen Cache-Bust-Mechanismus ein.

