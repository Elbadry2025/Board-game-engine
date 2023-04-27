class Tic_Tac_ToeMove extends Move
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

class Tic_Tac_ToeEngine extends Engine{
    constructor(){
        super(2,3,3);
        this.controller = new Tic_Tac_ToeController(this.board);
        this.drawer = new Tic_Tac_ToeDrawer(this.board, this.boardCSS);
    }
    initializeCssBoard() {
        let cell = new Cell("#5cb4f3b7", 100, 100, 70, undefined, 2)
        document.getElementById('board').style.width = 309.9 + 'px'
        document.getElementById('board').style.height = 309.9 + 'px'
        for (let i = 0; i < this.dimx; i++)
            for (let j = 0; j < this.dimy; j++)
                this.boardCSS[i][j] = cell
    }
    initializeBoardPieces(){
        for (var i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++)
                this.board[i][j] = new EmptyPiece();
    }
}

class Tic_Tac_ToeController extends Controller{
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
        return new Tic_Tac_ToeMove(indexedCells[0])
    }

    makeBoardChangeAfterMove(move){
        let point = move.point1
        if(this.currentplayer == 1) this.board[point.x][point.y] = new XPiece();
        else this.board[point.x][point.y] = new OPiece();
    }
}
class Tic_Tac_ToeDrawer extends Drawer{
    constructor(board, boardCSS){
        super(board, boardCSS);
    }
}
var myEngine = new Tic_Tac_ToeEngine();