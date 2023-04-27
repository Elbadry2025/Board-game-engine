class SudokuMove extends Move{
    constructor(point,val){
        super()
        this.point = point;
        this.val = val;
    }
}
/////////////////////////////////////////////////////////////////try generators///////////////////////////
const BLANK_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]]
  
let counter
const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function shuffle( array ) {
let newArray = [...array]
for ( let i = newArray.length - 1; i > 0; i-- ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );
    [ newArray[ i ], newArray[ j ] ] = [ newArray[ j ], newArray[ i ] ];
}
return newArray;
}


/*--------------------------------------------------------------------------------------------
--------------------------------- Check if Location Safe -------------------------------------
--------------------------------------------------------------------------------------------*/

const rowSafe = (puzzleArray, emptyCell, num) => {
// -1 is return value of .find() if value not found
return puzzleArray[ emptyCell.rowIndex ].indexOf(num) == -1 
}
const colSafe = (puzzleArray, emptyCell, num) => {
return !puzzleArray.some(row => row[ emptyCell.colIndex ] == num )
}

const boxSafe = (puzzleArray, emptyCell, num) => {
boxStartRow = emptyCell.rowIndex - (emptyCell.rowIndex % 3) // Define top left corner of box region for empty cell
boxStartCol = emptyCell.colIndex - (emptyCell.colIndex % 3)
let safe = true

for ( boxRow of [0,1,2] ) {  // Each box region has 3 rows
    for ( boxCol of [0,1,2] ) { // Each box region has 3 columns
    if ( puzzleArray[boxStartRow + boxRow][boxStartCol + boxCol] == num ) { // Num is present in box region?
        safe = false // If number is found, it is not safe to place
    }
    }
}
return safe
}

const safeToPlace = ( puzzleArray, emptyCell, num ) => {
return rowSafe(puzzleArray, emptyCell, num) && 
colSafe(puzzleArray, emptyCell, num) && 
boxSafe(puzzleArray, emptyCell, num) 
}

/*--------------------------------------------------------------------------------------------
--------------------------------- Obtain Next Empty Cell -------------------------------------
--------------------------------------------------------------------------------------------*/

const nextEmptyCell = puzzleArray => {
const emptyCell = {rowIndex: "", colIndex: ""}

puzzleArray.forEach( (row, rowIndex) => {
    if (emptyCell.colIndex !== "" ) return // If this key has already been assigned, skip iteration
    let firstZero = row.find( col => col === 0) // find first zero-element
    if (firstZero === undefined) return; // if no zero present, skip to next row
    emptyCell.rowIndex = rowIndex
    emptyCell.colIndex = row.indexOf(firstZero)
    })

if (emptyCell.colIndex !== "" ) return emptyCell
// If emptyCell was never assigned, there are no more zeros
return false
}

/*--------------------------------------------------------------------------------------------
--------------------------------- Generate Filled Board -------------------------------------
--------------------------------------------------------------------------------------------*/

const fillPuzzle = startingBoard => {
const emptyCell = nextEmptyCell(startingBoard)
// If there are no more zeros, the board is finished, return it
if (!emptyCell) return startingBoard

// Shuffled [0 - 9 ] array fills board randomly each pass
for (num of shuffle(numArray) ) {   
    // counter is a global variable tracking the number of iterations performed in generating a puzzle
    // Most puzzles generate in < 500ms, but occassionally random generation could run in to
    // heavy backtracking and result in a long wait. Best to abort this attempt and restart.
    // 20_000_000 iteration maximum is approximately 1.3 sec runtime.
    // See initializer function for more
    counter++
    if ( counter > 20_000_000 ) throw new Error ("Recursion Timeout")
    if ( safeToPlace( startingBoard, emptyCell, num) ) {
    startingBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = num // If safe to place number, place it
    // Recursively call the fill function to place num in next empty cell
    if ( fillPuzzle(startingBoard) ) return startingBoard 
    // If we were unable to place the future num, that num was wrong. Reset it and try next value
    startingBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = 0 
    }
}
return false // If unable to place any number, return false, which triggers previous round to go to next num
}

const newSolvedBoard = _ => {
const newBoard = BLANK_BOARD.map(row => row.slice() ) // Create an unaffiliated clone of a fresh board
fillPuzzle(newBoard) // Populate the board using backtracking algorithm
return newBoard
}

/*--------------------------------------------------------------------------------------------
--------------------------------- Generate Playable Board ------------------------------------
--------------------------------------------------------------------------------------------*/

const pokeHoles = (startingBoard, holes) => {
const removedVals = []

while (removedVals.length < holes) {
    const val = Math.floor(Math.random() * 81) // Value between 0-81
    const randomRowIndex = Math.floor(val / 9) // Integer 0-8 for row index
    const randomColIndex = val % 9 

    if (!startingBoard[ randomRowIndex ]) continue // guard against cloning error
    if ( startingBoard[ randomRowIndex ][ randomColIndex ] == 0 ) continue // If cell already empty, restart loop
    
    removedVals.push({  // Store the current value at the coordinates
    rowIndex: randomRowIndex, 
    colIndex: randomColIndex, 
    val: startingBoard[ randomRowIndex ][ randomColIndex ] 
    })
    startingBoard[ randomRowIndex ][ randomColIndex ] = 0 // "poke a hole" in the board at the coords
    const proposedBoard = startingBoard.map ( row => row.slice() ) // Clone this changed board
    
    // Attempt to solve the board after removing value. If it cannot be solved, restore the old value.
    // and remove that option from the list
    if ( !fillPuzzle( proposedBoard ) ) {  
    startingBoard[ randomRowIndex ][ randomColIndex ] = removedVals.pop().val 
    }
}
return [removedVals, startingBoard]
}

/*--------------------------------------------------------------------------------------------
--------------------------------- Initialize -------------------------------------
--------------------------------------------------------------------------------------------*/

function newStartingBoard  (holes) {
// Reset global iteration counter to 0 and Try to generate a new game. 
// If counter reaches its maximum limit in the fillPuzzle function, current attemp will abort
// To prevent the abort from crashing the script, the error is caught and used to re-run
// this function
try {
    counter = 0
    let solvedBoard = newSolvedBoard()  

    // Clone the populated board and poke holes in it. 
    // Stored the removed values for clues
    let [removedVals, startingBoard] = pokeHoles( solvedBoard.map ( row => row.slice() ), holes)

    return [removedVals, startingBoard, solvedBoard]
    
} catch (error){
    return newStartingBoard(holes)
    } 
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// console.log(newStartingBoard(50))

function checkVerticalAndHorizontal(board, point, val){
    for(let i = 0;i<9;i++){
        if(board[point.x][i].val == val || board[i][point.y].val == val )
        return false;
    }
    return true;
}

function checkSquare(board, point, val){
    let firstPoint = new Point();
    firstPoint.x = point.x - point.x % 3;
    firstPoint.y = point.y - point.y % 3;
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if(board[firstPoint.x + i][firstPoint.y + j].val == val)
                return false;
    return true;
}
class numberPiece extends Piece{
    val;
    changable;
    constructor(val, changable){
        super();
        this.val = val;
        this.changable = changable;
    }
    isValidMove(board, move){
        return this.changable;
    }
    getAsci(){
        return this.val;
    }
}
class EmptyPiece extends Piece{
    val = 0;
    constructor(){
        super()
    }
    isValidMove(board, move){
        console.log("from validate of the empty piece")
        return checkVerticalAndHorizontal(board, move.point, move.val) && checkSquare(board, move.point, move.val);
    }
    getAsci(){
        return " ";
    }
}

class sudokuEngine extends Engine{
    constructor(){
        super(1,9,9);//,"#5cb4f3b7","#ffcfb6");
        this.controller = new sudokuController(this.board);
        this.drawer = new sudokuDrawer(this.board, this.boardCSS);
    }
    initializeCssBoard(){
        let cell1 = new Cell( "#5cb4f3b7", 50, 50, 40, undefined,1.5)
        let cell2 = new Cell( "#ffcfb6", 50, 50, 40, undefined,1.5)
        document.getElementById('board').style.width = 465 + 'px'
        document.getElementById('board').style.height = 465 + 'px'
        for(let i= 0;i<this.dimx;i++) {
            for (let j = 0; j < this.dimy; j++) {
                if ((i+j) % 2 == 0)
                    this.boardCSS[i][j] = cell1
                else
                    this.boardCSS[i][j] = cell2
            }
        }
    }

    initializeBoardPieces(){
        let generatedBoard = newStartingBoard(50)[1]
        for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                if(generatedBoard[i][j] == 0)
                    this.board[i][j] = new EmptyPiece();
                else this.board[i][j] = new numberPiece(generatedBoard[i][j], false)
    }
}

class sudokuController extends Controller{
    constructor(board){
        var numOfPlayers = 1;
        super(numOfPlayers, board);
    }
    validateMove(move){
        var point = move.point;
        var val = move.val;
        if (Math.min(point.x, point.y) < 0 || Math.max(point.x, point.y) >= 9)
            return false;

        var piece = this.board[point.x][point.y];
        console.log(piece)
        return piece.isValidMove(this.board, move);
    }
    createGameMoveFromInput(point, val){
        return new SudokuMove(point, val)
    }
    convertInputToMove(moveString){
        var list = moveString.split(" ");
        var col = list[0].charAt(0).charCodeAt(0) - 'a'.charCodeAt(0)
        var row = this.board.length - parseInt(list[0].charAt(1));
        var val = parseInt(list[1]);
        return this.createGameMoveFromInput(new Point(row,col), val);
    }
    makeBoardChangeAfterMove(move){
        let point = move
        this.board[move.point.x][move.point.y] = new numberPiece(move.val, true)
    }
}
class sudokuDrawer extends Drawer{
    constructor(board, boardCSS){
        super(board, boardCSS);
    }
}
var myEngine = new sudokuEngine();
