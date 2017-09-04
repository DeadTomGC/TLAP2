/* 
 * This is going to be the file that runs when a user loads the game page
 * It will initiate the connection to the server and start the game
 */

;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

window.onload = start;

var img;
var canvas;
var ctx;
var run = false;

function start() {    
    if (!run) {
        connect();
        initPirate();
        run = true;
        main();
    }
}

function initPirate(){
    
    canvas = document.getElementById("game_area");
    canvas.style.borderWidth = "5px";
    ctx = canvas.getContext("2d");
    
    img = new Image();
    img.style="display:none";
    img.src = "rec/cannonball_2.png";
    
    canvas.addEventListener("click",canClick,false);
}

function main() {
    if (run) {
        window.requestAnimationFrame(main);
    }
    //TODO: loop
    //wipe old content
    
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    //ctx.drawImage(img,Math.round(x),Math.round(y));
    
    // Your main loop contents.
}

function canClick(e){
    return;
}



function stopMain() {
    if(run){
        shutdownPirate();
    }    
    run = false;
}


function shutdownPirate(){
    canvas.removeEventListener("click",canClick,false);
    canvas.style.borderWidth = "1px";
}

