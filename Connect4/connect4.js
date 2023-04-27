var validArray=[0,0,0,0,0,0];
class Connect4Move extends Move
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
        return '🟡';
    }
}
class OPiece extends Piece{
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
        this.drawer = new Connect4Drawer(this.board, this.boardCSS);
    }
    initializeCssBoard(){
        let cell = new Cell( "#ffffff", 100, 100, 90, "circle")
        document.getElementById('board').style.width = 600 + 'px'
        document.getElementById('board').style.height = 600 + 'px'
        for(let i= 0;i<this.dimx;i++)
            for (let j = 0; j < this.dimy; j++)
                    this.boardCSS[i][j] = cell
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
        console.log(move);
        var point1 = move.point1;
        if (point1.y >=0  && validArray[point1.y] < 6){
            validArray[point1.y]++;
            return true;
        }
        return false;
    }
    createGameMoveFromInput(indexedCells){
        return new Connect4Move(indexedCells[0])
    }

    makeBoardChangeAfterMove(move){
        let point = move.point1;
        console.log(validArray);
        console.log(point);
        if(this.currentplayer == 1) this.board[5-(validArray[point.y]-1)][point.y] = new XPiece();
        else this.board[5-(validArray[point.y]-1)][point.y] = new OPiece();
    }
}
class Connect4Drawer extends Drawer{
    constructor(board, boardCSS){
        super(board, boardCSS);
    }
}
var myEngine = new Connect4Engine();