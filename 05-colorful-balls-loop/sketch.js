// colorful balls loop



let theColors = ["black", "white", "red", "blue", "green", "yellow", "orange", "purple", "brown", "pink", "lime", "gray", "cyan", "teal", "indigo"];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  forCircles();
}

function forCircles() {
  for (let x = 0; x < 15; x++) {
    fill(theColors[x]);
    noStroke();
    circle(x * 25 + 20, height/2, 20);
  }
}