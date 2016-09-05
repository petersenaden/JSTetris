function updateAllMetrics(currScore, currLines, currLevel, nextPiece) {
	clearScoreBoard();
	updateLevel(currLevel);
	updateLines(currLines);
	updateScore(currScore);
  showHelpMessage();
  displayLogo();
	updateNextPieceDisplay(nextPiece);
}


function displayLogo() {
  var canvas = document.getElementById("scoreBoard");
  var context = canvas.getContext("2d");
  image_0 = new Image();
  image_0.onload = function() {
    context.drawImage(image_0, 0, 0, width = 260, height = 140); }
  image_0.src = "http://i.imgur.com/kRtaAdM.gif";
}


function clearScoreBoard() {
	var scoreCanvas = document.getElementById("scoreBoard");
	var scoreContext = scoreCanvas.getContext("2d");
	scoreContext.beginPath();
	scoreContext.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
}

function showHelpMessage() {
  //ERROR CHECK THESE
  var canvas = document.getElementById("scoreBoard");
  var ctx = canvas.getContext("2d");
  ctx.font = "30px Impact";
  ctx.fillText("Press 'H' for help", 10, 500);
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
  context.strokeRect(0, 320, 180, 120);

    if (nextPiece == 0) {
          var tempHolder = context.fillStyle;
          context.fillStyle = '#FF69B4';
          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(60, 380, 30, 30);
          context.strokeRect(60, 380, 30, 30);

          context.fillRect(30, 380, 30, 30);
          context.strokeRect(30, 380, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    } else if (nextPiece == 1) {
          var tempHolder = context.fillStyle;
          context.fillStyle = '#008080';
          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(60, 380, 30, 30);
          context.strokeRect(60, 380, 30, 30);

          context.fillRect(30, 380, 30, 30);
          context.strokeRect(30, 380, 30, 30);

          context.fillRect(90, 380, 30, 30);
          context.strokeRect(90, 380, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    } else if (nextPiece == 2) {
          var tempHolder = context.fillStyle;
          context.fillStyle = '#ADFF2F';
          context.fillRect(30, 380, 30, 30);
          context.strokeRect(30, 380, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);

          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(90, 350, 30, 30);
          context.strokeRect(90, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    } else if (nextPiece == 3) {
          var tempHolder = context.fillStyle;
          context.fillStyle = '#F0E68C';
          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);

          context.fillRect(30, 380, 30, 30);
          context.strokeRect(30, 380, 30, 30);

          context.fillRect(60, 380, 30, 30);
          context.strokeRect(60, 380, 30, 30);

          context.fillRect(90, 380, 30, 30);
          context.strokeRect(90, 380, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    } else if (nextPiece == 4) {
          var tempHolder = context.fillStyle;
          context.fillStyle = "#6A5ACD";
          context.fillRect(30, 380, 30, 30);
          context.strokeRect(30, 380, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);

          context.fillRect(60, 380, 30, 30);
          context.strokeRect(60, 380, 30, 30);

          context.fillRect(90, 350, 30, 30);
          context.strokeRect(90, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    } else if (nextPiece == 5) {
          var tempHolder = context.fillStyle;
          context.fillStyle = "#EE82EE";
          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);

          context.fillRect(60, 380, 30, 30);
          context.strokeRect(60, 380, 30, 30);

          context.fillRect(90, 380, 30, 30);
          context.strokeRect(90, 380, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    } else if (nextPiece == 6) {
          var tempHolder = context.fillStyle;
          context.fillStyle = "#191970";
          context.fillRect(30, 350, 30, 30);
          context.strokeRect(30, 350, 30, 30);

          context.fillRect(120, 350, 30, 30);
          context.strokeRect(120, 350, 30, 30);

          context.fillRect(90, 350, 30, 30);
          context.strokeRect(90, 350, 30, 30);

          context.fillRect(60, 350, 30, 30);
          context.strokeRect(60, 350, 30, 30);
          context.fillStyle = tempHolder; //don't wanna set the whole thing to whatever this is
    }


}