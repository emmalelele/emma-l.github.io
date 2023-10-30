// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
const GRID_SIZE = 40;
let cellSize;
let playerX = 0;
let playerY = 0;






function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // put player in grid

  grid[playerY][playerX] = 9;

  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
}

function draw() {
  background(220);
  displayGrid();
  displayGrid();
}

function keyTyped() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === " ") {
    grid = nextTurn();
  }
  else if (key === "s"){ //move down
    movePlayer(0,1);
  }
  else if (key === "w"){ //move down
    movePlayer(0,-1);
  }
  else if (key === "a"){ //move left
    movePlayer(-1,0);
  }
  else if (key === "d"){ //move left
    movePlayer(1,0);
  }
}

function movePlayer(x,y){
  //edge case check
  if (playerX + x >= 0 && playerX + x < GRID_SIZE && playerY + y >= 0 && playerY + y < GRID_SIZE  ){
    //check if running into wall
    if (grid[playerY + y][playerX+x] === 0){
      let tempX = playerX;
      let tempY = playerY;

      playerX += x;
      playerY += y;

      //update grid
      grid[playerY][playerX] = 9;
      grid[tempY][tempX] = 0;
    }
  }
}

function nextTurn() {
  let nextTurnGrid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  //look at every cell
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      //count neighbours
      let neighbours = 0;

      //look at all cells around in a 3x3 grid
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //detect edge cases
          if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE) {
            neighbours += grid[y+i][x+j];
          }
        }
      }
      
      //be careful about counting self
      neighbours -= grid[y][x];

      //apply rules
      if (grid[y][x] === 1) { //alive
        if (neighbours === 2 || neighbours === 3) {
          //stay alive
          nextTurnGrid[y][x] = 1;
        }
        else {
          //died - lonely or overpopulation
          nextTurnGrid[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) { //dead
        if (neighbours === 3) {
          //new birth
          nextTurnGrid[y][x] = 1;
        }
        else {
          //stay dead
          nextTurnGrid[y][x] = 0;
        }
      }
    }
  }
  return nextTurnGrid;
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell(x, y);   //current cell
}

function toggleCell(x, y) {
  //check that we are within the grid, then toggle
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 9){
        fill("green");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}