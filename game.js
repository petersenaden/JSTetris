function GameInterface()
{
	this.currPiece; //Current tetromino
	this.controls = new PlayerInput();
	var selfCopy = this;

	this.startGame = function() {
		createTetrisGrid();
	}

	this.engageAllKeyboardControls = function() {
		selfCopy.engageDropKeyboardControls();
		selfCopy.engageShifterKeyboardControls();
		selfCopy.engageRotationKeyboardControls();
	}

	this.suppressAllKeyboardControls = function() {
		//selfCopy.suppressDropKeyboardControls();
		//selfCopy.suppressShifterKeyboardControls();
		//selfCopy.supressRotationKeyboardControls();
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
		this.currPiece = new ActivePiece(1);
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
		console.log("pulling piece down one");
		if (selfCopy.currPiece.dropPiece() == false) {
			console.log("Piece appears to have hit bottom");
			selfCopy.triggeredPieceOnFloor();
		} else {
			console.log("just redrawing grid")
			selfCopy.redrawGrid();
		}
	}

	this.triggeredPieceOnFloor = function() {
		selfCopy.suppressAllKeyboardControls();
		console.log(scoreAllLines()); //FIXME...later
		clearFullLines();
		applyGravityToBoard();
		selfCopy.redrawGrid();
		selfCopy.createRandomPiece();
		selfCopy.engageAllKeyboardControls();
	}

	this.executeShiftPiece = function(dir) {
		this.currPiece.shiftPiece(dir);
		this.redrawGrid();
	}

	this.setGameGravityTimerToOn = function(time) {
		//time is in milliseconds
		setInterval(this.pullPieceDownOne, 2000);//3000 milliseconds
	}

}