function joseph()
{
    console.log("jos fhnn n heph");
}

let print = (toPrint) => {
    console.log(toPrint);
}
let printLn = (toPrint) => {console.log(toPrint + "\n")}


class Controller
{
    numOfPlayers;
    currentplayer = 1;

    gameFlow()
    {
        print("player " + this.currentplayer + " turn");

    }

    validate()
    {

    }
}

var c = new Controller();

class ChessController extends Controller
{
    validate()
    {
    }
}

class Drawer
{
    board;
    constructor(board)
    {
        this.board = board;
    }

    printBoard()
    {
        var dimx = this.board.length;
        var dimy = this.board[0].length;
        for (var i = dimx - 1; i >= 0; i--)
        {
            print(i + 1 + " ");
            for (var j = 0; j < dimy; j++)
            {
                var printedAsci = this.board[i][j].getAsci();
                printMessege(printedAsci);
            }
            print('\n')
        }
        print("_ ");
        for (var i = 0; i < dimx; i++)
            print(" " + (i + 1) + " ");
        println();
    }

}

class Engine
{
    dimx;
    dimy;
    board;
    drawer;
    controller;
    constructor(dimx, dimy)
    {
        this.dimx = dimx;
        this.dimy = dimy;
        this.board = new Array(dimx);
        for (var i = 0; i < dimx; i++)
            this.board[i] = new Array(dimy);
        this.drawer = new Drawer(this.board);
    }
}

class Piece
{
    constructor()
    {
    }
}

class Point
{
    x;
    y;
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    isEqual(otherPoint)
    {
        if (this.x == otherPoint.x && this.x == otherPoint.y) return true;
        return false;
    }
}

class ChessEngine extends Engine
{
    constructor()
    {
        super(8, 8);
    }
}

class chessDrawer
{
    board;

    draw()
    {
        // nested loop on board to get pieces
        // var i = 5;
        // var j = 7;
        // this.board[i][j].getAsci();
    }
}

const ChessColors = Object.freeze({
    white : 0,
    black : 1,
    none : 2
});

const ChessTurn = Object.freeze({
    white : 0,
    black : 1
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
        else
            return '♜';
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
        pieceMoves.addKingMoves();

        return list;
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
}


class emptyChessPiece extends Piece
{
    constructor()
    {
        super();
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
        for (var i = 0; i < range; i++)
        {
            var x2 = this.point.x + i * inc1, y2 = this.point.y + i * inc2;
            if (!Square.isvalid_square(x2, y2)) return;
            if (!checkValidPoint(x2, y2))

                if (this.board[x2][y2].color != ChessColors.none)
                {
                    if (this.board[x2][y2].color != color)
                        list.push(new Point(x2, y2));
                    return;
                }
            this.list.add(new Point(x2, y2));
        }
    }

    addMovesStraigt()
    {
        var dx = [1, -1, 0, 0];
        var dy = [0, 0, 1, -1];

        for (var ii = 0; ii < 4; ii++)
            this.getMovesInConsecutiveCellsChess(dx[ii], dy[ii], 8);
    }

    addMovesDiagonal()
    {
        var dx = [1, 1, -1, -1];
        var dy = [1, -1, 1, -1];

        for (var ii = 0; ii < 4; ii++)
            this.getMovesInConsecutiveCellsChess(dx[ii], dy[ii], 8);
    }

    addKingMoves()
    {
        var dx = [1, 1, 1, -1, -1, -1, 0, 0];
        var dy = [-1, 0, 1, -1, 0, 1, -1, 1];

        for (var ii = 0; ii < 8; ii++)
            this.getMovesInConsecutiveCellsChess(dx[ii], dy[ii], 1);
    }

    addKnightMoves()
    {
        var dx = [1, 1, -1, -1, 2, 2, -2, -2];
        var dy = [2, -2, 2, -2, 1, -1, 1, -1];

        for (var ii = 0; ii < 8; ii++)
            this.getMovesInConsecutiveCellsChess(dx[ii], dy[ii], 1);
    }

    addPawnMoves()
    {
        var x = this.point.x;
        var y = this.point.y;

        if (this.color == ChessColors.white)
        {
            if (checkValidPoint(new point(x + 1, y - 1)) && this.board[x + 1][y - 1].color != this.color)
                list.add(new Point(x + 1, y - 1));

            if (this.checkValidPoint(new point(x+1, y + 1)) && chess[x + 1][y + 1].color != this.color)
                list.add(new Point(x + 1, y + 1));

            if (this.board[x + 1][y].color == ChessColors.none)
                list.add(new Point(x + 1, y));

            if (x == 1 && this.board[x + 2][y].color == ChessColors.none && this.board[x + 1][y].color == ChessColors.none)
                list.add(new Point(x + 2, y));
        }
        else
        {

            if (this.checkValidPoint(new point(x - 1, y - 1)) && chess[x - 1][y - 1].color != this.color)
                list.add(new Point(x - 1, y - 1));

            if (this.checkValidPoint(new point(x - 1, y + 1)) && chess[x - 1][y - 1].color != this.color)
                list.add(new Point(x - 1, y + 1));

            if (this.board[x - 1][y].color == ChessColors.none)
                list.add(new Point(x - 1, y));
            if (x == 6 && this.board[x - 2][y].color == ChessColors.none && this.board[x - 1][y].color == ChessColors.none)
                list.add(new Point(x - 2, y));
        }
        return list;
    }

    checkValidPoint(point)
    {
        if (min(point.x, point.y) < 0 || max(point.x, point.y) >= 8) return false;
        return true;
    }
}