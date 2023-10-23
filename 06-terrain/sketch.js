// Terrain demo
// Oct 23 2023

let terrain = [];
let xOffset = 0;
let xMax = 9000;



function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRect();
}

function draw() {
  background(220);
  displayRect();
  if (keyIsDown(RIGHT_ARROW)){
    if (xOffset < xMax){ //dont fall off the right side
      xOffset += 10;
    }
  }
  if (keyIsDown(LEFT_ARROW)){
    if (xOffset > 5){ //dont fall off the left side
      xOffset -= 10;
    }
  }
}

function displayRect(){
  for (let i = xOffset; i < width + xOffset; i ++){
    let thisRect = terrain[i];
    rect(thisRect.x - xOffset, height - thisRect.height, 1, thisRect.height)
  }
}

function spawnRect(){
  let time = 0;
  for (let x = 0; x < xMax; x++){
    let h = noise(time) * height;
    let thisRect = {
      x: x,
      height: h
    };
    terrain.push(thisRect);
    time += 0.001;
  }
}