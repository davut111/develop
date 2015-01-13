var gallery = {
	actCardGallery : 0,
	actDeckGallery : 0,
	firstPage : true
};

function loadGallery(){
	
	gallery.actCardGallery = 0;
	
	$("#gallery_deck").children().remove();
	
	$("#gallery_deck").append('<a href="#" class="ui-btn ui-icon-gear ui-btn-icon-notext gallery-gear">Spielmodi</a>');
	$("#gallery_deck").append('<h2>Verfügbare Decks</h2>');
	for(var i=0; i<database.decks.length; i++){
		var deck = '<a href="#gallery_card_page"'+'id="deck'+i+'"'+'class="flex-row-menu gallery-preview"><img class="deck-icon" src="'+
		database.decks[i].deckPicture+'" /> <div class="flex-column-menu"><h3>'+database.decks[i].deckName+'</h3><h4>'+database.decks[i].deckType+'</h4></div>' +
		'<div class="card-number">'+database.decks[i].numberCards+'</div></a>';
		$(deck).click(loadCardFromDeckId(i));
		$("#gallery_deck").append(deck);
		var deckid = '#deck'+i;
		var activateButton = '#activate'+i;
		if(database.decks[i].actualDeck == 1){
			$(deckid).find("h4").html(database.decks[i].deckType+" (aktiv)");
			$(deckid).prepend('<a href="#" id="activate'+i+'" class="ui-btn ui-button-disabled active-button">Ist bereits aktiv</a>');
			$(activateButton).addClass('hide');
		}else{
			$(deckid).prepend('<a href="#" id="activate'+i+'" class="ui-btn activate-button">Als aktiv festlegen</a>');
			$(activateButton).addClass('hide');
		}
	}
	$(".gallery-gear").click(function() {
		$(".activate-button").toggleClass('hide');
		$(".active-button").toggleClass('hide');
		$(".gallery-preview").children().not('.activate-button,.active-button').toggleClass('inactive');
	});
	$(".activate-button").click(function() {
		var clickedId = $(this).attr('id');
		var id = clickedId.split("activate")[1];
		id= parseInt(id);
		setActiveDeck(id);
	});
	$(".active-button").click(function() {
		$(".activate-button").toggleClass('hide');
		$(".active-button").toggleClass('hide');
		$(".gallery-preview").children().not('.activate-button,.active-button').toggleClass('inactive');
	});
	$("#gallery_deck").append('<a id="new_deck_button" href="#new_deck_page_first" class="ui-btn">Neues Deck erstellen</a>');
	
}

function loadCardFromDeckId(deckId){
	$("#actual_card_gallery").children().remove();
	gallery.actDeckGallery = deckId;
	var card = database.decks[gallery.actDeckGallery].cards[gallery.actCardGallery];
	var numberAttributes = database.decks[gallery.actDeckGallery].numberAttributes;
	$("#actual_card_gallery").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="'+card.cardPicture+'" /></div>');
	$("#gallery_card_footer").html(card.cardName);
	$("#gallery_card_header").html("Galerie ("+(gallery.actCardGallery+1)+"/"+database.decks[gallery.actDeckGallery].cards.length+")");
	switch(numberAttributes){
		case 3:
			$("#actual_card_gallery").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-3 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-3">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-3 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div></div>');
			break;
		case 4:
			$("#actual_card_gallery").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-4 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-4">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-4 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div>'+
						'<div class="ui-block-a card-cell-4">'+card.attributes[3].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[3].value+' '+card.attributes[3].unit+'</div></div>');
			break;
		case 5:
			$("#actual_card_gallery").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-5">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div>'+
						'<div class="ui-block-a card-cell-5">'+card.attributes[3].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 card-value">'+card.attributes[3].value+' '+card.attributes[3].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[4].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[4].value+' '+card.attributes[4].unit+'</div></div>');
			break;
		default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}
}

function loadCardFromDeckIdTwo(deckId){
	$("#actual_card_gallery_two").children().remove();
	gallery.actDeckGallery = deckId;
	var card = database.decks[gallery.actDeckGallery].cards[gallery.actCardGallery];
	var numberAttributes = database.decks[gallery.actDeckGallery].numberAttributes;
	$("#actual_card_gallery_two").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="img/'+card.cardPicture+'" /></div>');
	$("#gallery_card_footer_two").html(card.cardName);
	$("#gallery_card_header_two").html("Galerie ("+(gallery.actCardGallery+1)+"/"+database.decks[gallery.actDeckGallery].cards.length+")");
	switch(numberAttributes){
		case 3:
			$("#actual_card_gallery_two").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-3 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-3">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-3 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-3 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div></div>');
			break;
		case 4:
			$("#actual_card_gallery_two").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-4 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-4">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-4 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div>'+
						'<div class="ui-block-a card-cell-4">'+card.attributes[3].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-4 card-value">'+card.attributes[3].value+' '+card.attributes[3].unit+'</div></div>');
			break;
		case 5:
			$("#actual_card_gallery_two").append('<div class="ui-grid-a card-cell-big">'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[0].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[0].value+' '+card.attributes[0].unit+'</div>'+
						'<div class="ui-block-a card-cell-5">'+card.attributes[1].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 card-value">'+card.attributes[1].value+' '+card.attributes[1].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[2].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[2].value+' '+card.attributes[2].unit+'</div>'+
						'<div class="ui-block-a card-cell-5">'+card.attributes[3].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 card-value">'+card.attributes[3].value+' '+card.attributes[3].unit+'</div>'+
						'<div class="ui-block-a card-cell-5 even-cell">'+card.attributes[4].attributeName+'</div>'+
						'<div class="ui-block-b card-cell-5 even-cell card-value">'+card.attributes[4].value+' '+card.attributes[4].unit+'</div></div>');
			break;
		default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}
}

function swipeLeftGallery(event){
	gallery.actCardGallery++;
	if(gallery.actCardGallery === database.decks[gallery.actDeckGallery].numberCards){
		alert("letzte Karte");
		gallery.actCardGallery--;
	}else{
		if(gallery.firstPage == true){
			loadCardFromDeckIdTwo(gallery.actDeckGallery);
			$.mobile.changePage( "#gallery_card_page_two", { allowSamePageTransition:true,transition: "slide" });
			gallery.firstPage = false;
		}else{
			loadCardFromDeckId(gallery.actDeckGallery);
			$.mobile.changePage( "#gallery_card_page", { allowSamePageTransition:true,transition: "slide" });
			gallery.firstPage = true;
		}
	}
}

function swipeRightGallery(event){
	gallery.actCardGallery--;
	if(gallery.actCardGallery === -1){
		alert("erste Karte");
		gallery.actCardGallery++;
	}else{
		if(gallery.firstPage == true){
			loadCardFromDeckIdTwo(gallery.actDeckGallery);
			$.mobile.changePage( "#gallery_card_page_two", { allowSamePageTransition:true,transition: "slide", reverse:"true" });
			gallery.firstPage = false;
		}else{
			loadCardFromDeckIdTwo(gallery.actDeckGallery);
			$.mobile.changePage( "#gallery_card_page_two", { allowSamePageTransition:true,transition: "slide", reverse:"true" });
			gallery.firstPage = true;
		}
	}
}