
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }
};

function onDeviceReady(){
	bindListeners();
	console.log("ready");
}

var bindListeners =  function() {
    	$("h2").click(function() {
    		window.alert("Some");
		});
   };


app.initialize();