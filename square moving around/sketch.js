//ball moving around screen demo

let x, y, size, xSpeed, ySpeed;
let state = "right";

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  y = 0;
  size = 100;
  xSpeed = 5;
  ySpeed = 5;
}

function draw() {
  background(220);
  
  moveBox();
  
  //display
  fill("black");
  square(x, y, size);
}

function moveBox() {
  if (state === "right") {
    x += xSpeed;
    if (x >= width - size) {
      state = "down";
      x = width - size - 1;
    }
  }
  
  else if (state === "down") {
    y += ySpeed;
    if (y >= height - size) {
      state = "left";
      y = height - size - 1;
    }
  }
  
  else if (state === "left") {
    x -= xSpeed;
    if (x <= 0) {
      state = "up";
      x = 0;
    }
  }
  
  else if (state === "up") {
    y -= ySpeed;
    if (y <= 0) {
      state = "right";
      y = 0;
    }
  }
}