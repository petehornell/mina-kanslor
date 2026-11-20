/* Mina känslor – frivilliga exempel för ungdomar och fristående vuxendel.
   Personliga svar hanteras av app.js och sparas endast lokalt. */
'use strict';
const MinaGuides = (() => {
  const examples = {
    colors: 'En person kan välja gult för glädje och grått för oro. En annan skulle välja helt andra färger. Det är dina egna associationer som räknas.',
    hidden: 'Ibland märks irritation utåt trots att man känner sig ledsen, besviken eller nervös på insidan. Men det kan se helt annorlunda ut för dig.',
    body: 'Någon kan märka oro som pirr i magen, en annan som spända axlar eller snabb puls. Andra känner ingen tydlig plats alls. Pröva att markera din egen upplevelse.',
    support: 'Det kan vara lättare att berätta om den vuxna först lyssnar utan att avbryta. För någon annan är det bättre att prata under en promenad.',
    calm: 'Vissa tycker om musik eller att gå ut en stund. Andra blir lugnare av att prata, rita eller bara få vara ifred. Du kan testa olika saker.',
    battery: 'En skoldag med många intryck kan ta energi, medan en stund med en kompis eller en lugn kväll kan ge energi. Det kan vara tvärtom för dig.',
    triangle: 'Exempel: En kompis svarar inte. Jag tänker ”hen är sur på mig”, känner oro och skickar flera meddelanden. Sen visar det sig att mobilen var avstängd.',
    clash: 'Du kan till exempel vara glad över att bli uttagen till en match och samtidigt nervös för att spela. Två känslor kan finnas samtidigt.',
    anger: 'En person märker ilska genom att käkarna spänns. En annan börjar prata fortare eller vill gå undan. Tidiga signaler kan ge en chans att välja vad man gör.',
    tools: 'För någon hjälper en kort promenad. För en annan fungerar musik, ett samtal eller att få göra något praktiskt. Det är okej att ett knep inte fungerar.',
    intensity: 'Nervositet kan börja som lite pirr och sedan växa inför en redovisning. I en annan situation kan samma känsla komma nästan direkt.',
    friend: 'Till en kompis kanske du skulle säga: ”Det där var jobbigt, men ett misstag betyder inte att du är dålig.” Skulle du säga något liknande till dig själv?',
    social: 'Ett flöde kan både ge roliga idéer och göra att man jämför sig med andra. Du kan tycka om en app och ändå vilja ta pauser från den.',
    thoughts: 'Tanken ”Alla tycker att jag gjorde bort mig” kan kännas sann, men det kan finnas fler förklaringar. Vad vet du egentligen, och vad gissar du?',
    situation: 'Exempel: Jag fick en kommentar på lektionen, blev generad och svarade kort. När jag blev lugnare märkte jag att jag mest var rädd att andra skulle skratta.',
    identity: 'En styrka kan vara att kunna lyssna, få andra att skratta eller fortsätta försöka. Det måste inte handla om betyg eller prestationer.',
    plan: 'Någon märker att hen börjar må sämre när sömnen förändras och vill då kunna säga till en trygg vuxen: ”Jag behöver att du lyssnar lite.”'
  };
  const fieldExamples = {
    colors_note: '”Blått får mig att tänka på ett lugnt hav.” Det går lika bra med en annan färg eller förklaring.',
    hidden_out: '”Andra kan tro att jag är arg eftersom jag blir tyst och kort i tonen.”',
    hidden_inside: '”Ibland är jag egentligen ledsen eller orolig, fast det inte syns.”',
    hidden_situation: '”När jag har gjort ett misstag framför andra har jag svårt att visa att jag skäms.”',
    support_person: '”En tränare, lärare eller vuxen hemma som lyssnar lugnt.” Du behöver inte skriva ett namn.',
    support_hard: '”Jag är rädd att någon ska bli arg eller börja ställa många frågor direkt.”',
    support_adult: '”Börja med att lyssna, fråga om jag vill prata nu och låt mig tänka färdigt.”',
    calm_note: '”Musik fungerade lite. Jag skulle kanske vilja prova att gå ut också.”',
    energy_up: '”En stund med vänner eller att göra något jag tycker om.”',
    energy_down: '”Många saker samtidigt eller när jag inte hunnit vila.”',
    energy_try: '”Jag kan prova att lägga in en lugn stund efter skolan.”',
    triangle_before: '”Jag kom in i klassrummet och hörde två andra skratta.”',
    triangle_thought: '”Jag tänkte att de skrattade åt mig, fast jag inte visste säkert.”',
    triangle_feeling: '”Jag blev osäker och lite arg.”',
    triangle_action: '”Jag satte mig för mig själv.”',
    triangle_after: '”Sen kom en av dem och frågade om jag ville hänga med.”',
    clash_when: '”När jag ska träffa någon jag saknat kan jag bli både glad och nervös.”',
    clash_need: '”Lite tid, eller någon som inte pressar mig att bestämma direkt.”',
    anger_start: '”Det händer när jag känner mig orättvist behandlad.”',
    anger_body: '”Jag märker att jag knyter händerna och pratar fortare.”',
    anger_help: '”Jag skulle kunna säga att jag behöver en kort paus.”',
    anger_words: '”Jag vill att någon ska lyssna på varför jag blev arg.”',
    tools_own: '”Jag gillar att kasta boll mot en vägg en stund.”',
    tools_result: '”Det hjälpte lite, men jag behövde också prata efteråt.”',
    intensity_early: '”Jag blir lite varm i ansiktet innan jag märker ilskan tydligt.”',
    intensity_option: '”Jag kan prova att gå undan och återkomma när jag är lugnare.”',
    friend_help: '”Det blev inte som du hoppats, men du får försöka igen.”',
    friend_self: '”Ibland tänker jag att jag borde ha klarat det bättre.”',
    friend_change: '”Jag vill prova att prata mindre hårt med mig själv.”',
    social_good: '”Jag gillar roliga klipp och att få kontakt med vänner.”',
    social_hard: '”Det känns jobbigt när jag jämför mig med någon som verkar ha allt perfekt.”',
    social_choice: '”Jag vill lägga mer tid på sådant som faktiskt gör mig glad.”',
    thoughts_original: '”Ingen tycker om mig.”',
    thoughts_facts: '”Jag vet att en kompis inte kunde träffas i dag.”',
    thoughts_other: '”Hen kan ha haft andra planer. Jag vet ännu inte varför.”',
    thoughts_friend: '”Jag skulle inte tro att det bevisar att alla ogillar min vän.”',
    thoughts_helpful: '”Jag vet inte varför det blev så, och jag kan fråga senare.”',
    situation_before: '”Vi skulle börja en gruppuppgift.”',
    situation_thought: '”Jag trodde att ingen ville jobba med mig.”',
    situation_feeling: '”Jag blev ledsen och kände tryck i bröstet.”',
    situation_action: '”Jag sa ingenting.”',
    situation_after: '”En klasskompis frågade om jag ville vara med.”',
    situation_next: '”Jag kanske kan fråga själv nästa gång.”',
    identity_good: '”Jag försöker vara en bra vän.”',
    identity_enjoy: '”Jag gillar att spela, rita eller vara ute.”',
    identity_people: '”Någon som lyssnar och bryr sig om mig.”',
    identity_wish: '”Jag hoppas våga prova något nytt.”',
    identity_need: '”Sömn, tid för mig själv och någon att prata med.”',
    plan_signals: '”Jag vill oftare vara för mig själv och blir lättirriterad.”',
    plan_help: '”En promenad, sömn eller att göra något tillsammans med någon.”',
    plan_people: '”En vuxen hemma eller någon i skolan.”',
    plan_ask: '”Jag kan skicka ett kort meddelande om det känns svårt att prata.”',
    plan_next: '”Jag behöver inte klara allting ensam.”'
  };
  function pageHint(id,escape,open){
    if(!examples[id])return '';
    return `<div class="example-wrap"><button type="button" class="example-toggle" data-example="${escape(id)}" aria-expanded="${open}">${open?'Dölj exempel':'💡 Visa ett exempel'}</button>${open?`<div class="example-content"><strong>Ett möjligt exempel, inte ett facit:</strong><p>${escape(examples[id])}</p><span>Din upplevelse kan vara helt annorlunda.</span></div>`:''}</div>`;
  }
  function inlineHint(key,escape,open){
    const sample=key.startsWith('body_desc_')?'”När jag är nervös pirrar det ibland i magen, men vid andra tillfällen känner jag inget särskilt.”':fieldExamples[key];
    if(!sample)return '';
    return `<div class="field-example"><button type="button" class="example-toggle small" data-example="${escape(key)}" aria-expanded="${open}">${open?'Dölj skrivexempel':'💡 Behöver du ett exempel?'}</button>${open?`<div class="example-content"><strong>Exempel, inte ett förslag på vad du ska svara:</strong><p>${escape(sample)}</p></div>`:''}</div>`;
  }
  const parentTopics=[
    {id:'adult-words',section:1,title:'Hjälp att sätta ord på känslor',icon:'🎨',sub:'Fråga, lyssna och låt ungdomen bestämma orden.',
      intro:'För en del ungdomar är det lättare att börja med en färg, en känsloskala eller var något känns i kroppen än med en direkt fråga om hur de mår.',
      points:['Använd öppna frågor och var nyfiken på ungdomens egna ord.','Fråga om din gissning stämmer i stället för att bestämma känslan åt någon.','Det är okej att ungdomen inte vet eller inte vill svara just nu.'],
      scenario:['När ungdomen säger ”vet inte”','”Det är okej. Vill du visa med en färg, på en skala eller bara låta det vara en stund?”'],
      prompts:[['try','Vilket sätt att prata om känslor skulle kunna fungera hos oss?'],['listen','Vad vill jag komma ihåg nästa gång mitt barn säger ”vet inte”?']]},
    {id:'adult-calm',section:1,title:'Mina egna starka känslor',icon:'🌊',sub:'Behålla lugnet utan att förneka det man känner.',
      intro:'Vuxnas tonfall, tempo och kroppsspråk påverkar samspelet. Det går att vara tydlig och sätta gränser utan att höja konfliktnivån.',
      points:['Lägg märke till din egen kropp och röst innan du svarar.','Säg att du behöver en kort paus om du märker att du håller på att tappa lugnet.','Kom tillbaka och ta ansvar för din del av samtalet.'],
      scenario:['När du själv blir arg','”Jag märker att jag blir för upprörd för att prata bra just nu. Jag tar en kort paus och kommer tillbaka.”'],
      prompts:[['signals','Vad märker jag först när jag själv blir stressad eller arg?'],['pause','Vad hjälper mig att behålla lugnet?']]},
    {id:'adult-talk',section:1,title:'Hitta prattid',icon:'💬',sub:'Kontakt som inte bara handlar om problem och måsten.',
      intro:'Lättare samtal om vardag och intressen kan göra det enklare att ta upp något svårt senare. Alla ungdomar vill inte prata i soffan öga mot öga.',
      points:['Visa intresse för sådant ungdomen själv tycker om.','Välj gärna naturliga stunder utan förhörskänsla.','Pressa inte fram långa samtal. Kontakten kan byggas i små steg.'],
      scenario:['När samtal blir ett förhör','”Jag är nyfiken på vad du gillar med det där spelet. Vill du visa?”'],
      prompts:[['when','När brukar samtal fungera bäst hos oss?'],['interest','Vad skulle jag kunna fråga om som inte handlar om prestation eller problem?']]},
    {id:'adult-validate',section:1,title:'Bekräfta innan du löser',icon:'🤝',sub:'Visa att du tar upplevelsen på allvar.',
      intro:'Bekräfta känslan utan att nödvändigtvis godkänna allt beteende. Ibland är det viktigare att först bli lyssnad på än att direkt få lösningar.',
      points:['Börja med att lyssna och sätt försiktigt ord på det du tror att du hör.','Fråga vad ungdomen behöver i stunden.','Problemlösning och gränser kan komma efter att ni fått kontakt.'],
      scenario:['När något gick dåligt','”Jag hör att du blev riktigt besviken. Vill du att jag bara lyssnar, eller ska vi fundera på vad du kan göra?”'],
      prompts:[['habit','När går jag för snabbt till råd eller lösningar?'],['change','Vad vill jag prova att säga i stället?']]},
    {id:'adult-stress',section:2,title:'Krav, stress och återhämtning',icon:'🔋',sub:'Förstå vad som belastar och vad som hjälper.',
      intro:'Sömn, mat, rörelse, återhämtning, rutiner och sociala krav kan påverka hur lätt det är att hantera starka känslor.',
      points:['Undersök både uttalade och outtalade förväntningar.','Tydliga rutiner kan avlasta, men de behöver vara rimliga.','Bjud in ungdomen att påverka hur vardagen fungerar.'],
      scenario:['När mycket måste hinnas med','”Vi har många saker just nu. Vad känns viktigast, och vad kan vi förenkla?”'],
      prompts:[['stress','Vilka krav eller situationer kan vara särskilt belastande just nu?'],['change','Vad skulle vi kunna förenkla eller göra mer förutsägbart?']]},
    {id:'adult-conflict',section:2,title:'När ni hamnar i konflikt',icon:'🌩️',sub:'Minska upptrappning och reparera efteråt.',
      intro:'Familjer blir oense. Det viktiga är inte att aldrig bli arg utan hur ni hanterar situationen och hittar tillbaka till varandra.',
      points:['Försök undvika diskussioner när båda är som mest upprörda.','Beskriv det som hände utan att kalla ungdomen för exempelvis lat eller jobbig.','Be om ursäkt för din del om du blev för hård.'],
      scenario:['Efter ett bråk','”Jag höjde rösten tidigare och det blev inte bra. Förlåt. Kan vi prata om hur vi gör nästa gång?”'],
      prompts:[['trigger','Vilka situationer brukar bli laddade hemma?'],['repair','Hur kan jag bidra till att vi hittar tillbaka efter ett bråk?']]},
    {id:'adult-selfesteem',section:3,title:'Stärk självkänslan',icon:'🌱',sub:'Visa uppskattning bortom resultat och prestation.',
      intro:'Ungdomar behöver känna att de är betydelsefulla även när något går dåligt. Vardagliga handlingar kan bidra till tillhörighet och trygghet.',
      points:['Lägg märke till omtanke, nyfikenhet och ansträngning – inte bara resultat.','Låt ungdomen få försöka själv och finnas till hands som stöd.','Undvik jämförelser med syskon eller andra ungdomar.'],
      scenario:['När något inte blev som planerat','”Jag tycker om att vara med dig oavsett hur det gick. Vill du berätta hur det kändes?”'],
      prompts:[['notice','Vilka egenskaper hos mitt barn vill jag uppmärksamma mer?'],['time','Vilken vardaglig stund vill jag prioritera tillsammans?']]},
    {id:'adult-online',section:3,title:'Sociala medier och livet på nätet',icon:'📱',sub:'Nyfikenhet och trygghet i stället för enbart kontroll.',
      intro:'Det som händer på nätet kan påverka vänskap, självkänsla och känslor. Att kunna berätta om något obehagligt utan att genast bli dömd är viktigt.',
      points:['Visa intresse för vad ungdomen faktiskt gör och tycker om online.','Prata om gränser, samtycke och hur man kan lämna eller blockera en kontakt.','Om något jobbigt händer: lyssna och lägg inte ansvaret på den som blivit utsatt.'],
      scenario:['När ungdomen berättar om något jobbigt online','”Tack för att du berättar. Jag vill förstå vad som hände. Vi kan fundera tillsammans på nästa steg.”'],
      prompts:[['curious','Vad skulle jag kunna fråga om på ett nyfiket sätt?'],['safe','Hur kan jag visa att det går att berätta något jobbigt utan att bli skuldbelagd?']]},
    {id:'adult-team',section:3,title:'När viktiga vuxna tänker olika',icon:'🧭',sub:'Samarbeta utan att ungdomen hamnar mitt emellan.',
      intro:'Vuxna kan vara olika bra på olika saker och se situationer på olika sätt. Försök hitta ett stöd som utgår från ungdomens behov.',
      points:['Prata vuxna emellan om meningsskiljaktigheter när det går.','Respektera att ungdomen kan vilja prata om olika frågor med olika vuxna.','Bestäm vad som behöver vara gemensamt och var det finns utrymme för olikheter.'],
      scenario:['När två vuxna gör på olika sätt','”Vi vuxna behöver prata ihop oss om det här. Du behöver inte lösa vår oenighet.”'],
      prompts:[['strengths','Vilka styrkor har de viktiga vuxna runt ungdomen?'],['coordination','Vad behöver vi samordna för att skapa mer trygghet?']]}
  ];
  const adultMap=Object.fromEntries(parentTopics.map(p=>[p.id,p]));
  const adultLabels=Object.fromEntries(parentTopics.flatMap(t=>t.prompts.map(([k,label])=>['adult_'+t.id+'_'+k,label])));
  const groupNames={1:'Förstå känslor',2:'Hantera känslor',3:'Arbeta vidare'};
  function parentHome(ctx){
    const n=parentTopics.filter(t=>t.prompts.some(([k])=>ctx.field('adult_'+t.id+'_'+k))).length;
    return `<div class="hero adult-hero"><div class="eyebrow">FÖR FÖRÄLDRAR OCH ANDRA VIKTIGA VUXNA</div><h1>Stöd som gör skillnad</h1><p>Här finns kunskap, vardagliga exempel och frågor för dig som vill bli bättre på att möta en ungdoms känslor.</p><button class="btn" data-action="parent-guides">Utforska vuxendelen</button></div>
      <div class="card"><h2>Tre saker att börja med</h2><div class="parent-simple-steps"><p><strong>1. Lyssna först.</strong> Försök förstå innan du kommer med lösningar.</p><p><strong>2. Var tydlig och lugn.</strong> Alla känslor får finnas, men alla beteenden är inte okej.</p><p><strong>3. Visa intresse även när allt är bra.</strong> Samtal behöver inte alltid handla om problem.</p></div></div>
      <div class="grid"><button class="tile" data-action="parent-guides"><span class="emoji">📚</span><strong>Guider och övningar</strong><small>9 korta avsnitt</small></button><button class="tile" data-action="parent-answers"><span class="emoji">📝</span><strong>Mina anteckningar</strong><small>${n} avsnitt påbörjade</small></button></div>
      <div class="notice"><strong>Privata svar:</strong> Vuxendelen hämtar inte en ungdoms svar. Använd gärna din egen telefon. På en delad enhet är valet av vy inte ett lösenordsskydd.</div>`;
  }
  function parentGuides(ctx){
    let h=ctx.intro('Föräldradelen','Konkreta råd, samtalsexempel och egna reflektionsfrågor. Du behöver inte göra allt i ordning.','FÖR VIKTIGA VUXNA');
    for(let n=1;n<=3;n++){
      h+=`<div class="section-head"><span class="section-n">DEL ${n}</span><h2>${groupNames[n]}</h2></div>`;
      h+=parentTopics.filter(t=>t.section===n).map(t=>`<button class="tile wide exercise-item" data-action="${t.id}"><span class="emoji">${t.icon}</span><strong>${ctx.esc(t.title)}</strong><small>${ctx.esc(t.sub)}</small></button>`).join('');
    }
    return h;
  }
  function parentTopic(id,ctx){
    const t=adultMap[id];if(!t)return '';
    let h=ctx.intro(t.title,t.sub,'VUXEN · DEL '+t.section);
    h+=`<div class="card"><p>${ctx.esc(t.intro)}</p><h3>Att tänka på</h3><ul class="parent-points">${t.points.map(point=>`<li>${ctx.esc(point)}</li>`).join('')}</ul></div>`;
    h+=`<div class="example-content parent-dialogue"><strong>Exempel i vardagen: ${ctx.esc(t.scenario[0])}</strong><p>${ctx.esc(t.scenario[1])}</p><small>Det här är ett möjligt sätt att börja, inte en replik som passar alla.</small></div>`;
    h+=`<h2>Fundera själv</h2><p class="muted small">Du kan skriva egna anteckningar. De sparas lokalt på den här enheten.</p>`;
    for(const [key,label] of t.prompts)h+=ctx.textArea('adult_'+id+'_'+key,label);
    h+=ctx.status()+`<div class="actions"><button class="btn secondary" data-action="parent-guides">Till alla guider</button><button class="btn secondary" data-action="parent-answers">Mina anteckningar</button></div>`;
    return h;
  }
  function parentAnswers(ctx){
    let h=ctx.intro('Mina anteckningar','Det här är endast det du själv skrivit i vuxendelen.','LOKALT PÅ DIN ENHET');
    let found=0;
    for(const t of parentTopics){
      const entries=t.prompts.map(([k,label])=>[label,ctx.field('adult_'+t.id+'_'+k)]).filter(([_,v])=>typeof v==='string'&&v.trim());
      if(!entries.length)continue;found++;
      h+=`<div class="card"><h3>${t.icon} ${ctx.esc(t.title)}</h3>${entries.map(([label,v])=>`<p class="small"><strong>${ctx.esc(label)}</strong></p><div class="answer">${ctx.esc(v)}</div>`).join('')}<div class="actions"><button class="btn secondary" data-action="${t.id}">Ändra anteckningar</button></div></div>`;
    }
    if(!found)h+=`<div class="card"><p>Här syns dina egna reflektioner när du har skrivit i en guide.</p><button class="btn" data-action="parent-guides">Öppna guiderna</button></div>`;
    h+=`<div class="notice">Den här vyn visar inte ungdomars svar. En delad telefon eller surfplatta är däremot ingen säker separation mellan olika användare.</div>`;
    return h;
  }
  return {pageHint,inlineHint,parentTopics,adultMap,adultLabels,parentHome,parentGuides,parentTopic,parentAnswers};
})();