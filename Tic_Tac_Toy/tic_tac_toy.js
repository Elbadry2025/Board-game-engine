class Tic_Tac_ToyMove extends Move
{
    constructor(point1)
    {
        super()
        this.point1 = point1;
    }
}

class XPiece extends Piece{
    constructor(){
        super()
    }
    getAsci(){
        return 'X';
    }
}
class OPiece extends Piece{
    constructor(){
        super()
    }
    getAsci(){
        return 'O';
    }
}
class EmptyPiece extends Piece{
    constructor(){
        super()
    }
    isValidMove(board, point){
        return true;
    }
    getAsci(){
        return " ";
    }
}

class Tic_Tac_ToyEngine extends Engine{
    constructor(){
        super(2,3,3);
        this.controller = new Tic_Tac_ToyController(this.board);
        this.drawer = new Tic_Tac_ToyDrawer(this.board);
    }
    initializeBoardPieces(){
        for (var i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++)
                this.board[i][j] = new EmptyPiece();
    }
}

class Tic_Tac_ToyController extends Controller{
    constructor(board){
        var numOfPlayers = 2;
        super(numOfPlayers, board);
    }
    validateMove(move){
        console.log(move);
        var point1 = move.point1;
        if (Math.min(point1.x, point1.y) < 0 || Math.max(point1.x, point1.y) >= 3)
            return false;

        var piece = this.board[point1.x][point1.y];

        if(piece instanceof EmptyPiece) return true;
        return false;
    }
    createGameMoveFromInput(indexedCells){
        return new Tic_Tac_ToyMove(indexedCells[0])
    }

    // convertInputToMove(moveString){
    //     var list = moveString.split(" ");
    //     var col1 = parseInt(list[0]);
    //     var row1 = parseInt(list[1]);
    //     row1--;
    //     col1--;
    //     var point1 = new Point(row1, col1);
    //     return point1;
    // }

    makeBoardChangeAfterMove(move){
        let point = move.point1
        if(this.currentplayer == 1) this.board[point.x][point.y] = new XPiece();
        else this.board[point.x][point.y] = new OPiece();
    }
}
class Tic_Tac_ToyDrawer extends Drawer{
    constructor(board){
        super(board);
    }
}
var myEngine = new Tic_Tac_ToyEngine();