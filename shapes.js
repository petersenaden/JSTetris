//GLOBALS
var tetrisGrid;
//GLOBALS

function ActivePiece(type) {
    this.type = type;
}

function createTetrisGrid() {
//0 will correspond to empty, else will be full
var canvas = document.getElementById("tetrisBoard");
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


function drawBlock(xcoord, ycoord, width, height)
{
	var c=document.getElementById("tetrisBoard");
	var ctx=c.getContext("2d");
	ctx.rect(xcoord, ycoord, width, height);
	ctx.stroke(); //Actually draws what has been defined
}

function drawSquare()
{
	drawBlock(200, 0, 100, 100);
	drawBlock(300, 0, 100, 100);
	drawBlock(200, 100, 100, 100);
	drawBlock(300, 100, 100, 100);
}

function drawLeftL()
{
	drawBlock(100, 0, 100, 100);
	drawBlock(200, 0, 100, 100);
	drawBlock(300, 0, 100, 100);
	drawBlock(300, 100, 100, 100);
}

function drawRightL()
{
	drawBlock(100, 0, 100, 100);
	drawBlock(200, 0, 100, 100);
	drawBlock(300, 0, 100, 100);
	drawBlock(100, 100, 100, 100);
}

drawRightL()