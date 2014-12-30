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
	$("#actual_card_gallery").on("swipeleft",swipeLeftGallery);
	$("#actual_card_gallery").on("swiperight",swipeRightGallery);

};

app.initialize(); 