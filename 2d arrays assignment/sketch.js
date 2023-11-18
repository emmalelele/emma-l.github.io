// 2D aray assignment
// Emma Le
// November 13, 2023
// CS30 
// Extra for Experts:
// used JSON.stringify
// windowResize

const GRID_SIZE = 10;
let gridLevel = 2;
let grid;
let cellSize;
let gameOver = false;
let gameOverSound;
let winGameSound;
let clickSound;
let endGame = false;
const GAP = 7;

//color
let currentColor0 ;
let currentColor1 ;
let currentDeltaColor = 64;


// [gridLevel][currentDeltaColor]
let gameLevels = [
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
  [9, 2],
  [10, 1],
];
               
//starting level
let currentLevel = 1;

//set ups
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
  //loading sound
  gameOverSound = loadSound("smb_mariodie.wav"); 
  winGameSound = loadSound("smb_warning.wav")
  clickSound = loadSound("clicking.mp3")

  //get the grid
  grid = generateGrid(gridLevel, gridLevel);
  randomColor();
}

//display
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
  else { //draw the grid
    displayGrid(currentColor0, currentColor1);
    para2.html("Level: " + currentLevel);
  }

}

//resize window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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

//check if the mouse is pressed
function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);
  toggleCell();
}

//check where the mouse get pressed (0 or 1)
function toggleCell() {
  let mouseToClick = get(mouseX, mouseY);
  if (JSON.stringify(mouseToClick) === JSON.stringify(currentColor1.levels)) { //if the mouse is clicked on grid that is element 1
      nextLevel();
      clickSound.play()
      
      

  }
  else if (JSON.stringify(mouseToClick) === JSON.stringify(currentColor0.levels)) {//if the mouse is clicked on grid that is element 0
      gameOver = true;
      gameOverSound.play()
      
    }
}


//if the mouse is pressed on 1, advance to next level
function nextLevel(){
  currentLevel += 1;
  if (currentLevel < gameLevels.length){ //run through the 2d array gameLevel
    gridLevel = gameLevels[currentLevel - 1][0];
    currentDeltaColor = gameLevels[currentLevel - 1][1];
    grid = generateGrid(gridLevel, gridLevel);
    randomColor();
  }
  else{ //reach the end of the 2d array gameLevels
    endGame = true;
    gameOver = true;
  }
}

//get random color
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


//dísplay the grid
function displayGrid(c0, c1){
  colorMode(RGB);
  noStroke();

  //set the position of the grid
  let gridWidth = gridLevel * (cellSize + GAP);
  let gridHeight = gridLevel * (cellSize + GAP);

  let x1 = (width - gridWidth)/2
  let y1 = (height - gridHeight)/2

  for (let y = 0; y < gridLevel; y++){
    for (let x = 0; x < gridLevel; x++){
      if (grid[y][x] === 0){
        fill(c0);
      }
      else{
        fill(c1);
      }
      rect(x * (cellSize + GAP) + x1, y * (cellSize + GAP) + y1, cellSize, cellSize);
    } 
  }
}

//create the grid with 1 and 0 
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