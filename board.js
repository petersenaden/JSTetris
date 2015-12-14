function createTetrisGrid() {
	//0 will correspond to empty, else will be full
	var width = canvas.width / 100;
	var height = canvas.height / 100;
	tetrisGrid = createMatrix(width, height, 0);
	//this should be fixed later. shouldn't be calling
	//globals from another file in here.
}

function createMatrix( rows, cols, defaultValue) {
	var arr = [];
	// Creates all lines:
	for(var i=0; i < rows; i++){
		// Creates an empty line
		arr.push([]);
		// Adds cols to the empty line:
		arr[i].push( new Array(cols));
		for(var j=0; j < cols; j++){
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
	for (var i = 0; i < canvas.width / 100; i++) {
		for (var j = 0; j < canvas.height / 100; j++) {
			if (tetrisGrid[i][j] == 1) {
				drawBlock(i*100, j*100);
			}
		}
	}
}

function drawBlock(xcoord, ycoord) {
	var blockWidth = 100;
	var blockHeight = 100;
	context.rect(xcoord, ycoord, blockWidth, blockHeight);
	context.stroke(); //Actually draws what has been defined
}

function checkLineFull(rowNum) {
	if (rowNum < 0 || rowNum >= canvas.height / 100) {
		return false;
	}

	for (var i = 0; i < canvas.width / 100; i++) {
		if (tetrisGrid[i][rowNum] == 0) {
			return false;
			}
		}
	return true;
}

function checkLineEmpty(rowNum) {
	if (rowNum < 0 || rowNum >= canvas.height / 100) {
		return false;
	}

	for (var i = 0; i < canvas.width / 100; i++) {
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
	for (var i = 0; i < canvas.height / 100; i++) {
		if (checkLineFull(i) == true) {
			numberRowsCleared = numberRowsCleared + 1;
		}
	}
	return scoringDictionary[numberRowsCleared];
}

function clearFullLines() {
	for (var i = 0; i < canvas.height / 100; i++) {
		if (checkLineFull(i) == true) {
			clearLine(i);
		}
	}
}

function clearLine(rowNum) {
	for (var i = 0; i < canvas.width / 100; i++) {
		tetrisGrid[i][rowNum] = 0;
	}
}

function applyGravityToBoard() {
	for (var j = 0; j < canvas.height / 100; j++) {
		for (var i = canvas.height / 100; i > 0; i--) {
			if (checkLineEmpty(i) == true) {
				dropLine(i);
			}
		}
	}
}

function dropLine(rowNum) {
	for (var i = 0; i < canvas.width / 100; i++) {
		tetrisGrid[i][rowNum] = tetrisGrid[i][rowNum - 1];
		tetrisGrid[i][rowNum - 1] = 0;
	}
}