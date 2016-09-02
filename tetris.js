function Tetris()
{
    this.game = new GameInterface();
    document.getElementById("tetrisBoard").focus();
    //Sets focus on the board so you don't have to click on it
    //This is gonna break if "tetrisBoard is renamed".

    this.startGameLoop = function() {
        this.game.startGame();
        this.game.createRandomPiece();
        this.game.engageAllKeyboardControls();
        this.game.setGameGravityTimer();
    }

}