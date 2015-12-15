//GLOBALS
var tetrisGrid;
var colorGrid;
var boardName = "tetrisBoard"
var canvas = document.getElementById(boardName);
var context = canvas.getContext("2d");
var squareColor = "#FF69B4";
var leftLColor = "#FFA500";
var rightLColor = "#ADFF2F";
canvas.style.background =  "#FFA500";
//GLOBALS

function detectCollision(one, two, three, four) {
	//1 is collision detected, 0 is no collision

	if (one[0] < 0 || one[0] >= canvas.width / 30) {
		return 1;
	}
	if (one[1] < 0 || one[1] >= canvas.height / 30) {
		return 1;
	}
	if (two[0] < 0 || two[0] >= canvas.width / 30) {
		return 1;
	}
	if (two[1] < 0 || two[1] >= canvas.height / 30) {
		return 1;
	}
	if (three[0] < 0 || three[0] >= canvas.width / 30) {
		return 1;
	}
	if (three[1] < 0 || three[1] >= canvas.height / 30) {
		return 1;
	}
	if (four[0] < 0 || four[0] >= canvas.width / 30) {
		return 1;
	}
	if (four[1] < 0 || four[1] >= canvas.height / 30) {
		return 1;
	}
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
	return 0;
}

function Square()
{
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];
	//Block is numbered as: 
	// ONE  TWO
	// THREE FOUR

	this.drawSquareTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 30)) / 30;
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
			this.reflectInColorGrid();
		}
	}

	this.reflectInColorGrid = function() {
		colorGrid[this.one[0]][this.one[1]] = squareColor;
		colorGrid[this.two[0]][this.two[1]] = squareColor;
		colorGrid[this.three[0]][this.three[1]] = squareColor;
		colorGrid[this.four[0]][this.four[1]] = squareColor;

	}

	this.shiftSquareByOffset = function(oneXOffset, oneYOffset, twoXOffset, twoYOffset, threeXOffset, threeYOffset, fourXOffset, fourYOffset) {
		//detect collision
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		if (detectCollision([this.one[0] + oneXOffset, this.one[1] + oneYOffset],
							[this.two[0] + twoXOffset, this.two[1] + twoYOffset],
							[this.three[0] + threeXOffset, this.three[1] + threeYOffset],
							[this.four[0] + fourXOffset, this.four[1] + fourYOffset]) == 0) {

		//Set the block's current blocks to empty
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		//Shift each block by the prescribed offset
		tetrisGrid[this.one[0] + oneXOffset][this.one[1] + oneYOffset] = 1;
		tetrisGrid[this.two[0] + twoXOffset][this.two[1] + twoYOffset] = 1;
		tetrisGrid[this.three[0] + threeXOffset][this.three[1] + threeYOffset] = 1;
		tetrisGrid[this.four[0] + fourXOffset][this.four[1] + fourYOffset] = 1;

		//Back up the block's configuration
		this.one = [this.one[0] + oneXOffset,this.one[1] + oneYOffset];
		this.two = [this.two[0] + twoXOffset,this.two[1] + twoYOffset];
		this.three = [this.three[0] + threeXOffset,this.three[1] + threeYOffset];
		this.four = [this.four[0] + fourXOffset,this.four[1] + fourYOffset];
		this.reflectInColorGrid();
		return true;
		} else {
		//otherwise, set things back to the way they were
		//if a potential collision is detected
		tetrisGrid[this.one[0]][this.one[1]] = 1;
		tetrisGrid[this.two[0]][this.two[1]] = 1;
		tetrisGrid[this.three[0]][this.three[1]] = 1;
		tetrisGrid[this.four[0]][this.four[1]] = 1;
		return false;
		}
	}


	this.dropSquareOne = function() {
		//shift all the y values down by one
		if (this.shiftSquareByOffset(0, 1, 0, 1, 0, 1, 0, 1) == true) {
			return true;
		} else {
			return false;
		}
	}

	this.shiftSquareHorizontally = function(dir) {
		//shift all the x values left by one
		//0 = left, 1 = right
		if (dir == 0) {
			if (this.shiftSquareByOffset(-1, 0, -1, 0, -1, 0, -1, 0) == true) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.shiftSquareByOffset(1, 0, 1, 0, 1, 0, 1, 0) == true) {
				return true;
			} else {
				return false;
			}
		}
	}
}

function LeftL() {
	this.one = [0,0]; //top of piece
	this.two = [0,0]; //middle piece - rotated around
	this.three = [0,0]; //bottom piece
	this.four = [0,0]; //tail
	//0 - upright, 1 - 90 right
	//2 - upside down, 3 - 90 left

	this.drawLeftLTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 30)) / 30;

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
			this.reflectInColorGrid();
		}
	}

	this.reflectInColorGrid = function() {
		colorGrid[this.one[0]][this.one[1]] = leftLColor;
		colorGrid[this.two[0]][this.two[1]] = leftLColor;
		colorGrid[this.three[0]][this.three[1]] = leftLColor;
		colorGrid[this.four[0]][this.four[1]] = leftLColor;

	}

	this.shiftLeftLByOffset = function(oneXOffset, oneYOffset, twoXOffset, twoYOffset, threeXOffset, threeYOffset, fourXOffset, fourYOffset) {
		//detect collision
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		if (detectCollision([this.one[0] + oneXOffset, this.one[1] + oneYOffset],
							[this.two[0] + twoXOffset, this.two[1] + twoYOffset],
							[this.three[0] + threeXOffset, this.three[1] + threeYOffset],
							[this.four[0] + fourXOffset, this.four[1] + fourYOffset]) == 0) {

		//Set the block's current blocks to empty
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		//Shift each block by the prescribed offset
		tetrisGrid[this.one[0] + oneXOffset][this.one[1] + oneYOffset] = 1;
		tetrisGrid[this.two[0] + twoXOffset][this.two[1] + twoYOffset] = 1;
		tetrisGrid[this.three[0] + threeXOffset][this.three[1] + threeYOffset] = 1;
		tetrisGrid[this.four[0] + fourXOffset][this.four[1] + fourYOffset] = 1;

		//Back up the block's configuration
		this.one = [this.one[0] + oneXOffset,this.one[1] + oneYOffset];
		this.two = [this.two[0] + twoXOffset,this.two[1] + twoYOffset];
		this.three = [this.three[0] + threeXOffset,this.three[1] + threeYOffset];
		this.four = [this.four[0] + fourXOffset,this.four[1] + fourYOffset];
		this.reflectInColorGrid();
		return true;
		} else {
		//otherwise, set things back to the way they were
		//if a potential collision is detected
		tetrisGrid[this.one[0]][this.one[1]] = 1;
		tetrisGrid[this.two[0]][this.two[1]] = 1;
		tetrisGrid[this.three[0]][this.three[1]] = 1;
		tetrisGrid[this.four[0]][this.four[1]] = 1;
		return false;
		}
	}

	this.dropLeftLOne = function() {
		//shift all the y values down by one
		if (this.shiftLeftLByOffset(0, 1, 0, 1, 0, 1, 0, 1) == true) {
			return true;
		} else {
			return false;
		}
	}

	this.shiftLeftLHorizontally = function(dir) {
		//shift all the x values left by one
		//0 = left, 1 = right
		if (dir == 0) {
			if (this.shiftLeftLByOffset(-1, 0, -1, 0, -1, 0, -1, 0) == true) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.shiftLeftLByOffset(1, 0, 1, 0, 1, 0, 1, 0) == true) {
				return true;
			} else {
				return false;
			}
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
		this.reflectInColorGrid();
	}
}

function RightL() {
	this.one = [0,0];
	this.two = [0,0];
	this.three = [0,0];
	this.four = [0,0];
	this.orientation = 1;
	//0 - upright, 1 - 90 right
	//2 - upside down, 3 - 90 left

	this.drawRightLTop = function() {
		var width = (canvas.width / 2 - ((canvas.width / 2) % 30)) / 30;
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
			this.reflectInColorGrid();
		}
	}

	this.reflectInColorGrid = function() {
		colorGrid[this.one[0]][this.one[1]] = rightLColor;
		colorGrid[this.two[0]][this.two[1]] = rightLColor;
		colorGrid[this.three[0]][this.three[1]] = rightLColor;
		colorGrid[this.four[0]][this.four[1]] = rightLColor;

	}

this.shiftRightLByOffset = function(oneXOffset, oneYOffset, twoXOffset, twoYOffset, threeXOffset, threeYOffset, fourXOffset, fourYOffset) {
		//detect collision
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		if (detectCollision([this.one[0] + oneXOffset, this.one[1] + oneYOffset],
							[this.two[0] + twoXOffset, this.two[1] + twoYOffset],
							[this.three[0] + threeXOffset, this.three[1] + threeYOffset],
							[this.four[0] + fourXOffset, this.four[1] + fourYOffset]) == 0) {

		//Set the block's current blocks to empty
		tetrisGrid[this.one[0]][this.one[1]] = 0;
		tetrisGrid[this.two[0]][this.two[1]] = 0;
		tetrisGrid[this.three[0]][this.three[1]] = 0;
		tetrisGrid[this.four[0]][this.four[1]] = 0;

		//Shift each block by the prescribed offset
		tetrisGrid[this.one[0] + oneXOffset][this.one[1] + oneYOffset] = 1;
		tetrisGrid[this.two[0] + twoXOffset][this.two[1] + twoYOffset] = 1;
		tetrisGrid[this.three[0] + threeXOffset][this.three[1] + threeYOffset] = 1;
		tetrisGrid[this.four[0] + fourXOffset][this.four[1] + fourYOffset] = 1;

		//Back up the block's configuration
		this.one = [this.one[0] + oneXOffset,this.one[1] + oneYOffset];
		this.two = [this.two[0] + twoXOffset,this.two[1] + twoYOffset];
		this.three = [this.three[0] + threeXOffset,this.three[1] + threeYOffset];
		this.four = [this.four[0] + fourXOffset,this.four[1] + fourYOffset];
		this.reflectInColorGrid();
		return true;
		} else {
		//otherwise, set things back to the way they were
		//if a potential collision is detected
		tetrisGrid[this.one[0]][this.one[1]] = 1;
		tetrisGrid[this.two[0]][this.two[1]] = 1;
		tetrisGrid[this.three[0]][this.three[1]] = 1;
		tetrisGrid[this.four[0]][this.four[1]] = 1;
		return false;
		}
	}

	this.dropRightLOne = function() {
		//shift all the y values down by one
		if (this.shiftRightLByOffset(0, 1, 0, 1, 0, 1, 0, 1) == true) {
			return true;
		} else {
			return false;
		}
	}

	this.shiftRightLHorizontally = function(dir) {
		//shift all the x values left by one
		//0 = left, 1 = right
		if (dir == 0) {
			if (this.shiftRightLByOffset(-1, 0, -1, 0, -1, 0, -1, 0) == true) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.shiftRightLByOffset(1, 0, 1, 0, 1, 0, 1, 0) == true) {
				return true;
			} else {
				return false;
			}
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
		this.reflectInColorGrid();
	}
}

function ActivePiece(passedType) {
    this.type = passedType;
    this.activePiece = 0;

    if (this.type == 0) {
    	this.activePiece = new Square();
    }
    else if (this.type == 1) {
    	this.activePiece = new LeftL();
    }
    else if (this.type == 2) {
    	this.activePiece = new RightL();
    }

    this.drawPiece = function() {
		if (this.type == 0) {
	    	this.activePiece.drawSquareTop();
	    }
	    else if (this.type == 1) {
	    	this.activePiece.drawLeftLTop();
	    }
	    else if (this.type == 2) {
	    	this.activePiece.drawRightLTop();
	    }
    }

    this.rotatePiece = function(dir) {
    	//0 will be left, 1 will be right
    	if (dir == 0) {
    		if (this.type == 0) {
    			//do nothing - might change later
    		}
    		else if (this.type == 1) {
    			this.activePiece.rotateLeftLLeftOne();
    		}
    		else if (this.type == 2) {
    			this.activePiece.rotateRightLLeftOne();
    		}
    	}
    	else if (dir == 1) {
    		if (this.type == 0) {
    			//do nothing - might change later
    		}
    		else if (this.type == 1) {
    			//do nothing - might change later
    		}
    		else if (this.type == 2) {
    			//do nothing - might change later
    		}
    		}	
    	}

    this.dropPiece = function() {
    	if (this.type == 0) {
	    	return this.activePiece.dropSquareOne();
	    }
	    else if (this.type == 1) {
	    	return this.activePiece.dropLeftLOne();
	    }
	    else if (this.type == 2) {
	    	return this.activePiece.dropRightLOne();
	    }
    }

    this.shiftPiece = function(dir) {
    	if (this.type == 0) {
	    	this.activePiece.shiftSquareHorizontally(dir);
	    }
	    else if (this.type == 1) {
	    	this.activePiece.shiftLeftLHorizontally(dir);
	    }
	    else if (this.type == 2) {
	    	this.activePiece.shiftRightLHorizontally(dir);
	    }
    }
}