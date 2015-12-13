function GameInterface()
{
	this.currPiece; //Current tetromino
	this.controls = new PlayerInput();
	var selfCopy = this;

	this.startGame = function() {
		createTetrisGrid();
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

	this.executeShiftPiece = function(dir) {
		this.currPiece.shiftPiece(dir);
		this.redrawGrid();
	}
}

/*
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
*/