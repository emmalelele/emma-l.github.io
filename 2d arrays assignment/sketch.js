// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let GRID_SIZE = 10;
let grid_level = 5;
let grid;
let cellSize;




function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height > width){
    cellSize = width/GRID_SIZE;
  }
  else{
    cellSize = height/GRID_SIZE;
  }
  grid = generateGrid(grid_level, grid_level);
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid(){
  for (let y = 0; y < grid_level; y ++){
    for (let x = 0; x < grid_level; x ++){
      if (grid[y][x] === 0){
        fill("white");
      }
      rect(x *cellSize, y * cellSize, cellSize, cellSize);
    } 
  }
}

function generateGrid(cols,rows){
  let newArr = [];
  for (let y = 0; y < rows; y ++){
    newArr.push([]); //each row push an array, represent single row in the grid
    for (let x = 0; x < cols; x ++){ //iterates over the columns for the current row
      newArr[y].push(0); //push 0 into each row
    }
  }
  return newArr;
}

