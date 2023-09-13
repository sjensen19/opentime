> Let op: Dit project is gemaakt in een week tijd, en is dus nog niet volledig af. Het is dus mogelijk dat er nog bugs in zitten. Als je een bug tegenkomt, maak dan een issue aan op GitHub.

> Informatie: Aan dit project wordt op dit moment niet actief gewerkt. Het is dus mogelijk dat er geen updates meer komen. Als je wilt bijdragen aan dit project, maak dan een pull request aan op GitHub.

# opentime
opentime is een open source project dat studenten en docenten helpt om hun roosters inzichtelijk te maken. Het project is gemaakt door studenten van mboRijnland.

## Motivatie
Dit is een project van een groep 1e jaars studenten van de opleiding Software Developer (Crebo 25604), tijdens een introductieweek. Voor dit project hadden we een week de tijd. Het doel van dit project was om een website te maken die het rooster van de studenten en docenten inzichtelijk maakt. Denk hierbij aan vergelijkbare applicaties, zoals Magister, Osiris (vaak gebruikt op het MBO en HBO) en SOMtoday. Het verschil is dat deze applicatie open source is en dus door iedereen gebruikt kan worden.

## Installatie
1. Clone de repository
```bash
git clone https://github.com/sjensen19/opentime
``` 
2. Installeer de benodigde packages
```bash
npm install
```
3. Maak een lokale mysql database 'opentime'
4. Stel de database in met de tabellen voor opentime
```bash
npm run db
```
5. Compileer de tailwind css
```bash
npm run tailwind
```
5. Maak een .env bestand aan in de root van de repository
6. Voeg de volgende variabelen toe aan het .env 
Vul bovenstaande variables in met de volgende waardes:
- _KN_ISSUER_URL_: De URL van de OpenID Connect provider (Kennisnet)
- _KN_CLIENT_ID_: De client ID van de OpenID Connect provider (Kennisnet)
- _KN_CLIENT_SECRET_: De client secret van de OpenID Connect provider (Kennisnet)
- _KN_REDIRECT_URI_: De redirect URI van de OpenID Connect provider (Kennisnet)
- _SESSION_SECRET_: Een willekeurige string die gebruikt wordt voor het opslaan van de sessie
- _DB_HOST_: De host van de MySQL database
- _DB_USER_: De gebruikersnaam van de MySQL database
- _DB_NAME_: De naam van de MySQL database

7. Start de server
```bash
npm run dev
```

## Technische aspecten
Voor dit project is gebruik gemaakt van de volgende technische aspecten:
- Node.js
- Express
- MySQL
- Tailwind CSS
- EJS
- Git
- OpenID Connect

### Authenticatie
Authenticatie gaat op dit moment via Kennisnet (Entree Federatie). Dit zorgt ervoor dat je op een vertrouwde manier kan inloggen bij opentime, met je schoolaccount. Op dit moment is het alleen mogelijk om in te loggen met een schoolaccount van mboRijnland.
Voor authenticatie maken we gebruik van OpenID Connect. Dit protocol zorgt ervoor dat authenticatie veilig verloopt. Het protocol is gebaseerd op oAuth2.

### Database
Voor de database maken we gebruik van MySQL. De database is op dit moment nog niet volledig, maar er is al wel een begin gemaakt. De database bestaat uit de volgende tabellen:
- students
- teachers
- timetable
- absences

In verband met een deadline voor dit project zijn we er niet aan toegekomen het project volledig af te maken. De database is dus nog niet volledig. De volgende tabellen moeten nog worden toegevoegd:
- subjects
- results

### Front-end
Voor de front-end maken we gebruik van EJS. Dit is een template engine voor Node.js. EJS zorgt ervoor dat we dynamische pagina's kunnen maken. De front-end is op dit moment nog niet volledig, maar er is al wel een begin gemaakt. De volgende pagina's zijn al gemaakt:
- Homepagina (Dashboard)
- Roosterpagina

De volgende pagina's zijn op dit moment nog statisch, en moeten nog dynamisch worden gemaakt:
- Resultatenpagina
- Afwezigheidspagina

Pagina's voor docenten zijn nog niet beschikbaar en zullen later worden toegevoegd.

#### Tailwind CSS
Voor dit project, met een klein tijdsbestek hebben we ervoor gekozen om gebruik te maken van Tailwind CSS. Tailwind CSS is een CSS framework dat het mogelijk maakt om snel en eenvoudig een website te maken. Tailwind CSS is een utility-first CSS framework. Dit betekent dat je geen CSS classes hoeft te schrijven, maar dat je gebruik maakt van de classes die Tailwind CSS al heeft. Dit zorgt ervoor dat je snel en eenvoudig een website kan maken, zonder dat je veel CSS hoeft te schrijven. Dit hebben wij gebruikt in combinatie met de library [Preline](https://github.com/htmlstreamofficial/preline). Preline bevat al een aantal componenten die wij konden gebruiken voor dit project. Dit zorgde ervoor dat we snel en eenvoudig een goed uitziende front-end konden maken.

## Toekomst
Op dit moment is het project nog niet volledig af. Er zijn nog een aantal dingen die nog moeten worden toegevoegd. Eventueel zal dit project in de toekomst volledig worden afgerond.

## Bijdragen
Dit project is open source. Dit betekent dat iedereen kan bijdragen aan dit project. Als je wilt bijdragen aan dit project, maak dan een pull request aan op GitHub. Als je een bug tegenkomt, maak dan een issue aan op GitHub.

## Licentie
Dit project is gelicenseerd onder de BSD-3-Clause licentie. Zie het bestand [LICENSE](./LICENSE) voor meer informatie.

## Credits
- [Sven Jensen](https://www.github.com/sjensen19) - Programmeur Front-end & Back-end
- [Rick Dortland](https://www.github.com/RickDortland) - Projectleider & Assistent Programmeur
- [Djojo van der Eerden](https://www.github.com/DjojovdEerden) - Documentatie & Assistent Programmeur

## Special thanks
- [mboRijnland](https://www.mborijnland.nl) - Voor het mogelijk maken van dit project
- [Kennisnet](https://www.kennisnet.nl) - Voor het mogelijk maken van authenticatie via Entree Federatie
- [HTMLstream](https://htmlstream.com) - Voor het mogelijk maken van de library Preline

## Contact
Als je vragen of opmerkingen hebt met betrekking tot dit project, neem dan contact op met:
- [Sven Jensen](https://www.github.com/sjensen19) (sven.jensen@cbdevelopment.nl)