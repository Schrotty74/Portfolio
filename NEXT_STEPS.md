# Nächste Schritte

**Stand:** 23. Juli 2026  
**Pflege:** Bei größeren Änderungen an Funktion, Architektur, Datenschutz oder Veröffentlichung aktualisieren. Nur nachweislich offene Punkte aufnehmen.

## Priorität 1

- Die Abweichung zwischen den Privacy-Dokumenten und dem aktiven Google-Fonts-Import in `portfolio-nav-v4.css` bewusst entscheiden und anschließend Code und Dokumentation konsistent halten. Der gewünschte Zielzustand ist derzeit nicht dokumentiert.

## Priorität 2

- Bei der nächsten Layoutänderung die Übersichtsseite und relevante Detailseiten manuell auf Desktop und Mobil prüfen. Eine automatisierte visuelle Prüfung ist nicht vorhanden.
- GitHub-Pages-Konfiguration in den Repository-Einstellungen prüfen, wenn das Projekt nach einer Neuinstallation oder in einem neuen Umfeld übernommen wird; die Einstellung ist nicht versioniert.

## Wiederkehrend, nur bei Anlass

- Bei einem neuen öffentlichen Projekt `PORTFOLIO_UPDATE.md` vollständig befolgen: Karten in beiden Sprachen, englische und deutsche Detailseiten, passende Links, öffentliche Demo-Assets, Profil-Referenz und gegebenenfalls Status-Workflow ergänzen.
- Bei öffentlich sichtbaren Änderungen an Beschreibung, Status, Plattformen, Screenshots oder URLs prüfen, ob Portfolio und Profil aktualisiert werden müssen.
- Vor einer Veröffentlichung `bash Scripts/privacy-check.sh`, `git diff --check` und eine manuelle Sichtprüfung ausführen.

## Kein offener Punkt bekannt

- Für Build-Abhängigkeiten, Paketmanager oder Lockfiles ist kein Handlungsbedarf dokumentiert: Das Repository enthält nach der aktuellen Prüfung keine solchen Dateien und laut `README.md` keinen Build-Schritt.
