var game = {
	mode : null,
	options: null,
	deck : null,
	difficulty : null,
	tableMiddle : [],
	lastWon : null
};

var modes = {
	ROUNDS : "rounds",
	STABS : "stabs",
	DEATHMATCH : "deathmatch"
};

var difficulties = {
	EASY : "easy",
	MEDIUM : "medium",
	HARD : "hard"
};

var players = {
	PLAYER : "player",
	COMPUTER : "computer"
};

var userHand = {
	cards : [],
	topCard : null
};

var computerHand = {
	cards : [],
	topCard : null
};

function undoGame(){
 game = {
	mode : null,
	options: null,
	deck : null,
	difficulty : null,
	tableMiddle : [],
	lastWon : null
};

 userHand = {
	cards : [],
	topCard : null
};

 computerHand = {
	cards : [],
	topCard : null
};

}

function initGame(mode, options, deck) {
	console.log(database.decks[0]);
	game.mode = mode;
	game.options = options;
	game.deck = deck;
	userHand.cards = [];
	
	var numberCards = deck.numberCards;
	var restCards = 31;
	for (var i = 0; i < numberCards / 2; i++) {
		var random = Math.floor((Math.random() * restCards));
		userHand.cards[userHand.cards.length] = deck.cards[random];
		deck.cards.splice(random, 1);
		restCards--;
	}

	computerHand.cards = deck.cards;
	userHand.topCard = userHand.cards[0];
	computerHand.topCard = computerHand.cards[0];

	showTopCard();

}

function setEasy(){
	game.difficulty = difficulties.EASY;
}

function setMedium(){
	game.difficulty = difficulties.MEDIUM;
}

function setHard(){
	game.difficulty = difficulties.HARD;
}

function startAsDeathMatch() {
	$("#user_card_number_game").show();
	$("#user_card_number_duell").show();
	$("#computer_card_number_duell").show();
	
	var actualDeck;
	for (var i = 0; i < database.decks.length; i++) {
		if (database.decks[i].actualDeck === 1) {
			actualDeck = jQuery.extend(true, {}, database.decks[i]);
		}
	}
	initGame(modes.DEATHMATCH, null, actualDeck);
}

function startAsRounds(rounds){
	
	$("#user_card_number_game").show();
	$("#user_card_number_duell").show();
	$("#computer_card_number_duell").show();
	
	var actualDeck;
	for (var i = 0; i < database.decks.length; i++) {
		if (database.decks[i].actualDeck === 1) {
			actualDeck = jQuery.extend(true, {}, database.decks[i]);
		}
	}
	
	var options = {
		roundsToPlay : rounds,
		roundsPlayed: 0
	};
	initGame(modes.ROUNDS, options, actualDeck);	
}

function startAsStabs(stabs){
	$("#user_card_number_game").hide();
	$("#user_card_number_duell").hide();
	$("#computer_card_number_duell").hide();
	var actualDeck;
	for (var i = 0; i < database.decks.length; i++) {
		if (database.decks[i].actualDeck === 1) {
			actualDeck = jQuery.extend(true, {}, database.decks[i]);
		}
	}
	
	var options = {
		targetStabs : stabs,
		userStabs: 0,
		computerStabs:0
	};
	initGame(modes.STABS, options, actualDeck);
}

function showTopCard() {
	if(game.mode == modes.DEATHMATCH){
		$("#game_header_title").html('Deine Reihe');
	}else if(game.mode == modes.ROUNDS){
		$("#game_header_title").html('Runde '+(game.options.roundsPlayed+1));
	}else if(game.mode == modes.STABS){
		$("#game_header_title").html('Stand: '+game.options.userStabs+' - '+game.options.computerStabs);
	}
	console.log(userHand);
	console.log(computerHand);

	$("#game_content").children().remove();
	var card = userHand.topCard;
	var numberAttributes = game.deck.numberAttributes;
	var userCardsCount = userHand.cards.length;
	$("#game_content").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="' + card.cardPicture + '" /></div>');
	$("#game_content").removeClass('inactive');
	$("#user_card_number_game").removeClass('inactive');
	$("#game_header_title").removeClass('inactive');
	$("#game_footer_title").html(card.cardName);
	$("#user_card_number_game").html(userCardsCount);

	switch(numberAttributes) {
	case 3:
		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-3 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(card.attributes[0].attributeName);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-3 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).html(card.attributes[0].value + ' ' + card.attributes[0].unit);

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-3');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(card.attributes[1].attributeName);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-3 card-value');
		$(value2).attr('id', 'value2');
		$(value2).html(card.attributes[1].value + ' ' + card.attributes[1].unit);

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-3 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(card.attributes[2].attributeName);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-3 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).html(card.attributes[2].value + ' ' + card.attributes[2].unit);

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#game_content").append(bigCell);
		
		$(attribute1).add(value1).click(function() {
			$(attribute1).add(value1).addClass('selected-attribute');
			loadDuellPage(0);
		});
		$(attribute2).add(value2).click(function() {
			$(attribute2).add(value2).addClass('selected-attribute');
			loadDuellPage(1);
		});
		$(attribute3).add(value3).click(function() {
			$(attribute3).add(value3).addClass('selected-attribute');
			loadDuellPage(2);
		});
		
		break;
	case 4:
		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-4 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(card.attributes[0].attributeName);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-4 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).html(card.attributes[0].value + ' ' + card.attributes[0].unit);

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-4');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(card.attributes[1].attributeName);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-4 card-value');
		$(value2).attr('id', 'value2');
		$(value2).html(card.attributes[1].value + ' ' + card.attributes[1].unit);

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-4 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(card.attributes[2].attributeName);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-4 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).html(card.attributes[2].value + ' ' + card.attributes[2].unit);

		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-4');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(card.attributes[3].attributeName);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-4 card-value');
		$(value4).attr('id', 'value4');
		$(value4).html(card.attributes[3].value + ' ' + card.attributes[3].unit);

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#game_content").append(bigCell);

		$(attribute1).add(value1).click(function() {
			$(attribute1).add(value1).addClass('selected-attribute');
			loadDuellPage(0);
		});
		$(attribute2).add(value2).click(function() {
			$(attribute2).add(value2).addClass('selected-attribute');
			loadDuellPage(1);
		});
		$(attribute3).add(value3).click(function() {
			$(attribute3).add(value3).addClass('selected-attribute');
			loadDuellPage(2);
		});
		$(attribute4).add(value4).click(function() {
			$(attribute4).add(value4).addClass('selected-attribute');
			loadDuellPage(3);
		});

		break;
	case 5:

		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(card.attributes[0].attributeName);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).html(card.attributes[0].value + ' ' + card.attributes[0].unit);

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-5');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(card.attributes[1].attributeName);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-5 card-value');
		$(value2).attr('id', 'value2');
		$(value2).html(card.attributes[1].value + ' ' + card.attributes[1].unit);

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(card.attributes[2].attributeName);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).html(card.attributes[2].value + ' ' + card.attributes[2].unit);

		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-5');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(card.attributes[3].attributeName);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-5 card-value');
		$(value4).attr('id', 'value4');
		$(value4).html(card.attributes[3].value + ' ' + card.attributes[3].unit);

		var attribute5 = $("<div>");
		$(attribute5).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute5).attr('id', 'attribute5');
		$(attribute5).html(card.attributes[4].attributeName);
		var value5 = $("<div>");
		$(value5).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value5).attr('id', 'value5');
		$(value5).html(card.attributes[4].value + ' ' + card.attributes[4].unit);

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#game_content").append(bigCell);

		$(attribute1).add(value1).click(function() {
			$(attribute1).add(value1).addClass('selected-attribute');
			loadDuellPage(0);
		});
		$(attribute2).add(value2).click(function() {
			$(attribute2).add(value2).addClass('selected-attribute');
			loadDuellPage(1);
		});
		$(attribute3).add(value3).click(function() {
			$(attribute3).add(value3).addClass('selected-attribute');
			loadDuellPage(2);
		});
		$(attribute4).add(value4).click(function() {
			$(attribute4).add(value4).addClass('selected-attribute');
			loadDuellPage(3);
		});
		$(attribute5).add(value5).click(function() {
			$(attribute5).add(value5).addClass('selected-attribute');
			loadDuellPage(4);
		});
		break;
	default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}
}

function showComputerCard() {
	$("#game_content").children().remove();
	
	if(game.mode == modes.DEATHMATCH){
		$("#game_header_title").html('Gegner');
	}else if(game.mode == modes.ROUNDS){
		$("#game_header_title").html('Runde '+(game.options.roundsPlayed+1));
	}else if(game.mode == modes.STABS){
		$("#game_header_title").html('Stand: '+game.options.userStabs+' - '+game.options.computerStabs);
	}
	
	var card = computerHand.topCard;
	var numberAttributes = game.deck.numberAttributes;
	var computerCardsCount = computerHand.cards.length;
	$("#game_content").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="' + card.cardPicture + '" /></div>');
	$("#game_content").addClass('inactive');
	$("#game_footer_title").html(card.cardName);
	$("#game_footer_title").addClass('inactive');
	$("#user_card_number_game").html(computerCardsCount);
	$("#user_card_number_game").addClass('inactive');
	$("#game_header_title").addClass('inactive');

	var bigCell = $("<div>");
	$(bigCell).addClass('ui-grid-a card-cell-big');

	var attribute1 = $("<div>");
	$(attribute1).addClass('ui-block-a  even-cell');
	$(attribute1).attr('id', 'attribute1');
	$(attribute1).html(card.attributes[0].attributeName);
	var value1 = $("<div>");
	$(value1).addClass('ui-block-b even-cell card-value');
	$(value1).attr('id', 'value1');
	$(value1).html(card.attributes[0].value + ' ' + card.attributes[0].unit);

	var attribute2 = $("<div>");
	$(attribute2).addClass('ui-block-a');
	$(attribute2).attr('id', 'attribute2');
	$(attribute2).html(card.attributes[1].attributeName);
	var value2 = $("<div>");
	$(value2).addClass('ui-block-b card-value');
	$(value2).attr('id', 'value2');
	$(value2).html(card.attributes[1].value + ' ' + card.attributes[1].unit);

	var attribute3 = $("<div>");
	$(attribute3).addClass('ui-block-a even-cell');
	$(attribute3).attr('id', 'attribute3');
	$(attribute3).html(card.attributes[2].attributeName);
	var value3 = $("<div>");
	$(value3).addClass('ui-block-b even-cell card-value');
	$(value3).attr('id', 'value3');
	$(value3).html(card.attributes[2].value + ' ' + card.attributes[2].unit);

	switch(numberAttributes) {
	case 3:

		$(attribute1).addClass('card-cell-3');
		$(attribute2).addClass('card-cell-3');
		$(attribute3).addClass('card-cell-3');
		$(value1).addClass('card-cell-3');
		$(value2).addClass('card-cell-3');
		$(value3).addClass('card-cell-3');

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3);
		$("#game_content").append(bigCell);

		break;
	case 4:

		$(attribute1).addClass('card-cell-4');
		$(attribute2).addClass('card-cell-4');
		$(attribute3).addClass('card-cell-4');
		$(value1).addClass('card-cell-4');
		$(value2).addClass('card-cell-4');
		$(value3).addClass('card-cell-4');

		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-4');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(card.attributes[3].attributeName);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-4 card-value');
		$(value4).attr('id', 'value4');
		$(value4).html(card.attributes[3].value + ' ' + card.attributes[3].unit);

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4);
		$("#game_content").append(bigCell);

		break;
	case 5:

		$(attribute1).addClass('card-cell-5');
		$(attribute2).addClass('card-cell-5');
		$(attribute3).addClass('card-cell-5');
		$(value1).addClass('card-cell-5');
		$(value2).addClass('card-cell-5');
		$(value3).addClass('card-cell-5');

		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-5');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(card.attributes[3].attributeName);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-5 card-value');
		$(value4).attr('id', 'value4');
		$(value4).html(card.attributes[3].value + ' ' + card.attributes[3].unit);

		var attribute5 = $("<div>");
		$(attribute5).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute5).attr('id', 'attribute5');
		$(attribute5).html(card.attributes[4].attributeName);
		var value5 = $("<div>");
		$(value5).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value5).attr('id', 'value5');
		$(value5).html(card.attributes[4].value + ' ' + card.attributes[4].unit);

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#game_content").append(bigCell);

		break;
	default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}

	setTimeout(function() {
		makeDecision();
	}, 2000);

}

function loadDuellPage(attributeIndex) {
	var userCardsCount = userHand.cards.length;
	var computerCardsCount = computerHand.cards.length;
	$("#duell_content").children().remove();
	$("#duell_content").append('<div class="ui-grid-a card-cell-big computer-cell-duell"><img class="card-picture" src="' + computerHand.topCard.cardPicture + '" /></div>');
	$("#duell_content").append('<div class="ui-grid-a card-cell-big user-cell-duell"><img class="card-picture" src="' + userHand.topCard.cardPicture + '" /></div>');
	$("#duell_header").removeClass('duell-lost duell-draw');
	$("#duell_footer").removeClass('duell-won duell-draw');
	$("#duell_header_title").html('Computer');
	$("#duell_footer_title").html('Du');
	$("#user_card_number_duell").html(userCardsCount);
	$("#user_card_number_duell").removeClass('card-number-won card-number-draw');
	$("#computer_card_number_duell").removeClass('card-number-lost card-number-draw');
	$("#computer_card_number_duell").html(computerCardsCount);

	var userCard = userHand.topCard;
	var computerCard = computerHand.topCard;

	var userCell = $("<div>");
	$(userCell).addClass('ui-grid-a user-attribute-duell');

	var userAttribute = $("<div>");
	$(userAttribute).addClass('ui-block-a card-cell-5 even-cell');
	$(userAttribute).html(userCard.attributes[attributeIndex].attributeName);
	var userValue = $("<div>");
	$(userValue).addClass('ui-block-b card-cell-5 even-cell card-value');
	$(userValue).html(userCard.attributes[attributeIndex].value + ' ' + userCard.attributes[attributeIndex].unit);

	var computerCell = $("<div>");
	$(computerCell).addClass('ui-grid-a computer-attribute-duell');

	var computerAttribute = $("<div>");
	$(computerAttribute).addClass('ui-block-a card-cell-5 even-cell');
	$(computerAttribute).html(computerCard.attributes[attributeIndex].attributeName);
	var computerValue = $("<div>");
	$(computerValue).addClass('ui-block-b card-cell-5 even-cell card-value');
	$(computerValue).html(computerCard.attributes[attributeIndex].value + ' ' + computerCard.attributes[attributeIndex].unit);

	$(userCell).append(userAttribute, userValue);
	$(".user-cell-duell").prepend(userCell);
	$(computerCell).append(computerAttribute, computerValue);
	$(".computer-cell-duell").append(computerCell);

	$.mobile.changePage("#duell_page", {
		allowSamePageTransition : true,
		transition : "slide"
	});
	setTimeout(function() {
		handleDuell(userCard, computerCard, attributeIndex);
	}, 2000);
}

function handleDuell(userCard, computerCard, attributeIndex) {
	var userValue = userCard.attributes[attributeIndex].value;
	var computerValue = computerCard.attributes[attributeIndex].value;
	var highervalue = false;
	if (userCard.attributes[attributeIndex].higherValue == 1) {
		highervalue = true;
	}
	if (highervalue) {
		if (computerValue < userValue) {

			$(".user-attribute-duell").addClass('duell-won');
			$(".user-attribute-duell").children().removeClass('even-cell');
			$("#duell_footer").addClass('duell-won');
			$("#user_card_number_duell").addClass('card-number-won');

			setTimeout(function() {
				if(game.mode == modes.DEATHMATCH){
					duellWon(userCard, computerCard);
				}else if(game.mode == modes.ROUNDS){
					roundWon(userCard, computerCard);
				}else if(game.mode == modes.STABS){
					stabWon(userCard, computerCard);
				}
			}, 2000);

		} else if (computerValue > userValue) {

			$(".computer-attribute-duell").addClass('duell-lost');
			$(".computer-attribute-duell").children().removeClass('even-cell');
			$("#duell_header").addClass('duell-lost');
			$("#computer_card_number_duell").addClass('card-number-lost');

			setTimeout(function() {
				if(game.mode == modes.DEATHMATCH){
					duellLost(userCard, computerCard);
				}else if(game.mode == modes.ROUNDS){
					roundLost(userCard, computerCard);
				}else if(game.mode == modes.STABS){
					stabLost(userCard, computerCard);
				}
			}, 2000);

		} else {

			$(".computer-attribute-duell").addClass('duell-draw');
			$(".computer-attribute-duell").children().removeClass('even-cell');
			$("#duell_header").addClass('duell-draw');
			$("#computer_card_number_duell").addClass('card-number-draw');

			$(".user-attribute-duell").addClass('duell-draw');
			$(".user-attribute-duell").children().removeClass('even-cell');
			$("#duell_footer").addClass('duell-draw');
			$("#user_card_number_duell").addClass('card-number-draw');

			setTimeout(function() {
				if(game.mode == modes.DEATHMATCH){
					duellDraw(userCard, computerCard);
				}else if(game.mode == modes.ROUNDS){
					roundDraw(userCard, computerCard);
				}else if(game.mode == modes.STABS){
					stabDraw(userCard, computerCard);
				}
			}, 2000);

		}
	} else {
		if (computerValue < userValue) {

			$(".computer-attribute-duell").addClass('duell-lost');
			$(".computer-attribute-duell").children().removeClass('even-cell');
			$("#duell_header").addClass('duell-lost');
			$("#computer_card_number_duell").addClass('card-number-lost');

			setTimeout(function() {
				if(game.mode == modes.DEATHMATCH){
					duellLost(userCard, computerCard);
				}else if(game.mode == modes.ROUNDS){
					roundLost(userCard, computerCard);
				}else if(game.mode == modes.STABS){
					stabLost(userCard, computerCard);
				}
			}, 2000);

		} else if (computerValue > userValue) {

			$(".user-attribute-duell").addClass('duell-won');
			$(".user-attribute-duell").children().removeClass('even-cell');
			$("#duell_footer").addClass('duell-won');
			$("#user_card_number_duell").addClass('card-number-won');

			setTimeout(function() {
				if(game.mode == modes.DEATHMATCH){
					duellWon(userCard, computerCard);
				}else if(game.mode == modes.ROUNDS){
					roundWon(userCard, computerCard);
				}else if(game.mode == modes.STABS){
					stabWon(userCard, computerCard);
				}
			}, 2000);

		} else {

			$(".computer-attribute-duell").addClass('duell-draw');
			$(".computer-attribute-duell").children().removeClass('even-cell');
			$("#duell_header").addClass('duell-draw');
			$("#computer_card_number_duell").addClass('card-number-draw');

			$(".user-attribute-duell").addClass('duell-draw');
			$(".user-attribute-duell").children().removeClass('even-cell');
			$("#duell_footer").addClass('duell-draw');
			$("#user_card_number_duell").addClass('card-number-draw');

			setTimeout(function() {
				if(game.mode == modes.DEATHMATCH){
					duellDraw(userCard, computerCard);
				}else if(game.mode == modes.ROUNDS){
					roundDraw(userCard, computerCard);
				}else if(game.mode == modes.STABS){
					stabDraw(userCard, computerCard);
				}
			}, 2000);
		}
	}
}

function duellWon(userCard, computerCard) {
	if (computerHand.cards.length === 1) {
		alert("CONGRATULATIONS");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	} else {
		game.lastWon = players.PLAYER;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		userHand.cards.splice(userHand.cards.length, 2, userCard, computerCard);

		if (game.tableMiddle.length !== 0) {
			for (var i = 0; i < game.tableMiddle.length; i++) {
				userHand.cards[userHand.cards.length] = game.tableMiddle[i];
			}
			if(game.mode != modes.STABS){
				alert("Du hast die " + game.tableMiddle.length + " Karten auf dem Tisch gewonnen");
			}else{
				alert("Du hast einen " + ((game.tableMiddle.length/2)+1) + " -fachen Stich erzielt");
			}
			game.tableMiddle = [];
		}

		userHand.topCard = userHand.cards[0];
		computerHand.topCard = computerHand.cards[0];
		showTopCard();
		$.mobile.changePage("#new_game", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}
}

function duellLost(userCard, computerCard) {
	if (userHand.cards.length === 1) {
		alert("GAME OVER");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	} else {
		game.lastWon = players.COMPUTER;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		computerHand.cards.splice(computerHand.cards.length, 2, userCard, computerCard);

		if (game.tableMiddle.length !== 0) {
			for (var i = 0; i < game.tableMiddle.length; i++) {
				computerHand.cards[computerHand.cards.length] = game.tableMiddle[i];
			}
			if(game.mode != modes.STABS){
				alert("Dein Gegner hat die " + game.tableMiddle.length + " Karten auf dem Tisch gewonnen");
			}else{
				alert("Dein Gegner hat einen " + ((game.tableMiddle.length/2)+1) + " -fachen Stich erzielt");
			}
			game.tableMiddle = [];
		}

		userHand.topCard = userHand.cards[0];
		computerHand.topCard = computerHand.cards[0];
		showComputerCard();
		$.mobile.changePage("#new_game", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}
}

function duellDraw(userCard, computerCard) {
	if(userHand.cards.length === 1 && computerHand.cards.length >1) {
		alert("GAME OVER");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else if(computerHand.cards.length === 1 && userHand.cards.length >1){
		alert("CONGRATULATIONS");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else if(computerHand.cards.length === 1 && userHand.cards.length === 1){
		alert("DRAW");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else{
		game.tableMiddle[game.tableMiddle.length] = userCard;
		game.tableMiddle[game.tableMiddle.length] = computerCard;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		userHand.topCard = userHand.cards[0];
		computerHand.topCard = computerHand.cards[0];
	
		alert("Karten wurden auf den Tisch gelegt");
	
		if (game.lastWon === players.PLAYER) {
			showTopCard();
		} else {
			showComputerCard();
		}
	
		$.mobile.changePage("#new_game", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}
}

function roundWon(userCard, computerCard) {
		game.lastWon = players.PLAYER;
		game.options.roundsPlayed++;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		userHand.cards.splice(userHand.cards.length, 2, userCard, computerCard);

		if (game.tableMiddle.length !== 0) {
			for (var i = 0; i < game.tableMiddle.length; i++) {
				userHand.cards[userHand.cards.length] = game.tableMiddle[i];
			}
			alert("Du hast die " + game.tableMiddle.length + " Karten auf dem Tisch gewonnen");
			game.tableMiddle = [];
		}
		
		if (computerHand.cards.length === 0 || (game.options.roundsPlayed == game.options.roundsToPlay && userHand.cards.length > computerHand.cards.length)) {
			alert("CONGRATULATIONS");
			$.mobile.changePage("#menu", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}else if((game.options.roundsPlayed == game.options.roundsToPlay && userHand.cards.length < computerHand.cards.length)){
			alert("GAME OVER");
			$.mobile.changePage("#menu", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}else if((game.options.roundsPlayed == game.options.roundsToPlay && userHand.cards.length == computerHand.cards.length)){
			alert("DRAW");
			$.mobile.changePage("#menu", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}
		else{
			userHand.topCard = userHand.cards[0];
			computerHand.topCard = computerHand.cards[0];
			showTopCard();
			$.mobile.changePage("#new_game", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}
}

function roundLost(userCard, computerCard) {
		game.lastWon = players.COMPUTER;
		game.options.roundsPlayed++;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		computerHand.cards.splice(computerHand.cards.length, 2, userCard, computerCard);

		if (game.tableMiddle.length !== 0) {
			for (var i = 0; i < game.tableMiddle.length; i++) {
				computerHand.cards[computerHand.cards.length] = game.tableMiddle[i];
			}
			alert("Computer hat die " + game.tableMiddle.length + " Karten auf dem Tisch gewonnen");
			game.tableMiddle = [];
		}
		
		if (userHand.cards.length === 0 || (game.options.roundsPlayed == game.options.roundsToPlay && userHand.cards.length < computerHand.cards.length)) {
			alert("GAME OVER");
			$.mobile.changePage("#menu", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}else if((game.options.roundsPlayed == game.options.roundsToPlay && userHand.cards.length > computerHand.cards.length)){
			alert("GAME WON");
			$.mobile.changePage("#menu", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}else if((game.options.roundsPlayed == game.options.roundsToPlay && userHand.cards.length == computerHand.cards.length)){
			alert("DRAW");
			$.mobile.changePage("#menu", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}
		else{

			userHand.topCard = userHand.cards[0];
			computerHand.topCard = computerHand.cards[0];
			showComputerCard();
			$.mobile.changePage("#new_game", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}
}

function roundDraw(userCard, computerCard) {
	game.options.roundsPlayed++;
	if((userHand.cards.length === 1 && computerHand.cards.length >1) || (game.options.roundsPlayed == game.options.roundsToPlay && computerHand.cards.length > userHand.cards.length)) {
		alert("GAME OVER");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else if((computerHand.cards.length === 1 && userHand.cards.length >1) || (game.options.roundsPlayed == game.options.roundsToPlay && computerHand.cards.length < userHand.cards.length)){
		alert("CONGRATULATIONS");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else if((computerHand.cards.length === 1 && userHand.cards.length === 1) || (game.options.roundsPlayed == game.options.roundsToPlay && computerHand.cards.length == userHand.cards.length)){
		alert("DRAW");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else{
		game.tableMiddle[game.tableMiddle.length] = userCard;
		game.tableMiddle[game.tableMiddle.length] = computerCard;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		userHand.topCard = userHand.cards[0];
		computerHand.topCard = computerHand.cards[0];
	
		alert("Karten wurden auf den Tisch gelegt");
	
		if (game.lastWon === players.PLAYER) {
			showTopCard();
		} else {
			showComputerCard();
		}
	
		$.mobile.changePage("#new_game", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}
}

function stabWon(userCard, computerCard) {
		game.lastWon = players.PLAYER;
		game.options.userStabs++;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		userHand.cards.splice(userHand.cards.length, 2, userCard, computerCard);

		if (game.tableMiddle.length !== 0) {
			for (var i = 0; i < game.tableMiddle.length; i++) {
				userHand.cards[userHand.cards.length] = game.tableMiddle[i];
			}
			alert("Du hast die " + game.tableMiddle.length + " Karten auf dem Tisch gewonnen");
			game.options.userStabs += (game.tableMiddle.length/2);
			game.tableMiddle = [];
		}
		
		if (computerHand.cards.length === 0 || (game.options.userStabs == game.options.targetStabs)) {
			alert("CONGRATULATIONS");
			$.mobile.changePage("#menu", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}else{
			userHand.topCard = userHand.cards[0];
			computerHand.topCard = computerHand.cards[0];
			showTopCard();
			$.mobile.changePage("#new_game", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}
}

function stabLost(userCard, computerCard) {
		game.lastWon = players.COMPUTER;
		game.options.computerStabs++;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		computerHand.cards.splice(computerHand.cards.length, 2, userCard, computerCard);

		if (game.tableMiddle.length !== 0) {
			for (var i = 0; i < game.tableMiddle.length; i++) {
				computerHand.cards[computerHand.cards.length] = game.tableMiddle[i];
			}
			alert("Computer hat die " + game.tableMiddle.length + " Karten auf dem Tisch gewonnen");
			game.options.computerStabs += (game.tableMiddle.length/2);
			game.tableMiddle = [];
		}
		
		if (userHand.cards.length === 0 || (game.options.computerStabs == game.options.targetStabs)) {
			alert("GAME OVER");
			$.mobile.changePage("#menu", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}else{

			userHand.topCard = userHand.cards[0];
			computerHand.topCard = computerHand.cards[0];
			showComputerCard();
			$.mobile.changePage("#new_game", {
				allowSamePageTransition : true,
				transition : "slide",
				reverse : "true"
			});
		}
}

function stabDraw(userCard, computerCard) {
	if(userHand.cards.length === 1 && computerHand.cards.length >1) {
		alert("GAME OVER");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else if(computerHand.cards.length === 1 && userHand.cards.length >1){
		alert("CONGRATULATIONS");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else if(computerHand.cards.length === 1 && userHand.cards.length === 1){
		alert("DRAW");
		$.mobile.changePage("#menu", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}else{
		game.tableMiddle[game.tableMiddle.length] = userCard;
		game.tableMiddle[game.tableMiddle.length] = computerCard;
		userHand.cards.splice(0, 1);
		computerHand.cards.splice(0, 1);
		userHand.topCard = userHand.cards[0];
		computerHand.topCard = computerHand.cards[0];
	
		alert("Karten wurden auf den Tisch gelegt");
	
		if (game.lastWon === players.PLAYER) {
			showTopCard();
		} else {
			showComputerCard();
		}
	
		$.mobile.changePage("#new_game", {
			allowSamePageTransition : true,
			transition : "slide",
			reverse : "true"
		});
	}
}

function makeDecision() {
	var numberAttributes = game.deck.numberAttributes;
	if(game.difficulty === difficulties.MEDIUM){
		var random = Math.floor((Math.random() * numberAttributes));
		var selectorAttr = '#attribute' + (random + 1);
		var selectorVal = '#value' + (random + 1);
		$(selectorAttr).add(selectorVal).addClass('selected-attribute');
	
		setTimeout(function() {
			loadDuellPage(random);
		}, 2000);
	}else if(game.difficulty === difficulties.HARD){
		var winnerAttributes = [];
		for(var i=0;i<numberAttributes;i++){
			var currAttr = computerHand.topCard.attributes[i];
			if(currAttr.higherValue == 1){
				if(currAttr.value >= currAttr.average){
					winnerAttributes[winnerAttributes.length] = i;
				}
			}else{
				if(currAttr.value < currAttr.average){
					winnerAttributes[winnerAttributes.length] = i;
				}
			}
		}
		
		if(winnerAttributes.length !== 0){
			var random =Math.floor((Math.random() * winnerAttributes.length));
			var selectedAttributeIndex = winnerAttributes[random];	
			var selectorAttr = '#attribute' + (selectedAttributeIndex + 1);
			var selectorVal = '#value' + (selectedAttributeIndex + 1);
			$(selectorAttr).add(selectorVal).addClass('selected-attribute');
		
			setTimeout(function() {
				loadDuellPage(selectedAttributeIndex);
			}, 2000);
		}else{
			var random = Math.floor((Math.random() * numberAttributes));
			var selectorAttr = '#attribute' + (random + 1);
			var selectorVal = '#value' + (random + 1);
			$(selectorAttr).add(selectorVal).addClass('selected-attribute');
		
			setTimeout(function() {
				loadDuellPage(random);
			}, 2000);
		}
	}else if(game.difficulty === difficulties.EASY){
		var winnerAttributes = [];
		for(var i=0;i<numberAttributes;i++){
			var currAttr = computerHand.topCard.attributes[i];
			if(currAttr.higherValue == 1){
				if(currAttr.value <= currAttr.average){
					winnerAttributes[winnerAttributes.length] = i;
				}
			}else{
				if(currAttr.value > currAttr.average){
					winnerAttributes[winnerAttributes.length] = i;
				}
			}
		}
		
		if(winnerAttributes.length !== 0){
			var random =Math.floor((Math.random() * winnerAttributes.length));
			var selectedAttributeIndex = winnerAttributes[random];	
			var selectorAttr = '#attribute' + (selectedAttributeIndex + 1);
			var selectorVal = '#value' + (selectedAttributeIndex + 1);
			$(selectorAttr).add(selectorVal).addClass('selected-attribute');
		
			setTimeout(function() {
				loadDuellPage(selectedAttributeIndex);
			}, 2000);
		}else{
			var random = Math.floor((Math.random() * numberAttributes));
			var selectorAttr = '#attribute' + (random + 1);
			var selectorVal = '#value' + (random + 1);
			$(selectorAttr).add(selectorVal).addClass('selected-attribute');
		
			setTimeout(function() {
				loadDuellPage(random);
			}, 2000);
		}
	}
}
