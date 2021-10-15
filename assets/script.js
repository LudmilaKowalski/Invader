var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 0;
var dy = 1;
var ballRadius = 10;
var paddleHeight = 40;
var paddleWidth = 55;
var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
my_gradient.addColorStop(0, "orange");
my_gradient.addColorStop(1, "yellow");
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = canvas.height-paddleHeight;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var brickRowCount = 4;
var brickColumnCount = 30;
var brickWidth = 40;
var brickHeight = 40;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var ballcolor = "orange";
var score = 0;
var lives = 3;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballcolor
    ctx.fill();
    ctx.closePath();
  }


  function drawSquare() {
    ctx.beginPath();
    ctx.rect(50, 50, ballRadius, 0, 0);
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.closePath();
  }

  

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "darkblue";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = my_gradient;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    b.status = 0;
                    score++ ;
                    resetBall();
                    if(score == brickRowCount*brickColumnCount) {
                        alert("You win, congrats !");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
   
}

function resetBall(){
    pressed = false;
        y = (canvas.height - paddleHeight) ;
        x = paddleX +(paddleWidth) / 2;
}

function drawScore() {
    ctx.font = "25px Arial underline";
    ctx.fillStyle = "darkorange";
    ctx.fillText("Score: "+score, 8, 20);
}
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawSquare();
    drawPaddle();
    drawScore();
    
    collisionDetection();
    drawBricks();
    
    if(y + dy < ballRadius) {
        resetBall()
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            
        }
        else {
                    lives--;
        if(!lives) {
           // alert("Game over..." + " here is you're score : " + score);
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
        }
           
           
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

  

    
			if (y < 0) {

				resetBall()
			};

    x += dx;
    y += dy;
  }

  document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "space" || e.key == " ") {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "space" || e.key == " ") {
        spacePressed = false;
    }
}

var interval = setInterval(draw, 10);

