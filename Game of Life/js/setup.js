function init(){
    disableAllBtns();
    $('#btnRandom').removeClass('disabled').prop('disabled', false);    $('#btnRandomRes').removeClass('disabled').prop('disabled', false);
    $('#btnSelect').removeClass('disabled').prop('disabled', false);    $('#btnSelectRes').removeClass('disabled').prop('disabled', false);

    colorLive.addEventListener("change", updatecolorLive, false);
    colorDead.addEventListener("change", updatecolorDead, false);
}

function disableAllBtns(){
    $('#btnRandom').addClass('disabled').prop('disabled', true);    $('#btnRandomRes').addClass('disabled').prop('disabled', true);
    $('#btnSelect').addClass('disabled').prop('disabled', true);    $('#btnSelectRes').addClass('disabled').prop('disabled', true);
    $('#btnStart').addClass('disabled').prop('disabled', true);     $('#btnStartRes').addClass('disabled').prop('disabled', true);
    $('#btnPause').addClass('disabled').prop('disabled', true);     $('#btnPauseRes').addClass('disabled').prop('disabled', true);
    $('#btnStop').addClass('disabled').prop('disabled', true);      $('#btnStopRes').addClass('disabled').prop('disabled', true);
}

const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")
let selecting = false;

const game = new gameOfLife();
game.init();

var selection = false;
let living = false;
var interval;

var slider = document.getElementById("gameSpeed");
var gameSpeed = 500 - slider.value;

$("#gameSpeed").on("change", function(){
    if(living){
        clearInterval(interval);
        gameSpeed = 500 - $(this).val();
        interval = window.setInterval(() => { game.born();}, gameSpeed);
        //console.log("Speed -> " + gameSpeed);
    }
});

function btnRandom(){
    disableAllBtns();
    $('#btnPause').removeClass('disabled').prop('disabled', false); $('#btnPauseRes').removeClass('disabled').prop('disabled', false);
    $('#btnStop').removeClass('disabled').prop('disabled', false);  $('#btnStopRes').removeClass('disabled').prop('disabled', false);

    selection = false; selecting = false; living = true;
    game.random();
    game.life();

    clearInterval(interval);
    interval = window.setInterval(() => { game.born();}, gameSpeed);
    //console.log("Speed -> " + gameSpeed);
}

function btnSelect(){
    disableAllBtns();
    $('#btnStart').removeClass('disabled').prop('disabled', false); $('#btnStartRes').removeClass('disabled').prop('disabled', false);
    $('#btnStop').removeClass('disabled').prop('disabled', false);  $('#btnStopRes').removeClass('disabled').prop('disabled', false);

    selection = true; selecting = true; living = false;
    document.getElementById('gamefield').click();
    game.select();
}

function btnStart(){
    disableAllBtns();
    $('#btnPause').removeClass('disabled').prop('disabled', false); $('#btnPauseRes').removeClass('disabled').prop('disabled', false);
    $('#btnStop').removeClass('disabled').prop('disabled', false);  $('#btnStopRes').removeClass('disabled').prop('disabled', false);

    selection = false; selecting = false; living = true;
    game.ready(true);
    

    clearInterval(interval);
    interval = window.setInterval(() => { game.born();}, gameSpeed);
    //console.log("Speed -> " + gameSpeed);
}

function btnPause(){
    disableAllBtns();
    $('#btnStart').removeClass('disabled').prop('disabled', false).text("Resume"); $('#btnStartRes').removeClass('disabled').prop('disabled', false);
    $('#btnStop').removeClass('disabled').prop('disabled', false);  $('#btnStopRes').removeClass('disabled').prop('disabled', false);
    
    clearInterval(interval);
}

function btnStop(){
    disableAllBtns();
    $('#btnRandom').removeClass('disabled').prop('disabled', false);    $('#btnRandomRes').removeClass('disabled').prop('disabled', false);
    $('#btnSelect').removeClass('disabled').prop('disabled', false);    $('#btnSelectRes').removeClass('disabled').prop('disabled', false);
    $('#btnStart').text("Start");

    selection = false; selecting = false; living = false;
    game.init();
}

document.onmousedown = function(e){
    selecting = false;
    if(selection){
        if (!e) { e = event }

        var canvasElmt = document.getElementById("gamefield");
        var rectCanvas = canvasElmt.getBoundingClientRect();

        if((e.clientX >= rectCanvas.left) && (e.clientX <= rectCanvas.right) && (e.clientY >= rectCanvas.top) && (e.clientY <= rectCanvas.bottom)){
            selecting = true;
            game.selected(e.clientX, e.clientY, rectCanvas.top, rectCanvas.left);
        }

        document.onmousemove = function (e){
            if(selecting){
                if((e.clientX >= rectCanvas.left) && (e.clientX <= rectCanvas.right) && (e.clientY >= rectCanvas.top) && (e.clientY <= rectCanvas.bottom)){
                    game.selected(e.clientX, e.clientY, rectCanvas.top, rectCanvas.left);
                }
            }
        }
    }
}

document.onmouseup = function(e){
    selecting = false;
}

function updatecolorLive(event) {
    game.setLiveColor(event.target.value);
}

function updatecolorDead(event) {
    game.setDeadColor(event.target.value);
}

$("#cellSize").on("change", function(){
    if(!living){
        game.setCellSize($(this).val());
        console.log("Size -> " + $(this).val());
    }
});
