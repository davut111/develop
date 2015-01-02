var game = {
	mode : null,
	options : null,
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
	NORMAL : "normal",
	DIFFICULT : "difficult"
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

function initGame(mode, options, deck, difficulty) {
	game.mode = mode;
	game.options = options;
	game.deck = deck;
	game.difficulty = difficulty;

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

function startAsDeathMatch() {
	var actualDeck;
	for (var i = 0; i < database.decks.length; i++) {
		if (database.decks[i].actualDeck === 1) {
			actualDeck = database.decks[i];
		}
	}
	initGame(modes.DEATHMATCH, null, actualDeck, difficulties.NORMAL);
}

function showTopCard() {
	$("#game_content").children().remove();
	var card = userHand.topCard;
	var numberAttributes = game.deck.numberAttributes;
	var userCardsCount = userHand.cards.length;
	$("#game_content").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="img/' + card.cardPicture + '" /></div>');
	$("#game_content").removeClass('inactive');
	$("#game_footer_title").html(card.cardName);
	$("#game_header_title").html('Deine Reihe');
	$("#user_card_number_game").html(userCardsCount);

	console.log(userHand);
	console.log(computerHand);

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
	var card = computerHand.topCard;
	var numberAttributes = game.deck.numberAttributes;
	var computerCardsCount = computerHand.cards.length;
	$("#game_content").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="img/' + card.cardPicture + '" /></div>');
	$("#game_content").addClass('inactive');
	$("#game_footer_title").html(card.cardName);
	$("#game_header_title").html('Computer');
	$("#user_card_number_game").html(computerCardsCount);

	console.log(userHand);
	console.log(computerHand);

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
	}, 1500);

}

function loadDuellPage(attributeIndex) {
	var userCardsCount = userHand.cards.length;
	var computerCardsCount = computerHand.cards.length;
	$("#duell_content").children().remove();
	$("#duell_content").append('<div class="ui-grid-a card-cell-big computer-cell-duell"><img class="card-picture" src="img/' + computerHand.topCard.cardPicture + '" /></div>');
	$("#duell_content").append('<div class="ui-grid-a card-cell-big user-cell-duell"><img class="card-picture" src="img/' + userHand.topCard.cardPicture + '" /></div>');
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
	}, 1500);
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
				duellWon(userCard, computerCard);
			}, 1500);

		} else if (computerValue > userValue) {

			$(".computer-attribute-duell").addClass('duell-lost');
			$(".computer-attribute-duell").children().removeClass('even-cell');
			$("#duell_header").addClass('duell-lost');
			$("#computer_card_number_duell").addClass('card-number-lost');

			setTimeout(function() {
				duellLost(userCard, computerCard);
			}, 1500);

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
				duellDraw(userCard, computerCard);
			}, 1500);

		}
	} else {
		if (computerValue < userValue) {

			$(".computer-attribute-duell").addClass('duell-lost');
			$(".computer-attribute-duell").children().removeClass('even-cell');
			$("#duell_header").addClass('duell-lost');
			$("#computer_card_number_duell").addClass('card-number-lost');

			setTimeout(function() {
				duellLost(userCard, computerCard);
			}, 1500);

		} else if (computerValue > userValue) {

			$(".user-attribute-duell").addClass('duell-won');
			$(".user-attribute-duell").children().removeClass('even-cell');
			$("#duell_footer").addClass('duell-won');
			$("#user_card_number_duell").addClass('card-number-won');

			setTimeout(function() {
				duellWon(userCard, computerCard);
			}, 1500);

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
				duellDraw(userCard, computerCard);
			}, 1500);
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
			alert("Du hast die " + game.tableMiddle.length + " Karten auf dem Tisch gewonnen");
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
			alert("Computer hat die " + game.tableMiddle.length + " Karten auf dem Tisch gewonnen");
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

function makeDecision() {
	var numberAttributes = game.deck.numberAttributes;
	var random = Math.floor((Math.random() * numberAttributes));
	var selectorAttr = '#attribute' + (random + 1);
	var selectorVal = '#value' + (random + 1);
	$(selectorAttr).add(selectorVal).addClass('selected-attribute');

	setTimeout(function() {
		loadDuellPage(random);
	}, 1500);
}
