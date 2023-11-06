// Project Title
// Emma Le
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const GRID_SIZE = 10;
let grid_level = 2;
let grid;
let cellSize;
let gameOver = false;
const GAP = 6;

let currentColor0 = [];
let currentColor1 = [];
let currentDeltaColor = 64;

let endGame = false;

// [grid_level][currentDeltaColor]
const levels = [ [2,64],[2,62],[2,60],
                 [3,54],[3,51],[3,50],
                 [4,44],[4,42],[4,41],[4,39],
                 [5,38],[5,36],[5,34],[5,32],[5,30],
                 [6,29],[6,28],[6,27],[6,26],[6,25],[6,24],[6,23],[6,22],[6,21],[6,20]
               ]
               

let currentLevel = 0;




function setup() {
  para1 = createElement('p', "");
  para1.position(width/3+8,height/3);
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
  if (gameOver === false){
    displayGrid(currentColor0,currentColor1);
  }
  else if (endGame){
    para1.html("Gj");
  }
  else{
    para1.html("Game Over!");
  }

}

//changing cursor
function mouseMoved(){ 
  let pixelColor = get(mouseX, mouseY);
  //check if the mouse is within the grids
  if (JSON.stringify(pixelColor) === JSON.stringify(currentColor0.levels) || JSON.stringify(pixelColor) === JSON.stringify(currentColor1.levels)){
     cursor(HAND);
     
  }
  else{
     cursor("not-allowed");
     
  }
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell(x, y);//current cell
}


function toggleCell(x, y) {

  let mouseToClick = get(mouseX, mouseY);
  if (JSON.stringify(mouseToClick) === JSON.stringify(currentColor1.levels)) { //if the mouse is clicked on grid that is element 1
      nextLevel();
  }
  else if (JSON.stringify(mouseToClick) === JSON.stringify(currentColor0.levels)) {//if the mouse is clicked on grid that is element 0
      gameOver = true;
    }
}


function nextLevel(){
  currentLevel += 1;
  if (currentLevel < levels.length){
    grid_level = levels[currentLevel][0];
    currentDeltaColor = levels[currentLevel][1];
    randomColor();
    grid = generateGrid(grid_level, grid_level);
  }
  else{
    endGame = true;
  }
}


function randomColor(){
  colorMode(RGB); 
  let r = Math.floor(random()*255);
  let g = Math.floor(random()*255);
  let b = Math.floor(random()*255);

  currentColor0 = color(r,g,b); //set the general color to all the square
  
  let colorTemp = [r,g,b]; 
  let i = Math.floor(random()*3); // random number 0, 1 or 3
  if (colorTemp[i] > currentDeltaColor){ //check which color component [r,g,b] is greater than 
    colorTemp[i] -= currentDeltaColor; //slightly lighter
  }
  else{
    colorTemp[i] += currentDeltaColor; //slightly darker
  }
  currentColor1 = color(colorTemp[0],colorTemp[1],colorTemp[2]); //set one square with slightly different color
}



function displayGrid(c0, c1){
  colorMode(RGB);
  noStroke();
  for (let y = 0; y < grid_level; y++){
    for (let x = 0; x < grid_level; x++){
      if (grid[y][x] === 0){
        fill(c0);
      }
      else{
        fill(c1);
      }
      rect(x * (cellSize + GAP), y * (cellSize + GAP), cellSize, cellSize);
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

  return newArr;
}