function Tetris()
{
    this.game = new GameInterface();

    this.startGameLoop = function() {
        this.game.startGame();
        while (1) {
            this.game.createRandomPiece();
            this.game.engageAllKeyboardControls();

        }
    }

}