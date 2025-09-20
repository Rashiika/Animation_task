var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var glitchEl = document.getElementById("glitchText");
var text = "Welcome to the Animation Show!!";
function glitchIntro(txt) {
  let i=0;
  function glitchChar(){
    if(i < txt.length){
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      glitchEl.textContent = txt.slice(0,i) + chars[Math.floor(Math.random()*chars.length)];
      setTimeout(glitchChar, 50);
      setTimeout(()=>{ glitchEl.textContent = txt.slice(0,i+1); i++; }, 100);
    }
  }
  glitchChar();
}
glitchIntro(text);

let mode = null;
let particles = [];


const fireworkBtn = document.getElementById("fireworkBtn");


canvas.addEventListener("click", e => {
  if(mode === "firework"){
    for(let i=0;i<70;i++){
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 6 + 2;
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: `hsl(${Math.random()*360},100%,50%)`,
        radius: Math.random()*3 +2,
        trail: []
      });
    }
  }
});


function animateFirework(){
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach((p,i)=>{
    p.trail.push({x: p.x, y: p.y});
    if(p.trail.length > 8) p.trail.shift();

    p.vy += 0.05;
    p.x += p.vx;
    p.y += p.vy;

    p.trail.forEach((pos,j)=>{
      ctx.globalAlpha = (j+1)/p.trail.length * p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(pos.x,pos.y,p.radius,0,Math.PI*2);
      ctx.fill();
    });

    p.alpha -= 0.015;
    if(p.alpha <= 0) particles.splice(i,1);
  });
  ctx.globalAlpha = 1;

  if(mode === "firework") requestAnimationFrame(animateFirework);
}

fireworkBtn.onclick = () => {
  const newTab = window.open("", "_blank");

  newTab.document.write(`
    <html>
    <head>
      <title>Fireworks!</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: black;
          height: 100vh;
        }

        #message {
          position: absolute;
          top: 10%;
          left: 20%;
          transform: translate(-50%, -50%);
          color: white;
          font-family: sans-serif;
          font-size: 2em;
          z-index: 2;         
          pointer-events: none; 
        }

        canvas {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;          
        }
      </style>
    </head>
    <body>
      <div id="message">Click to see the magic!!</div>
      <canvas id="canvas"></canvas>
      <script>
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        
        canvas.addEventListener("click", e => {
          for(let i=0;i<70;i++){
            const angle = Math.random() * 2 * Math.PI;
            const speed = Math.random() * 6 + 2;
            particles.push({
              x: e.clientX,
              y: e.clientY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              alpha: 1,
              color: 'hsl(' + Math.random()*360 + ',100%,50%)',
              radius: Math.random()*3+2,
              trail: []
            });
          }
        });

        function animateFirework() {
          ctx.fillStyle = 'rgba(0,0,0,0.2)';
          ctx.fillRect(0,0,canvas.width,canvas.height);

          particles.forEach((p,i) => {
            p.trail.push({x:p.x, y:p.y});
            if(p.trail.length>8) p.trail.shift();

            p.vy += 0.05;
            p.x += p.vx;
            p.y += p.vy;

            p.trail.forEach((pos,j)=>{
              ctx.globalAlpha = (j+1)/p.trail.length * p.alpha;
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(pos.x,pos.y,p.radius,0,Math.PI*2);
              ctx.fill();
            });

            p.alpha -= 0.015;
            if(p.alpha <=0) particles.splice(i,1);
          });
          ctx.globalAlpha = 1;

          requestAnimationFrame(animateFirework);
        }

        animateFirework();
      </script>
    </body>
    </html>
  `);
};
