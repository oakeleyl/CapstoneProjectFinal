//Author: Lilia Oakeley
//Due Date: 02/05/2021
//Title: Lab02 Hello
//School: Explore Academy Charter School
//Semester: Spring 2021
//Instructor: Christina Olivas 

//constants
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

//class id
class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

//variables
let speed = 7;

let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

//rainbow tail
var colors = ["pink", 'orange', 'yellow', 'blue', 'purple', 'aqua']

//Game Loop button 
createBtn = (text = "No text") => {
    var btn = document.createElement('button');
    btn.innerText = text;
    btn.addEventListener('click', () => {
        location.reload()
    });
    document.body.appendChild(btn);
    return btn;
};

//included audio 
var gulpSound = new Audio("glup.mp3")
var smackCam = new Audio("smack_cam.mp3")
var wowK = new Audio("wow_korean2.mp3")
var wowG = new Audio("wow_german.mp3")
var ejole = new Audio("ejole.mp3")
var spanish = new Audio("spanish.mp3")
var ugh = new Audio("ugh.mp3")
var wow = new Audio("wow.mp3")
var horst = new Audio("horst.mp3")
var sounds = [gulpSound, smackCam, wowK, wowG, ejole, spanish, wow, horst]

function efx(){
    sfx = sounds[Math.floor(Math.random() *8)]
    sfx.play();
}

//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    

    checkAppleCollision();
    drawApple();
    drawSnake();


    setTimeout(drawGame, 1000/ speed);
   
}
function isGameOver(){
    let gameOver = false;
//does not allow game over to display when snake in lined up at start
    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }
    //walls
    else if(headX < 0){
        gameOver = true;
        ugh.play();
        ctx.fillStyle = 'white'
        ctx.font = "50px Verdana"
        ctx.fillText("GAME OVER", canvas.width/ 6.5, canvas.height/2 );
        createBtn('Play Again?');
    }
    else if(headX >= tileCount){
        gameOver = true;
        ugh.play();
        ctx.fillStyle = 'white'
        ctx.font = "50px Verdana"
        ctx.fillText("GAME OVER", canvas.width/ 6.5, canvas.height/2 );
        createBtn('Play Again?');
    }
    else if(headY < 0){
        gameOver = true;
        ugh.play();
        ctx.fillStyle = 'white'
        ctx.font = "50px Verdana"
        ctx.fillText("GAME OVER", canvas.width/ 6.5, canvas.height/2 );
        createBtn('Play Again?');
    }
    else if(headY >= tileCount){
        gameOver = true;
        ugh.play();
        ctx.fillStyle = 'white'
        ctx.font = "50px Verdana"
        ctx.fillText("GAME OVER", canvas.width/ 6.5, canvas.height/2 );
        createBtn('Play Again?');
    }
    //tail
    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x == headX && part.y === headY){
            gameOver = true;
            ugh.play();
            ctx.fillStyle = 'white'
            ctx.font = "50px Verdana"
            ctx.fillText("GAME OVER", canvas.width/ 6.5, canvas.height/2 );
            createBtn('Play Again?');
            break;
        }
    }

    return gameOver;
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function rainbow(){
    setTimeout(rainbow, 5000)
    ctx.fillStyle = colors[Math.floor(Math.random() *5)]
}

function drawSnake(){ 
    rainbow()
    //ctx.fillStyle = "yellow"
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY)); 
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle = "green"
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity
}

function drawApple(){
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        efx();
        tailLength++;
        
    }
}
document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

//Rules button
function myFunction(){
    alert("The player uses the arrow keys to move a 'snake' around the board. As the snake finds apples, it eats, and thereby grows larger. The game ends when the snake either hits the edge of the screen or moves into itself. The goal is to make the snake as large as possible before that happens.")
}
drawGame();
