function GameInterface()
{
	this.currPiece; //Current tetromino
	this.controls = new PlayerInput();
	var selfCopy = this;

	this.startGame = function() {
		createTetrisGrid();
	}

	this.engageAllKeyboardControls = function() {
		this.engageDropKeyboardControls();
		this.engageShifterKeyboardControls();
		this.engageRotationKeyboardControls();
	}

	this.suppressAllKeyboardControls = function() {
		this.suppressDropKeyboardControls();
		this.suppressShifterKeyboardControls();
		this.supressRotationKeyboardControls();
	}

	this.engageDropKeyboardControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOnDropButton();
	}

	this.suppressDropKeyboardControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOffDropButton();
	}

	this.engageShifterKeyboardControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOnShifterButtons();
	}

	this.suppressShifterKeyboardControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOffShifterButtons();
	}

	this.engageRotationKeyboardControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOnRotationButtons();
	}

	this.suppressRotationKeyboardControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOffRotationButtons();
	}

	this.redrawGrid = function() {
		//Can be made private when no longer needed for debugging
		clearGrid();
		plotMatrix();
	}

	this.createRandomPiece = function() {
		pieceType = Math.floor((Math.random() * 3) + 1);
		this.currPiece = new ActivePiece(pieceType);
		this.currPiece.drawPiece();
		this.redrawGrid();
	}
 

	this.createPiece = function(pieceType) {
		this.currPiece = new ActivePiece(pieceType);
		this.currPiece.drawPiece();
		this.redrawGrid();
	}
 
	this.executeRotatePiece = function(dir) {
		//0 left, 1 right
		this.currPiece.rotatePiece(dir);
		this.redrawGrid();
	}

	this.executeDropPiece = function() {
		this.currPiece.dropPiece();
		this.redrawGrid();
	}

	this.pullPieceDownOne = function() {
		if (this.currPiece.dropPiece() == false) {
			console.log(scoreAllLines());
			clearFullLines();
			applyGravityToBoard();
		}
		this.redrawGrid();
	}

	this.executeShiftPiece = function(dir) {
		this.currPiece.shiftPiece(dir);
		this.redrawGrid();
	}
}