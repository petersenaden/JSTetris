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
	ctx.fillText("Level:  " + currLevel, 10, 180);
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
          context.fillStyle = '#FF69B4';
          context.fillRect(0, 320, 30, 30);
          context.strokeRect(0, 320, 30, 30);

          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(0, 350, 30, 30);
          context.strokeRect(0, 350, 30, 30);

          context.fillRect(30, 320, 30, 30);
          context.strokeRect(30, 320, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }

    if (nextPiece == 1) {
          var tempHolder = context.fillStyle;
          context.fillStyle = '#008080';
          context.fillRect(0, 320, 30, 30);
          context.strokeRect(0, 320, 30, 30);

          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(0, 350, 30, 30);
          context.strokeRect(0, 350, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }

    if (nextPiece == 2) {
          var tempHolder = context.fillStyle;
          context.fillStyle = '#ADFF2F';
          context.fillRect(0, 380, 30, 30);
          context.strokeRect(0, 380, 30, 30);

          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(0, 350, 30, 30);
          context.strokeRect(0, 350, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }

    if (nextPiece == 3) {
          var tempHolder = context.fillStyle;
          context.fillStyle = '#F0E68C';
          context.fillRect(30, 320, 30, 30);
          context.strokeRect(30, 320, 30, 30);

          context.fillRect(0, 350, 30, 30);
          context.strokeRect(0, 350, 30, 30);

          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }

    if (nextPiece == 4) {
          var tempHolder = context.fillStyle;
          context.fillStyle = "#6A5ACD";
          context.fillRect(0, 350, 30, 30);
          context.strokeRect(0, 350, 30, 30);

          context.fillRect(30, 320, 30, 30);
          context.strokeRect(30, 320, 30, 30);

          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(60, 320, 30, 30);
          context.strokeRect(60, 320, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }

    if (nextPiece == 5) {
          var tempHolder = context.fillStyle;
          context.fillStyle = "#EE82EE";
          context.fillRect(0, 320, 30, 30);
          context.strokeRect(0, 320, 30, 30);

          context.fillRect(30, 320, 30, 30);
          context.strokeRect(30, 320, 30, 30);

          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }

    if (nextPiece == 6) {
          var tempHolder = context.fillStyle;
          context.fillStyle = "#191970";
          context.fillRect(0, 350, 30, 30);
          context.strokeRect(0, 350, 30, 30);

          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(90, 350, 30, 30);
          context.strokeRect(90, 350, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }


}