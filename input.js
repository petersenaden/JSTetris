function PlayerInput()
{
    this.gameCopy; //reference copy of the game interface
    var self = this; //necessary because event handlers are a nightmare

this.setGamePiece = function(passedInGameCopy) {
    //Passes in the copy of the game interface
        this.gameCopy = passedInGameCopy;
    }

this.shifterButtons = {
    handleEvent: function (event) {
        if(event.keyCode == 37) {
            self.gameCopy.executeShiftPiece(0);
        }
        else if(event.keyCode == 39) {
            self.gameCopy.executeShiftPiece(1);
        }
    }
};

this.rotateButton = {
    handleEvent: function (event) {
        if(event.keyCode == 38) {
            self.gameCopy.executeRotatePiece(0);
        }
        else if(event.keyCode == 90) {
            self.gameCopy.executeRotatePiece(0);
        }
        else if(event.keyCode == 88) {
            self.gameCopy.executeRotatePiece(1);
        }
    }
};

this.dropButton = {
    handleEvent: function (event) {
        if(event.keyCode == 40) {
            self.gameCopy.executeDropPiece();
        }
    }
};

this.hardDropButton = {
    handleEvent: function (event) {
        if(event.keyCode == 32) {
            self.gameCopy.executeHardDropPiece();
        }
    }
};

this.restartGameButton = {
    handleEvent: function (event) {
        if(event.keyCode == 78) {
            self.gameCopy.restartGame();
        }
    }
};

this.turnOnShifterButtons = function(gameCopy) {
    document.getElementById("tetrisBoard").addEventListener('keydown', this.shifterButtons);
    }

this.turnOffShifterButtons = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', this.shifterButtons);
    }

this.turnOnRotationButtons = function(gameCopy) {
    document.getElementById("tetrisBoard").addEventListener('keydown', this.rotateButton);
    }

this.turnOffRotationButtons = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', this.rotateButton);
    }

this.turnOnDropButton = function(gameCopy) {
    document.getElementById("tetrisBoard").addEventListener('keydown', this.dropButton);
    }

this.turnOffDropButton = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', this.dropButton);
    }

this.turnOnHardDropButton = function(gameCopy) {
    document.getElementById("tetrisBoard").addEventListener('keydown', this.hardDropButton);
    }

this.turnOffHardDropButton = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', this.hardDropButton);
    }

this.turnOnRestartGameButton = function(gameCopy) {
    document.getElementById("tetrisBoard").addEventListener('keydown', this.restartGameButton);
    }

this.turnOffRestartGameButton = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', this.restartGameButton);
    }

}