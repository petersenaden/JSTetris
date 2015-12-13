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
    }
};

this.dropButton = {
    handleEvent: function (event) {
        if(event.keyCode == 40) {
            self.gameCopy.executeDropPiece();
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


}