// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mario;
let  coinSound;
let bgSound;

function preload(){
  mario = loadImage("584df3ad6a5ae41a83ddee08.png");
  coinSound = loadSound("coin.mp3");
  bgSound = loadSound();
  bgSound.setVolume(0.5);
  coinSound.setVolume(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);

  image(mario, mouseX, mouseY);
}

function mousePressed(){
  coinSound.play();
  if (!bgSound.isPlaying()){
    bgSound.loop();
  }
}

