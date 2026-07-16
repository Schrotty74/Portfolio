# Sicherheits- & Datenschutzprüfung

**Status:** Unauffällig für die hier dokumentierten automatisierten Prüfungen am **16. Juli 2026**.

Dieser Bericht ist öffentlich, damit nachvollziehbar bleibt, was geprüft wurde. Er ist keine Garantie, dass ein Repository niemals private Daten enthalten kann.

## Umfang

- Die aktuellen öffentlichen Repositories unter **Schrotty74** wurden nach typischen Hochrisiko-Indikatoren durchsucht: Private-Key-Kopfzeilen, GitHub-Token, übliche API-Key-Präfixe, absolute Benutzerpfade und Gmail-Adressen.
- Das Portfolio wurde zusätzlich auf Laufzeit-Datenschutz geprüft: Es enthält keine Analysewerkzeuge, Cookies, Formulare, Tracker oder JavaScript.
- Die Portfolio-Seite verwendet Systemschriften und lädt keine Google Fonts oder andere externe Schriftanbieter.
- Projektbilder werden von GitHubs Raw-Content-Host geladen. GitHub Pages und diese Bilder verursachen zwangsläufig eine Anfrage an GitHub; dafür gelten die Datenschutzbedingungen von GitHub.

## Ergebnis

Die automatisierte Indikatorprüfung hat keine echten Zugangsdaten oder privaten Benutzerpfade gefunden. Einige Texttreffer waren harmlose Referenzen in Tests, Dokumentation oder Prüfscripts – keine Geheimnisse.

## Schutz für künftige Änderungen

Bei jeder Änderung dieses Portfolio-Repositories läuft [Scripts/privacy-check.sh](Scripts/privacy-check.sh) über GitHub Actions. Die Prüfung blockiert typische private Dateitypen sowie klare Muster für Schlüssel, Tokens und persönliche Pfade.

## Grenzen

Automatisierte Prüfungen erkennen nicht jede Art personenbezogener Information und können nicht beweisen, dass solche Daten in älterer Git-Historie nie vorhanden waren. Vor einer Veröffentlichung bleibt eine menschliche Prüfung nötig, besonders bei Screenshots, Beispieldateien, Exporten, Backups, Logs und Dokumentation.

Bei einem möglichen Datenschutzproblem sollten die Daten nicht erneut geteilt werden. Zuerst entfernen oder über einen privaten Kontaktweg melden.

[English version](PRIVACY_CHECK.md)
