class ChessMove extends Move
{
    constructor(point1, point2)
    {
        super()
        this.point1 = point1
        this.point2 = point2
    }
}

const ChessColors = Object.freeze({
    white : 0,
    black : 1,
    none : 2
});

class ChessPiece extends Piece
{
    color;
    constructor(color)
    {
        super();
        this.color = color;
    }
    getValidMoves(board, point)
    {

    }
    isValidMove(board, point, newpoint)
    {
        var movesList = this.getValidMoves(board, point);
        for (var i = 0; i < movesList.length; i++)
        {
            var currentPoint = movesList[i];
            if (currentPoint.isEqual(newpoint)) return true;
        }
        return false;
    }
    getAsci()
    {
        return " ";
    }
}

class EmptyChessPiece extends ChessPiece
{
    constructor()
    {
        super();
        this.color = ChessColors.none;
    }
    getvalidMoves(board, point)
    {
        return [];
    }

    isValidMove(board, point, newpoint)
    {
        console.log("valid for empty");
        return false;
    }
}

class King extends ChessPiece
{
    constructor(color)
    {
        super(color);
    }

    getValidMoves(board, point)
    {
        var list = [];
        var pieceMoves = new PieceMoves(board, point, this.color, list);
        pieceMoves.addKingMoves();
        return list;
    }

    getAsci()
    {
        if (this.color == ChessColors.white)
            return '♔';
        else return '♚';
    }
}

class Queen extends ChessPiece
{
    constructor(color)
    {
        super(color);
    }

    getValidMoves(board, point)
    {
        var list = [];
        var pieceMoves = new PieceMoves(board, point, this.color, list);
        pieceMoves.addMovesStraigt();
        pieceMoves.addMovesDiagonal();

        return list;
    }

    getAsci()
    {
        if (this.color == ChessColors.white)
            return '♕';
        else return '♛';
    }
}

class Rook extends ChessPiece
{
    constructor(color)
    {
        super(color);
    }

    getValidMoves(board, point)
    {
        var list = [];
        var pieceMoves = new PieceMoves(board, point, this.color, list);
        pieceMoves.addMovesStraigt();

        return list;
    }

    getAsci()
    {
        if (this.color == ChessColors.white)
            return '♖';
        else return '♜';
    }
}

class Bishop extends ChessPiece
{
    constructor(color)
    {
        super(color);
    }

    getValidMoves(board, point)
    {
        var list = [];
        var pieceMoves = new PieceMoves(board, point, this.color, list);
        pieceMoves.addMovesDiagonal();

        return list;
    }

    getAsci()
    {
        if (this.color == ChessColors.white)
            return "♗";
        else return "♝";
    }
}

class Knight extends ChessPiece
{
    constructor(color)
    {
        super(color);
    }

    getValidMoves(board, point)
    {
        var list = [];
        var pieceMoves = new PieceMoves(board, point, this.color, list);

        pieceMoves.addKnightMoves();

        return list;
    }

    getAsci()
    {
        if (this.color == ChessColors.white)
            return "♘";
        else return "♞";
    }
}

class Pawn extends ChessPiece
{
    constructor(color)
    {
        super(color);
    }

    getValidMoves(board, point)
    {
        var list = [];
        var pieceMoves = new PieceMoves(board, point, this.color, list);
        pieceMoves.addPawnMoves();

        return list;
    }

    getAsci()
    {
        if (this.color == ChessColors.white)
            return "♙";
        else return "♟";
    }
}

class PieceMoves
{
    board;
    color;
    point;
    list;

    constructor(board, point, color, list)
    {
        this.board = board;
        this.color = color;
        this.point = point;
        this.list = list;
    }

    addMovesInConsecutiveCellsChess(inc1, inc2, range)
    {
        for (var i = 1; i <= range; i++)
        {
            var x2 = this.point.x + i * inc1, y2 = this.point.y + i * inc2;
            if (!this.checkValidPoint(new Point(x2, y2))) return;

            if (this.board[x2][y2].color != ChessColors.none)
            {
                if (this.board[x2][y2].color != this.color)
                    this.list.push(new Point(x2, y2));
                return;
            }
            this.list.push(new Point(x2, y2));
        }
    }

    addMovesStraigt()
    {
        var dx = [1, -1, 0, 0];
        var dy = [0, 0, 1, -1];

        for (var ii = 0; ii < 4; ii++)
            this.addMovesInConsecutiveCellsChess(dx[ii], dy[ii], 8);
    }

    addMovesDiagonal()
    {
        var dx = [1, 1, -1, -1];
        var dy = [1, -1, 1, -1];

        for (var ii = 0; ii < 4; ii++)
            this.addMovesInConsecutiveCellsChess(dx[ii], dy[ii], 8);
    }

    addKingMoves()
    {
        var dx = [1, 1, 1, -1, -1, -1, 0, 0];
        var dy = [-1, 0, 1, -1, 0, 1, -1, 1];

        for (var ii = 0; ii < 8; ii++)
            this.addMovesInConsecutiveCellsChess(dx[ii], dy[ii], 1);
    }

    addKnightMoves()
    {
        var dx = [1, 1, -1, -1, 2, 2, -2, -2];
        var dy = [2, -2, 2, -2, 1, -1, 1, -1];

        for (var ii = 0; ii < 8; ii++)
            this.addMovesInConsecutiveCellsChess(dx[ii], dy[ii], 1);
    }

    addPawnMoves()
    {
        var x = this.point.x;
        var y = this.point.y;

        if (this.color == ChessColors.black)
        {
            if (this.pointValidForPawn(x + 1, y - 1))
                this.list.push(new Point(x + 1, y - 1));

            if (this.pointValidForPawn(x + 1, y + 1))
                this.list.push(new Point(x + 1, y + 1));

            if (this.pointValidForPawn(x + 1, y))
                this.list.push(new Point(x + 1, y));

            if (x == 1 && this.pointValidForPawn(x + 2, y))
                this.list.push(new Point(x + 2, y));
        }
        else
        {
            if (this.pointValidForPawn(x - 1, y - 1))
                this.list.push(new Point(x - 1, y - 1));

            if (this.pointValidForPawn(x - 1, y + 1))
                this.list.push(new Point(x - 1, y + 1));

            if (this.pointValidForPawn(x - 1, y))
                this.list.push(new Point(x - 1, y));

            if (x == 6 && this.pointValidForPawn(x - 2, y))
                this.list.push(new Point(x - 2, y));
        }
    }

    pointValidForPawn(x, y)
    {
        if (!this.checkValidPoint(new Point(x, y))) return false;
        if (y != this.point.y)
        {
            if (this.board[x][y].color == ChessColors.none || this.board[x][y].color == this.color)
                return false;
            return true;
        }
        if (Math.abs(x - this.point.x) == 2)
        {
            var xmid = (x + this.point.x) / 2;
            if (this.board[xmid][y].color != ChessColors.none)
                return false;
        }
        if (this.board[x][y].color != ChessColors.none) return false;
        return true;
    }

    checkValidPoint(point)
    {
        if (Math.min(point.x, point.y) < 0 || Math.max(point.x, point.y) >= 8) return false;
        return true;
    }
}

class ChessEngine extends Engine
{
    constructor()
    {
        super(2, 8, 8);
        this.controller = new ChessController(this.board);
        this.drawer = new ChessDrawer(this.board, this.boardCSS);
    }
    initializeCssBoard()
    {
        let cell1 = new Cell( '#e59110', undefined, undefined, undefined, undefined)
        let cell2 = new Cell( '#ffcfb6', undefined, undefined, undefined, undefined)
        for(let i= 0;i<this.dimx;i++) {
            for (let j = 0; j < this.dimy; j++) {
                if ((i+j) % 2 == 0)
                    this.boardCSS[i][j] = cell1
                else
                    this.boardCSS[i][j] = cell2
            }
        }
        //console.log(this.boardCSS)
    }
    initializeBoardPieces()
    {
        for (var i = 2; i < 6; i++)
            for (var j = 0; j < 8; j++)
                this.board[i][j] = new EmptyChessPiece();

        this.board[7][0] = new Rook(ChessColors.white);
        this.board[7][1] = new Knight(ChessColors.white);
        this.board[7][2] = new Bishop(ChessColors.white);
        this.board[7][3] = new Queen(ChessColors.white);
        this.board[7][4] = new King(ChessColors.white);
        this.board[7][5] = new Bishop(ChessColors.white);
        this.board[7][6] = new Knight(ChessColors.white);
        this.board[7][7] = new Rook(ChessColors.white);


        this.board[0][0] = new Rook(ChessColors.black);
        this.board[0][1] = new Knight(ChessColors.black);
        this.board[0][2] = new Bishop(ChessColors.black);
        this.board[0][3] = new Queen(ChessColors.black);
        this.board[0][4] = new King(ChessColors.black);
        this.board[0][5] = new Bishop(ChessColors.black);
        this.board[0][6] = new Knight(ChessColors.black);
        this.board[0][7] = new Rook(ChessColors.black);

        for (var j = 0; j < 8; j++)
            this.board[1][j] = new Pawn(ChessColors.black);
        for (var j = 0; j < 8; j++)
            this.board[6][j] = new Pawn(ChessColors.white);
    }
}

class ChessController extends Controller
{
    constructor(board)
    {
        var numOfPlayers = 2;
        super(numOfPlayers, board);
    }

    validateMove(move)
    {
        console.log(move);
        var point1 = move.point1;
        var point2 = move.point2;

        if (Math.min(point1.x, point1.y) < 0 || Math.max(point1.x, point1.y) >= 8)
            return false;
        var piece = this.board[point1.x][point1.y];

        if (piece.color != this.currentplayer) return false; // empty or other color

        if (piece.isValidMove(this.board, point1, point2))
            return true;
        return false;
    }

    createGameMoveFromInput(indexedCells){
        return new ChessMove(indexedCells[0], indexedCells[1])
    }

    makeBoardChangeAfterMove(move)
    {
        var point1 = move.point1;
        var point2 = move.point2;

        this.board[point2.x][point2.y] = this.board[point1.x][point1.y];
        this.board[point1.x][point1.y] = new EmptyChessPiece();

        console.log(this.board);
    }
}

class ChessDrawer extends Drawer
{
    constructor(board, boardCSS)
    {
        super(board, boardCSS);
    }

}

var myEngine = new ChessEngine();