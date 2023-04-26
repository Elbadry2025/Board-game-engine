class CheckersPiece extends Piece{
    constructor(player, asci) {
        super()
        this.player = player
        this.asci = asci
        if(asci == redPiece){
            this.dx = [-1, -1]
            this.dy = [-1, 1]
        }else{
            this.dx = [1, 1]
            this.dy = [-1, 1]
        }
    }
    getAsci(){
        return this.asci
    }
}
const blackPiece = '⚫';
const redPiece = '🔴';
const redQueen = '⭕'
const blackQueen = '⚈'
const emptySquare = new CheckersPiece(-1, " ");
const n = 8;

class CheckersEngine extends Engine {
    constructor() {
        super(2, n, n)
        this.controller = new CheckersController(this.board)
        this.drawer = new CheckersDrawer(this.board)
        this.drawer.draw()
    }

    initializeBoardDimensions() {
        this.board =  new Array(n).fill().map(_ => new Array(n).fill(emptySquare))
    }

    initializeBoardPieces(){
        for (let i = 1; i < n; i+=2)
        {
            this.board[0][i] = new CheckersPiece(1, blackPiece)
            this.board[1][i-1] = new CheckersPiece(1, blackPiece)
            this.board[2][i] = new CheckersPiece(1, blackPiece)

            this.board[5][i-1] = new CheckersPiece(0, redPiece)
            this.board[6][i] = new CheckersPiece(0, redPiece)
            this.board[7][i-1] = new CheckersPiece(0, redPiece)
        }
    }
}

class CheckersDrawer extends Drawer{
    constructor(board) {
        super(board)
    }
}
class CheckersController extends Controller{
    constructor(board) {
        super(2, board)
        this.paths = new Array(new Array(n))
        for (let i = 0; i < n; i++)
            this.paths[i] = new Array(n)
    }
    validateMove(indexedMoves){
        let firstCell = indexedMoves[0]
        let secondCell = indexedMoves[1]
        let currentPiece = this.board[firstCell.x][firstCell.y]

        if(indexedMoves.length > 2)
            return false
        if(currentPiece === emptySquare || this.board[secondCell.x][secondCell.y] != emptySquare
         || currentPiece.player != this.currentplayer)
            return false

        console.log(this.currentplayer)
        let nullPoint = new Point(-1, -1)
        for (let i = 0; i < n; i++)
            this.paths[i].fill(nullPoint)

        // get all valid moves for this piece
        let validMoves = this.getValidMoves(firstCell)
        console.log("valid moves: ", validMoves)

        // check if this move is in the list of valid moves
        let flag = false
        validMoves.forEach(element => {
            if(element.x == secondCell.x && element.y == secondCell.y)
                flag = true
        })
        return flag
    }

    getValidMoves(cell, paths){
        let validCells = [];
        this.populateValidCellsArray(cell, 0, cell ,validCells)
        return validCells
    }

    // TODO make queen
    populateValidCellsArray(cell, depth, parent, validCells) {
        let dx = this.board[cell.x][cell.y].dx
        let dy = this.board[cell.x][cell.y].dy
        for (let i = 0; i < dx.length; i++){
            let nx = cell.x + dx[i]
            let ny = cell.y + dy[i]
            if(!this.isValidDimensions(nx, ny))
                continue;
            if(this.board[nx][ny] === emptySquare && depth === 0){
                this.paths[nx][ny] = cell
                validCells.push(new Point(nx, ny))
            }
            else if(this.board[nx][ny] !== emptySquare && this.isValidDimensions(nx+dx[i], ny+dy[i]) &&
                this.board[nx+dx[i]][ny+dy[i]] == emptySquare){

                validCells.push(new Point(nx+dx[i], ny+dy[i]))
                this.paths[nx][ny] = cell
                this.paths[nx+dx[i]][ny+dy[i]] = new Point(nx, ny)
                this.populateValidCellsArray(new Point(nx+dx[i], ny+dy[i]), depth+1, cell, validCells)
            }
        }
    }

    isValidDimensions(x, y){
        return x >= 0 && x < n && y >= 0 && y < n
    }

    makeBoardChangeAfterMove(indexedMove) {
        let cell1 = indexedMove[0]
        let cell2 = indexedMove[1]
        let node = cell2
        while ((node.x != cell1.x || node.y != cell1.y) && node.x != -1){
            console.log("deleted: ", node)
            this.board[node.x][node.y] = emptySquare
            node = this.paths[node.x][node.y]
        }

        this.board[cell2.x][cell2.y] = this.board[cell1.x][cell1.y]
        this.board[cell1.x][cell1.y] = emptySquare
        if(cell2.x == 0 && this.board[cell2.x][cell2.y].asci == redPiece){
            console.log("queen promoted");
            this.board[cell2.x][cell2.y].dx = [-1, -1, 1, 1]
            this.board[cell2.x][cell2.y].dy = [-1, 1, -1, 1]
            this.board[cell2.x][cell2.y].asci = redQueen
        }else if(cell2.x == n-1 && this.board[cell2.x][cell2.y].asci == blackPiece){
            console.log("queen promoted");
            this.board[cell2.x][cell2.y].dx = [-1, -1, 1, 1]
            this.board[cell2.x][cell2.y].dy = [-1, 1, -1, 1]
            this.board[cell2.x][cell2.y].asci = blackQueen
        }
    }

    convertInputToMove(playerMove) {
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
let engine = new CheckersEngine();
