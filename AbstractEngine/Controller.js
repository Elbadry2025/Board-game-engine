class Controller
{
    numOfPlayers;
    currentplayer = 0;
    board;

    constructor(numOfPlayers, board)
    {
        this.numOfPlayers = numOfPlayers;
        this.board = board;
        this.printPlayerTurnMessage();
    }

    convertAndValidateInputAndMakeMove(moveString)
    {
        var move = this.convertInputToMove(moveString);

        if (this.validateMove(move))
        {
            this.currentplayer = (this.currentplayer + 1) % this.numOfPlayers;
            this.makeBoardChangeAfterMove(move)
        }
        else
        {
            console.log("Invalid Move");
        }
    }

    convertInputToMove(s)
    {
    }

    validateMove(moveString)
    {
    }

    printPlayerTurnMessage()
    {
        console.log("Player " + this.currentplayer + 1 + " turn");
    }

    makeBoardChangeAfterMove(move)
    {
    }
}
