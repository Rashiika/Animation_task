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