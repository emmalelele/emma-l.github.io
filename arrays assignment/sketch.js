// Emma Le
// Arrays and object notation assignment

let numsCard = 5;

//2 to A
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
//clubs, diamonds, heart, spade
const suits = ["C", "D", "H", "S"];





function setup(){
	createCanvas(windowWidth, windowHeight); 
}

function draw(){
	background("black");
}


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

// get random
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


function takeOutCards(){
	let yourCards = [];
	for (i= 0; i < numsCard; i++){
		store = yourCards.push(randomCard.pop()) //take out the last 5 cards 
	}
	return yourCards;
}
console.log(takeOutCards());

