var validArray=[0,0,0,0,0,0];
class Point{
    x;
    y;
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    isEqual(otherPoint){
        if (this.x == otherPoint.x && this.x == otherPoint.y) return true;
        return false;
    }
}
class Connect4Move
{
    point1;
    constructor(point1)
    {
        this.point1 = point1;
    }
}

class Piece{
    constructor(){}
    isValidMove(board, point){
        if(board[point.x][point.y] instanceof EmptyPiece)return true;
        return false;
    }
    getAsci(){}
}
class YellowPiece extends Piece{
    constructor(){
        super()
    }
    getAsci(){
        return '🟡';
    }
}
class RedPiece extends Piece{
    constructor(){
        super()
    }
    getAsci(){
        return '🔴';
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

class Connect4Engine extends Engine{
    constructor(){
        super(2,6,6);
        this.controller = new Connect4Controller(this.board);
        this.drawer = new Connect4Drawer(this.board);
    }
    initializeBoardPieces(){
        for (var i = 0; i < 6; i++)
            for (var j = 0; j < 6; j++)
                this.board[i][j] = new EmptyPiece();
    }
}

class Connect4Controller extends Controller{
    constructor(board){
        var numOfPlayers = 2;
        super(numOfPlayers, board);
    }
    validateMove(move){
        var point1 = move;
        if(point1.y >= 0 && validArray[point1.y] <= 6){
            return true;
        }
        return false;
        
    }
    convertInputToMove(moveString){
        var col1 = parseInt(moveString);
        var row1 = ++validArray[col1-1];
        console.log(validArray);
        row1--;
        col1--;
        var point1 = new Point(5-row1, col1);
        console.log(point1);
        return point1;
    }

    makeBoardChangeAfterMove(move){
        let point = move
        if(this.currentplayer == 1) this.board[move.x][move.y] = new YellowPiece();
        else this.board[move.x][move.y] = new RedPiece();
    }
}
class Connect4Drawer extends Drawer{
    constructor(board){
        super(board);
    }
}
var myEngine = new Connect4Engine();