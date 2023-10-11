// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x;
let y;
speed = 10;
let stage = "right"
s = 20

function setup() {
  createCanvas(400, 400);
  x = 0;
  y = 0;
}

function draw() {
  background(220);
  square(x,y,s);
  displaySquare();
  movingAround();
}

function displaySquare(){
  if (stage === "right" &&  x + s > width){
    stage = "down"
    x = width - s;

  }
  else if (stage === "down" && y + s > height) {
    y = height - s;
    stage = "left";
  }
}


function movingAround(){
  if (stage === "right"){
    x += speed
  }
  if (stage === "down"){
    y += speed;
  }
}
