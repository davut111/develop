var newDeck = {
	deckName : "Neues Deck",
	deckType : "Beispieldeck",
	cardNumber: null,
	attributeNumber: null,
	finished: false,
	attributes: [],
	cards:[]
};

var cardNumbers = {
	SMALL : 16,
	MEDIUM : 24,
	BIG : 32
};

var attributeNumbers = {
	SMALL : 3,
	MEDIUM : 4,
	BIG : 5
};

var actCard = 0;
var actPic = 'img/logo.png';

function loadNewDeckPageTwo (){
	var deckName, deckType, cardNumber, attributeNumber;
	deckName = $("#deckName").val();
	deckType = $("#deckType").val();
	
	switch ($("#select-choice-card").val()) {
		case "16" : 
			cardNumber = cardNumbers.SMALL;
			break;
		case "24" :
			cardNumber = cardNumbers.MEDIUM;
			break;
		case "32":
			cardNumber = cardNumbers.BIG;
			break;
	}
	
	switch ($("#select-choice-attribute").val()) {
		case "3" : 
			attributeNumber = attributeNumbers.SMALL;
			break;
		case "4" :
			attributeNumber = attributeNumbers.MEDIUM;
			break;
		case "5":
			attributeNumber = attributeNumbers.BIG;
			break;
	}
	
	newDeck.deckName = deckName;
	newDeck.deckType = deckType;
	newDeck.cardNumber = cardNumber;
	newDeck.attributeNumber = attributeNumber;

	loadGUIPageTwo(attributeNumber);
}

function loadNewDeckPageThree (){
	var attribute1,attribute2,attribute3,attribute4,attribute5;
	var attributeName1,attributeName2,attributeName3,attributeName4,attributeName5,attributeType1,attributeType2,attributeType3,attributeType4,attributeType5,higherValue1,higherValue2,higherValue3,higherValue4,higherValue5;
	attributeName1 = $("#attribute_name_1").val();
	attributeName2 = $("#attribute_name_2").val();
	attributeName3 = $("#attribute_name_3").val();
	attributeType1 = $("#attribute_type_1").val();
	attributeType2 = $("#attribute_type_2").val();
	attributeType3 = $("#attribute_type_3").val();
	
	if($("#higher_value_1").val() == "higher"){
		higherValue1 = true;		
	}else{
		higherValue1 = false;	
	}
	
	if($("#higher_value_2").val() == "higher"){
		higherValue2 = true;		
	}else{
		higherValue2 = false;	
	}
	
	if($("#higher_value_3").val() == "higher"){
		higherValue3 = true;		
	}else{
		higherValue3 = false;	
	}
	
	attribute1 = {
		name: attributeName1,
		type: attributeType1,
		higherValue: higherValue1 
	};
	attribute2 = {
		name: attributeName2,
		type: attributeType2,
		higherValue: higherValue2 
	};
	attribute3 = {
		name: attributeName3,
		type: attributeType3,
		higherValue: higherValue3 
	};
	
	if(newDeck.attributeNumber == 4){
		attributeName4 = $("#attribute_name_4").val();
		attributeType4 = $("#attribute_type_4").val();
		if($("#higher_value_4").val() == "higher"){
			higherValue4 = true;		
		}else{
			higherValue4 = false;	
		}
		
		attribute4 = {
			name: attributeName4,
			type: attributeType4,
			higherValue: higherValue4 
		};
		if(attributeName4.length == 0 || attributeType4.length == 0 ){
		alert("Bitte alle Felder ausfüllen!");
		}else{	
		newDeck.attributes = [attribute1,attribute2,attribute3,attribute4];
		loadGUIPageThree(newDeck.attributeNumber);
		$.mobile.changePage("#new_deck_page_third", {
				transition : "slide"
			});
		}
		
	}else if(newDeck.attributeNumber == 5){
		attributeName4 = $("#attribute_name_4").val();
		attributeName5 = $("#attribute_name_5").val();
		attributeType4 = $("#attribute_type_4").val();
		attributeType5 = $("#attribute_type_5").val();
		
		if($("#higher_value_4").val() == "higher"){
			higherValue4 = true;		
		}else{
			higherValue4 = false;	
		}
		
		if($("#higher_value_5").val() == "higher"){
			higherValue5 = true;		
		}else{
			higherValue5 = false;	
		}
		
		attribute4 = {
			name: attributeName4,
			type: attributeType4,
			higherValue: higherValue4 
		};
		attribute5 = {
			name: attributeName5,
			type: attributeType5,
			higherValue: higherValue5 
		};
		
		if(attributeName4.length == 0 || attributeType4.length == 0 || attributeName5.length == 0 || attributeType5.length == 0){
		alert("Bitte alle Felder ausfüllen!");
		}else{	
		newDeck.attributes = [attribute1,attribute2,attribute3,attribute4,attribute5];
		loadGUIPageThree(newDeck.attributeNumber);
		$.mobile.changePage("#new_deck_page_third", {
				transition : "slide"
			});
		}
		}
		
	else if(newDeck.attributeNumber == 3){
		if(attributeName1.length == 0 || attributeName2.length == 0 || attributeName3.length == 0 
		|| attributeType1.length == 0 || attributeType2.length == 0 || attributeType3.length == 0 ){
		alert("Bitte alle Felder ausfüllen!");
		}else{
		newDeck.attributes = [attribute1,attribute2,attribute3];
		loadGUIPageThree(newDeck.attributeNumber);
		$.mobile.changePage("#new_deck_page_third", {
				transition : "slide"
			});
		}
		}
}
	
	


function loadGUIPageTwo(attributeNumber){
	
	switch (attributeNumber) {
		case 3 : 
			$("#new_deck_page_second_content").prepend(
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute1">Attribut 1:</label>'+
					'<input type="text" name="attribute1" id="attribute_name_1" placeholder="z.B. Geschwindigkeit" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType1">Einheit:</label>'+
					'<input type="text" name="attributeType1" id="attribute_type_1" placeholder="z.B. km/h" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue1">Gewinnt wenn</label>'+
					'<select name="higherValue1" id="higher_value_1" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute2">Attribut 2:</label>'+
					'<input type="text" name="attribute2" id="attribute_name_2" placeholder="z.B. Leistung" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType2">Einheit:</label>'+
					'<input type="text" name="attributeType2" id="attribute_type_2" placeholder="z.B. ps" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue2">Gewinnt wenn</label>'+
					'<select name="higherValue2" id="higher_value_2" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute3">Attribut 3:</label>'+
					'<input type="text" name="attribute3" id="attribute_name_3" placeholder="z.B. Hubraum" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType3">Einheit:</label>'+
					'<input type="text" name="attributeType3" id="attribute_type_3" placeholder="z.B. ccm" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue3">Gewinnt wenn</label>'+
					'<select name="higherValue3" id="higher_value_3" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>');
			break;
		case 4 :
			$("#new_deck_page_second_content").prepend(
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute1">Attribut 1:</label>'+
					'<input type="text" name="attribute1" id="attribute_name_1" placeholder="z.B. Geschwindigkeit" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType1">Einheit:</label>'+
					'<input type="text" name="attributeType1" id="attribute_type_1" placeholder="z.B. km/h" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue1">Gewinnt wenn</label>'+
					'<select name="higherValue1" id="higher_value_1" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute2">Attribut 2:</label>'+
					'<input type="text" name="attribute2" id="attribute_name_2" placeholder="z.B. Leistung" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType2">Einheit:</label>'+
					'<input type="text" name="attributeType2" id="attribute_type_2" placeholder="z.B. ps" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue2">Gewinnt wenn</label>'+
					'<select name="higherValue2" id="higher_value_2" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute3">Attribut 3:</label>'+
					'<input type="text" name="attribute3" id="attribute_name_3" placeholder="z.B. Hubraum" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType3">Einheit:</label>'+
					'<input type="text" name="attributeType3" id="attribute_type_3" placeholder="z.B. ccm" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue3">Gewinnt wenn</label>'+
					'<select name="higherValue3" id="higher_value_3" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute4">Attribut 4:</label>'+
					'<input type="text" name="attribute4" id="attribute_name_4" placeholder="z.B. Gewicht" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType4">Einheit:</label>'+
					'<input type="text" name="attributeType4" id="attribute_type_4" placeholder="z.B. kg" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue4">Gewinnt wenn</label>'+
					'<select name="higherValue4" id="higher_value_4" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>');
			break;
		case 5:
			$("#new_deck_page_second_content").prepend(
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute1">Attribut 1:</label>'+
					'<input type="text" name="attribute1" id="attribute_name_1" placeholder="z.B. Geschwindigkeit" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType1">Einheit:</label>'+
					'<input type="text" name="attributeType1" id="attribute_type_1" placeholder="z.B. km/h" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue1">Gewinnt wenn</label>'+
					'<select name="higherValue1" id="higher_value_1" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute2">Attribut 2:</label>'+
					'<input type="text" name="attribute2" id="attribute_name_2" placeholder="z.B. Leistung" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType2">Einheit:</label>'+
					'<input type="text" name="attributeType2" id="attribute_type_2" placeholder="z.B. ps" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue2">Gewinnt wenn</label>'+
					'<select name="higherValue2" id="higher_value_2" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute3">Attribut 3:</label>'+
					'<input type="text" name="attribute3" id="attribute_name_3" placeholder="z.B. Hubraum" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType3">Einheit:</label>'+
					'<input type="text" name="attributeType3" id="attribute_type_3" placeholder="z.B. ccm" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue3">Gewinnt wenn</label>'+
					'<select name="higherValue3" id="higher_value_3" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute4">Attribut 4:</label>'+
					'<input type="text" name="attribute4" id="attribute_name_4" placeholder="z.B. Gewicht" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType4">Einheit:</label>'+
					'<input type="text" name="attributeType4" id="attribute_type_4" placeholder="z.B. kg" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue4">Gewinnt wenn</label>'+
					'<select name="higherValue4" id="higher_value_4" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower" selected="true">Niedriger</option></select></div></div>'+
				'<div class="ui-field-contain"><div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attribute5">Attribut 5:</label>'+
					'<input type="text" name="attribute5" id="attribute_name_5" placeholder="z.B. Preis" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label margin-zero" for="attributeType5">Einheit:</label>'+
					'<input type="text" name="attributeType5" id="attribute_type_5" placeholder="z.B. euro" value=""></div>'+
					'<div class="flex-row-menu flex-between"><label class="flex-center custom-input-label-big margin-zero" for="higherValue5">Gewinnt wenn</label>'+
					'<select name="higherValue5" id="higher_value_5" data-mini="true" data-inline="true">'+
					    '<option value="higher">Höher</option>'+
					    '<option value="lower">Niedriger</option></select></div></div>');
			break;
	}
	
}

function loadGUIPageThree(attributeNumber){
	$("#to_remove").remove();
	actCard++;
	if(newDeck.finished == true){
		$('#cards_finished_button').removeClass('ui-disabled');
	}else{
		$('#cards_finished_button').prop('disabled', true).addClass('ui-disabled');
	}
	
	$("#new_cards_content").before('<a id="pop_camera_button" href="#open_camera_popup" data-rel="popup" data-position-to="#card_pic_create_deck"'+
	' class="ui-btn ui-icon-camera ui-btn-icon-notext camera-button">Home</a>'+
	'<div data-role="popup" id="open_camera_popup"><div role="content" class="ui-content dialog">'+
	'<a id="open_camera" href="#" class="ui-btn">Kamera</a><a id="open_device_gallery" href="#" class="ui-btn">Album</a></div></div>');
	
	$("#new_cards_content").children().remove();
	$("#new_deck_prev_card").after('<label id="to_remove" class="flex-center margin-zero">Karte '+actCard+' von '+newDeck.cardNumber+'</label>');
	$("#new_cards_content").append('<div class="ui-grid-a card-cell-big">'+
	'<img id="card_pic_create_deck" class="card-picture" src="img/logo.png" /></div>');
	
	$("#open_camera").click(function() {
		navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
		quality: 35,
  		destinationType: Camera.DestinationType.FILE_URI,
  		encodingType: Camera.EncodingType.JPEG,
  		targetWidth: 500,
  		targetHeight: 450,
  		saveToPhotoAlbum: true
  		});
	});
	
	$("#open_device_gallery").click(function() {
		navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
		quality: 35,
  		destinationType: Camera.DestinationType.FILE_URI,
  		targetWidth: 500,
  		targetHeight: 450,
  		sourceType : Camera.PictureSourceType.PHOTOLIBRARY
  		});
	});
	
	switch(attributeNumber) {
	case 3:
		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-3 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-3 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value1" placeholder="Wert">'+
							'<div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-3');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-3 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value2" placeholder="Wert">'+
							'<div>'+newDeck.attributes[1].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-3 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-3 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value3" placeholder="Wert">'+
							'<div>'+newDeck.attributes[2].type+'</div></div>');

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		$("#new_deck_next_card").click(function() {
			var getVal1 = $("#new_card_value1").val();
			var getVal2 = $("#new_card_value2").val();
			var getVal3 = $("#new_card_value3").val();
			var name = $("#cardName").val();

			if(isNaN(parseFloat(getVal1))|| isNaN(parseFloat(getVal2)) || isNaN(parseFloat(getVal3)) || name.length == 0){
				alert("Bitte alles richtig ausfüllen: Werte als Zahlen z.B. 4 oder 4.6 und Kartenname z.B. Karte1");
				
			}else{
				var card = {
					attributes: newDeck.attributes,
					values: [getVal1,getVal2,getVal3],
					name: name,
					picture: 'img/logo.png'
				};
				card.picture = actPic;
				newDeck.cards[actCard - 1] = card;
				loadNewCard(attributeNumber);
			}
		});
		
		$("#new_deck_prev_card").click(function() {
				loadPrevCard(attributeNumber);
		});
		
		break;
	case 4:
		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-4 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-4 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value1" placeholder="Wert">'+
							'<div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-4');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-4 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value2" placeholder="Wert">'+
							'<div>'+newDeck.attributes[1].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-4 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-4 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value3" placeholder="Wert">'+
							'<div>'+newDeck.attributes[2].type+'</div></div>');
		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-4');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(newDeck.attributes[3].name);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-4 card-value');
		$(value4).attr('id', 'value4');
		$(value4).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value4" placeholder="Wert">'+
							'<div>'+newDeck.attributes[3].type+'</div></div>');
		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		$("#new_deck_next_card").click(function() {
			var getVal1 = $("#new_card_value1").val();
			var getVal2 = $("#new_card_value2").val();
			var getVal3 = $("#new_card_value3").val();
			var getVal4 = $("#new_card_value4").val();
			var name = $("#cardName").val();
			
			if(isNaN(parseFloat(getVal1))|| isNaN(parseFloat(getVal2)) || isNaN(parseFloat(getVal3)) || isNaN(parseFloat(getVal4)) || name.length == 0){
				alert("Bitte alles richtig ausfüllen: Werte als Zahlen z.B. 4 oder 4.6 und Kartenname z.B. Karte1");				
			}else{
				var card = {
					attributes: newDeck.attributes,
					values: [getVal1,getVal2,getVal3,getVal4],
					name: name,
					picture: 'img/logo.png'
				};
				card.picture = actPic;
				newDeck.cards[actCard - 1] = card;
				loadNewCard(attributeNumber);
			}
			
		});
		
		$("#new_deck_prev_card").click(function() {
				loadPrevCard(attributeNumber);
		});

		break;
	case 5:

		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value1" placeholder="Wert">'+
							'<div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-5');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-5 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value2" placeholder="Wert">'+
							'<div>'+newDeck.attributes[1].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value3" placeholder="Wert">'+
							'<div>'+newDeck.attributes[2].type+'</div></div>');

		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-5');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(newDeck.attributes[3].name);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-5 card-value');
		$(value4).attr('id', 'value4');
		$(value4).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value4" placeholder="Wert">'+
							'<div>'+newDeck.attributes[3].type+'</div></div>');

		var attribute5 = $("<div>");
		$(attribute5).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute5).attr('id', 'attribute5');
		$(attribute5).html(newDeck.attributes[4].name);
		var value5 = $("<div>");
		$(value5).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value5).attr('id', 'value5');
		$(value5).append('<div class="flex-row-menu custom_textbox"><input type="text" id="new_card_value5" placeholder="Wert">'+
							'<div>'+newDeck.attributes[4].type+'</div></div>');

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		$("#new_deck_next_card").click(function() {
			var getVal1 = $("#new_card_value1").val();
			var getVal2 = $("#new_card_value2").val();
			var getVal3 = $("#new_card_value3").val();
			var getVal4 = $("#new_card_value4").val();
			var getVal5 = $("#new_card_value5").val();
			var name = $("#cardName").val();
			
			if(isNaN(parseFloat(getVal1))|| isNaN(parseFloat(getVal2)) || isNaN(parseFloat(getVal3)) || isNaN(parseFloat(getVal4)) || isNaN(parseFloat(getVal5)) || name.length == 0){
				alert("Bitte alles richtig ausfüllen: Werte als Zahlen z.B. 4 oder 4.6 und Kartenname z.B. Karte1");
				
			}else{
				var card = {
					attributes: newDeck.attributes,
					values: [getVal1,getVal2,getVal3,getVal4,getVal5],
					name: name,
					picture: 'img/logo.png'
				};
				card.picture = actPic;
				newDeck.cards[actCard - 1] = card;
				loadNewCard(attributeNumber);
			}
		});
		
		$("#new_deck_prev_card").click(function() {
				loadPrevCard(attributeNumber);
		});

		break;
	default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}
}

function loadNewCard(attributeNumber){
	actCard++;
	$("#to_remove").remove();
	
	actPic = 'img/logo.png';
	
	if(actCard == 2){
		$("#new_deck_prev_card").removeClass('ui-disabled');
	}else if(actCard == newDeck.cardNumber){
		newDeck.finished = true;
		$('#new_deck_next_card').prop('disabled', true).addClass('ui-disabled');
	}
	
	if(newDeck.finished == true){
		$('#cards_finished_button').removeClass('ui-disabled');
	}else{
		$('#cards_finished_button').prop('disabled', true).addClass('ui-disabled');
	}
	
	$("#new_cards_content").children().remove();
	$("#new_deck_prev_card").after('<label id="to_remove" class="flex-center margin-zero">Karte '+actCard+' von '+newDeck.cardNumber+'</label>');
	
	if(actCard > newDeck.cards.length){
		$("#new_cards_content").append('<div class="ui-grid-a card-cell-big"><img id="card_pic_create_deck" class="card-picture" src="img/logo.png" /></div>');
	}else{
		$("#new_cards_content").append('<div class="ui-grid-a card-cell-big"><img id="card_pic_create_deck" class="card-picture" src="'+newDeck.cards[actCard-1].picture+'" /></div>');
	}
		
		$("#open_camera").click(function() {
			navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
			quality: 35,
	  		destinationType: Camera.DestinationType.FILE_URI,
	  		encodingType: Camera.EncodingType.JPEG,
	  		targetWidth: 500,
	  		targetHeight: 450,
	  		saveToPhotoAlbum: true
	  		});
		});
		
		$("#open_device_gallery").click(function() {
			navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
			quality: 35,
	  		destinationType: Camera.DestinationType.FILE_URI,
	  		targetWidth: 500,
	  		targetHeight: 450,
	  		sourceType : Camera.PictureSourceType.PHOTOLIBRARY
	  		});
		});	
	switch(attributeNumber) {
	case 3:
		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-3 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-3 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value1" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-3');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-3 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value2" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[2].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-3 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-3 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value3" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[2].type+'</div></div>');

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		if(actCard > newDeck.cards.length){
			$("#cardName").val("");
		}else{
			$("#cardName").val(newDeck.cards[actCard-1].name);
			$("#new_card_value1").val(newDeck.cards[actCard-1].values[0]);
			$("#new_card_value2").val(newDeck.cards[actCard-1].values[1]);
			$("#new_card_value3").val(newDeck.cards[actCard-1].values[2]);
		}
		
		break;
	case 4:
		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-4 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-4 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value1" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-4');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-4 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value2" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[1].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-4 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-4 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value3" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[2].type+'</div></div>');
		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-4');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(newDeck.attributes[3].name);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-4 card-value');
		$(value4).attr('id', 'value4');
		$(value4).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value4" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[3].type+'</div></div>');
							
		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		if(actCard > newDeck.cards.length){
			$("#cardName").val("");
		}else{
			$("#cardName").val(newDeck.cards[actCard-1].name);
			$("#new_card_value1").val(newDeck.cards[actCard-1].values[0]);
			$("#new_card_value2").val(newDeck.cards[actCard-1].values[1]);
			$("#new_card_value3").val(newDeck.cards[actCard-1].values[2]);
			$("#new_card_value4").val(newDeck.cards[actCard-1].values[3]);
		}

		break;
	case 5:

		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value1" value="1" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-5');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-5 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value2" value="1" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[1].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value3" value="1" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[2].type+'</div></div>');

		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-5');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(newDeck.attributes[3].name);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-5 card-value');
		$(value4).attr('id', 'value4');
		$(value4).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value4" value="1" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[3].type+'</div></div>');

		var attribute5 = $("<div>");
		$(attribute5).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute5).attr('id', 'attribute5');
		$(attribute5).html(newDeck.attributes[4].name);
		var value5 = $("<div>");
		$(value5).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value5).attr('id', 'value5');
		$(value5).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value5" value="1" placeholder="Wert"></div>'+
							'<div>'+newDeck.attributes[4].type+'</div></div>');

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		if(actCard > newDeck.cards.length){
			$("#cardName").val("");
		}else{
			$("#cardName").val(newDeck.cards[actCard-1].name);
			$("#new_card_value1").val(newDeck.cards[actCard-1].values[0]);
			$("#new_card_value2").val(newDeck.cards[actCard-1].values[1]);
			$("#new_card_value3").val(newDeck.cards[actCard-1].values[2]);
			$("#new_card_value4").val(newDeck.cards[actCard-1].values[3]);
			$("#new_card_value5").val(newDeck.cards[actCard-1].values[4]);
		}

		break;
	default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}
}

function loadPrevCard(attributeNumber){
	actCard--;
	$("#to_remove").remove();
	
	if(actCard == newDeck.cardNumber -1){
		$("#new_deck_next_card").removeClass('ui-disabled');
	}else if(actCard == 1){
		$('#new_deck_prev_card').prop('disabled', true).addClass('ui-disabled');
	}
	
	$("#new_cards_content").children().remove();
	$("#new_deck_prev_card").after('<label id="to_remove" class="flex-center margin-zero">Karte '+actCard+' von '+newDeck.cardNumber+'</label>');
	$("#new_cards_content").append('<div class="ui-grid-a card-cell-big"><img class="card-picture" src="'+newDeck.cards[actCard -1].picture+'" /></div>');
	
	switch(attributeNumber) {
	case 3:
		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-3 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-3 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value1" value="'+newDeck.cards[actCard-1].values[0]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-3');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-3 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value2" value="'+newDeck.cards[actCard-1].values[1]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[1].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-3 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-3 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value3" value="'+newDeck.cards[actCard-1].values[2]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[2].type+'</div></div>');

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		$("#cardName").val(newDeck.cards[actCard -1].name);
		break;
	case 4:
		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-4 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-4 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value1" value="'+newDeck.cards[actCard-1].values[0]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-4');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-4 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value2" value="'+newDeck.cards[actCard-1].values[1]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[1].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-4 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-4 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value3" value="'+newDeck.cards[actCard-1].values[2]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[2].type+'</div></div>');
							
		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-4');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(newDeck.attributes[3].name);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-4 card-value');
		$(value4).attr('id', 'value4');
		$(value4).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value4" value="'+newDeck.cards[actCard-1].values[3]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[3].type+'</div></div>');
							
		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		$("#cardName").val(newDeck.cards[actCard -1].name);

		break;
	case 5:

		var bigCell = $("<div>");
		$(bigCell).addClass('ui-grid-a card-cell-big');

		var attribute1 = $("<div>");
		$(attribute1).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute1).attr('id', 'attribute1');
		$(attribute1).html(newDeck.attributes[0].name);
		var value1 = $("<div>");
		$(value1).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value1).attr('id', 'value1');
		$(value1).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value1" value="'+newDeck.cards[actCard-1].values[0]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[0].type+'</div></div>');

		var attribute2 = $("<div>");
		$(attribute2).addClass('ui-block-a card-cell-5');
		$(attribute2).attr('id', 'attribute2');
		$(attribute2).html(newDeck.attributes[1].name);
		var value2 = $("<div>");
		$(value2).addClass('ui-block-b card-cell-5 card-value');
		$(value2).attr('id', 'value2');
		$(value2).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value2" value="'+newDeck.cards[actCard-1].values[1]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[1].type+'</div></div>');

		var attribute3 = $("<div>");
		$(attribute3).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute3).attr('id', 'attribute3');
		$(attribute3).html(newDeck.attributes[2].name);
		var value3 = $("<div>");
		$(value3).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value3).attr('id', 'value3');
		$(value3).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value3" value="'+newDeck.cards[actCard-1].values[2]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[2].type+'</div></div>');

		var attribute4 = $("<div>");
		$(attribute4).addClass('ui-block-a card-cell-5');
		$(attribute4).attr('id', 'attribute4');
		$(attribute4).html(newDeck.attributes[3].name);
		var value4 = $("<div>");
		$(value4).addClass('ui-block-b card-cell-5 card-value');
		$(value4).attr('id', 'value4');
		$(value4).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value4" value="'+newDeck.cards[actCard-1].values[3]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[3].type+'</div></div>');

		var attribute5 = $("<div>");
		$(attribute5).addClass('ui-block-a card-cell-5 even-cell');
		$(attribute5).attr('id', 'attribute5');
		$(attribute5).html(newDeck.attributes[4].name);
		var value5 = $("<div>");
		$(value5).addClass('ui-block-b card-cell-5 even-cell card-value');
		$(value5).attr('id', 'value5');
		$(value5).append('<div class="flex-row-menu custom_textbox">'+
							'<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">'+
							'<input type="text" id="new_card_value5" value="'+newDeck.cards[actCard-1].values[4]+'" '+
							'placeholder="Wert"></div><div>'+newDeck.attributes[4].type+'</div></div>');

		$(bigCell).append(attribute1, value1, attribute2, value2, attribute3, value3, attribute4, value4, attribute5, value5);
		$("#new_cards_content").append(bigCell);
		
		$("#cardName").val(newDeck.cards[actCard -1].name);
		
		break;
	default:
		alert("Die Attributanzahl des Decks darf minimal 3 und maximal 5 betragen");
	}
}

function createDeck(){
	switch (newDeck.attributeNumber){
		case 3:
			var getVal1 = $("#new_card_value1").val();
			var getVal2 = $("#new_card_value2").val();
			var getVal3 = $("#new_card_value3").val();
			var cardName = $("#cardName").val();
			if(isNaN(parseFloat(getVal1))|| isNaN(parseFloat(getVal2)) || isNaN(parseFloat(getVal3)) || $("#cardName").val().length == 0){
					alert("Bitte alles richtig ausfüllen: Werte als Zahlen z.B. 4 oder 4.6 und Kartenname z.B. Karte1");
							
			}else{
				var card = {
					attributes: newDeck.attributes,
					values: [getVal1,getVal2,getVal3],
					name: cardName
				};
				newDeck.cards[newDeck.cards.length] = card;
				
				insertDeckIntoDB(newDeck);
				
				$.mobile.changePage("#gallery", {
				});
			}
		break;
		case 4:
			var getVal1 = $("#new_card_value1").val();
			var getVal2 = $("#new_card_value2").val();
			var getVal3 = $("#new_card_value3").val();
			var getVal4 = $("#new_card_value4").val();
			var cardName = $("#cardName").val();
			if(isNaN(parseFloat(getVal1))|| isNaN(parseFloat(getVal2)) || isNaN(parseFloat(getVal3)) || isNaN(parseFloat(getVal4)) || $("#cardName").val().length == 0){
					alert("Bitte alles richtig ausfüllen: Werte als Zahlen z.B. 4 oder 4.6 und Kartenname z.B. Karte1");		
			}else{
				var card = {
					attributes: newDeck.attributes,
					values: [getVal1,getVal2,getVal3,getVal4],
					name: cardName
				};
				newDeck.cards[newDeck.cards.length] = card;
				
				insertDeckIntoDB(newDeck);
				
				$.mobile.changePage("#gallery", {
				});
			}
		break;
		case 5:
			var getVal1 = $("#new_card_value1").val();
			var getVal2 = $("#new_card_value2").val();
			var getVal3 = $("#new_card_value3").val();
			var getVal4 = $("#new_card_value4").val();
			var getVal5 = $("#new_card_value5").val();
			var cardName = $("#cardName").val();
			if(isNaN(parseFloat(getVal1))|| isNaN(parseFloat(getVal2)) || isNaN(parseFloat(getVal3)) || isNaN(parseFloat(getVal4)) || isNaN(parseFloat(getVal5)) || $("#cardName").val().length == 0){
					alert("Bitte alles richtig ausfüllen: Werte als Zahlen z.B. 4 oder 4.6 und Kartenname z.B. Karte1");			
			}else{
				var card = {
					attributes: newDeck.attributes,
					values: [getVal1,getVal2,getVal3,getVal4,getVal5],
					name: cardName
				};
				newDeck.cards[newDeck.cards.length] = card;
				
				insertDeckIntoDB(newDeck);
				
				$.mobile.changePage("#gallery", {
				});
			}
		break;
	}
	
}
