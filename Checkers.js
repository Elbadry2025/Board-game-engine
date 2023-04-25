class Drawer {

}
const blackPiece = '⚫';
const redPiece = '🔴';
const emptySquare = ' ';
const n = 8;

class Piece {
    constructor(player, unicode) {
        this.player = player
        this.unicode = unicode
    }
}
class Board {
    constructor() {
        this.board =  new Array(8).fill().map(_ => new Array(8).fill(new Piece(0, emptySquare)))
        this.#initBoard()
        this.printBoard()
    }
    #initBoard() {
        for (let i = 1; i < n; i+=2){
            this.board[0][i] = new Piece(2, blackPiece)
            this.board[1][i-1] = new Piece(2, blackPiece)
            this.board[2][i] = new Piece(2, blackPiece)

            this.board[5][i-1] = new Piece(1, redPiece)
            this.board[6][i] = new Piece(1, redPiece)
            this.board[7][i-1] = new Piece(1, redPiece)
        }

    }
    printBoard(){
        for (let i = 0; i < n; i++) {
            let myString = ""
            for (let j = 0; j < n; j++) {
                let colName = String.fromCharCode('a'.charCodeAt(0) + j)
                let rowNum = n - i
                let temp = document.getElementById(colName + rowNum);
                temp.textContent = ''
                let node = document.createTextNode(this.board[i][j].unicode)
                temp.appendChild(node);
            }
        }
    }

}
let obj = new Board();
class Controller {

    constructor() {
        this.board = new Board()
    }
    ValidateInput(playerMove){
        let indexedMoves = this.convertInputToIndices(playerMove)
        let firstCell = indexedMoves[0]
        let secondCell = indexedMoves[1]
        let currentPiece = this.board[firstCell.x][firstCell.y]

        if(indexedMoves.length > 2)
            return false
        if(currentPiece === emptyChessPiece || !(this.board[secondCell.x][secondCell.y] === emptySquare))
            return false

        // get all valid moves for this piece
        let validMoves = this.getValidMoves(firstCell)

        // check if this move is in the list of valid moves
        validMoves.forEach(element => {
            if(element.isEqual(secondCell))
                return true
        })
        return false
    }
    convertInputToIndices(playerMove){
        let cells = playerMove.split(" ")
        let indexedCells = [];
        cells.forEach(element => {
            let col = element.charAt(0).charCodeAt(0) - 'a'.charCodeAt(0)
            let row = n - parseInt(element.charAt(1));
            indexedCells.push(new Point(row, col))
        })
        return indexedCells
    }
    getValidMoves(cell){

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
