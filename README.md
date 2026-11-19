# Mina känslor

En fristående, mobilanpassad webbapp för ungdomar som vill utforska och sätta ord på sina känslor.

## Funktioner (version 1.1)

- Fem frivilliga övningar med korta instruktioner.
- Färgval, flerval av känslor och klickbar kroppsfigur.
- Automatiskt sparade svar i **IndexedDB på användarens egen enhet**.
- Frivillig delning med telefonens delningsfunktion eller kopierad text.
- Krypterad säkerhetskopia och återställning med eget lösenord.
- PWA-installation och offline-stöd när nödvändiga filer har laddats in.

Ingen inloggning och ingen serverdatabas för personliga svar. Koden är offentlig, men användarnas privata svar ska aldrig läggas i repositoryt.

## GitHub Pages

Publicera från `main` och `/(root)` under **Settings → Pages → Build and deployment**. Webbplatsen får adressen:

https://petehornell.github.io/mina-kanslor/

Projektet är ren HTML/CSS/JavaScript och behöver ingen buildprocess.

## Vid byte från Netlify

Lokal webbläsarlagring hör till en specifik webbplatsadress. Sparade svar på Netlify flyttas inte automatiskt till GitHub Pages. Skapa först en krypterad säkerhetskopia på den gamla adressen och återställ den därefter på den nya. Kontrollera att svaren har följt med före radering av den gamla appen.

## Integritet och säkerhet

- Den som har tillgång till en upplåst telefon kan eventuellt läsa lokala svar. Detta är inte en ersättning för enhetens skärmlås.
- Delning sker enbart när användaren själv väljer det; mottagarappen kan därefter spara den delade texten.
- Rensning av webbläsardata eller byte av enhet kan ta bort svar. Gör säkerhetskopior vid behov.
- Ingen spårning eller extern analysskript ingår.
- Appen är inte en vårdtjänst och kan inte ersätta professionellt stöd.

## Om materialet

Övningarna är fristående digitala bearbetningar inspirerade av teman i Region Västernorrlands arbetsmaterial *Känslor för dig som ung*. Projektet är inte officiellt kopplat till regionen. Använd inte originalbilder eller längre textpartier från materialet utan att kontrollera rättigheterna först.

## Status

Tidig testversion. Funktioner och tillgänglighet behöver testas på olika telefoner innan bred användning.
