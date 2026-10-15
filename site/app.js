'use strict';
const core=document.querySelector('#core');
const lines=Array.from({length:33},(_,row)=>Array.from({length:67},(_,i)=>{const c=i-33;return Math.abs(c)<=row+1&&!(row>12&&Math.abs(c)<(row-12)*.65)?((row+c)%4===0?'+':'='):' ';}).join(''));
core.textContent=lines.join('\n');
const logs=[...document.querySelectorAll('#logs li')];
const media=matchMedia('(prefers-reduced-motion: reduce)');
let motion=!media.matches,timers=[];
function boot(){timers.forEach(clearTimeout);timers=[];logs.forEach(el=>el.classList.remove('pending'));core.textContent=lines.join('\n');if(!motion)return;logs.forEach(el=>el.classList.add('pending'));logs.forEach((el,i)=>timers.push(setTimeout(()=>el.classList.remove('pending'),350+i*400)));core.textContent='';for(let i=0;i<6;i++)timers.push(setTimeout(()=>{core.textContent=lines.map((line,j)=>j<33-(i+1)*6?' '.repeat(67):line).join('\n');},i*250));}
const motionButton=document.querySelector('#motion');
function updateMotion(){motionButton.textContent=`MOTION: ${motion?'ON':'OFF'}`;motionButton.setAttribute('aria-pressed',String(!motion));boot();}
motionButton.addEventListener('click',()=>{motion=!motion;updateMotion();});
media.addEventListener('change',e=>{motion=!e.matches;updateMotion();});
document.querySelector('#replay').addEventListener('click',boot);
const output=document.querySelector('#output');
const responses={help:'Available commands: help / about / projects / clear\nProject links are in SELECTED above. No commands are executed on a server.',about:'Sigi / design, code, and whatever comes next.\nExploring ideas. Building systems. Making things real.',projects:'01 sigi-design-skills\n02 aurora-html-ppt\n03 agentic-design-system-skill\nUse the project links above to open repositories.'};
document.querySelector('#command-form').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#command');const command=input.value.trim().toLowerCase();input.value='';if(!command)return;if(command==='clear'){output.textContent='';return;}output.textContent=`$ ${command}\n${responses[command]||'Unknown command. Type help.'}`;if(command==='projects')document.querySelector('#projects').scrollIntoView({behavior:motion?'smooth':'auto'});});
updateMotion();
