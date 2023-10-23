// Terrain demo
// Oct 23 2023

let terrain = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRect();
}

function draw() {
  background(220);
  displayRect();
}

function displayRect(){
  for (let i = 0; i < width; i ++){
    let thisRect = terrain[i];
    rect(thisRect.x , height - thisRect.height, 1, thisRect.height)
  }
}

function spawnRect(){
  let time = 0;
  for (let x = 0; x < 10000; x++){
    let h = noise(time) * height;
    let thisRect = {
      x: x,
      height: h
    };
    terrain.push(thisRect);
    time += 0.001;
  }
}