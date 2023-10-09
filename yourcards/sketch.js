const leftMargin = 50;
const topMargin = 50;
const cardW = 100;
const cardH = 150;
const gap = 20;
const numsCard = 5;

//Rank from 2 to A
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
//four French suits: Clubs (♣), Diamonds (♦), Hearts (♥) and Spades (♠)
const SUITS = ['C', 'D', 'H', 'S'];


function createCards() {
	const cards = [];
	for (let r of RANKS) {
		for (let s of SUITS) {
			let card = {//Object --> card with 3 properties rank,suit,turn
                rank: r,
                suit: s,
                turn: false,//false --> show back, true -->show card image
            };  
			cards.push(card);
		}
	}
	return cards;
}

function shuffleCards(array){
	let i,j,temp = 0;
	for (i = array.length - 1; i > 0; i--) {  
		// Generate random number  
		j = Math.floor(Math.random() * (i + 1)); 
		temp = array[i]; 
		array[i] = array[j]; 
		array[j] = temp; 
	} 
	return array; 
} 


function createYourCards(){
    let yc = [];
    let randomCards = shuffleCards(createCards());
    for (let i=0;i< numsCard;i++){
        temp = randomCards.pop();//chia ra
        yc.push(temp);//cho vao tay ban
    }
    return yc;
}

let yourCards = [];
let cardImagesLoaded = [];
let cardBackImageLoaded;
function preload() {
  cardBackImageLoaded = loadImage('./images/back.png');
  yourCards = createYourCards();
  for (let i=0;i<numsCard;i++){
    console.log(yourCards[i]);
    let imageFilename = './images/'+yourCards[i].rank+yourCards[i].suit+'.png';
    console.log(imageFilename);
    cardImagesLoaded.push(loadImage(imageFilename));
  }
}



//Turn all your cards by click button
function turnAllYourCards() {
  for (let i=0;i<numsCard;i++){
     if (yourCards[i].turn){
        yourCards[i].turn = false;
     }
     else{
        yourCards[i].turn = true;
     }
  }
}

//Turn all your cards by pressing Spacebar key
function keyPressed() {
  if (keyCode == 32) {// key = 'Spacebar'
     turnAllYourCards();
  }
}

function showYourCards(){
  for (let i=0;i<numsCard;i++){
    if (yourCards[i].turn){
        image(cardImagesLoaded[i],leftMargin+i*cardW+i*gap,topMargin,cardW,cardH);
    }
    else{
        image(cardBackImageLoaded,leftMargin+i*cardW+i*gap,topMargin,cardW,cardH);
    }
  }  
}



function setup() {
  createCanvas(2*leftMargin+numsCard*cardW+(numsCard-1)*gap,2*topMargin+cardH);
  background("white");
  button = createButton('Turn all your cards');
  button.position(width/2-60, topMargin/3);
  button.mousePressed(turnAllYourCards);
}


function draw() {
  showYourCards();
}

