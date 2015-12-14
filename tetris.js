function Tetris()
{
    this.game = new GameInterface();

    this.startGameLoop = function() {
        this.game.startGame();
        this.game.createRandomPiece();
        this.game.engageAllKeyboardControls();
        this.game.setGameGravityTimerToOn(2000);
    }

}