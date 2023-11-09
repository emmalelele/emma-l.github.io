// Project Title
// Emma Le
// Date
//
// Extra for Experts:
// used JSON.stringify

const GRID_SIZE = 10;
let grid_level = 2;
let grid;
let cellSize;
let gameOver = false;
let gameOverSound;
let bgSound;
let endGame = false;
const GAP = 7;

let currentColor0 = [];
let currentColor1 = [];
let currentDeltaColor = 64;


// [grid_level][currentDeltaColor]
const gameLevels = [
  [2, 64], 
  [2, 62],  
  [3, 54], 
  [3, 51],  
  [4, 48],   
  [4, 45],  
  [5, 40],  
  [5, 37],  
  [6, 32],  
  [6, 29],  
  [7, 20],  
  [7, 15],  
  [8, 10],  
  [8, 5],   
];
               

let currentLevel = 1;




function setup() {
  para1 = createElement('p', "");
  para2 = createElement('p', "");
  para1.position(windowWidth/2 - 25,windowHeight/2);
  para2.position(width/2,height/2);
  createCanvas(windowWidth, windowHeight);
  if (height > width){
    cellSize = width/GRID_SIZE;
  }
  else{
    cellSize = height/GRID_SIZE;
  }
  gameOverSound = loadSound("smb_mariodie.wav");
  bgSound = loadSound("bgsound.mp3")
  grid = generateGrid(grid_level, grid_level);
  console.log(grid);
  randomColor();
}

function draw() {
  background(220);
  if (gameOver) {
    if (endGame) {
      para1.html("Good job!");
    } 
    else {
      para1.html("Game Over!");
      
    }
  } 
  else {
    displayGrid(currentColor0, currentColor1, false);
    para2.html("Level: " + currentLevel);
  }

}

//changing cursor
function mouseMoved(){ 
  let mousePosition = get(mouseX, mouseY);
  //check if the mouse is within the grids
  if (JSON.stringify(mousePosition) === JSON.stringify(currentColor0.levels) || JSON.stringify(mousePosition) === JSON.stringify(currentColor1.levels)){
     cursor(HAND);
     
  }
  else{
     cursor("not-allowed");
     
  }
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell();//current cell
}


function toggleCell() {
  let mouseToClick = get(mouseX, mouseY);
  if (JSON.stringify(mouseToClick) === JSON.stringify(currentColor1.levels)) { //if the mouse is clicked on grid that is element 1
      nextLevel();
      bgSound.play()
  }
  else if (JSON.stringify(mouseToClick) === JSON.stringify(currentColor0.levels)) {//if the mouse is clicked on grid that is element 0
      gameOver = true;
      gameOverSound.play()
    }
}
console.log(currentColor1.levels)


function nextLevel(){
  currentLevel += 1;
  if (currentLevel < gameLevels.length){
    grid_level = gameLevels[currentLevel - 1][0];
    currentDeltaColor = gameLevels[currentLevel - 1][1];
    randomColor();
    grid = generateGrid(grid_level, grid_level);
  }
  else{
    endGame = true;
    gameOver = true;
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
  if (colorTemp[i] > currentDeltaColor){ //check which color component [r,g,b] is greater than the general color
    colorTemp[i] -= currentDeltaColor; //slightly lighter
  }
  else{
    colorTemp[i] += currentDeltaColor; //slightly darker
  }
  currentColor1 = color(colorTemp[0],colorTemp[1],colorTemp[2]); //set one square with slightly different color
}



function displayGrid(c0, c1, showTheAnswer){
  colorMode(RGB);
  noStroke();
  let gridWidth = grid_level * (cellSize + GAP);
  let gridHeight = grid_level * (cellSize + GAP);

  let x1 = (width - gridWidth)/2
  let y1 = (height - gridHeight)/2

  for (let y = 0; y < grid_level; y++){
    for (let x = 0; x < grid_level; x++){
      if (grid[y][x] === 0){
        fill(c0);
      }
      else{
        fill(c1);
        if (showTheAnswer){
          strokeWeight(2*GAP);
          stroke(0);
        }
      }
      rect(x * (cellSize + GAP) + x1, y * (cellSize + GAP) + y1, cellSize, cellSize);
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