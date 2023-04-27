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

    convertInputToMove(playerMove) {
        let cells = playerMove.split(" ")
        let indexedCells = [];
        cells.forEach(element => {
            let col = element.charAt(0).charCodeAt(0) - 'a'.charCodeAt(0)
            let row = this.board.length - parseInt(element.charAt(1));
            //console.log(col, row)
            indexedCells.push(new Point(row, col))
        })
        return this.createGameMoveFromInput(indexedCells)
    }

    /**
     * takes an array of points and converts it to a game move
     */
    createGameMoveFromInput(indexedCells){

    }

    validateMove(moveString)
    {
    }

    printPlayerTurnMessage()
    {
        console.log("Player " + (parseInt(this.currentplayer) + 1) + " turn");
    }

    makeBoardChangeAfterMove(move)
    {
    }
}
