class Engine
{
    numOfPlayers;
    dimx;
    dimy;
    board;
    drawer;
    controller;

    constructor(numOfPlayers, dimx, dimy)
    {
        this.dimx = dimx;
        this.dimy = dimy;
        this.numOfPlayers = numOfPlayers;
        this.initializeBoardDimentions();
        this.initializeBoardPieces();
    }

    initializeBoardDimentions()
    {
        this.board = new Array(this.dimx);
        for (var i = 0; i < this.dimx; i++)
            this.board[i] = new Array(this.dimy);
    }

    initializeBoardPieces()
    {
    }

    takeInputAndMoveToControllerAndDraw()
    {
        let moveString = document.getElementById("nameInput").value;
        this.controller.convertAndValidateInputAndMakeMove(moveString);
        this.drawer.draw();
        this.controller.printPlayerTurnMessage();
    }
}
