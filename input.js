function PlayerInput()
{

this.turnOnRotationButtons = function(gameCopy) {
    var engageControls = function(event) {
        if(event.keyCode == 37) {
            gameCopy.executeShiftPiece(0);
        }
        else if(event.keyCode == 39) {
            gameCopy.executeShiftPiece(1);
        }
    }

    document.getElementById("tetrisBoard").addEventListener('keydown', engageControls);

    }

this.turnOffRotationButtons = function(gameCopy) {
    document.getElementById("tetrisBoard").removeEventListener('keydown', engageControls);

    }


}