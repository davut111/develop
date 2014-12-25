var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	bindEvents : function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	}
};

function onDeviceReady() {
	bindListeners();
	initializeDB();
}

function bindListeners() {
	$("#start_as_deathmatch").click(function() {

	});

};

function loadGallery(){
	for(var i=0; i<decks.length; i++){
		var deck = '<a href="#gallery_card_page" id="deck'+decks[i].id+'" class="flex-row-menu gallery-preview"><img class="deck-icon" src="img/'+
		decks[i].deckPicture+'" /> <div class="flex-column-menu"><h3>'+decks[i].deckName+'</h3><h4>'+decks[i].deckType+'</h4></div>' +
		'<div class="card-number">'+decks[i].numberCards+'</div></a>';
		$(deck).click(loadCardFromDeckId(decks[i].deckId));
		$("#gallery_deck").append(deck);
	}
}

function loadCardFromDeckId(deckId){
	console.log("loadCard");
	var card = decks[deckId - 1].cards[0];
	var numberAttributes = decks[deckId - 1].numberAttributes;
	$("#actual_card_gallery").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="img/'+card.cardPicture+'" /></div>');
	$("#gallery_card_footer").html(card.cardName);
	switch(numberAttributes){
		case 3:
			$("#actual_card_gallery").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-3">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-3 even-cell">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 even-cell card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-3">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div></div>');
			break;
		case 4:
			$("#actual_card_gallery").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-4">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-4 even-cell">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 even-cell card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-4">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div>'+
						'<div class="ui-block-a card-cell-4">'+card.attributes[3].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[3].value+' '+card.attributes[3].unit+'</div></div>');
			break;
		case 5:
			$("#actual_card_gallery").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-5">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-5">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[3].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[3].value+' '+card.attributes[3].unit+'</div>'+
						'<div class="ui-block-a card-cell-5">'+card.attributes[4].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 card-value">'+card.attributes[4].value+' '+card.attributes[4].unit+'</div></div>');
			break;
		default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}
}

app.initialize(); 