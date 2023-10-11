// Emma Le

let numsCard = 5;

//2 to A
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
//clubs, diamonds, heart, spade
const suits = ["C", "D", "H", "S"];



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

