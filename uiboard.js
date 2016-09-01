function updateAllMetrics(currScore, currLines, currLevel, nextPiece) {
	clearScoreBoard();
	updateLevel(currLevel);
	updateLines(currLines);
	updateScore(currScore);
	updateNextPieceDisplay(nextPiece);
}

function clearScoreBoard() {
	var scoreCanvas = document.getElementById("scoreBoard");
	var scoreContext = scoreCanvas.getContext("2d");
	scoreContext.beginPath();
	scoreContext.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
}

function updateLevel(currLevel) {
	//ERROR CHECK THESE
	var canvas = document.getElementById("scoreBoard");
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Impact";
	ctx.fillText("Level: " + currLevel, 10, 180);
}

function updateLines(currLines) {
	//THESE NEED TO BE ERROR CHECKED
	var canvas = document.getElementById("scoreBoard");
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Impact";
	ctx.fillText("Lines: " + currLines, 10, 240);
}

function updateScore(currScore) {
	//ERROR CHECK THESE
	var canvas = document.getElementById("scoreBoard");
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Impact";
	ctx.fillText("Score: " + currScore, 10, 300);

}

function updateNextPieceDisplay(nextPiece) {
	//ERROR CHECK THESE
	console.log("The next piece will be: " + nextPiece);
	var canvas = document.getElementById("scoreBoard");
	var ctx = canvas.getContext("2d");
	base_image = new Image();
    base_image.onload = function() {
    	if (nextPiece == 2) {
    	ctx.drawImage(base_image, 10, 325, 400, 400); }
    	}
  	base_image.src = "1.jpg";
  	gase_image = new Image();
    gase_image.onload = function() {
    	if (nextPiece == 1) {
    	ctx.drawImage(gase_image, 10, 325, 400, 400); }
    	}
  	gase_image.src = "2.jpg";
}