// Emma Le
// Arrays and object notation assignment

let numsCard = 5;

//2 to A
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
//clubs, diamonds, heart, spade
const suits = ["C", "D", "H", "S"];

let loadedCardImg = [];
function loadCardsImg(){
	for (let i = 0; i < numsCard; i ++){
		let matchingImg = "./images/"+takenCards[i].ranks+takenCards[i].suits+".png"
		loadedCardImg.push(matchingImg);
	}
}
console.log(loadedCardImg)


function preload(){
	let backImg = loadImage("'./images/back.png'");
	takenCards = createCards()
	loadCardsImg()
}

function nextCards(){
	if (randomCard.length>=numsCard){
		takenCards = takeOutCards();
		loadCardsImg();
	  } 
	}
 


function setup(){
	createCanvas(windowWidth, windowHeight); 
}

function draw(){
	background("black");
}

//creating cards with matching ranks and suits
function createCards() {
	const cards = [];
	for (let i of ranks) {
		for (let j of suits) {
			let card = {
                rank: i,
                suit: j,
                turn: false
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
let takenCards = []
console.log(randomCard);

//take out only 5 cards to show on the screen
function takeOutCards(){
	let yourCards = [];
	for (let i= 0; i < numsCard; i++){
		let store = yourCards.push(randomCard.pop()) //take out the last 5 cards 
	}
	return yourCards;
}
console.log(takeOutCards());
takenCards = takeOutCards();
