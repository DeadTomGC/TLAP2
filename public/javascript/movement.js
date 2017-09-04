
;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var x = 0;
var y = 0;
var vel = 0;
var angle = 0;

window.onload = start;

function dropBall() {
    accel = 0.01*100;
    vel = vel+accel;
    y = y+vel;
    if(y>400){
        y = 400;
        vel = 0;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,Math.round(x),Math.round(y));
}

var run = false;
var img;
var ctx;
var canvas;
function start() {
    canvas = document.getElementById("game_area");
    canvas.style.borderWidth = "5px";
    ctx = canvas.getContext("2d");
    img = new Image(); // Preload an image
    img.style="display:none";
    img.src = "rec/cannonball_2.png";
    
    if (!run) {
        canvas.addEventListener("click",canClick,false);
        run = true;
        main();
    }
}

function canClick(e){
    var rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left - img.width/2;
    y = e.clientY - rect.top- img.height/2;
}

function main() {
    if (run) {
        window.requestAnimationFrame(main);
    }
    dropBall();
    // Your main loop contents.
}

function stopMain() {
    if(run){
        canvas.removeEventListener("click",canClick,false);
    }
    canvas.style.borderWidth = "1px";
    run = false;
}
