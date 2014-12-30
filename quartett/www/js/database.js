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
	console.log(database.decks);
	loadGallery();
}

function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS decks');
	tx.executeSql('DROP TABLE IF EXISTS cards');
	tx.executeSql('DROP TABLE IF EXISTS attributes');

	var sqlDecks = "CREATE TABLE IF NOT EXISTS decks ( " + "deckId INTEGER PRIMARY KEY AUTOINCREMENT, " + "deckName VARCHAR(50), " + "numberAttributes INTEGER, " + "numberCards INTEGER, " + "deckType VARCHAR(30), " + "deckPicture VARCHAR(200)," + "actualDeck BOOLEAN)";

	var sqlCards = "CREATE TABLE IF NOT EXISTS cards ( " + "cardId INTEGER PRIMARY KEY AUTOINCREMENT, " + "deck INTEGER REFERENCES decks, " + "cardName VARCHAR(50), " + "description VARCHAR(500), " + "cardPicture VARCHAR(200))";

	var sqlAttributes = "CREATE TABLE IF NOT EXISTS attributes ( " + "attributeId INTEGER PRIMARY KEY AUTOINCREMENT, " + "card INTEGER REFERENCES cards, "+ "deck INTEGER REFERENCES decks," + "attributeName VARCHAR(50), " + "value DOUBLE(20), " + "unit VARCHAR(50), " + "higherValue BOOLEAN)";

	tx.executeSql(sqlDecks);
	tx.executeSql(sqlCards);
	tx.executeSql(sqlAttributes);

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

	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (0,0,0,'Geschwindigkeit',318,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (1,0,0,'Hubraum',5998,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (2,0,0,'Gewicht',2320,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (3,0,0,'Zylinder',12,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (4,0,0,'Leistung',575,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (5,1,0,'Geschwindigkeit',303,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (6,1,0,'Hubraum',4806,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (7,1,0,'Gewicht',2019,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (8,1,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (9,1,0,'Leistung',500,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (10,2,0,'Geschwindigkeit',250,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (11,2,0,'Hubraum',4395,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (12,2,0,'Gewicht',1940,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (13,2,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (14,2,0,'Leistung',450,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (15,3,0,'Geschwindigkeit',349,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (16,3,0,'Hubraum',6498,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (17,3,0,'Gewicht',1575,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (18,3,0,'Zylinder',12,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (19,3,0,'Leistung',700,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (20,4,0,'Geschwindigkeit',360,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (21,4,0,'Hubraum',3746,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (22,4,0,'Gewicht',1500,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (23,4,0,'Zylinder',6,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (24,4,0,'Leistung',650,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (25,5,0,'Geschwindigkeit',360,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (26,5,0,'Hubraum',4163,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (27,5,0,'Gewicht',1200,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (28,5,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (29,5,0,'Leistung',800,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (30,6,0,'Geschwindigkeit',347,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (31,6,0,'Hubraum',4999,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (32,6,0,'Gewicht',1170,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (33,6,0,'Zylinder',10,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (34,6,0,'Leistung',600,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (35,7,0,'Geschwindigkeit',261,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (36,7,0,'Hubraum',4806,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (37,7,0,'Gewicht',2100,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (38,7,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (39,7,0,'Leistung',450,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (40,8,0,'Geschwindigkeit',330,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (41,8,0,'Hubraum',3799,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (42,8,0,'Gewicht',1434,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (43,8,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (44,8,0,'Leistung',600,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (45,9,0,'Geschwindigkeit',280,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (46,9,0,'Hubraum',4700,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (47,9,0,'Gewicht',1700,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (48,9,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (49,9,0,'Leistung',530,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (50,10,0,'Geschwindigkeit',317,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (51,10,0,'Hubraum',5024,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (52,10,0,'Gewicht',1570,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (53,10,0,'Zylinder',10,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (54,10,0,'Leistung',550,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (55,11,0,'Geschwindigkeit',340,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (56,11,0,'Hubraum',6200,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (57,11,0,'Gewicht',1400,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (58,11,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (59,11,0,'Leistung',640,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (60,12,0,'Geschwindigkeit',407,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (61,12,0,'Hubraum',7993,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (62,12,0,'Gewicht',1950,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (63,12,0,'Zylinder',16,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (64,12,0,'Leistung',1001,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (65,13,0,'Geschwindigkeit',395,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (66,13,0,'Hubraum',4700,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (67,13,0,'Gewicht',1290,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (68,13,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (69,13,0,'Leistung',910,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (70,14,0,'Geschwindigkeit',370,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (71,14,0,'Hubraum',5980,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (72,14,0,'Gewicht',1350,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (73,14,0,'Zylinder',12,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (74,14,0,'Leistung',700,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (75,15,0,'Geschwindigkeit',300,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (76,15,0,'Hubraum',6761,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (77,15,0,'Gewicht',2560,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (78,15,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (79,15,0,'Leistung',512,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (80,16,0,'Geschwindigkeit',315,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (81,16,0,'Hubraum',4961,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (82,16,0,'Gewicht',1405,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (83,16,0,'Zylinder',10,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (84,16,0,'Leistung',530,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (85,17,0,'Geschwindigkeit',250,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (86,17,0,'Hubraum',4134,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (87,17,0,'Gewicht',1995,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (88,17,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (89,17,0,'Leistung',350,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (90,18,0,'Geschwindigkeit',302,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (91,18,0,'Hubraum',3800,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (92,18,0,'Gewicht',1420,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (93,18,0,'Zylinder',6,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (94,18,0,'Leistung',400,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (95,19,0,'Geschwindigkeit',327,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (96,19,0,'Hubraum',7300,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (97,19,0,'Gewicht',1500,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (98,19,0,'Zylinder',12,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (99,19,0,'Leistung',700,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (100,20,0,'Geschwindigkeit',240,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (101,20,0,'Hubraum',6749,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (102,20,0,'Gewicht',2560,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (103,20,0,'Zylinder',12,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (104,20,0,'Leistung',460,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (105,21,0,'Geschwindigkeit',296,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (106,21,0,'Hubraum',5935,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (107,21,0,'Gewicht',1950,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (108,21,0,'Zylinder',12,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (109,21,0,'Leistung',477,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (110,22,0,'Geschwindigkeit',325,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (111,22,0,'Hubraum',4805,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (112,22,0,'Gewicht',1480,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (113,22,0,'Zylinder',10,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (114,22,0,'Leistung',560,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (115,23,0,'Geschwindigkeit',250,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (116,23,0,'Hubraum',4395,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (117,23,0,'Gewicht',2055,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (118,23,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (119,23,0,'Leistung',407,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (120,24,0,'Geschwindigkeit',274,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (121,24,0,'Hubraum',2979,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (122,24,0,'Gewicht',1250,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (123,24,0,'Zylinder',6,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (124,24,0,'Leistung',306,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (125,25,0,'Geschwindigkeit',300,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (126,25,0,'Hubraum',5000,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (127,25,0,'Gewicht',1753,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (128,25,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (129,25,0,'Leistung',560,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (130,26,0,'Geschwindigkeit',250,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (131,26,0,'Hubraum',6592,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (132,26,0,'Gewicht',2360,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (133,26,0,'Zylinder',12,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (134,26,0,'Leistung',570,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (135,27,0,'Geschwindigkeit',320,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (136,27,0,'Hubraum',5000,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (137,27,0,'Gewicht',2050,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (138,27,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (139,27,0,'Leistung',650,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (140,28,0,'Geschwindigkeit',320,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (141,28,0,'Hubraum',4941,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (142,28,0,'Gewicht',1275,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (143,28,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (144,28,0,'Leistung',500,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (145,29,0,'Geschwindigkeit',201,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (146,29,0,'Hubraum',1998,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (147,29,0,'Gewicht',1950,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (148,29,0,'Zylinder',4,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (149,29,0,'Leistung',403,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (150,30,0,'Geschwindigkeit',250,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (151,30,0,'Hubraum',5980,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (152,30,0,'Gewicht',2780,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (153,30,0,'Zylinder',12,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (154,30,0,'Leistung',612,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (155,31,0,'Geschwindigkeit',315,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (156,31,0,'Hubraum',6208,'ccm',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (157,31,0,'Gewicht',1550,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (158,31,0,'Zylinder',8,'',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (159,31,0,'Leistung',631,'ps',1)");
	}
