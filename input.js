function PlayerInput()
{
    this.gameCopy = 0;

    this.passInGameCopy = function(passedGameCopy) {
        this.gameCopy = passedGameCopy;
    }

    function engageControls(event) {
        if(event.keyCode == 37) {
            this.gameCopy.executeShiftPiece(0);
        }
        else if(event.keyCode == 39) {
            this.gameCopy.executeShiftPiece(1);
        }
    }

    this.switchOnOffRotationButtons = function(gameCopy, funcSwitch) {

        if (funcSwitch == 0){
            document.getElementById("tetrisBoard").addEventListener("keydown", engageControls);
        } else {
            document.getElementById("tetrisBoard").removeEventListener("keydown", engageControls);
        }
    }

}