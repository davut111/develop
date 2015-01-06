$(document).bind("mobileinit", function() {
				$.event.special.swipe.horizontalDistanceThreshold = 10;
				console.log("swipe 10px");
});