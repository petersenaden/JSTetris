function GameInterface()
{
	this.currPiece = 0; //holder value simply for initialization

	this.startGame = function() {
		createTetrisGrid();
	}

	function redrawGrid() {
		clearGrid();
		plotMatrix();
	}

	this.createPiece = function(pieceType) {
		this.currPiece = new ActivePiece(pieceType);
		this.currPiece.drawPiece();
		redrawGrid();
	}

	this.executeRotatePiece = function(dir) {
		//0 left, 1 right
		this.currPiece.rotatePiece(dir);
		redrawGrid();
	}

	this.executeDropPiece = function() {
		this.currPiece.dropPiece();
		redrawGrid();
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