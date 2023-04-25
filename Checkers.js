class CheckersEngine {
    constructor() {
        this.board = new Board().board
        this.controller = new Controller(this.board)
        this.drawer = new Drawer(this.board)
        this.drawer.update(this.board);
        console.log(this.board)
    }

    // TODO remove this
    takeInputAndMoveToControllerAndDraw()
    {
        let playerMove = document.getElementById('input').value
        let indexedMove = this.convertInputToIndices(playerMove)
        if(this.controller.validateInput(indexedMove)){
            console.log(indexedMove)
            this.board[indexedMove[1].x][indexedMove[1].y] = this.board[indexedMove[0].x][indexedMove[0].y]
            this.board[indexedMove[0].x][indexedMove[0].y] = new Piece(1, emptySquare)
            this.drawer.update(this.board);
            console.log(this.board)
        }else{
            console.log("invalid move")
        }
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
}

class Drawer {
    constructor(board) {
        this.board = board
    }
    update(board){
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                let colName = String.fromCharCode('a'.charCodeAt(0) + j)
                let rowNum = n - i
                let temp = document.getElementById(colName + rowNum);
                temp.textContent = ''
                let node = document.createTextNode(board[i][j].unicode)
                temp.appendChild(node);
            }
        }
    }
}
class Controller {

    constructor(board) {
        this.board = board
    }
    validateInput(indexedMoves){
        let firstCell = indexedMoves[0]
        let secondCell = indexedMoves[1]
        let currentPiece = this.board[firstCell.x][firstCell.y]

        if(indexedMoves.length > 2)
            return false
        if(currentPiece.unicode === emptySquare || !(this.board[secondCell.x][secondCell.y].unicode === emptySquare))
            return false

        // get all valid moves for this piece
        let validMoves = this.getValidMoves(firstCell)
        console.log(validMoves)
        let flag = false
        // check if this move is in the list of valid moves
        validMoves.forEach(element => {
            console.log(element, secondCell)
            if(element.x == secondCell.x && element.y == secondCell.y)
                flag = true
            else
                console.log("move not correct")
        })
        return flag
    }

    getValidMoves(cell){
        let validCells = [];
        this.recur(cell, 0, validCells)
        return validCells
    }

    // TODO make queen
    recur(cell, depth, validCells) {
        let dx = [-1, -1]
        let dy = [-1, 1]
        for (let i = 0; i < dx.length; i++){
            let nx = cell.x + dx[i]
            let ny = cell.y + dy[i]
            if(nx < 0 || nx >= n  || ny < 0 || ny >= n)
                break;
            if(this.board[nx][ny].unicode === emptySquare && depth === 0)
                validCells.push(new Point(nx, ny))
            else if(this.board[nx][ny].unicode !== emptySquare && this.board[nx+dx[i]][ny+dy[i]].unicode != emptySquare)
                this.recur(new Point(nx+dx[i], ny+dy[i]), depth+1, validCells)
        }
    }

}
let engine = new CheckersEngine();
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
