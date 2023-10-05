// Traffic Light Starter Code
// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis


let state = "green";
let lastSwitchTime = 0;
let greenDuration = 3000;
let yellowDuration = 500;
let redDuration = 3000;

function setup() {
  createCanvas(100, 300);
}

function draw() {
  background(255);
  checkState();
  drawOutlineOfLights();
  displayCorrectLight();
}

function checkState() {
  if (state === "green" && millis() > lastSwitchTime + greenDuration) {
    state = "yellow";
    lastSwitchTime = millis();
  }
  if (state === "yellow" && millis() > lastSwitchTime + yellowDuration) {
    state = "red";
    lastSwitchTime = millis();
  }
  if (state === "red" && millis() > lastSwitchTime + redDuration) {
    state = "green";
    lastSwitchTime = millis();
  }
}

function displayCorrectLight() {
  if (state === "green") {
    fill("green");
    ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
  }
  else if (state === "yellow") {
    fill("yellow");
    ellipse(width / 2, height / 2, 50, 50); //middle
  }
  else if (state === "red") {
    fill("red");
    ellipse(width / 2, height / 2 - 65, 50, 50); //top
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  ellipse(width / 2, height / 2, 50, 50); //middle
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}