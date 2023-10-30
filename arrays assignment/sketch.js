// Emma Le
// Arrays and object notation assignment
// Extra for expert:
	// I used p5js built-in function "shuffle()" to shuffle the deck
	// Button to move cards and disable it when numbers of cards run out
	// Used "const" for unchangeable variables
	// Match the images with cards in the array and put it as an object notation
	// Discovered the use of forEach, instruction from https://www.freecodecamp.org/news/javascript-foreach-js-array-for-each-example/

//Instruction: press spacebar to flip all the cards, n to move to the next 5 cards 


//define variables
const leftMargin = 50;
const topMargin = 50;
const cardW = 100;
const cardH = 150;
const gap = 20;
let numsCard = 5;
let loadedCardImg = [];
let backImg;
let takenCards = [];
let randomCard;
let clickSound;
let endSound;

//2 to A
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

//clubs, diamonds, heart, spade
const suits = ["C", "D", "H", "S"];

//get the images match the cards in the array
function loadCardsImg(){
  loadedCardImg = [];//delete all first so we can get matching images
  for (let i = 0; i < numsCard; i++){
	let matchingImg = takenCards[i].match;
    loadedCardImg.push(loadImage(matchingImg));
  }
}

//load the images
function preload() {
  backImg = loadImage("./images/back.png");
  clickSound = loadSound("smb_kick.wav");
  endSound = loadSound("smb_mariodie.wav");
  randomCard = createCards(); //create the deck
  shuffleCards(randomCard); //shuffle the deck
  takenCards = takeOutCards(); // take out the first 5 cards
  loadCardsImg();
}

//set up
function setup() {
	createCanvas(2 * leftMargin + numsCard * cardW + (numsCard - 1) * gap, 2 * topMargin + cardH);
	para = createElement('p',"");
	para.position(leftMargin, height - topMargin);
	button = createButton("Next card");
	button.position(0,3);
	button.mousePressed(nextCards);
	// button.playSound(clickSound)
}

//draw cards on screen
function draw() {
	background("white")
	displayCards();
	para.html("Remaining cards: " + randomCard.length);
	if (randomCard.length < numsCard){ //when the cards run out means we can't take out another cards
		para.html("Not enough card"); 
		button.attribute("disabled", "true");
	}
}


//creating cards with matching ranks and suits
function createCards() {
	const cards = [];
	for (let i of ranks) {
		for (let j of suits) {
			let card = {
                rank: i,
                suit: j,
                turn: false, //the cards are upside down when display on screen
				match: "./images/" + i + j + ".png" //match images
            };  
			cards.push(card);
		}
	}
	return cards;
}


//get random cards
function shuffleCards(array){
	shuffle(array, true);
}


//take out only 5 cards to show on the screen
function takeOutCards(){
	let yourCards = [];
	for (let i = 0; i < numsCard; i++){
		yourCards.push(randomCard.pop())
	}	
	return yourCards;
}
  

//move to the next 5 cards in the deck
function nextCards(){
  if (randomCard.length >= numsCard){ //only move when there are enough cards
    takenCards = takeOutCards();
    loadCardsImg();
	endSound.play()
  } 
}

//turn all your cards
function turnAllYourCards() {
    for (let i of takenCards) {
        i.turn = !i.turn;
    }
    displayCards(); 
}


//display the cards
function displayCards(){
	takenCards.forEach((card, i) => {
		if (card.turn){
			image(loadedCardImg[i], leftMargin + i * cardW + i* gap, topMargin, cardW, cardH);
		}
		else{
			image(backImg, leftMargin + i * cardW + i * gap, topMargin, cardW, cardH);
		}
	  });
}

function keyPressed() {
	if (keyCode === 32) { //space bar
	  turnAllYourCards();
	}
	else if (keyCode === 78){ // n
	  nextCards();
	}
}

function mousePressed(){
	clickSound.play();
}