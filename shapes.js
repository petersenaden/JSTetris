//GLOBALS
var tetrisGrid;
var boardName = "tetrisBoard"
var canvas = document.getElementById(boardName);
var context = canvas.getContext("2d");
//GLOBALS

function detectCollision(one, two, three, four) {
	//1 is true, 0 is false
	if (tetrisGrid[one[0]][one[1]] != 0) {
		return 1;
	}
	if (tetrisGrid[two[0]][two[1]] != 0) {
		return 1;
	}
	if (tetrisGrid[three[0]][three[1]] != 0) {
		return 1;
	}
	if (tetrisGrid[four[0]][four[1]] != 0) {
		return 1;
	}
	if (one[0] < 0 || one[0] > canvas.width / 100) {
		return 1;
	}
	if (one[1] < 0 || one[1] > canvas.height / 100) {
		return 1;
	}
	if (two[0] < 0 || two[0] > canvas.width / 100) {
		return 1;
	}
	if (two[1] < 0 || two[1] > canvas.height / 100) {
		return 1;
	}
	if (three[0] < 0 || three[0] > canvas.width / 100) {
		return 1;
	}
	if (three[1] < 0 || three[1] > canvas.height / 100) {
		return 1;
	}
	if (four[0] < 0 || four[0] > canvas.width / 100) {
		return 1;
	}
	if (four[1] < 0 || four[1] > canvas.height / 100) {
		return 1;
	}
	return 0;
}

function sqr() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];

	this.drawSquareTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 100)) / 100;
		if (detectCollision([width, 0],
							[width+1, 0],
							[width, 1],
							[width+1, 1]) == 0) {
			tetrisGrid[width][0] = 1;
			tetrisGrid[width+1][0] = 1;
			tetrisGrid[width][1] = 1;
			tetrisGrid[width+1][1] = 1;
			this.one = [width,0];
			this.two = [width+1,0];
			this.three = [width,1];
			this.four = [width+1,1];
		}
	}
	//fixed for collision
	this.dropSquareOne = function() {
		//detect collision
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		if (detectCollision([this.one[0], this.one[1]+1],
							[[this.two[0], this.two[1]+1]],
							[[this.three[0], this.three[1]+1]],
							[[this.four[0], this.four[1]+1]]) == 0) {

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
		} else {
		tetrisGrid[this.one[0]][this.one[1]] = 1;
		tetrisGrid[this.two[0]][this.two[1]] = 1;
		tetrisGrid[this.three[0]][this.three[1]] = 1;
		tetrisGrid[this.four[0]][this.four[1]] = 1;
		}
	}
}

function leftl() {
	this.one = [0,0]; //
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];
	//0 - upright, 1 - 90 right
	//2 - upside down, 3 - 90 left

	this.drawLeftLTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 100)) / 100;

		if (detectCollision([width, 0],
							[width+1, 0],
							[width+2, 0],
							[width+2, 1]) == 0) {
			tetrisGrid[width][0] = 1;
			tetrisGrid[width+1][0] = 1;
			tetrisGrid[width+2][0] = 1;
			tetrisGrid[width+2][1] = 1;
			this.one = [width,0]; //top of piece
			this.two = [width+1,0]; //middle piece - rotated around
			this.three = [width+2,0]; //bottom piece
			this.four = [width+2,1]; //tail
			this.orientation = 3;
		}
	}

	this.dropLeftLOne = function() {
		//detect collision

		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		if (detectCollision([this.one[0], this.one[1]+1],
							[this.two[0], this.two[1]+1],
							[this.three[0], this.three[1]+1],
							[this.four[0], this.four[1]+1]) == 0) {

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
		} else {
		tetrisGrid[this.one[0]][this.one[1]] = 1;
		tetrisGrid[this.two[0]][this.two[1]] = 1;
		tetrisGrid[this.three[0]][this.three[1]] = 1;
		tetrisGrid[this.four[0]][this.four[1]] = 1;
		}
	}

	this.rotateLeftLLeftOne = function() {
		if (this.orientation == 0) {
			tetrisGrid[this.one[0]][this.one[1]] = 0;
			tetrisGrid[this.two[0]][this.two[1]] = 0;
			tetrisGrid[this.three[0]][this.three[1]] = 0;
			tetrisGrid[this.four[0]][this.four[1]] = 0;

			if (detectCollision([this.one[0]-1, this.one[1]+1],
							[this.two[0], this.two[1]],
							[this.three[0]+1, this.three[1]-1],
							[this.four[0]+2, this.four[1]]) == 0) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;

				//Drop the block down a piece for each block
				tetrisGrid[this.one[0]-1][this.one[1]+1] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]+1][this.three[1]-1] = 1;
				tetrisGrid[this.four[0]+2][this.four[1]] = 1;

				//Back up the block's configuration
				this.one = [this.one[0]-1,this.one[1]+1];
				this.two = [this.two[0],this.two[1]];
				this.three = [this.three[0]+1,this.three[1]-1];
				this.four = [this.four[0]+2,this.four[1]];

				this.orientation = 3;
			} else {
				tetrisGrid[this.one[0]][this.one[1]] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]][this.three[1]] = 1;
				tetrisGrid[this.four[0]][this.four[1]] = 1;
			}


		} else if (this.orientation == 1) {

				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;

			if (detectCollision([this.one[0]-1, this.one[1]-1],
							[this.two[0], this.two[1]],
							[this.three[0]+1, this.three[1]+1],
							[this.four[0], this.four[1]+2]) == 0) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;

				//Drop the block down a piece for each block
				tetrisGrid[this.one[0]-1][this.one[1]-1] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]+1][this.three[1]+1] = 1;
				tetrisGrid[this.four[0]][this.four[1]+2] = 1;

				//Back up the block's configuration
				this.one = [this.one[0]-1,this.one[1]-1];
				this.two = [this.two[0],this.two[1]];
				this.three = [this.three[0]+1,this.three[1]+1];
				this.four = [this.four[0],this.four[1]+2];

				this.orientation = 0;
			} else {
				tetrisGrid[this.one[0]][this.one[1]] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]][this.three[1]] = 1;
				tetrisGrid[this.four[0]][this.four[1]] = 1;
			}

		}
		else if (this.orientation == 2) {
			tetrisGrid[this.one[0]][this.one[1]] = 0;
			tetrisGrid[this.two[0]][this.two[1]] = 0;
			tetrisGrid[this.three[0]][this.three[1]] = 0;
			tetrisGrid[this.four[0]][this.four[1]] = 0;

			if (detectCollision([this.one[0]+1, this.one[1]-1],
							[this.two[0], this.two[1]],
							[this.three[0]-1, this.three[1]+1],
							[this.four[0]-2, this.four[1]]) == 0) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;

				//Drop the block down a piece for each block
				tetrisGrid[this.one[0]+1][this.one[1]-1] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]-1][this.three[1]+1] = 1;
				tetrisGrid[this.four[0]-2][this.four[1]] = 1;

				//Back up the block's configuration
				this.one = [this.one[0]+1,this.one[1]-1];
				this.two = [this.two[0],this.two[1]];
				this.three = [this.three[0]-1,this.three[1]+1];
				this.four = [this.four[0]-2,this.four[1]];

				this.orientation = 1;
				} else {
				tetrisGrid[this.one[0]][this.one[1]] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]][this.three[1]] = 1;
				tetrisGrid[this.four[0]][this.four[1]] = 1;
				}

		}
		else if (this.orientation == 3) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;
			if (detectCollision([this.one[0]+1, this.one[1]+1],
							[this.two[0], this.two[1]],
							[this.three[0]-1, this.three[1]-1],
							[this.four[0], this.four[1]-2]) == 0) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;

				//Drop the block down a piece for each block
				tetrisGrid[this.one[0]+1][this.one[1]+1] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]-1][this.three[1]-1] = 1;
				tetrisGrid[this.four[0]][this.four[1]-2] = 1;

				//Back up the block's configuration
				this.one = [this.one[0]+1,this.one[1]+1];
				this.two = [this.two[0],this.two[1]];
				this.three = [this.three[0]-1,this.three[1]-1];
				this.four = [this.four[0],this.four[1]-2];

				this.orientation = 2;
			} else {
			tetrisGrid[this.one[0]][this.one[1]] = 1;
			tetrisGrid[this.two[0]][this.two[1]] = 1;
			tetrisGrid[this.three[0]][this.three[1]] = 1;
			tetrisGrid[this.four[0]][this.four[1]] = 1;

			}
		}
	}

}

function rightl() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];
	this.orientation = 1;
	//0 - upright, 1 - 90 right
	//2 - upside down, 3 - 90 left

	this.drawRightLTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 100)) / 100;
		if (detectCollision([width+2, 0],
							[width+1, 0],
							[width, 0],
							[width, 1]) == 0) {
			tetrisGrid[width][0] = 1;
			tetrisGrid[width+1][0] = 1;
			tetrisGrid[width+2][0] = 1;
			tetrisGrid[width][1] = 1;
			this.one = [width+2,0];
			this.two = [width+1,0];
			this.three = [width,0];
			this.four = [width,1];
			this.orientation = 1;
		}
	}

	this.dropRightLOne = function() {
		//detect collision
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;
		if (detectCollision([this.one[0], this.one[1]+1],
							[this.two[0], this.two[1]+1],
							[this.three[0], this.three[1]+1],
							[this.four[0], this.four[1]+1]) == 0) {

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
		} else {
		tetrisGrid[this.one[0]][this.one[1]] = 1;
		tetrisGrid[this.two[0]][this.two[1]] = 1;
		tetrisGrid[this.three[0]][this.three[1]] = 1;
		tetrisGrid[this.four[0]][this.four[1]] = 1;	
		}
	}

	this.rotateRightLLeftOne = function() {

		if (this.orientation == 0) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;
			if (detectCollision([this.one[0]-1, this.one[1]+1],
							[this.two[0], this.two[1]],
							[this.three[0]+1, this.three[1]-1],
							[this.four[0], this.four[1]-2]) == 0) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;

				//Drop the block down a piece for each block
				tetrisGrid[this.one[0]-1][this.one[1]+1] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]+1][this.three[1]-1] = 1;
				tetrisGrid[this.four[0]][this.four[1]-2] = 1;

				//Back up the block's configuration
				this.one = [this.one[0]-1,this.one[1]+1];
				this.two = [this.two[0],this.two[1]];
				this.three = [this.three[0]+1,this.three[1]-1];
				this.four = [this.four[0],this.four[1]-2];

				this.orientation = 3;
			} else {
			tetrisGrid[this.one[0]][this.one[1]] = 1;
			tetrisGrid[this.two[0]][this.two[1]] = 1;
			tetrisGrid[this.three[0]][this.three[1]] = 1;
			tetrisGrid[this.four[0]][this.four[1]] = 1;
			}


		} else if (this.orientation == 1) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;
			if (detectCollision([this.one[0]-1, this.one[1]-1],
							[this.two[0], this.two[1]],
							[this.three[0]+1, this.three[1]+1],
							[this.four[0]+2, this.four[1]]) == 0) {
			tetrisGrid[this.one[0]][this.one[1]] = 0;
			tetrisGrid[this.two[0]][this.two[1]] = 0;
			tetrisGrid[this.three[0]][this.three[1]] = 0;
			tetrisGrid[this.four[0]][this.four[1]] = 0;

			//Drop the block down a piece for each block
			tetrisGrid[this.one[0]-1][this.one[1]-1] = 1;
			tetrisGrid[this.two[0]][this.two[1]] = 1;
			tetrisGrid[this.three[0]+1][this.three[1]+1] = 1;
			tetrisGrid[this.four[0]+2][this.four[1]] = 1;

			//Back up the block's configuration
			this.one = [this.one[0]-1,this.one[1]-1];
			this.two = [this.two[0],this.two[1]];
			this.three = [this.three[0]+1,this.three[1]+1];
			this.four = [this.four[0]+2,this.four[1]];

			this.orientation = 0;
			} else {
			tetrisGrid[this.one[0]][this.one[1]] = 1;
			tetrisGrid[this.two[0]][this.two[1]] = 1;
			tetrisGrid[this.three[0]][this.three[1]] = 1;
			tetrisGrid[this.four[0]][this.four[1]] = 1;
			}
		}
		else if (this.orientation == 2) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;
			if (detectCollision([this.one[0]+1, this.one[1]-1],
							[this.two[0], this.two[1]],
							[this.three[0]-1, this.three[1]+1],
							[this.four[0], this.four[1]+2]) == 0) {

				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;

				//Drop the block down a piece for each block
				tetrisGrid[this.one[0]+1][this.one[1]-1] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]-1][this.three[1]+1] = 1;
				tetrisGrid[this.four[0]][this.four[1]+2] = 1;

				//Back up the block's configuration
				this.one = [this.one[0]+1,this.one[1]-1];
				this.two = [this.two[0],this.two[1]];
				this.three = [this.three[0]-1,this.three[1]+1];
				this.four = [this.four[0],this.four[1]+2];

				this.orientation = 1;
			} else {
				tetrisGrid[this.one[0]][this.one[1]] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]][this.three[1]] = 1;
				tetrisGrid[this.four[0]][this.four[1]] = 1;
			}

		}
		else if (this.orientation == 3) {
				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;
			if (detectCollision([this.one[0]+1, this.one[1]+1],
							[this.two[0], this.two[1]],
							[this.three[0]-1, this.three[1]-1],
							[this.four[0]-2, this.four[1]]) == 0) {

				tetrisGrid[this.one[0]][this.one[1]] = 0;
				tetrisGrid[this.two[0]][this.two[1]] = 0;
				tetrisGrid[this.three[0]][this.three[1]] = 0;
				tetrisGrid[this.four[0]][this.four[1]] = 0;

				//Drop the block down a piece for each block
				tetrisGrid[this.one[0]+1][this.one[1]+1] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]-1][this.three[1]-1] = 1;
				tetrisGrid[this.four[0]-2][this.four[1]] = 1;

				//Back up the block's configuration
				this.one = [this.one[0]+1,this.one[1]+1];
				this.two = [this.two[0],this.two[1]];
				this.three = [this.three[0]-1,this.three[1]-1];
				this.four = [this.four[0]-2,this.four[1]];

				this.orientation = 2;
			} else {
				tetrisGrid[this.one[0]][this.one[1]] = 1;
				tetrisGrid[this.two[0]][this.two[1]] = 1;
				tetrisGrid[this.three[0]][this.three[1]] = 1;
				tetrisGrid[this.four[0]][this.four[1]] = 1;
			}
		}
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
var activePiece1 = new ActivePiece(2);
activePiece1.activePiece.drawRightLTop();
plotMatrix();
clearGrid();
activePiece1.activePiece.dropRightLOne();
plotMatrix();
clearGrid();
activePiece1.activePiece.rotateRightLLeftOne();
activePiece1.activePiece.rotateRightLLeftOne();
activePiece1.activePiece.rotateRightLLeftOne();
activePiece1.activePiece.dropRightLOne();
plotMatrix();
clearGrid();
activePiece1.activePiece.dropRightLOne();
plotMatrix();

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        clearGrid();
		activePiece1.activePiece.rotateRightLLeftOne();
		plotMatrix();
    }
    else if(event.keyCode == 39) {
        alert('Right was pressed');
    }
});