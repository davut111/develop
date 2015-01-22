function loadDecksFromService() {
	var fin = 0;
	$.ajax({
		url : "http://quartett.af-mba.dbis.info/decks/",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
		}
	}).done(function(data) {
		//var json = JSON.parse(data);
		while (fin != data.length) {
			//console.log(json);
			$.ajax({
				url : "http://quartett.af-mba.dbis.info/decks/" + data[fin].id + "/cards/",
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
				}
			}).done(function(obj) {
				fin++;
				if (fin == data.length) {
					loadDecksToGallery(data, obj.length);
				}

			});
		}
	});
}

function loadServiceDeckData(id) {
	var done = 0;
	var deck;
	var cards;
	var cardsDetailed = [];
	var cardsAttributes = [];
	var cardsAdditions = [];
	var images = [];

	//DECK HOLEN
	$.ajax({
		url : "http://quartett.af-mba.dbis.info/decks/" + id,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
		}
	}).done(function(data) {
		data = JSON.parse(data);
		deck = data;
	});

	//KARTEN HOLEN
	$.ajax({
		url : "http://quartett.af-mba.dbis.info/decks/" + id + "/cards/",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
		}
	}).done(function(data) {
		cards = data;
		for (var i = 0; i < cards.length; i++) {
			var card = cards[i];

			//FÜR ALLE KARTEN DETAILLIERTE INFOS HOLEN
			$.ajax({
				url : "http://quartett.af-mba.dbis.info/decks/" + id + "/cards/" + card.id,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
				}
			}).done(function(data) {
				//console.log(data);
				var json = JSON.parse(data);
				cardsDetailed[cardsDetailed.length] = json;

			});

			//ATTRIBUTE FÜR JEDE KARTE HOLEN
			$.ajax({
				url : "http://quartett.af-mba.dbis.info/decks/" + id + "/cards/" + card.id + "/attributes",
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
				}
			}).done(function(data) {
				//console.log(data);
				var json = JSON.parse(data);
				cardsAttributes[cardsAttributes.length] = json;

			});

			//ADDITIONAL INFOS FÜR JEDE KARTE
			$.ajax({
				url : "http://quartett.af-mba.dbis.info/decks/" + id + "/cards/" + card.id + "/images",
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
				}
			}).done(function(data) {
				var json = JSON.parse(data);
				cardsAdditions[cardsAdditions.length] = json;
				done++;
				//console.log(done);
				//console.log(cardsDetailed);
				//console.log(cardsAttributes);
				//console.log(cardsAdditions);

				$.ajax({
					url : json[0].image,
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
					}
				}).done(function(data) {
					console.log("hi");
					//$("#download_decks").append("<img src='data:" + base64_encode(data) + "'/>");
				});

				if (done == cards.length) {
					setTimeout(function() {
						parseData(deck, cards, cardsDetailed, cardsAttributes, cardsAdditions);
					}, 1000);
				}

			});

		}
	});
}

function parseData(deck, cards, cardsDetailed, cardsAttributes, cardsAdditions) {
	var serviceDeck = {
		deckName : deck.name,
		deckType : deck.description,
		deckPic : deck.image,
		cardNumber : cards.length,
		attributeNumber : cardsAttributes[0].length,
		finished : false,
		attributes : [],
		cards : []
	};
	for (var i = 0; i < cards.length; i++) {
		var serviceCard = {
			attributes : [],
			values : [],
			name : cards[i].name,
			picture : 'img/logo.png'
		};
		for (var j = 0; j < cardsAttributes[i].length; j++) {
			console.log(i);
			var serviceAttribute = {
				name : cardsAttributes[i][j].name,
				type : cardsAttributes[i][j].unit,
				higherValue : true
			};
			var value = cardsAttributes[i][j].value;
			if (cardsAttributes[i][j].what_wins != 'higher_wins') {
				serviceAttribute.higherValue = false;
			}
			serviceCard.attributes[serviceCard.attributes.length] = serviceAttribute;
			serviceCard.values[serviceCard.values.length] = value;
			serviceCard.picture = cardsAdditions[i][0].image;
			if (i == 0) {
				serviceDeck.attributes[serviceDeck.attributes.length] = serviceAttribute;
			}
		}
		serviceDeck.cards[serviceDeck.cards.length] = serviceCard;
	}
	console.log(serviceDeck);
	$("#load" + deck.id).html("fertig");
	$("#load" + deck.id).prop('disabled', true).addClass('ui-disabled');
	insertDeckIntoDB(serviceDeck);
}
