// Project Title
// Emma Le
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let GRID_SIZE = 5;
let grid_level = 3;
let grid;
let cellSize;
let gap = 4;

let currentColor0 = [];
let currentColor1 = [];
let currentDeltaColor = 70;




function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height > width){
    cellSize = width/GRID_SIZE;
  }
  else{
    cellSize = height/GRID_SIZE;
  }
  grid = generateGrid(grid_level, grid_level);
  randomColor();
}

function draw() {
  background(220);
  displayGrid(currentColor0,currentColor1);
}


function randomColor(){
  colorMode(RGB); 
  let r = Math.floor(random()*255);
  let g = Math.floor(random()*255);
  let b = Math.floor(random()*255);

  currentColor0 = color(r,g,b); //set the general color to all the square
  
  let colorTemp = [r,g,b]; 
  let i = Math.floor(random()*3);
  if (colorTemp[i]>currentDeltaColor){ 
    colorTemp[i] -= currentDeltaColor;
  }
  else{
    colorTemp[i] += currentDeltaColor; 
  }
  currentColor1 = color(colorTemp[0],colorTemp[1],colorTemp[2]); //set one square with slightly different color
}



function displayGrid(c0, c1){
  noStroke();
  for (let y = 0; y < grid_level; y ++){
    for (let x = 0; x < grid_level; x ++){
      if (grid[y][x] === 0){
        fill(c0);
      }
      else{
        fill(c1);
      }
      rect(x * (cellSize + gap), y * (cellSize + gap), cellSize, cellSize);
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
  
  // one cell to be 1
  let randomRow = floor(random(rows));
  let randomCol = floor(random(cols));
                        
  newArr[randomRow][randomCol] = 1; 
  console.log(newArr);

  return newArr;
}

