var database = {
	 db: null,
	 dbCreated: false,
	 decks: [],
	 cards: [],
	 attributes: []
};

var attributes = [];

function initializeDB() {
	database.db = window.openDatabase("deckDB", "1.0", "Application Database", 1000000);
	if (database.dbCreated)
		database.db.transaction(getData, transaction_error);
	else
		database.db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	alert("Database Error: " + error);
}

function populateDB_success() {
	database.dbCreated = true;
	database.db.transaction(getData, transaction_error);
}

function getData(tx) {
	var sqlDecks = "SELECT * " + "FROM decks " + "ORDER BY deckId";

	var sqlCards = "SELECT * " + "FROM cards c " + "ORDER BY c.cardId";

	var sqlAttributes = "SELECT * " + "FROM attributes a " + "ORDER BY a.attributeId";

	tx.executeSql(sqlDecks, [], getDecks_success);
	tx.executeSql(sqlCards, [], getCards_success);
	tx.executeSql(sqlAttributes, [], getAttributes_success);
	database.db = null;


}

function getDecks_success(tx, results) {
	var len = results.rows.length;
	for (var i = 0; i < len; i++) {
		var row = results.rows.item(i);
		database.decks[database.decks.length] = row;
	}
}

function getCards_success(tx, results) {
	var len = results.rows.length;
	var actDeck= -1;
	var actCard = -1;
	for (var i = 0; i < len; i++) {
		var card = results.rows.item(i);
		if (card.deck === actDeck) {

			database.cards[actDeck][actCard] = card;
			actCard++;
		} else {
			actDeck = card.deck;
			actCard = 0;
			database.cards[actDeck] = [card];
			actCard++;
		}
	}
}

function getAttributes_success(tx, results) {
	var len = results.rows.length;
	var actCard = -1;
	var actAttribute = -1;
	for (var i = 0; i < len; i++) {
		var attribute = results.rows.item(i);
		if (attribute.card === actCard) {

			database.attributes[actCard][actAttribute] = attribute;
			actAttribute++;
		} else {
			actCard = attribute.card;
			actAttribute = 0;
			database.attributes[actCard] = [attribute];
			actAttribute++;
		}

	}
	assignmentDB();
}

function assignmentDB(){
	for(var i=0;i<database.attributes.length;i++){
		var toCard = database.attributes[i][0].card;
		var toDeck = database.attributes[i][0].deck;
		var deck = database.cards[toDeck];
		for(var j=0;j<deck.length;j++){
			if(deck[j].cardId === toCard){
				deck[j].attributes = database.attributes[i];
			}
		}
	}
	
	for(var i=0;i<database.cards.length;i++){
		var toDeck = database.cards[i][0].deck;
		database.decks[toDeck].cards = database.cards[i];
	}
	loadGallery();
}

function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS decks');
	tx.executeSql('DROP TABLE IF EXISTS cards');
	tx.executeSql('DROP TABLE IF EXISTS attributes');

	var sqlDecks = "CREATE TABLE IF NOT EXISTS decks ( " + "deckId INTEGER PRIMARY KEY AUTOINCREMENT, " + "deckName VARCHAR(50), " + "numberAttributes INTEGER, " + "numberCards INTEGER, " + "deckType VARCHAR(30), " + "deckPicture VARCHAR(200)," + "actualDeck BOOLEAN)";

	var sqlCards = "CREATE TABLE IF NOT EXISTS cards ( " + "cardId INTEGER PRIMARY KEY AUTOINCREMENT, " + "deck INTEGER REFERENCES decks, " + "cardName VARCHAR(50), " + "description VARCHAR(500), " + "cardPicture VARCHAR(200))";

	var sqlAttributes = "CREATE TABLE IF NOT EXISTS attributes ( " + "attributeId INTEGER PRIMARY KEY AUTOINCREMENT, " + "card INTEGER REFERENCES cards, "+ "deck INTEGER REFERENCES decks," + "attributeName VARCHAR(50), " + "value DOUBLE(20), " + "unit VARCHAR(50), " + "higherValue BOOLEAN, "+"average DOUBLE(10))";

	tx.executeSql(sqlDecks);
	tx.executeSql(sqlCards);
	tx.executeSql(sqlAttributes);
	
	/*************************************************************
	 * ***********************************************************
	 * **************************CARS DECK************************
	 * ***********************************************************
	 * ***********************************************************/

	tx.executeSql("INSERT INTO decks (deckId,deckName,numberAttributes,numberCards,deckType,deckPicture,actualDeck) VALUES (0,'Luxusautos',5,32,'Auto','Luxusautos/1.jpg',1)");
	
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (0,0,'Bentley Continental GT','Dies ist eine Beispielkarte','Luxusautos/1.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (1,0,'Porsche Panamera Turbo','Dies ist eine Beispielkarte','Luxusautos/2.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (2,0,'BMW 650i Gran Coupé','Dies ist eine Beispielkarte','Luxusautos/3.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (3,0,'Lamborghini Aventador','Dies ist eine Beispielkarte','Luxusautos/4.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (4,0,'Ruf Rt 12','Dies ist eine Beispielkarte','Luxusautos/5.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (5,0,'Gumpert Apollo Sport','Dies ist eine Beispielkarte','Luxusautos/6.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (6,0,'Vermot Veritas RS III','Dies ist eine Beispielkarte','Luxusautos/7.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (7,0,'Porsche Cayenne GTS','Dies ist eine Beispielkarte','Luxusautos/8.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (8,0,'McLaren MP4-12C','Dies ist eine Beispielkarte','Luxusautos/9.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (9,0,'Maserati Quattroporte','Dies ist eine Beispielkarte','Luxusautos/10.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (10,0,'Audi R8 V10 plus','Dies ist eine Beispielkarte','Luxusautos/11.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (11,0,'Panoz Abruzzi','Dies ist eine Beispielkarte','Luxusautos/12.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (12,0,'Bugatti Veyron 16.4','Dies ist eine Beispielkarte','Luxusautos/13.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (13,0,'Koenigsegg Agera','Dies ist eine Beispielkarte','Luxusautos/14.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (14,0,'Pagani Huayra','Dies ist eine Beispielkarte','Luxusautos/15.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (15,0,'Bentley Mulsanne','Dies ist eine Beispielkarte','Luxusautos/16.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (16,0,'Lamborghini Gallardo Superleggera','Dies ist eine Beispielkarte','Luxusautos/17.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (17,0,'Audi A8','Dies ist eine Beispielkarte','Luxusautos/18.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (18,0,'Porsche 911 Carrera S','Dies ist eine Beispielkarte','Luxusautos/19.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (19,0,'Aston Martin One-77','Dies ist eine Beispielkarte','Luxusautos/20.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (20,0,'Rolls-Royce Phantom','Dies ist eine Beispielkarte','Luxusautos/21.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (21,0,'Aston Rapide','Dies ist eine Beispielkarte','Luxusautos/22.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (22,0,'Lexus LFA','Dies ist eine Beispielkarte','Luxusautos/23.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (23,0,'BMW 750Li','Dies ist eine Beispielkarte','Luxusautos/24.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (24,0,'Morgan EVA GT','Dies ist eine Beispielkarte','Luxusautos/25.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (25,0,'Jaguar XKR-S','Dies ist eine Beispielkarte','Luxusautos/26.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (26,0,'Rolls-Royce Ghost','Dies ist eine Beispielkarte','Luxusautos/27.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (27,0,'Lexus TMG Sports 650','Dies ist eine Beispielkarte','Luxusautos/28.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (28,0,'Ascari KZ1','Dies ist eine Beispielkarte','Luxusautos/29.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (29,0,'Fisker Karma','Dies ist eine Beispielkarte','Luxusautos/30.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (30,0,'Maybach 62 S Landaulet','Dies ist eine Beispielkarte','Luxusautos/31.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (31,0,'Mercedes SLS AMG Coupé Black Series','Dies ist eine Beispielkarte','Luxusautos/32.jpg')");

	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (0,0,0,'Geschwindigkeit',318,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (1,0,0,'Hubraum',5998,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (2,0,0,'Gewicht',2320,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (3,0,0,'Zylinder',12,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (4,0,0,'Leistung',575,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (5,1,0,'Geschwindigkeit',303,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (6,1,0,'Hubraum',4806,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (7,1,0,'Gewicht',2019,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (8,1,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (9,1,0,'Leistung',500,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (10,2,0,'Geschwindigkeit',250,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (11,2,0,'Hubraum',4395,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (12,2,0,'Gewicht',1940,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (13,2,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (14,2,0,'Leistung',450,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (15,3,0,'Geschwindigkeit',349,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (16,3,0,'Hubraum',6498,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (17,3,0,'Gewicht',1575,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (18,3,0,'Zylinder',12,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (19,3,0,'Leistung',700,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (20,4,0,'Geschwindigkeit',360,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (21,4,0,'Hubraum',3746,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (22,4,0,'Gewicht',1500,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (23,4,0,'Zylinder',6,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (24,4,0,'Leistung',650,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (25,5,0,'Geschwindigkeit',360,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (26,5,0,'Hubraum',4163,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (27,5,0,'Gewicht',1200,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (28,5,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (29,5,0,'Leistung',800,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (30,6,0,'Geschwindigkeit',347,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (31,6,0,'Hubraum',4999,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (32,6,0,'Gewicht',1170,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (33,6,0,'Zylinder',10,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (34,6,0,'Leistung',600,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (35,7,0,'Geschwindigkeit',261,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (36,7,0,'Hubraum',4806,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (37,7,0,'Gewicht',2100,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (38,7,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (39,7,0,'Leistung',450,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (40,8,0,'Geschwindigkeit',330,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (41,8,0,'Hubraum',3799,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (42,8,0,'Gewicht',1434,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (43,8,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (44,8,0,'Leistung',600,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (45,9,0,'Geschwindigkeit',280,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (46,9,0,'Hubraum',4700,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (47,9,0,'Gewicht',1700,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (48,9,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (49,9,0,'Leistung',530,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (50,10,0,'Geschwindigkeit',317,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (51,10,0,'Hubraum',5024,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (52,10,0,'Gewicht',1570,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (53,10,0,'Zylinder',10,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (54,10,0,'Leistung',550,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (55,11,0,'Geschwindigkeit',340,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (56,11,0,'Hubraum',6200,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (57,11,0,'Gewicht',1400,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (58,11,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (59,11,0,'Leistung',640,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (60,12,0,'Geschwindigkeit',407,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (61,12,0,'Hubraum',7993,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (62,12,0,'Gewicht',1950,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (63,12,0,'Zylinder',16,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (64,12,0,'Leistung',1001,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (65,13,0,'Geschwindigkeit',395,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (66,13,0,'Hubraum',4700,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (67,13,0,'Gewicht',1290,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (68,13,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (69,13,0,'Leistung',910,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (70,14,0,'Geschwindigkeit',370,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (71,14,0,'Hubraum',5980,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (72,14,0,'Gewicht',1350,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (73,14,0,'Zylinder',12,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (74,14,0,'Leistung',700,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (75,15,0,'Geschwindigkeit',300,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (76,15,0,'Hubraum',6761,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (77,15,0,'Gewicht',2560,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (78,15,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (79,15,0,'Leistung',512,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (80,16,0,'Geschwindigkeit',315,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (81,16,0,'Hubraum',4961,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (82,16,0,'Gewicht',1405,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (83,16,0,'Zylinder',10,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (84,16,0,'Leistung',530,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (85,17,0,'Geschwindigkeit',250,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (86,17,0,'Hubraum',4134,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (87,17,0,'Gewicht',1995,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (88,17,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (89,17,0,'Leistung',350,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (90,18,0,'Geschwindigkeit',302,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (91,18,0,'Hubraum',3800,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (92,18,0,'Gewicht',1420,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (93,18,0,'Zylinder',6,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (94,18,0,'Leistung',400,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (95,19,0,'Geschwindigkeit',327,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (96,19,0,'Hubraum',7300,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (97,19,0,'Gewicht',1500,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (98,19,0,'Zylinder',12,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (99,19,0,'Leistung',700,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (100,20,0,'Geschwindigkeit',240,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (101,20,0,'Hubraum',6749,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (102,20,0,'Gewicht',2560,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (103,20,0,'Zylinder',12,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (104,20,0,'Leistung',460,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (105,21,0,'Geschwindigkeit',296,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (106,21,0,'Hubraum',5935,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (107,21,0,'Gewicht',1950,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (108,21,0,'Zylinder',12,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (109,21,0,'Leistung',477,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (110,22,0,'Geschwindigkeit',325,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (111,22,0,'Hubraum',4805,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (112,22,0,'Gewicht',1480,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (113,22,0,'Zylinder',10,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (114,22,0,'Leistung',560,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (115,23,0,'Geschwindigkeit',250,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (116,23,0,'Hubraum',4395,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (117,23,0,'Gewicht',2055,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (118,23,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (119,23,0,'Leistung',407,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (120,24,0,'Geschwindigkeit',274,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (121,24,0,'Hubraum',2979,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (122,24,0,'Gewicht',1250,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (123,24,0,'Zylinder',6,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (124,24,0,'Leistung',306,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (125,25,0,'Geschwindigkeit',300,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (126,25,0,'Hubraum',5000,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (127,25,0,'Gewicht',1753,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (128,25,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (129,25,0,'Leistung',560,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (130,26,0,'Geschwindigkeit',250,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (131,26,0,'Hubraum',6592,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (132,26,0,'Gewicht',2360,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (133,26,0,'Zylinder',12,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (134,26,0,'Leistung',570,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (135,27,0,'Geschwindigkeit',320,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (136,27,0,'Hubraum',5000,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (137,27,0,'Gewicht',2050,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (138,27,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (139,27,0,'Leistung',650,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (140,28,0,'Geschwindigkeit',320,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (141,28,0,'Hubraum',4941,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (142,28,0,'Gewicht',1275,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (143,28,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (144,28,0,'Leistung',500,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (145,29,0,'Geschwindigkeit',201,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (146,29,0,'Hubraum',1998,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (147,29,0,'Gewicht',1950,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (148,29,0,'Zylinder',4,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (149,29,0,'Leistung',403,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (150,30,0,'Geschwindigkeit',250,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (151,30,0,'Hubraum',5980,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (152,30,0,'Gewicht',2780,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (153,30,0,'Zylinder',12,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (154,30,0,'Leistung',612,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (155,31,0,'Geschwindigkeit',315,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (156,31,0,'Hubraum',6208,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (157,31,0,'Gewicht',1550,'kg',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (158,31,0,'Zylinder',8,'',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (159,31,0,'Leistung',631,'ps',1,571)");
	
	
	/*************************************************************
	 * ***********************************************************
	 * **************************BIKES DECK***********************
	 * ***********************************************************
	 * ***********************************************************/
	
	tx.executeSql("INSERT INTO decks (deckId,deckName,numberAttributes,numberCards,deckType,deckPicture,actualDeck) VALUES (1,'Bikes',5,32,'Motorräder','Bikes/1.jpg',0)");
	
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (32,1,'Yamaha YZR M1','Dies ist eine Beispielkarte','Bikes/1.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (33,1,'Ducati Desmosedici GP11','Dies ist eine Beispielkarte','Bikes/2.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (34,1,'Aprilia 250','Dies ist eine Beispielkarte','Bikes/3.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (35,1,'KTM 1190 RC8 R','Dies ist eine Beispielkarte','Bikes/4.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (36,1,'LCR Yamaha PSV wels','Dies ist eine Beispielkarte','Bikes/5.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (37,1,'Ducati 1098R F09','Dies ist eine Beispielkarte','Bikes/6.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (38,1,'BMW S1000 RR','Dies ist eine Beispielkarte','Bikes/7.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (39,1,'LCR Suzuki HRT','Dies ist eine Beispielkarte','Bikes/8.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (40,1,'Honda RC 212V','Dies ist eine Beispielkarte','Bikes/9.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (41,1,'Kawasaki Ninja ZX-10R','Dies ist eine Beispielkarte','Bikes/10.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (42,1,'Malaguti 125','Dies ist eine Beispielkarte','Bikes/11.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (43,1,'Yamaha YZF R1','Dies ist eine Beispielkarte','Bikes/12.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (44,1,'Suzuki GSV-R Rizia','Dies ist eine Beispielkarte','Bikes/13.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (45,1,'Pons HP 40 Kalex','Dies ist eine Beispielkarte','Bikes/14.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (46,1,'LCR-BMW','Dies ist eine Beispielkarte','Bikes/15.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (47,1,'Honda CBR 1000RR','Dies ist eine Beispielkarte','Bikes/16.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (48,1,'LCR Suzuki Robson','Dies ist eine Beispielkarte','Bikes/17.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (49,1,'Honda RC 212V','Dies ist eine Beispielkarte','Bikes/18.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (50,1,'Suzuki GSX-R 1000 K8','Dies ist eine Beispielkarte','Bikes/19.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (51,1,'Petronas Foggy-FP1','Dies ist eine Beispielkarte','Bikes/20.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (52,1,'Yamaha YZF R6','Dies ist eine Beispielkarte','Bikes/21.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (53,1,'LCR Gemini','Dies ist eine Beispielkarte','Bikes/22.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (54,1,'KTM 250 FFR','Dies ist eine Beispielkarte','Bikes/23.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (55,1,'Honda RS 250 RW','Dies ist eine Beispielkarte','Bikes/24.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (56,1,'Aprilia 125','Dies ist eine Beispielkarte','Bikes/25.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (57,1,'Derbi 125 RSA','Dies ist eine Beispielkarte','Bikes/26.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (58,1,'Yamaha YZR M1','Dies ist eine Beispielkarte','Bikes/27.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (59,1,'Suzuki GSV-R 06','Dies ist eine Beispielkarte','Bikes/28.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (60,1,'Ducati Desmosedici GP8','Dies ist eine Beispielkarte','Bikes/29.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (61,1,'Aprilia 125 RTG','Dies ist eine Beispielkarte','Bikes/30.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (62,1,'Aprilia RSV','Dies ist eine Beispielkarte','Bikes/31.jpg')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (63,1,'LCR Yamaha BPR','Dies ist eine Beispielkarte','Bikes/32.jpg')");

	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (160,32,1,'Geschwindigkeit',320,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (161,32,1,'Hubraum',799,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (162,32,1,'Umdrehungen',17200,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (163,32,1,'0 auf 100',2.2,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (164,32,1,'Leistung',200,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (165,33,1,'Geschwindigkeit',320,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (166,33,1,'Hubraum',799,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (167,33,1,'Umdrehungen',18000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (168,33,1,'0 auf 100',2.2,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (169,33,1,'Leistung',230,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (170,34,1,'Geschwindigkeit',290,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (171,34,1,'Hubraum',246,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (172,34,1,'Umdrehungen',13800,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (173,34,1,'0 auf 100',2.5,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (174,34,1,'Leistung',108,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (175,35,1,'Geschwindigkeit',298,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (176,35,1,'Hubraum',1195,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (177,35,1,'Umdrehungen',10500,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (178,35,1,'0 auf 100',2.5,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (179,35,1,'Leistung',190,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (180,36,1,'Geschwindigkeit',235,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (181,36,1,'Hubraum',600,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (182,36,1,'Umdrehungen',14500,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (183,36,1,'0 auf 100',3.3,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (184,36,1,'Leistung',140,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (185,37,1,'Geschwindigkeit',310,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (186,37,1,'Hubraum',1198,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (187,37,1,'Umdrehungen',11000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (188,37,1,'0 auf 100',2.3,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (189,37,1,'Leistung',198,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (190,38,1,'Geschwindigkeit',334,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (191,38,1,'Hubraum',999,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (192,38,1,'Umdrehungen',14000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (193,38,1,'0 auf 100',2.2,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (194,38,1,'Leistung',218,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (195,39,1,'Geschwindigkeit',280,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (196,39,1,'Hubraum',999,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (197,39,1,'Umdrehungen',13100,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (198,39,1,'0 auf 100',2.8,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (199,39,1,'Leistung',200,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (200,40,1,'Geschwindigkeit',310,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (201,40,1,'Hubraum',800,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (202,40,1,'Umdrehungen',17400,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (203,40,1,'0 auf 100',2.4,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (204,40,1,'Leistung',210,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (205,41,1,'Geschwindigkeit',339,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (206,41,1,'Hubraum',998,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (207,41,1,'Umdrehungen',14200,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (208,41,1,'0 auf 100',2.1,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (209,41,1,'Leistung',225,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (210,42,1,'Geschwindigkeit',230,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (211,42,1,'Hubraum',125,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (212,42,1,'Umdrehungen',12800,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (213,42,1,'0 auf 100',3.6,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (214,42,1,'Leistung',44,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (215,43,1,'Geschwindigkeit',322,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (216,43,1,'Hubraum',998,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (217,43,1,'Umdrehungen',12500,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (218,43,1,'0 auf 100',2.0,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (219,43,1,'Leistung',183,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (220,44,1,'Geschwindigkeit',330,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (221,44,1,'Hubraum',990,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (222,44,1,'Umdrehungen',17600,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (223,44,1,'0 auf 100',2.1,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (224,44,1,'Leistung',225,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (225,45,1,'Geschwindigkeit',270,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (226,45,1,'Hubraum',599,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (227,45,1,'Umdrehungen',13000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (228,45,1,'0 auf 100',2.6,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (229,45,1,'Leistung',140,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (230,46,1,'Geschwindigkeit',265,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (231,46,1,'Hubraum',999,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (232,46,1,'Umdrehungen',13500,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (233,46,1,'0 auf 100',3.1,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (234,46,1,'Leistung',200,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (235,47,1,'Geschwindigkeit',325,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (236,47,1,'Hubraum',1000,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (237,47,1,'Umdrehungen',13800,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (238,47,1,'0 auf 100',2.2,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (239,47,1,'Leistung',211,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (240,48,1,'Geschwindigkeit',285,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (241,48,1,'Hubraum',1000,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (242,48,1,'Umdrehungen',12000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (243,48,1,'0 auf 100',2.9,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (244,48,1,'Leistung',200,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (245,49,1,'Geschwindigkeit',315,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (246,49,1,'Hubraum',800,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (247,49,1,'Umdrehungen',17600,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (248,49,1,'0 auf 100',2.3,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (249,49,1,'Leistung',212,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (250,50,1,'Geschwindigkeit',305,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (251,50,1,'Hubraum',999,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (252,50,1,'Umdrehungen',12000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (253,50,1,'0 auf 100',2.2,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (254,50,1,'Leistung',185,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (255,51,1,'Geschwindigkeit',305,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (256,51,1,'Hubraum',899,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (257,51,1,'Umdrehungen',13500,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (258,51,1,'0 auf 100',2.5,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (259,51,1,'Leistung',185,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (260,52,1,'Geschwindigkeit',265,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (261,52,1,'Hubraum',599,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (262,52,1,'Umdrehungen',14500,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (263,52,1,'0 auf 100',2.6,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (264,52,1,'Leistung',145,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (265,53,1,'Geschwindigkeit',275,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (266,53,1,'Hubraum',998,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (267,53,1,'Umdrehungen',11500,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (268,53,1,'0 auf 100',2.9,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (269,53,1,'Leistung',185,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (270,54,1,'Geschwindigkeit',230,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (271,54,1,'Hubraum',249,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (272,54,1,'Umdrehungen',13800,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (273,54,1,'0 auf 100',3.3,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (274,54,1,'Leistung',58,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (275,55,1,'Geschwindigkeit',285,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (276,55,1,'Hubraum',248,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (277,55,1,'Umdrehungen',12900,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (278,55,1,'0 auf 100',2.8,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (279,55,1,'Leistung',97,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (280,56,1,'Geschwindigkeit',230,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (281,56,1,'Hubraum',125,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (282,56,1,'Umdrehungen',14000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (283,56,1,'0 auf 100',3.2,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (284,56,1,'Leistung',51,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (285,57,1,'Geschwindigkeit',225,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (286,57,1,'Hubraum',125,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (287,57,1,'Umdrehungen',12900,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (288,57,1,'0 auf 100',3.4,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (289,57,1,'Leistung',50,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (290,58,1,'Geschwindigkeit',325,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (291,58,1,'Hubraum',799,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (292,58,1,'Umdrehungen',17500,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (293,58,1,'0 auf 100',2.2,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (294,58,1,'Leistung',205,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (295,59,1,'Geschwindigkeit',318,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (296,59,1,'Hubraum',990,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (297,59,1,'Umdrehungen',16000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (298,59,1,'0 auf 100',2.1,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (299,59,1,'Leistung',240,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (300,60,1,'Geschwindigkeit',310,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (301,60,1,'Hubraum',799,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (302,60,1,'Umdrehungen',18000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (303,60,1,'0 auf 100',2.2,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (304,60,1,'Leistung',220,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (305,61,1,'Geschwindigkeit',235,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (306,61,1,'Hubraum',125,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (307,61,1,'Umdrehungen',13600,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (308,61,1,'0 auf 100',3.3,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (309,61,1,'Leistung',54,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (310,62,1,'Geschwindigkeit',332,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (311,62,1,'Hubraum',999,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (312,62,1,'Umdrehungen',14000,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (313,62,1,'0 auf 100',2.3,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (314,62,1,'Leistung',220,'ps',1,571)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (315,63,1,'Geschwindigkeit',290,'km/h',1,307)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (316,63,1,'Hubraum',990,'ccm',1,5167)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (317,63,1,'Umdrehungen',13200,'1/min',0,1763)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (318,63,1,'0 auf 100',2.7,'sec',1,9)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue,average) VALUES (319,63,1,'Leistung',210,'ps',1,571)");
	}
