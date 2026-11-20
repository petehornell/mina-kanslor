'use strict';
const $=s=>document.querySelector(s), view=$('#view');let page='welcome',db=null,cache={},saveTimer=null,selectedShare=[],userRole=null;const exampleShown=new Set();const colors=['#ef7076','#f5a75e','#f4d768','#a4cb78','#55bba9','#68b6e4','#8c93d6','#bc8bd0','#ef9fbc','#9caaae'];
const exercises=[{id:'colors',title:'Känslornas färger',sub:'Vilken färg passar varje känsla?',emoji:'🎨',duration:'5–10 min'},{id:'hidden',title:'Det jag visar – och känner',sub:'Ibland syns en annan känsla än den vi har inuti.',emoji:'🎭',duration:'5–10 min'},{id:'body',title:'Känslor i kroppen',sub:'Upptäck var du brukar känna olika saker.',emoji:'🧍',duration:'5–10 min'},{id:'support',title:'När jag behöver stöd',sub:'Fundera på hur en vuxen kan hjälpa dig.',emoji:'🤝',duration:'5–10 min'},{id:'calm',title:'Hitta lugnet',sub:'Prova en kort övning och välj vad som passar dig.',emoji:'🌿',duration:'3–5 min'}];
exercises.push(...MinaFeatures.extra);
const emotionNames=['Glad','Ledsen','Arg','Rädd','Orolig','Lugn','Nyfiken','Skamsen','Förvånad','Irriterad'];const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function dbOpen(){return new Promise((resolve,reject)=>{let r=indexedDB.open('mina-kanslor',1);r.onupgradeneeded=()=>r.result.createObjectStore('answers');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}function readAll(){return new Promise((resolve,reject)=>{const r=db.transaction('answers','readonly').objectStore('answers').getAllKeys();r.onsuccess=()=>{const keys=r.result;const out={};let left=keys.length;if(!left)return resolve(out);for(const k of keys){let g=db.transaction('answers','readonly').objectStore('answers').get(k);g.onsuccess=()=>{out[k]=g.result;if(!--left)resolve(out)};g.onerror=()=>reject(g.error)}};r.onerror=()=>reject(r.error)})}function put(k,v){cache[k]=v;return new Promise((resolve,reject)=>{let r=db.transaction('answers','readwrite').objectStore('answers').put(v,k);r.onsuccess=resolve;r.onerror=()=>reject(r.error)})}function removeAll(){return new Promise((resolve,reject)=>{let r=db.transaction('answers','readwrite').objectStore('answers').clear();r.onsuccess=resolve;r.onerror=()=>reject(r.error)})}function field(k){return cache[k]??''}function setField(k,v){clearTimeout(saveTimer);cache[k]=v;const s=$('#saveStatus');if(s)s.textContent='Sparar…';saveTimer=setTimeout(async()=>{try{await put(k,v);const st=$('#saveStatus');if(st)st.textContent='✓ Sparat på den här telefonen'}catch(e){alert('Det gick inte att spara. Kontrollera telefonens lagringsutrymme.')}},350)}async function flush(){if(saveTimer){clearTimeout(saveTimer);saveTimer=null;for(const k of Object.keys(cache))await put(k,cache[k])}}function jump(p){
  flush().catch(console.error);
  const adultPage=p.startsWith('adult-')||['parent-home','parent-guides','parent-answers'].includes(p);
  if(userRole==='parent'&&!adultPage&&!['welcome','settings'].includes(p))p='parent-home';
  if(userRole==='youth'&&adultPage)p='home';
  page=p;render();window.scrollTo(0,0);
}function btn(label,action,variant='secondary'){return `<button class="btn ${variant}" data-action="${action}">${label}</button>`}function intro(title,sub,kicker='DEL 1 · FÖRSTÅ KÄNSLOR'){return `<div class="eyebrow">${kicker}</div><h1>${title}</h1><p class="muted">${sub}</p>${userRole==='youth'?MinaGuides.pageHint(page,esc,exampleShown.has(page)):''}`}function status(){return '<div id="saveStatus" class="status">✓ Svaren sparas bara på den här telefonen</div>'}function textArea(key,label,placeholder='Skriv om du vill. Det går också bra att hoppa över.') {return `<label for="${key}">${label}</label><textarea id="${key}" data-field="${key}" placeholder="${esc(placeholder)}">${esc(field(key))}</textarea>${userRole==='youth'?MinaGuides.inlineHint(key,esc,exampleShown.has(key)):''}`}function chips(key,items){const chosen=Array.isArray(field(key))?field(key):(field(key)?[field(key)]:[]);return `<div class="chiprow" role="group" aria-label="Välj en eller flera känslor">${items.map(x=>`<button type="button" aria-pressed="${chosen.includes(x)}" class="chip ${chosen.includes(x)?'on':''}" data-choice="${key}" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div>`}
function render(){
let h='';
if(page==='welcome'){
  h=`<div class="role-intro"><div class="eyebrow">VÄLKOMMEN TILL MINA KÄNSLOR</div><h1>Vem vill du använda appen som?</h1><p>Välj den del som passar dig. Du kan byta senare.</p></div>
  <div class="role-selection">
    <button type="button" class="role-card youth-card" data-role="youth"><span class="role-icon">🌱</span><strong>Jag är ungdom</strong><span>Förstå känslor, göra övningar och spara mina egna svar.</span><em>Öppna ungdomsdelen</em></button>
    <button type="button" class="role-card adult-card" data-role="parent"><span class="role-icon">🤝</span><strong>Jag är förälder eller vuxen</strong><span>Guider, vardagsexempel och egna reflektionsfrågor.</span><em>Öppna vuxendelen</em></button>
  </div>
  <div class="notice privacy-choice"><strong>Om privata svar:</strong> Allt sparas lokalt på den här enheten. Valet mellan ungdom och vuxen är ingen inloggning eller säker avskiljning. Använd helst varsin telefon.</div>`;
}
else if(page==='parent-home'){h=MinaGuides.parentHome({field,esc,intro,textArea,status});}
else if(page==='parent-guides'){h=MinaGuides.parentGuides({field,esc,intro,textArea,status});}
else if(page==='parent-answers'){h=MinaGuides.parentAnswers({field,esc,intro,textArea,status});}
else if(MinaGuides.adultMap[page]){h=MinaGuides.parentTopic(page,{field,esc,intro,textArea,status});}
else if(page==='home'){let done=exercises.filter(e=>cache['done_'+e.id]).length;h=`<div class="hero"><div class="eyebrow">DIN EGEN PLATS</div><h1>Hej! Hur är läget?</h1><p>Här finns inga rätt eller fel. Du bestämmer vad du vill skriva, och vad du vill dela.</p>${btn('Börja med en övning','exercises','')}</div><div class="card"><div class="line"><h2>Min arbetsbok</h2><span class="tag">${done} av ${exercises.length} klara</span></div><div class="progress"><i style="width:${done/exercises.length*100}%"></i></div><p class="muted small">Du kan göra övningarna i vilken ordning du vill. Att hoppa över frågor är också okej.</p></div><h2>Vad vill du göra?</h2><div class="grid"><button class="tile" data-action="exercises"><span class="emoji">📖</span><strong>Göra en övning</strong><small>En sak i taget</small></button><button class="tile" data-action="answers"><span class="emoji">🔒</span><strong>Mina svar</strong><small>Bara på min telefon</small></button><button class="tile" data-action="help"><span class="emoji">💬</span><strong>Prata med någon</strong><small>Välj vad du vill dela</small></button><button class="tile" data-action="settings"><span class="emoji">🛟</span><strong>Säkerhetskopia</strong><small>Skydda dina svar</small></button></div>`}
else if(page==='exercises'){
  h=intro('Mina övningar','Välj det du vill göra idag. Du kan börja var som helst och hoppa över frågor.');
  const chapters=[{n:1,title:'Förstå känslor',desc:'Lär känna känslorna och hur de känns i kroppen.'},
    {n:2,title:'Hantera känslor',desc:'Fundera på situationer och vad som kan hjälpa.'},
    {n:3,title:'Arbeta vidare',desc:'Självkänsla, tankar och din egen plan.'}];
  for(const group of chapters){
    const items=exercises.filter(e=>(e.section||1)===group.n);
    h+=`<div class="section-head"><span class="section-n">DEL ${group.n}</span><h2>${group.title}</h2></div><p class="muted small">${group.desc} · ${items.length} övningar</p>`;
    h+=items.map((e,i)=>`<button class="tile wide exercise-item" data-action="${e.id}"><div class="line"><span class="emoji">${e.emoji}</span><span class="tag">${cache['done_'+e.id]?'✓ Gjord':e.duration}</span></div><strong>${e.title}</strong><small>${e.sub}</small></button>`).join('');
  }
}
else if(page==='colors'){h=intro('Känslornas färger','Om känslor hade färger – vilka skulle du välja? Det finns inget facit.');h+=emotionNames.map(n=>`<div class="emotion"><b>${n}</b><span style="width:32px;height:32px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #a8b9b2;background:${esc(field('color_'+n)||'#e8eeea')}"></span></div><div class="colorGrid">${colors.map(c=>`<button aria-label="Välj färgen ${c} för ${n}" class="swatch ${field('color_'+n)===c?'selected':''}" style="--swatch-color:${c};background-color:${c}!important" data-color-name="${n}" data-color="${c}"></button>`).join('')}</div>`).join('');h+=textArea('colors_note','Varför valde du någon av färgerna?')+status()+finish('colors')}
else if(page==='hidden'){h=intro('Det jag visar – och känner','Ibland ser andra en känsla, fast vi egentligen känner något annat.');h+=`<div class="card"><h3>Vilka känslor är enkla att visa?</h3>${chips('hidden_easy',emotionNames)}</div><div class="card"><h3>Vilka känslor är svåra att visa?</h3>${chips('hidden_hard',emotionNames)}</div>`+textArea('hidden_out','Vad brukar andra se när du har det jobbigt?')+textArea('hidden_inside','Vad kan du känna på insidan då?')+textArea('hidden_situation','Finns det någon situation då du håller en känsla för dig själv?')+status()+finish('hidden')}
else if(page==='body'){h=MinaFeatures.showBody({field,esc,intro,textArea,status,finish,emotions:emotionNames,canUndo:emotion=>bodyUndoStack.some(entry=>entry.emotion===emotion)});}
else if(page==='support'){h=intro('När jag behöver stöd','Det kan vara lättare att be om hjälp om man vet hur man vill bli bemött.');h+=textArea('support_person','Vem känns trygg att prata med? Du kan skriva ett namn eller en roll.')+textArea('support_hard','Vad kan göra det svårt att berätta?')+textArea('support_adult','Vad skulle en vuxen kunna göra för att det ska bli lättare?')+`<div class="notice">Du måste inte dela det du skriver här. Om du vill prata med någon kan du välja precis vad du vill visa.</div>`+status()+finish('support')}
else if(page==='calm'){h=intro('Hitta lugnet','Olika saker fungerar för olika personer. Här kan du testa något enkelt.');h+=`<div class="card"><h3>Prova en kort paus</h3><p>Sätt båda fötterna mot golvet om det känns bra. Titta dig omkring. Lägg märke till tre saker du ser, två ljud du hör och en sak du känner mot huden.</p><p>Du behöver inte göra något perfekt. Sluta om övningen inte känns bra.</p></div><h3>Vad skulle du vilja prova?</h3>${chips('calm_choice',['Ta en promenad','Lyssna på musik','Rita eller skriva','Röra på mig','Prata med någon','Vara ifred en stund'])}`+textArea('calm_note','Hur fungerade det för dig?')+status()+finish('calm')}
else if(MinaFeatures.form[page]){h=MinaFeatures.renderExercise(page,{field,esc,intro,textArea,status,finish,chips});}
else if(page==='adults'){h=MinaFeatures.adultPage({intro});}
else if(page==='answers'){h=intro('Mina svar','Bara du kan bestämma vilka svar du vill visa för någon annan.','PRIVAT');h+=`<div class="notice">Svaren finns på den här enheten. De skickas inte automatiskt till någon.</div>`;for(const e of exercises){const entries=entriesFor(e.id);h+=`<div class="card"><div class="line"><h3>${e.emoji} ${e.title}</h3><span class="tag">${cache['done_'+e.id]?'Gjord':'Påbörjad'}</span></div>${entries.length?entries.map(([k,v],i)=>`<label class="check small"><input type="checkbox" data-share-item="${e.id}" data-share-index="${i}"> Dela: ${esc(k)}</label><div class="answer">${esc(v)}</div>` ).join(''):'<p class="muted small">Inga svar sparade ännu.</p>'}<div class="actions">${btn('Öppna övning',e.id)}${entries.length?`<button class="btn secondary" data-share-ex="${e.id}">Dela valda svar</button>`:''}</div></div>`} }
else if(page==='help'){h=intro('Prata med någon','Du kan välja vad du vill visa – eller bara be om ett samtal.','STÖD');h+=`<div class="card"><h3>Det är okej att be om hjälp</h3><p>Du behöver inte ha alla orden klara. Du kan börja med: ”Jag vill prata om en sak, men jag vet inte riktigt hur.”</p>${btn('Skriv ett meddelande','share')}</div><div class="card"><h3>Information för vuxna</h3><p>Vuxna kan läsa om hur de kan lyssna och stötta, utan att få tillgång till dina svar.</p>${btn('Till viktiga vuxna','adults')}</div><div class="card"><h3>Om du behöver hjälp nu</h3><p>Prata med en vuxen du litar på. Vid omedelbar fara, ring 112. Du kan också kontakta BRIS på 116 111.</p></div>`}
else if(page==='share'){h=intro('Dela på ditt sätt','Du väljer själv vad som ska stå i meddelandet. Inget skickas förrän du själv väljer mottagare.','DU BESTÄMMER');h+=`<label for="shareReason">Vad vill du att den vuxna ska göra?</label><select id="shareReason"><option value="read">Bara läsa</option><option value="talk">Prata med mig</option><option value="help">Hjälpa mig</option></select><label for="shareText">Det här vill jag dela</label><textarea id="shareText" rows="8">${esc(window.shareDraft||'')}</textarea><div class="actions"><button class="btn" data-action="sendShare">Dela meddelandet</button><button class="btn secondary" data-action="copyShare">Kopiera text</button></div><p class="note">Om du delar via en meddelandeapp kan den tjänsten spara en kopia av det du skickar.</p>`}
else if(page==='settings'){h=intro('Inställningar','Dina svar sparas lokalt. Skapa en säkerhetskopia så att du kan återställa dem om telefonen byts eller rensas.','PRIVAT OCH SÄKERT');h+=`<div class="card"><h3>🔐 Säkerhetskopiera</h3><p class="small">Spara en krypterad fil. Välj ett starkt lösenord som du kommer ihåg. Utan lösenordet går filen inte att öppna. Filen kan innehålla anteckningar från båda vyerna om ni delar enhet.</p><label for="backupPass">Lösenord (minst 12 tecken)</label><input type="password" id="backupPass" autocomplete="new-password" minlength="12"><div class="actions">${btn('Skapa säkerhetskopia','backup','')}</div></div><div class="card"><h3>📥 Återställ</h3><p class="small">Välj en tidigare säkerhetskopia. Återställning ersätter de svar som finns på den här enheten.</p><label for="restoreFile">Välj fil</label><input type="file" id="restoreFile" accept=".json,application/json"><label for="restorePass">Lösenord till filen</label><input type="password" id="restorePass" autocomplete="off"><div class="actions">${btn('Återställ från fil','restore')}</div></div><div class="card"><h3>Radera alla svar</h3><p class="small">Raderar både ungdomssvar och vuxenanteckningar som finns på den här enheten. Detta går inte att ångra utan säkerhetskopia.</p>${btn('Radera mina svar','erase','danger')}</div><div class="notice">Tips: På iPhone öppnar du webbplatsen i Safari och väljer Dela → Lägg till på hemskärmen. Använd sedan alltid den installerade appen. Safari och hemskärmsappen kan spara data separat.</div>`}
view.innerHTML=h+`<footer>Fristående digitala övningar utifrån teman i Region Västernorrlands ”Känslor för dig som ung”, del 1–3. Inte en vårdtjänst.</footer>`;
const nav=$('nav');
nav.hidden=!userRole||page==='welcome';
const roleNav=userRole==='parent'
  ?[['parent-home','⌂','Hem'],['parent-guides','▤','Guider'],['parent-answers','✎','Anteckningar'],['settings','⚙','Inställningar']]
  :[['home','⌂','Hem'],['exercises','▤','Övningar'],['answers','✎','Mina svar'],['help','♡','Stöd']];
if(nav.dataset.viewRole!==userRole){
  nav.innerHTML=roleNav.map(([id,ico,label])=>`<button data-nav="${id}">${ico}<span>${label}</span></button>`).join('');
  nav.dataset.viewRole=userRole||'none';
}
nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.nav===page));
const switchBtn=$('#switchRoleBtn');
if(switchBtn){
 switchBtn.hidden=!userRole||page==='welcome';
 switchBtn.textContent=userRole==='parent'?'Vuxen · Byt vy':'Ungdom · Byt vy';
}
}
function finish(id){return `<div class="divider"></div><label class="check"><input type="checkbox" data-done="${id}" ${cache['done_'+id]?'checked':''}> Jag är klar med den här övningen för nu</label><div class="actions">${btn('Till alla övningar','exercises')} ${btn('Mina svar','answers')}</div>`}
function entriesFor(id){
  if(MinaFeatures.form[id])return MinaFeatures.getEntries(id,cache);
  const prefix={colors:['color_','colors_note'],hidden:['hidden_'],body:['body_'],support:['support_'],calm:['calm_']}[id]||[];
  return Object.entries(cache).filter(([k,v])=>prefix.some(p=>k.startsWith(p))&&!k.startsWith('body_current')&&!k.startsWith('body_v2_')&&!k.startsWith('done_')&&v!==''&&v!==false&&!(Array.isArray(v)&&!v.length)).map(([k,v])=>{
    if(k.startsWith('body_marks_'))return ['Kroppskarta – '+k.slice('body_marks_'.length),MinaFeatures.bodySummary(k.slice('body_marks_'.length),v)];
    if(k.startsWith('body_desc_'))return ['Beskrivning – '+k.slice('body_desc_'.length),String(v)];
    if(k.startsWith('body_whole_'))return ['Kroppskarta – '+k.slice('body_whole_'.length),'Hela kroppen'];
    if(k.startsWith('body_none_'))return ['Kroppskarta – '+k.slice('body_none_'.length),'Ingen särskild plats'];
    let title=k.startsWith('color_')?'Färg för '+k.slice(6):({
      'colors_note':'Mina tankar','hidden_easy':'Lätt att visa','hidden_hard':'Svårt att visa',
      'hidden_out':'Vad andra ser','hidden_inside':'Vad jag känner','hidden_situation':'En situation',
      'body_note':'Tidigare anteckning','support_person':'Trygg person','support_hard':'Vad som är svårt',
      'support_adult':'Vad som hjälper','calm_choice':'Det jag vill prova','calm_note':'Så gick det'
    }[k]||(k.startsWith('body_')?k.slice(5)+' – tidigare markeringar':'Svar'));
    return [title,Array.isArray(v)?v.join(', '):String(v)];
  });
}
function shareFrom(id){const e=exercises.find(x=>x.id===id),all=entriesFor(id),selected=[...document.querySelectorAll(`[data-share-item="${id}"]:checked`)].map(x=>Number(x.dataset.shareIndex)),entries=all.filter((x,i)=>selected.includes(i));if(!entries.length){alert("Välj minst ett svar att dela.");return}window.shareDraft=`${e.title}\n\n`+entries.map(([k,v])=>`${k}: ${v}`).join('\n\n');jump('share')}
function shareText(){const reason=$('#shareReason')?.value||'talk';const lead={read:'Jag vill visa dig något jag har skrivit. Du behöver inte göra något just nu.',talk:'Jag vill dela något med dig. Kan vi prata om det när vi får en stund?',help:'Jag behöver hjälp med något jag funderat på. Kan du hjälpa mig?'}[reason];return lead+'\n\n'+($('#shareText')?.value||'')}
async function sendShare(){const text=shareText();if(navigator.share){try{await navigator.share({title:'Något jag vill dela',text})}catch(e){if(e.name!=='AbortError')alert('Det gick inte att öppna delningsmenyn. Du kan kopiera texten i stället.')}}else{await navigator.clipboard.writeText(text);alert('Texten är kopierad. Klistra in den i ett meddelande till den du väljer.')}}
const enc=new TextEncoder(),dec=new TextDecoder();function b64(bytes){let str='';for(let i=0;i<bytes.length;i+=16384){str+=String.fromCharCode(...bytes.subarray(i,i+16384))}return btoa(str)}function unb64(s){return Uint8Array.from(atob(s),c=>c.charCodeAt(0))}async function keyFor(pass,salt){let key=await crypto.subtle.importKey('raw',enc.encode(pass),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:310000,hash:'SHA-256'},key,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}function download(name,content,type){let a=document.createElement('a'),url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000)}async function backup(){let pass=$('#backupPass').value;if(pass.length<12)return alert('Välj ett lösenord med minst 12 tecken.');await flush();const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),key=await keyFor(pass,salt),payload=enc.encode(JSON.stringify({version:1,answers:await readAll()})),cipher=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,payload));download('mina-kanslor-sakerhetskopia-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify({format:'mina-kanslor-backup',version:1,salt:b64(salt),iv:b64(iv),data:b64(cipher)}),'application/json');$('#backupPass').value='';alert('Säkerhetskopian har skapats. Kontrollera att filen har sparats på ett säkert ställe.')}async function restore(){const file=$('#restoreFile').files[0],pass=$('#restorePass').value;if(!file||!pass)return alert('Välj en fil och ange lösenord.');if(file.size>2000000)return alert('Filen är för stor.');try{const b=JSON.parse(await file.text());if(b.format!=='mina-kanslor-backup'||b.version!==1)throw Error('Fel filformat');const key=await keyFor(pass,unb64(b.salt));const plaintext=await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(b.iv)},key,unb64(b.data));const obj=JSON.parse(dec.decode(plaintext));if(obj.version!==1||!obj.answers||typeof obj.answers!=='object'||Array.isArray(obj.answers))throw Error('Ogiltigt innehåll');if(!confirm('Vill du ersätta alla nuvarande svar med innehållet i säkerhetskopian?'))return;await removeAll();cache={};bodyUndoStack.length=0;for(const [k,v]of Object.entries(obj.answers)){if(typeof k==='string'&&k.length<100&&(typeof v==='string'||typeof v==='boolean'||Array.isArray(v)))await put(k,v)}alert('Svaren har återställts.');jump('home')}catch(e){alert('Det gick inte att återställa filen. Kontrollera lösenordet och filen.')}}
async function toggleBodyPart(part){const k='body_'+(field('body_current')||'Glad'),old=field(k),arr=Array.isArray(old)?[...old]:[];await put(k,arr.includes(part)?arr.filter(x=>x!==part):[...arr,part]);render()}document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.body-region')){e.preventDefault();toggleBodyPart(e.target.dataset.bodyPart)}});document.addEventListener('input',e=>{if(e.target.dataset.field)setField(e.target.dataset.field,e.target.value)});
/* Kroppskartan: en prick kan flyttas med fingret eller piltangenterna.
   Svaren är lokala och det är bara de befintliga markeringarna som ändras. */
const bodyUndoStack=[];
let activeBodyPointer=null;
function putBodyMarks(key,marks){
  const previous=field(key);
  if(Array.isArray(previous)){
    bodyUndoStack.push({emotion:key.slice('body_marks_'.length),previous:previous.map(p=>p?{...p}:p)});
    if(bodyUndoStack.length>60)bodyUndoStack.shift();
  }
  return put(key,marks);
}
function bodySvgPoint(board,e){
  const matrix=board.getScreenCTM()?.inverse();
  if(!matrix)return null;
  const point=board.createSVGPoint();
  point.x=e.clientX;point.y=e.clientY;
  return point.matrixTransform(matrix);
}
function isBodyPoint(board,p){
  if(!p)return false;
  const test=board.createSVGPoint();test.x=p.x;test.y=p.y;
  let supported=false;
  for(const shape of board.querySelectorAll('.body-surface path,.body-surface circle')){
    if(typeof shape.isPointInFill!=='function')continue;
    supported=true;
    if(shape.isPointInFill(test))return true;
  }
  // Reserv för äldre webbläsare där isPointInFill saknas.
  return !supported&&p.x>=69&&p.x<=271&&p.y>=33&&p.y<=463;
}
function clearBodyGesture(){
  if(!activeBodyPointer)return null;
  const gesture=activeBodyPointer;
  activeBodyPointer=null;
  gesture.board.classList.remove('body-is-dragging');
  if(gesture.board.hasPointerCapture?.(gesture.pointerId)){
    try{gesture.board.releasePointerCapture(gesture.pointerId)}catch{}
  }
  return gesture;
}
document.addEventListener('pointerdown',e=>{
  if(page!=='body'||!e.isPrimary)return;
  const board=e.target.closest('[data-body-board]');
  if(!board)return;
  const point=bodySvgPoint(board,e),dot=e.target.closest('[data-body-dot-index]');
  if(!point||(!dot&&!e.target.closest('[data-body-surface]')))return;
  const emotion=field('body_current')||'Glad';
  const side=field('body_v2_side')||'front';
  const marks=field('body_marks_'+emotion);
  const index=dot?Number(dot.dataset.bodyDotIndex):MinaFeatures.nearestMarkIndex(marks,side,point.x,point.y,19);
  const moving=Number.isInteger(index)&&index>=0&&Array.isArray(marks)&&marks[index]?.side===side;
  activeBodyPointer={
    board,emotion,pointerId:e.pointerId,startClientX:e.clientX,startClientY:e.clientY,
    type:moving?'move':'new',index:moving?index:-1,
    startPoint:point,lastValidPoint:point,didMove:false
  };
  if(moving)board.classList.add('body-is-dragging');
  try{board.setPointerCapture?.(e.pointerId)}catch{}
  if(e.cancelable)e.preventDefault();
},{passive:false});
document.addEventListener('pointermove',e=>{
  const g=activeBodyPointer;
  if(!g||g.pointerId!==e.pointerId)return;
  const point=bodySvgPoint(g.board,e);
  if(!point)return;
  g.didMove=g.didMove||Math.hypot(e.clientX-g.startClientX,e.clientY-g.startClientY)>4;
  if(isBodyPoint(g.board,point))g.lastValidPoint=point;
  if(g.type==='move'&&g.didMove){
    const handle=g.board.querySelector('[data-body-dot-index="'+g.index+'"]');
    if(handle)for(const circle of handle.querySelectorAll('circle')){
      circle.setAttribute('cx',g.lastValidPoint.x);
      circle.setAttribute('cy',g.lastValidPoint.y);
    }
  }
  if(e.cancelable)e.preventDefault();
},{passive:false});
document.addEventListener('pointerup',async e=>{
  if(!activeBodyPointer||activeBodyPointer.pointerId!==e.pointerId)return;
  const g=clearBodyGesture();
  if(!g)return;
  g.didMove=g.didMove||Math.hypot(e.clientX-g.startClientX,e.clientY-g.startClientY)>4;
  const point=bodySvgPoint(g.board,e);
  const target=isBodyPoint(g.board,point)?point:g.lastValidPoint;
  if(!target){if(g.type==='move')render();return}
  try{
    if(g.type==='move'){
      // Ett tryck på en befintlig prick flyttar ingenting och skapar ingen ny prick.
      if(!g.didMove){return}
      await MinaFeatures.moveMark(cache,field,putBodyMarks,g.index,target.x,target.y);
    }else{
      const emotion=g.emotion;
      await put('body_none_'+emotion,false);
      await put('body_whole_'+emotion,false);
      await MinaFeatures.placeMark(cache,field,putBodyMarks,target.x,target.y);
    }
    render();
  }catch(err){
    console.error('Kunde inte uppdatera markeringen',err);
    render();
  }
});
document.addEventListener('pointercancel',e=>{
  if(activeBodyPointer?.pointerId!==e.pointerId)return;
  const g=clearBodyGesture();
  if(g?.type==='move')render();
});
document.addEventListener('keydown',async e=>{
  const handle=e.target.closest('[data-body-dot-index]');
  if(!handle||page!=='body'||!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;
  e.preventDefault();
  const index=Number(handle.dataset.bodyDotIndex);
  const emotion=field('body_current')||'Glad';
  const existing=field('body_marks_'+emotion);
  if(!Array.isArray(existing)||!existing[index])return;
  const point=existing[index],step=e.shiftKey?2:7;
  const x=Number(point.x)+(e.key==='ArrowLeft'?-step:e.key==='ArrowRight'?step:0);
  const y=Number(point.y)+(e.key==='ArrowUp'?-step:e.key==='ArrowDown'?step:0);
  const board=handle.closest('[data-body-board]');
  if(!board||!isBodyPoint(board,{x,y}))return;
  await MinaFeatures.moveMark(cache,field,putBodyMarks,index,x,y);
  render();
  document.querySelector('[data-body-dot-index="'+index+'"]')?.focus();
});
document.addEventListener('change',e=>{
  if(e.target.dataset.singleField){put(e.target.dataset.singleField,e.target.value).then(render);return}
  if(e.target.dataset.bodyNone){
    const emotion=field('body_current')||'Glad',marks=field('body_marks_'+emotion);
    if(e.target.checked&&Array.isArray(marks)&&marks.length){
      if(!confirm('Vill du ersätta dina tidigare prickar för '+emotion+' med ”ingen särskild plats”?')){e.target.checked=false;return}
      put('body_marks_'+emotion,[]);
    }
    if(e.target.checked)put('body_whole_'+emotion,false);
    put('body_none_'+emotion,e.target.checked).then(render);return;
  }
  if(e.target.dataset.done){put('done_'+e.target.dataset.done,e.target.checked).then(render)}if(e.target.id==='bodyEmotion'){put('body_current',e.target.value).then(render)}});document.addEventListener('click',async e=>{
  // Pointerhändelser hanterar nya och flyttade markeringar.
  // Vanliga click-händelser på figuren får aldrig skapa dubbla prickar.
  if(e.target.closest('[data-body-board]'))return;
  const control=e.target.closest('button');
  if(control&&control.dataset.bodyWhole){
    const emotion=field('body_current')||'Glad',whole=Boolean(field('body_whole_'+emotion));
    const marks=field('body_marks_'+emotion);
    if(!whole&&Array.isArray(marks)&&marks.length){
      if(!confirm('Vill du ersätta prickarna för '+emotion+' med en markering för hela kroppen?'))return;
      await put('body_marks_'+emotion,[]);
    }
    await put('body_whole_'+emotion,!whole);
    if(!whole)await put('body_none_'+emotion,false);
    render();return;
  }
  if(control&&control.dataset.bodyView){await put('body_v2_side',control.dataset.bodyView);render();return}
  if(control&&control.dataset.bodySense){await put('body_v2_sensation',control.dataset.bodySense);render();return}
  if(control&&control.dataset.bodyStrength){await put('body_v2_intensity',control.dataset.bodyStrength);render();return}
  if(control&&control.dataset.bodyPlace){
    const emotion=field('body_current')||'Glad';await put('body_none_'+emotion,false);await put('body_whole_'+emotion,false);
    await MinaFeatures.placeMark(cache,field,putBodyMarks,Number(control.dataset.x),Number(control.dataset.y));render();return;
  }
  if(control&&control.dataset.bodyUndo){
    const emotion=field('body_current')||'Glad',key='body_marks_'+emotion;
    let i=bodyUndoStack.length-1;
    while(i>=0&&bodyUndoStack[i].emotion!==emotion)i--;
    if(i>=0){
      const entry=bodyUndoStack.splice(i,1)[0];
      await put(key,entry.previous);
    }else{
      const arr=field(key);
      if(Array.isArray(arr)&&arr.length)await put(key,arr.slice(0,-1));
    }
    render();return;
  }
  if(control&&control.dataset.bodyClear){
    const emotion=field('body_current')||'Glad';
    if(confirm('Vill du ta bort markeringarna för '+emotion+'?')){
      await putBodyMarks('body_marks_'+emotion,[]);render();
    }return;
  }
  const region=e.target.closest('.body-region');if(region){await toggleBodyPart(region.dataset.bodyPart);return}const b=e.target.closest('button');if(!b)return;
if(b.dataset.role){
  if(!['youth','parent'].includes(b.dataset.role))return;
  await put('ui_role',b.dataset.role);
  userRole=b.dataset.role;
  return jump(userRole==='parent'?'parent-home':'home');
}
if(b.dataset.example){
  if(exampleShown.has(b.dataset.example))exampleShown.delete(b.dataset.example);
  else exampleShown.add(b.dataset.example);
  return render();
}
if(b.dataset.nav)return jump(b.dataset.nav);if(b.dataset.colorName){await put('color_'+b.dataset.colorName,b.dataset.color);return render()}if(b.dataset.choice){const k=b.dataset.choice,v=b.dataset.value,old=field(k),arr=Array.isArray(old)?[...old]:(old?[old]:[]);await put(k,arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);return render()}if(b.dataset.bodyPart){await toggleBodyPart(b.dataset.bodyPart);return}if(b.dataset.shareEx)return shareFrom(b.dataset.shareEx);const a=b.dataset.action;if(!a)return;if(a==='sendShare')return sendShare();if(a==='copyShare'){try{await navigator.clipboard.writeText(shareText());alert('Texten är kopierad.')}catch{alert('Markera och kopiera texten manuellt.')}return}if(a==='backup')return backup();if(a==='restore')return restore();if(a==='erase'){if(confirm('Vill du verkligen radera alla svar från den här enheten?')&&confirm('Sista kontrollen: Alla sparade svar raderas.')){await removeAll();cache={};bodyUndoStack.length=0;jump('home')}return}jump(a)});$('#settingsBtn').addEventListener('click',()=>jump('settings'));$('#switchRoleBtn').addEventListener('click',()=>jump('welcome'));(async()=>{try{db=await dbOpen();cache=await readAll();userRole=['youth','parent'].includes(cache.ui_role)?cache.ui_role:null;page=userRole==='parent'?'parent-home':userRole==='youth'?'home':'welcome';render();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(console.warn)}catch(e){view.innerHTML='<h1>Det gick inte att öppna lagringen</h1><p>Den här appen behöver lokal lagring för att skydda dina svar. Prova att öppna den i Safari eller Chrome, inte i privat läge.</p>'}})();