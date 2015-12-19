function updateScore(currScore) {
	//ERROR CHECK THESE
	var canvas = document.getElementById("scoreBoard");
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Arial";
	ctx.fillText("Score: " + currScore, 10, 20); //last two args are coords
}

function updateLines(currLines) {
	//THESE NEED TO BE ERROR CHECKED
	var canvas = document.getElementById("scoreBoard");
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Arial";
	ctx.fillText("Scorcdce: " + currLines, 10, 50);
}

function updateLevel(currLevel) {
	//ERROR CHECK THESE
	var canvas = document.getElementById("scoreBoard");
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Arial";
	ctx.fillText("Sddddddddore: " + currLevel, 10, 50);


}