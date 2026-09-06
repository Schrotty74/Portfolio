# Portfolio

[English](README.md)

[![Privacy Check](https://github.com/Schrotty74/Portfolio/actions/workflows/privacy-check.yml/badge.svg)](https://github.com/Schrotty74/Portfolio/actions/workflows/privacy-check.yml)

Das öffentliche GitHub-Pages-App-Portfolio von [Schrotty74](https://github.com/Schrotty74) ist unter [schrotty74.github.io/Portfolio](https://schrotty74.github.io/Portfolio/) erreichbar.

Es bietet eine englischsprachige Übersicht mit gleichwertiger deutscher Fassung für elf öffentliche Projekte sowie Projekt-, Technik-, Impressums- und Datenschutzseiten. Soweit öffentlich vorhanden, verlinken die Projektseiten auf Handbuch, Direktdownload, Web-App und Quell-Repository.

## Veröffentlichung

GitHub Pages muss den Branch `main` aus dem Repository-Stamm ausliefern. Die Website ist ein statischer Export: GitHub Pages benötigt keine serverseitige Laufzeit, Cookies, Analysewerkzeuge, Formulare oder einen Chatbot.

## Themes

Die Website bietet Dunkel, Hell und Bunt. Theme-spezifische Regeln liegen getrennt in `assets/dark-theme.css`, `assets/light-theme.css` und `assets/color-theme.css`; gemeinsames Layout und gemeinsame Komponenten bleiben in den gemeinsamen Stylesheets. Die gewählte Theme-Variante wird lokal unter `portfolio-theme` gespeichert und verwendet ausschließlich die Werte `dark`, `light` oder `color`.

## Datenschutz und Pflege

- Öffentliche Projekt-Screenshots werden direkt über GitHubs Raw-Content-Host geladen.
- Release-Badges und getrennte Ziele für die jeweils neuesten Final-/Beta-Downloads werden durch den Repository-Workflow täglich aus öffentlichen GitHub-Release-Daten aktualisiert.
- `cache-version.txt` ist die einzige globale Cache-Version. `.github/workflows/global-cache-bust.yml` hält HTML-Referenzen, CSS-/JavaScript-Ressourcen, interne ES-Modul-Imports und App-Detail-Links auf derselben Version. Die Assets behalten stabile Dateinamen; es entstehen keine physischen Versionskopien.
- Vor einer Veröffentlichung `bash Scripts/privacy-check.sh` und `git diff --check` ausführen sowie Texte und Bilder manuell prüfen.
- Die dokumentierte Datenschutzprüfung steht in [PRIVACY_CHECK.de.md](PRIVACY_CHECK.de.md).
- Regeln für neue oder geänderte Projekte stehen in [PORTFOLIO_UPDATE.md](PORTFOLIO_UPDATE.md).
