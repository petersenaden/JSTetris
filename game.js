function GameInterface()
{
	this.currPiece; //Current tetromino
	this.gameScore = 0;
	this.nextPieceType = Math.floor((Math.random() * 7) + 1) - 1;
	this.currentLevel = 1;
	this.linesCleared = 0;
	this.gravityDelay = 2100;
	this.gravityDelayIncreaseInterval = 100;
	this.autoGravityInterval;
	this.controls = new PlayerInput();
	var selfCopy = this;

	this.startGame = function() {
		createTetrisGrid();
		updateAllMetrics(selfCopy.gameScore, selfCopy.linesCleared, selfCopy.currentLevel, selfCopy.nextPieceType);
		//Needed here in order to display the scoreboard from the get-go
	}

	this.engageAllKeyboardControls = function() {
		selfCopy.engageDropKeyboardControls();
		selfCopy.engageShifterKeyboardControls();
		selfCopy.engageRotationKeyboardControls();
		selfCopy.engageHardDropKeyboardControls();
	}

	this.suppressAllKeyboardControls = function() {
		selfCopy.suppressDropKeyboardControls();
		selfCopy.suppressShifterKeyboardControls();
		selfCopy.suppressRotationKeyboardControls();
		selfCopy.suppressHardDropKeyboardControls();
	}

	this.engageHardDropKeyboardControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOnHardDropButton();
	}

	this.suppressHardDropKeyboardControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOffHardDropButton();
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
		pieceType = selfCopy.nextPieceType;//
		selfCopy.nextPieceType = Math.floor((Math.random() * 7) + 1) - 1;
		console.log("Dropping piece: " + pieceType);
		this.currPiece = new ActivePiece(pieceType);
		if (this.currPiece.drawPiece() == false) {
			this.redrawGrid(); //MAYBE A BAD LINE
			return this.beginGameOverState();
		}
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

	this.executeHardDropPiece = function() {
		//could trigger an infinite loop
		while (!this.pullPieceDownOne());
		this.redrawGrid();
	}

	this.pullPieceDownOne = function() {
		console.log("Pulling piece down one");
		if (selfCopy.currPiece.dropPiece() == false) {
			console.log("Piece appears to have hit bottom");
			selfCopy.triggeredPieceOnFloor();
			return true;
		} else {
			console.log("Just redrawing grid because no bottom hit")
			selfCopy.redrawGrid();
		}
		return false;
	}

	this.triggeredPieceOnFloor = function() {
		selfCopy.suppressAllKeyboardControls();
		calculatedValues = scoreAllLines();
		selfCopy.gameScore  = selfCopy.gameScore + calculatedValues[0];
		selfCopy.checkAndIncreaseLevel(calculatedValues[1]);
		clearFullLines();
		applyGravityToBoard();
		selfCopy.redrawGrid();
		if (selfCopy.createRandomPiece() == false) {
			return;
		}
		selfCopy.engageAllKeyboardControls();
		updateAllMetrics(selfCopy.gameScore, selfCopy.linesCleared, selfCopy.currentLevel, selfCopy.nextPieceType);
	}

	this.checkAndIncreaseLevel = function(numSingleTimesLinesCleared) {
		var lineIncreaseBoundary = 10;
		if ((selfCopy.linesCleared % lineIncreaseBoundary) + numSingleTimesLinesCleared >= lineIncreaseBoundary) {
			selfCopy.currentLevel = selfCopy.currentLevel + 1;
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

	this.setGameGravityTimer = function(delayTimeGravity = 2000) {
		selfCopy.autoGravityInterval = setInterval(selfCopy.pullPieceDownOne, delayTimeGravity);
	}

	this.clearGameGravityTimer = function() {
		clearInterval(selfCopy.autoGravityInterval);
	}

	this.beginGameOverState = function() {
		this.clearGameGravityTimer();
		selfCopy.suppressAllKeyboardControls();
		return false;
	}

}