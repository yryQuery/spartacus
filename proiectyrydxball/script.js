const canvas = document.getElementById("gameField");
const ctx = canvas.getContext ('2d');

// VARIABLES OF THE GAME
const platformWidth = 300;
const platformHeight = 20;
const ballRadius = 10;
const brickRowCount = 5 ;
const brickColumnCount = 8 ;
const brickWidth = 80 ;
const brickHeight = 20 ;
const brickPadding = 10 ;
const brickOffsetTop = 30 ;
const brickOffsetLeft = 30;

let platformX = ( canvas.width - platformWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 4;
let ballSpeedY = -4;
let score = 0 ;

// CREATE THE BRICKS
let bricks = [];
for( let c = 0 ; c < brickColumnCount ; c++ ) {
    bricks [c] = [];
    for ( let r=0 ; r< brickRowCount ; r++){
        bricks[c][r] = { x: 0 , y: 0 , status:1};
    }
}
// DRAW THE PLATFORM
function drawPlatform() {
    ctx.beginPath();
    ctx.rect(platformX , canvas.height - platformHeight , platformWidth ,platformHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

}
// DRAW THE BALL
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY,ballRadius, 0 , Math.PI*2);
    ctx.fillStyle = "bordeaux" ;
    ctx.fill();
    ctx.closePath();
}

// DRAW THE BRICKS
function drawBricks() {
    for ( let c= 0 ; c < brickColumnCount ; c++){
        for ( let r = 0 ; r < brickRowCount ; r++) {
            if (bricks[c][r].status === 1){
            const brickX = c * ( brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * ( brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX ;
            bricks[c][r].y = brickY ;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
            ctx.fillStyle = "red" ;
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}
// COLLISION DETECTION
function collisionDetection() {
    for ( let c = 0 ; c < brickColumnCount; c++){
        for (let r = 0 ; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r];
            // if ( brick.status === 1){
            
            if (
                ballX > currentBrick.x &&
                ballX < currentBrick.x + brickWidth &&
                ballY > currentBrick.y &&
                ballY < currentBrick.y + brickHeight &&
                currentBrick.status === 1
                ) {
                    ballSpeedY = -ballSpeedY;
                    currentBrick.status = 0 ;
                    score++;

                    if (score === brickRowCount * brickColumnCount) { // Verifică dacă toate cărămizile au fost lovite
                        // Afișează mesajul "Ai câștigat"
                        ctx.font = "32px Arial";
                        ctx.fillStyle = "red";
                        ctx.fillText("Ai câștigat!", canvas.width / 2 - 80, canvas.height / 2);
                        setTimeout(() => {
                          document.location.reload();
                        }, 3000); // Reîncarcă pagina după 3 secunde
                }
                }
        }
    }

}
// DRAW SCORE
function drawScore() {
    ctx.font = "55px Arial";
    ctx.fillStyle = "purple";
    ctx.fillText("Score: " + score , 58, 400);
    // ctx.fillText("dx-ball by irinel manta" + score , 58 , 450);
}
// CREATE DRAW FUNCTION
function draw(){
     ctx.clearRect(0,0,canvas.width , canvas.height);
     drawBricks();
     drawBall();
     drawPlatform();
     collisionDetection();
     drawScore();

     if(ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius){
        ballSpeedX = -ballSpeedX;
     }
     if (ballY + ballSpeedY < ballRadius){
        ballSpeedY = -ballSpeedY;
     }
     else if (ballY + ballSpeedY > canvas.height - ballRadius){
        if (ballX > platformX && ballX < platformX + platformWidth) {
            ballSpeedY = -ballSpeedY;
        }else {
            document.location.reload();
        }
        }
     

 ballX += ballSpeedX;
 ballY += ballSpeedY;
requestAnimationFrame(draw); }

// MOVE THE PADDLE WITH THE MOUSE
document.addEventListener("mousemove" , (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width){
        platformX = relativeX - platformWidth / 2;
    }
 })

// RECALL DRAW FUNCTION
draw();