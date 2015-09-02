//GLOBALS
var tetrisGrid;
var boardName = "tetrisBoard"
var canvas = document.getElementById(boardName);
var context = canvas.getContext("2d");
//GLOBALS

function sqr() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];

	this.drawSquareTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 100)) / 100;
		tetrisGrid[width][0] = 1;
		tetrisGrid[width+1][0] = 1;
		tetrisGrid[width][1] = 1;
		tetrisGrid[width+1][1] = 1;
		this.one = [width,0];
		this.two = [width+1,0];
		this.three = [width,1];
		this.four = [width+1,1];
	}

	this.dropSquareOne = function() {
		//Set the block's current blocks to empty
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		//Drop the block down a piece for each block
		tetrisGrid[this.one[0]][this.one[1]+1] = 1;
		tetrisGrid[this.two[0]][this.two[1]+1] = 1;
		tetrisGrid[this.three[0]][this.three[1]+1] = 1;
		tetrisGrid[this.four[0]][this.four[1]+1] = 1;

		//Back up the block's configuration
		this.one = [this.one[0],this.one[1]+1];
		this.two = [this.two[0],this.two[1]+1];
		this.three = [this.three[0],this.three[1]+1];
		this.four = [this.four[0],this.four[1]+1];


	}
}

function leftl() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];
	this.drawLeftLTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 100)) / 100;
		tetrisGrid[width][0] = 1;
		tetrisGrid[width+1][0] = 1;
		tetrisGrid[width+2][0] = 1;
		tetrisGrid[width+2][1] = 1;
		this.one = [width,0];
		this.two = [width+1,0];
		this.three = [width+2,1];
		this.four = [width+2,1];
	}

	this.dropLeftLOne = function() {
		//Set the block's current blocks to empty
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		//Drop the block down a piece for each block
		tetrisGrid[this.one[0]][this.one[1]+1] = 1;
		tetrisGrid[this.two[0]][this.two[1]+1] = 1;
		tetrisGrid[this.three[0]][this.three[1]+1] = 1;
		tetrisGrid[this.four[0]][this.four[1]+1] = 1;

		//Back up the block's configuration
		this.one = [this.one[0],this.one[1]+1];
		this.two = [this.two[0],this.two[1]+1];
		this.three = [this.three[0],this.three[1]+1];
		this.four = [this.four[0],this.four[1]+1];


	}

}

function rightl() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];

	this.drawRightLTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 100)) / 100;
		tetrisGrid[width][0] = 1;
		tetrisGrid[width+1][0] = 1;
		tetrisGrid[width+2][0] = 1;
		tetrisGrid[width][1] = 1;
		this.one = [width,0];
		this.two = [width+1,0];
		this.three = [width+2,0];
		this.four = [width,1];
	}

	this.dropRightLOne = function() {
		//Set the block's current blocks to empty
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		//Drop the block down a piece for each block
		tetrisGrid[this.one[0]][this.one[1]+1] = 1;
		tetrisGrid[this.two[0]][this.two[1]+1] = 1;
		tetrisGrid[this.three[0]][this.three[1]+1] = 1;
		tetrisGrid[this.four[0]][this.four[1]+1] = 1;

		//Back up the block's configuration
		this.one = [this.one[0],this.one[1]+1];
		this.two = [this.two[0],this.two[1]+1];
		this.three = [this.three[0],this.three[1]+1];
		this.four = [this.four[0],this.four[1]+1];


	}
}

function ActivePiece(type) {
    this.type = type;
    if (this.type == 0) {
    	this.activePiece = new sqr();
    }
    else if (this.type == 1) {
    	this.activePiece = new leftl();
    }
    else if (this.type == 2) {
    	this.activePiece = new rightl();
    }
}

function createTetrisGrid() {
	//0 will correspond to empty, else will be full
	var width = canvas.width / 100;
	var height = canvas.height / 100;
	tetrisGrid = createMatrix(width, height, 0);
}

function createMatrix( rows, cols, defaultValue)
{
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

function drawBlock(xcoord, ycoord)
{
	var blockWidth = 100;
	var blockHeight = 100;
	context.rect(xcoord, ycoord, blockWidth, blockHeight);
	context.stroke(); //Actually draws what has been defined
}

createTetrisGrid();
var activePiece1 = new ActivePiece(0);
activePiece1.activePiece.drawSquareTop();
plotMatrix();
clearGrid();
activePiece1.activePiece.dropSquareOne();
activePiece1.activePiece.dropSquareOne();
activePiece1.activePiece.dropSquareOne();
activePiece1.activePiece.dropSquareOne();
activePiece1.activePiece.dropSquareOne();
plotMatrix();