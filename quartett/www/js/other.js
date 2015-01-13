$(document).bind("mobileinit", function() {
				$.event.special.swipe.horizontalDistanceThreshold = 10;
});

function calcAverage(deck){
	var averages = [];
	var avg1 = 0;
	var avg2 = 0;
	var avg3 = 0;
	var avg4 = 0;
	var avg5 = 0;
	
	for(var i=0;i<deck.cards.length;i++){
		avg1+= parseFloat(deck.cards[i].values[0]);
		avg2+= parseFloat(deck.cards[i].values[1]);
		avg3+= parseFloat(deck.cards[i].values[2]);
		if(deck.attributeNumber == 4){
			avg4+= parseFloat(deck.cards[i].values[3]);
		}else if(deck.attributeNumber == 5){
			avg4+= parseFloat(deck.cards[i].values[3]);
			avg5+= parseFloat(deck.cards[i].values[4]);
		}
	}
	
	avg1 /=deck.cards.length; 
	avg2 /=deck.cards.length; 
	avg3 /=deck.cards.length; 
	
	avg1 = parseFloat(avg1.toFixed(1));
	avg2 = parseFloat(avg2.toFixed(1));
	avg3 = parseFloat(avg3.toFixed(1));
	
	averages = [avg1,avg2,avg3];
	if(deck.attributeNumber == 4){
		avg4 /= deck.cards.length;
		avg4 = parseFloat(avg4.toFixed(1));
		averages[averages.length]= avg4;
	}else if(deck.attributeNumber == 5){
		avg4 /= deck.cards.length;
		avg5 /= deck.cards.length;
		avg4 = parseFloat(avg4.toFixed(1));
		avg5 = parseFloat(avg5.toFixed(1));
		averages[averages.length]= avg4;
		averages[averages.length]= avg5;
	}

	return averages;
}

function onCameraSuccess(image) {
	//alert(image);
   // $('#card_pic_create_deck').attr('src',image);

   movePic(image);
}

function movePic(file){ 
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
} 

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 

    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "NewDecks";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
    fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                        entry.moveTo(directory, newFileName,  successMove, resOnError);
                    },
                    resOnError);
                    },
    resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    //I do my insert with "entry.fullPath" as for the path
    var picPath = entry.toURL();
    actPic = picPath;
    $('#card_pic_create_deck').attr('src',picPath);
}

function resOnError(error) {
    alert(error.code);
}

function onCameraFail(message) {
    alert('Failed during opening the Camera because: ' + message);
}
