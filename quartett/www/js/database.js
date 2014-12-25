var db;
var dbCreated = false;

var decks = [];
var cards = [];
var attributes = [];

function initializeDB() {
	db = window.openDatabase("deckDB", "1.0", "Application Database", 1000000);
	if (dbCreated)
		db.transaction(getData, transaction_error);
	else
		db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
	db.transaction(getData, transaction_error);
}

/*function getData(tx) {
 var sql = "SELECT  " +
 "FROM decks d join cards c on d.deckId = c.deck join attributes a on c.cardId = a.card " +
 "ORDER BY d.deckId";
 tx.executeSql(sql, [], getData_success);
 }*/

function getData(tx) {
	var sqlDecks = "SELECT * " + "FROM decks " + "ORDER BY deckId";

	var sqlCards = "SELECT * " + "FROM cards c " + "ORDER BY c.cardId";

	var sqlAttributes = "SELECT * " + "FROM attributes a " + "ORDER BY a.attributeId";

	tx.executeSql(sqlDecks, [], getDecks_success);
	tx.executeSql(sqlCards, [], getCards_success);
	tx.executeSql(sqlAttributes, [], getAttributes_success);
	db = null;

}

function getDecks_success(tx, results) {
	var len = results.rows.length;
	for (var i = 0; i < len; i++) {
		var row = results.rows.item(i);
		decks[decks.length] = row;
	}
}

function getCards_success(tx, results) {
	var len = results.rows.length;
	var actDeck= 0;
	var actCard = 0;
	for (var i = 0; i < len; i++) {
		var card = results.rows.item(i);
		if (card.deck === actDeck) {

			cards[actDeck - 1][actCard] = card;
			actCard++;
		} else {
			actDeck = card.deck;
			actCard = 0;
			cards[actDeck - 1] = [card];
			actCard++;
		}
	}
}

function getAttributes_success(tx, results) {
	var len = results.rows.length;
	var actCard = 0;
	var actAttribute = 0;
	for (var i = 0; i < len; i++) {
		var attribute = results.rows.item(i);
		if (attribute.card === actCard) {

			attributes[actCard - 1][actAttribute] = attribute;
			actAttribute++;
		} else {
			actCard = attribute.card;
			actAttribute = 0;
			attributes[actCard - 1] = [attribute];
			actAttribute++;
		}

	}
	assignmentDB();
}

function assignmentDB(){
	for(var i=0;i<attributes.length;i++){
		var toCard = attributes[i][0].card;
		var toDeck = attributes[i][0].deck;
		var deck = cards[toDeck - 1];
		for(var j=0;j<deck.length;j++){
			if(deck[j].cardId === toCard){
				deck[j].attributes = attributes[i];
			}
		}
	}
	
	for(var i=0;i<cards.length;i++){
		var toDeck = cards[i][0].deck;
		decks[toDeck - 1].cards = cards[i];
	}
	console.log(decks);
	loadGallery();
}

function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS decks');
	tx.executeSql('DROP TABLE IF EXISTS cards');
	tx.executeSql('DROP TABLE IF EXISTS attributes');

	var sqlDecks = "CREATE TABLE IF NOT EXISTS decks ( " + "deckId INTEGER PRIMARY KEY AUTOINCREMENT, " + "deckName VARCHAR(50), " + "numberAttributes INTEGER, " + "numberCards INTEGER, " + "deckType VARCHAR(30), " + "deckPicture VARCHAR(200))";

	var sqlCards = "CREATE TABLE IF NOT EXISTS cards ( " + "cardId INTEGER PRIMARY KEY AUTOINCREMENT, " + "deck INTEGER REFERENCES decks, " + "cardName VARCHAR(50), " + "description VARCHAR(500), " + "cardPicture VARCHAR(200))";

	var sqlAttributes = "CREATE TABLE IF NOT EXISTS attributes ( " + "attributeId INTEGER PRIMARY KEY AUTOINCREMENT, " + "card INTEGER REFERENCES cards, "+ "deck INTEGER REFERENCES decks," + "attributeName VARCHAR(50), " + "value DOUBLE(20), " + "unit VARCHAR(50), " + "higherValue BOOLEAN)";

	tx.executeSql(sqlDecks);
	tx.executeSql(sqlCards);
	tx.executeSql(sqlAttributes);

	tx.executeSql("INSERT INTO decks (deckId,deckName,numberAttributes,numberCards,deckType,deckPicture) VALUES (1,'BeispielDeck',5,2,'Beispiel','logo.png')");
	
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (1,1,'BeispielKarte1','Dies ist eine Beispielkarte','logo.png')");
	tx.executeSql("INSERT INTO cards (cardId,deck,cardName,description,cardPicture) VALUES (2,1,'BeispielKarte2','Dies ist eine Beispielkarte','logo.png')");

	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (1,1,1,'Geschwindigkeit',200,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (2,1,1,'Start',3,'s',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (3,1,1,'Gewicht',1800,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (4,1,1,'Motor',200,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (5,1,1,'Hubraum',2,'liter',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (6,2,1,'Geschwindigkeit',180,'km/h',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (7,2,1,'Start',3,'s',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (8,2,1,'Gewicht',2000,'kg',0)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (9,2,1,'Motor',223,'ps',1)");
	tx.executeSql("INSERT INTO attributes (attributeId,card,deck,attributeName,value,unit,higherValue) VALUES (10,2,1,'Hubraum',3,'liter',1)");
}
