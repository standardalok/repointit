/* === Inline Script 1 === */
(function(){var el=document.getElementById('ct');function p(n){return(n<10?'0':'')+n}function tick(){var d=new Date(),h=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),ap=h>=12?'PM':'AM';h=h%12||12;el.textContent=p(h)+':'+p(m)+':'+p(s)+' '+ap;}tick();setInterval(tick,1000);})();
(function(){function reveal(){var l=document.getElementById('loader');if(!l||l.classList.contains('done'))return;l.classList.add('done');document.body.classList.add('loaded');setTimeout(function(){l.style.display='none';},1000);}
addEventListener('load',function(){setTimeout(reveal,1600);});setTimeout(reveal,2500);})();
function drawRuler(cv){if(!cv)return;var dpr=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;var ctx=cv.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);ctx.font='9px "Space Mono",monospace';ctx.lineWidth=1;for(var x=0;x<=w;x+=10){var maj=(x%100===0);ctx.strokeStyle=maj?'#2E4554':'#7B93A4';ctx.beginPath();ctx.moveTo(x+.5,h);ctx.lineTo(x+.5,maj?h-12:(x%50===0?h-8:h-5));ctx.stroke();if(maj&&x>0){ctx.fillStyle='#2E4554';ctx.fillText(x,x+3,h-14);}}}
function drawAll(){drawRuler(document.getElementById('rulerTop'));drawRuler(document.getElementById('rulerBot'));}
drawAll();addEventListener('resize',drawAll);addEventListener('load',drawAll);
(function(){var m=document.getElementById('heroMark');if(!m)return;var d=m.querySelector('.dim');if(!d)return;function set(){var r=m.getBoundingClientRect();d.textContent=Math.round(r.width)+' × '+Math.round(r.height);}m.addEventListener('mouseenter',set);addEventListener('load',set);set();})();
/* hero | gentle 3D parallax tilt for depth */
(function(){var hero=document.querySelector('.hero');if(!hero)return;
var mark=document.getElementById('heroMark'),floats=hero.querySelectorAll('.float'),sky=document.querySelector('.sky');
if(matchMedia('(pointer:coarse)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
function move(e){var r=hero.getBoundingClientRect();var cx=(e.clientX-r.left)/r.width-.5,cy=(e.clientY-r.top)/r.height-.5;
 if(mark)mark.style.transform='rotateY('+(cx*5).toFixed(2)+'deg) rotateX('+(-cy*5).toFixed(2)+'deg)';
 floats.forEach(function(f,i){var dp=(i%2?1:-1)*(14+i*3);f.style.setProperty('--px',(cx*dp).toFixed(1)+'px');f.style.setProperty('--py',(cy*dp).toFixed(1)+'px');});
 if(sky)sky.style.transform='translate('+(cx*-14).toFixed(1)+'px,'+(cy*-8).toFixed(1)+'px)';}
function reset(){if(mark)mark.style.transform='';floats.forEach(function(f){f.style.setProperty('--px','0px');f.style.setProperty('--py','0px');});if(sky)sky.style.transform='';}
hero.addEventListener('mousemove',move);hero.addEventListener('mouseleave',reset);})();
/* hero wordmark | auto-select on load, then release */
(function(){var m=document.getElementById('heroMark');if(!m)return;if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;setTimeout(function(){m.classList.add('demo');},1400);setTimeout(function(){m.classList.remove('demo');},4600);})();
(function(){var el=document.getElementById('tw');if(!el)return;var words=['boring brands','tired websites','dull funnels','flat campaigns','dead inboxes'],wi=0,ci=0,del=false;function step(){var w=words[wi];el.textContent=w.substring(0,ci);if(!del){ci++;if(ci>w.length){del=true;return setTimeout(step,1400);}}else{ci--;if(ci<0){del=false;wi=(wi+1)%words.length;ci=0;return setTimeout(step,260);}}setTimeout(step,del?45:85);}setTimeout(step,900);})();
document.querySelectorAll('.qa button').forEach(function(b){b.addEventListener('click',function(){var qa=b.parentElement,a=qa.querySelector('.a'),open=qa.classList.contains('open');document.querySelectorAll('.qa').forEach(function(o){o.classList.remove('open');o.querySelector('.a').style.maxHeight=null;});if(!open){qa.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}});});
/* services scroll isolated below */
/* work hover preview */
(function(){var pv=document.getElementById('wpreview'),img=document.getElementById('wpimg'),items=document.querySelectorAll('.witem'),tx=0,ty=0,raf=0;if(!pv)return;if(window.matchMedia&&!window.matchMedia('(pointer:fine)').matches)return;items.forEach(function(it){it.addEventListener('mouseenter',function(e){var sx=it.getAttribute('data-img');if(sx&&img.getAttribute('src')!==sx)img.setAttribute('src',sx);tx=e.clientX;ty=e.clientY;pv.style.left=tx+'px';pv.style.top=ty+'px';pv.classList.add('show');});it.addEventListener('mouseleave',function(){pv.classList.remove('show');});});var _wl=document.querySelector('.wlist');if(_wl)_wl.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!raf)raf=requestAnimationFrame(function(){pv.style.left=tx+'px';pv.style.top=ty+'px';raf=0;});});})();
/* count up */
(function(){var done=false;var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&!done){done=true;document.querySelectorAll('.num[data-count]').forEach(function(n){var t=parseFloat(n.dataset.count),dec=n.dataset.dec?1:0,d=1100,s=performance.now();function f(now){var p=Math.min((now-s)/d,1),e=1-Math.pow(1-p,3),v=(t*e).toFixed(dec);n.textContent=v;if(p<1)requestAnimationFrame(f);else{var suf=n.dataset.suffix;n.innerHTML=v+(suf?'<span class="u star">'+suf+'</span>':'<span class="u">+</span>');}}requestAnimationFrame(f);});}});},{threshold:.4});var st=document.querySelector('.c-stats');if(st)io.observe(st);})();
/* reveal */
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.1});document.querySelectorAll('.reveal,.stagger').forEach(function(e){io.observe(e);});})();
/* eyebrow handwriting | trigger self-draw on view */
(function(){var sc=[].slice.call(document.querySelectorAll('.scribble'));if(!sc.length)return;
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('writing');io.unobserve(en.target);}});},{threshold:.2});
sc.forEach(function(s){io.observe(s);});})();
/* scrollspy */
(function(){var links=[].slice.call(document.querySelectorAll('.nav-pill a[href^="#"]')),map={};links.forEach(function(l){var id=l.getAttribute('href').slice(1);if(id)map[id]=l;});var secs=Object.keys(map).map(function(id){return document.getElementById(id)}).filter(Boolean);var spy=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(l){l.classList.remove('active')});var l=map[en.target.id];if(l)l.classList.add('active');}});},{rootMargin:'-45% 0px -50% 0px'});secs.forEach(function(s){spy.observe(s)});})();
/* cursor */
(function(){if(!window.matchMedia||!window.matchMedia('(pointer:fine)').matches)return;document.body.style.cursor='none';document.querySelectorAll('a,button,.btn,.layer,.witem').forEach(function(e){e.style.cursor='none'});
var you=document.getElementById('curYou'),mate=document.getElementById('curMate'),nm=you.querySelector('.name');var tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty;
addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;});(function loop(){cx+=(tx-cx)*.3;cy+=(ty-cy)*.3;you.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop);})();
var t=0;
/* React Bot | appears only at a few spots, parks in empty space beside the thing, never on buttons */
(function(){var pois=[
 {sel:'.figwin .layer.active',label:'tap a layer',place:'left'},
 {sel:'.wlist .witem',label:'take a peek',place:'left'}];
var gx=innerWidth*0.5,gy=innerHeight*0.5,mtx=gx,mty=gy,curL='',vis=false;
function pick(){var vc=innerHeight*0.5,best=null,bd=1e9;for(var i=0;i<pois.length;i++){var el=document.querySelector(pois[i].sel);if(!el)continue;var r=el.getBoundingClientRect();if(r.bottom<140||r.top>innerHeight-110)continue;var c=r.top+r.height/2,d=Math.abs(c-vc);if(d<bd){bd=d;best={r:r,label:pois[i].label,place:pois[i].place};}}
 var ok=false;
 if(best){var r=best.r,px=0,py=0,left=false;
   if(best.place==='left'){px=r.left-30;py=r.top+Math.min(54,r.height*0.4);left=true;if(px>=96)ok=true;}
   else{px=r.right-26;py=r.top-30;if(r.top>120)ok=true;}
   if(ok){px=Math.max(16,Math.min(px,innerWidth-160));py=Math.max(70,py);mtx=px;mty=py;mate.classList.toggle('lbl-left',left);if(best.label!==curL){curL=best.label;mate.querySelector('.name').textContent=best.label;}mate.style.opacity=.96;vis=true;}
 }
 if(!ok){mate.style.opacity=0;vis=false;}}
(function guide(){t+=0.045;gx+=(mtx-gx)*0.07;gy+=(mty-gy)*0.07;var bob=vis?Math.sin(t)*2.5:0;mate.style.transform='translate('+gx+'px,'+(gy+bob)+'px)';requestAnimationFrame(guide);})();
addEventListener('scroll',pick,{passive:true});addEventListener('resize',pick);setInterval(pick,1000);setTimeout(pick,600);})();
document.addEventListener('mouseover',function(e){var yc=e.target.closest('.ph-yc'),cfp=e.target.closest('.cf-play'),cfc=e.target.closest('.cf-card'),w=e.target.closest('.witem'),a=e.target.closest('a,button,.btn,.layer');if(yc){you.classList.add('hot');nm.textContent='the flex';nm.style.background='#0D99FF';}else if(cfp||(cfc&&cfc.classList.contains('k-video'))){you.classList.add('hot');nm.textContent='watch';nm.style.background='#0D99FF';}else if(cfc){you.classList.add('hot');nm.textContent='read';nm.style.background='#0D99FF';}else if(w){you.classList.add('hot');nm.textContent='view';nm.style.background='#F0531C';}else if(a){you.classList.add('hot');nm.textContent='click';nm.style.background='#0D99FF';}else{you.classList.remove('hot');nm.textContent='You';nm.style.background='#0D99FF';}});})();

/* footer | clock, wordmark wave, back to top */
(function(){var cl=document.getElementById('fClock');function tk(){var d=new Date();cl.textContent=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);}if(cl){tk();setInterval(tk,20000);}
var b=document.getElementById('toTop');if(b)b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
var w=document.getElementById('footWord');if(w&&window.matchMedia&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){var ls=[].slice.call(w.children);var cur=ls.map(function(){return 0;});var bx=[],by=[],measured=false;function measure(){bx=[];by=[];ls.forEach(function(l){bx.push(l.offsetLeft+l.offsetWidth/2);by.push(l.offsetTop+l.offsetHeight/2);});measured=true;}var mx=0,my=0,inside=false,raf=0;function loop(){raf=0;if(!measured)measure();var fs=parseFloat(getComputedStyle(w).fontSize)||120;var maxLift=Math.min(70,fs*0.18);var R=fs*1.9+170;var cr=w.getBoundingClientRect();var busy=false,i,n=ls.length;for(i=0;i<n;i++){var cx=cr.left+bx[i],cy=cr.top+by[i];var dx=mx-cx,dy=my-cy;var d=Math.sqrt(dx*dx+dy*dy);var t=inside?Math.max(0,1-d/R):0;t=t*t*(3-2*t);var tgt=t*maxLift;cur[i]+=(tgt-cur[i])*0.18;if(Math.abs(tgt-cur[i])>0.06)busy=true;var ratio=maxLift?cur[i]/maxLift:0;var rot=(dx>0?-1:1)*ratio*4.5;ls[i].style.transition='none';ls[i].style.transform='translate3d(0,'+(-cur[i]).toFixed(2)+'px,0) rotate('+rot.toFixed(2)+'deg)';}if(busy||inside)raf=requestAnimationFrame(loop);}w.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;inside=true;if(!raf)raf=requestAnimationFrame(loop);});w.addEventListener('mouseleave',function(){inside=false;if(!raf)raf=requestAnimationFrame(loop);});window.addEventListener('resize',function(){measured=false;});}})();
/* headings | letters lift toward the cursor (footer wordmark, dialed back) */
(function(){if(!(window.matchMedia&&matchMedia('(pointer:fine)').matches)||(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches))return;function build(h2){var nodes=[].slice.call(h2.childNodes);h2.textContent='';nodes.forEach(function(node){if(node.nodeType===3){node.textContent.split(/(\s+)/).forEach(function(pt){if(pt==='')return;if(/^\s+$/.test(pt)){h2.appendChild(document.createTextNode(' '));return;}var w=document.createElement('span');w.className='word';for(var i=0;i<pt.length;i++){var s=document.createElement('span');s.className='ltr';s.textContent=pt[i];w.appendChild(s);}h2.appendChild(w);});}else if(node.nodeName==='BR'){h2.appendChild(document.createElement('br'));}else if(node.nodeType===1){var el2=node.cloneNode(false);el2.classList.add('word');node.textContent.split('').forEach(function(ch){if(ch===' '){el2.appendChild(document.createTextNode(' '));return;}var s2=document.createElement('span');s2.className='ltr';s2.textContent=ch;el2.appendChild(s2);});h2.appendChild(el2);}else{h2.appendChild(node.cloneNode(true));}});}function attach(h2){if(h2.dataset.att)return;h2.dataset.att='1';var fs=parseFloat(getComputedStyle(h2).fontSize)||40;var maxLift=Math.min(22,fs*0.3);var R=fs*2.6+70;var raf=0,mx=0,my=0;function run(){raf=0;[].forEach.call(h2.querySelectorAll('.ltr'),function(l){var r=l.getBoundingClientRect();var dx=mx-(r.left+r.width/2),dy=my-(r.top+r.height/2);var d=Math.sqrt(dx*dx+dy*dy);var t=Math.max(0,1-d/R);var lift=t*t;l.style.transform='translateY('+(-lift*maxLift).toFixed(1)+'px) rotate('+((dx>0?-1:1)*lift*2).toFixed(2)+'deg)';});}h2.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(run);});h2.addEventListener('mouseleave',function(){[].forEach.call(h2.querySelectorAll('.ltr'),function(l){l.style.transition='transform .55s cubic-bezier(.34,1.56,.64,1)';l.style.transform='';});setTimeout(function(){[].forEach.call(h2.querySelectorAll('.ltr'),function(l){l.style.transition='';});},560);});}[].slice.call(document.querySelectorAll('h2')).forEach(function(h2){build(h2);attach(h2);});window.__omReheadline=function(h2){build(h2);attach(h2);};})();
/* nav | link roll + hide-on-scroll-down */
(function(){var links=[].slice.call(document.querySelectorAll('.nav-pill a'));links.forEach(function(a){var t=a.textContent.trim();a.setAttribute('data-t',t);a.innerHTML='<span class="navtxt">'+t+'</span>';});
var bar=document.querySelector('.topbar');if(bar){var last=0;addEventListener('scroll',function(){var y=window.pageYOffset||document.documentElement.scrollTop||0;if(y>last&&y>260){bar.classList.add('nav-hidden');}else{bar.classList.remove('nav-hidden');}last=y;},{passive:true});}})();
/* testimonials | one pinned stage; cards rise & stack, heading + stack release together */
(function(){var sc=document.querySelector('.rev-scroll');var stack=document.getElementById('revStack');if(!sc||!stack)return;
 var cards=[].slice.call(stack.querySelectorAll('.rcard'));var N=cards.length;if(!N)return;
 if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 /* fan deck: front card upright & centered, the rest splay out behind it around a low pivot */
 var FRONT=N-1,raf=0,fan=[],W=1/N,HOLD=0.55,RISE=0.45;
 (function(){var dpt=[0,0];
  for(var k=N-1;k>=0;k--){
   if(k===FRONT){fan[k]={ang:0,scl:1};continue;}
   var back=N-1-k,side=(back%2===1)?1:-1,si=(side>0)?0:1,d=(++dpt[si]);
   fan[k]={ang:side*5*d,scl:1-0.03*d};}
 })();
 cards.forEach(function(c,i){c.style.zIndex=10+i;});
 function ez(t){return t*t*t*(t*(t*6-15)+10);}
 var vh=1,LIFT=0,sectop=0,travel=1,rp=-1,mob=false;
 function measure(){vh=window.innerHeight||1;LIFT=vh*0.66;sectop=sc.getBoundingClientRect().top+window.pageYOffset;travel=sc.offsetHeight-vh;if(travel<1)travel=1;mob=!!(window.matchMedia&&matchMedia('(max-width:760px)').matches);}
 function render(p){
  for(var i=0;i<N;i++){var f=fan[i],u=(p-i*W)/W,ty,scl,ang,op;
   if(u<0){var r=(u+RISE)/RISE;if(r<0)r=0;if(r>1)r=1;r=ez(r);op=r;ty=LIFT*(1-r);scl=0.94+0.06*r;ang=0;}
   else if(i===FRONT||u<=HOLD){op=1;ty=0;scl=1;ang=0;}
   else{var q=(u-HOLD)/(1-HOLD);if(q<0)q=0;if(q>1)q=1;q=ez(q);op=1;ty=0;scl=1-(1-f.scl)*q;ang=f.ang*q;}
   cards[i].style.opacity=op.toFixed(3);
   cards[i].style.transform='translateY('+ty.toFixed(1)+'px) rotate('+ang.toFixed(2)+'deg) scale('+scl.toFixed(3)+')';}
 }
 function target(){var p=(window.pageYOffset-sectop)/travel;if(p<0)p=0;if(p>1)p=1;return p;}
 function tick(){raf=0;
  if(mob){cards.forEach(function(c){c.style.transform='';c.style.opacity='';});return;}
  var p=target();
  if(rp<0)rp=p;
  rp+=(p-rp)*0.19;
  if(Math.abs(p-rp)<0.0004)rp=p;
  render(rp);
  if(rp!==p)raf=requestAnimationFrame(tick);
 }
 function kick(){if(!raf)raf=requestAnimationFrame(tick);}
 measure();rp=target();if(mob){cards.forEach(function(c){c.style.transform='';c.style.opacity='';});}else render(rp);
 addEventListener('scroll',kick,{passive:true});
 addEventListener('resize',function(){measure();rp=-1;kick();});})();
 /* CTA | live teammate cursor brings the cards in and types the comment */
 (function(){var card=document.querySelector('.cta-card');if(!card)return;
  var cm=card.querySelector('.comment'),nt=card.querySelector('.cta-note'),tx=card.querySelector('.comment .tx');
  if(!cm||!nt||!tx)return;
  if(!(window.matchMedia&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches))return;
  var words=tx.textContent.split(' ');tx.textContent='';
  words.forEach(function(w,i){var sp=document.createElement('span');sp.textContent=w+(i<words.length-1?' ':'');sp.style.transitionDelay=(1.05+i*0.06).toFixed(2)+'s';tx.appendChild(sp);});
  var cur=document.createElement('div');cur.className='cta-cur';
  cur.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6z" fill="#F0531C" stroke="#fff" stroke-width="1.2"/></svg><span class="name">React Bot</span>';
  card.appendChild(cur);card.classList.add('seq');
  if(!('IntersectionObserver' in window)){card.classList.add('played');return;}
  var done=false;var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){if(es[i].isIntersecting&&!done){done=true;card.classList.add('played');io.disconnect();}}},{threshold:0.4});
  io.observe(card);
 })();

/* work alt 02 | featured reel (auto-play + rail + progress) */
(function(){var fc=document.getElementById('fc');if(!fc)return;
 var D=[
   {nm:'StudySync',sub:'A student messaging app built using React & Tailwind.',url:'github.com/alok-gupta/studysync',pv:'pv-tool',tags:['REACT','TAILWIND','2026']},
   {nm:'CustomTkinter Showcase',sub:'A desktop UI showcase app with dynamic styling controls.',url:'github.com/alok-gupta/customtkinter-showcase',pv:'pv-ink',tags:['PYTHON','GUI','2026']},
   {nm:'Myntra Clone',sub:'Pixel-perfect Myntra clone using HTML and CSS Flexbox.',url:'github.com/alok-gupta/myntra-clone',pv:'pv-brand',tags:['HTML','CSS','FLEXBOX']},
   {nm:'LeetCode Solutions',sub:'Direct Python coding solutions for algorithms like 3Sum.',url:'leetcode.com/alok_gupta',pv:'pv-paper',tags:['PYTHON','ALGORITHMS','2026']}
  ];
 var card=document.getElementById('fcCard'),big=document.getElementById('fcBig'),url=document.getElementById('fcUrl'),ix=document.getElementById('fcIx'),nm=document.getElementById('fcNm'),sub=document.getElementById('fcSub'),tags=document.getElementById('fcTags'),meta=fc.querySelector('.fc-meta');
 var items=[].slice.call(fc.querySelectorAll('.fc-item')),cur=0,timer=null,playing=true,DUR=4800;
 function prog(i,run){var p=items[i]&&items[i].querySelector('.fc-prog i');if(!p)return;p.style.transition='none';p.style.width=run?'0%':'100%';void p.offsetWidth;if(run){p.style.transition='width '+DUR+'ms linear';p.style.width='100%';}}
 function fill(i){var d=D[i];cur=i;
  card.className='fc-card '+d.pv;void card.offsetWidth;card.classList.add('in');
  meta.classList.remove('in');void meta.offsetWidth;meta.classList.add('in');
  big.textContent=d.nm;url.textContent=d.url;ix.textContent='0'+(i+1)+' / 0'+D.length;
  nm.textContent=d.nm;sub.textContent=d.sub;
  tags.innerHTML=d.tags.map(function(t){return '<span>'+t+'</span>';}).join('');
  items.forEach(function(it,k){it.classList.toggle('active',k===i);var pp=it.querySelector('.fc-prog i');if(pp&&k!==i){pp.style.transition='none';pp.style.width='0%';}});
  prog(i,playing);
 }
 function next(){fill((cur+1)%D.length);}
 function play(){stop();playing=true;prog(cur,true);timer=setInterval(next,DUR);}
 function stop(){if(timer){clearInterval(timer);timer=null;}}
 items.forEach(function(it){var i=parseInt(it.getAttribute('data-i'),10);
  it.addEventListener('mouseenter',function(){playing=false;stop();fill(i);});
  it.addEventListener('mouseleave',function(){play();});
  it.addEventListener('focus',function(){playing=false;stop();fill(i);});
 });
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){if(!timer&&playing)play();}else{stop();}});},{threshold:.2});io.observe(fc);
 fill(0);
})();


/* footer | dot grid gravity well that follows the cursor */
(function(){var ft=document.querySelector('.foot');if(!ft)return;var cv=document.getElementById('footDots');if(!cv)return;var ctx=cv.getContext&&cv.getContext('2d');if(!ctx)return;
var DPR=Math.min(2,window.devicePixelRatio||1),gap=26,R=180,W=0,H=0,dots=[];
var mx=-9999,my=-9999,tmx=-9999,tmy=-9999,str=0,tstr=0,raf=0;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function build(){var r=ft.getBoundingClientRect();W=Math.ceil(r.width);H=Math.ceil(r.height);if(W<2||H<2)return;cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0);dots=[];for(var y=gap/2;y<H;y+=gap){for(var x=gap/2;x<W;x+=gap){dots.push(x,y);}}draw();}
function draw(){ctx.clearRect(0,0,W,H);for(var i=0;i<dots.length;i+=2){var bx=dots[i],by=dots[i+1],px=bx,py=by,rad=1.1,a=0.07;if(str>0.002){var dx=mx-bx,dy=my-by,d=Math.sqrt(dx*dx+dy*dy);if(d<R){var fwd=1-d/R;fwd=fwd*fwd;var pull=fwd*0.6*str;px=bx+dx*pull;py=by+dy*pull;rad=1.1+fwd*1.7*str;a=0.07+fwd*0.34*str;}}ctx.beginPath();ctx.arc(px,py,rad,0,6.2832);ctx.fillStyle='rgba(255,255,255,'+a.toFixed(3)+')';ctx.fill();}}
function loop(){raf=0;mx+=(tmx-mx)*0.2;my+=(tmy-my)*0.2;str+=(tstr-str)*0.12;draw();if(Math.abs(tstr-str)>0.004||str>0.004&&(Math.abs(tmx-mx)>0.4||Math.abs(tmy-my)>0.4))raf=requestAnimationFrame(loop);}
if(!reduce){ft.addEventListener('mousemove',function(e){var r=ft.getBoundingClientRect();tmx=e.clientX-r.left;tmy=e.clientY-r.top;if(str<0.02){mx=tmx;my=tmy;}tstr=1;if(!raf)raf=requestAnimationFrame(loop);});
ft.addEventListener('mouseleave',function(){tstr=0;if(!raf)raf=requestAnimationFrame(loop);});}
build();window.addEventListener('load',build);if(window.ResizeObserver){new ResizeObserver(build).observe(ft);}else{window.addEventListener('resize',build);}})();

/* about bento | make each card a selectable Figma layer (handles + name tab) */
(function(){var names={'c-stmt':'studio','c-stats':'metrics','c-skills':'skills','c-now':'now-playing','c-quote':'review','c-photo':'craft'};
[].slice.call(document.querySelectorAll('.bento .cell')).forEach(function(c){
 c.classList.add('sel');
 if(!c.querySelector('.h')){['tl','tr','bl','br'].forEach(function(p){var s=document.createElement('span');s.className='h '+p;c.appendChild(s);});}
 var key=Object.keys(names).filter(function(k){return c.classList.contains(k);})[0];
 if(key&&!c.querySelector('.layer-tab')){var t=document.createElement('span');t.className='layer-tab';t.innerHTML='<i></i>'+names[key];c.appendChild(t);}
});})();

/* === Inline Script 2 === */
(function(){
 if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var btn=document.getElementById('dropBtn'),stage=document.getElementById('dropStage');if(!btn||!stage)return;var btnT=btn.querySelector('.dbt'),labEl=document.querySelector('#dropfun .df-lab');
 var M=Matter,engine=null,render=null,runner=null,bodies=[],CAP=180,started=false,fadingAll=false,taps=0,gflip=false,walkers=[],rafId=null,last=0,actx=null;
 var COLORS=['#F0531C','#0D99FF','#FFFFFF','#14202B','#FFE0CC'];
 var HEARTS=[];
 var STARS=['#F0531C','#0D99FF','#FFD23F','#FFFFFF'];
 function tex(svg){return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);}
 
 function starSVG(c){return "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M50 6 L61 38 95 38 67 58 78 90 50 70 22 90 33 58 5 38 39 38 Z' fill='"+c+"'/></svg>";}
 function spriteBody(x,y,r,svg){var b=M.Bodies.circle(x,y,r,{restitution:0.5,friction:0.35,frictionAir:0.004});b.render.sprite.texture=tex(svg);var sc=(2*r)/100;b.render.sprite.xScale=sc;b.render.sprite.yScale=sc;return b;}
 var LIFE=6500;
 function fade(){if(!engine)return;var now=Date.now();for(var i=bodies.length-1;i>=0;i--){var bb=bodies[i];if(fadingAll||now-(bb._born||now)>LIFE){var dec=fadingAll?0.06:0.045;var o=(bb.render.opacity==null?1:bb.render.opacity)-dec;bb.render.opacity=o;if(o<=0.05){M.World.remove(engine.world,bb);bodies.splice(i,1);}}}}
 function W(){return window.innerWidth;}function H(){return window.innerHeight;}
 var walls=[];
 function buildWalls(){if(walls.length){M.World.remove(engine.world,walls);walls=[];}var t=140;walls=[M.Bodies.rectangle(W()/2,H()+t/2,W()+400,t,{isStatic:true}),M.Bodies.rectangle(-t/2,H()/2,t,H()*3,{isStatic:true}),M.Bodies.rectangle(W()+t/2,H()/2,t,H()*3,{isStatic:true})];M.World.add(engine.world,walls);}
 function opts(col){return {restitution:0.45,friction:0.4,frictionAir:0.004,render:{fillStyle:col,strokeStyle:'rgba(20,32,43,0.16)',lineWidth:1}};}
 var CHIPWORDS=['Python','React','C Language','SQL','BCA S2','StudySync','CustomTkinter','LeetCode','3Sum','SQLite3','SQLAlchemy','HTML & CSS','Flexbox','YouTube','GitHub','Figma','Git Commit','ORM','Tailwind','GUI App','Tkinter','Variables','Code Live','Run it!'];
 var CHIPBG=['#F0531C','#0D99FF','#14202B','#FFFFFF'];
 function esc(t){return (''+t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
 function chipBody(x,y){var label=CHIPWORDS[Math.floor(Math.random()*CHIPWORDS.length)];var bg=CHIPBG[Math.floor(Math.random()*CHIPBG.length)];var fg=(bg==='#FFFFFF')?'#14202B':'#FFFFFF';var h=34,ch=8.6,pad=15;var w=Math.max(58,Math.round(label.length*ch+pad*2));var R=h/2;var stroke=(bg==='#FFFFFF')?'rgba(20,32,43,0.18)':'rgba(255,255,255,0.16)';var svg="<svg xmlns='http://www.w3.org/2000/svg' width='"+(w*2)+"' height='"+(h*2)+"' viewBox='0 0 "+w+" "+h+"'><rect x='0.75' y='0.75' width='"+(w-1.5)+"' height='"+(h-1.5)+"' rx='"+(R-0.75)+"' fill='"+bg+"' stroke='"+stroke+"'/><text x='"+(w/2)+"' y='"+(h/2+1)+"' font-family='Outfit,Arial,sans-serif' font-size='15' font-weight='700' fill='"+fg+"' text-anchor='middle' dominant-baseline='central'>"+esc(label)+"</text></svg>";var b=M.Bodies.rectangle(x,y,w,h,{restitution:0.5,friction:0.35,frictionAir:0.004,chamfer:{radius:R}});b.render.sprite.texture=tex(svg);b.render.sprite.xScale=0.5;b.render.sprite.yScale=0.5;return b;}
 function react(){var bl='Do not click';if(taps>=30)bl='Make it stop';else if(taps>=22)bl='Touch grass';else if(taps>=15)bl='Unbothered. Moisturized.';else if(taps>=10)bl='No further questions';else if(taps>=6)bl='This is your job now';else if(taps>=3)bl='Oh, you are committed';else if(taps>=1)bl='Again';if(btnT)btnT.textContent=bl;}
 function flipGravity(){if(!engine||gflip)return;gflip=true;engine.world.gravity.y=-1.1;for(var i=0;i<bodies.length;i++){M.Body.setVelocity(bodies[i],{x:(Math.random()-0.5)*6,y:-7-Math.random()*5});M.Body.setAngularVelocity(bodies[i],(Math.random()-0.5)*0.5);}setTimeout(function(){if(engine)engine.world.gravity.y=1;gflip=false;},900);}
 var EMO=['🦆','🐥','🐢','🦖','🐌','🐹','🐸','🦦','🦔','🐔','🦩','🐙','🦥','🐱','🐶','🦫','🐤','🦀','🍕','🍩','👻','🤖'];
 function pickEmo(){return EMO[Math.floor(Math.random()*EMO.length)];}
 function setFace(k){k.flip.style.transform=k.dir<0?'scaleX(-1)':'none';}
 function squash(k){k.body.classList.remove('bumped');void k.body.offsetWidth;k.body.classList.add('bumped');setTimeout(function(){k.body.classList.remove('bumped');},340);}
 function mark(k){var W=['hey!','rude!','stop that','do you mind?','quit it','excuse you','ow!','personal space!','not cool','HEY','knock it off','what?!','ugh','stop poking me','squawk!','oi!','beep!','eep!'];var m=document.createElement('span');m.className='bump-mk';m.textContent=W[Math.floor(Math.random()*W.length)];k.wrap.appendChild(m);setTimeout(function(){if(m.parentNode)m.parentNode.removeChild(m);},620);}
 function blip(){try{if(!actx){actx=new (window.AudioContext||window.webkitAudioContext)();}if(actx.state==='suspended'){actx.resume();}var t=actx.currentTime,o=actx.createOscillator(),gn=actx.createGain(),base=300+Math.random()*520;o.type=(Math.random()<0.5?'square':'triangle');o.frequency.setValueAtTime(base,t);o.frequency.exponentialRampToValueAtTime(base*(1.5+Math.random()*0.8),t+0.09);gn.gain.setValueAtTime(0.0001,t);gn.gain.exponentialRampToValueAtTime(0.07,t+0.012);gn.gain.exponentialRampToValueAtTime(0.0001,t+0.2);o.connect(gn);gn.connect(actx.destination);o.start(t);o.stop(t+0.22);}catch(e){}}
 function poke(k){if(k.dead)return;mark(k);squash(k);blip();k.bumpUntil=(window.performance&&performance.now?performance.now():Date.now())+170;}
 
 function fadeOut(k){if(k.leaving)return;k.leaving=true;k.wrap.style.transition='opacity .55s ease';k.wrap.style.opacity='0';setTimeout(function(){k.dead=true;},560);}
 function loop(ts){var vw=window.innerWidth,i,a,b;if(!last)last=ts;var dt=Math.min(50,ts-last)/1000;last=ts;
  for(i=0;i<walkers.length;i++){var k=walkers[i];if(ts>=k.bumpUntil){k.x+=k.dir*k.speed*dt;}k.phase+=dt*9;var bob=Math.sin(k.phase)*2.5;k.wrap.style.transform='translate('+k.x+'px,'+(k.y0+bob)+'px) rotate('+(Math.sin(k.phase)*6)+'deg)';if(!k.leaving&&ts-k.born>14000){fadeOut(k);}if((k.dir>0&&k.x>vw+k.w+90)||(k.dir<0&&k.x<-k.w-170)){k.dead=true;}}
  
  for(i=walkers.length-1;i>=0;i--){if(walkers[i].dead){if(walkers[i].wrap.parentNode)walkers[i].wrap.parentNode.removeChild(walkers[i].wrap);walkers.splice(i,1);}}
  if(walkers.length){rafId=requestAnimationFrame(loop);}else{rafId=null;last=0;}}
 function spawnCapy(){var vw=window.innerWidth,vh=window.innerHeight;var dir=Math.random()<0.5?1:-1;var wpx=52+Math.random()*40;var hpx=wpx;var y0=vh*(0.34+Math.random()*0.42);var g=Math.random()<0.32;var wrap=document.createElement('div');wrap.className='capy';wrap.style.width=wpx+'px';var flip=document.createElement('div');flip.className='cflip';var body=document.createElement('div');body.className='cbody';body.textContent=pickEmo();body.style.fontSize=wpx+'px';flip.appendChild(body);wrap.appendChild(flip);stage.appendChild(wrap);var x=dir>0?(-wpx-40):(vw+40);var k={wrap:wrap,flip:flip,body:body,x:x,y0:y0,w:wpx,h:hpx,dir:dir,speed:62+Math.random()*72,phase:Math.random()*6,bumpUntil:0,born:(window.performance&&performance.now?performance.now():Date.now()),dead:false,leaving:false};setFace(k);wrap.style.transform='translate('+x+'px,'+y0+'px)';wrap.addEventListener('click',function(){poke(k);});wrap.addEventListener('touchstart',function(){poke(k);},{passive:true});walkers.push(k);if(walkers.length>18){fadeOut(walkers[0]);}if(!rafId){last=0;rafId=requestAnimationFrame(loop);}}
 function start(){if(started)return;started=true;engine=M.Engine.create();engine.world.gravity.y=1;render=M.Render.create({element:stage,engine:engine,options:{width:W(),height:H(),background:'transparent',wireframes:false,pixelRatio:window.devicePixelRatio||1}});buildWalls();runner=M.Runner.create();M.Runner.run(runner,engine);M.Render.run(render);M.Events.on(engine,'afterUpdate',fade);window.addEventListener('resize',function(){render.options.width=W();render.options.height=H();render.canvas.width=W()*(window.devicePixelRatio||1);render.canvas.height=H()*(window.devicePixelRatio||1);M.Render.lookAt(render,{min:{x:0,y:0},max:{x:W(),y:H()}});buildWalls();});}
 function rain(){taps++;spawnCapy();if(Math.random()<0.4){setTimeout(spawnCapy,220+Math.random()*420);}react();}
 btn.addEventListener('click',rain);
 var sect=document.getElementById('dropfun');
 if(sect&&('IntersectionObserver' in window)){var io2=new IntersectionObserver(function(es){fadingAll=!es[0].isIntersecting;},{threshold:0});io2.observe(sect);}
})();

/* === Inline Script 3 === */
/* the-difference: hover-link each problem to its fix */
(function(){
  var them=[].slice.call(document.querySelectorAll('.diff-them .diff-list li'));
  var us=[].slice.call(document.querySelectorAll('.diff-us .diff-list li'));
  if(!them.length||!us.length)return;
  function link(i,on){if(them[i])them[i].classList.toggle('struck',on);if(us[i])us[i].classList.toggle('hot',on);}
  function wire(arr){arr.forEach(function(li,i){li.style.pointerEvents='auto';li.addEventListener('mouseenter',function(){link(i,true);});li.addEventListener('mouseleave',function(){link(i,false);});});}
  wire(them);wire(us);
})();

/* === Inline Script 4 === */
/* orange buttons: magnetic chip-morph */
(function(){
  if(!(window.matchMedia&&matchMedia('(pointer:fine)').matches))return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  function clamp(v,m){return Math.max(-m,Math.min(m,v));}
  [].slice.call(document.querySelectorAll('.btn:not(.ghost):not(.df-btn)')).forEach(function(b){
    var lx=0,ly=0,pressed=false;
    function render(){b.style.transform='translate('+lx.toFixed(1)+'px,'+ly.toFixed(1)+'px)'+(pressed?' scale(.96)':'');}
    b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();lx=clamp((e.clientX-r.left-r.width/2)*0.28,14);ly=clamp((e.clientY-r.top-r.height/2)*0.4,10);render();});
    b.addEventListener('pointerleave',function(){lx=0;ly=0;pressed=false;b.style.transform='';});
    b.addEventListener('pointerdown',function(){pressed=true;render();});
    window.addEventListener('pointerup',function(){if(pressed){pressed=false;render();}});
  });
})();

/* === Inline Script 5 === */


/* === Inline Script 6 === */
(function(){
  var el=document.getElementById('typeWord'); if(!el) return;
  var words=['designs','brands','ads','websites','launches'];
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){ el.textContent=words[0]; return; }
  var wi=0,ci=words[0].length,del=true;
  function tick(){
    var w=words[wi];
    if(!del){ ci++; el.textContent=w.slice(0,ci);
      if(ci>=w.length){ del=true; return setTimeout(tick,1500); }
      return setTimeout(tick,78+Math.random()*55);
    }
    ci--; el.textContent=w.slice(0,ci);
    if(ci<=0){ del=false; wi=(wi+1)%words.length; return setTimeout(tick,260); }
    setTimeout(tick,42);
  }
  setTimeout(tick,1600);
})();
(function(){
  var base=document.getElementById('stretchWord'); if(!base) return;
  if(!matchMedia('(pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var L=[].slice.call(base.querySelectorAll('.rl'));
  var st=L.map(function(){return {s:1};}), C=[];
  function measure(){ C=L.map(function(el){var r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,w:el.offsetWidth};}); }
  measure(); addEventListener('resize',measure); addEventListener('scroll',measure,{passive:true});
  var mx=-9999,my=-9999,on=false,R=240, hero=document.querySelector('.hero'), chip=document.getElementById('stretchVal');
  if(!hero) return;
  hero.addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;on=true;});
  hero.addEventListener('pointerleave',function(){on=false;});
  function frame(){
    var peak=1,i,extra=[],T=0;
    for(i=0;i<L.length;i++){
      var ts=1,c=C[i];
      if(on&&c){ var dx=mx-c.x,dy=my-c.y,d=Math.sqrt(dx*dx+dy*dy),inf=Math.max(0,1-d/R); inf*=inf; ts=1+inf*0.40; }
      var s=st[i]; s.s+=(ts-s.s)*0.16;
      if(s.s>peak)peak=s.s;
      var ex=(c?c.w:0)*(s.s-1); extra[i]=ex; T+=ex;
    }
    var run=0;
    for(i=0;i<L.length;i++){
      var tx=run+extra[i]/2-T/2;
      L[i].style.transform='translateX('+tx.toFixed(2)+'px) scaleX('+st[i].s.toFixed(3)+')';
      run+=extra[i];
    }
    if(chip) chip.textContent=Math.round(peak*100)+'%';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* === Inline Script 7 === */
(function(){
 var hb=document.querySelector('.hero-bg'),art=document.querySelector('.hb-art'); if(!art||!hb) return;
 function lit(){art.classList.add('lit');}
 if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){requestAnimationFrame(lit);});}
 setTimeout(lit,500);
 var hero=document.querySelector('.hero');
 var grid=document.querySelector('.hb-grid'),far=document.querySelector('.pl-far'),near=document.querySelector('.pl-near');
 var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
 if(!hero||!fine) return;
 var tcx=0,tcy=0,cx=0,cy=0,raf=null;
 function tick(){raf=null;cx+=(tcx-cx)*0.08;cy+=(tcy-cy)*0.08;if(!reduce){if(grid)grid.style.transform='translate('+(cx*-10)+'px,'+(cy*-10)+'px)';if(far)far.style.transform='translate('+(cx*-17)+'px,'+(cy*-17)+'px)';if(near)near.style.transform='translate('+(cx*-32)+'px,'+(cy*-32)+'px)';}if(Math.abs(tcx-cx)>0.0008||Math.abs(tcy-cy)>0.0008)raf=requestAnimationFrame(tick);}
 hero.addEventListener('pointermove',function(e){tcx=(e.clientX/innerWidth-0.5);tcy=(e.clientY/innerHeight-0.5);hb.style.setProperty('--mx',e.clientX+'px');hb.style.setProperty('--my',e.clientY+'px');hb.classList.add('cursoron');if(raf===null)raf=requestAnimationFrame(tick);});
 hero.addEventListener('pointerleave',function(){tcx=0;tcy=0;hb.classList.remove('cursoron');if(raf===null)raf=requestAnimationFrame(tick);});
})();

/* === Inline Script 8 === */
(function(){
 var cv=document.getElementById('phPc');if(!cv)return;var ctx=cv.getContext('2d');
 var W=0,H=0,dpr=1,particles=[],mouse={x:-9999,y:-9999},fine=matchMedia('(pointer:fine)').matches;
 var cols=['#F0531C','#F0531C','#F0531C','#14202B','#0D99FF'],PSIZE=2.9;
 function size(){dpr=Math.min(window.devicePixelRatio||1,2);var r=cv.getBoundingClientRect();W=Math.max(1,r.width);H=Math.max(1,r.height);cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
 function build(){
  var off=document.createElement('canvas');off.width=W;off.height=H;var o=off.getContext('2d');
  o.fillStyle='#000';o.textAlign='center';o.textBaseline='middle';
  var lines=['ALOK','GUPTA .'];
  o.font='700 100px Anton, sans-serif';var w100=1;for(var wi=0;wi<lines.length;wi++){w100=Math.max(w100,o.measureText(lines[wi]).width);}var fs=Math.min(W*0.9/w100*100,H*0.46);
  o.font='700 '+fs+'px Anton, sans-serif';
  
  
  var lh=fs*0.92;
  o.fillText(lines[0],W/2,H/2-lh/2);
  o.fillText(lines[1],W/2,H/2+lh/2);
  var data=o.getImageData(0,0,W,H).data,targets=[],step=Math.max(2,Math.min(3,Math.round(fs/47)));PSIZE=Math.max(2.2,Math.min(2.55,fs/72));
  for(var y=0;y<H;y+=step){for(var x=0;x<W;x+=step){if(data[(y*W+x)*4+3]>128)targets.push(x+ (y<<16));}}
  var np=[];
  for(var k=0;k<targets.length;k++){var tx=targets[k]&0xffff,ty=targets[k]>>16;var pt=particles[k]||{x:Math.random()*W,y:Math.random()*H,vx:0,vy:0,c:cols[k%cols.length]};pt.tx=tx;pt.ty=ty;np.push(pt);}
  particles=np;
 }
 function frame(){
  ctx.clearRect(0,0,W,H);
  var R=92;
  for(var i=0;i<particles.length;i++){var p=particles[i];
   var ax=(p.tx-p.x)*0.02,ay=(p.ty-p.y)*0.02;
   if(fine){var dx=p.x-mouse.x,dy=p.y-mouse.y,d2=dx*dx+dy*dy;if(d2<R*R){var d=Math.sqrt(d2)||1,f=(R-d)/R*4.5;ax+=dx/d*f;ay+=dy/d*f;}}
   p.vx=(p.vx+ax)*0.86;p.vy=(p.vy+ay)*0.86;p.x+=p.vx;p.y+=p.vy;
   ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,PSIZE,PSIZE);
  }
  requestAnimationFrame(frame);
 }
 function init(){size();build();}
 cv.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
 cv.addEventListener('pointerleave',function(){mouse.x=-9999;mouse.y=-9999;});
 var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(init,200);});
 function start(){if(matchMedia('(max-width:680px)').matches)return;init();requestAnimationFrame(frame);}
 if(document.fonts&&document.fonts.load){document.fonts.load('700 100px Anton').then(function(){return document.fonts.ready;}).then(start).catch(start);}else{start();}
})();

/* === Inline Script 9 === */
(function(){var sub=document.getElementById("phSub");if(!sub)return;if(!(window.matchMedia&&matchMedia("(pointer:fine)").matches))return;var meas=document.getElementById("phMeas"),mL=document.getElementById("phMeasL"),mLbl=document.getElementById("phMeasLbl");var LINES=["i saw that.","caught you, pixel thief.","i am literally watching you.","bold move. absolutely not.","nice try lol, it stays.","yep, still watching. put it back."];var bi=0,busy=false,ghost=null;function mkGhost(){if(ghost)return ghost;ghost=document.createElement("div");ghost.id="phGhost";ghost.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 3l14 7-6 2-2 6z" fill="#F0531C" stroke="#fff" stroke-width="1.3"/></svg><span class="phg-stack"><span class="phg-name">Vishal</span><span class="phg-cmt"></span></span>';document.body.appendChild(ghost);return ghost;}sub.addEventListener("pointerdown",function(e){if(busy)return;if(e.target.closest("a"))return;e.preventDefault();sub.style.transition="none";sub.classList.add("dragging");try{sub.setPointerCapture(e.pointerId);}catch(_){}var r=sub.getBoundingClientRect(),hx=r.left+r.width/2,hy=r.top+r.height/2;mL.setAttribute("x1",hx);mL.setAttribute("y1",hy);mL.setAttribute("x2",hx);mL.setAttribute("y2",hy);meas.classList.add("show");mLbl.classList.add("show");var sx=e.clientX,sy=e.clientY,dx=0,dy=0,moved=false;function mv(ev){dx=ev.clientX-sx;dy=ev.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;sub.style.transform="translate("+dx+"px,"+dy+"px)";var x2=hx+dx,y2=hy+dy;mL.setAttribute("x2",x2);mL.setAttribute("y2",y2);mLbl.style.left=x2+"px";mLbl.style.top=y2+"px";mLbl.textContent="dx: "+Math.round(dx)+", dy: "+Math.round(dy);}function up(ev){try{sub.releasePointerCapture(ev.pointerId);}catch(_){}sub.classList.remove("dragging");sub.removeEventListener("pointermove",mv);sub.removeEventListener("pointerup",up);meas.classList.remove("show");mLbl.classList.remove("show");if(!moved){sub.style.transition="";sub.style.transform="";return;}busy=true;sub.style.transition="none";var rr=sub.getBoundingClientRect();var gx=rr.left+rr.width*0.60,gy=rr.top+rr.height*0.58;var gx0=gx-dx,gy0=gy-dy;var g=mkGhost();var lbl=g.querySelector(".phg-cmt");if(lbl)lbl.textContent=LINES[bi%LINES.length];bi++;g.style.transition="none";g.style.left=(gx+82)+"px";g.style.top=(gy+70)+"px";g.style.opacity="0";void g.offsetWidth;g.style.transition="left .4s cubic-bezier(.3,0,.2,1),top .4s cubic-bezier(.3,0,.2,1),opacity .25s";g.style.left=gx+"px";g.style.top=gy+"px";g.style.opacity="1";setTimeout(function(){sub.style.transition="transform .62s cubic-bezier(.4,0,.2,1)";sub.style.transform="translate(0px,0px)";g.style.transition="left .62s cubic-bezier(.4,0,.2,1),top .62s cubic-bezier(.4,0,.2,1),opacity .25s";g.style.left=gx0+"px";g.style.top=gy0+"px";},900);setTimeout(function(){sub.style.transition="";sub.style.transform="";},1660);setTimeout(function(){g.style.opacity="0";},2400);setTimeout(function(){busy=false;},2700);}sub.addEventListener("pointermove",mv);sub.addEventListener("pointerup",up);});})();

/* === Inline Script 10 === */
/* om-tab-away */(function(){var lines=["hey, where are you going?","come back, we were talking.","this tab misses you.","still here, still better.","build impossible things, remember?","ok, come back now."];var real=document.title,i=0,t=null;function nxt(){document.title=lines[i%lines.length];i++;}document.addEventListener("visibilitychange",function(){if(document.hidden){i=0;nxt();t=setInterval(nxt,2800);}else{if(t){clearInterval(t);t=null;}document.title=real;}});})();

/* === Inline Script 11 === */
(function(){var w=document.getElementById('waFloat');if(!w)return;var closed=false;
 w.querySelector('.wa-x').addEventListener('click',function(e){e.preventDefault();closed=true;w.classList.remove('show');w.style.display='none';});
 function s(){if(closed)return;var d=document.documentElement;var p=d.scrollTop/((d.scrollHeight-d.clientHeight)||1);w.classList.toggle('show',p>0.25);}
 addEventListener('scroll',s,{passive:true});s();})();
/* df-h2 hover unified with site letter-hover engine */

/* === Inline Script 12 === */
/* services horizontal scroll (isolated + robust) */
(function(){
  var sec=document.querySelector('.sv-story');
  if(sec){
    var track=sec.querySelector('.sv-track');
    function loop(){
      var rect=sec.getBoundingClientRect();
      var travel=sec.offsetHeight-window.innerHeight;
      var pr= travel>0 ? Math.max(0,Math.min(1,-rect.top/travel)) : 0;
      var max=track.scrollWidth-window.innerWidth;
      track.style.transform='translateX('+(-(pr*max)).toFixed(2)+'px)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  document.querySelectorAll('.sv-toggle').forEach(function(t){
    t.addEventListener('click',function(){var d=t.closest('.sv-drop');if(d)d.classList.toggle('sv-open');});
  });
})();

/* === Inline Script 13 === */
(function(){
var BASE=["React & Web App development","CSS Flexbox & Tailwind Styling","Pixel-Perfect Website Clones","Responsive layouts (Desktop/Mobile)","JavaScript interactivity & state","GitHub documentation & clean code","YouTube project walkthroughs"];
var DEVX=["Python desktop GUIs (CustomTkinter)","SQLite3 & SQLAlchemy ORM databases","C programming logic & algorithms","LeetCode problem solving (Python)","API integrations & backend routing","Database schemas & queries (SQL)"];
var PLANS={design:{amt:"15,000",was:"₹20,000",name:"Frontend & React",req:"Perfect for web designs & clones"},dev:{amt:"25,000",was:"₹35,000",name:"Full-Stack & Python",req:"React, Python GUIs & Databases"}};
function fLi(x){return '<li><span class="mk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span><span>'+x+'</span></li>';}
var root=document.getElementById('lp-root');var $=function(s){return root.querySelector(s);};
$('.feats-base').innerHTML=BASE.map(fLi).join('');
$('.feats-dev').innerHTML=DEVX.map(fLi).join('');
(function(){var feats=[].slice.call(root.querySelectorAll('.feats-base li,.feats-dev li'));if(!feats.length)return;feats.forEach(function(li){li.style.pointerEvents='auto';});var cur=null;function hit(x,y){for(var i=0;i<feats.length;i++){var r=feats[i].getBoundingClientRect();if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom)return feats[i];}return null;}document.addEventListener('mousemove',function(e){var el=hit(e.clientX,e.clientY);if(el===cur)return;if(cur)cur.classList.remove('hot');cur=el;if(cur)cur.classList.add('hot');},{passive:true});document.addEventListener('mouseleave',function(){if(cur){cur.classList.remove('hot');cur=null;}});})();
var track=$('.track'),fill=$('.fill'),handle=$('.handle'),amt=$('.amt'),was=$('.was'),pnm=$('.pnm'),ea=$('.ea'),eb=$('.eb'),unlock=$('.unlock'),ultxt=$('.ul-txt'),fdev=$('.feats-dev');
var pos=0;
function setUnlock(dev){fdev.classList.toggle('unlocked',dev);unlock.classList.toggle('open',dev);track.classList.toggle('crossed',dev);ultxt.textContent=dev?'Design + Dev unlocked':'Unlocks with Design + Dev';}
function apply(){var dev=pos===1,p=dev?PLANS.dev:PLANS.design;
  amt.style.opacity=0;setTimeout(function(){amt.textContent=p.amt;amt.style.opacity=1;},130);
  was.textContent=p.was;pnm.textContent=p.name;fill.style.width=dev?'100%':'52%';
  var tw=track.clientWidth-handle.offsetWidth-10;handle.style.transform='translateX('+(dev?tw:0)+'px)';
  ea.classList.toggle('on',!dev);eb.classList.toggle('on',dev);
  $('.hsum-req').textContent=p.req;$('.hsum-cnt').textContent=(dev?14:8)+' things';
  setUnlock(dev);
}
apply();
ea.addEventListener('click',function(){pos=0;apply();});eb.addEventListener('click',function(){pos=1;apply();});
track.addEventListener('click',function(e){var r=track.getBoundingClientRect();pos=(e.clientX-r.left)>r.width/2?1:0;apply();});
var drag=false;
handle.addEventListener('pointerdown',function(e){drag=true;handle.style.transition='none';fill.style.transition='none';handle.setPointerCapture(e.pointerId);e.stopPropagation();});
handle.addEventListener('pointermove',function(e){if(!drag)return;var r=track.getBoundingClientRect();var tw=track.clientWidth-handle.offsetWidth-10;var x=Math.max(0,Math.min(tw,e.clientX-r.left-handle.offsetWidth/2));handle.style.transform='translateX('+x+'px)';var w=52+(x/tw)*48;fill.style.width=w+'%';setUnlock(w>76);});
handle.addEventListener('pointerup',function(e){if(!drag)return;drag=false;handle.style.transition='';fill.style.transition='';var r=track.getBoundingClientRect();pos=(e.clientX-r.left)>r.width/2?1:0;apply();});
window.addEventListener('resize',apply);


})();

/* === Inline Script 14 === */
(function(){
  document.querySelectorAll('.fx-qa .fx-head').forEach(function(btn){
    var qa=btn.closest('.fx-qa'),card=qa.querySelector('.fx-card'),dim=qa.querySelector('[data-dim]');
    btn.addEventListener('click',function(){
      var open=qa.classList.contains('on');
      document.querySelectorAll('.fx-qa.on').forEach(function(o){o.classList.remove('on');o.querySelector('.fx-head').setAttribute('aria-expanded','false');});
      if(!open){qa.classList.add('on');btn.setAttribute('aria-expanded','true');
        setTimeout(function(){var r=card.getBoundingClientRect();dim.textContent=Math.round(r.width)+' \u00d7 '+Math.round(r.height);},420);}
    });
  });
})();

/* === Inline Script 15 === */
(function(){function pad(n){return(n<10?"0":"")+n;}function istHM(){var m=Date.now()+19800000;return pad(Math.floor(m/3600000)%24)+":"+pad(Math.floor(m/60000)%60);}function istHour(){return Math.floor((Date.now()+19800000)/3600000)%24;}function ray(list){return list.map(function(a){var r=a*Math.PI/180;return "<line x1=\""+(60+37*Math.cos(r)).toFixed(1)+"\" y1=\""+(60+37*Math.sin(r)).toFixed(1)+"\" x2=\""+(60+50*Math.cos(r)).toFixed(1)+"\" y2=\""+(60+50*Math.sin(r)).toFixed(1)+"\"/>";}).join("");}var SUN='<svg viewBox="0 0 120 120" width="112" height="112" class="float"><circle cx="60" cy="60" r="25" fill="#F0531C"/><g stroke="#F0531C" stroke-width="5" stroke-linecap="round">'+ray([0,45,90,135,180,225,270,315])+'</g></svg>';var MOON='<svg viewBox="0 0 120 120" width="108" height="108" class="float"><path d="M82 60a32 32 0 1 1-32-32 26 26 0 0 0 32 32z" fill="#14202B"/><circle cx="92" cy="34" r="2.6" fill="#14202B"/><circle cx="80" cy="20" r="1.8" fill="#14202B"/><circle cx="100" cy="52" r="1.8" fill="#14202B"/></svg>';function horizon(rays,sunY){return '<svg viewBox="0 0 140 110" width="150" height="112"><g stroke="#F0531C" stroke-width="4" stroke-linecap="round">'+rays.map(function(a){var r=a*Math.PI/180;return "<line x1=\""+(70+30*Math.cos(r)).toFixed(1)+"\" y1=\""+(sunY+30*Math.sin(r)).toFixed(1)+"\" x2=\""+(70+42*Math.cos(r)).toFixed(1)+"\" y2=\""+(sunY+42*Math.sin(r)).toFixed(1)+"\"/>";}).join("")+'</g><circle cx="70" cy="'+sunY+'" r="23" fill="#F0531C"/><rect x="6" y="'+(sunY+2)+'" width="128" height="34" fill="#A6D6F3"/><line x1="8" y1="'+(sunY+2)+'" x2="132" y2="'+(sunY+2)+'" stroke="#14202B" stroke-width="3" stroke-linecap="round"/></svg>';}var DAWN=horizon([200,225,250,290,315,340],84);var DUSK=horizon([200,235,270,305,340],78);var ST={dawn:{hl:'First coffee,<br>then <span class="o">you.</span>',tape:"sunrise in india",glyph:DAWN,sub:"It\u2019s {t} at the studio. We\u2019re booting up, and your idea is first in line.",cta:"Talk with us"},day:{hl:'So are <span class="o">we.</span>',tape:"the sun\u2019s up in india",glyph:SUN,sub:"It\u2019s {t} at the studio. Perfect light for building, so send it over.",cta:"Talk with us"},dusk:{hl:'Still <span class="o">building.</span>',tape:"golden hour in india",glyph:DUSK,sub:"It\u2019s {t} at the studio. The best ideas always seem to land about now.",cta:"Talk with us"},night:{hl:'Ideas don\u2019t <span class="o">sleep.</span>',tape:"it\u2019s late in india",glyph:MOON,sub:"It\u2019s {t} at the studio. Leave your idea, we\u2019ll grab it at dawn.",cta:"Leave your idea"}};function stateFor(h){if(h>=5&&h<8)return"dawn";if(h>=8&&h<17)return"day";if(h>=17&&h<20)return"dusk";return"night";}var head=document.getElementById("dnHead"),tape=document.getElementById("dnTape"),glyph=document.getElementById("dnGlyph"),sub=document.getElementById("dnSub"),cta=document.getElementById("dnCta"),cur=null;if(!head)return;function apply(){var k=stateFor(istHour()),v=ST[k];if(k!==cur){cur=k;head.innerHTML=v.hl;if(window.__omReheadline)window.__omReheadline(head);tape.textContent=v.tape;glyph.innerHTML=v.glyph;cta.textContent=v.cta;}sub.innerHTML=v.sub.replace("{t}","<b>"+istHM()+"</b>");}apply();setInterval(apply,1000);})();

/* === Inline Script 16 === */
/* figma-draw card loop */
(function(){var stage=document.querySelector(".c-photo .fd-stage");if(!stage)return;var art=stage.querySelector(".fd-art"),cur=stage.querySelector(".fd-curs"),flab=stage.querySelector(".fd-flab"),dim=stage.querySelector(".fd-dim"),rip=stage.querySelector(".fd-rip"),guide=stage.querySelector(".fd-guide"),gapb=stage.querySelector(".fd-gapb"),eb=stage.querySelector(".fd-eyeb"),lns=stage.querySelectorAll(".fd-ln"),ln1=lns[0],ln2=lns[1],cta=stage.querySelector(".fd-cta");function rel(el){var a=el.getBoundingClientRect(),c=stage.getBoundingClientRect();return{l:a.left-c.left,t:a.top-c.top,r:a.right-c.left,b:a.bottom-c.top,w:a.width,h:a.height};}var timers=[],token=0;function clr(){eb.classList.remove("in");ln1.classList.remove("in");ln2.classList.remove("in");cta.classList.remove("in");guide.style.opacity="0";gapb.style.opacity="0";}function after(ms,fn){var my=token;timers.push(setTimeout(function(){if(my===token)fn();},ms));}function countTo(){var my=token,t0=performance.now(),dur=980;(function c(){if(my!==token)return;var pp=Math.min(1,(performance.now()-t0)/dur);var e=1-Math.pow(1-pp,3);dim.innerHTML=Math.round(40+e*320)+" \u00d7 "+Math.round(30+e*210);if(pp<1)requestAnimationFrame(c);})();}function statc(){art.style.width="84%";art.style.height="72%";eb.classList.add("in");ln1.classList.add("in");ln2.classList.add("in");cta.classList.add("in");flab.style.opacity="1";art.classList.add("sel");cur.style.opacity="0";var a=rel(art);dim.style.opacity="1";dim.style.left=(a.r-dim.offsetWidth)+"px";dim.style.top=(a.b+6)+"px";}function run(){token++;timers.forEach(clearTimeout);timers=[];art.classList.remove("sel");art.style.width="0";art.style.height="0";clr();flab.style.opacity="0";dim.style.opacity="0";cur.style.left="11%";cur.style.top="16%";cur.classList.remove("press");cur.classList.remove("nm-left");after(420,function(){cur.style.left="8%";cur.style.top="12%";cur.classList.add("press");});after(650,function(){cur.classList.remove("press");cur.style.left="calc(8% + 84%)";cur.style.top="calc(12% + 72%)";art.style.width="84%";art.style.height="72%";dim.style.opacity="1";dim.style.left="calc(8% + 84% - 74px)";dim.style.top="calc(12% + 72% + 6px)";cur.classList.add("nm-left");countTo();});after(1700,function(){flab.style.opacity="1";});after(1950,function(){eb.classList.add("in");});after(2200,function(){ln1.classList.add("in");});after(2380,function(){ln2.classList.add("in");});after(2750,function(){cta.classList.add("in");});after(2950,function(){var hl=rel(ln2),bt=rel(cta);guide.style.left=bt.l+"px";guide.style.top=(hl.t-6)+"px";guide.style.height=(bt.b-hl.t+12)+"px";guide.style.opacity="1";gapb.style.left=(bt.l+22)+"px";gapb.style.top=((hl.b+bt.t)/2)+"px";gapb.style.opacity="1";cur.classList.remove("nm-left");cur.style.left=(bt.l+14)+"px";cur.style.top=(bt.t+10)+"px";});after(3350,function(){cur.classList.add("press");var bt=rel(cta);rip.style.left=(bt.l+14)+"px";rip.style.top=(bt.t+10)+"px";rip.classList.remove("go");void rip.offsetWidth;rip.classList.add("go");});after(3550,function(){cur.classList.remove("press");guide.style.opacity="0";gapb.style.opacity="0";});after(3850,function(){art.classList.add("sel");var a=rel(art);dim.style.left=(a.r-dim.offsetWidth)+"px";dim.style.top=(a.b+6)+"px";cur.style.left="calc(8% + 40%)";cur.style.top="calc(12% + 34%)";});after(6000,function(){clr();art.classList.remove("sel");flab.style.opacity="0";dim.style.opacity="0";});after(6500,function(){art.style.width="0";art.style.height="0";});after(7300,run);}if(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches){statc();return;}var started=false;if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&!started){started=true;run();io.disconnect();}});},{threshold:.25});io.observe(stage);}else{run();}})();

/* === Inline Script 17 === */
(function(){var fill=document.getElementById('rFill'),pct=document.getElementById('rPct');if(!fill||!pct)return;var ticks=fill.parentNode,ticking=false;
function upd(){ticking=false;var max=(document.documentElement.scrollHeight||document.body.scrollHeight)-window.innerHeight;var p=max>0?Math.min(1,Math.max(0,(window.scrollY||window.pageYOffset)/max)):0;fill.style.width=(p*100).toFixed(2)+'%';var done=p>=0.998;fill.classList.toggle('done',done);pct.classList.toggle('done',done);pct.textContent=done?'SHIPPED':(Math.round(p*100)+'%');var tw=ticks.clientWidth,pw=pct.offsetWidth,head=p*tw;var left=Math.min(Math.max(head-pw-4,4),Math.max(4,tw-pw-4));pct.style.left=left+'px';}
function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(upd);}}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);addEventListener('load',upd);upd();})();

/* === Inline Script 18 === */
(function(){
  var track=document.getElementById('rvTrack');if(!track)return;
  var prev=document.getElementById('rvPrev'),next=document.getElementById('rvNext'),dots=document.getElementById('rvDots');
  var n=track.children.length,i;
  for(i=0;i<n;i++){var d=document.createElement('i');if(i===0)d.className='on';(function(idx){d.addEventListener('click',function(){track.scrollTo({left:per()*idx,behavior:'smooth'});});})(i);dots.appendChild(d);}
  function per(){var c=track.children[0];return c?c.getBoundingClientRect().width+22:1;}
  function sync(){var idx=Math.round(track.scrollLeft/per());[].forEach.call(dots.children,function(d,j){d.className=j===idx?'on':'';});prev.disabled=track.scrollLeft<4;next.disabled=track.scrollLeft>track.scrollWidth-track.clientWidth-4;}
  prev.onclick=function(){track.scrollBy({left:-per(),behavior:'smooth'});};
  next.onclick=function(){track.scrollBy({left:per(),behavior:'smooth'});};
  track.addEventListener('scroll',function(){requestAnimationFrame(sync);});
  setTimeout(sync,60);window.addEventListener('resize',sync);
  // video lightbox (ready for real URLs via data-video)
  var lb=document.createElement('div');lb.id='rvLightbox';
  lb.innerHTML='<div class="rv-lb-inner"><button class="rv-lb-close" aria-label="Close">\u00D7</button><div class="rv-lb-media"></div></div>';
  document.body.appendChild(lb);
  var media=lb.querySelector('.rv-lb-media');
  function close(){lb.classList.remove('on');document.body.classList.remove('tstlb-open');media.innerHTML='';}
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.closest('.rv-lb-close'))close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  [].forEach.call(document.querySelectorAll('#reviews .cf-play'),function(btn){
    btn.addEventListener('click',function(){
      var src=btn.getAttribute('data-video');if(!src)return;
      media.innerHTML=/\.mp4($|\?)/.test(src)?'<video src="'+src+'" controls autoplay playsinline></video>':'<iframe src="'+src+'" allow="autoplay; fullscreen" allowfullscreen></iframe>';
      lb.classList.add('on');
    });
  });
})();

/* === Inline Script 19 === */
(function(){
  var track=document.getElementById('omwTrack'),slider=document.getElementById('omwSlider'),dots=document.getElementById('omwDots');
  if(!track) return;
  var N=dots.children.length, slides=[].slice.call(track.children), cur=N, curOff=0, startOff=0, startX=0, drag=false, moved=0, settle=null;
  function metrics(){var w=slides[0].offsetWidth,g=parseFloat(getComputedStyle(slides[0]).marginRight);return {w:w+g,sw:w};}
  function offsetFor(i){var m=metrics();return (slider.clientWidth/2)-(i*m.w)-(m.sw/2);}
  function apply(off,anim){track.style.transition=anim?'transform .72s cubic-bezier(.22,.9,.24,1)':'none';track.style.transform='translateX('+off+'px)';curOff=off;}
  function render(anim){
    slides.forEach(function(s,i){s.classList.toggle('active',i===cur);s.classList.toggle('side',i!==cur);});
    [].forEach.call(dots.children,function(b,i){b.className=(i===cur%N)?'on':'';});
    apply(offsetFor(cur),anim!==false);
  }
  function normalize(){
    if(cur<N){cur+=N;apply(offsetFor(cur),false);render(false);}
    else if(cur>=2*N){cur-=N;apply(offsetFor(cur),false);render(false);}
  }
  function go(n){cur=n;render(true);clearTimeout(settle);settle=setTimeout(normalize,760);}
  document.getElementById('omwNext').onclick=function(){go(cur+1);};
  document.getElementById('omwPrev').onclick=function(){go(cur-1);};
  dots.addEventListener('click',function(e){var b=e.target.closest('i');if(!b)return;go(Math.floor(cur/N)*N+(+b.dataset.i));});
  track.addEventListener('click',function(e){
    if(moved>6){e.preventDefault();return;}
    var s=e.target.closest('.omw-slide');if(!s)return;
    var idx=slides.indexOf(s);
    if(idx!==cur){e.preventDefault();go(idx);}
  });
  function down(x){drag=true;startX=x;startOff=curOff;moved=0;clearTimeout(settle);track.style.transition='none';document.body.classList.add('omw-grabbing');}
  function move(x){if(!drag)return;var d=x-startX;moved=Math.abs(d);apply(startOff+d,false);}
  function up(){
    document.body.classList.remove('omw-grabbing');
    if(!drag)return;drag=false;
    var m=metrics(),delta=curOff-startOff;
    if(Math.abs(delta)>m.sw*0.1){go(cur+(delta<0?1:-1));}
    else{render(true);clearTimeout(settle);settle=setTimeout(normalize,760);}
    setTimeout(function(){moved=0;},60);
  }
  slider.addEventListener('mousedown',function(e){if(e.target.closest('[data-cs]'))return;e.preventDefault();down(e.clientX);});
  window.addEventListener('mousemove',function(e){move(e.clientX);});
  window.addEventListener('mouseup',up);
  slider.addEventListener('touchstart',function(e){down(e.touches[0].clientX);},{passive:true});
  slider.addEventListener('touchmove',function(e){move(e.touches[0].clientX);},{passive:true});
  slider.addEventListener('touchend',up);
  window.addEventListener('resize',function(){render(false);});
  render(false);

  /* drag pill rides the site's existing cursor */
  var you=document.getElementById('curYou');
  if(you){
    var pill=document.createElement('span');
    pill.className='omw-drag';
    pill.innerHTML='<svg class="l" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg><b>DRAG</b><svg class="r" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
    you.appendChild(pill);
    document.addEventListener('mouseover',function(e){
      var inSlider=e.target.closest('#omwSlider'), cs=e.target.closest('[data-cs]');
      document.body.classList.toggle('omw-dragging', !!inSlider && !cs);
    });
  }
})();

/* === Inline Script 20 === */
(function(){
  var cards=document.querySelectorAll('#reviews .tv');
  if(!cards.length)return;
  cards.forEach(function(c){
    var v=c.querySelector('video');if(!v)return;
    c.addEventListener('mouseenter',function(){v.play().catch(function(){});});
    c.addEventListener('mouseleave',function(){v.pause();});
  });
})();

/* === Inline Script 21 === */
(function(){
  var cards=[].slice.call(document.querySelectorAll('#reviews .tv'));
  if(!cards.length)return;
  var lb=document.createElement('div');
  lb.id='tstLb';
  lb.innerHTML='<div class="box"><button class="x" aria-label="Close">&times;</button>'+
    '<video controls playsinline preload="metadata"></video><div class="who"><div class="nm"></div><div class="rl"></div></div></div>';
  document.body.appendChild(lb);
  var v=lb.querySelector('video'),nm=lb.querySelector('.who .nm'),rl=lb.querySelector('.who .rl');
  function open(card){
    var src=card.getAttribute('data-video');if(!src)return;
    nm.textContent=(card.querySelector('.cap .nm')||{}).textContent||'';
    var _r=(card.querySelector('.cap .rl')||{}).textContent||'',_c=(card.querySelector('.cap .co')||{}).textContent||'';rl.textContent=[_r,_c].filter(Boolean).join(', ');
    v.src=src;lb.classList.add('on');document.body.classList.add('tstlb-open');
    v.currentTime=0;v.muted=false;v.play().catch(function(){});
    document.body.style.overflow='hidden';
  }
  function close(){lb.classList.remove('on');document.body.classList.remove('tstlb-open');v.pause();v.removeAttribute('src');v.load();document.body.style.overflow='';}
  cards.forEach(function(c){
    c.addEventListener('click',function(){open(c);});
    var p=c.querySelector('.play');
    if(p)p.addEventListener('click',function(e){e.stopPropagation();open(c);});
  });
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('x'))close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('on'))close();});
})();

/* === Inline Script 22 === */
(function(){
  /* the slider measures itself on init; media queries and webfonts can change
     the card width after that, so nudge it to re-measure once things settle */
  function recenter(){ window.dispatchEvent(new Event('resize')); }
  window.addEventListener('load',recenter);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(recenter);
  setTimeout(recenter,250); setTimeout(recenter,900);
  window.addEventListener('orientationchange',function(){setTimeout(recenter,220);});
})();

