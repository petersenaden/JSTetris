function updateAllMetrics(currScore, currLines, currLevel) {
	clearScoreBoard();
	updateLevel(currLevel);
	updateLines(currLines);
	updateScore(currScore);
	drawMetricOutline();
}

function clearScoreBoard() {
	var scoreCanvas = document.getElementById("scoreBoard");
	var scoreContext = scoreCanvas.getContext("2d");
	scoreContext.beginPath();
	scoreContext.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
}

function updateLevel(currLevel) {
	//ERROR CHECK THESE
	var scoreCanvas = document.getElementById("scoreBoard");
	var scoreContext = scoreCanvas.getContext("2d");
	scoreContext.font = "30px Impact";
	scoreContext.fillText("Level: " + currLevel, 10, 180);
}

function updateLines(currLines) {
	//THESE NEED TO BE ERROR CHECKED
	var scoreCanvas = document.getElementById("scoreBoard");
	var scoreContext = scoreCanvas.getContext("2d");
	scoreContext.font = "30px Impact";
	scoreContext.fillText("Lines: " + currLines, 10, 240);
}

function updateScore(currScore) {
	//ERROR CHECK THESE
	var scoreCanvas = document.getElementById("scoreBoard");
	var scoreContext = scoreCanvas.getContext("2d");
	scoreContext.font = "30px Impact";
	scoreContext.fillText("Score: " + currScore, 10, 300);
}

function drawMetricOutline() {
	var scoreCanvas = document.getElementById("scoreBoard");
	var scoreContext = scoreCanvas.getContext("2d");
	scoreContext.fillRect(0,150,5,170);
}