const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
 
 
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setintervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0 ;
highScoreElement.innerHTML = `High Score: ${highScore}`;

let gameOver = false;

let changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handlegameOver = () => {
    clearInterval(setintervalId);
    alert("Game Over! Press OK to replay...");
    score = 0;
    location.reload();
}

const speed = () => {
    if (score < 6) {
        setintervalId = setInterval(initgame, 125);
        console.log(score, setintervalId);
    }else if (score > 5 && score < 11) {
        setintervalId = setInterval(initgame, 12);
        console.log(score, setintervalId);
    }else if( score >11 && score < 16){
        setintervalId = setInterval(initgame, 115);
    }else if( score >15 && score <21){
        setintervalId = setInterval(initgame, 110);
    }else if( score >20 && score < 26){
        setintervalId = setInterval(initgame, 105);
    }else if(score>25){
        setintervalId = setInterval(initgame, 100)
    }
}; 

const changeDirection = (e) =>{
    if(e.key === "ArrowUp" && velocityY !=1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key ==="ArrowDown" && velocityY !=-1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key ==="ArrowRight" && velocityX !=-1){
        velocityX = 1;
        velocityY = 0;
    }else if(e.key ==="ArrowLeft" && velocityX !=1){
        velocityX = -1;
        velocityY = 0;
    }
}

const initgame = () => {
    if (gameOver) return handlegameOver();

   
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        
        highScore =  score >= highScore ? score : highScore ;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }
   
    for (let i = snakeBody.length-1 ; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];   
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`; 
        if(i!=0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver=true;
        } 
    }
   
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
speed();
document.addEventListener("keydown", changeDirection);



