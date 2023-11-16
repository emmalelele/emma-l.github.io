// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let points = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let point of points){
    point.display();
    //point.update();
  }
}

function mousePressed(){
  let thePoint  = new movingPoint(mouseX, mouseY);
  points.push(thePoint);
}

class movingPoint {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = color(random(255), random(255), random(255) );
    this.radius = 15;
    this.time = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
  }

  display(){
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update(){
    let dx = noise(this.xTime);
    this.dx = map(dx, 0, 1, -5, 5);
    let dy = noise(this.yTime);
    this.dy = map(dy, 0,1,-5,5);
   
    this.x += this.dx;
    this.y += this.dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
  connectTo(pointsArray){
    for (let otherPoint of pointsArray){
      if (this !== otherPoint){
        if (dist(this.x, this.y, otherPoint.x, otherPoint.y) < this.reach){
          stroke(this.color);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }

}