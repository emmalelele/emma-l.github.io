// Emma Le
// CS30 - Mr.Schellenberg - Period 3
// Screen Interaction Assignment
// October 2 2023 

// Extra for expert:
// I took a part of an example in P5js library called "Circle Collision" that used "class" to define characteristic and behavior of the balls, I also added sounds and html elements to my code.


////////////////////////////////////////////

// defining balls


class Ball {
  
  constructor(x, y, r, c) {
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(3,9)); // i changed the magnitude of the ball so they move different speed.
    this.r = r;
    this.ballColor = c;// random ball color
  }
  
  
  update() {
    this.position.add(this.velocity);
  }
  

  checkBoundaryCollision() {
    // bounce on left and right
    if (this.position.x+this.r >= width ||this.position.x-this.r <= 0) {
      this.velocity.x *= -1;
    }
    // bounce on top and bottom
    if (this.position.y + this.r >=height||this.position.y-this.r <= 0)
      this.velocity.y *= -1;
  }

  display() {
    noStroke();
    fill(this.ballColor)
    circle(this.position.x, this.position.y, this.r*2)    
 }
}

//////////////////////////////////////////////////

// initial 
let ballMax = 100;
let ballSize = 50
let balls = [];
let createSound;
let pickupSound;


// set up
function setup(){
  createCanvas(windowWidth, windowHeight); 
  soundFormats('mp3', 'mp3');
  createSound = loadSound('pop-94319.mp3');
  pickupSound  = loadSound('coin_c_02-102844.mp3');
  
}

// draw the balls
function draw(){
  background("plum");
  displayBall();
}


// function to check the mouse on the ball 
function checkMouseOnBall(ball, x, y) {
  if (ball.position.x + ball.r > x && ball.position.x - ball.r < x && ball.position.y + ball.r > y && ball.position.y - ball.r < y) {
    return true;
  } 
  else {
    cursor(CROSS);
    return false;
  }
}


// display all balls 
function displayBall(){
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();

    }
  
}

// checking if mouse on canvas
function mouseOnCanvas(){
   if ( width  >= mouseX && 0 <= mouseX && height >= mouseY && 0 <= mouseY ){
      return true 
   } 
   else {
      return false
    }
}

// create a new ball when click 
function creatBallWhenClick (){
  ballsColor = color(random(255), random(255), random(255))
  newBall = new Ball(mouseX, mouseY, ballSize, ballsColor);
  append(balls, newBall);
  createSound.play();
  
}

//function to delete ball when click on the ball
function mouseClicked() {
  if (mouseOnCanvas()) {
    // set the index of clicked ball to -1 as a default value, all the index of clicked balls soon will be stored here
    let clickedBallIndex = -1;
    for (let i = 0; i < balls.length; i++) {
      if (checkMouseOnBall(balls[i], mouseX, mouseY)) {
        clickedBallIndex = i; //change the index of clicked ball
        break;
      }
    }

    if (clickedBallIndex !== -1) { //a ball was clicked
      //remove the ball when clicked
      balls.splice(clickedBallIndex, 1);
      pickupSound.play();
    } 
    else if (balls.length < ballMax) {
      creatBallWhenClick();
    }
  }
}

// function to when press backspace all the balls are deleted
function keyPressed() {
    if (keyIsDown(8)) { //backspace/delete
      balls = []; //delete all the balls
    }
}
