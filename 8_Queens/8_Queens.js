class ChessMove extends Move
{
    point1;
    constructor(point1)
    {
        super()
        this.point1 = point1;
    }
}

class QueenPiece extends Piece{
    constructor(){
        super()
    }
    getAsci(){
        return '♛';
    }
}

class EmptyPiece extends Piece{
    constructor(){
        super()
    }
    isValidMove(board, point){
        for(let i = 0;i<8;i++){
            if(board[point.x][i] instanceof QueenPiece ||
                board[i][point.y] instanceof QueenPiece)
                    return false;
        }
        let counter = 1;
        for(let i = point.x-1;i>=0;i--){
            if(board[i][point.y - counter] instanceof QueenPiece ||
                board[i][point.y + counter] instanceof QueenPiece)
                    return false;
            counter++;
        }
        counter = 1;
        for(let i = point.x+1;i<8;i++){
            if(board[i][point.y - counter] instanceof QueenPiece ||
                board[i][point.y + counter] instanceof QueenPiece)
                    return false;
            counter++;
        }
        return true;
    }
    getAsci(){
        return " ";
    }
}

class QueensEngine extends Engine{
    constructor(){
        super(1,8,8);
        this.controller = new QueensController(this.board);
        this.drawer = new QueensDrawer(this.board, this.boardCSS);
    }
    initializeCssBoard(){
        let cell1 = new Cell( "#e59110", undefined, undefined, undefined, 'square')
        let cell2 = new Cell( "#ffcfb6", undefined, undefined, undefined, 'square')
        for(let i= 0;i<this.dimx;i++) {
            for (let j = 0; j < this.dimy; j++) {
                if ((i+j) % 2 == 0)
                    this.boardCSS[i][j] = cell1
                else
                    this.boardCSS[i][j] = cell2
            }
        }
        console.log(this.boardCSS)
    }
    initializeBoardPieces(){
        for (var i = 0; i < 8; i++)
            for (var j = 0; j < 8; j++)
                this.board[i][j] = new EmptyPiece();
    }
}

class QueensController extends Controller{
    constructor(board){
        var numOfPlayers = 1;
        super(numOfPlayers, board);
    }
    createGameMoveFromInput(indexedCells){
        return new ChessMove(indexedCells[0])
    }
    validateMove(move){
        var point1 = move.point1;
        if (Math.min(point1.x, point1.y) < 0 || Math.max(point1.x, point1.y) >= 8)
            return false;

        var piece = this.board[point1.x][point1.y];

        if(piece instanceof QueenPiece) return true;

        if (piece.isValidMove(this.board, point1))
            return true;
        return false;
    }

    makeBoardChangeAfterMove(move){
        let point = move.point1
        if(this.board[point.x][point.y] instanceof EmptyPiece){
            console.log(point.x, point.y)
            this.board[point.x][point.y] = new QueenPiece();
        }
        else this.board[point.x][point.y] = new EmptyPiece();

    }
}
class QueensDrawer extends Drawer{
    constructor(board, boardCSS){
        super(board, boardCSS);
    }
}


var myEngine = new QueensEngine();