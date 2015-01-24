function loadDecksFromService() {
	var lens = [];
	$.ajax({
		url : "http://quartett.af-mba.dbis.info/decks/",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
		},
		success : function(data) {
			//console.log(data);
			for (var i = 0; i < data.length; i++) {
				(function(i) {
					$.ajax({
						url : "http://quartett.af-mba.dbis.info/decks/" + data[i].id + "/cards/",
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
						},
						async : false,
						success : function(obj) {
							lens[i] = obj.length;
							console.log(i);
							if (lens.indexOf('undefined') == -1 && lens.length == data.length) {
								loadDecksToGallery(data, lens);
							} else if (i == data.length - 1) {
								console.log("Fehler beim Laden von den Decks");
							}

						}
					});
				})(i);
			}
		}
	});
}

function loadServiceDeckData(id) {
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
		},
		dataType : 'json',
		success : function(json) {
			deck = json;
			//KARTEN HOLEN
			$.ajax({
				url : "http://quartett.af-mba.dbis.info/decks/" + id + "/cards/",
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
				},
				dataType : 'json'
			}).done(function(data) {
				cards = data;
				for (var i = 0; i < cards.length; i++) {
					(function(i) {
						var card = cards[i];
						//console.log(i);
						//FÜR ALLE KARTEN DETAILLIERTE INFOS HOLEN
						$.ajax({
							url : "http://quartett.af-mba.dbis.info/decks/" + id + "/cards/" + card.id,
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
							},
							async : false,
							dataType : 'json'
						}).done(function(json) {
							cardsDetailed[i] = json;

						});

						//ATTRIBUTE FÜR JEDE KARTE HOLEN
						$.ajax({
							url : "http://quartett.af-mba.dbis.info/decks/" + id + "/cards/" + card.id + "/attributes",
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
							},
							async : false,
							dataType : 'json'
						}).done(function(json) {
							if (json.length > 5) {
								var slicedArray = json.slice(0, 5);
								cardsAttributes[i] = slicedArray;
								console.log("zuviel Attribute");
								console.log(i);
								console.log(json);
								console.log(cardsAttributes);
							} else {
								cardsAttributes[i] = json;
								console.log(i);
								console.log(json);
								console.log(cardsAttributes);
							}

						});

						//ADDITIONAL INFOS FÜR JEDE KARTE
						$.ajax({
							url : "http://quartett.af-mba.dbis.info/decks/" + id + "/cards/" + card.id + "/images",
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
							},
							async : false,
							dataType : 'json'
						}).done(function(json) {
							cardsAdditions[i] = json;
							//console.log(done);
							//console.log(cardsDetailed);
							//console.log(cardsAttributes);
							//console.log(cardsAdditions);
							console.log(json[0].image);
							if (i == cards.length - 1) {
								//alert("parseData");
								parseData(deck, cards, cardsDetailed, cardsAttributes, cardsAdditions);
							}
							$.ajax({
								url : json[0].image,
								beforeSend : function(xhr) {
									xhr.setRequestHeader("Authorization", "Basic c3R1ZGVudDphZm1iYQ==");
								}
							}).done(function(data) {
								//$("#download_decks").append("<img src='data:" + base64_encode(data) + "'/>");
							});

						});
					})(i);
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
	$("#load" + deck.id).html("Fertig");
	$("#load" + deck.id).prop('disabled', true).addClass('ui-disabled');
	insertDeckIntoDB(serviceDeck);
}
