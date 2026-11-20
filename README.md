# Mina känslor

En fristående, mobilanpassad webbapp för **ungdomar och deras viktiga vuxna**. **Version 2.3** har två valbara vyer:

- **Ungdom:** 17 övningar i tre delar, med frivilliga, fiktiva exempel på känslor och svar. Exemplen är inte facit och fyller inte i några användarsvar.
- **Vuxen/förälder:** 9 korta guider med samtalsexempel och reflektionsfrågor, med lokala anteckningar åtskilda i gränssnittet från ungdomens övningar.

Ungdomens 17 övningar:
1. Förstå känslor (inklusive en detaljerad kroppskarta med framsida/baksida och egna markeringar)
2. Hantera känslor
3. Arbeta vidare

Appen är en egen bearbetning av teman i Region Västernorrlands arbetshäfte *Känslor för dig som ung* och är inte en officiell vårdtjänst. Forskning om kroppsliga känsloupplevelser: Nummenmaa m.fl. (2014), *Bodily maps of emotions*, PNAS, doi:10.1073/pnas.1321664111. Kroppskartan i denna app är en användarstyrd reflektionsövning, **inte** en medicinsk eller psykologisk tolkning.

## Publicering
Statisk webbapp som publiceras via GitHub Actions och GitHub Pages:
https://petehornell.github.io/mina-kanslor/

Push till `main` startar en publicering enligt `.github/workflows/deploy-pages.yml`.

## Privata svar och säkerhetskopior
- Användarnas svar sparas **endast på deras enhet**, i webbläsarens IndexedDB (`mina-kanslor`, object store `answers`). Både ungdomssvar, vuxenanteckningar och val av vy ligger i samma lokala databas om de använder samma webbläsarprofil.
- Ingen inloggning, serverdatabas, analysmätning eller automatiserad delning. **Vyvalet är ingen åtkomstkontroll:** den som kan använda en olåst enhet kan växla till ungdomsvyn och se lokala svar där. Använd helst separata enheter.
- Lokala svar är **inte krypterade i webbläsarens lagring**. En annan person med tillgång till enheten och webbläsarprofilen kan eventuellt läsa dem.
- Säkerhetskopior och funktionen ”Radera alla svar” omfattar samtliga sparade svar på den aktuella enheten, inklusive vuxenanteckningar.
- Endast exporterade säkerhetskopior krypteras med AES-GCM och lösenordsbaserad nyckelhärledning (PBKDF2).
- Säkerhetskopior krävs för att flytta svar mellan enheter eller webbplatser; browserdata följer inte med när man byter domän.
- Installera gärna som PWA för offlineanvändning. Testa säkerhetskopiering och återställning innan du förlitar dig på dem.
- Spara **aldrig** användarsvar, säkerhetskopior, hälsouppgifter eller lösenord i detta publika repository.

## Förvaltning
Frontend: `index.html`, `style.css`, `app.js`, `features.js`, `guides.js`, `manifest.webmanifest`, `sw.js` och `icon.svg`.

Vid nytt frontendinnehåll, uppdatera även cacheversionen i `sw.js` och respektive versionsparameter i `index.html`.

Materialet är avsett för reflektion och stödjande samtal. Vid akut fara ring 112.