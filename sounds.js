function SoundActivation()
{
    this.gameCopy; //reference copy of the game interface
    var self = this; //necessary because event handlers are a nightmare

    this.playClickSound = function(gameCopy) {
    	var audio = new Audio("sounds/click.wav");
		audio.play();
    }

    this.playRowClearSound = function(gameCopy) {
    	var audio = new Audio("sounds/rowClear.wav");
		audio.play();
    }

    this.playDropSound = function(gameCopy) {
    	var audio = new Audio("sounds/drop.mp3");
		audio.play();
    }

    this.playGameOverSound = function(gameCopy) {
    	var audio = new Audio("sounds/gameOver.mp3");
		audio.play();
    }

    this.playRowTetrisSound = function(gameCopy) {
    	var audio = new Audio("sounds/rowTetris.mp3");
		audio.play();
    }

}