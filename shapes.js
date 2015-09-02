//GLOBALS
var tetrisGrid;
var boardName = "tetrisBoard"
//GLOBALS

function sqr() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];
	this.drawSquareTop = function() {
		var canvas = document.getElementById(boardName);
		var width = canvas.width / 2 - ((canvas.width / 2) % 100);
		//drawBlock(width, 0);
		//drawBlock(width + 100, 0);
		//drawBlock(width, 100);
		//drawBlock(width + 100, 100);
		//this.one = [width/100,0];
		//this.two = [(width/100)+1,0];
		//this.three = [width/100,0];
		//this.four = [(width/100)+1,1];
	}
}

function leftl() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];
	this.drawLeftLTop = function() {
		var canvas = document.getElementById(boardName);
		var width = canvas.width / 2 - ((canvas.width / 2) % 100);
		drawBlock(width, 0);
		drawBlock(width + 100, 0);
		drawBlock(width + 200, 0);
		drawBlock(width + 200, 100);
	}
}

function rightl() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];
	this.drawRightLTop = function() {
		var canvas = document.getElementById(boardName);
		var width = canvas.width / 2 - ((canvas.width / 2) % 100);
		drawBlock(width, 0);
		drawBlock(width + 100, 0);
		drawBlock(width + 200, 0);
		drawBlock(width, 100);
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
	var canvas = document.getElementById(boardName);
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
}

function plotMatrix() {
	var canvas = document.getElementById(boardName);
	for (var i = 0; i < canvas.width / 100; i++) {
		for (var j = 0; i < canvas.width / 100; j++) {
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
	var c=document.getElementById(boardName);
	var ctx=c.getContext("2d");
	ctx.rect(xcoord, ycoord, blockWidth, blockHeight);
	ctx.stroke(); //Actually draws what has been defined
}

createTetrisGrid();
var activePiece1 = new ActivePiece(0);
activePiece1.activePiece.drawSquareTop();
plotMatrix();