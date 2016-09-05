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

this.pauseGameButton = {
    handleEvent: function (event) {
        if(event.keyCode == 80) {
            self.gameCopy.pauseGame();
        }
    }
};

this.unpauseGameButton = {
    handleEvent: function (event) {
        if(event.keyCode == 80) {
            self.gameCopy.unpauseGame();
        }
    }
};

this.muteGameButton = {
    handleEvent: function (event) {
        if(event.keyCode == 77) {
            self.gameCopy.muteGame();
        }
    }
};

this.unmuteGameButton = {
    handleEvent: function (event) {
        if(event.keyCode == 77) {
            self.gameCopy.muteGame();
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

this.turnOnPauseGameButton = function(gameCopy) {
    document.getElementById("tetrisBoard").addEventListener('keydown', this.pauseGameButton);
    }

this.turnOffPauseGameButton = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', this.pauseGameButton);
    }

this.turnOnUnpauseGameButton = function(gameCopy) {
    document.getElementById("tetrisBoard").addEventListener('keydown', this.unpauseGameButton);
    }

this.turnOffUnpauseGameButton = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', this.unpauseGameButton);
    }

this.turnOnMuteGameButton = function(gameCopy) {
    document.getElementById("tetrisBoard").addEventListener('keydown', this.muteGameButton);
    }

this.turnOffMuteGameButton = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', this.unmuteGameButton);
    }

}