const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// Navigation and entrance
$('#menuToggle').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
$$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));
$('#beginBtn').addEventListener('click', () => $('#memories').scrollIntoView({behavior:'smooth'}));

// Gift boxes
const gifts = [
  {title:'هدية الذكريات', text:'إلى أختي وصديقتي: أتمنى أن تظل ضحكاتنا وصورنا ومغامراتنا حكاية نرجع لها كلما كبرنا. وما زال أمامنا الكثير لنعيشه معًا. ♡'},
  {title:'هدية التشجيع', text:'إلى ضابطة المستقبل: أتمنى أن تصلي إلى حلمكِ بالعلم والاجتهاد والشجاعة. كوني دائمًا صاحبة مبدأ، عادلة، واثقة، ولا تسمحي لأي عقبة أن تطفئ طموحكِ.'},
  {title:'هدية الأمنيات', text:'أتمنى أن تحققي أحلامكِ، وتزوري تركيا قريبًا، وتعيشي أيامًا مليئة بالمغامرات والقطط اللطيفة والفرح. ربنا يكتب لكِ الخير كله يا أسماء.'}
];
$$('.gift-card').forEach(btn => btn.addEventListener('click', () => {
  const gift = gifts[Number(btn.dataset.gift)];
  $('#giftMessage').innerHTML = `<span class="message-spark">✦</span><div><strong>${gift.title}</strong><p>${gift.text}</p></div>`;
  $$('.gift-card').forEach(b => b.classList.remove('opened'));
  btn.classList.add('opened');
}));

// Quiz
const questions = [
  {q:'ما الحلم الذي أتمنى أن أراكِ تحققينه؟',a:['أن تصبحي ضابطة ناجحة','أن تسافري إلى تركيا','أن تحققي كل أحلامكِ وتظلي سعيدة'],correct:2,feedback:'كل أحلامكِ يا أسماء، خطوة بخطوة وبقلب مطمئن.'},
  {q:'ما الشيء الذي قد يحسّن يوم أسماء بسرعة؟',a:['قطة لطيفة 🐈','التخطيط لرحلة إلى تركيا ✈','كل ما سبق!'],correct:2,feedback:'قطة وتركيا ومغامرة جديدة… هذه أسماء التي نعرفها!'},
  {q:'كم شمعة ستطفئين في عيد ميلادكِ؟',a:['16','18','20'],correct:1,feedback:'18 شمعة لبداية فصل جديد يا أسماء! أحبكِ جدًا.'}
];
let qIndex=0, chosen=null;
function renderQuestion(){const q=questions[qIndex];$('#questionText').textContent=q.q;$('#quizProgress').textContent=`السؤال ${qIndex+1} من ${questions.length}`;$('#progressBar').style.width=`${(qIndex+1)/questions.length*100}%`;$('#answers').innerHTML=q.a.map((a,i)=>`<button class="answer" data-answer="${i}">${a}</button>`).join('');$('#quizFeedback').textContent='اختاري الإجابة الأقرب لقلبكِ ♡';$('#nextQuestion').disabled=true;$('#nextQuestion').textContent=qIndex===questions.length-1?'إنهاء اللعبة ✦':'التالي ←';chosen=null;$$('.answer').forEach(b=>b.addEventListener('click',()=>{if(chosen!==null)return;chosen=Number(b.dataset.answer);b.classList.add('selected');$('#quizFeedback').textContent=q.feedback;$('#nextQuestion').disabled=false;}));}
$('#nextQuestion').addEventListener('click',()=>{if(chosen===null)return;if(qIndex<questions.length-1){qIndex++;renderQuestion()}else{$('#quizPanel').innerHTML='<div class="quiz-top"><span>QUIZ COMPLETED</span><span>♡</span></div><div style="text-align:center;padding:35px 5px"><div style="font-size:42px;color:var(--gold)">✦</div><h3 style="color:var(--gold2);font-family:Amiri,serif;font-size:27px">أحسنتِ يا أسماء!</h3><p style="color:var(--muted);line-height:2">كانت مجرد لعبة صغيرة، لكن الحقيقة أنني محظوظة بوجودكِ في حياتي.</p><button class="text-button" onclick="location.reload()">العبِي مرة أخرى ↻</button></div>'}});
renderQuestion();

// Candles
$$('.candle').forEach(c => c.addEventListener('click',()=>{if(!c.classList.contains('lit'))return;c.classList.remove('lit');c.setAttribute('aria-label','تم إطفاء الشمعة');const left=$$('.candle.lit').length;if(left===0){$('#candleInstruction').textContent='أطفأتِ الشموع الـ18 كلها! استعدّي للمفاجأة!';$('#wishMessage').textContent='كل عام وأنتِ أقرب لأحلامكِ… أهلًا بعامكِ الثامن عشر يا أسماء ♡';confetti();launchPoppers();}else{$('#candleInstruction').textContent=`رائع! بقيت ${left} من 18 شمعة.`}}));
function confetti(){for(let i=0;i<36;i++){const p=document.createElement('span');p.textContent=['✦','✧','•'][i%3];p.style.cssText=`position:fixed;z-index:25;left:${Math.random()*100}vw;top:-20px;color:${i%2?'#8bdcf5':'#d8f6ff'};font-size:${10+Math.random()*15}px;pointer-events:none;transition:transform 2.8s ease,opacity 2.8s ease`;document.body.appendChild(p);requestAnimationFrame(()=>{p.style.transform=`translate(${(Math.random()-.5)*130}px,${window.innerHeight+80}px) rotate(${Math.random()*500}deg)`;p.style.opacity='0'});setTimeout(()=>p.remove(),3000)}}

// Letters
const letters=[
  'إذا كان يومكِ ثقيلًا، تذكّري أن وجودكِ وحده شيء جميل. خذي نفسًا عميقًا، وامنحي نفسكِ بعض اللطف. أنتِ تستحقين أيامًا هادئة وقلبًا مطمئنًا. ♡',
  'يا ضابطة المستقبل، ثقي بنفسكِ واعملي لأجل حلمكِ خطوة خطوة. القوة الحقيقية معها علم ورحمة وعدل، وأنا فخورة بطموحكِ وبكِ دائمًا.',
  'هذه رسالة لتذكّركِ أن أمامكِ رحلة جميلة: حلمكِ الكبير، وتركيا التي تتمنين زيارتها، وقطط كثيرة تنتظر حبكِ! أتمنى أن تحققي كل ما يسعد قلبكِ. أحبكِ يا أختي وصديقتي.'
];
$$('.envelope').forEach(btn=>btn.addEventListener('click',()=>{$('#letterContent').innerHTML=`<span>♡</span><p>${letters[Number(btn.dataset.letter)]}</p>`;$$('.envelope').forEach(b=>b.classList.remove('opened'));btn.classList.add('opened')}));

// Modal helpers for future customization
const modal=$('#modal');$('#modalClose').addEventListener('click',()=>modal.classList.remove('show'));$('#modalOk').addEventListener('click',()=>modal.classList.remove('show'));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});

function launchPoppers(){const stage=$('#celebrationPoppers');stage.classList.add('show');const symbols=['✦','✧','★','💙','🎊','❋'];for(let side of ['left','right']){for(let i=0;i<28;i++){const bit=document.createElement('span');bit.className='burst-piece';bit.textContent=symbols[Math.floor(Math.random()*symbols.length)];const startX=side==='left'?8:92;bit.style.left=startX+'vw';bit.style.bottom='55px';bit.style.color=['#8bdcf5','#d9f7ff','#b6eaff','#ffffff'][i%4];bit.style.setProperty('--dx',((Math.random()-.5)*75+(side==='left'?20:-20))+'vw');bit.style.setProperty('--dy',(-120-Math.random()*65)+'vh');bit.style.animationDelay=(Math.random()*.25)+'s';document.body.appendChild(bit);setTimeout(()=>bit.remove(),2300)}}setTimeout(()=>stage.classList.remove('show'),2200)}
