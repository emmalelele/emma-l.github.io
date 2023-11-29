let theSky;
let y1;
let y2;
let scrollSpeed = 3;
let mainBall;
let gems = [];
let gem2 = [];
let gem3 = [];
let lastGemTime = 0;

class Obstacle {
  constructor(width, height, x, y, amount) {
    this.group = new Group();
    this.group.width = width;
    this.group.height = height;
    this.group.x = () => random(0, width);
    this.group.y = y;
    this.group.amount = amount;

    for (let i = 0; i < amount; i++) {
      let newObstacle = createSprite(this.group.x(), this.group.y, width, height);
      this.group.add(newObstacle);
    }
  }

  update() {
    scrollingObstacle(this.group);
  }
}

function preload() {
  theSky = loadImage("11.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  y1 = 50;
  y2 = -550;
  makePlayer();
  // Example usage of Obstacle class
  let dots = new Obstacle(10, 10, 0, 0, 200);
  gems.push(dots.group);

  let squareGems = new Obstacle(50, 10, 0, 0, 100);
  gem2.push(squareGems.group);

  let rectGems = new Obstacle(300, 10, width / 2, 0, 5);
  gem3.push(rectGems.group);
}

function draw() {
  moveBackground();
  mainBall.moveTowards(mouseX, mouseY);
  updateGem();
  if (frameCount - lastGemTime > 5 * 60) {
    if (frameCount % 3 === 0) {
      makeGemSquare();
    } else if (frameCount % 3 === 1) {
      makeGemSquare();
      dotsObstacle();
    } else {
      makeGemRect();
    }
    lastGemTime = frameCount;
  }
  drawSprites();
}

function updateGem() {
  // update and draw the gems in gem3 group
  if (gems) {
    scrollingObstacle(gems);
  }

  // update and draw the gems in gem2 group
  if (gem2) {
    scrollingObstacle(gem2);
  }

  // update and draw the gems in gems group
  if (gem3) {
    scrollingObstacle(gem3);
  }
}

function makePlayer() {
  mainBall = createSprite(width / 2, height / 2, 50, 50);
  mainBall.shapeColor = color("lavender");
}

function dotsObstacle() {
  // Use the dots obstacle from the Obstacle class
}

function makeGemSquare() {
  // Use the square obstacle from the Obstacle class
}

function makeGemRect() {
  // Use the rectangle obstacle from the Obstacle class
}

function moveBackground() {
  image(theSky, 0, y1, windowWidth, windowHeight);
  image(theSky, 0, y2, windowWidth, windowHeight);
  y1 += scrollSpeed;
  y2 += scrollSpeed;
  if (y1 >= windowHeight) {
    y1 = -500;
  }
  if (y2 >= windowHeight) {
    y2 = -500;
  }
}

function scrollingObstacle(gemGroup) {
  for (let i = 0; i < gemGroup.length; i++) {
    gemGroup[i].position.y += scrollSpeed;
  }
}

// You may want to implement your collision and balloon functions here.

// Rest of your code...
.
