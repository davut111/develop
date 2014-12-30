var game = {
	mode:null,
	options:null,
	deck:null,
	difficulty:null
};

var modes ={
	ROUNDS:"rounds",
	STABS: "stabs",
	DEATHMATCH:"deathmatch"
};

var difficulties ={
	EASY:"easy",
	NORMAL: "normal",
	DIFFICULT:"difficult"
};

var userHand = {
	cards:[],
	topCard: null
};

var computerHand = {
	cards:[],
	topCard: null
};

function initGame(mode,options,deck,difficulty){
	game.mode = mode;
	game.options = options;
	game.deck = deck;
	game.difficulty = difficulty;
	
	var numberCards = deck.numberCards;
	var restCards =31;
	for(var i=0;i<numberCards/2;i++){
		var random = Math.floor((Math.random() * restCards));
		userHand.cards[userHand.cards.length] = deck.cards[random];
		deck.cards.splice(random,1);
		restCards--;	
	}
	
	computerHand.cards = deck.cards;
	userHand.topCard =userHand.cards[0];
	computerHand.topCard =computerHand.cards[0];
	
	console.log(userHand);
	console.log(computerHand);	
	
	showTopCard();
	
}

function startAsDeathMatch(){
	var actualDeck;
	for(var i=0;i<database.decks.length;i++){
		if(database.decks[i].actualDeck === 1){
			actualDeck = database.decks[i];
		}
	}
	initGame(modes.DEATHMATCH,null,actualDeck,difficulties.NORMAL);
}

function showTopCard(){
	$("#game_content").children().remove();
	var card = userHand.topCard;
	var numberAttributes = game.deck.numberAttributes;
	$("#game_content").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="img/'+card.cardPicture+'" /></div>');
	$("#game_footer_title").html(card.cardName);
	switch(numberAttributes){
		case 3:
			$("#game_content").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-3 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-3">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-3 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div></div>');
			break;
		case 4:
			$("#game_content").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-4 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-4 ">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-4 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div>'+
						'<div class="ui-block-a card-cell-4">'+card.attributes[3].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[3].value+' '+card.attributes[3].unit+'</div></div>');
			break;
		case 5:
			$("#game_content").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 ">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5  card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 ">'+card.attributes[3].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5  card-value">'+card.attributes[3].value+' '+card.attributes[3].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[4].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[4].value+' '+card.attributes[4].unit+'</div></div>');
			break;
		default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}
}
