package Tic_Tac_Toe
def TicTacToeController(move: String, state: (Array[Array[Char]], Int)): (Boolean, Array[Array[Char]]) =
{
  val indexedMove = changeLettersToIndex(move)

  if(indexedMove.length != 1)
    return (false, state(0))
  val cell = indexedMove(0)
  val x = 3 - cell(1); val y = cell(0);
  val board:Array[Array[Char]] = state(0);

  if (x < 0 || y < 0 || x >= 3 || y >= 3 || board(x)(y) != 'e')
    return (false, state(0));
  val turn = state(1);

  if (turn == 0)
    board(x)(y) = 'X';
  else
    board(x)(y) = 'O';

  (true, board)
}

def initializeTicTacToeBoard() = {
  val board = Array.ofDim[Char](3, 3)
  var idx = 0;
  while(idx < 3)
  {
    var idx2 = 0;
    while(idx2 < 3)
    {
      board(idx)(idx2) = 'e'
      idx2 = idx2 + 1
    }
    idx = idx + 1
  }
  board
}

def TicTacToeDrawer(board: Array[Array[Char]]): Unit = {
  var idx = 0;
  while(idx < 3)
  {
    var idx2 = 0;
    while(idx2 < 3)
    {
      print(board(idx)(idx2) + " ")
      idx2 = idx2 + 1
    }
    println()
    idx = idx + 1
  }
}
def changeLettersToIndex = (move: String) =>
  move.split(' ').map(arr => arr.map(c => if(c.isLetter) c.toInt - 'a'.toInt  else c.toInt - '0'.toInt));