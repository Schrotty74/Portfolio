# Sicherheits- & Datenschutzprüfung

**Status:** Die automatisierten Prüfungen waren am **29. August 2026** unauffällig; für diese Veröffentlichung wurden außerdem öffentliche Texte, Linkziele und Bild-Hosts geprüft.

Dieser Bericht beschreibt die Prüfungen. Er ist keine Rechtsberatung und keine Garantie, dass niemals personenbezogene Daten enthalten sein können.

## Hosting und Laufzeit-Datenschutz

- Das Portfolio wird als statische Website über GitHub Pages ausgeliefert. GitHub verarbeitet bei der Bereitstellung notwendigerweise technische Verbindungs- und Nutzungsdaten; siehe [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- Projekt-Screenshots werden direkt von GitHubs Raw-Content-Host geladen. Beim Öffnen einer Seite mit einem solchen Bild stellt der Browser eine direkte Anfrage an GitHub.
- Das Portfolio selbst enthält keine Analysewerkzeuge, Werbung, Formulare, eingebetteten Drittanbieter-Widgets, eigenen Cookies oder Local-Storage-Speicherung. Es lädt keine externen Schriften.
- Links zu Repository, Handbuch, Download, Web-App oder Shortcut werden erst geöffnet, wenn Besucher sie auswählen. Danach gelten die Datenschutzbedingungen des jeweiligen Zielangebots.

## Durchgeführte Prüfungen

- `Scripts/privacy-check.sh` blockiert typische private oder geheime Dateitypen, Zugangsdaten, Token-Muster und private lokale Pfade.
- Die Prüfung blockiert außerdem frühere ChatGPT-Sites-Hosting-Verweise in websichtbaren Quelldateien, damit die veröffentlichte Website keine Ressourcen von dieser Hosting-Domain nachlädt.
- Lokale Styles, Skripte und Icons stammen aus diesem Repository. Öffentliche Projektbilder verwenden `raw.githubusercontent.com/Schrotty74/...`; keine Ressource verweist auf die frühere ChatGPT-Sites-URL.

## Grenzen und künftige Änderungen

Automatische Prüfungen erkennen nicht jede Form personenbezogener Daten und können nicht beweisen, dass ältere Git-Historie nie solche Daten enthielt. Vor jeder öffentlichen Änderung sichtbare Texte, Screenshots, Links und Downloads zusätzlich manuell prüfen. Keine echten Nutzerdaten, privaten Exporte, Logs, Backups oder Zugangsdaten veröffentlichen.

[English version](PRIVACY_CHECK.md)
