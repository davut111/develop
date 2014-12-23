
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', onDeviceReady, false);
    }
};

function onDeviceReady(){
	bindListeners();
}

var bindListeners =  function() {
    	$("#start_as_deathmatch").click(function() {
    		
		});
   };


app.initialize();