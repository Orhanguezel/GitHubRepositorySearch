# Verwendung der GitHub API

Hier wirst du ein sehr einfaches (aber nützliches) Tool erstellen, das eine Liste aller von einem Benutzer erstellten Repositories abruft.

## Aufgabe

Verwende die [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) und die [GitHub API](https://docs.github.com/en/rest);

- Baue eine Webseite, die es einem Benutzer ermöglicht, alle Repositories auf GitHub abzufragen und zurückzugeben, die von einem bestimmten Benutzer erstellt wurden
- Wenn du beispielsweise nach dem Benutzernamen `DigitalCareerInstitute` suchst, sollte eine Liste aller von `DigitalCareerInstitute` erstellten Repositories zurückgegeben werden
- Du musst die GitHub API-Dokumentation lesen
- Suche nach einem Endpunkt, der die Abfrage "Liste der Repositories für einen Benutzer" behandelt
- Hab keine Angst vor dem Scheitern! Ausprobieren und Scheitern ist eine großartige Möglichkeit zu lernen.
- Fehlermeldungen sind dein Freund 😸

## Anforderungen

- Verwende diese Dateien, um deine Lösung zu schreiben;
  - [index.html](./index.html)
  - [css/main.css](./css/main.css)
  - [js/main.js](./js/main.js)
- Es sollte ein `<input />` Feld für die Suchkriterien geben
- Es sollte einen `<button>` geben, um die Suche zu aktivieren
- Ein Klick auf den `<button>` sollte eine Liste der Ergebnisse (die Repositories) von der API zurückgeben und anzeigen

## Erwartetes Ergebnis

![Erwartetes Ergebnis](./reference.gif)
