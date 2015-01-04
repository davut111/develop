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
	$("#start_as_deathmatch").click(startAsDeathMatch);
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
	$("#set_easy").click(setEasy);
	$("#set_medium").click(setMedium);
	$("#set_hard").click(setHard);
	$("#actual_card_gallery").on("swipeleft",swipeLeftGallery);
	$("#actual_card_gallery").on("swiperight",swipeRightGallery);
	
};

app.initialize(); 