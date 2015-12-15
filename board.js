function createTetrisGrid() {
	//0 will correspond to empty, else will be full
	var width = canvas.width / 30;
	var height = canvas.height / 30;
	tetrisGrid = createMatrix(width, height, 0);
	colorGrid = createMatrix(width, height , 0);
	//this should be fixed later. shouldn't be calling
	//globals from another file in here.
}

function createMatrix( rows, cols, defaultValue) {
	var arr = [];
	// Creates all lines:
	for(var i = 0; i < rows; i++){
		// Creates an empty line
		arr.push([]);
		// Adds columns to the empty line:
		arr[i].push(new Array(cols));
		for(var j = 0; j < cols; j++){
			// Initializes:
			arr[i][j] = defaultValue;
		}
	}
	return arr;
}

function clearGrid() {
	context.beginPath();
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function plotMatrix() {
	for (var x = 0; x < canvas.width / 30; x++) {
		for (var y = 0; y < (canvas.height / 30); y++) {
			if (tetrisGrid[x][y] == 1) {
				drawBlock(x*30, (y)*30);
			}
		}
	}
}

function drawBlock(xcoord, ycoord) {
	var blockWidth = 30;
	var blockHeight = 30;
	context.fillStyle = colorGrid[xcoord/blockWidth][ycoord/blockHeight];
	context.fillRect(xcoord, ycoord, blockWidth, blockHeight);
	context.strokeStyle = "#0"; //border will be hardcoded black for now
	context.strokeRect(xcoord, ycoord, blockWidth, blockHeight);
}

function checkLineFull(rowNum) {
	if (rowNum < 0 || rowNum >= canvas.height / 30) {
		return false;
	}

	for (var i = 0; i < canvas.width / 30; i++) {
		if (tetrisGrid[i][rowNum] == 0) {
			return false;
			}
		}
	return true;
}

function checkLineEmpty(rowNum) {
	if (rowNum < 0 || rowNum >= canvas.height / 30) {
		return false;
	}

	for (var i = 0; i < canvas.width / 30; i++) {
		if (tetrisGrid[i][rowNum] == 1) {
			return false;
			}
		}
	return true;
}

function scoreAllLines() {
	var scoringDictionary = [0, 40, 100, 300, 1200];
	//FIXME: Don't redeclare the array every time...though there's no good place to put it for now
	numberRowsCleared = 0;
	for (var i = 0; i < canvas.height / 30; i++) {
		if (checkLineFull(i) == true) {
			numberRowsCleared = numberRowsCleared + 1;
		}
	}
	return [scoringDictionary[numberRowsCleared], numberRowsCleared];
}

function clearFullLines() {
	for (var i = 0; i < canvas.height / 30; i++) {
		if (checkLineFull(i) == true) {
			clearLine(i);
		}
	}
}

function clearLine(rowNum) {
	for (var i = 0; i < canvas.width / 30; i++) {
		tetrisGrid[i][rowNum] = 0;
		colorGrid[i][rowNum] = 0;
	}
}

function applyGravityToBoard() {
	for (var j = 0; j < canvas.height / 30; j++) {
		for (var i = canvas.height / 30; i > 0; i--) {
			if (checkLineEmpty(i) == true) {
				dropLine(i);
			}
		}
	}
}

function dropLine(rowNum) {
	for (var i = 0; i < canvas.width / 30; i++) {
		tetrisGrid[i][rowNum] = tetrisGrid[i][rowNum - 1];
		tetrisGrid[i][rowNum - 1] = 0;
		colorGrid[i][rowNum] = colorGrid[i][rowNum - 1];
		colorGrid[i][rowNum - 1] = 0;
	}
}