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
	ctx.fillText("Level:  0" + currLevel, 10, 180);
}

function updateLines(currLines) {
	//THESE NEED TO BE ERROR CHECKED
	var canvas = document.getElementById("scoreBoard");
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Impact";
	ctx.fillText("Lines:  " + currLines, 10, 240);
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
	var context = canvas.getContext("2d");

  context.strokeStyle = "#0"; //border will be hardcoded black for now
  context.strokeRect(0, 320, 120, 120);

    if (nextPiece == 0) {
          var tempHolder = context.fillStyle;
          context.fillStyle = 'blue';
          context.fillRect(0, 320, 30, 30);
          context.strokeStyle = "#0"; //border will be hardcoded black for now
          context.strokeRect(0, 320, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }
/*
	image_0 = new Image();
    image_0.onload = function() {
    	if (nextPiece == 0) {
    	ctx.drawImage(image_0, 10, 325, 400, 400); }
    	}
  	image_0.src = "images/0.jpg";

  	image_1 = new Image();
    image_1.onload = function() {
    	if (nextPiece == 1) {
    	ctx.drawImage(image_1, 10, 325, 400, 400); }
    	}
  	image_1.src = "images/1.jpg";

  	image_2 = new Image();
    image_2.onload = function() {
    	if (nextPiece == 2) {
    	ctx.drawImage(image_2, 10, 325, 400, 400); }
    	}
  	image_2.src = "images/2.jpg";

  	image_3 = new Image();
    image_3.onload = function() {
    	if (nextPiece == 3) {
    	ctx.drawImage(image_3, 10, 325, 400, 400); }
    	}
  	image_3.src = "images/3.jpg";

  	image_4 = new Image();
    image_4.onload = function() {
    	if (nextPiece == 4) {
    	ctx.drawImage(image_4, 10, 325, 400, 400); }
    	}
  	image_4.src = "images/4.jpg";

  	image_5 = new Image();
    image_5.onload = function() {
    	if (nextPiece == 5) {
    	ctx.drawImage(image_5, 10, 325, 400, 400); }
    	}
  	image_5.src = "images/5.jpg";

  	image_6 = new Image();
    image_6.onload = function() {
    	if (nextPiece == 6) {
    	ctx.drawImage(image_6, 10, 325, 400, 400); }
    	}
  	image_6.src = "images/6.jpg";*/
}