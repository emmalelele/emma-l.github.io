// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class Ball {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.radius = random(15,30);
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  move(){
    this.x += this.dx;
    this.y += this.dy;
  }
  display(){
    fill(this.r,this.g, this.b);
    circle(this.x,this.y,this.radius*2);

  }
  checkBoundaryCollision() {
    // bounce on left and right
    if (this.x+this.radius >= width ||this.x-this.radius <= 0) {
      this.dx *= -1;
    }
    // bounce on top and bottom
    if (this.y + this.radius >=height||this.y-this.radius <= 0){
      this.dy *= -1;
  }
 }
  bounceOff(otherBall){
    let radiiSum = this.radius + this.radius;
    let distApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    if (radiiSum > distApart){
      //hitting each other
      let tempx = this.dx;
      let tempy = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;

      otherBall.dx = tempx;
      otherBall.dy = tempy;
    }
 }
}
let theBallArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  for (let someBall of theBallArray){
    someBall.display()
    someBall.move();
    someBall.checkBoundaryCollision()
    for (let otherBall of theBallArray){
      //avoid checking if hitting self
      if (someBall !== otherBall){
        someBall.bounceOff(otherBall);
      }

    }
  }
}
function mousePressed(){
  let theBall = new Ball(mouseX, mouseY);
  theBallArray.push(theBall);
}