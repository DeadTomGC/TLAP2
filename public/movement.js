
;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var x = 0;
var y = 0;
var vel = 0;
var angle = 0;
var slider;

function dropBall() {
    accel = 0.01*slider.value;
    vel = vel+accel;
    y = y+vel;
    if(y>400){
        y = 400;
        vel = 0;
    }
    ctx.clearRect(0,0,500,500);
    ctx.drawImage(img,Math.round(x),Math.round(y));
}

var run = false;
var img;
var ctx;
var canvas;
function start() {
    slider = document.getElementById("speed");
    canvas = document.getElementById("can_1");
    canvas.style.borderWidth = "5px";
    ctx = canvas.getContext("2d");
    img = document.getElementById("object_1");
    
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
