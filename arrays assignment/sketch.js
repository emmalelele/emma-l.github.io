// Emma Le
// Arrays and object notation assignment
// Extra for expert:
//

//Instructuon: press spacebar to flip all the cards, n to move to the next 5 cards 

const leftMargin = 50;
const topMargin = 50;
const cardW = 100;
const cardH = 150;
const gap = 20;
let numsCard = 5;
let loadedCardImg = [];
let backImg;
let takenCards = []

//2 to A
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
//clubs, diamonds, heart, spade
const suits = ["C", "D", "H", "S"];


function loadCardsImg(){
  loadedCardImg = [];//delete all first
  for (let i = 0; i < numsCard; i++){
	let matchingImg = takenCards[i].match;
	console.log(matchingImg)
    loadedCardImg.push(loadImage(matchingImg));
  }
}

function preload() {
	backImg = loadImage("./images/back.png");
	randomCard = shuffleCards(createCards()); //shuffle the deck
	takenCards = takeOutCards(); //take out the first 5 cards
	loadCardsImg();
}


function setup() {
	createCanvas(2 * leftMargin + numsCard * cardW + (numsCard - 1) * gap, 2 * topMargin + cardH);
	background("lightgray");
	para = createElement('p',"");
	para.position(leftMargin, height - topMargin);


}	  
function draw() {
	background("white")
	displayCards();
	para.html("Remaining cards: " + randomCard.length);
	if (randomCard.length < numsCard){
		para.html("Not enough card");
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
                turn: false,
				match: "./images/" + i + j + ".png"
            };  
			cards.push(card);
		}
	}
	return cards;
}
console.log(createCards())

//get random cards
function shuffleCards(array){
	let i = 0 ;
	let j = 0;
	let store = 0;
	for (i = array.length - 1; i > 0; i --){
		j = Math.floor(Math.random()*i);  //get the random elements from 0 to i - 1 
		store = array[i];
		array[i] = array[j];
		array[j] = store;
	}
	return array;
}

let randomCard = shuffleCards(createCards());
console.log(randomCard);

//take out only 5 cards to show on the screen
function takeOutCards(){
	let yourCards = [];
	for (let i = 0; i < numsCard; i++){
		let store = yourCards.push(randomCard.pop()) //take out the last 5 cards 
	}
	return yourCards;
}
console.log(takeOutCards());
takenCards = takeOutCards();
  

function nextCards(){
  if (randomCard.length >= numsCard){
    takenCards = takeOutCards();
    loadCardsImg();
  } 
}

//turn all your cards
function turnAllYourCards() {

	takenCards.forEach((element) => takenCards[element].turn = !takenCards[element].turn);
//   for (let i = 0; i < numsCard; i++) {
//     takenCards[i].turn = !takenCards[i].turn;
//   }
	displayCards(); 
}


function keyPressed() {
  if (keyCode === 32) { //space bar
    turnAllYourCards();
  }
  else if (keyCode === 78){ // n
	nextCards()
  }
}

function displayCards(){
  for (let i = 0; i < numsCard; i++){
    if (takenCards[i].turn){
        image(loadedCardImg[i], leftMargin + i * cardW + i* gap, topMargin, cardW, cardH);
    }
    else{
        image(backImg, leftMargin + i * cardW + i * gap, topMargin, cardW, cardH);
    }
  }  
}

