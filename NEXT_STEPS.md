# Nächste Schritte

**Stand:** 6. September 2026

## Vor oder nach einer Veröffentlichung prüfen

- Die GitHub-Pages-Einstellung muss `main` und `/(root)` verwenden.
- Die Portfolio-Übersicht sowie mindestens eine Projekt- und Technikseite in Desktop- und Mobilansicht manuell prüfen. Eine automatisierte visuelle Browserprüfung ist nicht eingerichtet.
- Bei relevanten HTML-, CSS- oder JavaScript-Änderungen das vorhandene globale Cache-Busting-System verwenden und nach dem finalen Deployment prüfen, dass alle Seiten und Module mit derselben aktuellen Version ausgeliefert werden.
- Theme-Umschaltung und Wiederherstellung von Dunkel, Hell und Bunt in mindestens einem Desktop- und einem Mobilbrowser prüfen.

## App-Homepages

- Die App-Detailseiten verwenden das gemeinsame aktuelle Homepage-Design und das gemeinsame Interaktionsmodell.
- Bei Änderungen das gemeinsame visuelle System beibehalten; app-spezifische Abweichungen nur dort einsetzen, wo das vorhandene Material sie sinnvoll macht.
- Galerien responsiv und passend zum Bildformat halten. Hochformat- oder Charakterbilder dürfen deutlich kompakter als normale App-Screenshots dargestellt werden.
- Für jede App nur Inhalte und Screenshots aus dem jeweiligen überprüften öffentlichen Projektstand verwenden; Umfang und Aufbau an die tatsächlich vorhandenen Inhalte der App anpassen.
- Die Portfolio-Übersichtsseite bleibt als kompakte Sammlung bestehen.

## Bei Änderungen an Projekten

- Beschreibungen, Funktionen, Technologien, Handbücher, Downloads und Web-App-Links aus öffentlichen Quellen nachziehen.
- Englische und deutsche Projekt- und Technikseiten gleichwertig aktualisieren.
- Vor dem Push `bash Scripts/privacy-check.sh`, `git diff --check` und eine manuelle Prüfung von Bildern und Texten ausführen.
- Die Regeln in `PORTFOLIO_UPDATE.md` beachten.

## Datenschutz

- Keine Tracker, Cookies, Formulare, Chatbots, externe Schriftanbieter oder neue Datenverarbeitung ergänzen, ohne Datenschutzhinweise und Prüfung neu zu bewerten.
- Die vorhandene Theme-Präferenz in `localStorage` speichert ausschließlich `dark`, `light` oder `color` und darf nicht für andere Daten erweitert werden, ohne dies neu zu bewerten.
- Bei neuen externen Bild- oder Medienquellen prüfen, ob sie wirklich erforderlich und öffentlich sind; bevorzugt GitHub-Quellen verwenden.
