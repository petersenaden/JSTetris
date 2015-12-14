function GameInterface()
{
	this.currPiece; //Current tetromino
	this.gameScore = 0;
	this.currentLevel = 0;
	this.linesCleared = 0;
	this.gravityDelay = 2100;
	this.gravityDelayIncreaseInterval = 100;
	this.autoGravityInterval;
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
		selfCopy.suppressDropKeyboardControls();
		selfCopy.suppressShifterKeyboardControls();
		selfCopy.suppressRotationKeyboardControls();
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
		pieceType = Math.floor((Math.random() * 3) + 1) - 1;
		console.log("Dropping piece: " + pieceType);
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
		console.log("Pulling piece down one");
		if (selfCopy.currPiece.dropPiece() == false) {
			console.log("Piece appears to have hit bottom");
			selfCopy.triggeredPieceOnFloor();
		} else {
			console.log("Just redrawing grid because no bottom hit")
			selfCopy.redrawGrid();
		}
	}

	this.triggeredPieceOnFloor = function() {
		selfCopy.suppressAllKeyboardControls();
		calculatedValues = scoreAllLines();
		selfCopy.gameScore  = selfCopy.gameScore + calculatedValues[0];
		selfCopy.checkAndIncreaseLevel(calculatedValues[1]);
		clearFullLines();
		applyGravityToBoard();
		selfCopy.redrawGrid();
		selfCopy.createRandomPiece();
		selfCopy.engageAllKeyboardControls();
	}

	this.checkAndIncreaseLevel = function(numSingleTimesLinesCleared) {
		var lineIncreaseBoundary = 10;
		if ((selfCopy.linesCleared % lineIncreaseBoundary) + numSingleTimesLinesCleared >= lineIncreaseBoundary) {
			selfCopy.decreaseGravityTimer();
		}
		selfCopy.linesCleared = selfCopy.linesCleared + numSingleTimesLinesCleared;
	}

	this.executeShiftPiece = function(dir) {
		this.currPiece.shiftPiece(dir);
		this.redrawGrid();
	}

	this.decreaseGravityTimer = function() {
		selfCopy.clearGameGravityTimer();
		selfCopy.gravityDelay = selfCopy.gravityDelay - selfCopy.gravityDelayIncreaseInterval;
		selfCopy.setGameGravityTimer(selfCopy.gravityDelay - selfCopy.gravityDelayIncreaseInterval);
	}

	this.setGameGravityTimer = function(delayTimeGravity) {
		selfCopy.autoGravityInterval = setInterval(selfCopy.pullPieceDownOne, delayTimeGravity);
	}

	this.clearGameGravityTimer = function() {
		clearInterval(selfCopy.autoGravityInterval);
	}

}