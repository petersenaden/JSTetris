//GLOBALS
var tetrisGrid;
var boardName = "tetrisBoard"
//GLOBALS

function sqr() {
	this.topl = [0,0];
	this.topr = [0,0];
	this.btml = [0,0];
	this.btmr = [0,0];
	this.drawSquareTop = function() {
		var canvas = document.getElementById(boardName);
		var width = canvas.width / 2 - ((canvas.width / 2) % 100);
		drawBlock(width, 0);
		drawBlock(width + 100, 0);
		drawBlock(width, 100);
		drawBlock(width + 100, 100);
	}
}

function leftl() {
	this.topbl = [0,0];
	this.mid = [0,0];
	this.bot = [0,0];
	this.tail = [0,0];
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
	this.topbl = [0,0];
	this.mid = [0,0];
	this.bot = [0,0];
	this.tail = [0,0];
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
    	console.log("hey");
    	this.activePiece = sqr();
    }
    else if (this.type == 1) {
    	this.activePiece = leftl();
    }
    else if (this.type == 2) {
    	this.activePiece = rightl();
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

function drawBlock(xcoord, ycoord)
{
	var blockWidth = 100;
	var blockHeight = 100;
	var c=document.getElementById(boardName);
	var ctx=c.getContext("2d");
	ctx.rect(xcoord, ycoord, blockWidth, blockHeight);
	ctx.stroke(); //Actually draws what has been defined
}

//createTetrisGrid();
activePiece1 = ActivePiece(0);
sqr.drawSquareTop();