/* Mina känslor – interaktiva fördjupningar. Ingen nätverkstrafik eller datainsamling. */
'use strict';
const MinaFeatures = (() => {
  const extra = [
    {id:'battery',section:2,title:'Mitt batteri',emoji:'🔋',sub:'Vad ger mig energi, och vad tar energi?',duration:'5–10 min'},
    {id:'triangle',section:2,title:'Tankar, känslor och handlingar',emoji:'🔁',sub:'Förstå vad som hände – utan att döma.',duration:'5–10 min'},
    {id:'clash',section:2,title:'När känslor krockar',emoji:'🌦️',sub:'Det går att känna flera saker samtidigt.',duration:'5 min'},
    {id:'anger',section:2,title:'När ilskan växer',emoji:'🌋',sub:'Upptäck tidiga signaler och möjliga val.',duration:'5–10 min'},
    {id:'tools',section:2,title:'Min verktygslåda',emoji:'🧰',sub:'Testa aktiviteter som kan hjälpa i olika lägen.',duration:'5 min'},
    {id:'intensity',section:2,title:'Känslors styrka och fart',emoji:'📈',sub:'Hur snabbt kommer känslan och hur stark blir den?',duration:'5–10 min'},
    {id:'friend',section:3,title:'Som jag är mot en vän',emoji:'💛',sub:'Öva på att vara lika vänlig mot dig själv.',duration:'5–10 min'},
    {id:'social',section:3,title:'Jag och sociala medier',emoji:'📱',sub:'Vad får mig att må bra eller dåligt på nätet?',duration:'5–10 min'},
    {id:'thoughts',section:3,title:'När tankarna fastnar',emoji:'🧠',sub:'Utforska alternativa sätt att se på en situation.',duration:'5–10 min'},
    {id:'situation',section:3,title:'Förstå en situation',emoji:'🧩',sub:'Vad hände före, under och efter?',duration:'5–10 min'},
    {id:'identity',section:3,title:'Det här är jag',emoji:'🌱',sub:'Mina styrkor, det jag gillar och mina förhoppningar.',duration:'5–10 min'},
    {id:'plan',section:3,title:'Min plan framåt',emoji:'🧭',sub:'Vad hjälper mig, och vem kan jag vända mig till?',duration:'5–10 min'}
  ];
  const emotionList=['Glad','Ledsen','Arg','Rädd','Orolig','Lugn','Nyfiken','Skamsen','Förvånad','Irriterad','Besviken','Stolt','Ensam','Lättad','Förvirrad'];
  const form = {
    battery: {intro:'Sömn, mat, rörelse, vila och gemenskap kan påverka hur vi orkar. Vad märker du själv?',prompts:[
      ['energy_up','Vad brukar ge dig energi?','Skriv eller hoppa över.'],
      ['energy_down','Vad brukar göra dig trött eller stressad?'],
      ['energy_try','En liten sak jag vill prova för att må bättre']
    ], choices:[['battery_choices','Saker jag kan behöva mer av',['Sömn','Matpauser','Vara ute','Rörelse','Återhämtning','Tid med vänner','Egen tid','Prata med någon']]]},
    triangle:{intro:'Välj gärna en vardaglig händelse. Försök skilja på vad du tänkte, kände och gjorde.',prompts:[
      ['triangle_before','Vad hände först?'],['triangle_thought','Vad tänkte du just då?'],['triangle_feeling','Vilka känslor märkte du?'],['triangle_action','Vad gjorde du sedan?'],['triangle_after','Vad hände efteråt?']
    ]},
    clash:{intro:'Att känna två olika saker samtidigt är vanligt. Här finns inget facit.',choices:[['clash_feelings','Vilka känslor kan krocka för dig?',emotionList]],prompts:[
      ['clash_when','När har det hänt, eller när skulle det kunna hända?'],['clash_need','Vad skulle du behöva i en sådan stund?']
    ]},
    anger:{intro:'Ilska kan vara en signal om att något känns fel. Vi får känna ilska – men kan behöva välja vad vi gör med den.',prompts:[
      ['anger_start','Vad brukar hända precis innan du blir arg?'],['anger_body','Hur märker du att ilskan börjar öka?'],['anger_help','Vad skulle kunna hjälpa innan den blir väldigt stark?'],['anger_words','Vad vill du att andra ska förstå när du är arg?']
    ]},
    tools:{intro:'Välj sådant du själv vill testa. Alla knep passar inte alla, och du behöver inte tvinga fram lugn.',choices:[
      ['tools_move','När jag behöver röra mig',['Promenera','Springa en stund','Dansa','Träna','Sträcka på kroppen','Gå ut en stund']],
      ['tools_rest','När jag vill varva ner',['Lyssna på musik','Rita','Spela ett spel','Vila','Mys med djur','Lägg märke till rummet','Prata med någon']]
    ],prompts:[['tools_own','Har du något eget knep?'],['tools_result','Vad fungerade när du testade något?']]},
    intensity:{intro:'En känsla kan komma långsamt eller väldigt snabbt. Det kan också vara olika från dag till dag.',choices:[
      ['intensity_emotion','Vilken känsla tänker du på?',emotionList],
      ['intensity_speed','Hur snabbt brukar den komma?',['Smyger sig på','Ganska snabbt','Nästan direkt','Olika från gång till gång']],
      ['intensity_level','Hur stark brukar den kännas?',['1 – lite','2','3 – mellan','4','5 – mycket']]
    ],prompts:[['intensity_early','Hur märker du den när den fortfarande är ganska svag?'],['intensity_option','Vad kan hjälpa om känslan blir stark?']]},
    friend:{intro:'Tänk på en vän som har en jobbig dag. Jämför sedan med hur du pratar med dig själv.',prompts:[
      ['friend_help','Vad skulle du säga till en kompis i samma situation?'],['friend_self','Vad brukar du säga till dig själv när något går fel?'],['friend_change','Finns det något från ditt första svar du vill säga till dig själv?']
    ]},
    social:{intro:'På nätet kan mycket vara roligt – och ibland jobbigt. Du behöver inte skriva om något du inte vill berätta.',choices:[['social_effects','Hur kan sociala medier kännas för dig?',['Roligt','Inspirerande','Stressigt','Ensamt','Gemenskap','Jämförelser','FOMO','Olika dagar']]],prompts:[
      ['social_good','Vad på nätet brukar få dig att må bra?'],['social_hard','Är det något som brukar göra dig osäker eller ledsen?'],['social_choice','Vad skulle du vilja göra mer eller mindre av?']
    ]},
    thoughts:{intro:'En tanke kan kännas helt sann utan att berätta hela historien. Det handlar inte om att tvinga sig att tänka positivt.',prompts:[
      ['thoughts_original','Vilken tanke fastnar du ibland i?'],['thoughts_facts','Vad vet du säkert om situationen?'],['thoughts_other','Finns det någon annan möjlig förklaring?'],['thoughts_friend','Vad skulle du tänka om en vän var i samma situation?'],['thoughts_helpful','Vilken tanke skulle kunna vara lite mer hjälpsam?']
    ]},
    situation:{intro:'Det kan vara lättare att förstå sig själv när man tittar på en situation i flera steg.',prompts:[
      ['situation_before','Vad hände före?'],['situation_thought','Vad tänkte jag?'],['situation_feeling','Vad kände jag – och var i kroppen?'],['situation_action','Vad gjorde jag?'],['situation_after','Vad hände sedan?'],['situation_next','Skulle jag vilja prova något annat nästa gång?']
    ]},
    identity:{intro:'Här finns frågor om den du är, inte om hur duktig du måste vara.',prompts:[
      ['identity_good','Något jag tycker om hos mig själv'],['identity_enjoy','Något jag gillar att göra'],['identity_people','En person som betyder mycket för mig'],['identity_wish','Något jag önskar eller hoppas på'],['identity_need','Något jag behöver för att må bra']
    ]},
    plan:{intro:'En liten personlig plan för jobbiga dagar. Du kan ändra den när du vill.',prompts:[
      ['plan_signals','Hur märker jag att jag börjar må sämre?'],['plan_help','Vad brukar hjälpa mig i sådana stunder?'],['plan_people','Vilka personer kan jag prata med?'],['plan_ask','Hur kan jag be om hjälp om det är svårt att säga högt?'],['plan_next','Vad vill jag komma ihåg framöver?']
    ]}
  };
  const labels={};
  for (const [id,f] of Object.entries(form)){
    for(const [key,label] of f.prompts||[])labels[key]=label;
    for(const [key,label] of f.choices||[])labels[key]=label;
  }
  function renderExercise(id,ctx){
    const e=extra.find(x=>x.id===id),f=form[id];if(!e||!f)return '';
    let h=ctx.intro(e.title,e.sub,'DEL '+e.section+' · '+(e.section===2?'HANTERA KÄNSLOR':'ARBETA VIDARE'));
    h+=`<div class="notice"><p>${ctx.esc(f.intro)}</p></div>`;
    for(const [k,label,options] of f.choices||[]){
      const single=['intensity_emotion','intensity_speed','intensity_level'].includes(k);
      if(single){
        h+=`<div class="card"><label for="${k}">${ctx.esc(label)}</label><select id="${k}" data-single-field="${k}"><option value="">Välj om du vill</option>${options.map(x=>`<option value="${ctx.esc(x)}" ${ctx.field(k)===x?'selected':''}>${ctx.esc(x)}</option>`).join('')}</select></div>`;
      }else h+=`<div class="card"><h3>${ctx.esc(label)}</h3>${ctx.chips(k,options)}</div>`;
    }
    for(const [k,label,placeholder] of f.prompts||[])h+=ctx.textArea(k,label,placeholder);
    return h+ctx.status()+ctx.finish(id);
  }
  const sensations=[
    {id:'pirr',label:'Pirr / kittling',color:'#d09e20'},
    {id:'spanning',label:'Spänning / knut',color:'#a75bbd'},
    {id:'tryck',label:'Tryck / tungt',color:'#4c72b5'},
    {id:'varmt',label:'Värme',color:'#e77f54'},
    {id:'kallt',label:'Kyla',color:'#36a2ad'},
    {id:'ont',label:'Obehag / ont',color:'#c95067'},
    {id:'lugn',label:'Lugn / avslappnat',color:'#439d79'},
    {id:'annat',label:'Något annat',color:'#7f8995'}
  ];
  // Punkterna på figuren är användarens egna markeringar, inte en vetenskaplig känslokarta.
  const landmarks={
    front:[['Huvud',170,53],['Ansikte',170,75],['Hals',170,110],['Axlar',126,137],['Bröst',170,171],['Övre mage',170,205],['Nedre mage',170,253],['Armar',100,206],['Händer',87,303],['Lår',145,325],['Knän',145,371],['Underben',148,408],['Fötter',148,454]],
    back:[['Bakhuvud',170,56],['Nacke',170,115],['Axlar',211,141],['Övre rygg',170,176],['Nedre rygg',170,230],['Säte',170,276],['Armar',235,225],['Händer',252,306],['Lår',195,329],['Knän',194,373],['Vader',194,415],['Fötter',194,453]]
  };
  const partsSvg = `
    <circle cx="170" cy="64" r="31"/>
    <path d="M157 94 L183 94 L190 121 L150 121Z"/>
    <path d="M148 119 Q132 120 117 130 L125 195 L129 267 Q170 285 211 267 L215 195 L223 130 Q205 121 192 119 Z"/>
    <path d="M117 131 Q107 128 101 145 L81 238 L69 281 Q67 299 77 314 Q85 321 93 310 L101 285 L130 191Z"/>
    <path d="M223 131 Q233 128 239 145 L259 238 L271 281 Q273 299 263 314 Q255 321 247 310 L239 285 L210 191Z"/>
    <path d="M130 266 L168 270 L163 389 L156 450 Q148 465 133 459 L129 450 L123 393 L119 315Z"/>
    <path d="M210 266 L172 270 L177 389 L184 450 Q192 465 207 459 L211 450 L217 393 L221 315Z"/>`;
  const bodySilhouette=`<g class="body-surface" data-body-surface="1">${partsSvg}</g><path class="body-hint" d="M134 205 Q170 215 205 205 M133 246 Q170 255 207 246 M170 121 L170 267"/>`;
  function val(ctx,key,defaultVal){return ctx.field(key)||defaultVal}
  function showBody(ctx){
    const emotion=val(ctx,'body_current','Glad');
    const side=val(ctx,'body_v2_side','front');
    const sense=val(ctx,'body_v2_sensation','pirr');
    const strength=Number(val(ctx,'body_v2_intensity','2'));
    const all=ctx.field('body_marks_'+emotion);
    const marks=Array.isArray(all)?all:[];
    const filtered=marks.filter(p=>p&&p.side===side);
    const earlier=ctx.field('body_'+emotion);
    let h=ctx.intro('Var känns känslan i kroppen?','Välj en känsla. Markera var just du brukar känna den – på framsidan eller baksidan.','DEL 1 · FÖRSTÅ KÄNSLOR');
    h+=`<div class="notice"><strong>Din kropp, dina upplevelser.</strong> Det finns inget rätt ställe. Det är också okej att inte känna något särskilt.</div>`;
    h+=`<label for="bodyEmotion">Vilken känsla vill du utforska?</label><select id="bodyEmotion">${ctx.emotions.map(x=>`<option ${emotion===x?'selected':''}>${ctx.esc(x)}</option>`).join('')}</select>`;
    h+=`<div class="card detailed-body"><div class="body-view-tabs" role="group" aria-label="Välj sida av kroppen">${[['front','Framsida'],['back','Baksida']].map(([k,t])=>`<button class="chip ${side===k?'on':''}" data-body-view="${k}" aria-pressed="${side===k}">${t}</button>`).join('')}</div>`;
    h+=`<p class="small muted">Tryck på kroppen för att sätta en prick. Varje prick visar <strong>din egen</strong> upplevelse.</p>`;
    h+=`<svg class="body-drawing" data-body-board="${side}" viewBox="40 15 260 460" role="img" aria-label="Kroppsfigur ${side==='front'?'framifrån':'bakifrån'} med ${filtered.length} markeringar. Använd även knapparna för kroppsdelar nedan."><title>Kroppsfigur – ${side==='front'?'fram':'bak'}sida</title>${bodySilhouette}${side==='back'?'<path class="body-hint" d="M170 150 L170 250 M138 175 Q170 168 202 175"/>':''}${filtered.map((p,i)=>{const item=sensations.find(s=>s.id===p.sensation)||sensations[7];const x=Math.max(60,Math.min(280,Number(p.x)||170)),y=Math.max(35,Math.min(464,Number(p.y)||150));return `<circle class="body-dot" cx="${x}" cy="${y}" r="${6+Number(p.intensity||1)*2.3}" fill="${item.color}" stroke="white" stroke-width="2.5" aria-hidden="true"/>`}).join('')}</svg>`;
    h+=`<div class="body-mark-count" aria-live="polite">${marks.length} markering${marks.length===1?'':'ar'} för ${ctx.esc(emotion)} ${marks.length?'· senast tillagd kan ångras':''}</div>`;
    h+=`<h3>Var känns det? <span class="muted small">Snabbval</span></h3><div class="body-location-buttons">${landmarks[side].map(([name,x,y])=>`<button class="chip" data-body-place="${ctx.esc(name)}" data-x="${x}" data-y="${y}">${ctx.esc(name)}</button>`).join('')}</div>`;
    h+=`<h3>Hur känns det där?</h3><div class="chiprow" role="group" aria-label="Välj kroppslig upplevelse">${sensations.map(s=>`<button class="chip sensation ${sense===s.id?'on':''}" data-body-sense="${s.id}" aria-pressed="${sense===s.id}"><span class="sense-dot" style="background:${s.color}"></span>${s.label}</button>`).join('')}</div>`;
    h+=`<h3>Hur starkt?</h3><div class="chiprow" role="group" aria-label="Välj styrka">${[[1,'Lite'],[2,'Mittemellan'],[3,'Mycket']].map(([v,label])=>`<button class="chip ${strength===v?'on':''}" data-body-strength="${v}" aria-pressed="${strength===v}">${label}</button>`).join('')}</div>`;
    h+=`<div class="actions"><button class="btn secondary" data-body-undo="1" ${marks.length?'':'disabled'}>↶ Ångra senaste</button><button class="btn ghost" data-body-clear="1" ${marks.length?'':'disabled'}>Rensa för ${ctx.esc(emotion)}</button></div>`;
    h+=`<div class="body-empty-choice"><label class="check"><input type="checkbox" data-body-none="1" ${ctx.field('body_none_'+emotion)?'checked':''}> Jag märker ingen särskild plats för den här känslan</label><p class="small muted">Du får ändra dig och markera senare.</p></div>`;
    if(Array.isArray(earlier)&&earlier.length)h+=`<div class="notice small">Tidigare markeringar från den äldre versionen: ${ctx.esc(earlier.join(', '))}. De finns kvar i dina sparade svar.</div>`;
    h+='</div>';
    h+=ctx.textArea('body_desc_'+emotion,'Vill du beskriva känslan med egna ord?')+ctx.textArea('body_note','Tidigare anteckning (valfri)')+ctx.status()+ctx.finish('body');
    return h;
  }
  function adultPage(ctx){
    return ctx.intro('För viktiga vuxna','Ett eget avsnitt med stöd för samtal. Inga privata ungdomssvar visas här.','FÖR VUXNA')+
    `<div class="card"><h3>Lyssna först</h3><p>Försök förstå vad ungdomen upplever innan du börjar föreslå lösningar. Du kan fråga: ”Vill du att jag lyssnar, pratar med dig eller hjälper dig att göra något?”</p></div>
    <div class="card"><h3>Var en trygg vuxen</h3><p>Bekräfta upplevelsen utan att behöva hålla med om allt som gjordes. Låt samtal om känslor ske också när inget särskilt har hänt.</p></div>
    <div class="card"><h3>Respektera det privata</h3><p>Övningssvaren tillhör den som skrivit dem. Fråga vad hen själv vill dela. Be inte om att få läsa allt och pressa inte fram svar.</p></div>
    <div class="card"><h3>Om någon mår dåligt</h3><p>Ta oro på allvar. Erbjud stöd från en annan trygg vuxen eller vården när det behövs. Vid omedelbar fara, ring 112. Webbappen ersätter inte vård.</p></div>
    <p class="muted small">Det här är fristående förslag till samtalsstöd, inte en återgivning av hela arbetshäftets föräldraavsnitt.</p>`;
  }
  function getEntries(id,cache){
    const keys=Object.keys(labels).filter(k=>k.startsWith(id+'_'));
    return keys.filter(k=>cache[k]!==undefined&&cache[k]!==''&&!(Array.isArray(cache[k])&&!cache[k].length))
       .map(k=>[labels[k],Array.isArray(cache[k])?cache[k].join(', '):String(cache[k])]);
  }
  function placeMark(cache,field,put,x,y){
    const emo=field('body_current')||'Glad';const key='body_marks_'+emo;
    const old=Array.isArray(cache[key])?cache[key]:[];
    const m={side:field('body_v2_side')||'front',x:Math.round(x*10)/10,y:Math.round(y*10)/10,sensation:field('body_v2_sensation')||'pirr',intensity:Number(field('body_v2_intensity')||2)};
    return put(key,[...old.slice(-119),m]);
  }
  function bodySummary(emo,marks){
    return marks.map(m=>{const nearest=landmarks[m.side]||landmarks.front;let location='Kroppen';let mind=1e9;for(const [name,x,y] of nearest){const d=(x-m.x)**2+(y-m.y)**2;if(d<mind){mind=d;location=name}}
      const s=sensations.find(x=>x.id===m.sensation)?.label||'Upplevelse';return `${m.side==='back'?'Bak':'Fram'}: ${location} – ${s} (${['','lite','mellan','mycket'][m.intensity]||'ospecificerat'})`;}).join('\n');
  }
  return {extra,form,labels,renderExercise,showBody,adultPage,getEntries,landmarks,sensations,placeMark,bodySummary};
})();