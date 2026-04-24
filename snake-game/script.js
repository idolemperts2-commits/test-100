document.addEventListener('DOMContentLoaded', () => {
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const size = 20, rows = canvas.width/size, cols = canvas.height/size;
let snake = [{x: 10*size, y: 10*size}], dx = size, dy = 0, food = randomFood(), score = 0;
function resize() { const a = canvas.parentElement; canvas.width = a.clientWidth-20; canvas.height = a.clientHeight-20; }
window.addEventListener('resize', resize); resize();
document.addEventListener('keydown', e => { if(e.key==='ArrowUp'&&dy===0){dy=-size;dx=0;} if(e.key==='ArrowDown'&&dy===0){dy=size;dx=0;} if(e.key==='ArrowLeft'&&dx===0){dx=-size;dy=0;} if(e.key==='ArrowRight'&&dx===0){dx=size;dy=0;} });
function randomFood() { return { x: Math.floor(Math.random()*(canvas.width/size))*size, y: Math.floor(Math.random()*(canvas.height/size))*size }; }
function update() {
const head = { x: snake[0].x+dx, y: snake[0].y+dy };
if(head.x<0||head.x>=canvas.width||head.y<0||head.y>=canvas.height||snake.slice(1).some(s=>s.x===head.x&&s.y===head.y)){ alert('Game Over: '+score); snake=[{x:10*size,y:10*size}]; dx=size; dy=0; score=0; document.getElementById('score').textContent=score; food=randomFood(); return; }
snake.unshift(head);
if(head.x===food.x&&head.y===food.y){ score++; document.getElementById('score').textContent=score; food=randomFood(); } else { snake.pop(); }
ctx.fillStyle='#000'; ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle='#0f0'; snake.forEach(s=>ctx.fillRect(s.x,s.y,size,size));
ctx.fillStyle='#f00'; ctx.fillRect(food.x,food.y,size,size);
}
setInterval(update,100);
});