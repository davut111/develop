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
	$("#start_as_deathmatch").click(function(){
		startAsDeathMatch();
		});
	$("#start_as_rounds_8").click(function(){
		startAsRounds(8);
	});
	$("#start_as_rounds_16").click(function(){
		startAsRounds(16);
	});
	$("#start_as_rounds_32").click(function(){
		startAsRounds(32);
	});
	$("#start_as_stabs_8").click(function(){
		startAsStabs(8);
	});
	$("#start_as_stabs_16").click(function(){
		startAsStabs(16);
	});
	$("#start_as_stabs_32").click(function(){
		startAsStabs(32);
	});
	$("#new_deck_button_next_first").click(function() {
		loadNewDeckPageTwo();
	});
	
	$("#new_deck_button_next_second").click(function() {
		loadNewDeckPageThree();
	});
	
	$("#set_easy").click(setEasy);
	$("#set_medium").click(setMedium);
	$("#set_hard").click(setHard);
	$("#actual_card_gallery").on("swipeleft",swipeLeftGallery);
	$("#actual_card_gallery").on("swiperight",swipeRightGallery);
	$("#actual_card_gallery_two").on("swipeleft",swipeLeftGallery);
	$("#actual_card_gallery_two").on("swiperight",swipeRightGallery);
	
	$("#closeApp").click(function() {
		navigator.app.exitApp();
	});
	
	$("#exitGame").click(function() {
		undoGame;
		$.mobile.changePage( "#menu", { allowSamePageTransition:true,transition: "slide", reverse:"true" });
	});
	
	$("#closePopupButton").hide();
	$("#exitGamePopupButton").hide();
	
	document.addEventListener("backbutton", function(e){
       if($.mobile.activePage.is('#menu')){
            e.preventDefault();
            $("#closePopupButton").click();
       }else if($.mobile.activePage.is('#gallery_card_page') || $.mobile.activePage.is('#gallery_card_page_two')){
       	    $.mobile.changePage( "#gallery", { allowSamePageTransition:true,transition: "slide", reverse:"true" });
       }else if($.mobile.activePage.is('#gallery')){
       	    $.mobile.changePage( "#menu", { allowSamePageTransition:true,transition: "slide", reverse:"true" });
       }else if($.mobile.activePage.is('#new_game')){
       	    e.preventDefault();
       	    $("#exitGamePopupButton").click();
       }else if($.mobile.activePage.is('#duell_page')){
       		e.stopPropagation();
       }
       else {
            navigator.app.backHistory();
       }
    }, false);
	
};

app.initialize(); 