let y2;
 let mainBall;
 let gameOver = false;
 let gems;
 let gem2;
 let gem3;
 let lastGemTime = 0;
 let scrollSpeed = 3

 function preload() {
   ocean = loadImage("ocean.jpg");
 }

 function setup() {
   createCanvas(700, 700);
   y1 = 50;
   y2 = -550;
   makeGemSquare();
   makePlayer();
 }

 function draw() {
   moveBackground();
   mainBall.moveTowards(mouse);

   // Check if 8 seconds have passed since the last gem was displayed
   if (frameCount - lastGemTime > 5 * 60) { // 60 frames per second
     // Display gem dots or gem square or gem rectangle based on the current frame count
     if (frameCount % 3 === 0) {
 		makeGemSquare();
     } 
 	else if (frameCount % 3 === 1) {
 		makeGemSquare();
 	  	makeGemDots();
     } 
 	else {
       makeGemRect();
     }
     lastGemTime = frameCount; // Update the last gem display time
   }
   updateGem()
 }

 function updateGem(){
 	// Update and draw the gems in gem3 group
 	if (gems) {
 		loopThroughGem(gems)
 	  }

 	  // Update and draw the gems in gem2 group
 	  if (gem2) {
 		loopThroughGem(gem2)
 	  }

 	  // Update and draw the gems in gems group
 	  if (gem3) {
 		loopThroughGem(gem3)
 	  }
 }



 // Makes background Scroll
 function moveBackground() {
   image(ocean, 0, y1, 700, 650);
   image(ocean, 0, y2, 700, 650);
   y1 += scrollSpeed;
   y2 += scrollSpeed;
   if (y1 >= 650) {
     y1 = -600;
   }
   if (y2 >= 650) {
     y2 = -600;
   }
 }

 function makeGemDots() {
   gems = new Group();
   gems.diameter = 10;
   gems.x = () => random(0, width);
   gems.y = 0
   gems.amount = 200;
 }

 function makeGemSquare() {
   gem2 = new Group();
   gem2.width = 50;
   gem2.height = 10;
   gem2.x = () => random(0, width);
   gem2.y = 0
   gem2.amount = 100;
 }

 function makeGemRect() {
   gem3 = new Group();
   gem3.width = 300;
   gem3.height = 10;
   gem3.x = width / 2;
   gem3.y = 0
   gem3.amount = 5;
   while (gem3.length < 9){
 	let newGem = new gem3.Sprite();
 	newGem.y = gem3.length * 10;
   }
 }

 function makePlayer() {
   noStroke();
   mainBall = new Sprite(width / 2, height / 2, 50, "grey");
 }

 function loopThroughGem(gemGroup){
 	for (let i = 0; i < gemGroup.length; i++) {
 		gemGroup[i].y += scrollSpeed; 
 	}
 }

 function theBalloon(){

 }