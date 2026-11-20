# Mina känslor

En fristående, mobilanpassad arbetsbok för ungdomar. **Version 2** har 17 övningar i tre delar:
1. Förstå känslor (inklusive en detaljerad kroppskarta med framsida/baksida och egna markeringar)
2. Hantera känslor
3. Arbeta vidare

Appen är en egen bearbetning av teman i Region Västernorrlands arbetshäfte *Känslor för dig som ung* och är inte en officiell vårdtjänst. Forskning om kroppsliga känsloupplevelser: Nummenmaa m.fl. (2014), *Bodily maps of emotions*, PNAS, doi:10.1073/pnas.1321664111. Kroppskartan i denna app är en användarstyrd reflektionsövning, **inte** en medicinsk eller psykologisk tolkning.

## Publicering
Statisk webbapp som publiceras via GitHub Actions och GitHub Pages:
https://petehornell.github.io/mina-kanslor/

Push till `main` startar en publicering enligt `.github/workflows/deploy-pages.yml`.

## Privata svar och säkerhetskopior
- Användarnas svar sparas **endast på deras enhet**, i webbläsarens IndexedDB (`mina-kanslor`, object store `answers`).
- Ingen inloggning, databas, analysmätning eller automatiserad delning.
- Lokala svar är **inte krypterade i webbläsarens lagring**. En annan person med tillgång till enheten och webbläsarprofilen kan eventuellt läsa dem.
- Endast exporterade säkerhetskopior krypteras med AES-GCM och lösenordsbaserad nyckelhärledning (PBKDF2).
- Säkerhetskopior krävs för att flytta svar mellan enheter eller webbplatser; browserdata följer inte med när man byter domän.
- Installera gärna som PWA för offlineanvändning. Testa säkerhetskopiering och återställning innan du förlitar dig på dem.
- Spara **aldrig** användarsvar, säkerhetskopior, hälsouppgifter eller lösenord i detta publika repository.

## Förvaltning
Frontend: `index.html`, `style.css`, `app.js`, `features.js`, `manifest.webmanifest`, `sw.js` och `icon.svg`.

Vid nytt frontendinnehåll, uppdatera även cacheversionen i `sw.js` och respektive versionsparameter i `index.html`.

Materialet är avsett för reflektion och stödjande samtal. Vid akut fara ring 112.