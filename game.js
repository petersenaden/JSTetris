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
    this.sounds = new SoundActivation();
	var selfCopy = this;

	this.startGame = function() {
		createTetrisGrid();
		updateAllMetrics(selfCopy.gameScore, selfCopy.linesCleared, selfCopy.currentLevel, selfCopy.nextPieceType);
		selfCopy.createRandomPiece();
        selfCopy.engageAllKeyboardControls();
        selfCopy.setGameGravityTimer();
		//Needed here in order to display the scoreboard from the get-go
	}

	this.restartGame = function(desiredLevel = 1) {
		selfCopy.suppressRestartGameControls();
		selfCopy.gameScore = 0;
		selfCopy.linesCleared = 0;
		selfCopy.currentLevel = desiredLevel;
		selfCopy.nextPieceType = Math.floor((Math.random() * 7) + 1) - 1;
		updateAllMetrics(selfCopy.gameScore, selfCopy.linesCleared, selfCopy.currentLevel, selfCopy.nextPieceType);
		selfCopy.startGame();
	}

	this.pauseGame = function() {
		selfCopy.suppressAllKeyboardControls();
		selfCopy.clearGameGravityTimer();
		selfCopy.showPauseScreen();
		selfCopy.engageUnpauseGameControls();
	}

	this.unpauseGame = function() {
		selfCopy.suppressUnpauseGameControls();
		selfCopy.setGameGravityTimer();
		this.redrawGrid();
		selfCopy.engageAllKeyboardControls();
	}

	this.engageAllKeyboardControls = function() {
		selfCopy.engageDropKeyboardControls();
		selfCopy.engageShifterKeyboardControls();
		selfCopy.engageRotationKeyboardControls();
		selfCopy.engageHardDropKeyboardControls();
		selfCopy.engageMuteGameControls();
		selfCopy.engagePauseGameControls();
	}

	this.suppressAllKeyboardControls = function() {
		selfCopy.suppressDropKeyboardControls();
		selfCopy.suppressShifterKeyboardControls();
		selfCopy.suppressRotationKeyboardControls();
		selfCopy.suppressHardDropKeyboardControls();
		selfCopy.suppressMuteGameControls();
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

	this.engageRestartGameControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOnRestartGameButton();
	}

	this.suppressRestartGameControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOffRestartGameButton();
	}

	this.engagePauseGameControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOnPauseGameButton();
	}

	this.suppressPauseGameControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOffPauseGameButton();
	}

	this.engageUnpauseGameControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOnUnpauseGameButton();
	}

	this.suppressUnpauseGameControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOffUnpauseGameButton();
	}

	this.engageMuteGameControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOnMuteGameButton();
	}

	this.suppressMuteGameControls = function() {
		this.controls.setGamePiece(selfCopy);
		this.controls.turnOffMuteGameButton();
	}

	this.redrawGrid = function() {
		//Can be made private when no longer needed for debugging
		clearGrid();
		plotMatrix();
	}

	this.muteGame = function() {
		this.sounds.mute = !this.sounds.mute;
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
		this.sounds.playClickSound();
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
		//this.redrawGrid();
		//Don't redraw the grid or the game over
		//screen won't show
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

	this.determineIfClearedSoundPlays = function(rowsCleared) {
		if (rowsCleared == 4) {
			this.sounds.playRowTetrisSound();
		} else if (rowsCleared > 0) {
			this.sounds.playRowClearSound();
		} else {
			this.sounds.playDropSound();
		}
	}

	this.triggeredPieceOnFloor = function() {
		selfCopy.suppressAllKeyboardControls();
		calculatedValues = scoreAllLines();
		selfCopy.determineIfClearedSoundPlays(calculatedValues[1]);
		selfCopy.gameScore  = selfCopy.gameScore + calculatedValues[0];
		selfCopy.checkAndIncreaseLevel(calculatedValues[1]);
		clearFullLines();
		applyGravityToBoard();
		selfCopy.redrawGrid();
		if (selfCopy.createRandomPiece() == false) {
			selfCopy.showGameOverScreen();
			return;
		}
		selfCopy.engageAllKeyboardControls();
		updateAllMetrics(selfCopy.gameScore, selfCopy.linesCleared, selfCopy.currentLevel, selfCopy.nextPieceType);
	}

	this.checkAndIncreaseLevel = function(numSingleTimesLinesCleared) {
		var lineIncreaseBoundary = 2;
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
		this.sounds.playGameOverSound();
		return false;
	}

	this.showGameOverScreen = function() {
		var canvas = document.getElementById("tetrisBoard");
		var ctx = canvas.getContext("2d");
		//ctx.clearRect(0, 0, canvas.width, canvas.height); //useful line to clear menu after use
		ctx.fillStyle = "#F0FFFF";
		ctx.fillRect(29, 29, 242, 482); //one pixel better to look better around the block borders

		ctx.strokeStyle = "#0"; //border will be hardcoded black for now
		ctx.lineWidth=15;
		ctx.strokeRect(29, 29, 242, 482);
		ctx.lineWidth=1;
		//this line makes sure the blocks
		//won't end up with laughably thick
		//borders

		ctx.font = "30px Impact";
		ctx.fillStyle = "#000000";
		ctx.fillText("Press 'N'",50,240);
		ctx.fillText("to restart", 50, 280);
		//I can't believe canvas doesn't have newline support

		selfCopy.engageRestartGameControls();
	}

	this.showPauseScreen = function() {
		var canvas = document.getElementById("tetrisBoard");
		var ctx = canvas.getContext("2d");
		//ctx.clearRect(0, 0, canvas.width, canvas.height); //useful line to clear menu after use
		ctx.fillStyle = "#F0FFFF";
		ctx.fillRect(29, 29, 242, 482); //one pixel better to look better around the block borders

		ctx.strokeStyle = "#0"; //border will be hardcoded black for now
		ctx.lineWidth=15;
		ctx.strokeRect(29, 29, 242, 482);
		ctx.lineWidth=1;
		//this line makes sure the blocks
		//won't end up with laughably thick
		//borders

		ctx.font = "30px Impact";
		ctx.fillStyle = "#000000";
		ctx.fillText("Press 'P'",50,100);
		ctx.fillText("to unpause", 50, 130);

		ctx.fillText("'M' to mute",50,190);
		ctx.fillText("'Z/X/Up'", 50, 250);
		ctx.fillText("to rotate", 50, 280);
		ctx.fillText("'Down/Left/Right'", 50, 340);
		ctx.fillText("to shift", 50, 370);
		ctx.fillText("'Space'", 50, 430);
		ctx.fillText("to hard drop", 50, 460);
		//I can't believe canvas doesn't have newline support

		//selfCopy.engageRestartGameControls();
	}

}